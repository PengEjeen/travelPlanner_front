<template>
    <div>
        <div class="festival-search">
            <div class="festival-inputBox">
                <input
                    type="text"
                    id="areaSearch"
                    v-model="searchText"
                    placeholder="축제 지역 검색"
                />
                <button class="festival-search-button" @click="fetchDataByText">
                    <img src="@/assets/icons/search_btn.png" alt="검색 버튼" />
                </button>
            </div>
            <div class="festival-dropdown-group">
                <div class="festival-dropdown-container">
                    <select id="dropdown1" v-model="selectedMonth">
                        <option value="" disabled selected>시기 검색</option>
                        <option value="january">1월</option>
                        <option value="february">2월</option>
                        <option value="march">3월</option>
                        <option value="april">4월</option>
                        <option value="may">5월</option>
                        <option value="june">6월</option>
                        <option value="july">7월</option>
                        <option value="august">8월</option>
                        <option value="september">9월</option>
                        <option value="october">10월</option>
                        <option value="november">11월</option>
                        <option value="december">12월</option>
                    </select>
                </div>
                <div class="festival-dropdown-container">
                    <select id="dropdown2" v-model="selectedCity">
                        <option value="" disabled selected>도시 검색</option>
                        <option value="seoul">서울</option>
                        <option value="busan">부산</option>
                        <option value="daegu">대구</option>
                        <option value="incheon">인천</option>
                        <option value="gwangju">광주</option>
                        <option value="daejeon">대전</option>
                        <option value="ulsan">울산</option>
                        <option value="sejong">세종</option>
                        <option value="gyeonggi">경기도</option>
                        <option value="gangwon">강원도</option>
                        <option value="chungbuk">충청북도</option>
                        <option value="chungnam">충청남도</option>
                        <option value="jeonbuk">전라북도</option>
                        <option value="jeonnam">전라남도</option>
                        <option value="gyeongbuk">경상북도</option>
                        <option value="gyeongnam">경상남도</option>
                        <option value="jeju">제주도</option>
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

        <div class="festival-results">
            <div
                v-for="item in items"
                :key="item.id"
                class="festival-result-item"
                @click="openModal(item)"
            >
                <img :src="item.imageUrl" alt="축제 이미지" />
                <div>
                    <h3>{{ item.title }}</h3>
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
                        :src="selectedItem.imageUrl"
                        alt="축제 이미지"
                        class="festival-modal-image"
                    />
                    <div class="festival-modal-info">
                        <h3>{{ selectedItem.title }}</h3>
                        <p>기간: {{ selectedItem.date }}</p>
                        <p>위치: {{ selectedItem.location }}</p>
                        <p>전화번호: {{ selectedItem.phone }}</p>
                        <p>
                            홈페이지:
                            <a :href="selectedItem.website" target="_blank">{{
                                selectedItem.website
                            }}</a>
                        </p>
                    </div>
                </div>
                <p class="festival-modal-description">
                    설명: {{ selectedItem.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const searchText = ref("");
const selectedMonth = ref("");
const selectedCity = ref("");
const items = ref([]);

const isModalOpen = ref(false);
const selectedItem = ref(null);

// 임시 데이터 설정
onMounted(() => {
    items.value = [
        {
            id: 1,
            title: "서울 꽃 축제",
            date: "2023-04-01 ~ 2023-04-10",
            location: "서울",
            imageUrl:
                "https://minio.nculture.org/amsweb-opt/multimedia_assets/73/30127/16061/c/026_2019정선아리랑제-thumb.jpg",
            phone: "02-123-4567",
            website: "https://example.com/festival1",
            description: "서울에서 열리는 아름다운 꽃 축제입니다.",
        },
        {
            id: 2,
            title: "부산 바다 축제",
            date: "2023-08-01 ~ 2023-08-10",
            location: "부산",
            imageUrl:
                "https://minio.nculture.org/amsweb-opt/multimedia_assets/73/30127/16061/c/026_2019정선아리랑제-thumb.jpg",
            phone: "051-123-4567",
            website: "https://example.com/festival2",
            description: "부산의 아름다운 바다를 즐길 수 있는 축제입니다.",
        },
    ];
});

const fetchData = async () => {
    const month = selectedMonth.value;
    const city = selectedCity.value;

    if (!month || !city) {
        alert("시기와 도시를 선택해주세요.");
        return;
    }

    const response = await fetch(
        `https://api.example.com/festivals?month=${month}&city=${city}`
    ); // 예시 URL
    const data = await response.json();
    items.value = data.results;
};

const fetchDataByText = async () => {
    const area = searchText.value;

    if (!area) {
        alert("지역을 입력해주세요.");
        return;
    }

    const response = await fetch(
        `https://api.example.com/festivals?area=${area}`
    ); // 예시 URL
    const data = await response.json();
    items.value = data.results;
};

// 모달 열기
const openModal = (item) => {
    selectedItem.value = item;
    isModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
    isModalOpen.value = false;
    selectedItem.value = null;
};
</script>

<style>
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
}

.festival-result-item img {
    width: 100%;
    height: auto;
}

.festival-result-item h3 {
    margin: 10px 0;
}

.festival-result-item p {
    margin: 5px 0;
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
    width: 100%;
    height: auto;
}

.festival-modal-info {
    flex: 1;
    text-align: left;
}

.festival-modal-description {
    margin-top: 20px;
    text-align: left;
}
</style>
