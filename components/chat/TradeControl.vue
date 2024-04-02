<template>
  <div class="container">
    <div class="flex items-center justify-between">
      <div class="total">
        <h2>交易总额 {{ detail?.order?.seller_currency?.code || "USDT" }}</h2>
        <button
          class="flex cursor-pointer flex-row items-center"
          @click="
            () => {
              if (detail?.order?.id)
                navigateTo(
                  `order-detail/${detail?.order?.id}?lobbyTitle=${lobbyTitle}`
                );
            }
          "
        >
          <p
            v-if="detail?.order?.type == 'exchange'"
            class="din-alternate-text"
          >
            {{ detail?.order?.amount_to_be_paid || 0 }}
          </p>
          <p v-else class="din-alternate-text">
            {{ detail?.order?.quantity_to_be_given || 0 }}
          </p>
          <Icon name="Clock" class="ml-2" />
        </button>
      </div>
      <div>
        <div v-if="props.detail?.order?.buyer_confirmed_at" class="action">
          <button
            v-if="!detail?.support_ticket?.id"
            class="secondary-button"
            @click="emit('request-support')"
          >
            订单异常
          </button>
          <button
            v-if="
              (props.detail.order.seller_completed_at === null &&
                props.detail.order.seller_id === authStore.user?.id) ||
              (props.detail.order.buyer_completed_at === null &&
                props.detail.order.buyer_id === authStore.user?.id)
            "
            class="primary-button"
            @click="onConfirmPayment"
          >
            完成交易
          </button>
        </div>
        <div v-else-if="showCreateOrder" class="action">
          <div class="primary-button">
            <button class="primary-button" @click="$emit('order')">
              发起报备
            </button>
          </div>
        </div>
        <div v-else-if="showConfirmButton" class="action">
          <button
            v-if="!detail?.support_ticket?.id"
            class="secondary-button"
            @click="emit('request-support')"
          >
            订单异常
          </button>
          <div class="primary-button">
            <button class="primary-button" @click="onConfirmOrder">
              确认订单
            </button>
          </div>
        </div>
      </div>
    </div>

    <Transition name="drop">
      <div v-show="showMore" class="show-more">
        <ChatTradeControlItem
          v-if="detail?.order?.type == 'exchange'"
          :id="props.detail?.order?.id || 0"
          :exchange-rate="detail?.order?.exchange_rate || 0"
          party="seller"
          class="flex-1"
          :paid-amount="props.detail?.order?.amount_paid || 0"
          :total-amount="props.detail?.order?.amount_to_be_paid || 0"
          :currency="detail?.order?.seller_currency?.code || ''"
          :new-order="newOrderDetail?.amount_paid ? newOrderDetail : undefined"
          :payment-count="detail?.order?.total_seller_payments || 0"
          @payment-mgs-click="(id) => $emit('payment-mgs-click', id)"
        />
        <ChatTradeControlItem
          :id="props.detail?.order?.id || 0"
          :exchange-rate="detail?.order?.exchange_rate || 0"
          party="buyer"
          class="flex-1"
          :paid-amount="props.detail?.order?.quantity_given || 0"
          :total-amount="props.detail?.order?.quantity_to_be_given || 0"
          :currency="detail?.order?.buyer_currency?.code || ''"
          :new-order="
            newOrderDetail?.quantity_given ? newOrderDetail : undefined
          "
          :payment-count="detail?.order?.total_buyer_payments || 0"
          @payment-mgs-click="(id) => $emit('payment-mgs-click', id)"
        />
      </div>
    </Transition>
    <ChatTradeControlBottom
      :detail="detail"
      :is-visible="showMore"
      @click="onShowMore"
    />
  </div>
</template>

<script setup lang="ts">
import { showConfirmDialog } from "vant";
import type { ChatDetail } from "~/types/chat";
import type { OrderDetail } from "~/types/order";

const props = defineProps<{
  detail?: ChatDetail;
  showConfirmButton?: boolean;
  newOrderDetail?: OrderDetail;
  lobbyTitle: string;
}>();

const authStore = useAuthStore();
const { t } = useI18n();
const showCreateOrder = computed(() => {
  return authStore.user?.id === props.detail?.owner_id;
});

const emit = defineEmits<{
  (e: "order"): void;
  (e: "confirm-order-payment"): void;
  (e: "confirm-order"): void;
  (e: "request-support"): void;
  (e: "payment-mgs-click", msgId: number): void;
}>();

const showMore = ref(true);

const onShowMore = () => (showMore.value = !showMore.value);

function onConfirmPayment() {
  showConfirmDialog({
    title: t("please_confirm_complete_transaction"),
    message: t("after_complete_transaction"),
    cancelButtonColor: "#DE3A3A",
  }).then(() => {
    emit("confirm-order-payment");
  });
}

function onConfirmOrder() {
  if (props.showConfirmButton) {
    showConfirmDialog({
      title: t("confirm_sending_order"),
      message: t("confirm_sending_order_message"),
      cancelButtonColor: "#DE3A3A",
    }).then(() => {
      emit("confirm-order");
    });
  }
}
</script>

<style scoped>
.container {
  display: flex;
  padding: 0.625rem;
  flex-direction: column;
  width: 100%;
  gap: 0.625rem;
  background-color: #fff;
}

.total {
  display: inline-flex;
  flex-direction: column;
  font-weight: 400;
}

.total h2 {
  color: #868686;
  font-size: 0.75rem;
  font-weight: 400;
}

.total p {
  color: #3a8ccf;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.action {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action button {
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 0.9375rem;
  padding: 0.375rem 1.0625rem;
  display: flex;
  padding: 0.375rem 1.0625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
}

.primary-button {
  background: #50a7ea;
  color: #fff;
}

.secondary-button {
  background: #d8eeff;
  color: #50a7ea;
}

.detail {
  display: flex;
  width: 17.62806rem;
  align-items: center;
  gap: 1.125rem;
}

.detail p {
  color: var(--Gray-Dark-5, #9b9b9b);
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
}

.show-more {
  display: flex;
  gap: 0.625rem;
  align-self: stretch;
}

.drop-enter-active {
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.drop-enter-from,
.drop-leave-to {
  transform: translateY(-30%);
  opacity: 0;
  position: absolute;
}

.label {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
}

.currency {
  padding: 0.25rem 0.5rem;
  border-radius: 0.625rem;
  background: #50a7ea;
  color: #fff;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
}
</style>
