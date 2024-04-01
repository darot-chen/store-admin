<template>
  <div
    v-show="title"
    class="my-[0.1rem] inline-block w-full text-center"
    @click="$emit('click')"
  >
    <div
      class="bg-tag"
      :style="[`background-color:  ${bgColor || 'rgba(114, 131, 145, 0.4)'}; `]"
    >
      <p class="px-[0.44rem] py-[0.19rem]">
        {{ title }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  bgColor?: string;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>

<style scoped lang="css">
.bg-tag {
  display: inline-block;
  color: #ffffff;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 0.9375rem;
  border-radius: 1.97919rem;
}
</style>
