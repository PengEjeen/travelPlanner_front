<template>
    <div class="registration-page">
        <div class="registration-form">
            <div class="header">
                <img
                    src="@/assets/icons/logo.png"
                    alt="Logo"
                    class="sign-logo"
                />
            </div>
            <form @submit.prevent="register">
                <div class="form-group">
                    <label for="username">아이디</label>
                    <input
                        type="text"
                        id="username"
                        v-model="username"
                        placeholder="아이디를 입력하세요"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        placeholder="비밀번호를 입력하세요"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="password2">비밀번호 확인</label>
                    <input
                        type="password"
                        id="password2"
                        v-model="password2"
                        placeholder="비밀번호를 다시 입력하세요"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        placeholder="이메일을 입력하세요"
                        required
                    />
                </div>
                <div class="form-group button-group">
                    <button type="submit" class="submit-button">
                        회원 가입
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            username: "",
            password: "",
            password2: "",
            email: "",
        };
    },
    methods: {
        async register() {
            if (this.password !== this.password2) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }

            try {
                const response = await axios.post(
                    "https://travelplanner.duckdns.org/api/common/register/",
                    {
                        username: this.username,
                        password: this.password,
                        password2: this.password2,
                        email: this.email,
                    }
                );

                console.log(response.data); // 응답 데이터 확인

                if (response.status === 201) {
                    alert("회원 가입이 완료되었습니다!");
                    this.$router.push({ name: "MainPage" });
                } else {
                    alert("회원 가입에 실패했습니다.");
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    // 서버에서 반환된 에러 메시지 처리
                    const errors = error.response.data;
                    let errorMessage = "회원 가입 중 오류가 발생했습니다.";

                    if (errors.username) {
                        errorMessage = `사용자 이름 오류: ${errors.username.join(
                            ", "
                        )}`;
                    } else if (errors.password) {
                        errorMessage = `비밀번호 오류: ${errors.password.join(
                            ", "
                        )}`;
                    } else if (errors.email) {
                        errorMessage = `이메일 오류: ${errors.email.join(
                            ", "
                        )}`;
                    }

                    alert(errorMessage);
                } else {
                    console.error("Error during registration:", error);
                    alert("회원 가입 중 오류가 발생했습니다.");
                }
            }
        },
    },
};
</script>

<style>
.registration-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(to top right, #d4f1f9, #ffffff);
}

.registration-page .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.registration-page .sign-logo {
    width: 150px;
    height: 150px;
}

.registration-page .registration-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid gray;
    width: 100vh;
}

.registration-page .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    justify-content: center;
}

.registration-page label {
    width: 80px; /* Adjust the width as needed */
    margin-right: 10px;
    font-weight: bold;
}

.registration-page input {
    flex: 0.7;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.registration-page .button-group {
    justify-content: flex-end;
    display: flex;
}

.registration-page .submit-button {
    padding: 10px;
    background-color: rgba(54, 212, 222, 1);
    border: 2px solid skyblue;
    border-radius: 5px;
    font-size: 16px;
    color: white;
}

.registration-page .submit-button:hover {
    background-color: #8dcde3;
}
</style>
