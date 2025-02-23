<template>
  <div class="page-texts-content first-area a">
    <p>
      二十年一刻解锁点歌曲目 <span class="highlight-text">90</span> 首<br>
      共点歌 <span class="highlight-text">220</span> 次<br>
      <span class="highlight-text-long">是我的海</span> 被点 <span class="highlight-text">8</span> 次勇夺桂冠<br>
      还得是海哥！
    </p>
  </div>
  <div class="page-texts-content second-area b">
    <p>你一共解锁了 <span class="highlight-text">{{ orderSongsCnt }}</span> 首点歌</p>
    <p v-if="orderSongsCnt > 0">
      听得最多的歌曲有：<br>
      <span class="highlight-text-long" v-for="(item, index) in mostSongs.slice(0, 3)" :key="index">{{ item }}<br></span>
      <span v-if="mostSongs.length > 3">……<br></span>
      足足听了 <span class="highlight-text">{{ mostSongsCnt }}</span> 次！<br>
    </p>
    <p v-else>诶……尴尬了</p>
  </div>
  <div class="page-special-content third-area c">
    <p @click="onRankClick">
      点击 <span style="text-decoration:underline">这里</span> 看你的完整点歌排行榜
    </p>
  </div>

  <el-dialog
    v-model="showDialog"
    width="80%"
    title="我的点歌排行榜"
    :append-to-body="true"
  >
    <el-scrollbar max-height="60vh" always v-if="orderSongsCnt > 0">
      <div class="dialog-content">
        <table style="text-align: center">
          <thead>
          <tr>
            <th>歌名</th>
            <th>次数</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in rank" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.cnt }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </el-scrollbar>
    <el-empty v-else description="空空如也……"></el-empty>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Cloud } from 'laf-client-sdk'

const cloud = new Cloud({
  baseUrl: "https://k9yhtp.laf.run",
  getAccessToken: () => '',
})

const orderSongsRank = ref([])
const orderSongsCnt = ref(0)
const mostSongs = ref([])
const mostSongsCnt = ref(0)
const rank = ref([])

onMounted(async () => {
  // 获取数据
  const visitedArray = JSON.parse(localStorage.getItem('visitedArray'));
  orderSongsRank.value = await cloud.invoke('getOrderSongsRank', visitedArray)
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
  rank.value = orderSongsRank.value.map(item => {
    return {
      name: item[0],
      cnt: item[1]
    }
  })
})

const showDialog = ref(false)
function onRankClick() {
  showDialog.value = true
}

</script>

<style scoped>
p {
  margin: 0;
}

.highlight-text {
  color: #7AC65A;
  font-size: 4.5vmax;
  font-weight: bolder;
}

.highlight-text-long {
  color: #7AC65A;
  font-size: 3.5vmax;
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
  color: #7AC65A;
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
  top: 25vh;
  right: 15vw;
}

.third-area {
  position: absolute;
  top: 68vh;
  left: 0;
}

.dialog-content {
  //max-height: 50vh;
}
</style>
