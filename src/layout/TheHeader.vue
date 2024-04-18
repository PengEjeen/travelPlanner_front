<template>
    <header>
        <nav id="nav_main">
            <router-link to="/"
                ><img src="@/assets/logo.png" alt="로고 이미지" id="top_logo"
            /></router-link>
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <a href="#main_searchCity" class="nav-link">여행지</a>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link">고객지원</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link">이용방법</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link">로그인</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script></script>

<style>
header {
    background-color: white;
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
}

#nav_main {
    margin: 10px 25px;
}

#top_logo {
    float: left;
    height: 40px;
}

header .nav-link {
    color: black !important;
    cursor: pointer;
}

header .nav-link:hover {
    color: aquamarine !important;
}
</style>
