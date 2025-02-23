<template>
  <div class="checkbox-tip-title a">
    请先选择你所去过的场次吧～
  </div>
  <div class="checkbox-card-checkall b">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">一键全勤
    </el-checkbox>
  </div>
  <div class="checkbox-card-list c">
    <el-row :gutter="20">
      <el-col :xs="8" :sm="8" :md="6" v-for="(item, index) in concertList" :key="index">
        <el-card shadow="hover" @click="onCardClick(index)">
          <div class="checkbox-card-content" :style="`background-color:${item.color}`">
            <el-row>
              <el-col :xs="24" :sm="12" :md="12">{{ item.city }}</el-col>
              <el-col :xs="24" :sm="12" :md="12" style="font-size:2vh">{{ item.dates }}</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col class="checkbox-card-checkedCount">
        已选场次数: {{ checkedCount }}
      </el-col>
    </el-row>
  </div>

  <el-dialog
      v-model="showDialog"
      width="80%"
      :append-to-body="true"
  >
    <template #title>
      <span class="checkbox-dialog-title" :style="`color:${dialogTitleColor}`">{{ dialogTitle }}</span>
    </template>
    <div class="checkbox-dialog-content">
      <el-checkbox v-for="(item, index) in concertList[currentCityIndex].options" :key="index" :label="item"
                   v-model="checkedArray[concertList[currentCityIndex].stopIndexes[index] - 1]" @change="handleCheckedItemsChange"/>
    </div>
  </el-dialog>

  <div class="checkbox-footer-title d">
    ⬇️ <span class="checkbox-footer-text">下滑继续</span>
  </div>

  <div style="display: flex; justify-content: center">
    <el-image class="checkbox-image e" :src="require('../assets/image/members.png')" fit="cover"/>
  </div>

</template>

<script setup>
import {ref, reactive, onMounted} from "vue";
import "../assets/style/report.css";

const concertList = reactive([
  {
    city: "香港",
    dates: "3.22-3.24",
    color: "#007CC2",
    options: ["3.22", "3.23", "3.24"],
    stopIndexes: [1, 2, 3]
  },
  {
    city: "杭州",
    dates: "4.13-4.14",
    color: "#509779",
    options: ["4.13", "4.14"],
    stopIndexes: [4, 5]
  },
  {
    city: "成都",
    dates: "5.4-5.5",
    color: "#F18E53",
    options: ["5.4", "5.5"],
    stopIndexes: [6, 7]
  },
  {
    city: "郑州",
    dates: "5.18-5.19",
    color: "#00B8DE",
    options: ["5.18", "5.19"],
    stopIndexes: [8, 9]
  },
  {
    city: "深圳",
    dates: "6.1-6.2",
    color: "#767CBA",
    options: ["6.1", "6.2"],
    stopIndexes: [10, 11]
  },
  {
    city: "北京",
    dates: "6.22-6.23",
    color: "#56BBC6",
    options: ["6.22", "6.23"],
    stopIndexes: [12, 13]
  },
  {
    city: "武汉",
    dates: "7.20-7.21",
    color: "#55B770",
    options: ["7.20", "7.21"],
    stopIndexes: [14, 15]
  },
  {
    city: "厦门",
    dates: "8.3-8.4",
    color: "#B6D44E",
    options: ["8.3", "8.4"],
    stopIndexes: [16, 17]
  },
  {
    city: "重庆",
    dates: "8.17-8.18",
    color: "#ED7A58",
    options: ["8.17", "8.18"],
    stopIndexes: [18, 19]
  },
  {
    city: "广州",
    dates: "8.31-9.1",
    color: "#F9BE00",
    options: ["8.31", "9.1"],
    stopIndexes: [20, 21]
  },
  {
    city: "上海",
    dates: "9.16-9.17",
    color: "#EB79AA",
    options: ["9.16", "9.17"],
    stopIndexes: [22, 23]
  },
  {
    city: "南京",
    dates: "9.27-9.28",
    color: "#BD9460",
    options: ["9.27", "9.28"],
    stopIndexes: [24, 25]
  }
]);

