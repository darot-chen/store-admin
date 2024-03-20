<template>
  <div v-bind="$attrs">
    <svg
      v-if="type === 'horizontal'"
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      viewBox="0 0 326 1"
      fill="none"
    >
      <path
        d="M0 0.25H326"
        :stroke="color"
        stroke-opacity="0.1"
        :stroke-width="thickness"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="2"
      viewBox="0 0 2 37"
      fill="none"
      :height="height"
    >
      <path
        d="M1 0.25V36.25"
        stroke-width="0.5"
        :stroke="color ?? 'url(#paint0_linear_3902_108297)'"
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
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "horizontal" | "vertical";
    height?: string;
    width?: string;
    color?: string;
    thickness?: string;
  }>(),
  {
    width: undefined,
    height: undefined,
    type: "horizontal",
    color: undefined,
    thickness: "0.5",
  }
);
</script>
