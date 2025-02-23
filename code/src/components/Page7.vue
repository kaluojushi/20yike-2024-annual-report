<template>
  <el-row>
    <el-col :xs="24" :sm="12" style="position: relative">
      <div class="page-texts-content first-area">
        <p class="a" style="font-style:italic;margin-bottom:20px;">二十年一刻观演报告打印完毕！</p>
        <p class="b">
          我在二十年一刻中参与 <span class="highlight-text color-a">{{ cityCount }}</span> 城 <span class="highlight-text color-b">{{ stopCount }}</span> 场<br>
          获得称号：<span class="highlight-text-long color-c">{{ stopTitle }}</span>
        </p>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" style="position: relative">
      <div class="page-texts-content second-area c">
        <p>
          我解锁了 <span class="highlight-text color-d"> {{ orderSongsCnt }}/90</span> 首点歌
        </p>
        <p v-if="mostSongsCnt > 0">
          <el-button :icon="Refresh" link type="primary" style="margin: 5px" size="large" @click="onChangeShowMostSong(showMostSong)"></el-button>
          <span class="highlight-text-long color-a">{{ showMostSong }}</span><br>
          居然听了 <span class="highlight-text color-b">{{ mostSongsCnt }}</span> 次！
        </p>
        <p v-else>
          好可惜，一首都没有听到！
        </p>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" style="position: relative">
      <div class="page-texts-content third-area">
        <p class="d" v-if="achievementsList.length > 0" style="margin-bottom:20px">
          此次巡演我解锁了成就：<br>
          <el-button :icon="Refresh" link type="primary" style="margin: 5px" size="large" @click="onChangeShowAchievement(showAchievement)"></el-button>
          <span class="highlight-text-long color-c">{{ showAchievement }}</span>
        </p>
        <p class="d" v-else style="margin-bottom:20px">
          此次巡演我没有解锁任何成就……
        </p>
        <p class="e" v-if="keywordsList.length > 0">
          {{achievementsList.length > 0 ? '还' : '但'}}见证了名场面：<br>
          <el-button :icon="Refresh" link type="primary" style="margin: 5px" size="large" @click="onChangeShowKeyword(showKeyword)"></el-button>
          <span class="highlight-text-long color-d">{{ showKeyword }}</span>
        </p>
        <p class="e" v-else>
          {{achievementsList.length > 0 ? '但' : '也'}}没有 witness 到任何名场面……
        </p>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" style="position: relative">
      <div class="page-texts-content fourth-area f">
        <p class="color-e" style="font-style:italic">
          别管以后将如何结束<br>
          至少我们曾经相聚过
        </p>
        <el-image :src="require('../assets/image/qr.png')" fit="cover" class="qrcode"></el-image>
        <p class="qrcode-tip-text">扫码查看你的观演报告</p>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" style="position: relative">
      <div class="page-special-content fifth-area g">
        <p @click="onReturn">
          点击 <span style="text-decoration:underline">这里</span><br>重新观看
        </p>
      </div>
    </el-col>
  </el-row>
  <el-image class="zh-image zh1 b" :src="require('../assets/image/zh1.png')" fit="cover"/>
  <el-image class="zh-image zh2 c" :src="require('../assets/image/zh2.png')" fit="cover"/>
  <el-image class="zh-image zh3 d" :src="require('../assets/image/zh3.png')" fit="cover"/>
  <el-image class="zh-image zh4 e" :src="require('../assets/image/zh4.png')" fit="cover"/>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import { Cloud } from 'laf-client-sdk'
import {Refresh} from "@element-plus/icons-vue";

const cloud = new Cloud({
  baseUrl: "https://k9yhtp.laf.run",
  getAccessToken: () => '',
})

const visitedArray = ref([])

const cityCount = ref(0)
const stopCount = ref(0)
const stopTitle = ref('')

function getCityStopCount() {
  stopCount.value = visitedArray.value.length;
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
  for (let i = 0; i < visitedArray.value.length; i++) {
    citySet.add(cityMap[visitedArray.value[i] - 1]);
  }
  cityCount.value = citySet.size;
  if (stopCount.value === 0) {
    stopTitle.value = "日后再见"
  } else if (stopCount.value <= 5) {
    stopTitle.value = "初出茅庐"
  } else if (stopCount.value <= 10) {
    stopTitle.value = "抢票圣手"
  } else if (stopCount.value <= 15) {
    stopTitle.value = "观演能手"
  } else if (stopCount.value <= 20) {
    stopTitle.value = "钱包杀手"
  } else {
    stopTitle.value = "全勤之神"
  }
}

