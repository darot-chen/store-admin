<template>
  <div class="relative w-full">
    <div
      class="absolute right-1/2 top-1/2 flex -translate-y-1/2 translate-x-1/2 gap-2"
    >
      <img src="/svg/search.svg" alt="search" />
      <span class="whitespace-nowrap text-[#3C3C4399]">
        {{ $t("chat_search_place_holder") }}
      </span>
    </div>
    <input
      type="text"
      class="relative z-20 w-full rounded-lg bg-[#7676801F] p-2 placeholder:text-center"
      placeholder=""
    />
  </div>
</template>
<script setup lang="ts"></script>
