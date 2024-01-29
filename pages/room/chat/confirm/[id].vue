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
          <VanCell title="交易内容">
            <template #right-icon>
              <UiInput
                :model-value="payload?.remark"
                @update:model-value="
                  (value) => {
                    payload.remark = value.toString();
                  }
                "
              />
            </template>
          </VanCell>
          <VanCell title="买入">
            <template #right-icon>
              <UiInput
                :model-value="payload.quantity"
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
                :model-value="
                  chatDetail?.business?.available_fund?.toString() ?? ''
                "
                type="number"
                :icon="
                  getCurrencyByValue(
                    chatDetail?.business?.currency_id.toString()
                  )?.icon
                "
              />
            </template>
          </VanCell>
          <VanCell title="汇率" :value="`${payload.rate} %`" />
          <VanCell title="费率" :value="`${payload.rate} %`" />
          <VanCell title="佣金总额" :value="payload.total_commission" />
          <VanCell title="平台佣金">
            <template #right-icon>
              <UiDropdown model-value="需方付" :option="platforms" />
            </template>
          </VanCell>
          <VanCell title="其他费用">
            <template #right-icon>
              <UiInput model-value="需方付" :option="platforms" />
            </template>
          </VanCell>
        </VanCellGroup>
      </div>
      <div>
        <VanCellGroup inset title="兑换后总额">
          <VanCell title="兑换后总额" :value="totalAmount.rate" />
          <VanCell
            title="费率"
            :value="totalAmount.total_amount_after_exchange"
          />
          <VanCell title="佣金" :value="totalAmount.commission" />
          <VanCell
            class="!static"
            title="其他费用"
            :value="totalAmount.other_fee"
          />
          <div class="dash" />
          <VanCell title="需方应付款总额">
            <template #right-icon>
              <p class="font-semibold text-[#50A7EA]">
                {{
                  `${totalAmount.total_with_fee} ${getCurrencyByValue(chatDetail?.business?.currency_id.toString())?.label}`
                }}
              </p>
            </template>
          </VanCell>
          <VanCell title="供方应付款总额">
            <template #right-icon>
              <p class="font-semibold text-[#50A7EA]">
                {{
                  `${totalAmount.total} ${getCurrencyByValue(payload.currency_id.toString())?.label}`
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

onMounted(async () => {
  try {
    chatDetail.value = await getChatDetail(roomId);
    members.value = await getChatRoomMembers(roomId);

    currencyStore.getCurrencyOptions();

    buyers.value = members.value.map((member) => ({
      label: member.user.name,
      value: member.id.toString(),
    }));

    payload.value.buyer_id = members.value[0].id;
    payload.value.currency_id = chatDetail.value.business?.currency_id ?? 0;
  } catch (error) {
    router.back();
  }
  pageStore.setTitle("交易确认");
});

const payload = ref<CreateOrder>({
  currency_id: 0,
  buyer_id: 0,
  quantity: 0,
  rate: 1,
  chat_room_id: roomId,
  remark: "",
  total_commission: 0,
  service_fee: 0,
});

const totalAmount = ref({
  total_amount_after_exchange: 0,
  rate: 0,
  commission: "0",
  other_fee: 0,
  total_with_fee: 0,
  total: 0,
});

const buyers = ref<Option[]>([]);

const platforms = ref<Option[]>([
  {
    label: "需方付",
    value: "需方付",
  },
]);

function onBuyAmountChange(value: string | number) {
  payload.value.quantity = +value;

  totalAmount.value.total_amount_after_exchange =
    payload.value.quantity -
    (payload.value.quantity * payload.value.rate) / 100;

  totalAmount.value.rate =
    payload.value.quantity +
    (payload.value.quantity - totalAmount.value.total_amount_after_exchange);

  totalAmount.value.total = payload.value.quantity;

  totalAmount.value.total_with_fee =
    totalAmount.value.total_amount_after_exchange + totalAmount.value.rate;
}

async function onCreateOrder() {
  try {
    await createOrder(payload.value);
  } catch (error) {}
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
