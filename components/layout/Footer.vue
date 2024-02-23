<template>
  <div
    class="flex h-[75px] w-full items-center justify-between border-t bg-[#FFFFFFBF] px-[42px]"
  >
    <NuxtLink
      v-for="item in FOOTER_ITEMS"
      :key="item.key"
      :to="item.link"
      class="flex flex-col items-center"
      active-class="text-blue-500"
    >
      <Icon
        :name="item.icon"
        color="#999999"
        :class="['h-6 w-6', { 'active-img': $route.path === item.link }]"
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
