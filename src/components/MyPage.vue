<template>
    <section>
        <!-- 내 정보 확인 창 -->
        <div></div>

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
                        <button class="withdrawModalBtn">확인</button>
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
export default {};
</script>

<style>
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
    cursor: pointer;
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
