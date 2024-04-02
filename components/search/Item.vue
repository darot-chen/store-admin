<template>
  <div class="bg-white">
    <NuxtLink
      v-if="props.type === 'message'"
      class="flex max-h-[75px] cursor-pointer flex-col justify-between border-b p-2"
      :to="`/room/chat/${message?.chat_room.id}?msgId=${message?.id}`"
    >
      <div v-if="props.message" class="flex gap-2">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full"
          :style="{
            background: generateLinearGradient(
              message?.chat_room.business?.title || '',
              message?.chat_room.id
            ),
          }"
        >
          <span class="text-lg font-bold text-[#fff]">
            {{
              message?.chat_room.business.title?.charAt(0).toUpperCase() || ""
            }}
          </span>
        </div>

        <div class="flex w-7/12 flex-col overflow-clip">
          <div>
            <h1 class="line-clamp-1 font-medium">
              {{ message?.chat_room.business.title }}
              <span v-if="message?.chat_room.lobby_no">
                {{ $t("lobby_no") }} {{ message.chat_room.lobby_no }}
              </span>
            </h1>
            <ChatEvent
              v-if="message?.type === ChatType.Action"
              class="line-clamp-1 text-sm text-[#8E8E93]"
              :text="message.message"
            />
            <p v-else class="line-clamp-1 text-ellipsis text-sm text-[#8E8E93]">
              {{ message?.message || "" }}
            </p>
          </div>
        </div>

        <div class="ml-auto flex flex-col items-end justify-between">
          <div class="flex gap-1.5">
            <span class="text-sm text-[#8E8E93]">
              {{ formatChatListDate(message?.created_at?.toString() || "") }}
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
    <NuxtLink
      v-else
      class="flex max-h-[75px] cursor-pointer flex-col justify-between border-b p-2"
      :to="`/room/chat/${room?.id}`"
    >
      <div class="flex gap-2">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full"
          :style="{
            background: generateLinearGradient(room?.title || '', room?.id),
          }"
        >
          <span class="text-lg font-bold text-[#fff]">
            {{ room?.title?.charAt(0).toUpperCase() || "U" }}
          </span>
        </div>

        <div class="flex items-center">
          <h1 class="font-medium">
            {{ room?.title }}
          </h1>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ChatType, type ChatMessage } from "~/types/chat";
import type { ChatRoom } from "~/types/chatRoom";

const props = defineProps<{
  room?: ChatRoom;
  message?: ChatMessage;
  type: "room" | "message";
}>();
</script>

<style scoped>
.van-divider {
  margin: 0;
}
</style>
