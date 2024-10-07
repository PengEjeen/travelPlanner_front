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
    <div>
        <div class="festival-search">
            <div class="festival-inputBox">
                <input
                    type="text"
                    id="areaSearch"
                    v-model="searchText"
                    placeholder="축제 지역 검색"
                />
                <button class="festival-search-button" @click="fetchData">
                    <img src="@/assets/icons/search_btn.png" alt="검색 버튼" />
                </button>
            </div>
            <div class="festival-dropdown-group">
                <div class="festival-dropdown-container">
                    <select id="dropdown1" v-model="selectedMonth">
                        <option value="">시기 검색</option>
                        <option value="01">1월</option>
                        <option value="02">2월</option>
                        <option value="03">3월</option>
                        <option value="04">4월</option>
                        <option value="05">5월</option>
                        <option value="06">6월</option>
                        <option value="07">7월</option>
                        <option value="08">8월</option>
                        <option value="09">9월</option>
                        <option value="10">10월</option>
                        <option value="11">11월</option>
                        <option value="12">12월</option>
                    </select>
                </div>
                <div class="festival-dropdown-container">
                    <select id="dropdown2" v-model="selectedCity">
                        <option value="">도시 검색</option>
                        <option value="1">서울</option>
                        <option value="6">부산</option>
                        <option value="4">대구</option>
                        <option value="2">인천</option>
                        <option value="5">광주</option>
                        <option value="3">대전</option>
                        <option value="7">울산</option>
                        <option value="8">세종</option>
                        <option value="31">경기도</option>
                        <option value="32">강원도</option>
                        <option value="33">충청북도</option>
                        <option value="34">충청남도</option>
                        <option value="37">전라북도</option>
                        <option value="38">전라남도</option>
                        <option value="35">경상북도</option>
                        <option value="36">경상남도</option>
                        <option value="39">제주도</option>
                    </select>
                </div>
                <button
                    type="button"
                    class="festival-search-button2"
                    @click="fetchData"
                >
                    검색
                </button>
            </div>
        </div>

        <!-- 검색 결과 출력 -->
        <div class="festival-results">
            <div
                v-for="item in items"
                :key="item.id"
                class="festival-result-item"
                @click="openModal(item)"
            >
                <img
                    :src="item.imageUrl || require('@/assets/icons/logo.png')"
                    alt="축제 이미지"
                />
                <div>
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.date }}</p>
                    <p>{{ item.location }}</p>
                </div>
            </div>
        </div>

        <!-- 모달 -->
        <div
            v-if="isModalOpen"
            class="festival-modal-overlay"
            @click="closeModal"
        >
            <div class="festival-modal" @click.stop>
                <button class="festival-close-button" @click="closeModal">
                    &times;
                </button>
                <div class="festival-modal-content">
                    <img
                        :src="
                            selectedItem.imageUrl ||
                            require('@/assets/icons/logo.png')
                        "
                        alt="축제 이미지"
                        class="festival-modal-image"
                    />
                    <div class="festival-modal-info">
                        <h3>{{ selectedItem.title || "정보 없음" }}</h3>
                        <p>기간: {{ selectedItem.date || "정보 없음" }}</p>
                        <p>위치: {{ selectedItem.location || "정보 없음" }}</p>
                        <p>전화번호: {{ selectedItem.phone || "정보 없음" }}</p>
                        <p>
                            홈페이지:
                            <a :href="selectedItem.website" target="_blank">{{
                                selectedItem.website || "정보 없음"
                            }}</a>
                        </p>
                    </div>
                </div>
                <p class="festival-modal-description">
                    설명: {{ selectedItem.description || "정보 없음" }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            user_id: "userId",
        }),
    },
    data() {
        return {
            searchText: "",
            selectedMonth: "",
            selectedCity: "",
            items: [],
            isModalOpen: false,
            selectedItem: null,
        };
    },
    methods: {
        formatDate(dateStr) {
            if (!dateStr || dateStr.length !== 8) return "날짜 정보 없음";
            const year = dateStr.slice(0, 4);
            const month = dateStr.slice(4, 6);
            const day = dateStr.slice(6, 8);
            return `${year}. ${month}. ${day}`;
        },

        async fetchData() {
            const city = this.selectedCity;
            const month = this.selectedMonth;
            const searchText = this.searchText;

            let url =
                "https://travelplanner.duckdns.org/api/polls/products/?api_type=searchFestival1";

            try {
                const response = await fetch(url);
                const data = await response.json();

                this.items = data.response.body.items.item
                    .filter((item) => {
                        const eventStartMonth = item.eventstartdate.slice(4, 6);
                        const address = item.addr1 + " " + item.addr2;

                        const isAddressMatch =
                            searchText === "" || address.includes(searchText);

                        return (
                            isAddressMatch &&
                            (!city || item.areacode === city) &&
                            (!month || eventStartMonth === month)
                        );
                    })
                    .slice(0, 50)
                    .map((item) => ({
                        id: item.contentid,
                        title: item.title,
                        date: `${this.formatDate(
                            item.eventstartdate
                        )} ~ ${this.formatDate(item.eventenddate)}`,
                        location: `${item.addr1} ${item.addr2}`,
                        imageUrl: item.firstimage,
                        phone: item.tel,
                        website: null,
                        description: null,
                    }));

                await this.fetchDetailData();
            } catch (error) {
                console.error("데이터를 가져오는 데 실패했습니다:", error);
            }
        },

        async fetchDetailData() {
            const detailRequests = this.items.map(async (item) => {
                const detailUrl = `https://travelplanner.duckdns.org/api/polls/products/?api_type=detailCommon1&contentId=${item.id}`;

                try {
                    const response = await fetch(detailUrl);
                    const detailData = await response.json();

                    const detailItem = detailData.response.body.items.item[0];

                    const homepageHTML = detailItem.homepage;
                    const urlMatch = homepageHTML.match(/<a[^>]*>(.*?)<\/a>/);
                    let homepageUrl;
                    if (urlMatch) {
                        const url = urlMatch[1];
                        if (/^https?:\/\//i.test(url)) {
                            homepageUrl = url;
                        } else {
                            homepageUrl = `https://${url}`;
                        }
                    } else {
                        homepageUrl = "홈페이지 정보 없음";
                    }

                    item.website = homepageUrl;
                    item.description = detailItem.overview || "설명 없음";
                } catch (error) {
                    console.error(
                        `Detail data fetching failed for contentId ${item.id}:`,
                        error
                    );
                }
            });
            document.getElementById("loading").style.display = "none";

            if (!this.user_id) {
                alert("로그아웃이 확인되어 홈페이지로 이동합니다.");
                this.$router.push({ name: "MainPage" });
            }
            await Promise.all(detailRequests);
        },

        openModal(item) {
            this.selectedItem = item;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedItem = null;
        },
    },
    created() {
        this.fetchData();
    },
};
</script>

