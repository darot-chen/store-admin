<template>
  <div class="mx-[12px] my-[6px] flex flex-col gap-[24px]">
    <UiProfile v-if="user" :user="user" />
    <UiSwitch v-model="selectedTab" :options="PROFILE_TAB_OPTIONS" />
    <div class="inline-flex justify-between gap-[6px]">
      <UiCard title="成功交易数次" icon="Check2" value="367" color="#007AFF" />
      <UiCard title="总交易额" icon="List" value="商户信用度" color="#007AFF" />
      <UiCard
        title="商户信用度"
        icon="PersonCheck"
        value="6 级"
        color="#007AFF"
      />
    </div>
    <UiCell inset :cells="profileTopItems" />
    <UiCell inset :cells="profileBottomItems" />
  </div>
</template>

<script setup lang="ts">
import { PROFILE_TAB_OPTIONS } from "~/constants/options/profile";
import type { Cell, Option } from "~/types/common";
import type { User } from "~/types/user";

const user = ref<User>();
const selectedTab = ref<Option>(PROFILE_TAB_OPTIONS[0]);

const profileBottomItems: Cell[] = [
  {
    title: "纠纷处理中",
    icon: "GroupPeople",
    backgroundColor: "#FF453A",
  },
  {
    title: "分享与邀请",
    icon: "PeoplePlus",
    backgroundColor: "#8F8E93",
  },
];

const profileTopItems: Cell[] = [
  {
    title: "我的报表",
    icon: "Statistic",
    backgroundColor: "#FF453A",
  },
  {
    title: "账户管理",
    icon: "StackPerson",
    backgroundColor: "#8321FF",
  },
  {
    title: "我的帖子",
    icon: "ShoppingBagCheck",
    backgroundColor: "#3BC55E",
  },
  {
    title: "钱包地址",
    icon: "StackFolder",
    backgroundColor: "#2DA4D7",
  },
  {
    title: "钱包地址",
    icon: "MegaPhone",
    backgroundColor: "#FF9900",
  },
];

onMounted(() => {
  user.value = useAuthStore().user;
});
</script>

<style scoped lang="css"></style>
