<template>
  <div>
    <div class="flex flex-col gap-[17px] py-[23px]">
      <div>
        <VanCellGroup inset title="需方信息">
          <VanCell title="需方负责人">
            <template #right-icon>
              <UiDropdown
                title="请选择需方负责人"
                :model-value="payload?.buyer_id.toString()"
                :option="buyers"
                @update:model-value="
                  (value) => {
                    payload.buyer_id = +value;
                  }
                "
              />
            </template>
          </VanCell>
          <VanCell title="交易类型">
            <template #right-icon>
              <UiDropdown
                title="请选择交易类型"
                :model-value="payload?.currency_id.toString() ?? ''"
                :option="currencyStore.options"
                @update:model-value="
                  (value) => {
                    payload.currency_id = +value;
                  }
                "
              />
            </template>
          </VanCell>
        </VanCellGroup>
      </div>
      <div>
        <VanCellGroup inset title="交易信息">
          <!-- <VanCell title="交易内容">
            <template #right-icon>
              <UiInput />
            </template>
          </VanCell> -->
          <VanCell title="买入">
            <template #right-icon>
              <UiInput
                required
                :model-value="payload.quantity_to_be_given"
                type="number"
                :icon="getCurrencyByValue(payload.currency_id.toString())?.icon"
                @update:model-value="onBuyAmountChange"
              />
            </template>
          </VanCell>
          <VanCell title="付款币种">
            <template #right-icon>
              <UiDropdown
                :model-value="
                  chatDetail?.business?.currency_id.toString() ?? ''
                "
                :option="currencyStore.options"
                disabled
              />
            </template>
          </VanCell>
          <VanCell title="担保金额">
            <template #right-icon>
              <UiInput
                :model-value="0"
                type="number"
                :icon="
                  getCurrencyByValue(
                    chatDetail?.business?.currency_id.toString()
                  )?.icon
                "
              />
            </template>
          </VanCell>
          <VanCell title="汇率">
            <template #right-icon>
              <UiInput
                :model-value="payload.exchange_rate"
                type="number"
                @update:model-value="onRateChange"
              />
            </template>
          </VanCell>
          <VanCell title="佣金总额">
            <template #right-icon>
              <UiInput
                is-percent
                :model-value="payload.handling_fee_percentage"
                type="number"
                @update:model-value="onCommissionChange"
              />
            </template>
          </VanCell>
          <VanCell title="平台佣金">
            <template #right-icon>
              <UiDropdown
                :model-value="payload.buyer_pay_commission.toString()"
                :option="commissionPayOptions"
                @update:model-value="
                  (value) => {
                    if (value === 'true') {
                      payload.buyer_pay_commission = true;
                    } else {
                      payload.buyer_pay_commission = false;
                    }
                    calculateTotalAmount();
                  }
                "
              />
            </template>
          </VanCell>
        </VanCellGroup>
      </div>
      <div>
        <VanCellGroup inset title="兑换后总额">
          <VanCell
            title="兑换后总额"
            :value="totalAmount.total_amount_after_exchange"
          />
          <VanCell
            class="!static"
            title="费率"
            :value="totalAmount.commission"
          />

          <div class="dash" />
          <VanCell title="需方应付款总额">
            <template #right-icon>
              <p class="font-semibold text-[#50A7EA]">
                {{
                  `${totalAmount.amount_pay_by_buyer} ${getCurrencyByValue(chatDetail?.business?.currency_id.toString())?.label ?? ""}`
                }}
              </p>
            </template>
          </VanCell>
          <VanCell title="供方应付款总额">
            <template #right-icon>
              <p class="font-semibold text-[#50A7EA]">
                {{
                  `${totalAmount.amount_pay_by_seller} ${getCurrencyByValue(payload.currency_id.toString())?.label ?? ""}`
                }}
              </p>
            </template>
          </VanCell>
        </VanCellGroup>
      </div>
    </div>
    <div
      class="sticky bottom-0 flex h-[3.818rem] gap-[0.62rem] bg-white px-4 py-[0.44rem]"
    >
      <UiButton
        title="取消"
        icon="Cancel"
        type="secondary"
        @click="
          () => {
            $router.back();
          }
        "
      />
      <UiButton title="确认" icon="Check" @click="onCreateOrder" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import { getChatDetail, getChatRoomMembers } from "~/api/chat";
import { createOrder } from "~/api/order";
import { useCurrencyStore } from "~/stores/currency";
import type { Member, ChatDetail } from "~/types/chat";
import type { Option } from "~/types/common";
import type { CreateOrder } from "~/types/order";

const pageStore = usePageStore();
const route = useRoute();
const router = useRouter();
const roomId = +route.params.id;
const members = ref<Member[]>([]);
const currencyStore = useCurrencyStore();
const chatDetail = ref<ChatDetail>();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    chatDetail.value = await getChatDetail(roomId);
    members.value = await getChatRoomMembers(roomId);
    currencyStore.getCurrencyOptions();

    buyers.value = members.value
      .filter((member) => member.user_id !== authStore.user?.id)
      .map((member) => {
        return {
          label: member.user.name,
          value: member.user_id?.toString() ?? "",
        };
      });

    payload.value.buyer_id = +buyers.value[0].value;
    payload.value.currency_id = chatDetail.value.business?.currency_id ?? 0;
  } catch (error) {
    router.back();
  }
  pageStore.setTitle("交易确认");
});

const payload = ref<CreateOrder>({
  chat_room_id: roomId,
  currency_id: 0,
  buyer_id: 0,
  quantity_to_be_given: 0,
  exchange_rate: 0,
  handling_fee_percentage: 0,
  buyer_pay_commission: false,
  other_expense: 0,
});

const totalAmount = ref({
  total_amount_after_exchange: 0,
  commission: 0,
  amount_pay_by_seller: 0,
  amount_pay_by_buyer: 0,
});

const buyers = ref<Option[]>([]);

const commissionPayOptions = ref<Option[]>([
  {
    label: "需方付",
    value: "true",
  },
  {
    label: "供方付",
    value: "false",
  },
]);

function calculateTotalAmount() {
  if (payload.value.buyer_pay_commission) {
    totalAmount.value.amount_pay_by_seller = payload.value.quantity_to_be_given;

    totalAmount.value.amount_pay_by_buyer =
      totalAmount.value.total_amount_after_exchange +
      payload.value.other_expense +
      totalAmount.value.commission;
  } else {
    totalAmount.value.amount_pay_by_buyer = payload.value.quantity_to_be_given;

    totalAmount.value.amount_pay_by_seller =
      totalAmount.value.total_amount_after_exchange +
      payload.value.other_expense +
      totalAmount.value.commission;
  }
}

function onRateChange(value: string | number) {
  totalAmount.value.total_amount_after_exchange =
    payload.value.quantity_to_be_given * +value;
  calculateTotalAmount();
  payload.value.exchange_rate = +value;
}

function onCommissionChange(value: string | number) {
  totalAmount.value.commission =
    (payload.value.quantity_to_be_given * +value) / 100;
  calculateTotalAmount();
  payload.value.handling_fee_percentage = +value;
}

function onBuyAmountChange(value: string | number) {
  payload.value.quantity_to_be_given = +value;

  onCommissionChange(payload.value.handling_fee_percentage);
  onRateChange(payload.value.exchange_rate);
  calculateTotalAmount();
}

async function onCreateOrder() {
  try {
    const res = await createOrder(payload.value);
    navigateTo(`/room/chat/${res.chat_room_id}`);
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
</style>