const showDialog = ref(false);
const dialogTitle = ref("");
const dialogTitleColor = ref("");
const currentCityIndex = ref(0);

function onCardClick(index) {
  showDialog.value = true;
  currentCityIndex.value = index;
  dialogTitle.value = concertList[index].city + ' ' + concertList[index].dates;
  dialogTitleColor.value = concertList[index].color;
}

const checkedArray = reactive(new Array(25).fill(false));
const checkedCount = ref(0);

function checkedToVisited() {
  const visitedArray = [];
  for (let i = 0; i < checkedArray.length; i++) {
    if (checkedArray[i]) {
      visitedArray.push(i + 1);
    }
  }
  localStorage.setItem('visitedArray', JSON.stringify(visitedArray));
}

function visitedToChecked() {
  const visitedArray = JSON.parse(localStorage.getItem('visitedArray'));
  checkedArray.fill(false);
  visitedArray.forEach((item, index) => {
    checkedArray[item - 1] = true;
  });
  checkedCount.value = visitedArray.length;
}

const checkAll = ref(false);
const isIndeterminate = ref(false);
function handleCheckAllChange(val) {
  if (val) {
    checkedArray.fill(true);
    checkedCount.value = 25;
  } else {
    checkedArray.fill(false);
    checkedCount.value = 0;
  }
  checkedToVisited();
  isIndeterminate.value = false;
}
function handleCheckedItemsChange(val) {
  if (val) {
    checkedCount.value++;
  } else {
    checkedCount.value--;
  }
  checkAll.value = checkedCount.value === 25;
  isIndeterminate.value = checkedCount.value > 0 && checkedCount.value < 25;
  checkedToVisited();
}

onMounted(() => {
  if (localStorage.getItem('visitedArray')) {
    visitedToChecked();
  } else {
    localStorage.setItem('visitedArray', JSON.stringify([]));
    checkedCount.value = 0;
  }
  checkAll.value = checkedCount.value === 25;
  isIndeterminate.value = checkedCount.value > 0 && checkedCount.value < 25;
})
</script>

<style scoped>
.checkbox-tip-title {
  margin: 20px 20px 10px;
  font-size: 3vh;
  font-weight: bold;
  color: #171F2C;
  text-shadow: 2px 2px 2px #fff;
}

.checkbox-card-checkall {
  margin: 20px 20px;
}


.checkbox-card-list {
  margin: 20px 20px;
}

.el-card {
  margin-bottom: 20px;
}

.checkbox-card-content {
  font-size: 2.5vh;
  font-weight: bold;
  padding: 2vh;
  color: #fff;
  text-shadow: 2px 2px 2px #555;
}

.checkbox-card-checkedCount {
  font-size: 3vh;
}

.checkbox-dialog-title {
  font-size: 2.5vh;
  font-weight: bold;
}

.checkbox-dialog-content {
  font-size: 2vh;
}

.checkbox-footer-title {
  margin: 20px;
  color: #fff;
  font-size: 5vmin;
  font-weight: bold;
  font-style: italic;
  text-shadow: 2px 2px 2px #000;
  position: absolute;
  bottom: 25%;
  right: 5%;
}

.checkbox-footer-text {
  padding-bottom: 0.25vmin;
  border-bottom: 0.5vmin solid #ccc;
}

.checkbox-image {
  position: absolute;
  bottom: 0;
  z-index: -1;
  max-width: 768px;
  margin: 0 auto;
  filter: opacity(0.5);
}
</style>

<style>
.el-card__body {
  padding: 0 !important;
}

.el-checkbox__inner {
  width: 2.5vh !important;
  height: 2.5vh !important;
}

.el-checkbox__inner::after {
  width: 0.8vh !important;
  height: 0.8vh !important;
}

.el-checkbox__label {
  font-size: 2.5vh !important;
}
</style>
