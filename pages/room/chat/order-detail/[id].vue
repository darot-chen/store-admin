<template>
  <div v-if="!loading">
    <OrderDetailCard :order="order" :lobby-title="lobbyTitle" />
    <!-- Button List -->
    <div class="flex justify-center gap-x-2 text-[11px] text-white">
      <div class="my-2 rounded-md bg-[#50A7EA] px-2 py-1">
        {{ formatDate(order?.created_at.toString(), "YYYY年MM月DD日") }}
      </div>
      <div class="my-2 rounded-md bg-[#50A7EA] px-2 py-1">
        订单 {{ formatOrderId(order?.id || 0) }}
      </div>
      <div class="my-2 rounded-md bg-[#50A7EA] px-2 py-1">全部流水</div>
    </div>
    <!-- Issue/Deposit Titles -->
    <div class="my-2 h-[2px] bg-[#E0E6EB]"></div>
    <div class="my-3 flex justify-center">
      <div class="flex w-1/2 items-center justify-center">
        <p class="text-[10px] font-bold">
          （{{ sellerOrderPayments.length }}笔）
        </p>
        <p class="text-[14px] text-red-500">下发</p>
      </div>
      <div class="flex w-1/2 items-center justify-start">
        <p class="text-[14px] text-green-500">入款</p>
        <p class="text-[10px] font-bold">
          （{{ buyerOrderPayments.length }}笔）
        </p>
      </div>
    </div>
    <div class="my-2 h-[2px] bg-[#E0E6EB]"></div>
    <!-- Transaction List -->
    <div class="flex">
      <!-- Seller -->
      <div class="w-1/2">
        <OrderDetailTransaction
          v-for="payment in sellerOrderPayments"
          :key="payment.id"
          type="issue"
          :currency="order?.base_currency || ''"
          :date="formatDate(payment.created_at, 'hh:mm:ss') || ''"
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
          :date="formatDate(payment.created_at, 'hh:mm:ss') || ''"
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
