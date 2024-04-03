<template>
  <div class="flex flex-col bg-[#EFEEF4]">
    <div class="!sticky top-0 z-40 bg-[#f4f4f4] p-2">
      <VanField
        v-model="params.keyword"
        clearable
        input-align="center"
        placeholder="搜索订单"
        class="search w-full rounded-lg p-2 placeholder:text-center"
        @update:model-value="onKeywordChange"
      >
        <template #left-icon>
          <Icon name="Search" color="#9f9f9f" />
        </template>
      </VanField>
    </div>
    <OrdersTabs
      :orders="orders"
      :main-tab-active="mainTabActive"
      :sub-tab-active="subTabActive"
      :loading="loading"
      @update:main-tab-active="onMainTabChange"
      @update:sub-tab-active="onSubTabChange"
    />
  </div>
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import { getHistoryOrders } from "~/api/history-order";
import {
  OrderStatusEnum,
  type HistoryOrder,
  type HistoryOrderParams,
} from "~/types/history-order";

const pageStore = usePageStore();

const subTabActive = ref(0);
const mainTabActive = ref(0);
const loading = ref<boolean>(false);
const orders = ref<HistoryOrder[]>([]);
const params = ref<HistoryOrderParams>({
  has_dispute: false,
  limit: 10,
  status: OrderStatusEnum.CONFIRMING,
  keyword: undefined,
  last: undefined,
  start_date: undefined,
  end_date: undefined,
});

const debounceSearch = useDebounceFn(fetchHistoryOrders, 500);

definePageMeta({
  layout: "report",
});

onMounted(() => {
  pageStore.setTitle("我的订单");
  fetchHistoryOrders();
});

function onKeywordChange() {
  debounceSearch();
}

async function fetchHistoryOrders() {
  loading.value = true;
  try {
    const res = await getHistoryOrders(params.value);
    orders.value = res.results;
  } catch (error: any) {
    showFailToast(error?.message);
  } finally {
    loading.value = false;
  }
}

async function onMainTabChange(index: number) {
  mainTabActive.value = index;
  params.value.has_dispute = index !== 0;
  await fetchHistoryOrders();
}

async function onSubTabChange(index: number) {
  subTabActive.value = index;
  params.value.status = Object.values(OrderStatusEnum)[index];
  await fetchHistoryOrders();
}
</script>

<style lang="css" scoped>
.search {
  position: relative;
  @apply bg-[#E4E4E4] p-2 text-[14px];
}
</style>
