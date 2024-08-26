<template>
  <div class="main-container">
    <div class="sidebar">
      <div class="input-box">
        <input type="text" placeholder="원하는 장소를 입력하세요" v-model="address" />
        <button class="search-button" @click="fetchTravelData">
          <img src="@/assets/icons/search_btn.png" alt="검색 버튼" />
        </button>
      </div>
      <div class="travel-list">
        <div class="travel-destination">
          <div v-for="(item, index) in travelItems" :key="index" class="travel-item">
            <img :src="item.imgSrc" alt="Travel Image" />
            <div class="info">
              <div class="title">{{ item.title }}</div>
              <button class="more-button" @click="openModal(item)">더보기</button>
            </div>
            <button class="travel-add-button">
              <img src="@/assets/icons/plusBtn.png" alt="추가 버튼" />
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <button @click="toggleDrawer" :class="['drawer-toggle-button', { open: isDrawerOpen }]">
      <img :src="drawerIconSrc" alt="드로어 버튼 아이콘" />
    </button>
    <div v-if="isDrawerOpen" class="drawer">
      <div class="drawer-content">
        <div class="drawer-search-boxes">
          <label for="city-input" class="drawer-label">도시 검색</label>
          <input id="city-input" type="text" placeholder="도시를 입력하세요" v-model="address" />

          <label for="category-input" class="drawer-label">키워드 검색</label>
          <input id="category-input" type="text" placeholder="원하시는 카테고리를 입력하세요" v-model="keyword" />
          <button class="drawer-search-button" @click="fetchTravelData">검색</button>
        </div>
      </div>
    </div>

    <!-- 모달 컴포넌트 -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="modal-body">
          <div class="modal-image">
            <img :src="selectedTravelItem.imgSrc" alt="Travel Image" />
          </div>
          <div class="modal-details">
            <h2>{{ selectedTravelItem.title }}</h2>
            <p>별점: {{ selectedTravelItem.rating }}</p>
            <p>상세 위치: {{ selectedTravelItem.formattedAddress }}</p>
            <p>전화번호: {{ selectedTravelItem.nationalPhoneNumber }}</p>
            <p>홈페이지: 
              <a :href="selectedTravelItem.websiteUri" target="_blank" v-if="selectedTravelItem.websiteUri !== '정보 없음'">
                {{ selectedTravelItem.websiteUri }}
              </a>
              <span v-else>정보 없음</span>
            </p>
          </div>
        </div>
        <hr>
        <div class="modal-review">
          <div v-for="review in selectedTravelItem.reviews" :key="review.author" class="review-item">
            <div class="review-content">
              <p><strong>{{ review.authorAttribution.displayName }}</strong> (별점: {{ review.rating }})</p>
              <p v-html="review.text.text"></p>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Google Maps iframe -->
    <div class="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25428.453175450606!2d126.96662843227381!3d37.187005961947335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b41b2f901fbcb%3A0xeb458e85fd258ab!2z652867mE64-MIOumrOyhsO2KuA!5e0!3m2!1sko!2skr!4v1724642292404!5m2!1sko!2skr"
        width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDrawerOpen: false,
      drawerIconSrc: require("@/assets/icons/drawerOpenBtn.png"),
      address: "",
      keyword: "",
      travelItems: [],
      isModalOpen: false,
      selectedTravelItem: {
        title: '',
        imgSrc: '',
        rating: '', // 별점
        formattedAddress: '', // 위치 (주소)
        nationalPhoneNumber: '', // 전화번호
        websiteUri: '', // 홈페이지 링크
        reviews: [] // 리뷰 목록
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
      this.drawerIconSrc = require(`@/assets/icons/${this.isDrawerOpen ? "drawerCloseBtn.png" : "drawerOpenBtn.png"}`);
    },
    async fetchTravelData() {
      this.loading = true;
      this.error = null;

      try {
        // 장소 검색 API 호출
        const response = await this.$axios.get("http://34.64.132.0/api/googlemaps/searchNearPlace/", {
          params: {
            address: this.address,
            keyword: this.keyword,
          },
        });

        // Place ID 목록 추출
        const placeIds = response.data.map(item => item.placePrediction.placeId);

        // Place ID로 세부 정보 요청
        const placeDetailsResponses = await Promise.all(placeIds.map(placeId =>
          this.$axios.get("http://34.64.132.0/api/googlemaps/placeDetails/", {
            params: {
              place_id: placeId
            }
          })
        ));

        // 응답 데이터 처리
        this.travelItems = response.data.map((item, index) => {
          const placeDetails = placeDetailsResponses[index].data;
          
          // 사진 URL 구성
          const photo = placeDetails.photos && placeDetails.photos.length > 0 ? placeDetails.photos[0] : null;
          const photoUri = photo ? photo.authorAttributions[0].photoUri : null;
          const imgSrc = photoUri ? `https:${photoUri}` : '';

          return {
            title: item.placePrediction.structuredFormat.mainText.text, // 장소 제목
            imgSrc: imgSrc, // 이미지 URL
            rating: placeDetails.rating || '정보 없음', // 별점
            formattedAddress: placeDetails.formattedAddress || '정보 없음', // 위치(주소)
            nationalPhoneNumber: placeDetails.nationalPhoneNumber || '정보 없음', // 전화번호
            websiteUri: placeDetails.websiteUri || '정보 없음', // 홈페이지 링크
            reviews: placeDetails.reviews || [] // 리뷰 목록
          };
        });
      } catch (err) {
        this.error = "데이터를 가져오는 데 실패했습니다.";
      } finally {
        this.loading = false;
      }
    },
    openModal(item) {
      this.selectedTravelItem = {
        title: item.title,
        imgSrc: item.imgSrc,
        rating: item.rating || '정보 없음', // 별점
        formattedAddress: item.formattedAddress || '정보 없음', // 위치 (주소)
        nationalPhoneNumber: item.nationalPhoneNumber || '정보 없음', // 전화번호
        websiteUri: item.websiteUri || '정보 없음', // 홈페이지 링크
        reviews: item.reviews || [] // 리뷰 목록
      };
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
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
}

