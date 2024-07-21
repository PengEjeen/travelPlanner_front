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
                            intended to demonstrate the
                            <code>.accordion-flush</code> class. This is the
                            first item's accordion body.
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
                            intended to demonstrate the
                            <code>.accordion-flush</code> class. This is the
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
                            intended to demonstrate the
                            <code>.accordion-flush</code> class. This is the
                            third item's accordion body. Nothing more exciting
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
</style>
