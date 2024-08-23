<template>
    <div class="calendarPlanBox">
        <!-- 일정 리스트 구역 -->
        <div class="planListContainer">
            <div class="planListTitleBox">
                <!-- 여행제목의 프린트일 경우 -->
                <span v-if="plannerTitle">{{ plannerTitle }}</span>
                <!-- 날짜의 프린트일 경우 -->
                <span v-if="!plannerTitle">{{ dayText }}</span>
                <!-- 프린트 버튼 -->
                <button class="printImgBtn">
                    <img src="@/assets/icons/print.png" alt="프린트 이미지" />
                </button>
            </div>
            <div class="planListDetailBox">
                <!-- 여행제목의 프린트일 경우 -->
                <div v-if="plannerTitle">
                    <div v-for="(day, index) in cells" :key="index">
                        <div>
                            <div class="dayItems">Day {{ index + 1 }}</div>
                            <div
                                v-for="(detail, detailIndex) in day.details"
                                :key="detailIndex"
                                class="detailItems"
                            >
                                {{ detail.detail }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 날짜의 프린트일 경우 -->
                <div v-if="!plannerTitle">
                    <div
                        v-for="(detail, index) in dayDetails"
                        :key="index"
                        class="dayItems"
                    >
                        {{ detail.detail }}
                    </div>
                </div>
            </div>
        </div>
        <!-- 구글맵 이미지 구역 -->
        <div class="mapContainer">
            <img
                v-for="(image, index) in images"
                :key="index"
                :src="image"
                alt="지도 테스트 이미지"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            plannerTitle: "",
            dayIndex: "",
            cells: [],
            dayDetails: null,
            images: [],
        };
    },
    computed: {
        dayText() {
            return `${this.dayIndex}일차`;
        },
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        this.dayIndex = urlParams.get("index");

        if (urlParams.has("plannerData")) {
            // printPlanner()로 넘어온 경우
            const plannerData = decodeURIComponent(
                urlParams.get("plannerData")
            );
            const parsedData = JSON.parse(plannerData);
            this.plannerTitle = parsedData.title;
            this.cells = parsedData.cells;
        } else if (urlParams.has("day")) {
            // plannerDay_print()로 넘어온 경우
            const dayData = decodeURIComponent(urlParams.get("day"));
            this.dayDetails = JSON.parse(dayData).details;
        }

        this.images = Array(4)
            .fill()
            .map((_, index) => {
                const imgNum =
                    index % 2 === 0
                        ? "searchUp_arrow.png"
                        : "searchDown_arrow.png";
                const imagePath = require(`@/assets/icons/${imgNum}`);
                return imagePath;
            });
    },
};
</script>

<style>
/* 캘린더 구성요소 박스 css */
.calendarPlanBox {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-top: 60px;
}

/* 캘린더 일정목록 창 css */
.calendarPlanBox .planListContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 750px;
}

.planListContainer .planListTitleBox {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 50px;
    color: black;
    margin-top: 20px;
    align-self: flex-start;
    margin-left: 100px;
}

/* 캘린더 큰 정보 css */
.planListDetailBox .dayItems {
    border-radius: 50%;
    background-color: skyblue;
    font-size: 30px;
    width: 500px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid;
}

/* 캘린더 작은 정보 css */
.planListDetailBox .detailItems {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: skyblue;
    font-size: 20px;
    width: 250px;
    margin: 10px auto;
}

/* 캘린더 지도 창 css */
.calendarPlanBox .mapContainer {
    display: flex;
    flex-direction: column;
    flex: 2;
    right: 0px;
    position: fixed;
    height: 100vh;
    width: calc(100vw - 800px);
}
.mapContainer img {
    width: 50px; /* 이미지 너비 */
}
</style>
