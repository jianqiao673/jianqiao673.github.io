<template>
    <div>
        <div class="body">
            <h1 class="title">山东大学计算机科学与技术学院2025年足球院队纳新</h1>
            <div class="input-box">
                <input v-model="inputValue" class="input" type="text" placeholder="请输入您的姓名">
                <button class="button" @click="submit">确定</button>
            </div>
            <div class="result" v-show="isNotEmpty" transition>
                <p style="font-size: 26px;font-weight: 700;color: #f29e5e;">{{ isSelected?"恭喜你成功入选！":"很遗憾你未能入选！" }}</p>
                <p style="font-size: 16px;">{{ isSelected ?"欢迎加入我们这个大家庭":"不要灰心，明年还有机会" }}</p>
                <p style="font-size: 20px;font-weight: 700;">{{ isSelected ?"希望你能在这里发挥你的光芒！":"期待明年你的加入！" }}</p>
                <img v-show="isSelected" class="img" src="../../assets/images/qq.jpg" alt="">
                <img v-show="!isSelected" class="img" src="../../assets/images/comeon.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { selectedNames } from '../../utils/data'
const inputValue = ref('')
const names = ref(selectedNames)
const isNotEmpty = ref(false)
const isSelected = ref(false)

const submit = () => {
    if (!inputValue.value) {
        alert('请输入您的姓名');
        isNotEmpty.value = false;
        return;
    }
    if (names.value.includes(inputValue.value)) {
        isNotEmpty.value = true;
        isSelected.value = true;
    } else {
        isNotEmpty.value = true;
        isSelected.value = false;
    }
}
</script>

<style>
.v-enter,
.v-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.v-enter-active,
.v-leave-active {
    transition: all 1s ease;
}

.body {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 800px;
    width: 100%;
    background-image: url('../../assets/images/background.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.title {
    margin: 0;
    padding-top: 20px;
    text-align: center;
}

.input {
    height: 30px;
    width: 400px;
    padding-left: 5px;
    line-height: 30px;
    border: 0;
    border-radius: 5px 0 0 5px;
    font-size: 14px;
    background-color: rgba(255, 255, 255, 0.8);
}

.button {
    width: 60px;
    border: 0;
    border-radius: 0 5px 5px 0;
    background-color: #f29e5e;
    font-size: 14px;
}

.button:hover {
    cursor: pointer;
    background-color: #b87b47;
}

.input-box {
    display: flex;
    margin-top: 20px;
}

.result {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 600px;
    width: 400px;
    margin-top: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
}

.img {
    height: 380px;
    width: 250px;
}
</style>