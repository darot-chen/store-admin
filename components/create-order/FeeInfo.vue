<template>
  <div class="detail-item">
    <div class="inline-flex items-center gap-[5px]">
      <h1 class="text-[15px] font-semibold">{{ title }}</h1>
      <Icon name="Info" color="#E1EFFF" />
    </div>
    <button class="text-[16px]" @click="$emit('click', props.type)">
      {{ value + `${props.type == "platformRate" ? "%" : ""}` }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value: string | number;
  type: "platformRate" | "price" | "otherFee";
}>();

defineEmits(["click"]);

const title = computed(() => {
  switch (props.type) {
    case "platformRate":
      return "费率";
    case "price":
      return "汇率";
    case "otherFee":
      return "其他费";
    default:
      break;
  }
});
</script>

<style scoped>
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
</style>
