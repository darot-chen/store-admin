<template>
  <div class="relative flex h-full flex-col border-[1px] border-t-[#3c3c435c]">
    <div class="absolute mt-2 flex w-full">
      <UiTag title="21 January" />
    </div>
    <div
      class="my-10 flex h-full flex-col-reverse gap-[1rem] overflow-auto px-[0.5rem]"
    >
      <UiChatBubble
        v-for="i in 1"
        :key="i"
        name="BS Customer Service 7/24"
        :text="msg"
        timestamp="11:45"
        :show-button="true"
        type="incoming"
      />
    </div>
    <Chat2Input />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "chat2",
  title: "公群 50002 房间 1",
});

const msg = `公群50002
交易方对接人：@moon
交易内容：美金轉U
交易金额：500,000u
汇率: 1.02
费率: 20%
佣金总额: 需方付
其他费用: 10u
订单完成时间: 5天

需方应付款总额: 612,510 USD
供方应付款总额: 500,000 USDT

收到卡测试没问题结算多少：全部
第二阶段过几天结算剩下的尾款：无
结算完日期：1月26日
验收标准：正常即可
温馨提示：！为避免纠纷建议双方录制视频，快递运输7天时间内。加上后期另外结算时间为交易总时长。`;
</script>
