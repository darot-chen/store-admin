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
      @update:model-value="(v) => onModeSwitch(v.value as UserMode)"
    />

    <div class="flex flex-col gap-[24px]">
      <div class="inline-flex justify-between gap-[6px]">
        <UiCard
          title="成功交易数次"
          icon="Check2"
          :value="
            useUserSummary
              .getUserOrderSummary(selectedTab.value as UserMode)
              ?.successful_order.toString() ?? '0'
          "
          color="#007AFF"
        />
        <UiCard
          title="总交易额"
          icon="List"
          :value="
            useUserSummary
              .getUserOrderSummary(selectedTab.value as UserMode)
              ?.total_transaction_volume.toString() ?? '0'
          "
          color="#007AFF"
        />
      </div>
      <UiCell inset :cells="profileMerchantTop" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import { updateUserMode } from "~/api/user";
import { PROFILE_TAB_OPTIONS } from "~/constants/options/profile";
import { userUserOrderSummaryStore } from "~/stores/user-order-summary";
import type { Cell, Option } from "~/types/common";
import { UserMode, type User } from "~/types/user";

const user = ref<User>();
const selectedTab = ref<Option>(PROFILE_TAB_OPTIONS[0]);
const router = useRouter();
const useUserSummary = userUserOrderSummaryStore();
const userStore = useAuthStore();

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
    onClick: () => navigateTo("/orders-history"),
  },
];

onMounted(() => {
  user.value = userStore.user;
  userUserOrderSummaryStore().getAllUserOrderSummary();
  router.replace({ query: { mode: userStore.user?.mode } });

  if (userStore.user) {
    const mode = userStore.user.mode;
    const defaultOption = PROFILE_TAB_OPTIONS.find((v) => v.value === mode);
    selectedTab.value = defaultOption || PROFILE_TAB_OPTIONS[0];
  }
});

async function onModeSwitch(v: UserMode) {
  try {
    const res = await updateUserMode(v);
    if (res) {
      if (v === UserMode.USER || v === UserMode.MERCHANT) {
        router.replace({ query: { mode: v } });
        useUserSummary.fetchUserOrderSummary(v);
      }
    }
  } catch (e: any) {
    showFailToast(e?.message);
  }
}
</script>
