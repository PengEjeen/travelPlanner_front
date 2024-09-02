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
</template>

<script>
export default {
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
                document.getElementById("loading").style.display = "none";
            } finally {
                this.loading = false;
                document.getElementById("loading").style.display = "none";
            }
        },

        /* 외교부 공지사항 정보 설정 */
        async getGuideData(apiType) {
            this.loading = true;
            this.error = null;

            try {
                const response = await this.$axios.get(
                    "http://34.64.132.0/api/polls/products/",
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
