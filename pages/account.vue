<template>
  <div class="mx-[12px] my-[6px] flex flex-col gap-[24px]">
    <UiProfile
      v-if="user"
      :user="user"
      :is-user="selectedTab.value === UserMode.USER"
    />
    <UiSwitch
      v-show="user?.type === 'merchant'"
      v-model="selectedTab"
      :options="PROFILE_TAB_OPTIONS"
      @update:model-value="(v) => onModeSwitch(v)"
    />
    <div
      v-if="selectedTab.value === UserMode.USER"
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
    </div>
    <div
      v-else-if="selectedTab.value === UserMode.MERCHANT"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { PROFILE_TAB_OPTIONS } from "~/constants/options/profile";
import type { Cell, Option } from "~/types/common";
import type { UserOrderSummary } from "~/types/order";
import { UserMode, type User } from "~/types/user";

const user = ref<User>();
const selectedTab = ref<Option>(PROFILE_TAB_OPTIONS[0]);
const router = useRouter();
const userSummary = ref<UserOrderSummary[]>([]);

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
    title: "我的订单",
    icon: "GroupPeople",
    backgroundColor: "#FF453A",
  },
];

function onModeSwitch(v: Option) {
  router.replace({ query: { tab: v.value } });
  
}

onMounted(() => {
  user.value = useAuthStore().user;
});
</script>
