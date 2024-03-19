<template>
  <div v-bind="$attrs" class="more-detail relative flex h-fit flex-col">
    <div style="padding: 0.5rem">
      <div class="amount mb-1">
        <div class="label">
          <p class="remaining-title">
            {{ "已入款 / 应入款" + " (" + `${paymentCount ?? 0}` + "笔)" }}
          </p>
        </div>
        <div class="flex">
          <p class="remaining-paid">{{ paidAmount.toVFixed(2) }}</p>
          <p class="remaining !text-[12px]">
            {{ `/${totalAmount.toVFixed(2)}${currency}` }}
          </p>
        </div>
        <div class="remaining flex">
          <p class="text-[10px]">未下发</p>
          <p class="px-1 !text-[15px]">
            {{ (totalAmount - paidAmount).toVFixed(2) }}
          </p>
          <p>{{ props?.currency || "USDT" }}</p>
        </div>
      </div>

      <div v-if="isVisible" class="mx-1 flex flex-col">
        <div class="divider mt-1 h-0 border-t"></div>
        <div
          style="height: 100px"
          class="gap-[1rem] overflow-auto pt-0"
          @scroll="debouncedScrollHandler"
        >
          <div v-for="(order, index) in orders" :key="index">
            <div class="paid-detail my-2 flex w-auto flex-row">
              <p class="time">
                {{ formatDate(order.created_at, "hh:mm:ss") }}
              </p>
              <p class="ml-1 !text-[14px]">
                {{ (order.quantity_given ?? order.amount_paid).toFixed(2) }}
              </p>
              <p v-show="currency !== 'USDT'" class="u !pl-0.5">
                ({{
                  (
                    (order.quantity_given ?? order.amount_paid) / exchangeRate
                  ).toVFixed(2)
                }}U)
              </p>
            </div>
          </div>
          <div v-show="loadMore" class="flex justify-center">
            <UiCircularLoading size="16" />
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 mr-4 items-center justify-end place-self-end">
      <button class="arrow" @click="onClicked">
        <Icon
          :class="[isVisible ? 'arrow-up' : 'arrow-down', 'opacity-30']"
          name="Caret"
          color="#3C3C43"
          size="15"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getOrdersPayment } from "~/api/order";
import { SOCKET_EVENT } from "~/constants/socket";
import { OrderStatus, type OrderDetail } from "~/types/order";

const props = defineProps<{
  paidAmount: number;
  totalAmount: number;
  currency: string;
  id: number;
  party: string;
  paymentCount: number;
  newOrder?: OrderDetail;
  exchangeRate: number;
}>();

const { $evOn, $evOff } = useNuxtApp();

const isLoading = ref(false);
const cursorId = ref(0);
const loadMore = ref(false);
const isVisible = ref(false);
const orders = ref<OrderDetail[]>([]);
const newOrderRef = toRefs(props).newOrder;

watch(
  () => newOrderRef,
  () => {
    if (newOrderRef?.value) {
      orders.value.unshift(newOrderRef.value);
    }
  },
  {
    deep: true,
  }
);

onMounted(() => {
  fetchOrders(props.party);

  $evOn(SOCKET_EVENT.ORDER_STATUS_UPDATED, (d: any) => {
    if (
      d.data?.status === OrderStatus.SUCCESS &&
      d.data?.seller_completed_at &&
      d.data?.buyer_completed_at
    ) {
      orders.value.length = 0;
    }
  });
});

onBeforeUnmount(() => {
  $evOff(SOCKET_EVENT.ORDER_PAYMENT_CONFIRMED);
});

const debouncedScrollHandler = useDebounceFn((event: UIEvent) => {
  const target = event.target as HTMLElement;
  const { scrollTop, clientHeight, scrollHeight } = target;

  if (scrollTop + 2 + clientHeight >= scrollHeight) {
    if (loadMore.value) {
      fetchOrders(props.party);
    }
  }
}, 300);

const onClicked = () => {
  isVisible.value = !isVisible.value;
};

async function fetchOrders(party: string) {
  if (orders.value.length === 0) {
    isLoading.value = true;
  }

  const res = await getOrdersPayment(props.id, {
    last: cursorId.value,
    party,
    limit: 10,
  });

  orders.value.push(...res.results);
  cursorId.value = res.results[res.results.length - 1]?.id || 0;
  loadMore.value = res.meta.has_next;
}
</script>

<style scoped lang="css">
.divider {
  color: "#B7B7B7";
}
.more-detail {
  border-radius: 0.25rem;
  background: #f6f6f6;
  justify-content: space-between;
}

.more-detail .amount {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.3125rem;
}
.remaining {
  color: #b7b7b7;
  font-size: 12px;
  font-style: normal;
  font-family: "DIN ALTERNATE";
  font-weight: 600;
  line-height: 100%;
  margin-top: 3px;
  margin-left: 1px;
}

.remaining-paid {
  color: #212121;
  font-size: 15px;
  font-style: normal;
  font-family: "DIN ALTERNATE";
  font-weight: 600;
  line-height: 100%;
}

.paid-detail {
  color: #b7b7b7;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-family: "DIN ALTERNATE";
}

.paid-detail .time {
  color: #868686;
  font-size: 9px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.paid-detail .u {
  color: #868686;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.remaining-title {
  color: #50a7ea;
  font-family: "PingFang SC";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
}

.arrow {
  width: 0.43369rem;
  height: 0.74394rem;
}

.arrow-up {
  transition: transform 0.3s ease-in-out;
  transform: rotate(180deg);
}

.arrow-down {
  transition: transform 0.3s ease-in-out;
  transform: rotate(0deg);
}
</style>