const orderSongsRank = ref([])
const orderSongsCnt = ref(0)
const mostSongs = ref([])
const mostSongsCnt = ref(0)
const showMostSong = ref('')

async function getOrderRank() {
  orderSongsRank.value = await cloud.invoke('getOrderSongsRank', visitedArray.value)
  orderSongsCnt.value = orderSongsRank.value.length
  if (orderSongsCnt.value > 0) {
    mostSongsCnt.value = orderSongsRank.value[0][1]
  }
  for (const [song, cnt] of orderSongsRank.value) {
    if (cnt === mostSongsCnt.value) {
      mostSongs.value.push(song)
    } else {
      break
    }
  }
  if (mostSongs.value.length > 0) {
    showMostSong.value = mostSongs.value[Math.floor(Math.random() * mostSongs.value.length)]
  }

}

function onChangeShowMostSong(curSong) {
  if (mostSongs.value.length > 1) {
    while (true) {
      const idx = Math.floor(Math.random() * mostSongs.value.length)
      if (mostSongs.value[idx] !== curSong) {
        showMostSong.value = mostSongs.value[idx]
        break
      }
    }
  }
}

const achievementsList = ref([])
const showAchievement = ref('')

async function getAchievementsList() {
  achievementsList.value = await cloud.invoke('getAchievements', visitedArray.value)
  if (achievementsList.value.length > 0) {
    showAchievement.value = achievementsList.value[Math.floor(Math.random() * achievementsList.value.length)]
  }
}

function onChangeShowAchievement(curAchievement) {
  if (achievementsList.value.length > 1) {
    while (true) {
      const idx = Math.floor(Math.random() * achievementsList.value.length)
      if (achievementsList.value[idx] !== curAchievement) {
        showAchievement.value = achievementsList.value[idx]
        break
      }
    }
  }
}

const keywordsList = ref([])
const showKeyword = ref('')

async function getKeywordsList() {
  keywordsList.value = await cloud.invoke('getKeywords', visitedArray.value)
  if (keywordsList.value.length > 0) {
    showKeyword.value = keywordsList.value[Math.floor(Math.random() * keywordsList.value.length)]
  }
}

function onChangeShowKeyword(curKeyword) {
  if (keywordsList.value.length > 1) {
    while (true) {
      const idx = Math.floor(Math.random() * keywordsList.value.length)
      if (keywordsList.value[idx] !== curKeyword) {
        showKeyword.value = keywordsList.value[idx]
        break
      }
    }
  }
}

onMounted(async () => {
  // 获取数据
  visitedArray.value = JSON.parse(localStorage.getItem('visitedArray'));
  getCityStopCount()
  await getOrderRank()
  await getAchievementsList()
  await getKeywordsList()
})

const emit = defineEmits(['call-return'])

function onReturn() {
  emit('call-return')
}

</script>

<style scoped>
p {
  margin: 0;
}

.highlight-text {
  font-size: 4vmax;
  font-weight: bolder;
}

.highlight-text-long {
  font-size: 3.2vmax;
  font-weight: bolder;
}

.page-texts-content {
  margin: 20px;
  color: white;
  text-shadow: 0.25vmax 0.25vmax 2px #000;
  font-size: 2.2vmax;
  font-weight: bold;
}

.page-special-content {
  margin: 20px;
  color: #6ABFBA;
  font-size: 2.2vmax;
  text-shadow: 0.25vmax 0.25vmax 2px #000;
  font-weight: bold;
  font-style: italic;
}

.qrcode {
  width: 70px;
  margin: 10px 10px 2px 10px;
}

.qrcode-tip-text {
  color: #999;
  font-size: 1.8vmax;
}

.zh-image {
  position: absolute;
  z-index: -1;
  max-width: 30vmin;
  margin: 20px;
  filter: opacity(0.3);
}

.zh1 {
  top: 15vh;
  left: 5vw;
}

.zh2 {
  top: 32vh;
  right: 10vw;
}

.zh3 {
  top: 50vh;
  right: 5vw;
}

.zh4 {
  top: 60vh;
  left: 5vw;
}

.first-area {
  position: absolute;
  top: 2.5vh;
  left: 5vw;
}

.second-area {
  position: absolute;
  top: 22vh;
  right: 10vw;
}

.third-area {
  position: absolute;
  top: 42vh;
  left: 10vw;
}

.fourth-area {
  position: absolute;
  top: 65vh;
  right: 10vw;
}

.fifth-area {
  position: absolute;
  top: 78vh;
  left: 5vw;
}
</style>