.drawer-content {
  padding: 20px;
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
  width: 30%;
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
  margin-bottom: 20px; /* 본문과 리뷰 간의 간격 조정 */
}

.modal-image {
  flex: 0 0 40%; /* 이미지 영역의 너비를 40%로 고정 */

}

.modal-image img {
  width: 100%;
  height: auto; /* 비율을 유지하며 자동으로 조절 */
  border-radius: 8px;
}

.modal-details {
  flex: 1; /* 나머지 공간을 차지하도록 설정 */
  padding: 10px; /* 패딩 추가 */
  display: flex;
  flex-direction: column; /* 세부 정보 항목을 세로로 배치 */
  justify-content: flex-start; /* 세부 정보가 상단에 정렬되도록 설정 */
  text-align: left; /* 세부 정보 텍스트를 왼쪽으로 정렬 */
}

.modal-details h2 {
  margin-top: 0;
  margin-bottom: 10px; /* 제목과 다른 항목 사이의 간격 추가 */
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
  overflow-y: auto; /* 리뷰가 많을 경우 스크롤 가능하도록 설정 */
}

.review-item {
  display: flex;
  align-items: flex-start; /* 아이템을 상단 정렬로 설정 */
  margin-bottom: 15px;
}

.review-author-photo {
  display: none; /* 이미지 제거로 인해 숨김 */
}

.review-content {
  flex: 1;
  text-align: left; /* 텍스트를 왼쪽 정렬로 설정 */
}

/* Google Maps iframe 스타일 */
.map-container {
  flex: 1; /* 나머지 공간을 차지하도록 설정 */
  padding: 20px;
}

iframe {
  width: 100%;
  height: 100%;
}
</style>