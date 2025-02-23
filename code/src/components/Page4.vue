<template>
  <div class="page-texts-content first-area a">
    <p>
      所有点歌还有哪些有趣数据？<br>
      只唱过一次的歌有 <span class="highlight-text">35</span> 首<br>
      其中 <span class="highlight-text-long" style="color:#EB79AA">上海</span> 就占了 <span class="highlight-text">11</span>首！<br>
      只有 <span class="highlight-text-long" style="color:#00B8DE">郑州</span>、<span class="highlight-text-long" style="color:#767CBA">深圳</span> 两天没有重复歌曲
    </p>
  </div>
  <div class="page-texts-content second-area b">
    <p>
      被点到最多的数字是 <span class="highlight-text">1</span> 号<br>
      居然被点了<span class="highlight-text">15</span>次！<br>
      点歌必点 1 号<br>已成为大家心照不宣的秘密
    </p>
    <p style="color:#F2A135;margin-top:10px;font-style:italic" @click="onOneClick">点击 <span style="text-decoration:underline">这里</span> 查看 1 号开出的歌曲</p>
  </div>
  <div class="page-texts-content third-area c">
    <p>
      <span class="highlight-text-long">夏／狂热</span> 一骑绝尘<br>
      以 <span class="highlight-text">13 </span> 首的成绩勇夺榜一<br>
      连一刻单曲在点歌都被唱了 <span class="highlight-text">6</span> 次<br>
      圆了大家全勤的梦
    </p>
  </div>

  <el-dialog
    v-model="showDialog"
    width="80%"
    title="1 号点歌记录"
    :append-to-body="true"
  >
    <el-scrollbar max-height="60vh" always>
      <div class="dialog-content">
        <table style="text-align: center">
          <thead>
          <tr>
            <th>序号</th>
            <th>歌名</th>
            <th>场次</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in oneOrderSongs" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.song }}</td>
            <td :style="`color:${item.color}`">{{ item.stop }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const oneOrderSongs = ref([
  { song: "空气中的视听与幻觉", stop: "成都 5.4", color: "#F18E53" },
  { song: "笑闹人间", stop: "成都 5.5", color: "#F18E53" },
  { song: "在世界的尽头大声地说我恨你", stop: "郑州 5.19", color: "#00B8DE"},
  { song: "落寞", stop: "北京 6.22", color: "#56BBC6" },
  { song: "黑猫白猫", stop: "北京 6.23", color: "#56BBC6" },
  { song: "他夏了夏天", stop: "武汉 7.20", color: "#55B770" },
  { song: "偷闲的翅膀", stop: "武汉 7.21", color: "#55B770" },
  { song: "他夏了夏天", stop: "厦门 8.3", color: "#B6D44E" },
  { song: "原谅", stop: "厦门 8.4", color: "#B6D44E" },
  { song: "共舞", stop: "重庆 8.18", color: "#ED7A58" },
  { song: "御花园", stop: "广州 8.31", color: "#F9BE00" },
  { song: "小时候", stop: "广州 9.1", color: "#F9BE00" },
  { song: "鱼儿离不开水", stop: "上海 9.17", color: "#EB79AA" },
  { song: "我在欧洲打电话给你", stop: "南京 9.27", color: "#BD9460" },
  { song: "我的未来不是梦", stop: "南京 9.28", color: "#BD9460" },
])

onMounted(async () => {
  // 获取数据

})

const showDialog = ref(false)
function onOneClick() {
  showDialog.value = true
}

</script>

<style scoped>
p {
  margin: 0;
}

.highlight-text {
  color: #F2A135;
  font-size: 4.5vmax;
  font-weight: bolder;
}

.highlight-text-long {
  color: #F2A135;
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
  color: #F2A135;
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

.third-area {
  position: absolute;
  top: 52vh;
  left: 2vw;
}

.dialog-content {
  //max-height: 50vh;
}
</style>
