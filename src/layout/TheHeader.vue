<template>
    <header>
        <nav id="nav_main">
            <img src="@/assets/logo.png" alt="로고 이미지" id="top_logo" />
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <button
                        @click="showLoginForm"
                        class="nav-link"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                    >
                        로그인
                    </button>
                </li>
            </ul>
        </nav>
    </header>

    <!-- 로그인 모달 -->
    <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
    >
        <form
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        >
            <div class="modal-content">
                <div class="modal-header">
                    <img
                        src="@/assets/logo.png"
                        alt="로고 이미지"
                        class="login_logo"
                    />
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
                            <input
                                type="text"
                                id="ID"
                                v-model="username"
                                placeholder="아이디를 입력하세요"
                            />
                        </div>
                        <div class="form-group">
                            <input
                                type="password"
                                id="password"
                                v-model="password"
                                placeholder="비밀번호를 입력하세요"
                            />
                        </div>
                        <button class="login-btn" @click="login">
                            <router-link to="/" class="nav-link"
                                >로그인</router-link
                            >
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="nav-btn">
                        <router-link to="/" class="nav-link"
                            >회원가입</router-link
                        >
                    </button>
                    <div class="right-buttons">
                        <button class="nav-btn">
                            <router-link to="/" class="nav-link"
                                >아이디 | 비밀번호 찾기</router-link
                            >
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ID: "",
            password: "",
        };
    },
    methods: {
        login() {},
    },
};
</script>

<style>
header {
    height: 60px;
    z-index: 100;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to right, #d6f0f4, #91afe2);
}

#nav_main {
    padding: 8px 25px;
}

#top_logo {
    float: left;
    height: 55px;
    width: 60px;
}

header .nav-link {
    padding-top: 10px;
    color: black !important;
    cursor: pointer;
}

header .nav-link:hover {
    color: aquamarine !important;
}

.btn-close {
    margin-top: -80px !important;
}

.login_logo {
    margin-left: 40%;
    width: 100px;
    height: 100px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.login-btn {
    width: 100%;
    padding: 10px;
    background-color: rgba(54, 212, 222, 1);
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin-bottom: 15px;
}

.nav-btn {
    display: inline-block;
    padding: 10px;
    background-color: transparent;
    color: #000; /* Change color to black */
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin: 0 5px;
}

.nav-btn:hover {
    background-color: #f2f2f2;
}
</style>
