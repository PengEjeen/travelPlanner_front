<template>
    <section>
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
                    <div
                        id="simple-list-example"
                        class="d-flex flex-column gap-2 simple-list-example-scrollspy text-center"
                    >
                        <a class="p-1 rounded" href="#simple-list-item-1"
                            >Day 1</a
                        >
                        <a class="p-1 rounded" href="#simple-list-item-2"
                            >Day 2</a
                        >
                        <a class="p-1 rounded" href="#simple-list-item-3"
                            >Day 3</a
                        >
                        <a class="p-1 rounded" href="#simple-list-item-4"
                            >Day 4</a
                        >
                        <a class="p-1 rounded" href="#simple-list-item-5"
                            >Day 5</a
                        >
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
                    <button @click="savePlannerPage()">저장</button>
                </div>
            </div>
            <div class="rightContainer">
                <!-- 제목창-->
                <div id="plannerPlanTopItemsTitle" class="plannerPlanTopBox">
                    <input
                        type="text"
                        ref="input"
                        v-model="inputValue"
                        @input="adjustWidth"
                        :style="{ width: inputWidth }"
                        class="plannerPlanInputTitle"
                        placeholder="여행 제목"
                    />
                    <!-- 프린트 버튼 -->
                    <button class="printImgBtn">
                        <img
                            src="@/assets/icons/print.png"
                            alt="프린트 이미지"
                            @click="changePlannerPlanTitle()"
                        />
                    </button>
                </div>

                <!-- 플랜 세부 정보창-->
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
                            <!-- 일정이 없을 때 v-if="nullPlannerPlan"-->
                            <div id="simple-list-item-1" class="plannerDayFont">
                                "<span style="color: rgba(54, 212, 222, 1)">
                                    +Day추가 </span
                                >" 버튼으로 일정을 추가하십시오.
                            </div>
                            <!-- 일정이 있을 경우 v-if="notNullPlannerPlan"-->
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
                                        class="plannerDaymenuBar"
                                    >
                                        <button
                                            class="plannerDayMenu_memoBtn"
                                            @click="firstFunction()"
                                        >
                                            <img
                                                src="@/assets/icons/memo.png"
                                                alt="데이 메뉴바 메모 이미지"
                                            />
                                        </button>
                                        <button
                                            class="plannerDayMenu_plusDetailBoxBtn"
                                            @click="secondFunction()"
                                        >
                                            <img
                                                src="@/assets/icons/expandPlan.png"
                                                alt="데이 메뉴바 세부사항 칸 추가 이미지"
                                            />
                                        </button>
                                        <button
                                            class="plannerDayMenu_printBtn"
                                            @click="thirdFunction()"
                                        >
                                            <img
                                                src="@/assets/icons/printPlan.png"
                                                alt="데이 메뉴바 프린트 이미지"
                                            />
                                        </button>
                                        <button
                                            class="plannerDayMenu_deleteBtn"
                                            @click="fourthFunction()"
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
                                <div
                                    class="plannerDetailBox plannerDetatilFont"
                                >
                                    우리 반점
                                    <div class="plannerDetailBtnBox">
                                        <button
                                            class="plannerdetailMemoBtn"
                                            type="button"
                                            @click="plannerdetailMemo()"
                                        >
                                            <img
                                                src="@/assets/icons/memo.png"
                                                alt="세부사항 메모 이미지"
                                            />
                                        </button>
                                        <button
                                            class="plannerdetailDeleteBtn"
                                            type="button"
                                            @click="plannerdetailDelete()"
                                        >
                                            <img
                                                src="@/assets/icons/delete.png"
                                                alt="세부사항 삭제 이미지"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            inputValue: "",
            inputWidth: "",
            activeMenu: null,
            days: [1, 2, 3, 4, 5],
        };
    },
    methods: {
        plusDay() {
            this.days.push(this.days.length + 1); /*데이 칸 추가하는 코드 */
        },
        savePlannerPage() {
            /*화면 정보들을 저장하는 코드 */
        },
        changePlannerPlanTitle() {
            /*변경된 총 일정 제목 저장하는 코드 */
        },
        adjustWidth() {
            const inputElement = this.$refs.input;
            const span = document.createElement("span");
            span.textContent = this.inputValue || inputElement.placeholder;
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
            this.inputWidth = `${Math.max(newWidth, 50)}px`;

            document.body.removeChild(span);
        },
        toggleMenu(index) {
            this.activeMenu = this.activeMenu === index ? null : index;
        },
        firstFunction() {
            alert("메모 버튼 클릭됨");
        },
        secondFunction() {
            alert("세부사항 추가 버튼 클릭됨");
        },
        thirdFunction() {
            alert("프린트 버튼 클릭됨");
        },
        fourthFunction() {
            alert("삭제 버튼 클릭됨");
        },
        plannerdetailMemo() {
            // 선택한 플래너 세부사항 칸 메모 코드
        },
        plannerdetailDelete() {
            // 선택한 플래너 세부사항 칸 삭제 코드
        },
    },
    mounted() {
        this.adjustWidth();
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

.rightContainer {
    display: flex;
    flex-direction: column;
    flex: 2;
    gap: 20px;
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
    flex-direction: row;
    position: fixed;
    bottom: 15px;
    left: 40px;
    right: 15px;
    width: auto;
    box-sizing: border-box;
    justify-content: space-between;
}

.plannerPlanScrollspyBottomBtnBox button {
    background-color: rgba(54, 212, 222, 1);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 25px;
    width: 120px;
}

.plannerPlanScrollspyBottomBtnBox div button {
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
.rightContainer .scrollspy-example {
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
.plannerDaymenuBar {
    background-color: white;
    display: flex;
    align-items: center;
    gap: 20px;
    border: 2px solid;
    position: absolute;
    right: 320px;
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

/* 플래너 디테일 칸 css */
.PlannerPlanInformationBox .plannerDetailBox {
    border: 1px solid;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
</style>
