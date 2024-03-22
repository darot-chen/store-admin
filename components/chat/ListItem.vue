<template>
  <div class="bg-white">
    <NuxtLink
      class="flex max-h-[75px] cursor-pointer flex-col justify-between rounded-md border-b p-2"
      :to="`/room/chat/${room.id}`"
    >
      <div class="flex gap-2">
        <div
          class="flex h-12 w-full max-w-12 items-center justify-center rounded-full"
          :style="{
            background: generateLinearGradient(room.business.title, room.id),
          }"
        >
          <p class="text-lg font-bold text-[#fff]">
            {{ room.business.title?.charAt(0).toUpperCase() || "" }}
          </p>
        </div>

        <div class="flex flex-1 flex-col">
          <div>
            <h1 class="font-medium">
              {{ room.business.title }}
              <span v-if="room.lobby_no">
                {{ $t("lobby_no") }} {{ room.lobby_no }}
              </span>
            </h1>
            <ChatEvent
              v-if="room.latest_message?.type === ChatType.Action"
              class="line-clamp-1 text-sm text-[#8E8E93]"
              :text="room.latest_message.message"
              :name="
                room.latest_message.user?.name ||
                room.latest_message.admin?.name
              "
            />
            <p v-else class="line-clamp-1 text-sm text-[#8E8E93]">
              {{ room?.latest_message?.message || "" }}
            </p>
          </div>
        </div>

        <div class="ml-auto flex flex-col items-end justify-between">
          <div class="inline-flex gap-1.5">
            <!-- <Icon name="DoubleCheck" color="#21C004" /> -->
            <p class="text-sm text-[#8E8E93]">
              {{
                formatChatListDate(
                  room?.latest_message?.created_at ?? room?.created_at
                )
              }}
            </p>
          </div>

          <div
            v-show="room.total_unread > 0"
            class="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#037EE5] px-1 text-xs font-semibold text-white"
          >
            <p>
              {{ room.total_unread }}
            </p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import { ChatType } from "~/types/chat";
import type { ChatRoom } from "~/types/chatRoom";

defineProps<{
  room: ChatRoom;
}>();
</script>
