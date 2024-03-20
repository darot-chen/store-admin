<template>
  <div v-if="!loading">
    <OrderDetailCard :order="order" :lobby-title="lobbyTitle" />
    <!-- Issue/Deposit Titles -->
    <div class="flex justify-center bg-white">
      <!-- Issue -->
      <div
        class="flex w-1/2 items-center justify-between border-b border-r border-b-red-500 p-3 text-red-500"
      >
        <p class="text-[14px]">
          <Icon name="cryptocurrency-color:usdt" size="24" color="#3e73c4" />
          下发
        </p>
        <p class="din-alternate-text text-[14px]">
          {{ sellerOrderPayments.length }}笔
        </p>
      </div>
      <!-- Deposit -->
      <div
        class="flex w-1/2 items-center justify-between border-b border-r border-b-green-500 p-3 text-green-500"
      >
        <p class="text-[14px]">
          <Icon name="cryptocurrency-color:usdc" size="24" color="#3e73c4" />
          下发
        </p>
        <p class="din-alternate-text text-[14px]">
          {{ buyerOrderPayments.length }}笔
        </p>
      </div>
    </div>
    <!-- Transaction List -->
    <div class="flex">
      <!-- Seller -->
      <div class="w-1/2">
        <OrderDetailTransaction
          v-for="payment in sellerOrderPayments"
          :key="payment.id"
          type="issue"
          :currency="order?.base_currency || ''"
          :date="formatDate(payment.created_at, 'YYYY/MM/DD hh:mm:ss') || ''"
          :amount="payment.amount_paid ?? 0"
          :exchange-amount="payment.amount_paid ?? 0"
        />
      </div>
      <!-- Buyer -->
      <div class="w-1/2">
        <OrderDetailTransaction
          v-for="payment in buyerOrderPayments"
          :key="payment.id"
          type="deposit"
          :currency="order?.quote_currency || ''"
          :date="formatDate(payment.created_at, 'YYYY/MM/DD hh:mm:ss') || ''"
          :amount="payment.quantity_given ?? 0"
          :exchange-amount="payment.quantity_given ?? 0"
        />
      </div>
    </div>
  </div>
  <UiCircularLoading
    v-else
    class="fixed left-0 top-0 flex h-full w-full items-center justify-center"
    size="40"
  />
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import { getOrderDetail, getOrdersPayment } from "~/api/order";
import type { Order, OrderDetail } from "~/types/order";

const loading = ref<boolean>(false);

const order = ref<Order>();
const sellerOrderPayments = ref<OrderDetail[]>([]);
const buyerOrderPayments = ref<OrderDetail[]>([]);
const pageStore = usePageStore();
const route = useRoute();

const orderId: number = +route.params.id;
const lobbyTitle: string = route.query.lobbyTitle as string;

async function fetchOrderDetail() {
  order.value = await getOrderDetail(orderId, {
    party: "buyer",
    limit: 10,
    last: 0,
  });
}

async function fetchOrderPayments(isSeller: boolean) {
  const res = await getOrdersPayment(orderId, {
    last: 0,
    party: isSeller ? "seller" : "buyer",
    limit: 10,
  });

  return res.results;
}

onMounted(async () => {
  pageStore.setTitle("显示账单");
  loading.value = true;
  try {
    await fetchOrderDetail();
    buyerOrderPayments.value = await fetchOrderPayments(false);
    sellerOrderPayments.value = await fetchOrderPayments(true);
  } catch (error: any) {
    showFailToast(error?.message);
  } finally {
    loading.value = false;
  }
});
</script>
