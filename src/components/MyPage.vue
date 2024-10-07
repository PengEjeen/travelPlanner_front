<template>
    <section>
        <!-- 내 정보 확인 창 -->
        <div class="reviseBox">
            <div class="reviseForm">
                <div class="header">
                    <img
                        src="@/assets/icons/logo.png"
                        alt="Logo"
                        class="revise_logo"
                    />
                </div>
                <div>
                    <div class="form-group">
                        <label for="reviseUserId">아이디</label>
                        <input
                            type="text"
                            id="reviseUserId"
                            v-model="myInfo.reviseUserId"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="revisePassword">비밀번호</label>
                        <input
                            type="text"
                            id="revisePassword"
                            v-model="myInfo.revisePassword"
                            placeholder="변경하실 비밀번호"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="reviseEmail">이메일</label>
                        <input
                            type="email"
                            id="reviseEmail"
                            v-model="myInfo.reviseEmail"
                            required
                        />
                    </div>
                    <!--수정 버튼 -->
                    <div class="form-group button-group">
                        <button
                            type="button"
                            class="submit-button"
                            @click="reviseMyInfo"
                        >
                            수정
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 회원 탈퇴 Btn -->
        <button
            id="withdrawBtn"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#withdrawModal"
        >
            회원 탈퇴
        </button>
    </section>

    <!-- 회원 탈퇴 모달 -->
    <div class="withdrawModalBox">
        <div
            class="modal fade"
            id="withdrawModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="withdrawModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <h4>귀하의 계정을 삭제하시겠습니까?</h4>
                        <p>삭제된 계정 정보는 복구하실 수 없습니다.</p>
                    </div>
                    <div class="modal-footer">
                        <button
                            data-bs-dismiss="modal"
                            class="withdrawModalBtn"
                            @click="withdrawAccount"
                        >
                            확인
                        </button>
                        <button
                            class="withdrawModalBtn"
                            data-bs-dismiss="modal"
                        >
                            취소
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
            myInfo: {
                reviseUserId: "",
                revisePassword: "",
                reviseEmail: "",
            },
            isFormDirty: true,
        };
    },
    methods: {
        ...mapActions(["updateUserId", "removeUserId"]),

        /* 내정보 아이디,비밀번호,이메일 설정 */
        async fetchMyPageData() {
            this.myInfo = {};

            try {
                const myInfoResponse = await this.$axios.get(
                    `https://travelplanner.duckdns.org/api/common/userinfo/${this.user_id}/`
                );

                const myInfoData = myInfoResponse.data;

                this.myInfo.reviseUserId = myInfoData.username;
                this.myInfo.reviseEmail = myInfoData.email;
                this.myInfo.revisePassword = "";
            } catch (error) {
                console.error(
                    `Error fetching myPage info for ${this.user_id}:`,
                    error
                );
                this.myInfo.reviseUserId = "아이디 정보 오류";
                this.myInfo.revisePassword = "패스워드 정보 오류";
                this.myInfo.reviseEmail = "이메일 정보 오류";
            }
        },

        /* 내정보 비밀번호 제한규정 */
        isValidPassword(password) {
            if (password.length < 8) {
                return false;
            }

            const commonPasswords = [
                "12345678",
                "password",
                "qwerty",
                "11111111",
                "123456789",
                "1234567890",
            ];

            if (commonPasswords.includes(password)) {
                return false;
            }

            return true;
        },

        /* 내정보 이메일 제한규정 */
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        /* 내정보 수정 */
        async reviseMyInfo() {
            if (
                this.myInfo.reviseUserId === "" ||
                !this.isValidPassword(this.myInfo.revisePassword) ||
                this.myInfo.reviseEmail === ""
            ) {
                alert("아이디, 비밀번호, 이메일을 모두 입력하십시오.");
                return;
            }

            if (!this.isValidEmail(this.myInfo.reviseEmail)) {
                alert("올바른 이메일 형식을 입력하십시오.");
                return;
            }
            try {
                const shipMyInfo = {
                    myInfo: {
                        reviseUserId: this.myInfo.reviseUserId,
                        revisePassword: this.myInfo.revisePassword,
                        reviseEmail: this.myInfo.reviseEmail,
                    },
                };

                await this.$axios.put(
                    `https://travelplanner.duckdns.org/api/common/userinfo/update/${this.user_id}/`,
                    {
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        },
                        body: shipMyInfo,
                    }
                );

                alert("회원님의 정보가 수정되었습니다.");

                this.updateUserId(this.myInfo.reviseUserId);
                this.fetchMyPageData();
            } catch (error) {
                console.error(
                    "Error saving planner data:",
                    error.response?.data || error.message
                );
            }
        },

        /* 내정보 계정 삭제 */
        async withdrawAccount() {
            try {
                const deleteResponse = await this.$axios.delete(
                    `https://travelplanner.duckdns.org/api/common/delete/${this.user_id}/`
                );
                console.log("Delete response:", deleteResponse.data);
                alert("귀하의 계정 삭제가 완료되었습니다.");
                this.isFormDirty = false;
                this.removeUserId();

                this.$router.push({ name: "MainPage" });
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("삭제 중 오류가 발생했습니다.");
            }
        },

        /* 내정보 닫기&새로고침 할 경우 경고창 띄우기 */
        handleBeforeUnload(event) {
            if (this.isFormDirty) {
                const message =
                    "변경 사항이 저장되지 않을 수 있습니다. 정말로 떠나시겠습니까?";
                event.returnValue = message;
                return message;
            }
        },
    },
    mounted() {
        if (!this.user_id) {
            alert("로그아웃이 확인되어 홈페이지로 이동합니다.");
            this.$router.push({ name: "MainPage" });
        }

        window.addEventListener("beforeunload", this.handleBeforeUnload);
        this.fetchMyPageData();
    },
    /* 내정보 닫기&새로고침 감지 설정 */
    beforeUnmount() {
        window.removeEventListener("beforeunload", this.handleBeforeUnload);
    },
    /* 내정보 다른 페이지로 이동할 경우 경고창 띄우기 */
    beforeRouteLeave(to, from, next) {
        if (!this.user_id) {
            this.isFormDirty = false;
        }

        if (!this.isFormDirty) {
            next();
        } else {
            const message =
                "변경 사항이 저장되지 않을 수 있습니다. 정말로 떠나시겠습니까?";

            const answer = window.confirm(message);
            if (answer) {
                next();
            } else {
                next(false);
            }
        }
    },
};
</script>

