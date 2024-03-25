<template>
  <div class="mx-[12px] my-[6px] flex flex-col gap-[24px]">
    <UiProfile
      v-if="user"
      :user="user"
      :is-user="selectedTab.value === 'quickSelection'"
    />
    <UiSwitch
      v-model="selectedTab"
      :options="PROFILE_TAB_OPTIONS"
      @update:model-value="
        (v) => {
          $router.replace({ query: { tab: v.value } });
        }
      "
    />
    <div
      v-if="selectedTab.value === 'quickSelection'"
      class="flex flex-col gap-[24px]"
    >
      <div class="inline-flex justify-between gap-[6px]">
        <UiCard
          title="成功交易数次"
          icon="Check2"
          value="367"
          color="#007AFF"
        />
        <UiCard
          title="总交易额"
          icon="List"
          value="5,845,000"
          color="#007AFF"
        />
      </div>
      <UiCell inset :cells="profileMerchantTop" />
      <UiCell inset :cells="profileMerchantBottom" />
    </div>

    <div
      v-else-if="selectedTab.value === 'fixedDate'"
      class="flex flex-col gap-[24px]"
    >
      <div class="inline-flex justify-between gap-[6px]">
        <UiCard
          title="成功交易数次"
          icon="Check2"
          value="367"
          color="#007AFF"
        />
        <UiCard
          title="总交易额"
          icon="List"
          value="5,845,000"
          color="#007AFF"
        />
      </div>
      <UiCell inset :cells="profileMerchantTop" />
      <UiCell inset :cells="profileMerchantBottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PROFILE_TAB_OPTIONS } from "~/constants/options/profile";
import type { Cell, Option } from "~/types/common";
import type { User } from "~/types/user";

const user = ref<User>();
const selectedTab = ref<Option>(PROFILE_TAB_OPTIONS[0]);

definePageMeta({
  layout: "default",
  keepalive: true,
});

const profileMerchantTop: Cell[] = [
  {
    title: "我的报表",
    icon: "Statistic",
    backgroundColor: "#FF453A",
    onClick: () => navigateTo("/report"),
  },
  {
    title: "账户管理",
    icon: "StackPerson",
    backgroundColor: "#8321FF",
  },
];

const profileMerchantBottom: Cell[] = [
  {
    title: "我的订单",
    icon: "GroupPeople",
    backgroundColor: "#FF453A",
  },
];

const profileBottomItems: Cell[] = [
  {
    title: "纠纷处理中",
    icon: "GroupPeople",
    backgroundColor: "#FF453A",
    onClick: () => navigateTo("/orders-history"),
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
    onClick: () => navigateTo("/report"),
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
