<template>
  <div class="container flex flex-col gap-[5px]">
    <div class="inline-flex items-center justify-between">
      <div class="inline-flex items-center gap-[5px]">
        <div class="inline-flex gap-[2px]">
          <NuxtImg src="/images/title-1.png" class="h-[15px]" />
          <NuxtImg src="/images/title-2.png" class="h-[15px]" />
        </div>
        <div
          class="inline-flex w-[24px] justify-center rounded-sm border border-[#FF6102] px-[8px] py-[2px]"
        >
          <p class="text-[8px] text-[#FF6102]">新</p>
        </div>
      </div>
      <Icon name="CaretRight" color="#FF6102" size="10" />
    </div>
    <div
      class="mt-[10px] grid grid-flow-col grid-cols-2 grid-rows-3 text-[13px]"
    >
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="inline-flex items-center gap-[5px]"
      >
        <div class="inline-flex gap-[10px]">
          <p
            class="font-youshebiaotihei"
            :style="{ color: getColor(index + 1) }"
          >
            {{ index + 1 }}
          </p>
          <p>{{ faq }}</p>
        </div>
        <div
          class="flex h-[12px] items-center justify-center rounded-[3px] bg-[#FFEDD6]"
        >
          <p class="p-[1px] text-[8px] text-[#FF6102]">新</p>
        </div>
      </div>
    </div>
    <div class="mt-[5px] flex w-full items-center justify-center">
      <div class="inline-flex gap-[6px]">
        <div class="h-[5px] w-[5px] rounded-full bg-[#0000001a]" />
        <div class="h-[5px] w-[16px] rounded-full bg-[#FF6102]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const faqs = [
  "防骗说明",
  "官方 TG 与语言包",
  "登录验证码不要外泄",
  "防骗说明",
  "官方 TG 与语言包",
  "登录验证码不要外泄",
];

function getColor(index: number) {
  switch (index) {
    case 1:
      return "#F75B62";
    case 2:
      return "#F99354";
    case 3:
      return "#FCCA4B";
    case 4:
      return "#FF6102";
    case 5:
      return "#FF6102";
    case 6:
      return "#FF6102";
    default:
      return "#FF6102";
  }
}
</script>

<style scoped>
.container {
  border: 0.5px solid #fff;
  border-radius: 10px;
  background: linear-gradient(0deg, #fff 0%, #fff0de 100%);
  padding: 10px;
}

.font-youshebiaotihei {
  font-family: "YouSheBiaoTiHei";
}

@font-face {
  font-family: "YouSheBiaoTiHei";
  src:
    url("/assets/fonts/Youshebiaotihei/YouSheBiaoTiHei.woff2") format("woff2"),
    url("/assets/fonts/Youshebiaotihei/YouSheBiaoTiHei.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>
