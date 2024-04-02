<template>
  <div class="flex flex-col gap-[16px]">
    <div class="inline-flex justify-between">
      <div class="inline-flex items-center gap-[2px]">
        <div class="inline-flex items-center gap-[5px]">
          <Icon name="BookOpen" color="#FF6102" size="18" />
          <p class="text-[16px] font-semibold text-[#525252]">百顺使用教学</p>
        </div>
        <div class="block rounded-lg bg-[#EA5050] px-[3px] text-[#fff]">
          <p class="text-[8px]">+99</p>
        </div>
      </div>
      <button class="inline-flex items-center gap-[5px] text-[#525252]">
        <p class="text-[14px]">查看更多</p>
        <Icon name="CaretRight" color="#525252" size="10" />
      </button>
    </div>
    <div class="inline-flex items-center gap-[16px] text-[12px]">
      <div
        v-for="(card, i) in cards"
        :key="i"
        :class="`relative overflow-hidden card-${i + 1} flex h-[67px] w-1/2 items-center justify-between`"
      >
        <div class="px-[10px]">
          <p class="font-semibold">
            {{ card.title }}
          </p>
          <p>
            {{ card.description }}
          </p>
        </div>
        <UiImg
          class="absolute -bottom-2 -right-3"
          width="67"
          height="67"
          :src="card.img"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cards = [
  {
    title: "如何使用",
    description: "百顺系統交易",
    img: "icons/BsOpenBook.png",
  },
  {
    title: "如何使用",
    description: "百顺交易群",
    img: "icons/BsCake.png",
  },
];
</script>

<style scoped>
.card-1 {
  border-radius: 10px;
  background: linear-gradient(90deg, #fff 0%, #ffe9ea 100%);
}

.card-2 {
  border-radius: 10px;
  background: linear-gradient(90deg, #fff 0%, #fff4e9 100%);
}
</style>
