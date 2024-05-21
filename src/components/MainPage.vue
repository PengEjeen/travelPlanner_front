<template>
    <section>
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
                            src="@/assets/slide1.png"
                            class="d-block w-100"
                            alt="slide1"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/slide2.jpg"
                            class="d-block w-100"
                            alt="slide2"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/slide3.jpg"
                            class="d-block w-100"
                            alt="slide3"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/slide4.jpg"
                            class="carouseld-block w-100"
                            alt="slide4"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            src="@/assets/slide5.png"
                            class="d-block w-100"
                            alt="slide5"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer>
        <p>
            캡스톤 | 3조 <br />
            조남영 정규민 박성엽 방유민<br />
            한신대학교<br />
            <span>Copyright &copy; 3조. All Rights Reserved.</span>
        </p>
    </footer>
</template>

<script>
export default {};
</script>

<style>
.carousel-indicators button {
    border-radius: 50% !important;
    background-color: white !important;
    height: 15px !important;
    width: 15px !important;
    margin: 10px !important;
}

footer {
    height: 140px;
    background-color: gray;
    text-align: left;
    background: linear-gradient(to right, #d6f0f4, #91afe2);
}

footer p {
    padding-left: 50px;
    padding-top: 15px;
    padding-bottom: 15px;
}

footer p span {
    display: inline-block;
    margin-top: 12px;
}
</style>
