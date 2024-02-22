<template>
  <svg
    v-if="type === 'horizontal'"
    xmlns="http://www.w3.org/2000/svg"
    width="326"
    height="1"
    viewBox="0 0 326 1"
    fill="none"
  >
    <path
      d="M0 0.25H326"
      stroke="black"
      stroke-opacity="0.1"
      stroke-width="0.5"
    />
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    width="2"
    height="37"
    viewBox="0 0 2 37"
    fill="none"
  >
    <path
      d="M1 0.25V36.25"
      stroke="url(#paint0_linear_3902_108297)"
      stroke-width="0.5"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3902_108297"
        x1="1.5"
        y1="0.25"
        x2="1.5"
        y2="36.25"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFF8E1" stop-opacity="0" />
        <stop offset="0.48" stop-color="#FFF8E1" />
        <stop offset="1" stop-color="#FFF8E1" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  type?: "horizontal" | "vertical";
}>();
</script>
