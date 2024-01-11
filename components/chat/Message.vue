<template>
  <div v-if="type === 'action'">
    <div v-if="content === 'join'" class="relative flex items-center py-5">
      <div class="flex-grow border-t border-gray-400"></div>
      <span class="mx-4 flex-shrink text-gray-400">
        {{ user ? user.name : admin?.name }} {{ $t("joined_the_chat") }}
      </span>
      <div class="flex-grow border-t border-gray-400"></div>
    </div>

    <p v-if="content === 'leave'" class="text-center text-xs">
      {{ user ? user.name : admin?.name }} {{ $t("left_the_chat") }}
    </p>
  </div>
  <div v-else :class="['flex w-full', { 'justify-end': isSender }]">
    <div :class="['flex w-[85%]  gap-2 p-2', { 'flex-row-reverse': isSender }]">
      <div
        class="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600"
      >
        <span class="font-medium text-gray-400 dark:text-gray-300">{{
          user ? user.name[0] : admin!.name[0]
        }}</span>
      </div>
      <div
        class="rounded-2xl rounded-tl-sm p-[12px] shadow-[2px_2px_10px_0px_rgba(182,154,122,0.10)]"
        :class="
          isSender ? 'bg-[#FDF3E8]  text-[#FE863F]' : 'bg-white text-[#554F49]'
        "
      >
        <p v-if="!isSender" class="text-base font-bold">
          {{ user ? user.name : admin!.name }}
        </p>
        <p v-if="type === 'text'" class="text-base leading-[19px]">
          {{ content }}
        </p>
        <div v-if="type === 'image'">
          <img :src="content" alt="photo" />
        </div>
        <div v-if="type === 'video'">
          <video style="width: 125px; height: 200px" controls>
            <source :src="content" />
          </video>
        </div>
        <p class="ml-[1.4rem] mt-[6px] text-end text-xs">
          {{ formatDate(createdAt) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Admin } from "~/types/admin";
import { User } from "~/types/user";

defineProps<{
  isSender: boolean;
  content: string;
  type: string;
  user: User | null;
  admin: Admin | null;
  createdAt: string;
}>();
</script>
