<template>
  <div class="container">
    <div class="flex items-center justify-between">
      <div class="total">
        <h2>交易总额 {{ detail?.order?.seller_currency?.code || "USDT" }}</h2>
        <p>{{ detail?.order?.amount_to_be_paid || 0 }}</p>
      </div>
      <div>
        <div v-if="props.detail?.order?.buyer_confirmed_at" class="action">
          <button class="secondary-button">订单异常</button>
          <button
            v-if="
              (props.detail.order.seller_completed_at === null &&
                props.detail.order.seller_id === authStore.user?.id) ||
              (props.detail.order.buyer_completed_at === null &&
                props.detail.order.buyer_id === authStore.user?.id)
            "
            class="primary-button"
            @click="onEmitConfirmOrder"
          >
            发起报备
          </button>
        </div>
        <div v-else-if="showCreateOrder" class="action">
          <div class="primary-button">
            <button class="primary-button" @click="$emit('createOrder')">
              完成交易
            </button>
          </div>
        </div>
        <div v-else-if="showConfirmButton" class="action">
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
        <div class="more-detail">
          <div class="amount">
            <div class="label">
              <div class="currency">
                <p>
                  {{ detail?.order?.seller_currency?.code || "USDT" }}
                </p>
              </div>
              <p class="remaining-title">供方发货</p>
            </div>
            <div class="remaining">
              {{
                `${props.detail?.order?.amount_paid || 0}/${
                  props.detail?.order?.amount_to_be_paid || 0
                }`
              }}
            </div>
          </div>
          <UiProgressBar :progress="computeSellerCompletionPercentage" />
        </div>
        <div class="more-detail">
          <div class="amount">
            <div class="label">
              <div class="currency">
                <p>
                  {{ detail?.order?.buyer_currency?.code || "USD" }}
                </p>
              </div>
              <p class="remaining-title">需方发货</p>
            </div>
            <div class="remaining">
              {{
                `${props.detail?.order?.quantity_given || 0}/${
                  props.detail?.order?.quantity_to_be_given || 0
                }`
              }}
            </div>
          </div>
          <UiProgressBar :progress="computeBuyerCompletionPercentage" />
        </div>
      </div>
    </Transition>
    <div class="flex items-center justify-between">
      <div class="detail">
        <p>担保订单号：{{ detail?.order?.id || "-" }}</p>
        <p>
          担保金额: {{ detail?.order?.quantity_to_be_given || "-" }}
          {{ detail?.order?.seller_currency?.code }}
        </p>
      </div>
      <div>
        <button class="arrow" @click="onShowMore">
          <Icon
            :class="[showMore ? 'arrow-up' : 'arrow-down', 'opacity-30']"
            name="Caret"
            color="#3C3C43"
            size="11"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showConfirmDialog } from "vant";
import type { ChatDetail } from "~/types/chat";

const props = defineProps<{
  detail?: ChatDetail;
  showConfirmButton?: boolean;
}>();

const authStore = useAuthStore();
const { t } = useI18n();
const showCreateOrder = computed(() => {
  return authStore.user?.id === props.detail?.owner_id;
});

const computeBuyerCompletionPercentage = computed(() => {
  if (!props.detail?.order?.quantity_given) return 0;

  return (
    (100 * (props.detail?.order?.quantity_given || 0)) /
    (props.detail?.order?.quantity_to_be_given || 0)
  );
});

const computeSellerCompletionPercentage = computed(() => {
  if (!props.detail?.order?.amount_paid) return 0;

  return (
    (100 * (props.detail?.order?.amount_paid || 0)) /
    props.detail?.order?.amount_to_be_paid
  );
});

const emit = defineEmits<{
  (e: "createOrder"): void;
  (e: "confirmOrderPayment"): void;
  (e: "confirmOrder"): void;
}>();

const showMore = ref(true);

function onShowMore() {
  showMore.value = !showMore.value;
}

function onEmitConfirmOrder() {
  showConfirmDialog({
    title: t("please_confirm_complete_transaction"),
    message: t("after_complete_transaction"),
    cancelButtonColor: "#DE3A3A",
  })
    .then(() => {
      emit("confirmOrderPayment");
    })
    .catch(() => {});
}

function onConfirmOrder() {
  if (props.showConfirmButton) {
    showConfirmDialog({
      title: "确认",
      message: "确认发送？",
    })
      .then(() => {
        emit("confirmOrder");
      })
      .catch(() => {});
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
  font-size: 0.9375rem;
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

.arrow {
  width: 0.43369rem;
  height: 0.74394rem;
}

.arrow-up {
  transition: transform 0.3s ease-in-out;
  transform: rotate(180deg);
}

/* add arrow up transition */
.arrow-up {
  transition: transform 0.3s ease-in-out;
  transform: rotate(180deg);
}

.arrow-down {
  transition: transform 0.3s ease-in-out;
  transform: rotate(0deg);
}

.show-more {
  display: flex;
  align-items: center;
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

.more-detail {
  border-radius: 0.25rem;
  background: #f6f6f6;
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
}

.more-detail .amount {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.3125rem;
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

.remaining-title {
  border-radius: 0.625rem;
  color: #50a7ea;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
}

.remaining {
  color: #212121;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
}
</style>
