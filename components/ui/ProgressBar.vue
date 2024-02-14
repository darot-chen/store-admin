<template>
  <div class="w-10">
    <svg viewBox="0 0 36 36" class="circular-chart">
      <path
        d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#B1DDFF"
        stroke-width="1.5"
      />

      <path
        stroke="#50A7EA"
        :stroke-dasharray="`${progress}, 100`"
        d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke-width="2.8"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  progress: number;
}>();
</script>
