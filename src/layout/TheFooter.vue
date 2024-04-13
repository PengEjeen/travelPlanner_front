<template>
    <footer>
        <router-link to="/">
            <img src="@/assets/logo.png" alt="로고 이미지" id="bottom_logo" />
        </router-link>
        <a href="https://www.hs.ac.kr/sce/index.do">
            <img
                src="@/assets/dept.png"
                alt="컴공 이미지"
                id="bottom_deptImg"
            />
        </a>
        <p>
            캡스톤 | 3조 <br />
            조남영 정규민 박성엽 방유민<br />
            한신대학교<br />
        </p>
        <p id="copyright">Copyright &copy; 3조. All Rights Reserved.</p>
    </footer>
</template>

<style>
footer {
    height: 230px;
    background-color: gray;
    text-align: left;
}

#bottom_logo {
    height: 60px;
    margin-left: 52px;
    margin-bottom: 10px;
    margin-top: 20px;
}

#bottom_deptImg {
    float: right;
    height: 183px;
    margin-top: 17px;
    margin-right: 50px;
}

footer p {
    margin-left: 50px;
}

#copyright {
    margin-top: 10px;
}
</style>
