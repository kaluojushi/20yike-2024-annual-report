<template>
  <div class="page-texts-content first-area a">
    <p>
      在本次观演中你集齐了以下成就！<br>
      独属于你的荣耀！
    </p>
    <p style="color:#6ba4f6;margin-top:10px;font-style:italic" @click="onChangeAchievements">点击 <span style="text-decoration:underline">这里</span> 换一批成就</p>
  </div>
  <div class="page-special-content second-area">
    <div class="page-special-content b" ref="am1">
      <p class="color-a" v-if="achievementsCnt > 0">
        {{ showAchievementsList[0] }}
      </p>
      <p class="page-texts-content" v-else>
        什么也没有诶……<br>
        再接再厉吧！
      </p>
    </div>
    <div class="page-special-content c" v-if="achievementsCnt > 1" ref="am2">
      <p class="color-b" >
        {{ showAchievementsList[1] }}
      </p>
    </div>
    <div class="page-special-content d" v-if="achievementsCnt > 2" ref="am3">
      <p class="color-c">
        {{ showAchievementsList[2] }}
      </p>
    </div>
    <div class="page-special-content e" v-if="achievementsCnt > 3" ref="am4">
      <p class="color-d">
        {{ showAchievementsList[3] }}
      </p>
    </div>
    <div class="page-special-content f" v-if="achievementsCnt > 4" ref="am5">
      <p class="color-e">
        {{ showAchievementsList[4] }}
      </p>
    </div>
    <div class="g" v-if="achievementsCnt > 5" ref="am6">
      <p class="page-texts-content">
        ……
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Cloud } from 'laf-client-sdk'

const cloud = new Cloud({
  baseUrl: "https://k9yhtp.laf.run",
  getAccessToken: () => '',
})

const achievementsList = ref([])
const achievementsCnt = ref(0)
const showAchievementsList = ref([])

onMounted(async () => {
  // 获取数据
  const visitedArray = JSON.parse(localStorage.getItem('visitedArray'));
  achievementsList.value = await cloud.invoke('getAchievements', visitedArray)
  achievementsCnt.value = achievementsList.value.length
  getShowAchievementsList()
})

function getShowAchievementsList() {
  const showCnt = Math.min(5, achievementsCnt.value)
  shuffle(achievementsList.value)
  showAchievementsList.value = achievementsList.value.slice(0, showCnt)
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}

const am1 = ref(null)
const am2 = ref(null)
const am3 = ref(null)
const am4 = ref(null)
const am5 = ref(null)
const am6 = ref(null)

function onChangeAchievements() {
  getShowAchievementsList()
  am1.value?.classList.remove('a');
  am1.value?.classList.remove('b');
  am2.value?.classList.remove('b');
  am2.value?.classList.remove('c');
  am3.value?.classList.remove('c');
  am3.value?.classList.remove('d');
  am4.value?.classList.remove('d');
  am4.value?.classList.remove('e');
  am5.value?.classList.remove('e');
  am5.value?.classList.remove('f');
  am6.value?.classList.remove('f');
  am6.value?.classList.remove('g');
  am1.value?.offsetWidth;
  am2.value?.offsetWidth;
  am3.value?.offsetWidth;
  am4.value?.offsetWidth;
  am5.value?.offsetWidth;
  am6.value?.offsetWidth;
  am1.value?.classList.add('a');
  am2.value?.classList.add('b');
  am3.value?.classList.add('c');
  am4.value?.classList.add('d');
  am5.value?.classList.add('e');
  am6.value?.classList.add('f');
}

</script>

<style scoped>
p {
  margin: 0;
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
  color: #6ABFBA;
  font-size: 3vmax;
  text-shadow: 0.25vmax 0.25vmax 2px #000;
  font-weight: bold;
  font-style: italic;
}

.first-area {
  position: absolute;
  top: 2.5vh;
  left: 5vw;
}

.second-area {
  position: absolute;
  top: 25vh;
  right: 10vw;
}
</style>
