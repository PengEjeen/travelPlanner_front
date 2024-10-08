<template>
    <section>
        <!-- 로딩 스피너 -->
        <div id="loading">
            <div
                class="spinner-border m-5 text-info"
                style="width: 5rem; height: 5rem; border-width: 0.6rem"
                role="status"
            >
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
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
                <!-- llm 버튼 -->
                <button
                    id="llmBtn"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#llmOffcanvasScrolling"
                    aria-controls="llmOffcanvasScrolling"
                >
                    <img src="@/assets/icons/llm.png" alt="llm 이미지" />
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
                            <strong>
                                {{ item.title }}
                            </strong>
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
            <div
                class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            >
                <div class="modal-content">
                    <div class="modal-header">
                        <div id="nationalflagImg"></div>
                        <div>
                            <h2>{{ selectedCountry.name }}</h2>
                            <p>
                                언어:
                                <strong>
                                    {{ selectedCountry.language }}
                                </strong>
                            </p>
                            <p>
                                종교:
                                <strong>
                                    {{ selectedCountry.religion }}
                                </strong>
                            </p>
                            <p>
                                수도:
                                <strong>
                                    {{ selectedCountry.capital }}
                                </strong>
                            </p>
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
            </div>
        </div>
    </div>

    <!-- llm 오프 캔버스 -->
    <div class="llmOffcanvas">
        <div
            class="offcanvas offcanvas-end"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabindex="-1"
            id="llmOffcanvasScrolling"
            aria-labelledby="llmOffcanvasScrollingLabel"
        >
            <div class="offcanvas-header">
                <div>
                    <img src="@/assets/icons/llm.png" alt="llm 이미지" /> 채팅
                </div>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body">
                <div v-if="llmAnswer.length === 0">
                    <span class="aiName">
                        <img src="@/assets/icons/ai.png" alt="ai 이미지" />:
                    </span>
                    <div class="conversation">
                        안녕하세요!<br />저는 당신을 위한 AI 도우미입니다.<br />질문을
                        영어로 입력해주세요.
                    </div>
                </div>
                <div v-else v-for="(item, index) in llmAnswer" :key="index">
                    <div class="userQuestion">
                        <span class="userName">
                            :
                            <img
                                src="@/assets/icons/logo.png"
                                alt="로고 이미지"
                            />
                        </span>
                        <div class="conversation">
                            {{ item[0] }}
                        </div>
                    </div>
                    <div>
                        <span class="aiName">
                            <img src="@/assets/icons/ai.png" alt="ai 이미지" />:
                        </span>
                        <div class="conversation" v-html="item[1]"></div>
                    </div>
                </div>
            </div>
            <div class="offcanvas-footer">
                <div class="d-flex" role="search">
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="질문(영어) 입력"
                        v-model="putQuestion"
                    />
                    <button class="llmQuestionBtn" @click="answerQuestion()">
                        Search
                    </button>
                </div>
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
            guideItems: [],
            putCountry: "",
            selectedCountry: {
                name: "",
                language: "",
                religion: "",
                capital: "",
                contact: "",
                entryRequirements: "",
                flag: "",
            },
            loading: false,
            error: null,
            putQuestion: "",
            llmAnswer: [],
        };
    },
    methods: {
        /* 외교부 공지사항 표시 */
        async fetchGuideData() {
            this.loading = true;
            this.error = null;

            try {
                const guideData = await this.getGuideData("NoticeService2");

                this.guideItems = guideData.data.data.map((item) => ({
                    title: item.title,
                    content: item.txt_origin_cn,
                }));
            } catch (err) {
                this.error = "Failed to fetch data from external API";
            } finally {
                this.loading = false;
            }
            document.getElementById("loading").style.display = "none";

            if (!this.user_id) {
                alert("로그아웃이 확인되어 홈페이지로 이동합니다.");
                this.$router.push({ name: "MainPage" });
            }
        },

        /* 외교부 공지사항 정보 설정 */
        async getGuideData(apiType) {
            this.loading = true;
            this.error = null;

            try {
                const response = await this.$axios.get(
                    "https://travelplanner.duckdns.org/api/polls/products/",
                    {
                        params: { api_type: apiType },
                    }
                );

                return response;
            } catch (err) {
                this.error = "Failed to get data from external API";
            } finally {
                this.loading = false;
            }
        },

        /* 외교부 검색 정보 설정 */
        async showGuideLinesDeatilModal() {
            document.getElementById("loading").style.display = "block";
            this.selectedCountry = {};

            await this.fetchGuideCountryFlagData();
            await this.fetchGuideOverviewGnrlInfoData();
            await this.fetchGuideEntranceVisaData();
            await this.fetchGuideLocalContactData();

            this.selectedCountry = {
                flag: this.selectedCountry.flagUrl,
                name: this.putCountry,
                language: this.selectedCountry.lang,
                religion: this.selectedCountry.religion,
                capital: this.selectedCountry.capital,
                contact: this.selectedCountry.contact,
                entryRequirements: this.selectedCountry.entryRequirements,
            };

            document.getElementById("loading").style.display = "none";
        },

        /* 외교부 검색 정보의 국기 url 설정 */
        async fetchGuideCountryFlagData() {
            this.loading = true;
            this.error = null;

            try {
                const response = await this.getGuideData("CountryFlagService2");

                const countryData = response.data.data.find((item) =>
                    [item.country_eng_nm, item.country_nm].some(
                        (field) =>
                            field &&
                            field.toLowerCase() ===
                                this.putCountry.toLowerCase()
                    )
                );
                let flagUrl = "";

                if (countryData) {
                    flagUrl = countryData.download_url;
                } else if (!flagUrl) {
                    document.getElementById(
                        "nationalflagImg"
                    ).style.backgroundImage = "none";
                    alert("입력하신 정보를 찾을 수 없습니다.");
                    location.reload();
                }

                this.selectedCountry.flagUrl = flagUrl;

                const flagImgElement =
                    document.getElementById("nationalflagImg");
                if (flagImgElement) {
                    flagImgElement.style.backgroundImage = `url(${flagUrl})`;
                }
            } catch (err) {
                this.error =
                    "외부 API에서 국기 데이터를 가져오는데 실패했습니다.";
            } finally {
                this.loading = false;
            }
        },

        /* 외교부 검색 정보의 언어,종교,수도 설정 */
        async fetchGuideOverviewGnrlInfoData() {
            this.loading = true;
            this.error = null;

            try {
                const response = await this.getGuideData(
                    "OverviewGnrlInfoService"
                );

                const countryData = response.data.data.find((item) =>
                    [item.country_eng_nm, item.country_nm].some(
                        (field) =>
                            field &&
                            field.toLowerCase() ===
                                this.putCountry.toLowerCase()
                    )
                );

                if (countryData) {
                    const { capital, lang, religion } = countryData;

                    const cleanReligion = religion
                        ? religion
                              .replace(/\s*\(\d+(\.\d+)?%?\)\s*/g, "")
                              .trim()
                        : "";

                    this.selectedCountry = {
                        capital,
                        lang,
                        religion: cleanReligion,
                    };
                } else {
                    console.log("Country data not found.");
                }
            } catch (err) {
                this.error =
                    "외부 API에서 외국 정보 데이터를 가져오는 데 실패했습니다.";
            } finally {
                this.loading = false;
            }
        },

        /* 외교부 검색 정보의 비자 요건 설정 */
        async fetchGuideEntranceVisaData() {
            this.loading = true;
            this.error = null;

            try {
                const response = await this.getGuideData(
                    "EntranceVisaService2"
                );

                const countryData = response.data.data.find((item) =>
                    [item.country_eng_nm, item.country_nm].some(
                        (field) =>
                            field &&
                            field.toLowerCase() ===
                                this.putCountry.toLowerCase()
                    )
                );
                let visaRequirement = "정보 없음";
                if (countryData) {
                    visaRequirement = countryData.dplmt_pspt_visa_cn;
                    if (visaRequirement === "X") {
                        visaRequirement = "비자 요건 없음";
                    }
                }

                this.selectedCountry.entryRequirements = visaRequirement;
            } catch (err) {
                this.error =
                    "외부 API에서 입국 비자 데이터를 가져오는데 실패했습니다.";
            } finally {
                this.loading = false;
            }
        },

        /* 외교부 검색 정보의 현지 연락처 설정 */
        async fetchGuideLocalContactData() {
            this.loading = true;
            this.error = null;

            try {
                const response = await this.getGuideData(
                    "LocalContactService2"
                );

                const countryData = response.data.data.find((item) =>
                    [
                        item.continent_eng_nm,
                        item.continent_nm,
                        item.country_eng_nm,
                        item.country_nm,
                    ].some(
                        (field) =>
                            field &&
                            field.toLowerCase() ===
                                this.putCountry.toLowerCase()
                    )
                );

                if (countryData) {
                    const contactRemark = countryData.contact_remark;
                    const phoneNumber =
                        this.extractPhoneNumberFromRemark(contactRemark);

                    this.selectedCountry.contact = phoneNumber;
                } else {
                    console.log(
                        `국가 '${this.putCountry}'에 대한 정보가 없습니다.`
                    );
                }
            } catch (err) {
                this.error =
                    "Failed to fetch local contact data from external API";
            } finally {
                this.loading = false;
            }
        },

        /* 외교부 현지 연락처 정보 가공 */
        extractPhoneNumberFromRemark(contactRemark) {
            const phoneMatch = contactRemark.match(
                /대표번호\(근무시간 중\)\s*:\s*([\d\s\-()]+)/
            );
            const emergencyMatch = contactRemark.match(
                /긴급연락처\(사건사고 등 긴급상황 발생 시, 24시간\)\s*:\s*([\d\s\-()]+)/
            );

            if (phoneMatch) {
                return phoneMatch[1].trim();
            } else if (emergencyMatch) {
                return emergencyMatch[1].trim();
            } else {
                return "전화번호 없음";
            }
        },

        /* llm 질문 및 대답 출력 */
        async answerQuestion() {
            document.getElementById("loading").style.display = "block";
            try {
                // const answerResponse = await this.$axios.get(
                //     `http://104.155.166.216/generate/?prompt=${this.putQuestion}`
                // );

                // const aiResponse = answerResponse.data.generated_text.replace(
                //     /\n/g,
                //     "<br>"
                // );

                const aiResponse = `
You're planning a trip to Korea and want to make sure you're dining like a local? That's great! Here's a breakdown of some dining etiquette to keep in mind:

**Chopsticks & Spoons:**

- The Basics: Koreans use both chopsticks and spoons for eating. Chopsticks are for picking up food, while spoons are used for rice and soup.
- Rice Bowl Etiquette: It's considered rude to stick your chopsticks upright in your rice bowl, as this resembles a funeral ritual.
- Sharing is Caring: It's common to share dishes among the group, and it's polite to offer food to others.

**Tipping & Bills:**

- No Need to Tip: Tipping is not customary in Korea, as it's already included in the bill.

**Dining Out:**

- Noise Level: Be mindful of the noise level when eating, as it's considered rude to be too loud.
- Napkin Use: Use a napkin to wipe your mouth, but it's not common to use a napkin to wipe your hands.

**General Tips:**

- Embrace the Experience: Don't be afraid to try new dishes and ask questions about the food.
- Respect Local Customs: Be aware that dining etiquette may vary slightly in different regions of Korea.
- Enjoy the Meal: Relax, savor the flavors, and enjoy the company of your dining companions.
`;

                this.llmAnswer.push([this.putQuestion, aiResponse]);
            } catch (error) {
                console.error("Error answering question:", error);
                alert("잘못된 질문 형식입니다.");
            }
            document.getElementById("loading").style.display = "none";
        },
    },
    mounted() {
        this.fetchGuideData();
    },
};
</script>

