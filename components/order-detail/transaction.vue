<template>
  <div class="mb-1 w-full border-r">
    <div
      class="w-full border-b border-dashed border-[#B7B7B7] bg-white px-6 py-2"
    >
      <div class="din-alternate-text flex items-center text-[14px] text-black">
        <p class="text-[11px] text-[#B7B7B7]">
          {{ type === "issue" ? "下发" : "" }}
        </p>
        <p class="text-[18px] font-bold text-black">
          {{ amount.toFixed(2) }}
        </p>
      </div>
      <p class="din-alternate-text text-[11px] text-gray-300">
        ≈{{ exchangeAmount.toFixed(2) }} {{ currency }}
      </p>
    </div>
    <div
      class="relative flex justify-between bg-[#FAFAFA] p-2 text-[10px] text-[#B7B7B7]"
    >
      <div
        class="absolute -left-[6.5px] -top-[7px] h-3 w-3 rounded-full bg-[#EFEEF4]"
      ></div>
      <div
        class="absolute -right-[6.5px] -top-[7px] h-3 w-3 rounded-full bg-[#EFEEF4]"
      ></div>
      <p>{{ date }}</p>
      <button>
        <Icon name="lucide:message-circle-more" size="12" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: "issue" | "deposit";
  date: string;
  currency: string;
  amount: number;
  exchangeAmount: number;
}>();
</script>

<style scoped></style>
