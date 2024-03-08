<template>
  <div class="relative w-full">
    <div
      class="absolute right-1/2 top-1/2 flex -translate-y-1/2 translate-x-1/2 items-center gap-2"
    >
      <Icon name="Edit" color="#037EE5" />
      <span class="whitespace-nowrap text-[#3C3C4399]">
        {{ $t("chat_search_place_holder") }}
      </span>
    </div>
    <input
      class="relative z-20 w-full rounded-lg bg-[#7676801F] p-2 placeholder:text-center"
      type="button"
      @click="navigateTo('/room/search')"
    />
  </div>
</template>
