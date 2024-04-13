<template>
  <header>
            <nav id="nav_main">
                <router-link to="/"
                    ><img
                        src="@/assets/logo.png"
                        alt="로고 이미지"
                        id="top_logo"
                /></router-link>
                <ul class="nav justify-content-end">
                    <li class="nav-item">
                        <a href="#main_searchCity" class="nav-link">여행지</a>
                    </li>
                    <li class="nav-item">
                        <router-link to="/" class="nav-link"
                            >고객지원</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link to="/" class="nav-link"
                            >이용방법</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link to="/" class="nav-link"
                            >로그인</router-link
                        >
                    </li>
                </ul>
            </nav>
        </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>