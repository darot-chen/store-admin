<template>
  <div class="flex flex-col items-center gap-[7px]">
    <img
      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987"
      :alt="user.name"
      class="h-20 w-20 rounded-full object-cover"
    />
    <div class="relative inline-flex items-center gap-[10px]">
      <h1 class="text-[20px] font-semibold text-[#010101]">
        {{ user.name }}
      </h1>
      <button class="absolute -right-7">
        <Icon name="EditProfile" color="#818086" size="15" />
      </button>
    </div>
    <div class="text-[#818086]">
      <p>
        {{ `ID : ${user.id} · +855 10 995 682` }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/types/user";

defineProps<{
  user: User;
}>();
</script>

<style scoped></style>
