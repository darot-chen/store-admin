<template>
  <div>
    <div
      class="flex justify-between bg-gradient-to-b from-white to-[#F5F8FE00] px-5 py-2"
    >
      <div class="font-medium text-[#FE7D01]">
        <div class="space-x-1 text-xs">
          <span class="font-normal">交易总额</span>
          <span class="font-bold">USDT</span>
        </div>
        <div class="font-medium">500,000</div>
      </div>

      <div
        class="flex h-fit items-center justify-center rounded-full bg-[#F7E1D8] px-10 py-[5px] text-xs text-white"
      >
        订单异常
      </div>
    </div>

    <div class="relative">
      <div
        class="absolute left-16 top-[-6px] z-10 h-5 w-5 rotate-45 rounded-md bg-[#FE7D01]"
      ></div>
      <div
        class="relative z-10 mx-4 flex flex-col overflow-hidden rounded-full"
      >
        <div class="flex-4 flex justify-around bg-[#FE7D01] p-2 text-white">
          <div class="text-center text-[10px]">
            <div class="space-x-1">
              <span
                class="rounded-full bg-white px-1 py-0.5 text-[8px] text-[#FE7D01]"
              >
                USDT
              </span>
              <span>供方发货</span>
            </div>
            <div class="text-sm">0/500,000</div>
          </div>

          <div class="text-center text-[10px]">
            <div class="space-x-1">
              <span
                class="rounded-full bg-white px-1 py-0.5 text-[8px] text-[#FE7D01]"
              >
                USDT
              </span>
              <span>需方发货</span>
            </div>
            <div class="text-sm">0/612,510</div>
          </div>
        </div>
        <div class="flex-3 bg-white p-2 text-center text-[10px] text-[#FE7D01]">
          担保金额 : 50,000 USDT
        </div>
      </div>
    </div>

    <div class="flex justify-center space-x-2 p-2">
      <button
        class="rounded-lg border border-[#FF6102] bg-white px-5 py-2 text-[#FF6102]"
      >
        拒绝
      </button>
      <button class="rounded-lg bg-[#F7E1D8] px-12 py-2 text-white">
        接受
      </button>
    </div>
  </div>
</template>
