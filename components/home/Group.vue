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
      <div v-for="(group, i) in groups" :key="i">
        <div class="inline-flex flex-col items-center">
          <UiImg class="image" width="97" height="97" :src="group.img" />
          <div class="card">
            <div class="inline-flex items-center justify-center gap-[2px]">
              <div
                class="flex justify-center rounded-sm border border-[#FF6102] px-[3px]"
              >
                <p class="text-[8px] text-[#FF6102]">新</p>
              </div>
              <p class="line-clamp-1 text-[12px] font-semibold text-[#525252]">
                {{ group.title }}
              </p>
            </div>
            <p class="line-clamp-1 text-[10px]">{{ group.description }}</p>
            <div
              class="button mt-[5px] w-full"
              @click="onLinkClick(group.href)"
            >
              <p class="text-[10px] text-white">立即联系</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isTelegramUrl } from "~/utils/regex";

function onLinkClick(url: string) {
  const tg = (window as any).Telegram;

  if (isTelegramUrl(url) && tg?.WebApp && tg?.WebApp?.initData) {
    tg.Webapp.openChat(url);
  } else {
    navigateTo(url, {
      open: {
        target: "_blank",
      },
    });
  }
}

const groups = [
  {
    img: "group-1.png",
    title: "官方网站",
    description:
      "假如这是百顺担保供需群的小信息，让用户一看就知道供需群是什么。",
    href: "https://bsdb168.com/",
  },
  {
    img: "group-2.png",
    title: "百顺担保公告群",
    description:
      "假如这是百顺担保供需群的小信息，让用户一看就知道供需群是什么。",
    href: "https://t.me/bsdbq/1",
  },
  {
    img: "group-3.png",
    title: "百顺担保公群",
    description:
      "假如这是百顺担保供需群的小信息，让用户一看就知道供需群是什么。",
    href: "https://t.me/bsdbq/8",
  },
  {
    img: "group-1.png",
    title: "百顺供需信息频道",
    description:
      "假如这是百顺担保供需群的小信息，让用户一看就知道供需群是什么。",
    href: "https://t.me/bsgxu",
  },
  {
    img: "group-2.png",
    title: "百顺公群流程",
    description:
      "假如这是百顺担保供需群的小信息，让用户一看就知道供需群是什么。",
    href: "https://t.me/bsdbq/12",
  },
  {
    img: "group-3.png",
    title: "百顺专群流程",
    description:
      "假如这是百顺担保供需群的小信息，让用户一看就知道供需群是什么。",
    href: "https://t.me/bsdbq/112",
  },
];
</script>

<style scoped>
.image {
  border-radius: 10px 10px 0px 0px;
}

.card {
  display: flex;
  width: 97px;
  padding: 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  border-radius: 0px 0px 7px 7px;
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
