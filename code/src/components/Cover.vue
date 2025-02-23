<template>
  <el-container>
    <el-header>
      <div class="cover-header-title">
        S O D A G R E E N 2 0 T H
      </div>
    </el-header>
    <el-main>
      <div class="cover-main-title">
        <h3 class="cover-main-title-1 a">我的二十年一刻</h3>
        <h3 class="cover-main-title-2 b">2024 观演报告</h3>
      </div>
    </el-main>
    <el-footer>
      <div class="cover-footer-title c">
        ⬇️ <span class="cover-footer-text">下滑开启</span>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup>
import "../assets/style/report.css";
</script>

<style scoped>
.cover-header-title {
  margin: 15px;
  color: #ddd;
  opacity: 0.3;
  font-size: 7vw;
  font-weight: bold;
  text-shadow: 2px 2px 2px #000;
  text-align-last: justify;
}

.cover-main-title {
  color: #8FC3C1;
  text-shadow: 0.5vmin 0.5vmin 2px #000;
  margin: 20px;
}

.cover-main-title-1 {
  font-size: 12vmin;
  font-weight: bolder;
  position: absolute;
  top: 20%;
}

.cover-main-title-2 {
  font-size: 8vmin;
  position: absolute;
  top: 45%;
  right: 5%;
}

.cover-footer-title {
  margin: 20px;
  color: #ddd;
  font-size: 5vmin;
  font-weight: bold;
  font-style: italic;
  text-shadow: 2px 2px 2px #000;
  position: absolute;
  bottom: 15%;
  right: 5%;
}

.cover-footer-text {
  padding-bottom: 0.25vmin;
  border-bottom: 0.5vmin solid #ccc;
}
</style>
