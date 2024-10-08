<template>
    <div class="manualPageBox">
        <!-- 사이드 메뉴얼 스크롤 스파이 -->
        <div class="manualScrollspyBox">
            <div class="manualScrollspyHeader">
                <h1>이용 방법</h1>
            </div>
            <div class="manualScrollspyBody">
                <a href="#howMakePlan">일정짜기</a>
                <a href="#howUseMyPage">내 정보</a>
                <a href="#howUseFestivalPage">국내 행사 정보</a>
                <a href="#howUseGuidelinesPage">여행 가이드라인</a>
                <a href="#howLogOut">로그아웃</a>
            </div>
        </div>

        <!-- 이용방법 설명 슬라이드 -->
        <div class="manualSlideBox">
            <!-- 일정짜기 메뉴얼 슬라이드 -->
            <div id="howMakePlan" class="carousel slide" data-bs-theme="dark">
                <div class="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="0"
                        class="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="3"
                        aria-label="Slide 4"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="4"
                        aria-label="Slide 5"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="5"
                        aria-label="Slide 6"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="6"
                        aria-label="Slide 7"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="7"
                        aria-label="Slide 8"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="8"
                        aria-label="Slide 9"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="9"
                        aria-label="Slide 10"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="10"
                        aria-label="Slide 11"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="11"
                        aria-label="Slide 12"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howMakePlan"
                        data-bs-slide-to="12"
                        aria-label="Slide 13"
                    ></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img
                            src="@/assets/manualImgs/plannerPage_1.png"
                            class="d-block w-100"
                            alt="slide1"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/plannerPage_2.png"
                            class="d-block w-100"
                            alt="slide2"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/plannerPage_3.png"
                            class="d-block w-100"
                            alt="slide3"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/plannerPage_4.png"
                            class="d-block w-100"
                            alt="slide4"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/plannerPage_5.png"
                            class="d-block w-100"
                            alt="slide5"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/plannerPage_6.png"
                            class="d-block w-100"
                            alt="slide6"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/plannerPage_7.png"
                            class="d-block w-100"
                            alt="slide7"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/plannerPage_8.png"
                            class="d-block w-100"
                            alt="slide8"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/plannerPage_9.png"
                            class="d-block w-100"
                            alt="slide9"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/plannerPage_10.png"
                            class="d-block w-100"
                            alt="slide10"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/plannerPage_11.png"
                            class="d-block w-100"
                            alt="slide11"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/plannerPage_12.png"
                            class="d-block w-100"
                            alt="slide12"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/plannerPage_13.png"
                            class="d-block w-100"
                            alt="slide13"
                        />
                    </div>
                </div>
                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#howMakePlan"
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
                    data-bs-target="#howMakePlan"
                    data-bs-slide="next"
                >
                    <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <!-- 내정보 메뉴얼 슬라이드 -->
            <div id="howUseMyPage" class="carousel slide" data-bs-theme="dark">
                <div class="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#howUseMyPage"
                        data-bs-slide-to="0"
                        class="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howUseMyPage"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howUseMyPage"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img
                            src="@/assets/manualImgs/myPage_1.png"
                            class="d-block w-100"
                            alt="slide1"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/myPage_2.png"
                            class="d-block w-100"
                            alt="slide2"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/myPage_3.png"
                            class="d-block w-100"
                            alt="slide3"
                        />
                    </div>
                </div>
                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#howUseMyPage"
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
                    data-bs-target="#howUseMyPage"
                    data-bs-slide="next"
                >
                    <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <!-- 국내 행사 정보 메뉴얼 슬라이드 -->
            <div
                id="howUseFestivalPage"
                class="carousel slide"
                data-bs-theme="dark"
            >
                <div class="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#howUseFestivalPage"
                        data-bs-slide-to="0"
                        class="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howUseFestivalPage"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howUseFestivalPage"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img
                            src="@/assets/manualImgs/festivalPage_1.png"
                            class="d-block w-100"
                            alt="slide1"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/festivalPage_2.png"
                            class="d-block w-100"
                            alt="slide2"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/festivalPage_3.png"
                            class="d-block w-100"
                            alt="slide3"
                        />
                    </div>
                </div>
                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#howUseFestivalPage"
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
                    data-bs-target="#howUseFestivalPage"
                    data-bs-slide="next"
                >
                    <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <!-- 여행 가이드라인 메뉴얼 슬라이드 -->
            <div
                id="howUseGuidelinesPage"
                class="carousel slide"
                data-bs-theme="dark"
            >
                <div class="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#howUseGuidelinesPage"
                        data-bs-slide-to="0"
                        class="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howUseGuidelinesPage"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howUseGuidelinesPage"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#howUseGuidelinesPage"
                        data-bs-slide-to="3"
                        aria-label="Slide 4"
                    ></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img
                            src="@/assets/manualImgs/guidelinesPage_1.png"
                            class="d-block w-100"
                            alt="slide1"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/guidelinesPage_2.png"
                            class="d-block w-100"
                            alt="slide2"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/guidelinesPage_3.png"
                            class="d-block w-100"
                            alt="slide3"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/manualImgs/guidelinesPage_4.png"
                            class="d-block w-100"
                            alt="slide4"
                        />
                    </div>
                </div>
                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#howUseGuidelinesPage"
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
                    data-bs-target="#howUseGuidelinesPage"
                    data-bs-slide="next"
                >
                    <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <!-- 로그아웃 메뉴얼 슬라이드 -->
            <div id="howLogOut" class="carousel slide" data-bs-theme="dark">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img
                            src="@/assets/manualImgs/logOut.png"
                            class="d-block w-100"
                            alt="slide1"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
/* 플래너 구성요소 박스 css */
.manualPageBox {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-top: 60px;
}

.manualPageBox .manualSlideBox {
    flex: 2;
    margin-left: 250px;
}

.manualPageBox .manualSlideBox .carousel {
    border: 2px solid black;
}

/* 메뉴얼페이지 스크롤스파이 박스 css */
.manualScrollspyBox {
    background: linear-gradient(to top right, #d4f1f9, #ffffff);
    flex: 1;
    height: 100vh;
    position: fixed;
    top: 0;
    width: 250px;
    overflow: hidden;
}

.manualScrollspyHeader {
    margin-top: 100px;
}

.manualScrollspyBody {
    margin-top: 30px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 18px;
}

.manualScrollspyBox .manualScrollspyBody a {
    cursor: pointer;
    text-decoration: none;
    color: black;
}

.manualScrollspyBox .manualScrollspyBody a:hover {
    color: rgba(54, 212, 222, 1) !important;
}

/* 메뉴얼 슬라이드 css */
.manualSlideBox .carousel-item img {
    height: calc(100vh - 60px);
}

.manualSlideBox .carousel-indicators button {
    border-radius: 50%;
    height: 18px;
    width: 18px;
    margin: 10px;
}

.manualSlideBox .carousel-control-prev-icon,
.manualSlideBox .carousel-control-next-icon {
    height: 120px !important;
    width: 120px !important;
}
</style>
