<template>
  <div class="flex w-1/2 grow items-center">
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
        {{ exchangeAmount }} {{ type === "issue" ? "USD" : "USDT" }}
      </p>
    </div>
    <Icon name="solar:link-bold-duotone" size="10" color="#3BA9EC" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: "issue" | "deposit";
  date: string;
  amount: number;
  exchangeAmount: number;
}>();
</script>

<style scoped></style>