<style scoped>
.festival-search {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 30vh;
    margin: 0;
    padding-top: 13vh;
}

.festival-inputBox {
    position: relative;
    display: flex;
    max-width: 70vh;
    width: 100%;
}

.festival-inputBox input[type="text"] {
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    height: 6vh;
    width: 100%;
    box-sizing: border-box;
}

.festival-search-button {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
}

.festival-search-button img {
    height: 4vh;
    width: auto;
}

.festival-dropdown-group {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 30px;
}

select {
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    height: 6vh;
    width: 30vh;
    box-sizing: border-box;
}

.festival-search-button2 {
    padding: 10px 30px;
    border: 1px solid black;
    border-radius: 5px;
    height: 6vh;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 1.2em;
}

.festival-results {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    justify-content: center;
}

.festival-result-item {
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.festival-result-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-bottom: 15px;
}

.festival-result-item h3 {
    margin: 15px 0;
}
.festival-result-item p {
    margin: 5px 0;
    font-size: 0.8em;
}

/* 모달 스타일 */
.festival-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.festival-modal {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 700px;
    width: 90%;
    position: relative;
}

.festival-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: black;
}

.festival-modal-content {
    display: flex;
    gap: 20px;
}

.festival-modal-image {
    max-width: 200px;
    height: 200px;
    object-fit: cover;
}

.festival-modal-info {
    flex: 1;
    text-align: left;
}

.festival-modal-description {
    margin-top: 20px;
    text-align: left;
}

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
</style>
