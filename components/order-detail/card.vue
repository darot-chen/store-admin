<template>
  <div
    class="mx-7 mt-4 rounded-xl bg-gradient-to-r from-[#2E4982] to-[#2B62B6] p-3"
  >
    <div class="relative flex h-full flex-col space-y-1 text-white">
      <p class="text-[11px] text-black">公群50002 房间1</p>
      <p class="text-[11px] font-bold">本日总入款金额 （3笔）</p>
      <div class="!mb-4 flex items-center gap-x-2">
        <Icon name="cryptocurrency-color:usdc" size="32" color="#3e73c4" />
        <div>
          <p class="text-[16px]">500,000.00</p>
          <p class="text-[8px]">≈ 510,000.00 USD</p>
        </div>
      </div>
      <div class="flex w-full gap-x-3 text-[11px]">
        <p>费率：20% | 汇率：0.98</p>
        <p>其他费: 0u</p>
      </div>
      <div class="flex w-full gap-x-3 text-[11px]">
        <p>平台佣金: USDT 51.00</p>
        <p>佣金支付方: 供方付</p>
      </div>
      <div class="wallet-badge absolute -right-3 top-0 pl-4 pr-2">
        <p class="w-[72px] text-center">担保订单：BS000001</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wallet-badge {
  @apply rounded-l-full bg-gradient-to-r from-[#E0F3FD] to-[#C3DCFF] text-[11px] text-black drop-shadow-lg;
}
</style>
