<template>
    <div class="manualImgBox">
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
                    aria-current="true"
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
                    <div class="carousel-item active">
                        <img
                            src="@/assets/imgs/slide1.png"
                            class="d-block w-100"
                            alt="slide1"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/imgs/slide2.jpg"
                            class="d-block w-100"
                            alt="slide2"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/imgs/slide3.jpg"
                            class="d-block w-100"
                            alt="slide3"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/imgs/slide4.jpg"
                            class="carouseld-block w-100"
                            alt="slide4"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/imgs/slide5.png"
                            class="d-block w-100"
                            alt="slide5"
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

<style></style>
