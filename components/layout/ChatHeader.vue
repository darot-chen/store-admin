<template>
  <div>
    <Head>
      <Title>{{ $t($route.meta.title || "") }}</Title>
    </Head>
    <div
      class="absolute z-10 flex w-full items-center gap-2 bg-white px-2 py-2"
      style="max-width: 32rem; left: auto; z-index: 100"
    >
      <img src="/img/icons/back.svg" alt="back" />
      <div class="h-[30px] w-[30px] rounded-full border border-[#E3E3E3] p-0.5">
        <img src="/img/icons/chat-icon.svg" alt="chat-icon" />
      </div>
      <div>
        <div class="flex text-sm text-[#494E55]">
          <span>百顺支付已押15000U</span>
          <img src="/img/icons/star-wing.svg" alt="" />
          <img src="/img/icons/star-wing.svg" alt="" />
        </div>
        <div class="text-[10px] text-[#A8A8A8]">公群5530</div>
      </div>

      <div class="ml-auto">
        <div class="h-[30px] w-[30px] rounded-full bg-[#F5F8FE] p-0.5">
          <img src="/img/icons/customer-service.svg" alt="customer-service" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
