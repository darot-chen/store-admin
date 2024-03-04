<template>
  <div class="bg-white">
    <NuxtLink
      class="flex max-h-[75px] cursor-pointer flex-col justify-between rounded-md border-b p-2"
      :to="`/room/chat/${room.id}`"
    >
      <div class="flex gap-2">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F2F7]"
        >
          <span class="text-lg font-medium text-[#8E8E93]">
            {{ room.owner.name.charAt(0) }}
          </span>
        </div>

        <div class="flex flex-col">
          <div>
            <h1 class="font-medium">
              {{ room.business.title }}
              <span v-if="room.lobby_no">
                {{ $t("lobby_no") }} {{ room.lobby_no }}
              </span>
            </h1>
            <p class="line-clamp-3 text-sm text-[#8E8E93]">
              {{ room?.latest_message?.message || "" }}
            </p>
          </div>
        </div>

        <div class="ml-auto flex flex-col items-end justify-between">
          <div class="flex gap-1.5">
            <!-- <Icon name="DoubleCheck" color="#21C004" /> -->
            <span class="text-sm text-[#8E8E93]">
              {{
                formatChatListDate(
                  room?.latest_message?.created_at ?? room?.created_at
                )
              }}
            </span>
          </div>

          <!-- <div class="mb-1">
            <span
              class="rounded-full bg-[#037EE5] px-1 py-0.5 text-sm text-white"
            >
              {{ 7 }}
            </span>
          </div> -->
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import type { ChatRoom } from "~/types/chatRoom";

defineProps<{
  room: ChatRoom;
}>();
</script>
