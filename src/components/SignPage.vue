
<template>
  <div class="registration-page">
    <div class="registration-form">
      <div class="header">
        <img src="@/assets/icons/logo.png" alt="Logo" class="sign-logo"/>
      </div>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">아이디</label>
          <input type="text" id="username" v-model="username" placeholder="아이디를 입력하세요" required/>
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력하세요" required/>
        </div>
        <div class="form-group">
          <label for="password2">비밀번호 확인</label>
          <input type="password" id="password2" v-model="password2" placeholder="비밀번호를 다시 입력하세요" required/>
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="email" placeholder="이메일을 입력하세요" required/>
        </div>
        <div class="form-group button-group">
          <button type="submit" class="submit-button">회원 가입</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      email: ''
    };
  },
  methods: {
    register() {
      if (this.password !== this.password2) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      alert("회원 가입이 완료되었습니다!");
      this.$router.push({ name: 'MainPage' });
    }
  }
};
</script>

<style scoped>
.registration-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to top right, #d4f1f9, #ffffff);
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.sign-logo {
  width: 150px;
  height: 150px;
}

.registration-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid gray;
  width: 100vh;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: center;
}

label {
  width: 80px; /* Adjust the width as needed */
  margin-right: 10px;
  font-weight: bold;
}

input {
  flex: 0.7;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.button-group {
  justify-content: flex-end;
  display: flex;
}

.submit-button {
  padding: 10px;
  background-color: #aee1f6;
  border: 2px solid skyblue;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}

.submit-button:hover {
  background-color: #8dcde3;
}
</style>