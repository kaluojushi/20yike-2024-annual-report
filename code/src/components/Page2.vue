<template>
  <div class="page-texts-content first-area a">
    <p>
      2024 年<br>
      苏打绿一共去了 <span class="highlight-text">12</span> 个城市<br>
      开了 <span class="highlight-text">25</span> 场演唱会</p>
  </div>
  <div class="page-texts-content second-area b">
    <p>而勤奋的你<br>
      奔赴其中 <span class="highlight-text">{{ cityCount }}</span> 个城市<br>
      在 <span class="highlight-text">{{ stopCount }}</span> 场演唱会和他们相遇</p>
  </div>
  <div class="page-special-content third-area c">
    <p v-if="stopCount === 0">
      没关系，我们日后常相见！
    </p>
    <p v-if="stopCount > 0 && stopCount < 10">
      谢谢你与苏打绿走过的宝贵旅途
    </p>
    <p v-if="stopCount >= 10 && stopCount < 20">
      苏打绿心疼你的钱包～
    </p>
    <p v-if="stopCount >= 20">
      全勤能手就是你！
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const cityCount = ref(0)
const stopCount = ref(0)

onMounted(() => {
  // 获取数据
  const visitedArray = JSON.parse(localStorage.getItem('visitedArray'));
  stopCount.value = visitedArray.length;
  const cityMap = [
      "hk", "hk", "hk", // 香港
      "hz", "hz", // 杭州
      "cd", "cd", // 成都
      "zz", "zz", // 郑州
      "sz", "sz", // 深圳
      "bj", "bj", // 北京
      "wh", "wh", // 武汉
      "xm", "xm", // 厦门
      "cq", "cq", // 重庆
      "gz", "gz", // 广州
      "sh", "sh", // 上海
      "nj", "nj", // 南京
  ]
  const citySet = new Set();
  for (let i = 0; i < visitedArray.length; i++) {
      citySet.add(cityMap[visitedArray[i] - 1]);
  }
  cityCount.value = citySet.size;
})

</script>

<style scoped>
p {
  margin: 0;
}

.highlight-text {
  color: #F593C2;
  font-size: 4.5vmax;
  font-weight: bolder;
}

.page-texts-content {
  margin: 20px;
  color: white;
  text-shadow: 0.25vmax 0.25vmax 2px #000;
  font-size: 2.5vmax;
  font-weight: bold;
}

.page-special-content {
  margin: 20px;
  color: #F593C2;
  font-size: 3vmax;
  text-shadow: 0.25vmax 0.25vmax 2px #000;
  font-weight: bold;
  font-style: italic;
}

.first-area {
  position: absolute;
  top: 5vh;
  left: 5vw;
}

.second-area {
  position: absolute;
  top: 30vh;
  right: 15vw;
}

.third-area {
  position: absolute;
  top: 68vh;
  left: 20vw;
}
</style>
