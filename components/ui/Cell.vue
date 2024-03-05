<template>
  <div :class="['relative w-full bg-white', inset && 'rounded-xl']">
    <button
      v-for="(item, index) in cells"
      :key="index"
      :class="[
        'relative inline-flex w-full items-center px-[16px] py-[12px] transition-colors hover:bg-gray-200 active:bg-gray-300',
        index === 0 && 'text-border rounded-t-xl',
        index === cells.length - 1 && 'rounded-b-xl',
        index !== 0 && index !== cells.length - 1 && 'text-border',
      ]"
      :title="item.title"
      @click="item.onClick && item.onClick()"
    >
      <div class="inline-flex flex-1 items-center gap-[16px]">
        <div
          v-if="item?.icon"
          class="flex h-6 w-6 items-center justify-center rounded-md"
          :style="{ backgroundColor: item?.backgroundColor || '#F5F5F5' }"
        >
          <Icon
            :name="item.icon"
            :color="item?.iconColor || '#ffff'"
            size="16"
          />
        </div>

        <p class="text-[15px]">
          {{ item.title }}
        </p>
      </div>
      <Icon name="Caret" color="#B4B4B4" size="15" class="-rotate-90" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Cell } from "~/types/common";

defineProps<{
  inset?: boolean;
  cells: Cell[];
}>();
</script>

<style scoped lang="css">
.transition-colors {
  transition: background-color 0.3s ease;
}

.text-border::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 85%;
  border: #dedede solid 0.5px;
}
</style>
