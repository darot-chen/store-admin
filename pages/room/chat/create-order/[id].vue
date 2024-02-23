<template>
  <div class="relative mb-[62px]">
    <div class="container py-[12px]">
      <div class="detail mx-[12px] items-center">
        <div class="detail-item">
          <div class="inline-flex items-center gap-[5px]">
            <h1 class="text-[15px] font-semibold">汇率</h1>
            <Icon name="Info" color="#E1EFFF" />
          </div>
          <p class="text-[16px]">{{ fee.platformRate }}%</p>
        </div>
        <UiDivider />
        <div class="detail-item">
          <div class="inline-flex items-center gap-[5px]">
            <h1 class="text-[15px] font-semibold">费率</h1>
            <Icon name="Info" color="#E1EFFF" />
          </div>
          <p class="text-[16px]">{{ fee.exchangeRate }}</p>
        </div>
        <UiDivider />
        <div class="detail-item">
          <div class="inline-flex items-center gap-[5px]">
            <h1 class="text-[15px] font-semibold">其他费</h1>
            <Icon name="Info" color="#E1EFFF" />
          </div>
          <p class="text-[16px]">{{ fee.otherFee }}</p>
        </div>
      </div>
    </div>

    <div class="relative mx-[12px] rounded-[10px]">
      <div
        class="flex flex-col items-center gap-[16px] rounded-[10px] bg-white p-[16px]"
      >
        <FormWrapper
          type="border"
          title="需方负责人"
          class="px-[11px] py-[7px]"
        >
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
        </FormWrapper>

        <UiDivider type="horizontal" />

        <div
          class="flex w-full flex-col items-center gap-[10px] rounded-[10px] bg-[#F5F5F5] px-[16px]"
        >
          <FormWrapper title="应入款总额" class="py-[11px]">
            <span class="flex items-center">
              <UiDropdown
                :model-value="payload.seller_currency_id.toString()"
                disabled
                :option="currencyStore.options"
              />
              <UiInput
                required
                :model-value="payload.amount"
                type="number"
                @update:model-value="onBuyAmountChange"
              />
            </span>
          </FormWrapper>
          <FormWrapper title="应下发的币种" class="py-[11px]">
            <span class="flex items-center">
              <UiDropdown
                :model-value="payload.buyer_currency_id.toString()"
                :option="currencyStore.options"
                @update:model-value="
                  (value) => {
                    payload.buyer_currency_id = +value;
                  }
                "
              />
              <UiInput
                required
                :model-value="payload.quantity_to_be_given"
                type="number"
                disabled
              />
            </span>
          </FormWrapper>

          <FormWrapper title="交易内容" class="py-[11px]">
            <UiInput :model-value="payload.title" />
          </FormWrapper>
          <FormWrapper title="交易时间" class="py-[11px]">
            <UiInput :model-value="payload.duration" />
          </FormWrapper>
          <FormWrapper title="佣金" class="py-[11px]">
            <UiDropdown
              :model-value="payload.buyer_pay_commission.toString()"
              :option="COMMISSION_PAY_OPTIONS"
              @update:model-value="
                (value) => {
                  if (value === 'true') {
                    payload.buyer_pay_commission = true;
                  } else {
                    payload.buyer_pay_commission = false;
                  }
                }
              "
            />
          </FormWrapper>

          <UiDivider type="horizontal" />

          <FormWrapper title="交易详情" class="py-[11px]">
            <textarea
              v-model="payload.note"
              class="h-[250px] rounded-[6px] bg-white p-[5px] text-[14px]"
            />
          </FormWrapper>
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
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import { getChatDetail, getChatRoomMembers } from "~/api/chat";
import { createOrder } from "~/api/order";
import FormWrapper from "~/components/ui/FormWrapper.vue";
import { COMMISSION_PAY_OPTIONS } from "~/constants/options/payees";
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
const buyers = ref<Option[]>([]);

const fee = ref({
  otherFee: 0,
  exchangeRate: 1.02,
  platformRate: 20,
});

const payload = ref<CreateOrder>({
  chat_room_id: roomId,
  amount: 0,
  buyer_currency_id: 2,
  seller_currency_id: 0,
  quantity_to_be_given: 0,
  buyer_id: 0,
  buyer_pay_commission: false,
  other_expense: 0,
  duration: "",
});

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
    payload.value.seller_currency_id =
      chatDetail.value.business?.currency_id ?? 0;
  } catch (error) {
    router.back();
  }
  pageStore.setTitle("交易确认");
});

function onBuyAmountChange(value: string | number) {
  payload.value.amount = +value;
  const platformFee = (100 + fee.value.platformRate) / 100;

  payload.value.quantity_to_be_given = Number(
    (
      payload.value.amount * fee.value.exchangeRate * platformFee +
      fee.value.otherFee
    ).toFixed(2)
  );
}

async function onCreateOrder() {
  try {
    // const res = await createExchangeOrder(payload.value);
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

.detail {
  display: flex;
  padding: 16px;
  gap: 5px;
  border-radius: 8px;
  background: url("/images/bg-detail.png") no-repeat center center;
  background-blend-mode: color, normal;
  box-shadow:
    0px 4px 10px 0px rgba(92, 177, 255, 0.26),
    0px 0px 9px 0px rgba(255, 255, 255, 0.75) inset;
  filter: drop-shadow(0px 10px 50px rgba(92, 177, 255, 1));
}

.detail-item {
  color: #e1efff;
  display: flex;
  height: 62px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  flex: 1 0 0;
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
