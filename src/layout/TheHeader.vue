<template>
    <!-- 헤더 -->
    <header>
        <nav id="nav_main">
            <router-link to="/">
                <img
                    src="@/assets/icons/logo.png"
                    alt="로고 이미지"
                    id="top_logo"
                />
            </router-link>

            <!-- 로그인 전 v-if="beforeLogIn"-->
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <button
                        class="nav-link"
                        data-bs-toggle="modal"
                        data-bs-target="#logInModal"
                    >
                        로그인
                    </button>
                </li>
            </ul>

            <!-- 로그인 후 v-if="afterLogIn"-->
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <button class="nav-link">이용방법</button>
                </li>
                <li
                    class="nav-item"
                    data-bs-toggle="modal"
                    data-bs-target="#listModal"
                >
                    <button class="nav-link">일정짜기</button>
                </li>

                <!-- 메뉴 드롭다운바 -->
                <li class="nav-item dropdown">
                    <a
                        to="/"
                        class="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        메뉴
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <router-link to="/MyPage" class="dropdown-item"
                                >내 정보</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="/FestivalPage"
                                class="dropdown-item"
                                >국내 행사 정보</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="/GuidelinesPage"
                                class="dropdown-item"
                                >여행 가이드라인</router-link
                            >
                        </li>
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                            <button @click="logOut()" class="dropdown-item">
                                로그아웃
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>

    <!-- 로그인 모달 -->
    <div class="logInModalBox">
        <div
            class="modal fade"
            id="logInModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="logInModalLabel"
            aria-hidden="true"
        >
            <form
                class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            >
                <div class="modal-content">
                    <div class="modal-header">
                        <img
                            src="@/assets/icons/logo.png"
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
                            <button class="login-btn" @click="logIn()">
                                <a class="nav-link">로그인</a>
                            </button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="nav-btn">
                            <router-link to="/SignPage" class="nav-link"
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
    </div>

    <!-- 일정짜기 모달 -->
    <div class="listModalBox">
        <div
            class="modal fade"
            id="listModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="listModalLabel"
            aria-hidden="true"
        >
            <form
                class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            >
                <div class="modal-content">
                    <div class="modal-header">
                        <h1>여행 목록</h1>
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
                                <!-- 리스트 모달 검색바 -->
                                <div class="listModalSearchBox">
                                    <form class="d-flex" role="search">
                                        <input
                                            class="form-control me-2"
                                            type="search"
                                            placeholder="여행 제목 검색"
                                        />
                                        <button
                                            class="btn btn-outline-success"
                                            type="submit"
                                        >
                                            Search
                                        </button>
                                    </form>
                                    <button @click="deleteAllList()">
                                        <img
                                            src="@/assets/icons/delete.png"
                                            alt="전부 삭제 이미지"
                                            class="list_allDelete"
                                        />
                                    </button>
                                </div>
                                <!-- 리스트 모달 검색바 끝 -->
                            </div>
                            <div class="form-group">
                                <h3>제목</h3>
                            </div>
                            <hr />
                            <!-- 리스트 모달 일정목록 -->
                            <!-- 일정 없을 경우 v-if="nullList"-->
                            <div class="form-group">
                                <h6>일정이 없어요..</h6>
                            </div>
                            <!-- 일정 하나라도 있을 경우 v-if="notNullList"-->
                            <div class="form-group">
                                <h6>여행일정 1</h6>
                                <div>
                                    <button>
                                        <img
                                            src="@/assets/icons/open.png"
                                            alt="자세히 보기 이미지"
                                            class="list_detail"
                                        />
                                    </button>
                                    <button @click="deleteThisList()">
                                        <img
                                            src="@/assets/icons/delete.png"
                                            alt="삭제 이미지"
                                            class="list_delete"
                                        />
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <!-- 리스트 모달 일정목록 끝 -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            class="nav-btn"
                            id="makeListBtn"
                            data-bs-dismiss="modal"
                            @click="openPlannerPage"
                        >
                            여행 추가
                        </button>
                    </div>
                </div>
            </form>
        </div>
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
        logIn() {
            /* 받은 아이디와 비밀번호를 조회하여 로그인하는 코드 */
        },
        logOut() {
            /*로그아웃하는 코드 */
        },
        deleteAllList() {
            /* 여행 목록 모달에 뜰 모든 목록 정보 삭제하는 코드*/
        },
        deleteThisList() {
            /*클릭한 라인 목록 정보 삭제하는 코드  */
        },
        openPlannerPage() {
            const routeUrl = this.$router.resolve({ name: "PlannerPage" }).href;
            window.open(routeUrl, "_blank");
        },
    },
};
</script>

<style>
/* 헤더 css */
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

/* 로그인 모달 css */
.modal-header {
    border-bottom: none !important;
}

.modal-footer {
    border-top: none !important;
}

.logInModalBox .btn-close {
    margin-top: -170px !important;
}

.logInModalBox .login_logo {
    margin-left: 35%;
    width: 150px;
    height: 180px;
}

.logInModalBox .form-group {
    margin-top: 0px;
    margin-bottom: 15px;
}

.logInModalBox .form-group label {
    display: block;
    margin-bottom: 5px;
}

.logInModalBox .form-group input {
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
    margin-bottom: 15px;
}

/* 일정짜기 모달 */
#makeListBtn {
    background-color: rgba(54, 212, 222, 1);
    color: #fff;
}

.listModalBox .modal-header h1 {
    margin-left: 32%;
    margin-top: 20px;
}

.listModalBox .btn-close {
    margin-top: -60px !important;
}

.listModalSearchBox {
    margin-left: 15%;
    margin-bottom: 20px;
}

.listModalSearchBox .d-flex .btn {
    border-color: rgba(54, 212, 222, 1);
    color: rgba(54, 212, 222, 1);
}

.listModalSearchBox .d-flex .btn:hover {
    background-color: rgba(54, 212, 222, 1);
    color: white;
}

.listModalSearchBox .list_allDelete {
    width: 32px;
}

.form-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-group h6 h3 {
    text-align: left;
}

.list_detail {
    width: 20px;
}

.list_delete {
    width: 23px;
}

.form-group h6 {
    margin: 0;
    flex-grow: 1;
    display: flex;
    align-items: center;
}

.form-group div {
    display: flex;
    gap: 15px;
}
</style>
