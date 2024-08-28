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
            <button class="travel-add-button" @click="addPlace(item.placeId)">
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
      
        <div class="today-date">
          <span>{{ currentDate }}</span>
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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.2903566480873!2d127.0200237762836!3d37.19333234543951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b4116d0196943%3A0xb56a9d5a27fd63eb!2z7ZWc7Iug64yA7ZWZ6rWQ!5e0!3m2!1sko!2skr!4v1724768365740!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
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
      currentDate: '', 
    };
  },
  created() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    this.currentDate = `${year}-${month}-${day}`;
  },
  methods: {
    ...mapActions(["updatePlaceId", "removePlaceId"]),

    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
      this.drawerIconSrc = require(`@/assets/icons/${this.isDrawerOpen ? "drawerCloseBtn.png" : "drawerOpenBtn.png"}`);
    },
    async fetchTravelData() {
      this.loading = true;
      this.error = null;

      try {
        const response = await this.$axios.get("http://34.64.132.0/api/googlemaps/searchNearPlace/", {
          params: {
            address: this.address,
            keyword: this.keyword,
          },
        });

        const placeIds = response.data.map(item => item.placePrediction.placeId);

        const placeDetailsResponses = await Promise.all(placeIds.map(placeId =>
          this.$axios.get("http://34.64.132.0/api/googlemaps/placeDetails/", {
            params: {
              place_id: placeId
            }
          })
        ));

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
            reviews: placeDetails.reviews || [], // 리뷰 목록
            placeId: item.placePrediction.placeId // Place ID 추가
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
    addPlace(placeId) {
      console.log("Selected Place ID:", placeId);
      this.updatePlaceId(placeId);
      // window.close();
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
  flex: 1; 
  padding: 20px;
}

iframe {
  width: 100%;
  height: 100%;
}

.today-date {
  text-align: center;
  padding: 10px;
  border:1px solid #333; 
  border-radius: 10px; 
  background-color: #26a9ca;
  width: 200px; 
  height: 40px;
  margin: 45px auto; 
  margin-top:200px;
  color:white;
}
</style>