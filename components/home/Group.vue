<template>
  <div class="flex flex-col gap-[10px] rounded-[10px] bg-white p-[10px]">
    <div class="inline-flex items-center gap-[2px]">
      <div class="inline-flex items-center gap-[5px]">
        <Icon name="Folder" color="#FF6102" size="18" />
        <p class="text-[16px] font-semibold text-[#525252]">
          百顺担保官方群列表
        </p>
      </div>
    </div>
    <div class="flex gap-[5px] overflow-scroll">
      <NuxtLink
        v-for="(group, i) in groups"
        :key="i"
        class="cursor-pointer"
        target="_blank"
        :to="group.href"
      >
        <div class="relative inline-flex w-[150px] flex-col items-center">
          <UiImg class="image h-[150px] w-full" :src="group.img" />
          <HomeBsBadge class="absolute left-0" rounded />
          <div class="card w-full">
            <HomeTag
              :type="isTelegramUrl(group.href) ? 'telegram' : 'website'"
              :label="isTelegramUrl(group.href) ? '百顺TG群' : 'Website'"
            />
            <div class="inline-flex items-center justify-center gap-[2px]">
              <p class="line-clamp-1 text-[13px] font-semibold text-[#2E2E2E]">
                {{ group.title }}
              </p>
            </div>
            <p class="line-clamp-2 text-[10px] text-[#A3A3A3]">
              {{ group.description }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const groups = [
  {
    img: "bs-website.png",
    title: "百顺担保公告群",
    description: "及时获取与业务、安全设置和骗子曝光的相关公告。",
    href: "https://bsdb168.com/",
  },
  {
    img: "group-3.png",
    title: "百顺担保公群",
    description: "专为您而打造的免费公群资源收索和招商频道。",
    href: "https://t.me/bsdbq/1",
  },
  {
    img: "group-1.png",
    title: "百顺公群流程",
    description: "了解公群交易注意事项，降低风险交易风险",
    href: "https://t.me/bsdbq/8",
  },
  {
    img: "group-2.png",
    title: "百顺担保公告群",
    description: "及时获取与业务、安全设置和骗子曝光的相关公告。",
    href: "https://t.me/bsgxu",
  },
  {
    img: "group-1.png",
    title: "百顺担保公群",
    description: "专为您而打造的免费公群资源收索和招商频道。",
    href: "https://t.me/bsdbq/12",
  },
  {
    img: "group-3.png",
    title: "百顺公群流程",
    description: "了解公群交易注意事项，降低风险交易风险",
    href: "https://t.me/bsdbq/112",
  },
];
</script>

<style scoped>
.image {
  border-radius: 6px 6px 0px 0px;
}

.card {
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  border-radius: 0px 0px 6px 6px;
  background: #efeef4;
}

.button {
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  align-self: stretch;
  border-radius: 4px;
  background: #ff6102;
}
</style>
