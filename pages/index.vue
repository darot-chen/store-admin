<template>
  <div class="flex h-full flex-col gap-5 px-2" w>
    <NuxtLink to="/room">
      <div
        class="rounded bg-[#50a7ea] p-2 text-center font-bold text-[#0d2744] shadow-md hover:bg-[#87c1f2] focus:bg-[#87c1f2]"
      >
        {{ $t("go_to_room") }}
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "home",
});
</script>
