<template>
  <div>
    <div class="flex flex-col gap-[17px] py-[23px]">
      <div>
        <VanCellGroup inset title="需方信息">
          <VanCell title="需方负责人">
            <template #right-icon>
              <UiDropdown v-model="detail.buyer" :option="buyers" />
            </template>
          </VanCell>
          <VanCell title="交易类型">
            <template #right-icon>
              <UiDropdown v-model="detail.trx_type" :option="currencies" />
            </template>
          </VanCell>
        </VanCellGroup>
      </div>
      <div>
        <VanCellGroup inset title="交易信息">
          <VanCell title="交易内容">
            <template #right-icon>
              <UiInput v-model="detail.trx_content" />
            </template>
          </VanCell>
          <VanCell title="买入">
            <template #right-icon>
              <UiInput
                v-model="detail.buy_amount"
                :icon="getCurrencyByValue(detail.trx_type)?.icon"
              />
            </template>
          </VanCell>
          <VanCell title="付款币种">
            <template #right-icon>
              <UiDropdown
                v-model="detail.payment_currency"
                :option="currencies"
                disabled
              />
            </template>
          </VanCell>
          <VanCell title="担保金额">
            <template #right-icon>
              <UiInput
                v-model="detail.guarantee_amount"
                :icon="getCurrencyByValue(detail.trx_type)?.icon"
              />
            </template>
          </VanCell>
          <VanCell title="汇率" :value="detail.exchange_rate" />
          <VanCell title="费率" :value="detail.rate" />
          <VanCell title="佣金总额" :value="detail.total_commission" />
          <VanCell title="平台佣金">
            <template #right-icon>
              <UiDropdown v-model="detail.platform" :option="platforms" />
            </template>
          </VanCell>
          <VanCell title="其他费用">
            <template #right-icon>
              <UiInput v-model="detail.platform" :option="platforms" />
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
          <VanCell title="费率" :value="totalAmount.rate" />
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
                {{ `${totalAmount.total_with_fee} ${detail.payment_currency}` }}
              </p>
            </template>
          </VanCell>
          <VanCell title="供方应付款总额">
            <template #right-icon>
              <p class="font-semibold text-[#50A7EA]">
                {{ `${totalAmount.total} ${detail.trx_type}` }}
              </p>
            </template>
          </VanCell>
        </VanCellGroup>
      </div>
    </div>
    <div
      class="sticky bottom-0 flex h-[3.818rem] gap-[0.62rem] bg-white px-4 py-[0.44rem]"
    >
      <UiButton title="取消" icon="Cancel" type="secondary" />
      <UiButton title="确认" icon="Check" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { currencies } from "~/constants/currencies";
import type { Option } from "~/types/common";

const pageStore = usePageStore();

const detail = ref({
  trx_content: "美金轉U",
  buy_amount: "500,000",
  buyer: "张月一",
  trx_type: "USDT",
  payment_currency: "USDC",
  exchange_rate: "1.02",
  rate: "20%",
  total_commission: "0.1%",
  platform_commission: "0.1%",
  other_fee: "0.1%",
  platform: "需方付",
  guarantee_amount: "500,000",
});

const totalAmount = ref({
  total_amount_after_exchange: "510,000",
  rate: "+102,000",
  commission: "+510",
  other_fee: "+10",
  total_with_fee: "612,510",
  total: "500,000",
});

pageStore.setTitle("交易确认");

const buyers = ref<Option[]>([
  {
    label: "张月一",
    value: "张月一",
    icon: "/images/avatar.png",
  },
]);

const platforms = ref<Option[]>([
  {
    label: "需方付",
    value: "需方付",
  },
]);
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