<style>
/* 내정보 수정 창 css */
.reviseBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(to top right, #d4f1f9, #ffffff);
}

.reviseForm {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid gray;
    width: 100vh;
}

.reviseBox .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.revise_logo {
    width: 150px;
    height: 150px;
}

.reviseBox .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    justify-content: center;
}

.reviseBox label {
    width: 80px;
    margin-right: 10px;
    font-weight: bold;
}

.reviseBox .form-group input {
    flex: 0.7;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.reviseBox .button-group {
    justify-content: flex-end;
    display: flex;
}

.reviseBox .submit-button {
    background-color: rgba(54, 212, 222, 1);
    border-radius: 5px;
    font-size: 25px;
    color: white;
    width: 100px;
}

.reviseBox .submit-button:hover {
    background-color: #f2f2f2;
}

/* 회원 탈퇴 버튼 css */
#withdrawBtn {
    position: fixed;
    bottom: 30px;
    right: 50px;
    padding: 10px 20px;
    background-color: rgba(54, 212, 222, 1);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    transition: background-color 0.3s, border 0.3s;
}

#withdrawBtn:hover {
    background-color: #f2f2f2;
}

/* 회원 탈퇴 모달 버튼 css */
.withdrawModalBtn {
    background-color: rgba(54, 212, 222, 1);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 22px;
    width: 70px;
    margin-left: 50px;
}

.withdrawModalBtn:hover {
    background-color: #f2f2f2;
}
</style>
