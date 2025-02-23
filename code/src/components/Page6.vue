<template>
  <div class="page-texts-content first-area a">
    <p>
      在本次观演中你还解锁了以下关键词！<br>
      还记得是哪些场次吗？
    </p>
    <p style="color:#6ABFBA;margin-top:10px;font-style:italic" @click="onChangeKeywords">点击 <span style="text-decoration:underline">这里</span> 换一批关键词</p>
  </div>
  <div class="page-special-content second-area">
    <div class="page-special-content b" ref="kw1">
      <p class="color-a" v-if="keywordsCnt > 0">
        {{ showKeywordsList[0] }}
      </p>
      <p class="page-texts-content" v-else>
        什么也没有诶……
      </p>
    </div>
    <div class="page-special-content c" v-if="keywordsCnt > 1" ref="kw2">
      <p class="color-b" >
        {{ showKeywordsList[1] }}
      </p>
    </div>
    <div class="page-special-content d" v-if="keywordsCnt > 2" ref="kw3">
      <p class="color-c">
        {{ showKeywordsList[2] }}
      </p>
    </div>
    <div class="page-special-content e" v-if="keywordsCnt > 3" ref="kw4">
      <p class="color-d">
        {{ showKeywordsList[3] }}
      </p>
    </div>
    <div class="page-special-content f" v-if="keywordsCnt > 4" ref="kw5">
      <p class="color-e">
        {{ showKeywordsList[4] }}
      </p>
    </div>
    <div class="g" v-if="keywordsCnt > 5" ref="kw6">
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

const keywordsList = ref([])
const keywordsCnt = ref(0)
const showKeywordsList = ref([])

onMounted(async () => {
  // 获取数据
  const visitedArray = JSON.parse(localStorage.getItem('visitedArray'));
  keywordsList.value = await cloud.invoke('getKeywords', visitedArray)
  keywordsCnt.value = keywordsList.value.length
  getShowKeywordsList()
})

function getShowKeywordsList() {
  const showCnt = Math.min(5, keywordsCnt.value)
  shuffle(keywordsList.value)
  showKeywordsList.value = keywordsList.value.slice(0, showCnt)
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}

const kw1 = ref(null)
const kw2 = ref(null)
const kw3 = ref(null)
const kw4 = ref(null)
const kw5 = ref(null)
const kw6 = ref(null)

function onChangeKeywords() {
  getShowKeywordsList()
  kw1.value?.classList.remove('a');
  kw1.value?.classList.remove('b');
  kw2.value?.classList.remove('b');
  kw2.value?.classList.remove('c');
  kw3.value?.classList.remove('c');
  kw3.value?.classList.remove('d');
  kw4.value?.classList.remove('d');
  kw4.value?.classList.remove('e');
  kw5.value?.classList.remove('e');
  kw5.value?.classList.remove('f');
  kw6.value?.classList.remove('f');
  kw6.value?.classList.remove('g');
  kw1.value?.offsetWidth;
  kw2.value?.offsetWidth;
  kw3.value?.offsetWidth;
  kw4.value?.offsetWidth;
  kw5.value?.offsetWidth;
  kw6.value?.offsetWidth;
  kw1.value?.classList.add('a');
  kw2.value?.classList.add('b');
  kw3.value?.classList.add('c');
  kw4.value?.classList.add('d');
  kw5.value?.classList.add('e');
  kw6.value?.classList.add('f');
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
