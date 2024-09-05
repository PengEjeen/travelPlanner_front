<template>
    <section class="mainPageSlideBox">
        <!-- 슬라이드 -->
        <div
            id="carouselExampleDark"
            class="carousel carousel-dark slide"
            data-bs-ride="carousel"
        >
            <div class="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="0"
                    class="active"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="4"
                    aria-label="Slide 5"
                ></button>
            </div>
            <div
                id="carouselExampleAutoplaying"
                class="carousel slide"
                data-bs-ride="carousel"
            >
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="5000">
                        <img
                            src="@/assets/imgs/slide1.png"
                            class="d-block w-100"
                            alt="slide1"
                        />
                        <p class="mainSlideSpan1">
                            반복되는 일상, 벗어나고 싶지 않나요?
                        </p>
                        <p class="mainSlideSpan1_plus">우리 떠나봐요</p>
                    </div>
                    <div class="carousel-item" data-bs-interval="4500">
                        <img
                            src="@/assets/imgs/slide2.jpg"
                            class="d-block w-100"
                            alt="slide2"
                        />
                        <p class="mainSlideSpan2">새로움을 원하시나요?</p>
                    </div>
                    <div class="carousel-item" data-bs-interval="4500">
                        <img
                            src="@/assets/imgs/slide3.jpg"
                            class="d-block w-100"
                            alt="slide3"
                        />
                        <p class="mainSlideSpan3">관광을 원하시나요?</p>
                    </div>
                    <div class="carousel-item" data-bs-interval="4500">
                        <img
                            src="@/assets/imgs/slide4.jpg"
                            class="carouseld-block w-100"
                            alt="slide4"
                        />
                        <p class="mainSlideSpan4">야경을 원하시나요?</p>
                    </div>
                    <div class="carousel-item" data-bs-interval="4500">
                        <img
                            src="@/assets/imgs/slide5.png"
                            class="d-block w-100"
                            alt="slide5"
                        />
                        <p class="mainSlideSpan5">휴식을 원하시나요?</p>
                    </div>
                </div>
            </div>
            <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
            >
                <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
            >
                <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </section>
    <TheFooter />
</template>

<script>
import TheFooter from "@/layout/TheFooter.vue";

export default {
    name: "MainPage",
    components: {
        TheFooter,
    },
};
</script>

<style>
.mainPageSlideBox {
    margin-top: 60px;
}

/* 슬라이드 이미지 css */
.mainPageSlideBox .carousel-item img {
    height: calc(100vh - 60px);
}

/* 슬라이드 흥보 글 css */
.mainSlideSpan1 {
    position: absolute;
    left: 32%;
    top: 80px;
    font-size: 50px;
    font-weight: bold;
    font-style: italic;
    color: rgba(54, 212, 222, 1);
}

.mainSlideSpan1_plus {
    position: absolute;
    left: 20%;
    top: 470px;
    font-size: 50px;
    font-weight: bold;
    font-style: italic;
    color: rgba(54, 212, 222, 1);
}

.mainSlideSpan2 {
    position: absolute;
    left: 60%;
    top: 560px;
    font-size: 50px;
    font-weight: bold;
    font-style: italic;
    color: rgba(54, 212, 222, 1);
}

.mainSlideSpan3 {
    position: absolute;
    left: 60%;
    top: 580px;
    font-size: 50px;
    font-weight: bold;
    font-style: italic;
}

.mainSlideSpan4 {
    position: absolute;
    left: 60%;
    top: 560px;
    font-size: 50px;
    font-weight: bold;
    font-style: italic;
    color: rgba(54, 212, 222, 1);
}

.mainSlideSpan5 {
    position: absolute;
    left: 60%;
    top: 560px;
    font-size: 50px;
    font-weight: bold;
    font-style: italic;
}

/* 슬라이드 하단 버튼 css */
.mainPageSlideBox .carousel-indicators button {
    border-radius: 50%;
    background-color: white !important;
    height: 18px;
    width: 18px;
    margin: 10px;
}

.mainPageSlideBox .carousel-control-prev-icon,
.carousel-control-next-icon {
    height: 120px !important;
    width: 120px !important;
}
</style>
