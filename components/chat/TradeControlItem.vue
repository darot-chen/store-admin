<template>
  <div class="more-detail relative flex h-fit flex-col">
    <div style="padding: 0.5rem">
      <div class="amount">
        <div class="label">
          <p class="remaining-title">已入款 / 应入款 (3笔)</p>
        </div>
        <div class="flex">
          <p class="remaining-paid">
            {{ paidAmount }}
          </p>
          <p class="remaining">
            {{ `/${totalAmount}${currency}` }}
          </p>
        </div>
        <p class="remaining" style="font-size: 13px">未下发 230,000 USDT</p>
      </div>

      <div v-if="isVisible" class="mx-1 flex flex-col">
        <div class="divider my-2 h-0 border-t">
          <UiDivider />
        </div>
        <div
          style="height: 100px"
          class="gap-[1rem] overflow-auto pt-1"
          @scroll="debouncedScrollHandler"
        >
          <div v-for="(order, index) in orders" :key="index">
            <div class="paid-detail my-2 flex w-auto flex-row">
              <p class="time">
                {{ getFormattedTime(order.created_at) }}
              </p>
              <p class="ml-1">
                {{ order.quantity_given ?? order.amount_paid }}
              </p>
              <p class="u">(...)</p>
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
import { getOrders } from "~/api/order";
import type { OrderDetail } from "~/types/order";
import _ from "lodash";

const props = defineProps<{
  paidAmount: number;
  totalAmount: number;
  currency: string;
  id: number;
  party: string;
  newOrder?: OrderDetail;
}>();

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
});

const debouncedScrollHandler = _.debounce((event: UIEvent) => {
  const target = event.target as HTMLElement;
  const { scrollTop, clientHeight, scrollHeight } = target;

  if (scrollTop + 2 + clientHeight >= scrollHeight) {
    if (loadMore.value) {
      fetchOrders(props.party);
    }
  }
}, 300);

function getFormattedTime(date: string): string {
  if (!date) return "no date";

  const formattedDate = new Date(date);
  const hours = formattedDate.getHours();
  const minutes = formattedDate.getMinutes();
  const seconds = formattedDate.getSeconds();

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const wantedFormat = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;

  return wantedFormat;
}

const onClicked = () => {
  isVisible.value = !isVisible.value;
};

async function fetchOrders(party: string) {
  if (orders.value.length === 0) {
    isLoading.value = true;
  }

  const res = await getOrders(props.id, {
    last: cursorId.value,
    party,
    limit: 10,
  });

  orders.value.push(...res.results);
  cursorId.value = res.results[res.results.length - 1]?.id || 0;
  loadMore.value = res.meta.has_next;
}
</script>

<style scoped>
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
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  margin-top: 3px;
  margin-left: 1px;
}

.remaining-paid {
  color: #212121;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
}

.paid-detail {
  color: #b7b7b7;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.paid-detail .time {
  color: #868686;
  font-size: 6px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.paid-detail .u {
  color: #868686;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.remaining-title {
  color: #50a7ea;
  leading-trim: both;
  text-edge: cap;
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
