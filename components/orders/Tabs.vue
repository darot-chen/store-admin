<template>
  <div>
    <div class="sticky top-[56px] z-20 bg-[#EFEEF4]">
      <VanTabs
        :active="props.mainTabActive"
        title-active-color="#409EFF"
        title-inactive-color="#B4BCCD"
        line-width="20"
        background="#f5f5f5"
        class="p-0"
        shrink
        animated
        :before-change="(index) => emits('update:mainTabActive', index)"
      >
        <VanTab :title="$t('undisputed')" />
        <VanTab :title="$t('disputed')" />
      </VanTabs>
      <VanDivider class="divider" />
      <VanTabs
        :active="props.subTabActive"
        background="#f5f5f5"
        title-active-color="#409EFF"
        title-inactive-color="#B4BCCD"
        line-height="0"
        shrink
        :before-change="(index) => emits('update:subTabActive', index)"
      >
        <VanTab
          v-for="tab in Object.values(OrderStatusEnum)"
          :key="tab"
          :title="$t('order_status.' + tab)"
        />
      </VanTabs>
    </div>

    <div>
      <div v-if="!props.loading" class="p-4">
        <OrdersItems :orders="props.orders" />
      </div>
      <UiCircularLoading
        v-else
        class="fixed left-0 top-0 flex h-full w-full items-center justify-center"
        size="40"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type HistoryOrder, OrderStatusEnum } from "~/types/history-order";

const props = defineProps<{
  mainTabActive: number;
  subTabActive: number;
  orders: HistoryOrder[];
  loading: boolean;
}>();

const emits = defineEmits<{
  (e: "update:mainTabActive", value: number): void;
  (e: "update:subTabActive", value: number): void;
}>();
</script>

<style lang="css" scoped>
.tabs {
  @apply bg-[#f5f5f5] pl-0;
}

.divider {
  margin: 0;
}
</style>
