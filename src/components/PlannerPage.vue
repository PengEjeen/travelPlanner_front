<template>
    <div class="plannerPlanBox">
        <!-- 사이드 스크롤스파이 -->
        <div class="plannerPlanScrollspyBox">
            <div class="plannerPlanScrollspyHeader">
                <div><h1>여행 제목</h1></div>
                <button @click="plusDay()" class="plusDayButton">
                    + Day추가
                </button>
            </div>
            <div class="col-4">
                <div class="d-flex flex-column gap-2 text-center">
                    <a
                        v-for="(dayGroup, index) in cells"
                        :key="index"
                        class="p-1 rounded"
                        :href="'#simple-list-item-' + (index + 1)"
                    >
                        Day {{ index + 1 }}
                    </a>
                </div>
            </div>
            <!-- 저장, 다른일정 작성 Btn-->
            <div class="plannerPlanScrollspyBottomBtnBox">
                <div
                    class="nav-item"
                    data-bs-toggle="modal"
                    data-bs-target="#listModal"
                >
                    <button>다른 일정 작성</button>
                </div>
            </div>
        </div>
        <div class="planContainer">
            <!-- 제목창-->
            <div id="plannerPlanTopItemsTitle" class="plannerPlanTopBox">
                <input
                    type="text"
                    ref="title"
                    v-model="title"
                    @input="adjustTitleWidth()"
                    :style="{ width: inputTitleWidth }"
                    class="plannerPlanInputTitle"
                />
                <!-- 프린트 버튼 -->
                <button class="printImgBtn">
                    <img
                        src="@/assets/icons/print.png"
                        alt="프린트 이미지"
                        @click="printPlanner()"
                    />
                </button>
            </div>

            <!-- 플랜 정보창-->
            <div class="col-8">
                <div
                    data-bs-offset="0"
                    data-bs-smooth-scroll="true"
                    tabindex="0"
                >
                    <div class="PlannerPlanInformationBox">
                        <!-- 데이 정보 칸 -->
                        <!-- 일정이 없을 경우 -->
                        <div v-if="!cells.length">
                            <div
                                id="simple-list-item-1"
                                class="plannerDayFont"
                                style="margin-top: 50px"
                            >
                                "<span style="color: rgba(54, 212, 222, 1)">
                                    +Day추가 </span
                                >" 버튼으로 일정을 추가하십시오.
                            </div>
                        </div>
                        <!-- 일정이 있을 경우 -->
                        <div v-else>
                            <div
                                v-for="(dayGroup, index) in cells"
                                :key="index"
                                :id="'simple-list-item-' + (index + 1)"
                            >
                                <div class="plannerDayBox plannerDayFont">
                                    Day {{ index + 1 }}
                                    <!-- 데이 메뉴바 -->
                                    <div
                                        v-show="activeMenu === index"
                                        class="plannerDayMenuBar"
                                    >
                                        <button
                                            class="plannerDayMenu_plusDetailBoxBtn"
                                            @click="
                                                plannerDay_plusDetail(dayGroup)
                                            "
                                        >
                                            <img
                                                src="@/assets/icons/expandPlan.png"
                                                alt="데이 메뉴바 세부사항 칸 추가 이미지"
                                            />
                                        </button>
                                        <button
                                            class="plannerDayMenu_printBtn"
                                            @click="plannerDay_print()"
                                        >
                                            <img
                                                src="@/assets/icons/printPlan.png"
                                                alt="데이 메뉴바 프린트 이미지"
                                            />
                                        </button>
                                        <button
                                            class="plannerDayMenu_deleteBtn"
                                            @click="plannerDay_delete(index)"
                                        >
                                            <img
                                                src="@/assets/icons/delete.png"
                                                alt="데이 메뉴바 삭제 이미지"
                                            />
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            class="plannerDayMenuBtn"
                                            type="button"
                                            @click="toggleMenu(index)"
                                        >
                                            <img
                                                src="@/assets/icons/planMenu.png"
                                                alt="데이 메뉴버튼 이미지"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <!-- 데이의 세부정보 칸 -->
                                <div
                                    v-for="(
                                        detail, detailIndex
                                    ) in dayGroup.day"
                                    :key="detailIndex"
                                >
                                    <div
                                        class="plannerDetailBox plannerDetatilFont"
                                    >
                                        <router-link
                                            v-if="detail.place_name"
                                            :to="
                                                '/SelectDetailPage?place_id=' +
                                                detail.place_id
                                            "
                                        >
                                            {{ detail.place_name }}
                                        </router-link>
                                        <router-link
                                            v-else
                                            to="/SelectDetailPage"
                                        >
                                            세부일정 추가하기
                                        </router-link>
                                        <div class="plannerDetailBtnBox">
                                            <button
                                                class="plannerdetailMemoBtn"
                                                type="button"
                                                @click="
                                                    plannerdetailMemo(
                                                        index,
                                                        detailIndex
                                                    )
                                                "
                                            >
                                                <img
                                                    src="@/assets/icons/memo.png"
                                                    alt="세부사항 메모 이미지"
                                                />
                                            </button>
                                            <button
                                                class="plannerdetailDeleteBtn"
                                                type="button"
                                                @click="
                                                    plannerdetailDelete(
                                                        dayGroup,
                                                        detailIndex
                                                    )
                                                "
                                            >
                                                <img
                                                    src="@/assets/icons/delete.png"
                                                    alt="세부사항 삭제 이미지"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        v-show="
                                            activeDetailMemo.dayGroup ===
                                                index &&
                                            activeDetailMemo.detailIndex ===
                                                detailIndex
                                        "
                                        class="plannerDetailMemoBar"
                                    >
                                        <input
                                            type="text"
                                            v-model="detail.memo"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="plannerSaveBtnBox">
                <button @click="savePlannerPage()">저장</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters(["userId"]),
        user_id() {
            return this.userId;
        },
    },
    data() {
        return {
            planner_id: null,
            inputTitleWidth: "",
            title: null,
            activeMenu: null,
            activeDetailMemo: { dayGroup: null, detailIndex: null },
            cells: [],
        };
    },
    methods: {
        ...mapActions(["updateUserId", "removeUserId"]),
        async fetchPlannerData(planner_id) {
            try {
                const response = await this.$axios.get(
                    `http://34.64.132.0/api/planners/${planner_id}/`
                );

                console.log("Fetched Data:", response.data);
                console.log("Planner ID:", this.planner_id);

                this.cells = response.data.cells;
                this.title = response.data.title;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        plusDay() {
            this.cells.push({
                day: [],
            });
        },

        printPlanner() {
            const plannerData = {
                title: this.title,
                cells: this.cells,
            };

            const encodedPlannerData = encodeURIComponent(
                JSON.stringify(plannerData)
            );
            const printPageUrl = `/CalendarPage?plannerData=${encodedPlannerData}`;

            window.open(printPageUrl, "_blank");
        },
        adjustTitleWidth() {
            const inputElement = this.$refs.title;
            const span = document.createElement("span");
            span.textContent = this.title;
            span.style.position = "absolute";
            span.style.visibility = "hidden";
            span.style.whiteSpace = "pre";
            span.style.fontSize = getComputedStyle(inputElement).fontSize;
            span.style.fontFamily = getComputedStyle(inputElement).fontFamily;
            span.style.fontWeight = getComputedStyle(inputElement).fontWeight;
            span.style.fontStyle = getComputedStyle(inputElement).fontStyle;
            span.style.letterSpacing =
                getComputedStyle(inputElement).letterSpacing;
            document.body.appendChild(span);

            const newWidth = span.offsetWidth + 20;
            this.inputTitleWidth = `${Math.max(newWidth, 225)}px`;

            document.body.removeChild(span);
        },
        toggleMenu(index) {
            this.activeMenu = this.activeMenu === index ? null : index;
        },
        plannerDay_plusDetail(dayGroup) {
            dayGroup.day.push({
                status: 0,
                place_id: "",
                memo: "",
            });
        },
        plannerDay_print() {
            const day = this.cells[this.activeMenu];
            const dayIndex = this.activeMenu + 1;

            const encodedDay = encodeURIComponent(JSON.stringify(day));
            const calendarPageUrl = `/CalendarPage?day=${encodedDay}&index=${dayIndex}`;

            window.open(calendarPageUrl, "_blank");
        },
        plannerDay_delete(index) {
            this.cells.splice(index, 1);
        },
        plannerdetailMemo(index, detailIndex) {
            if (
                this.activeDetailMemo.dayGroup === index &&
                this.activeDetailMemo.detailIndex === detailIndex
            ) {
                this.activeDetailMemo = { dayGroup: null, detailIndex: null };
            } else {
                this.activeDetailMemo = { dayGroup: index, detailIndex };
            }
            console.log("Updated Active Detail Memo:", this.activeDetailMemo);
        },
        plannerdetailDelete(dayGroup, detailIndex) {
            dayGroup.day.splice(detailIndex, 1);
        },
        async savePlannerPage() {
            try {
                const plannerData = {
                    user_id: this.user_id,
                    title: this.title,
                    cells: this.cells,
                };

                console.log("readying data:", plannerData);

                const response = await fetch(
                    `http://34.64.132.0/api/planners/${this.planner_id}/update/`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify(plannerData),
                    }
                );

                console.log(
                    "Sending JSONdata:",
                    JSON.stringify(plannerData, null, 2)
                );

                const responseData = await response.json();
                console.log("Response Data:", responseData);
            } catch (error) {
                console.error(
                    "Error saving planner data:",
                    error.response?.data || error.message
                );
            }
        },
    },
    mounted() {
        const queryParams = new URLSearchParams(window.location.search);

        this.planner_id = queryParams.get("planner_id");
        this.fetchPlannerData(this.planner_id);

        this.adjustTitleWidth();
    },
};
</script>

