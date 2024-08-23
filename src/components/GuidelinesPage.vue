<template>
    <section>
        <!-- 검색바-->
        <div class="guideLinesSearchBox">
            <div class="d-flex" role="search">
                <input
                    class="form-control me-2"
                    type="search"
                    placeholder="해외 국가명 검색"
                    v-model="putCountry"
                />
                <button
                    class="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#guideLinesDeatilModal"
                    @click="showGuideLinesDeatilModal()"
                >
                    Search
                </button>
            </div>
        </div>

        <!-- 게시판 -->
        <div class="guideLinesBoardBox">
            <h1 class="guideLinesBoardTitle">외교부 게시판</h1>
            <hr />
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div
                    v-for="(item, index) in guideItems"
                    :key="index"
                    class="accordion-item"
                >
                    <h2 class="accordion-header" :id="'flush-heading' + index">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            :data-bs-toggle="'collapse'"
                            :data-bs-target="'#flush-collapse' + index"
                            :aria-controls="'flush-collapse' + index"
                        >
                            {{ item.title }}
                        </button>
                    </h2>
                    <div
                        :id="'flush-collapse' + index"
                        class="accordion-collapse collapse"
                        :aria-labelledby="'flush-heading' + index"
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div class="accordion-body">
                            {{ item.content }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 가이드라인 상세정보 모달 -->
    <div class="guideLinesDeatilModalBox">
        <div
            class="modal fade"
            id="guideLinesDeatilModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="guideLinesDeatilModal"
            aria-hidden="true"
        >
            <form
                class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            >
                <div class="modal-content">
                    <div class="modal-header">
                        <img
                            :src="selectedCountry.flag"
                            alt="국기 이미지"
                            id="nationalflagImg"
                        />
                        <div>
                            <h2>{{ selectedCountry.name }}</h2>
                            <p>기후: {{ selectedCountry.climate }}</p>
                            <p>종교: {{ selectedCountry.religion }}</p>
                            <p>수도: {{ selectedCountry.capital }}</p>
                        </div>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-body">
                            <div class="form-group">
                                현지 연락처
                                <h5>
                                    <p>{{ selectedCountry.contact }}</p>
                                </h5>
                            </div>
                            <div class="form-group">
                                입국 허가 요건
                                <h5>
                                    <p>
                                        {{ selectedCountry.entryRequirements }}
                                    </p>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            guideItems: [],
            putCountry: "",
            selectedCountry: {
                name: "",
                climate: "",
                religion: "",
                capital: "",
                contact: "",
                entryRequirements: "",
                flag: "",
            },
            loading: false,
            error: null,
        };
    },
    methods: {
        async fetchGuideData() {
            this.loading = true;
            this.error = null;

            try {
                const response = await this.$axios.get(
                    "http://34.64.132.0/api/polls/products/",
                    {
                        params: { api_type: "NoticeService2" },
                    }
                );

                console.log(response);

                this.guideItems = response.data.data.map((item) => ({
                    title: item.title,
                    content: item.txt_origin_cn,
                }));
            } catch (err) {
                this.error = "Failed to fetch data from external API";
            } finally {
                this.loading = false;
            }
        },
        showGuideLinesDeatilModal() {
            this.selectedCountry = {
                name: "대한민국",
                climate: "온대 기후",
                religion: "자유 종교",
                capital: "서울",
                contact: "010-1234-5678",
                entryRequirements: "비자 필요",
                flag: require("@/assets/icons/memo.png"),
            };
        },
    },
    mounted() {
        this.fetchGuideData();
    },
};
</script>

<style>
/* 가이드라인 검색바 css */
.guideLinesSearchBox {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}
.guideLinesSearchBox .d-flex {
    width: 45%;
    height: 50px;
}

.guideLinesSearchBox .d-flex .btn {
    background-color: rgba(54, 212, 222, 1);
    color: white;
}

.guideLinesSearchBox .d-flex .btn:hover {
    background-color: white;
    color: rgba(54, 212, 222, 1);
}

/* 가이드라인 게시판 css */
.guideLinesBoardBox {
    margin-top: 50px;
    width: 80%;
    margin-left: 10%;
    border: 1px solid black;
}

.guideLinesBoardTitle {
    border-color: rgba(54, 212, 222, 1);
    margin-top: 20px;
}

.guideLinesBoardBox .accordion-body {
    text-align: left;
}

.guideLinesBoardBox .accordion-button:not(.collapsed) {
    background-color: #d6f0f4;
}

/* 가이드라인 상세정보 모달 css */
.guideLinesDeatilModalBox .modal-header {
    margin-top: 10px;
}

#nationalflagImg {
    width: 500px;
    height: 150px;
}

.guideLinesDeatilModalBox .modal-header div {
    clear: both;
    float: left;
    margin: 0;
}

.guideLinesDeatilModalBox .modal-header div h2 {
    margin-left: 20px;
}

.guideLinesDeatilModalBox .modal-header div p {
    float: left;
    margin-left: 50px;
}

.guideLinesDeatilModalBox .btn-close {
    margin-top: -180px !important;
}

.guideLinesDeatilModalBox .form-body {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.guideLinesDeatilModalBox .form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.guideLinesDeatilModalBox .form-group p {
    margin: 0;
}
</style>
