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
                    "https://travelplanner.duckdns.org/api/googlemaps/searchNearPlace/",
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
                                    "https://travelplanner.duckdns.org/api/googlemaps/placePhotos/",
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

            if (!this.user_id) {
                alert("로그아웃이 확인되어 홈페이지로 이동합니다.");
                this.$router.push({ name: "MainPage" });
            }
        },

        async fetchTravelData2() {
            this.loading = true;
            this.error = null;

            try {
                document.getElementById("loading").style.display = "block";
                const searchText = this.textSearch.trim();
                const response = await this.$axios.get(
                    "https://travelplanner.duckdns.org/api/googlemaps/searchNearPlace/",
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
                                    "https://travelplanner.duckdns.org/api/googlemaps/placePhotos/",
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
                    `https://travelplanner.duckdns.org/api/googlemaps/placeDetails/?format=json&place_id=${revisePlaceId}`
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
#loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

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

.drawer-toggle-button img {
    width: 50px;
    height: 50px;
}

.drawer {
    position: fixed;
    top: 0;
    left: 350px;
    width: 350px;
    height: 100vh;
    background-color: #f5f5f5;
    border-left: 1px solid #ddd;
    border-right: 1px solid #333;
    display: flex;
    flex-direction: column;
}

.drawer-content {
    padding: 20px;
    flex: 1;
}

.drawer-search-boxes {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    margin-bottom: 20px;
}

.drawer-label {
    font-weight: bold;
    margin-bottom: 8px;
}

.drawer-search-boxes input {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.drawer-search-button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    text-align: center;
    width: 30%;
    margin-left: auto;
}

.drawer-search-button:hover {
    background-color: #0056b3;
}

.input-box {
    margin-top: 8vh;
    display: flex;
    align-items: center;
}

input[type="text"] {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
}

.search-button img {
    width: 24px;
    height: 24px;
}

.travel-destination {
    margin-top: 20px;
}

.travel-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: 2px solid;
    border-radius: 8px;
    position: relative;
    width: 90%;
}

.travel-item img {
    width: 100px;
    height: auto;
    border-radius: 8px;
    margin-right: 20px;
}

.title {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 20px;
}

.more-button {
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
}

.more-button:hover {
    background-color: #e0e0e0;
}

.travel-add-button {
    position: absolute;
    right: -65px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

.travel-add-button img {
    width: 34px;
    height: 34px;
}

/* 모달 스타일 */
.modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 60%;
    max-width: 600px;
    max-height: 80%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.modal-body {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 20px;
}

.modal-image {
    flex: 0 0 40%;
}

.modal-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
}

.modal-details {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
}

.modal-details h2 {
    margin-top: 0;
    margin-bottom: 10px;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}

.modal-review {
    margin-top: 20px;
    overflow-y: auto;
}

.review-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
}

.review-author-photo {
    display: none;
}

.review-content {
    flex: 1;
    text-align: left;
}

.map-container {
    margin-top: 60px;
    flex: 1;
}

iframe {
    width: 100%;
    height: 100%;
}

.exchangeRateBox {
    position: absolute;
    margin-left: 60px;
    bottom: 30px;
}
</style>
