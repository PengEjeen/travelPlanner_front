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
                        v-for="(day, index) in days"
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
                    ref="titleInput"
                    v-model="inputTitleValue"
                    @input="adjustTitleWidth()"
                    :style="{ width: inputTitleWidth }"
                    class="plannerPlanInputTitle"
                    placeholder="여행 제목"
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
                    data-bs-spy="scroll"
                    data-bs-target="#simple-list-example"
                    data-bs-offset="0"
                    data-bs-smooth-scroll="true"
                    class="scrollspy-example"
                    tabindex="0"
                >
                    <div class="PlannerPlanInformationBox">
                        <!-- 데이 정보 칸 -->
                        <!-- 일정이 없을 경우 -->
                        <div v-if="days == null">
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
                        <div v-if="days !== null">
                            <div
                                v-for="(day, index) in days"
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
                                            class="plannerDayMenu_memoBtn"
                                            @click="plannerDay_memo(index)"
                                        >
                                            <img
                                                src="@/assets/icons/memo.png"
                                                alt="데이 메뉴바 메모 이미지"
                                            />
                                        </button>
                                        <button
                                            class="plannerDayMenu_plusDetailBoxBtn"
                                            @click="plannerDay_plusDetail(day)"
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
                                        <div
                                            v-show="activeDayMemo === index"
                                            class="plannerDayMemoBar"
                                        >
                                            <input />
                                        </div>
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
                                <div
                                    v-show="activeDayMemo === index"
                                    class="plannerDayMemoBar"
                                >
                                    <input
                                        type="text"
                                        v-model="days[index].inputDayMemoValue"
                                    />
                                </div>
                                <!-- 데이의 세부정보 칸 -->
                                <div
                                    v-for="(detail, detailIndex) in day.details"
                                    :key="detailIndex"
                                >
                                    <div
                                        class="plannerDetailBox plannerDetatilFont"
                                    >
                                        <router-link
                                            to="/SelectDetailPage"
                                            target="_blank"
                                        >
                                            {{ detail.detail }}
                                        </router-link>
                                        <div class="plannerDetailBtnBox">
                                            <button
                                                class="plannerdetailMemoBtn"
                                                type="button"
                                                @click="
                                                    plannerdetailMemo(
                                                        dayIndex,
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
                                                        day,
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
                                            activeDetailMemo.day === dayIndex &&
                                            activeDetailMemo.detailIndex ===
                                                detailIndex
                                        "
                                        class="plannerDetailMemoBar"
                                    >
                                        <input
                                            type="text"
                                            v-model="
                                                detail.inputDetailMemoValue
                                            "
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
export default {
    data() {
        return {
            inputTitleValue: "",
            inputTitleWidth: "",
            activeMenu: null,
            activeDayMemo: null,
            activeDetailMemo: { day: null, detailIndex: null },
            days: [
                {
                    details: [
                        {
                            detail: "Detail 1",
                            inputDetailMemoValue: "Detail 1 memo",
                        },
                    ],
                    inputDayMemoValue: "Day 1 memo",
                },
                {
                    details: [
                        {
                            detail: "Detail A",
                            inputDetailMemoValue: "Detail 2 memo",
                        },
                    ],
                    inputDayMemoValue: "Day 2 memo",
                },
                {
                    details: [
                        {
                            detail: "Detail X",
                            inputDetailMemoValue: "Detail 3 memo",
                        },
                    ],
                    inputDayMemoValue: "Day 3 memo",
                },
                {
                    details: [
                        {
                            detail: "Detail M",
                            inputDetailMemoValue: "Detail 4 memo",
                        },
                    ],
                    inputDayMemoValue: "Day 4 memo",
                },
                {
                    details: [
                        {
                            detail: "Detail p",
                            inputDetailMemoValue: "Detail 5 memo",
                        },
                    ],
                    inputDayMemoValue: "Day 5 memo",
                },
            ],
        };
    },
    methods: {
        plusDay() {
            this.days.push({
                details: [],
                inputDayMemoValue: "",
            });
        },
        savePlannerPage() {
            /*화면 정보들을 저장하는 코드 */
        },
        printPlanner() {
            const plannerData = {
                title: this.inputTitleValue,
                days: this.days,
            };

            const encodedPlannerData = encodeURIComponent(
                JSON.stringify(plannerData)
            );
            const printPageUrl = `/CalendarPage?plannerData=${encodedPlannerData}`;

            window.open(printPageUrl, "_blank");
        },
        adjustTitleWidth() {
            const inputElement = this.$refs.titleInput;
            const span = document.createElement("span");
            span.textContent = this.inputTitleValue || inputElement.placeholder;
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
            this.inputTitleWidth = `${Math.max(newWidth, 50)}px`;

            document.body.removeChild(span);
        },
        toggleMenu(index) {
            this.activeMenu = this.activeMenu === index ? null : index;
        },
        plannerDay_memo(index) {
            this.activeDayMemo = this.activeDayMemo === index ? null : index;
        },
        plannerDay_plusDetail(day) {
            day.details.push({
                detail: "세부일정 추가하기",
                inputDetailMemoValue: "",
            });
        },
        plannerDay_print() {
            const day = this.days[this.activeMenu];
            const dayIndex = this.activeMenu + 1;

            const encodedDay = encodeURIComponent(JSON.stringify(day));
            const calendarPageUrl = `/CalendarPage?day=${encodedDay}&index=${dayIndex}`;

            window.open(calendarPageUrl, "_blank");
        },
        plannerDay_delete(index) {
            this.days.splice(index, 1);
        },
        plannerdetailMemo(dayIndex, detailIndex) {
            if (
                this.activeDetailMemo.day === dayIndex &&
                this.activeDetailMemo.detailIndex === detailIndex
            ) {
                this.activeDetailMemo = { day: null, detailIndex: null };
            } else {
                this.activeDetailMemo = { day: dayIndex, detailIndex };
            }
        },
        plannerdetailDelete(day, detailIndex) {
            day.details.splice(detailIndex, 1);
        },
    },
    mounted() {
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
    right: 335px;
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

.plannerDayMenu_memoBtn {
    margin-left: 12px;
    width: 35px;
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

/* 플래너 데이 메모바 css */
.plannerDayMemoBar {
    background-color: white;
    display: flex;
    align-items: center;
    border: 5px solid;
    border-radius: 3px;
    position: absolute;
    top: 50px;
    left: -205px;
}

/* 플래너 데이 메모바 말풍선 css */
.plannerDayMemoBar:after {
    border-bottom: 10px solid #484848;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 0px solid transparent;
    content: "";
    position: absolute;
    left: 220px;
    top: -10px;
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
    border: 2px solid;
    border-radius: 3px;
    position: absolute;
    left: 1050px;
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
