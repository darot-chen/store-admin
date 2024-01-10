<template>
  <div :class="['flex w-full', { 'justify-end': isSender }]">
    <div :class="['flex w-[85%]  gap-2 p-2', { 'flex-row-reverse': isSender }]">
      <img class="h-[33px] w-[33px]" src="/img/icons/chat-icon.svg" alt="" />
      <div
        class="rounded-2xl rounded-tl-sm p-[10px] shadow-[2px_2px_10px_0px_rgba(182,154,122,0.10)]"
        :class="
          isSender ? 'bg-[#FDF3E8]  text-[#FE863F]' : 'bg-white text-[#554F49]'
        "
      >
        <p v-if="type === 'text'" class="text-xs leading-[19px]">
          {{ content }}
        </p>
        <div v-if="type === 'image'">
          <img :src="`${content}`" alt="photo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isSender: boolean;
  content: string;
  type: string;
}>();
</script>
