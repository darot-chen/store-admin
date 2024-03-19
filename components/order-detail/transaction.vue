<template>
  <div class="flex w-full grow items-center border-b-2 px-4 py-2">
    <Icon
      :name="
        type === 'issue'
          ? 'cryptocurrency-color:usdt'
          : 'cryptocurrency-color:usdc'
      "
      size="24"
      color="#3e73c4"
    />
    <div class="pl-2">
      <p class="text-[10px] text-gray-400">记账时间 {{ date }}</p>
      <p class="text-[14px] text-black">
        {{ type === "issue" ? "下发" : "" }} {{ amount }}
      </p>
      <p class="text-[10px] text-gray-400">
        {{ exchangeAmount }} {{ currency }}
      </p>
    </div>
    <Icon name="solar:link-bold-duotone" size="10" color="#3BA9EC" />
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