<style>
/* 플래너 구성요소 박스 css */
.plannerPlanBox {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-top: 60px;
}

.plannerPlanBox .planContainer {
    display: flex;
    flex-direction: column;
    flex: 2;
    align-items: flex-start;
    margin-top: 40px;
    margin-left: 350px;
}

.plannerPlanTopBox {
    display: flex;
    align-items: center;
    gap: 20px;
}

/* 플래너페이지 스크롤스파이 박스 css */
.plannerPlanScrollspyBox {
    background: linear-gradient(to top right, #d4f1f9, #ffffff);
    flex: 1;
    height: 100vh;
    position: fixed;
    top: 0;
    width: 250px;
    overflow: hidden;
}

.plannerPlanScrollspyHeader {
    margin-top: 100px;
}

.plannerPlanScrollspyBox .col-4 {
    width: 250px;
    margin-top: 30px;
    font-size: 23px;
    overflow: auto;
    height: 60%;
}

.plannerPlanScrollspyBox .col-4 a {
    color: black;
    text-decoration: none;
}

.plannerPlanScrollspyBox .col-4 a:hover {
    color: rgba(54, 212, 222, 1);
}

/* 플래너페이지 스크롤스파이 바텀 Btn css */
.plannerPlanScrollspyBottomBtnBox {
    display: flex;
    position: fixed;
    bottom: 15px;
    left: 40px;
    box-sizing: border-box;
}

.plannerPlanScrollspyBottomBtnBox button {
    background-color: rgba(54, 212, 222, 1);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 25px;
    width: 170px;
}

.plannerPlanScrollspyBottomBtnBox button:hover {
    background-color: #f2f2f2;
}

/* 플래너페이지 데이추가 버튼 css */
.plannerPlanScrollspyBox .plusDayButton {
    background-color: rgba(54, 212, 222, 1);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    width: 120px;
}

.plannerPlanScrollspyBox .plusDayButton:hover {
    background-color: #f2f2f2;
}

/* 플래너페이지 input 여행제목 css */
.plannerPlanInputTitle {
    font-size: 50px;
    border: 1px solid;
    border-radius: 5px;
}

.plannerPlanInputTitle::placeholder {
    color: black;
}

/* 플래너 프린트 버튼 css  */
.printImgBtn img {
    width: 60px;
    height: 60px;
}

/* 플래너 정보창 css */
.planContainer .scrollspy-example {
    overflow: visible;
}

.PlannerPlanInformationBox {
    text-align: left;
    width: 900px;
    box-sizing: border-box;
}

/* 플래너 데이 칸 css */
.PlannerPlanInformationBox .plannerDayBox {
    background: linear-gradient(to top right, #d4f1f9, #ffffff);
    border: 2px solid;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
}

.plannerDayBox .plannerDayMenuBtn {
    padding-top: 20px;
    width: 32px;
}

.PlannerPlanInformationBox .plannerDayFont {
    font-size: 38px;
    font-weight: bold;
}
/* 플래너 데이 메뉴바 css */
.plannerDayMenuBar {
    background-color: white;
    display: flex;
    align-items: center;
    gap: 20px;
    border: 2px solid;
    border-radius: 3px;
    position: absolute;
    left: 1040px;
}

/* 플래너 데이 메뉴바 말풍선 css */
.plannerDayMenuBar:after {
    content: "";
    position: absolute;
    border-top: 10px solid transparent;
    border-left: 10px solid #484848;
    border-right: 0px solid transparent;
    border-bottom: 10px solid transparent;
    top: 50%;
    transform: translateY(-50%);
    right: -10px;
}

.plannerDayMenu_plusDetailBoxBtn {
    width: 40px;
}

.plannerDayMenu_printBtn {
    width: 35px;
}

.plannerDayMenu_deleteBtn {
    width: 45px;
}

/* 플래너 디테일 칸 css */
.PlannerPlanInformationBox .plannerDetailBox {
    border: 1px solid;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.plannerDetailBox a {
    color: black;
}

.plannerDetailBox .plannerDetailBtnBox {
    display: flex;
    gap: 15px;
}

.PlannerPlanInformationBox .plannerDetatilFont {
    font-size: 25px;
}

.plannerDetailBox .plannerdetailMemoBtn {
    width: 25px;
}

.plannerDetailBox .plannerdetailDeleteBtn {
    width: 35px;
}

/* 플래너 세부사항 메모바 css */
.plannerDetailMemoBar {
    background-color: white;
    display: flex;
    align-items: center;
    border: 5px solid;
    border-radius: 3px;
    position: absolute;
    left: 960px;
    font-size: 23px;
}

.plannerDetailMemoBar:after {
    content: "";
    position: absolute;
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #484848;
    top: -12px;
    left: 74%;
    transform: translateX(-50%);
}

/* 플래너 저장 Btn css */
.plannerSaveBtnBox {
    display: flex;
    position: fixed;
    bottom: 15px;
    right: 40px;
    box-sizing: border-box;
}
.plannerSaveBtnBox button {
    background-color: rgba(54, 212, 222, 1);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 25px;
    width: 120px;
}
.plannerSaveBtnBox button:hover {
    background-color: #f2f2f2;
}
</style>
