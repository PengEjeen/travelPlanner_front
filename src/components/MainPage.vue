<template>
    <article>
        <div>
            <!-- 여행지 검색 구역 -->
            <div id="main_searchCity">
                <h2><b>어디로 여행을 떠나시나요?</b></h2>
                <div>
                    <form @submit="submit_Main_SearchBox" id="main_searchBox">
                        <input
                            v-model="main_searchWord"
                            type="search"
                            placeholder="국가명이나 도시명을 검색하세요"
                            required
                        /><button
                            @click="search"
                            class="search-button"
                            type="submit"
                        >
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                </div>
                <div id="trip_type">
                    <ul class="nav justify-content-center">
                        <li class="nav-item">
                            <a
                                id="wholeCity_word"
                                class="nav-link"
                                @click="wholeCity"
                                >전체</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                id="homeCity_word"
                                class="nav-link"
                                @click="homeCity"
                                >국내</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                id="foreignCity_word"
                                class="nav-link"
                                @click="foreignCity"
                                >해외</a
                            >
                        </li>
                    </ul>
                </div>
                <div></div>
            </div>
        </div>
    </article>
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
    },
};
</script>

<style>
img,
button {
    cursor: pointer;
}

#main_searchBox {
    display: flex;
    margin-top: 60px;
}

#main_searchBox > input {
    width: 600px;
    height: 60px;
    padding: 8px;
    border: 1px solid #ccc;
    border-right: none;
    border-radius: 8px;
    margin-left: 30%;
    font-size: 18px;
}

@media (max-width: 768px) {
    #main_searchBox > input {
        margin-left: 5%;
    }
}

#main_searchBox > input:focus {
    outline: none;
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
}

#trip_type {
    margin-top: 60px;
    font-size: 20px;
}

#trip_type .nav-link {
    color: slategray !important;
    cursor: pointer;
}
</style>
