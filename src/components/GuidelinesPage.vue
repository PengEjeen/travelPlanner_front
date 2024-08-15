<template>
    <section>
        <!-- 검색바-->
        <div class="guideLinesSearchBox">
            <form class="d-flex" role="search">
                <input
                    class="form-control me-2"
                    type="search"
                    placeholder="해외 국가명 검색"
                />
                <button class="btn btn-outline-success" type="submit">
                    Search
                </button>
            </form>
        </div>

        <!-- 게시판 -->
        <div class="guideLinesBoardBox">
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h1 class="guideLinesBoardTitle">외교부 게시판</h1>
                    <hr />
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                        >
                            Accordion Item #1
                        </button>
                    </h2>
                    <div
                        id="flush-collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div class="accordion-body">
                            Placeholder content for this accordion, which is
                            intended to demonstrate the class. This is the first
                            item's accordion body.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                        >
                            Accordion Item #2
                        </button>
                    </h2>
                    <div
                        id="flush-collapseTwo"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingTwo"
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div class="accordion-body">
                            Placeholder content for this accordion, which is
                            intended to demonstrate the class. This is the
                            second item's accordion body. Let's imagine this
                            being filled with some actual content.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseThree"
                            aria-expanded="false"
                            aria-controls="flush-collapseThree"
                        >
                            Accordion Item #3
                        </button>
                    </h2>
                    <div
                        id="flush-collapseThree"
                        class="accordion-collapse collapse"
                        aria-labelledby="flush-headingThree"
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div class="accordion-body">
                            Placeholder content for this accordion, which is
                            intended to demonstrate the class. This is the third
                            item's accordion body. Nothing more exciting
                            happening here in terms of content, but just filling
                            up the space to make it look, at least at first
                            glance, a bit more representative of how this would
                            look in a real-world application.
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
                            src="@/assets/icons/memo.png"
                            alt="국기 이미지"
                            id="nationalflagImg"
                        />
                        <div>
                            <h2>국가 이름</h2>
                            <p>기후</p>
                            <p>종교</p>
                            <p>수도</p>
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
                                    <p>???-???-???</p>
                                </h5>
                            </div>
                            <div class="form-group">
                                입국 허가 요건
                                <h5>
                                    <p>요건정보</p>
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
export default {};
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
    border-color: rgba(54, 212, 222, 1);
    color: rgba(54, 212, 222, 1);
}

.guideLinesSearchBox .d-flex .btn:hover {
    background-color: rgba(54, 212, 222, 1);
    color: white;
}

/* 가이드라인 게시판 css */
.guideLinesBoardBox {
    margin-top: 50px;
    width: 80%;
    margin-left: 10%;
    border: 1px solid black;
}

.guideLinesBoardTitle {
    margin-top: 20px;
}

.guideLinesBoardBox .accordion-body {
    text-align: left;
}

.guideLinesBoardBox .accordion-button:not(.collapsed) {
    background-color: #d6f0f4;
}

.guideLinesBoardBox .accordion-button:focus {
    display: none;
}

/* 가이드라인 상세정보 모달 css */
.guideLinesDeatilModalBox .modal-header {
    margin-top: 10px;
}

#nationalflagImg {
    width: 230px;
    height: 150px;
    margin-right: 0;
}

.guideLinesDeatilModalBox .modal-header div {
    clear: both;
    float: left;
    margin: 0;
}

.guideLinesDeatilModalBox .modal-header h2 {
    margin-left: 20px;
}

.guideLinesDeatilModalBox .modal-header p {
    margin-right: 80px;
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
