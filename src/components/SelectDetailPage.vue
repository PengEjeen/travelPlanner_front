<template>
    <div id="loading">
        <div
            class="spinner-border m-5 text-info"
            style="width: 5rem; height: 5rem; border-width: 0.6rem"
            role="status"
        >
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div class="main-container">
        <div class="sidebar">
            <div class="input-box">
                <input
                    type="text"
                    placeholder="원하는 장소를 입력하세요"
                    v-model="textSearch"
                />
                <button class="search-button" @click="fetchTravelData2">
                    <img src="@/assets/icons/search_btn.png" alt="검색 버튼" />
                </button>
            </div>
            <div class="travel-list">
                <div class="travel-destination">
                    <div
                        v-for="(item, index) in travelItems"
                        :key="index"
                        class="travel-item"
                        @click="updateMap(item.googleMapsUri)"
                    >
                        <img
                            :src="item.imgSrc || '@/assets/icons/logo.png'"
                            alt="Travel Image"
                        />
                        <div class="info">
                            <div class="title">
                                {{ item.title || "제목 없음" }}
                            </div>
                            <button
                                class="more-button"
                                @click.stop="openModal(item)"
                            >
                                더보기
                            </button>
                        </div>
                        <button
                            class="travel-add-button"
                            @click.stop="addPlace(item.placeId)"
                        >
                            <img
                                src="@/assets/icons/plusBtn.png"
                                alt="추가 버튼"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <hr />
        </div>
        <button
            @click="toggleDrawer"
            :class="['drawer-toggle-button', { open: isDrawerOpen }]"
        >
            <img :src="drawerIconSrc" alt="드로어 버튼 아이콘" />
        </button>
        <div v-if="isDrawerOpen" class="drawer">
            <div class="drawer-content">
                <div class="drawer-search-boxes">
                    <label for="city-input" class="drawer-label">
                        도시 검색
                    </label>
                    <input
                        id="city-input"
                        type="text"
                        placeholder="도시를 입력하세요"
                        v-model="address"
                    />

                    <label for="category-input" class="drawer-label">
                        키워드 검색
                    </label>
                    <input
                        id="category-input"
                        type="text"
                        placeholder="원하시는 카테고리를 입력하세요"
                        v-model="keyword"
                    />
                    <button
                        class="drawer-search-button"
                        @click="fetchTravelData"
                    >
                        검색
                    </button>
                </div>

                <div class="exchangeRateBox">
                    <iframe
                        src="https://sbiz.wooribank.com/biz/Dream?withyou=FXCNT0006&rc=0&divType=1&lang=KOR"
                        frameBorder="0"
                        width="170"
                        scrolling="no"
                        height="184"
                        topmargin="0"
                        name="irate"
                        marginWidth="0"
                        marginHeight="0"
                        title="환율표"
                    ></iframe>
                </div>
            </div>
        </div>

        <!-- 모달 컴포넌트 -->
        <div v-if="isModalOpen" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <div class="modal-body">
                    <div class="modal-image">
                        <img
                            :src="item.imgSrc || '@/assets/icons/logo.png'"
                            alt="Travel Image"
                        />
                    </div>
                    <div class="modal-details">
                        <h2>{{ item.title || "정보 없음" }}</h2>
                        <p>별점: {{ item.rating || "정보 없음" }}</p>
                        <p>
                            상세 위치:
                            {{ item.formattedAddress || "정보 없음" }}
                        </p>
                        <p>
                            전화번호:
                            {{ item.nationalPhoneNumber || "정보 없음" }}
                        </p>
                        <p>
                            홈페이지:
                            <a
                                v-if="
                                    item.websiteUri &&
                                    item.websiteUri !== '정보 없음'
                                "
                                :href="item.websiteUri"
                                target="_blank"
                            >
                                {{ item.websiteUri }}
                            </a>
                            <span v-else>정보 없음</span>
                        </p>
                    </div>
                </div>
                <hr />
                <div class="modal-review">
                    <div
                        v-for="review in item.reviews"
                        :key="review.author || Math.random()"
                        class="review-item"
                    >
                        <div class="review-content">
                            <p>
                                <strong>{{
                                    review.authorAttribution?.displayName ||
                                    "익명"
                                }}</strong>
                                (별점: {{ review.rating || "정보 없음" }})
                            </p>
                            <p
                                v-html="
                                    review.originalText?.text || '댓글 없음'
                                "
                            ></p>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="map-container">
            <iframe
                :src="mapSrc"
                width="600"
                height="450"
                style="border: 0"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            >
            </iframe>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters({
            user_id: "userId",
            revisePlaceId: "placeId",
        }),
    },
    data() {
        return {
            isDrawerOpen: false,
            drawerIconSrc: require("@/assets/icons/drawerOpenBtn.png"),
            isModalOpen: false,
            travelItems: [],
            currentDate: "",
            loading: false,
            error: null,
            address: "",
            keyword: "",
            item: null,
            mapSrc: "",
        };
    },

    created() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        this.currentDate = `${year}-${month}-${day}`;
    },

    methods: {
        ...mapActions(["updatePlaceId", "removePlaceId"]),

        toggleDrawer() {
            this.isDrawerOpen = !this.isDrawerOpen;
            this.drawerIconSrc = require(`@/assets/icons/${
                this.isDrawerOpen ? "drawerCloseBtn.png" : "drawerOpenBtn.png"
            }`);
        },

        async fetchTravelData() {
            this.loading = true;
            this.error = null;

            try {
                document.getElementById("loading").style.display = "block";
                const response = await this.$axios.get(
                    "http://34.64.132.0/api/googlemaps/searchNearPlace/",
                    {
                        params: {
                            address: this.address,
                            keyword: this.keyword,
                        },
                    }
                );

                const placeData = response.data.places;

                this.travelItems = await Promise.all(
                    placeData.map(async (item) => {
                        let imgSrc = "";
                        const photoName = item.photos?.[0]?.name;

                        if (photoName) {
                            try {
                                const photoResponse = await this.$axios.get(
                                    "http://34.64.132.0/api/googlemaps/placePhotos/",
                                    {
                                        params: { place_url: photoName },
                                    }
                                );

                                imgSrc = `data:image/jpeg;base64,${photoResponse.data}`;
                            } catch (err) {
                                console.error("이미지 로드 실패:", err);
                            }
                        }

                        if (!imgSrc) {
                            imgSrc = require("@/assets/icons/logo.png");
                        }

                        return {
                            title: item.displayName.text || "제목 없음",
                            imgSrc: imgSrc || "",
                            rating: item.rating || "평점 정보 없음",
                            formattedAddress:
                                item.formattedAddress || "주소 정보 없음",
                            nationalPhoneNumber:
                                item.nationalPhoneNumber ||
                                "전화번호 정보 없음",
                            websiteUri: item.websiteUri || "웹사이트 정보 없음",
                            reviews: item.reviews || [],
                            placeId: item.id || "",
                            photo_name: photoName || "",
                            googleMapsUri: item.googleMapsUri || "",
                        };
                    })
                );
            } catch (err) {
                this.error = "데이터를 가져오는 데 실패했습니다.";
            } finally {
                this.loading = false;
            }
            document.getElementById("loading").style.display = "none";
        },

        async fetchTravelData2() {
            this.loading = true;
            this.error = null;

            try {
                document.getElementById("loading").style.display = "block";
                const searchText = this.textSearch.trim();
                const response = await this.$axios.get(
                    "http://34.64.132.0/api/googlemaps/searchNearPlace/",
                    {
                        params: {
                            address: searchText,
                            keyword: searchText,
                        },
                    }
                );

                const placeData = response.data.places;

                this.travelItems = await Promise.all(
                    placeData.map(async (item) => {
                        let imgSrc = "";
                        const photoName = item.photos?.[0]?.name;

                        if (photoName) {
                            try {
                                const photoResponse = await this.$axios.get(
                                    "http://34.64.132.0/api/googlemaps/placePhotos/",
                                    {
                                        params: { place_url: photoName },
                                    }
                                );

                                imgSrc = `data:image/jpeg;base64,${photoResponse.data}`;
                            } catch (err) {
                                console.error("이미지 로드 실패:", err);
                            }
                        }

                        if (!imgSrc) {
                            imgSrc = require("@/assets/icons/logo.png");
                        }

                        return {
                            title: item.displayName.text || "제목 없음",
                            imgSrc: imgSrc || "",
                            rating: item.rating || "평점 정보 없음",
                            formattedAddress:
                                item.formattedAddress || "주소 정보 없음",
                            nationalPhoneNumber:
                                item.nationalPhoneNumber ||
                                "전화번호 정보 없음",
                            websiteUri: item.websiteUri || "웹사이트 정보 없음",
                            reviews: item.reviews || [],
                            placeId: item.id || "",
                            photo_name: photoName || "",
                            googleMapsUri: item.googleMapsUri || "",
                        };
                    })
                );
            } catch (err) {
                this.error = "데이터를 가져오는 데 실패했습니다.";
            } finally {
                this.loading = false;
            }
            document.getElementById("loading").style.display = "none";
        },

        openModal(item) {
            this.item = {
                title: item.title,
                imgSrc: item.imgSrc,
                rating: item.rating || "정보 없음",
                formattedAddress: item.formattedAddress || "정보 없음",
                nationalPhoneNumber: item.nationalPhoneNumber || "정보 없음",
                websiteUri: item.websiteUri || "정보 없음",
                reviews: item.reviews || [],
            };
            this.isModalOpen = true;
        },

        closeModal() {
            this.isModalOpen = false;
        },

        addPlace(placeId) {
            const revisePlaceIdInfo = {
                after: placeId,
            };

            localStorage.setItem(
                "revisePlaceIdInfo",
                JSON.stringify(revisePlaceIdInfo)
            );

            console.log(
                "Setting revisePlaceIdInfo:",
                JSON.stringify(revisePlaceIdInfo)
            );

            window.close();
        },

        updateMap(googleMapsUri) {
            if (googleMapsUri) {
                this.mapSrc = googleMapsUri + "&output=svembed";
            } else {
                console.error("Google Maps URI가 없습니다.");
                this.mapSrc =
                    "https://maps.google.com/?cid=13072433878939821035&output=svembed";
            }
        },

        async fetchMapData(revisePlaceId) {
            try {
                console.log(`Fetching map for place_id: ${revisePlaceId}`);

                const mapResponse = await this.$axios.get(
                    `http://34.64.132.0/api/googlemaps/placeDetails/?format=json&place_id=${revisePlaceId}`
                );
                const mapData = mapResponse.data;

                console.log(
                    `Response for revisePlaceId ${revisePlaceId}:`,
                    mapData
                );

                if (mapData?.googleMapsUri) {
                    this.mapSrc = `${mapData.googleMapsUri}&output=svembed`;
                } else {
                    this.mapSrc =
                        "https://maps.google.com/?cid=13072433878939821035&output=svembed";
                }
                console.log(`fetching mapUrl for ${this.mapSrc}:`, this.mapSrc);
            } catch (error) {
                console.error(
                    `Error fetching place map for ${revisePlaceId}:`,
                    error
                );
                this.mapSrc =
                    "https://maps.google.com/?cid=13072433878939821035&output=svembed";
            }
            document.getElementById("loading").style.display = "none";
        },
    },
    mounted() {
        this.fetchMapData(this.revisePlaceId);
    },
};
</script>

<style scoped>
.main-container {
    display: flex;
    height: 100vh;
}

.sidebar {
    width: 350px;
    padding: 20px;
    border-right: 1px solid #333;
    overflow-y: auto;
}

.drawer-toggle-button {
    position: fixed;
    top: 50%;
    left: 350px;
    transition: left 0.3s;
}

.drawer-toggle-button.open {
    left: 700px;
}