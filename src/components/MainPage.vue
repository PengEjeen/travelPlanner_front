<template>
    <div>
      <article>
        <div>
          <!-- 여행지 검색 구역 -->
          <div id="main_searchCity">
            <h2><b>어디로 여행을 떠나시나요?</b></h2>
            <div>
                <b-form @submit.prevent="submit_Main_SearchBox" id="main_searchBox">
                    <input
                        v-model="main_searchWord"
                        type="search"
                        placeholder="국가명이나 도시명을 검색하세요"
                        required
                    >
                    <b-button type="submit" class="search-button">
                        <i class="fas fa-search"></i>
                    </b-button>
                </b-form>
            </div>
            <div id="trip_type">
              <b-nav pills justified>
                <b-nav-item @click="wholeCity">전체</b-nav-item>
                <b-nav-item @click="homeCity">국내</b-nav-item>
                <b-nav-item @click="foreignCity">해외</b-nav-item>
              </b-nav>
            </div>
            <div></div>
          </div>
        </div>
      </article>
      <footer></footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        main_searchWord: "",
      };
    },
    methods: {
      submit_Main_SearchBox() {
        // 검색어를 서버로 제출하는 메서드
      },
      wholeCity() {
        // 전체 도시에 대한 처리
      },
      homeCity() {
        // 국내 도시에 대한 처리
      },
      foreignCity() {
        // 해외 도시에 대한 처리
      },
    },
  };
  </script>
  
  <style scoped>
#nav_main {
    margin: 10px 25px;
}

#top_logo {
    float: left;
    height: 40px;
}

header .nav-link {
    color: black !important;
    cursor: pointer;
}

header .nav-link:hover {
    color: aquamarine !important;
}

img,
button {
    cursor: pointer;
}

#main_searchCity {
    margin-top: 60px;
}

#main_searchBox > input {
    width: 600px;
    height: 60px;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 8px;
    font-size: 18px;
}

@media (max-width: 768px) {
      #main_searchBox > input {
          margin-left: 5%;
      }
}

#main_searchBox > input:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

#main_searchBox > button {
    
      background-color: white;
      background-image: url("@/assets/search_btn.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      border: 1px solid #ccc;
      border-left: none;
      width: 50px;
      border-radius: 8px;
      margin-left: 1%;
  }

#main_searchBox > button:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}

#trip_type {
    margin-top: 20px;
    font-size: 20px;
}

#trip_type .nav-link {
    color: slategray !important;
    cursor: pointer;
}
</style>