<style>
/* 로딩중 화면 */
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

.guideLinesSearchBox #llmBtn {
    margin-left: 15px;
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
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid black;
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

/* llm 오프캔버스 css */
.llmOffcanvas .offcanvas-header {
    background-color: lightblue;
    border: 3px solid;
    border-bottom: 1px solid gray;
}

.llmOffcanvas .offcanvas-header div {
    display: flex;
    align-items: center;
}

.llmOffcanvas .offcanvas-header div img {
    height: 30px;
    margin-right: 5px;
}

.llmOffcanvas .offcanvas-header .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
}

.llmOffcanvas .offcanvas-body {
    background-color: lightblue;
    border: 3px solid;
    border-top: none;
    border-bottom: none;
    float: left;
    text-align: left;
    padding: 10px 20px;
    font-size: 14px;
}

.llmOffcanvas .userQuestion {
    text-align: right;
}

.llmOffcanvas .conversation {
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 20px;
    background-color: rgba(54, 212, 222, 1);
}

.llmOffcanvas .userName,
.llmOffcanvas .aiName {
    display: block;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}

.llmOffcanvas .userName img,
.llmOffcanvas .aiName img {
    display: inline-block;
    vertical-align: middle;
}

.llmOffcanvas .userName img {
    height: 50px;
}

.llmOffcanvas .aiName img {
    height: 40px;
}

.llmOffcanvas .offcanvas-footer {
    background-color: lightblue;
    border: 3px solid;
}

.llmOffcanvas .offcanvas-footer .d-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
    margin: 10px 20px;
}

.llmOffcanvas .offcanvas-footer .d-flex input {
    border: 2px solid black;
}

.llmOffcanvas .llmQuestionBtn {
    border: 2px solid black;
    border-radius: 5px;
    color: white;
    background-color: rgba(54, 212, 222, 1);
}

.llmOffcanvas .llmQuestionBtn:hover {
    background-color: white;
    color: rgba(54, 212, 222, 1);
}
</style>
