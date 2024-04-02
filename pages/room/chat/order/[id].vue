<template>
  <div>
    <div v-if="!isLoading" class="relative mb-[62px]">
      <CreateOrderAmountDisplay
        v-model:handling-fee-percentage="fee.handlingFeePercentage"
        v-model:other-fee="fee.otherFee"
        v-model:rate="fee.selected_rate"
        @change="debounceCalcAmount"
      />
      <div class="relative mx-[12px] rounded-[10px]">
        <div
          class="flex flex-col items-center gap-[16px] rounded-[10px] bg-white p-[1rem]"
        >
          <!-- Buyer Dropdown -->
          <UiFormWrapper
            type="border"
            title="需方负责人"
            class="px-[11px] py-[7px] text-[17px]"
          >
            <UiDropdown
              :is-show-profile="buyers.length !== 0"
              :hide-show-arrow-down="true"
              title="请选择需方负责人"
              class="text-[17px]"
              :model-value="payload?.buyer_id.toString()"
              :disabled="
                (isRevisable && isOrderConfirmingOrRejected) ||
                isOrderConfirmingOrRejected ||
                buyers.length === 0
              "
              :option="buyers"
              @update:model-value="
                (value) => {
                  payload.buyer_id = +value;
                }
              "
            />
          </UiFormWrapper>

          <!-- Currency and Amount Input -->
          <div
            class="relative w-full rounded-[10px] border-[0.5px] border-[#0000001a] py-[7px]"
          >
            <div
              v-if="Number(fee.selected_rate?.price) === 1"
              class="relative grid grid-cols-1"
            >
              <div class="border-[#0000001a] pr-[8px]">
                <div class="p-[5px]">
                  <CreateOrderCurrency
                    class="mx-[4px]"
                    :model-value="payload.buyer_currency_id"
                    :option="currencyStore.options"
                    @update:model-value="
                      ({ value }) => {
                        payload.buyer_currency_id = +value;
                        getExchangeRate();
                      }
                    "
                  />
                  <VanDivider class="my-[5px]" />
                  <div
                    class="flex w-full flex-col items-start gap-[10px] px-[4px] py-[5px]"
                  >
                    <input
                      v-model="payload.amount"
                      inputmode="decimal"
                      class="w-full rounded-md border-[0.5px] px-2 py-1 font-['DIN_ALTERNATE'] text-[24px] font-bold"
                      @input="debounceCalcAmount"
                    />

                    <div class="flex items-center gap-[5px]">
                      <Icon name="Info" color="#EDEDED" />
                      <p class="text-[10px] text-[#0000004d]">
                        {{ t("minimum") }}
                      </p>
                      <p
                        class="font-['DIN_ALTERNATE'] text-[10px] text-[#F57F7F]"
                      >
                        {{ "0.5" }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else :class="['relative grid grid-cols-2']">
              <div :class="['border-r-[0.5px] border-[#0000001a]  pr-[8px]']">
                <div class="p-[5px]">
                  <CreateOrderCurrency
                    class="mx-[4px]"
                    :model-value="payload.seller_currency_id"
                    :option="currencyStore.options"
                    @update:model-value="
                      ({ value }) => {
                        payload.seller_currency_id = +value;
                        getExchangeRate();
                      }
                    "
                  />
                  <div class="my-[5px] border-[0.5px] border-[#0000001a]" />
                  <div
                    class="flex w-full flex-col items-start gap-[10px] px-[4px] py-[5px]"
                  >
                    <button :class="['flex items-center gap-[5px]']">
                      <Icon name="Info" color="#EDEDED" />
                      <p class="text-[10px] text-[#0000004d]">应下发的币种</p>
                    </button>
                    <input
                      v-model="payload.amount"
                      inputmode="decimal"
                      class="mr-2 w-full rounded-sm text-right font-['DIN_ALTERNATE'] text-[24px] font-bold"
                      @input="debounceCalcAmount"
                    />

                    <div class="hidden items-center gap-[5px]">
                      <p class="text-[10px] text-[#F57F7F]">Error Message</p>
                      <button>
                        <Icon name="Info" color="#EDEDED" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="absolute left-1/2 top-1/2 mt-[1rem] -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  class="flex items-center rounded-[4px] border-[0.8px] border-[#0000001a] bg-white p-1"
                  @click="onSwapCurrency"
                >
                  <Icon name="Swap" color="#0000004D" size="16" />
                </button>
              </div>
              <div class="pl-[8px]">
                <div class="p-[5px]">
                  <CreateOrderCurrency
                    :model-value="payload.buyer_currency_id"
                    :option="currencyStore.options"
                    @update:model-value="
                      ({ value }) => {
                        payload.buyer_currency_id = +value;
                        getExchangeRate();
                      }
                    "
                  />
                  <div class="my-[5px] border-[0.5px]" />
                  <div
                    class="flex w-full flex-col items-end gap-[10px] px-[4px] py-[5px]"
                  >
                    <button class="flex items-center gap-[5px]">
                      <Icon name="Info" color="#EDEDED" />
                      <p class="text-[10px] text-[#0000004d]">应下发的币种</p>
                    </button>
                    <input
                      v-model="sellerReceived"
                      inputmode="decimal"
                      class="mr-2 w-full text-right font-['DIN_ALTERNATE'] text-[24px] font-bold"
                      @input="debounceCalcReceiveAmount"
                    />
                    <div class="hidden items-center gap-[5px]">
                      <p class="text-[10px] text-[#F57F7F]">Error Message</p>
                      <button>
                        <Icon name="Info" color="#EDEDED" />
                      </button>
                    </div>
                    <Icon name="Info" color="#EDEDED" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment method selector -->
          <CreateOrderPaymentMethod
            v-model:selected-rate="fee.selected_rate"
            v-model:selected-payment-method="ss.payment_method"
            :show-realtime-exchange-rate="showRealtimeExchangeRate"
            :payment-methods="PAYMENT_METHODS"
            :rates="exchangeRate"
            @update:show-realtime-exchange-rate="onToggleExchangeRate"
            @update:selected-rate="debounceCalcAmount"
          />

          <div
            class="flex w-full flex-col items-center gap-[11px] rounded-[10px] bg-[#F5F5F5] py-[11px]"
          >
            <div class="w-full px-[16px]">
              <UiFormWrapper title="交易内容" class="py-[11px]">
                <VanField
                  v-model="payload.title"
                  placeholder="交易内容"
                  class="text-input"
                  type="text"
                  input-align="right"
                  error-message-align="right"
                  clearable
                  clear-trigger="always"
                  :error-message="titleErrorMessage"
                  @blur="validateTitleLength"
                />
              </UiFormWrapper>
              <UiFormWrapper title="交易时间" class="py-[11px]">
                <VanField
                  v-model="payload.duration"
                  placeholder="交易时间"
                  class="text-input"
                  type="text"
                  input-align="right"
                  error-message-align="right"
                  clearable
                  clear-trigger="always"
                />
              </UiFormWrapper>
              <UiFormWrapper title="佣金" class="py-[11px]">
                <UiDropdown
                  v-model:model-value="payload.commission_type"
                  :option="COMMISSION_PAY_OPTIONS"
                  class="font-500 py-[6.5px] text-[12px]"
                  title-gap="8px"
                  hide-show-arrow-down
                >
                  <template #right-icon>
                    <button class="inline-flex items-center justify-center">
                      <Icon name="X" size="19" color="#cccccc" />
                    </button>
                  </template>
                </UiDropdown>
              </UiFormWrapper>
            </div>
            <div class="w-full border-b" />
            <div class="w-full px-[16px]">
              <UiFormWrapper title="交易详情" class="py-[11px]">
                <template #icon>
                  <button class="flex items-center">
                    <Icon name="Question" color="#666666" size="15" />
                  </button>
                </template>
                <textarea
                  v-model="payload.note"
                  class="h-[55px] w-[70%] resize-none rounded-[6px] bg-white p-[5px] text-[16px]"
                />
              </UiFormWrapper>
            </div>
          </div>
        </div>
      </div>

      <div
        class="fixed bottom-0 flex w-full max-w-lg items-center justify-between bg-white px-2 py-[15px]"
      >
        <div class="inline-flex w-full gap-[5px] py-[11px] pr-[16px]">
          <p class="total-title">需方应付总额:</p>
          <p class="total-amount">
            {{
              `${payload.amount} ${Number(fee.selected_rate?.price) === 1 ? "U" : ""}`
            }}
          </p>
        </div>
        <UiButton
          v-show="fee.status === OrderStatus.CONFIRMING"
          class="mr-3 px-[20px] py-[15px]"
          :title="$t('cancel')"
          type="secondary"
          @click="onCancelOrderClick"
        />
        <UiButton
          class="px-[20px] py-[15px]"
          title="确认"
          :disabled="titleErrorMessage != ''"
          @click="onCreateOrder"
        />
      </div>
    </div>
    <UiCircularLoading
      v-else
      size="40"
      class="fixed left-0 top-0 flex h-full w-full items-center justify-center"
    />
  </div>
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import { getChatDetail, getChatRoomMembers } from "~/api/chat";
import { createOrder, reviseOrder, sellerCancelOrder } from "~/api/order";
import { getRate } from "~/api/rate";
import { COMMISSION_PAY_OPTIONS } from "~/constants/options/payees";
import { PAYMENT_METHODS } from "~/constants/options/payment-method";
import type { Member, ChatDetail, Chat } from "~/types/chat";
import type { Option } from "~/types/common";
import { CommissionType, OrderStatus, type CreateOrder } from "~/types/order";
import type { Rate, RateParams } from "~/types/rate";

const pageStore = usePageStore();
const route = useRoute();
const router = useRouter();
const currencyStore = useCurrencyStore();
const authStore = useAuthStore();
const { t } = useI18n();

const roomId = +route.params.id;
const chatParamString = route.query.chat as string;

const chatParam: Chat = chatParamString
  ? JSON.parse(chatParamString)
  : undefined;

const members = ref<Member[]>([]);
const chatDetail = ref<ChatDetail>();
const buyers = ref<Option[]>([]);
const exchangeRate = ref<Rate[]>([]);
const isLoading = ref(true);
const showRealtimeExchangeRate = ref(false);
const isRevisable = ref(route.query.revisable === "true");
const isOrderConfirmingOrRejected = ref(false);
const titleErrorMessage = ref("");

const fee = ref<{
  otherFee: number;
  handlingFeePercentage: number;
  selected_rate?: Rate;
  status?: OrderStatus;
  order_id: number;
}>({
  order_id: 0,
  otherFee: 0,
  handlingFeePercentage: 0,
});
const ss = ref<{
  payment_method: Option;
}>({
  payment_method: PAYMENT_METHODS[0],
});

const sellerReceived = ref(0);

const payload = ref<CreateOrder>({
  chat_room_id: roomId,
  seller_currency_id: 0,
  buyer_currency_id: 0,
  buyer_id: 0,
  amount: 0,
  exchange_rate: 1,
  handling_fee_percentage: 0,
  commission_type: CommissionType.BUYER,
  other_expense: 0,
});

const debounceGetRate = useDebounceFn(getExchangeRate, 500);
const debounceCalcAmount = useDebounceFn(() => {
  if (payload.value.amount !== 0 || sellerReceived.value !== 0) {
    const currency =
      currencyStore.data.find(
        (cur) => cur.id === payload.value.buyer_currency_id
      )?.code || "USDT";

    sellerReceived.value = calculateAmount(
      "seller",
      payload.value.amount,
      Number(fee.value.selected_rate?.price || 1),
      {
        fixed: fee.value.otherFee,
        percentage: fee.value.handlingFeePercentage,
      },
      currency
    );
  }
}, 500);

const debounceCalcReceiveAmount = useDebounceFn(() => {
  const currency =
    currencyStore.data.find((cur) => cur.id === payload.value.buyer_currency_id)
      ?.code || "CNY";
  if (payload.value.amount !== 0 || sellerReceived.value !== 0) {
    payload.value.amount = calculateAmount(
      "buyer",
      sellerReceived.value,
      Number(fee.value.selected_rate?.price || 1),
      {
        fixed: fee.value.otherFee,
        percentage: fee.value.handlingFeePercentage,
      },
      currency
    );
  }
}, 500);

onMounted(async () => {
  if (chatParam) {
    isOrderConfirmingOrRejected.value =
      chatParam?.order?.status === OrderStatus.REJECTED ||
      chatParam?.order?.status === OrderStatus.CONFIRMING;

    const [getMember] = await Promise.all([
      getChatRoomMembers(roomId),
      currencyStore.getCurrencyOptions(),
    ]);
    members.value = getMember;
    buyers.value = members.value
      .filter((member) => member.user_id !== authStore.user?.id)
      .map((member) => {
        return {
          label: member?.user?.name ?? member?.admin?.name ?? "",
          value:
            member.user_id?.toString() ?? member?.admin_id?.toString() ?? "",
        };
      });

    if (isRevisable.value) {
      payload.value = {
        chat_room_id: chatParam.chat_room_id,
        amount: chatParam.order?.amount_to_be_paid ?? 0,
        title: chatParam.order?.title ?? "",
        duration: chatParam.order?.duration ?? "",
        note: chatParam.order?.note ?? "",
        commission_type:
          chatParam.order?.commission_type ?? CommissionType.BUYER,
        buyer_id: chatParam.order?.buyer_id ?? 0,
        seller_currency_id: chatParam.order?.seller_currency_id ?? 0,
        buyer_currency_id: chatParam.order?.buyer_currency_id ?? 0,
        exchange_rate: chatParam.order?.exchange_rate ?? 1,
        handling_fee_percentage: chatParam.order?.handling_fee_percentage ?? 0,
        other_expense: chatParam.order?.other_expense ?? 0,
      };

      fee.value = {
        order_id: chatParam.order?.id ?? 0,
        otherFee: chatParam.order?.other_expense ?? 0,
        status: chatParam.order?.status,
        selected_rate: {
          id: "0",
          baseCurrency: chatParam.order?.base_currency ?? "USDT",
          quoteCurrency: chatParam.order?.quote_currency ?? "CNY",
          nickName: "",
          price:
            chatParam.order?.exchange_rate?.toString() ??
            chatDetail.value?.order?.exchange_rate?.toString() ??
            "1",
        },
        handlingFeePercentage: chatParam.order?.handling_fee_percentage ?? 0,
      };
      debounceCalcAmount();
      router.replace({
        query: {
          revisable: "true",
        },
      });
    } else {
      payload.value.buyer_id = +buyers.value[0].value;
      payload.value.seller_currency_id =
        chatParam.order?.seller_currency_id ?? 1;

      if (currencyStore.data[0].id === payload.value.seller_currency_id) {
        payload.value.buyer_currency_id = currencyStore.data[1].id;
      } else {
        payload.value.buyer_currency_id = currencyStore.data[0].id;
      }
    }
    router.replace({
      query: {},
    });
    await getExchangeRate();
    isLoading.value = false;
    pageStore.setTitle("交易确认");
    return;
  }

  try {
    const [getDetail, getMember] = await Promise.all([
      getChatDetail(roomId),
      getChatRoomMembers(roomId),
      currencyStore.getCurrencyOptions(),
    ]);

    chatDetail.value = getDetail;
    members.value = getMember;

    fee.value.handlingFeePercentage =
      chatDetail.value.business?.handling_fee_percentage || 0;
    fee.value.otherFee = chatDetail.value.business?.other_fee || 0;
    fee.value.selected_rate = {
      id: "0",
      baseCurrency:
        chatDetail.value.order?.buyer_currency.code ??
        chatDetail.value.business?.default_currency ??
        "USDT",
      quoteCurrency: chatDetail.value.order?.seller_currency?.code ?? "CNY",
      nickName: "",
      price:
        chatDetail.value?.business?.exchange_rate?.toString() ??
        chatDetail.value?.order?.exchange_rate?.toString() ??
        "1",
    };

    isOrderConfirmingOrRejected.value =
      chatDetail.value?.order?.status === OrderStatus.REJECTED ||
      chatDetail.value?.order?.status === OrderStatus.CONFIRMING;

    buyers.value = members.value
      .filter((member) => member.user_id !== authStore.user?.id)
      .map((member) => {
        return {
          label: member?.user?.name ?? member?.admin?.name ?? "",
          value:
            member.user_id?.toString() ?? member?.admin_id?.toString() ?? "",
        };
      });
    if (isRevisable.value && isOrderConfirmingOrRejected.value) {
      payload.value = {
        chat_room_id: roomId,
        amount: chatDetail.value.order?.amount_to_be_paid ?? 0,
        title: chatDetail.value.order?.title ?? "",
        duration: chatDetail.value.order?.duration ?? "",
        note: chatDetail.value.order?.note ?? "",
        commission_type:
          chatDetail.value.order?.commission_type ?? CommissionType.BUYER,
        buyer_id: chatDetail.value.order?.buyer_id ?? 0,
        seller_currency_id: chatDetail.value.order?.seller_currency.id ?? 0,
        buyer_currency_id: chatDetail.value.order?.buyer_currency?.id ?? 0,
        exchange_rate: chatDetail.value.order?.exchange_rate ?? 1,
        handling_fee_percentage:
          chatDetail.value.order?.handling_fee_percentage ?? 0,
        other_expense: chatDetail.value.order?.other_expense ?? 0,
      };

      fee.value = {
        order_id: chatDetail.value.order?.id ?? 0,
        otherFee:
          chatDetail.value.order?.other_expense ??
          chatDetail.value.business?.other_fee ??
          0,
        status: chatDetail.value.order?.status,
        selected_rate: {
          id: "0",
          baseCurrency:
            chatDetail.value.order?.buyer_currency.code ??
            chatDetail.value.business?.default_currency ??
            "USDT",
          quoteCurrency: chatDetail.value.order?.seller_currency?.code ?? "CNY",
          nickName: "",
          price:
            chatDetail.value.business?.exchange_rate?.toString() ??
            chatDetail.value?.order?.exchange_rate?.toString() ??
            "1",
        },
        handlingFeePercentage:
          chatDetail.value.order?.handling_fee_percentage ??
          chatDetail.value.business?.handling_fee_percentage ??
          0,
      };

      router.replace({
        query: {
          revisable: "true",
        },
      });
    } else {
      if (buyers.value[0]) payload.value.buyer_id = +buyers.value[0].value;
      payload.value.seller_currency_id =
        chatDetail.value.business?.currency_id ?? 1;

      if (currencyStore.data[0].id === payload.value.seller_currency_id) {
        payload.value.buyer_currency_id = currencyStore.data[1].id;
      } else {
        payload.value.buyer_currency_id = currencyStore.data[0].id;
      }
    }

    router.replace({
      query: {},
    });

    await getExchangeRate();
  } catch (error: any) {
    showFailToast(error.message);
  } finally {
    pageStore.setTitle("交易确认");
    isLoading.value = false;
  }
});

function validateTitleLength() {
  if (payload.value.title && payload.value.title?.length > 10) {
    titleErrorMessage.value = t("validation.max_length", { length: 10 });
  } else {
    titleErrorMessage.value = "";
  }
}

function onToggleExchangeRate(v: boolean) {
  showRealtimeExchangeRate.value = v;

  if (v === false) {
    fee.value.selected_rate = {
      id: "0",
      baseCurrency:
        chatDetail.value?.order?.buyer_currency.code ??
        chatDetail.value?.business?.default_currency ??
        "USDT",
      quoteCurrency: chatDetail.value?.order?.seller_currency?.code ?? "CNY",
      nickName: "",
      price:
        chatDetail.value?.business?.exchange_rate?.toString() ??
        chatDetail.value?.order?.exchange_rate?.toString() ??
        "1",
    };
    getExchangeRate();
  }
}

async function onCancelOrderClick() {
  try {
    const result = await sellerCancelOrder(fee.value.order_id);

    if (result.message === "Success") {
      navigateTo(`/room/chat/${roomId}`);
    }
  } catch (error: any) {
    showFailToast(error?.message ?? "");
  }
}

async function onCreateOrder() {
  try {
    const preparedPayload: CreateOrder = {
      ...payload.value,
      seller_currency_id:
        Number(fee.value.selected_rate?.price) === 1
          ? payload.value.buyer_currency_id
          : payload.value.seller_currency_id,
      amount: Number(payload.value.amount),
      exchange_rate: Number(fee.value.selected_rate?.price || 1),
      handling_fee_percentage: fee.value.handlingFeePercentage,
      other_expense: fee.value.otherFee,
    };

    if (
      (isRevisable.value && isOrderConfirmingOrRejected.value) ||
      isOrderConfirmingOrRejected.value
    ) {
      const orderId = chatDetail.value?.order?.id || 0;

      if (!orderId) {
        throw new Error("订单ID不存在");
      }

      await reviseOrder(orderId, preparedPayload);
      return navigateTo(`/room/chat/${roomId}`);
    }

    await createOrder(preparedPayload);
    navigateTo(`/room/chat/${roomId}`);
  } catch (error: any) {
    showFailToast(error?.message ?? "");
  }
}

async function getExchangeRate() {
  if (payload.value.buyer_currency_id === payload.value.seller_currency_id) {
    exchangeRate.value = [];
    return;
  }

  const params: RateParams = {
    base_currency:
      currencyStore.data.find(
        (currency) => currency.id === payload.value.buyer_currency_id
      )?.code ?? "",
    quote_currency:
      currencyStore.data.find(
        (currency) => currency.id === payload.value.seller_currency_id
      )?.code ?? "",
  };

  try {
    exchangeRate.value = await getRate(params);
    debounceCalcAmount();
  } catch (error: any) {
    showFailToast(error?.message ?? "");
  }
}

function onSwapCurrency() {
  const temp = payload.value.buyer_currency_id;
  payload.value.buyer_currency_id = payload.value.seller_currency_id;
  payload.value.seller_currency_id = temp;

  payload.value.amount = 0;
  sellerReceived.value = 0;
  fee.value.selected_rate = undefined;

  debounceGetRate();
}
</script>

<style scoped lang="css">
.dash {
  background-image: url("/svg/dash.svg");
  background-position: center;
  background-color: transparent;
  height: 1px;
  width: 100%;
  margin: 10px 0;
}

.total-title {
  overflow: hidden;
  color: #9b9b9b;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: -0.4px;
}

.total-amount {
  color: #5cb1ff;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.4px;
}

.fee-input {
  border-radius: 10px;
  border: 0.5px solid rgba(120, 122, 141, 0.25);
}

.text-input {
  width: 60%;
  @apply bg-[#f5f5f5] px-0 py-1 text-[14px];
}
</style>
