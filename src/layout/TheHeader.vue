<template>
    <header>
        <nav id="nav_main">
            <!-- 홈 로고 이미지 버튼 -->
            <router-link to="/">
                <img
                    src="@/assets/icons/logo.png"
                    alt="로고 이미지"
                    id="top_logo"
                />
            </router-link>

            <!-- 로그인 전 -->
            <ul class="nav justify-content-end" v-if="!user_id">
                <li class="nav-item">
                    <button
                        class="nav-link"
                        data-bs-target="#logInModal"
                        data-bs-toggle="modal"
                    >
                        로그인
                    </button>
                </li>
            </ul>

            <!-- 로그인 후 -->
            <ul class="nav justify-content-end" v-if="user_id">
                <li class="nav-item">
                    <router-link to="/ManualPage" class="dropdown-item"
                        ><button class="nav-link">이용방법</button></router-link
                    >
                </li>
                <li
                    class="nav-item"
                    data-bs-toggle="modal"
                    data-bs-target="#listModal"
                    @click="fetchSchedules(user_id)"
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
            aria-hidden="true"
            aria-labelledby="logInModalLabel"
            tabindex="-1"
        >
            <div
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
                                    id="loginUserid"
                                    v-model="loginUserid"
                                    placeholder="아이디를 입력하세요"
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="password"
                                    id="loginPassword"
                                    v-model="loginPassword"
                                    placeholder="비밀번호를 입력하세요"
                                />
                            </div>
                            <button
                                data-bs-dismiss="modal"
                                class="login-btn"
                                type="button"
                                @click="logIn()"
                            >
                                로그인
                            </button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            data-bs-dismiss="modal"
                            class="nav-btn"
                            @click="goSignPage()"
                        >
                            회원가입
                        </button>
                        <!-- <div class="right-buttons">
                            <button
                                class="nav-btn"
                            >
                                계정 찾기
                            </button>
                        </div> -->
                    </div>
                </div>
            </div>
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
            <div
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
                                    <div class="d-flex" role="search">
                                        <input
                                            class="form-control me-2"
                                            type="search"
                                            placeholder="여행 제목 검색"
                                        />
                                        <button
                                            class="btn btn-outline-success"
                                            type="button"
                                            @click="searchList()"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                                <!-- 리스트 모달 검색바 끝 -->
                            </div>
                            <div class="form-group">
                                <div>
                                    <h3>제목</h3>
                                </div>
                            </div>
                            <hr />
                            <!-- 리스트 모달 일정목록 -->
                            <!-- 일정 없을 경우 -->
                            <div v-if="schedules.length === 0">
                                <div class="form-group">
                                    <h5>일정이 없습니다.</h5>
                                </div>
                                <hr />
                            </div>
                            <!-- 일정 있을 경우 -->
                            <div v-if="schedules.length > 0">
                                <div
                                    v-for="(title, index) in schedules"
                                    :key="index"
                                    class="form-group"
                                >
                                    <div class="titleListBtnBox">
                                        <h5>{{ title.title }}</h5>
                                        <button
                                            data-bs-dismiss="modal"
                                            @click="reviseThisList(index)"
                                        >
                                            <img
                                                src="@/assets/icons/open.png"
                                                alt="자세히 보기 이미지"
                                                class="list_detail"
                                            />
                                        </button>
                                        <button @click="deleteThisList(index)">
                                            <img
                                                src="@/assets/icons/delete.png"
                                                alt="삭제 이미지"
                                                class="list_delete"
                                            />
                                        </button>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <!-- 리스트 모달 일정목록 끝 -->
                        </div>
                    </div>
                    <!-- 새 여행 일정 추가 버튼 -->
                    <div class="modal-footer">
                        <button
                            class="nav-btn"
                            id="makeListBtn"
                            @click="openPlannerPage"
                        >
                            여행 추가
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters({
            user_id: "userId",
        }),
    },
    data() {
        return {
            loginUserid: "",
            loginPassword: "",
            title: "",
            planner_id: "",
            schedules: [],
        };
    },
    methods: {
        ...mapActions(["updateUserId", "removeUserId"]),

        /* 리스트 모달 일정 목록 설정 */
        async fetchSchedules(user_id) {
            try {
                document.querySelector(".listModalSearchBox input").value = "";
                this.schedules = [];
                const response = await this.$axios.get(
                    "https://travelplanner.duckdns.org/api/planners/getPlanner/?format=json"
                );
                const plannerData = response.data;

                plannerData.forEach((item) => {
                    if (item.user_id === user_id) {
                        this.schedules.push({
                            title: item.title,
                            planner_id: item.planner_id,
                        });
                    }
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },

        /* 로그인 */
        async logIn() {
            try {
                const response = await this.$axios.post(
                    "https://travelplanner.duckdns.org/api/common/login/",
                    {
                        username: this.loginUserid,
                        password: this.loginPassword,
                    }
                );
                const { username } = response.data;
                if (username) {
                    this.updateUserId(username);
                    alert("귀하의 방문을 환영합니다.");
                    this.$router.push({ name: "MainPage" });
                } else {
                    console.error("Login failed: No username in response");
                    alert("로그인 실패: 사용자 정보를 확인하세요.");
                }
            } catch (error) {
                console.error("Login error:", error);
                alert("로그인 실패: 사용자 정보를 확인하세요.");
            }
        },

        /* 로그아웃 */
        logOut() {
            this.removeUserId();
            alert(
                "로그아웃이 확인되어 홈페이지로 이동합니다.\n다른 열어둔 창이 있으시다면 닫기 혹은 새로고침(F5)를 실행하십시오."
            );
            this.$router.push({ name: "MainPage" });
        },

        /* 회원가입 페이지로 이동 */
        goSignPage() {
            this.$router.push({ name: "SignPage" });
        },

        /* 리스트 모달 일정제목 검색 */
        async searchList() {
            try {
                const searchInput = document
                    .querySelector(".listModalSearchBox input")
                    .value.trim();

                if (searchInput === "") {
                    await this.fetchSchedules(this.user_id);
                    return;
                }

                const response = await this.$axios.get(
                    `https://travelplanner.duckdns.org/api/planners/getPlanner/?format=json&search=${encodeURIComponent(
                        searchInput
                    )}`
                );
                const plannerData = response.data;

                this.schedules = plannerData
                    .filter(
                        (item) =>
                            item.user_id === this.user_id &&
                            item.title
                                .toLowerCase()
                                .includes(searchInput.toLowerCase())
                    )
                    .map((item) => ({
                        title: item.title,
                        planner_id: item.planner_id,
                    }));
            } catch (error) {
                console.error("Error searching data:", error);
            }
        },

        /* 리스트 모달 여행일정 수정 */
        reviseThisList(index) {
            const planner_id = this.getScheduleIndexPlanner_id(index);

            const plannerUrl = `/PlannerPage?planner_id=${planner_id}`;
            window.open(plannerUrl, "_blank");
        },

        /* 리스트 모달 여행일정 삭제 */
        deleteThisList(index) {
            const plannerId = this.getScheduleIndexPlanner_id(index);

            const deleteApi = `https://travelplanner.duckdns.org/api/planners/${plannerId}/delete/`;

            fetch(deleteApi, {
                method: "DELETE",
            });

            this.schedules.splice(index, 1);
        },

        /* 리스트 모달 여행일정을 플래너 아이디로 변환 */
        getScheduleIndexPlanner_id(index) {
            const scheduleItem = this.schedules[index];
            const plannerId = scheduleItem.planner_id;

            return plannerId;
        },

        /* 리스트 모달 여행일정 생성 */
        openPlannerPage() {
            const user_id = this.user_id;
            const title = "여행 제목";

            fetch(
                "https://travelplanner.duckdns.org/api/planners/planner_create/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: user_id,
                        title: title,
                    }),
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    const planner_id = data.planner_id;
                    console.log("Planner created successfully:", data);
                    const plannerUrl = `/PlannerPage?planner_id=${planner_id}`;
                    window.open(plannerUrl, "_blank");
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
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
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin: 0 5px;
}

.nav-btn:hover {
    color: aquamarine;
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

/* 일정짜기 모달 검색바 css */
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

/* 일정짜기 모달 리스트 css */
.form-group div {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-group h3 {
    margin-bottom: auto;
}

.form-group h5 {
    margin: 0;
    flex-grow: 1;
    display: flex;
    align-items: center;
}

.form-group .titleListBtnBox {
    display: flex;
    gap: 20px;
}

.list_detail {
    width: 20px;
}

.list_delete {
    width: 23px;
}
</style>
