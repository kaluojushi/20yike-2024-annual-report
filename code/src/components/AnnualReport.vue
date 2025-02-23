<template>
  <swiper
      :direction="'vertical'"
      :modules="modules"
      :pagination="{ clickable: true }"
      @slideChange="onSlideChange"
      :initial-slide="0"
      @swiper="onSwiper"
  >
    <!--Cover-->
    <swiper-slide class="bg1">
      <Cover v-if="activeIndex === 0"></Cover>
    </swiper-slide>

    <!--Checkbox-->
    <swiper-slide>
      <Checkbox v-if="activeIndex === 1"></Checkbox>
    </swiper-slide>

    <!--Page 2-->
    <swiper-slide class="bg2">
      <Page2 v-if="activeIndex === 2"></Page2>
    </swiper-slide>

    <!--Page 3-->
    <swiper-slide class="bg3">
      <Page3 v-if="activeIndex === 3"></Page3>
    </swiper-slide>

    <!--Page 4-->
    <swiper-slide class="bg4">
      <Page4 v-if="activeIndex === 4"></Page4>
    </swiper-slide>

    <!--Page 5-->
    <swiper-slide class="bg5">
      <Page5 v-if="activeIndex === 5"></Page5>
    </swiper-slide>

    <!--Page 6-->
    <swiper-slide class="bg6">
      <Page6 v-if="activeIndex === 6"></Page6>
    </swiper-slide>

    <!--Page 7-->
    <swiper-slide class="bg7">
      <Page7 v-if="activeIndex === 7" @call-return="goToSlideZero"></Page7>
    </swiper-slide>

  </swiper>
</template>

<script setup>
import { ref,reactive } from "vue";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "../assets/style/report.css";
import "swiper/swiper.min.css";
import Cover from "@/components/Cover.vue";
import Checkbox from "@/components/Checkbox.vue";
import Page2 from "@/components/Page2.vue";
import Page3 from "@/components/Page3.vue";
import Page4 from "@/components/Page4.vue";
import Page5 from "@/components/Page5.vue";
import Page6 from "@/components/Page6.vue";
import Page7 from "@/components/Page7.vue";

const activeIndex = ref(0);
const allowSlideNext = ref(true);

const year = ref(2024);
const city_num = ref(5);
const exceed_friend_rate = ref("50%");
const fav_area = ref("长三角地区");
const longest_travel = reactive({ day_num: 7, month: 5, route: "扬州-杭州-南京", city_num: 3 });
const common_city = reactive({ friend: "鱼籽酱虾球", city_name: "南京,扬州,杭州...", city_num: 3 });
const blog_preference = reactive({
  word: "轻松拿下",
  freq: 6,
  contentWithDate: [
    { content: "小小泰山，轻松拿下", date: "2024.2.29" },
    { content: "日行三万步，轻松拿下pyq第一名", date: "2024.4.15" },
    { content: "本人已轻松拿下环青海湖骑行，望周知", date: "2024.5.1" }
  ],
});
const special_travel = reactive({
  date: "5月12日",
  city: "长沙",
  blog_num: 5,
  pic_num: 20
});

function highlightWord(content, word) {
  const regex = new RegExp(`(${word})`, 'gi');
  return content.replace(regex, '<span class="highlight">$1</span>');
}

const modules = ref([Pagination]);

function onSlideChange(swiper) {
  // 动画重新播放
  activeIndex.value = swiper.activeIndex;
}

const mySwiper = ref();

function onSwiper(swiper) {
  mySwiper.value = swiper;
}

function goToSlideZero() {
  mySwiper.value?.slideTo(0);
}

</script>

<style scoped>
:deep(.highlight) {
  color: #ffdd00;
}
</style>
