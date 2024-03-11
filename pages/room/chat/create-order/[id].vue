<template>
  <div v-if="!isLoading" class="relative mb-[62px]">
    <CreateOrderAmountDisplay :rate="updatedPayload.selected_rate" :fee="fee" />

    <div class="relative mx-[12px] rounded-[10px]">
      <div
        class="flex flex-col items-center gap-[16px] rounded-[10px] bg-white p-[1rem]"
      >
        <!-- Buyer Dropdown -->
        <UiFormWrapper
          type="border"
          title="需方负责人"
          class="px-[11px] py-[7px]"
        >
          <UiDropdown
            :hide-show-arrow-down="true"
            title="请选择需方负责人"
            class="text-[17px]"
            :model-value="payload?.buyer_id.toString()"
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
            class="relative grid grid-cols-2 divide-x-[0.5px] divide-[#0000001a]"
          >
            <div class="border-r-[0.5px] border-[#0000001a] pr-[8px]">
              <div class="p-[5px]">
                <CreateOrderCurrency
                  class="mx-[4px]"
                  :model-value="payload.seller_currency_id.toString()"
                  :option="currencyStore.options"
                  @update:model-value="
                    (value) => {
                      payload.seller_currency_id = +value.value;
                      getExchangeRate();
                    }
                  "
                />
                <div class="my-[5px] border-[0.5px] border-[#0000001a]" />
                <div
                  class="flex w-full flex-col items-end gap-[10px] px-[4px] py-[5px]"
                >
                  <button class="flex items-center gap-[5px]">
                    <Icon name="Info" color="#EDEDED" />
                    <p class="text-[10px] text-[#0000004d]">应下发的币种</p>
                  </button>
                  <input
                    disabled
                    class="w-full text-right text-[24px] font-bold disabled:bg-transparent"
                    :value="payload.quantity_to_be_given"
                  />
                  <div class="flex items-center gap-[5px]">
                    <p class="text-[10px] text-[#F57F7F]">Error Message</p>
                    <button>
                      <Icon name="Info" color="#EDEDED" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="absolute left-1/2 top-1/2 mt-[0.8rem] flex -translate-x-1/2 -translate-y-1/2 transform items-center rounded-[4px] border-[0.8px] border-[#0000001a] bg-white p-0.5"
            >
              <Icon name="Swap" color="#0000004D" size="10" />
            </button>

            <div class="pl-[8px]">
              <div class="p-[5px]">
                <CreateOrderCurrency
                  :model-value="payload.buyer_currency_id.toString()"
                  :option="currencyStore.options"
                  @update:model-value="
                    (value) => {
                      payload.seller_currency_id = +value.value;
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
                    class="w-full text-right text-[24px] font-bold"
                    :value="payload.amount"
                    @input="
                      (e) => {
                        onBuyAmountChange(
                          (e.target as HTMLInputElement)?.value
                        );
                      }
                    "
                  />
                  <div class="flex items-center gap-[5px]">
                    <p class="text-[10px] text-[#F57F7F]">Error Message</p>
                    <button>
                      <Icon name="Info" color="#EDEDED" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment method selector -->
        <CreateOrderPaymentMethod
          :payment-methods="PAYMENT_METHODS"
          :rates="exchangeRate"
          :selected-rate="updatedPayload.selected_rate"
          :selected-payment-method="updatedPayload.payment_method"
          @update:selected-rate="
            (item) => (updatedPayload.selected_rate = item)
          "
          @update:selected-payment-method="
            (item) => (updatedPayload.payment_method = item)
          "
        />

        <div
          class="flex w-full flex-col items-center gap-[11px] rounded-[10px] bg-[#F5F5F5] py-[11px]"
        >
          <div class="w-full px-[16px]">
            <UiFormWrapper title="交易内容" class="py-[11px]">
              <UiInput :model-value="payload.title" />
            </UiFormWrapper>
            <UiFormWrapper title="交易时间" class="py-[11px]">
              <UiInput :model-value="payload.duration" />
            </UiFormWrapper>
            <UiFormWrapper title="佣金" class="py-[11px]">
              <UiDropdown
                :model-value="payload.buyer_pay_commission.toString()"
                :option="COMMISSION_PAY_OPTIONS"
                class="text-[12px]"
                hide-show-arrow-down
                @update:model-value="
                  (value) => {
                    if (value === 'true') {
                      payload.buyer_pay_commission = true;
                    } else {
                      payload.buyer_pay_commission = false;
                    }
                  }
                "
              >
                <template #right-icon>
                  <button class="inline-flex items-center justify-center">
                    <Icon name="X" size="14" color="#cccccc" />
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
      class="fixed bottom-0 flex h-[3.818rem] w-full max-w-lg items-center justify-between bg-white px-2 py-[15px]"
    >
      <div class="inline-flex w-full gap-[5px] py-[11px] pr-[16px]">
        <p class="total-title">需方应付总额:</p>
        <p class="total-amount">{{ payload.amount }}</p>
      </div>
      <UiButton
        class="px-[42px] py-[7px]"
        title="确认"
        @click="onCreateOrder"
      />
    </div>
  </div>
  <UiCircularLoading
    v-else
    class="fixed left-0 top-0 flex h-full w-full items-center justify-center"
  />
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import { getChatDetail, getChatRoomMembers } from "~/api/chat";
import { createOrder } from "~/api/order";
import { getRate } from "~/api/rate";
import { COMMISSION_PAY_OPTIONS } from "~/constants/options/payees";
import { PAYMENT_METHODS } from "~/constants/options/payment-method";
import { useCurrencyStore } from "~/stores/currency";
import type { Member, ChatDetail } from "~/types/chat";
import type { Option } from "~/types/common";
import type { CreateOrder } from "~/types/order";
import type { Rate, RateParams } from "~/types/rate";

const pageStore = usePageStore();
const route = useRoute();
const router = useRouter();
const roomId = +route.params.id;
const members = ref<Member[]>([]);
const currencyStore = useCurrencyStore();
const chatDetail = ref<ChatDetail>();
const authStore = useAuthStore();
const buyers = ref<Option[]>([]);
const exchangeRate = ref<Rate[]>([]);
const isLoading = ref(true);

const fee = ref({
  otherFee: 0,
  exchangeRate: 1.02,
  platformRate: 20,
});

const updatedPayload = ref<{
  payment_method: Option;
  selected_rate?: Rate;
}>({
  payment_method: PAYMENT_METHODS[0],
});

const payload = ref<CreateOrder>({
  chat_room_id: roomId,
  amount: 0,
  buyer_currency_id: 2,
  seller_currency_id: 1,
  quantity_to_be_given: 0,
  buyer_id: 0,
  buyer_pay_commission: false,
  other_expense: 0,
  duration: "",
});

onMounted(async () => {
  try {
    const data = await Promise.all([
      getChatDetail(roomId),
      getChatRoomMembers(roomId),
      currencyStore.getCurrencyOptions(),
    ]);

    chatDetail.value = data[0];
    members.value = data[1];

    buyers.value = members.value
      .filter((member) => member.user_id !== authStore.user?.id)
      .map((member) => {
        return {
          label: member?.user?.name ?? member?.admin?.name ?? "",
          value:
            member.user_id?.toString() ?? member?.admin_id?.toString() ?? "",
        };
      });

    payload.value.buyer_id = +buyers.value[0].value;
    payload.value.seller_currency_id =
      chatDetail.value.business?.currency_id ?? 0;

    await getExchangeRate();
  } catch (error) {
    router.back();
  } finally {
    pageStore.setTitle("交易确认");
    isLoading.value = false;
  }
});

function onBuyAmountChange(value: string | number) {
  payload.value.amount = +value;
  const handlingFee = (100 + fee.value.platformRate) / 100;

  // QuantityToBeGiven = amount * exchange_rate * (100+handling_fee_percentage)/100 + other_expense * exchange_rate
  payload.value.quantity_to_be_given = Number(
    (
      payload.value.amount * fee.value.exchangeRate * handlingFee +
      fee.value.otherFee * fee.value.exchangeRate
    ).toFixed(2)
  );
}

async function onCreateOrder() {
  try {
    const res = await createOrder(payload.value);
    navigateTo(`/room/chat/${res.chat_room_id}`);
  } catch (error: any) {
    showFailToast(error?.message ?? "");
  }
}

async function getExchangeRate() {
  const params: RateParams = {
    base_currency:
      currencyStore.data.find(
        (currency) => currency.id === payload.value.buyer_currency_id
      )?.code ?? "USDT",
    quote_currency:
      currencyStore.data.find(
        (currency) => currency.id === payload.value.seller_currency_id
      )?.code ?? "CNY",
  };

  try {
    exchangeRate.value = await getRate(params);
  } catch (error: any) {
    showFailToast(error?.message ?? "");
  }
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
  color: var(--Gray-Dark-5, #9b9b9b);
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
</style>
