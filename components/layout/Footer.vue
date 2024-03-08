<template>
  <div
    class="flex w-full items-center justify-between border-t bg-[#FFFFFFBF] px-[42px] pb-[6px] pt-[7px]"
  >
    <NuxtLink
      v-for="item in FOOTER_ITEMS"
      :key="item.key"
      :to="item.link"
      class="flex cursor-pointer flex-col items-center px-[10px]"
      active-class="text-blue-500"
    >
      <Icon
        :name="item.icon"
        color="#999999"
        size="28"
        :class="[{ 'active-img': $route.path === item.link }]"
      />
      <p
        :class="[
          'text-sm text-[#999999]',
          { '!text-[#007AFF]': $route.path === item.link },
        ]"
      >
        {{ $t(item.label) }}
      </p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { FOOTER_ITEMS } from "~/constants/common";
</script>

<style>
.active-img {
  filter: invert(36%) sepia(41%) saturate(7251%) hue-rotate(200deg)
    brightness(103%) contrast(109%);
}
</style>
