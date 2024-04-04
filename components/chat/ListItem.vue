<template>
  <VanSwipeCell>
    <NuxtLink
      :class="[
        'flex max-h-[75px] cursor-pointer flex-col justify-between rounded-md border-b p-2',
        room.pin_at ? 'bg-[#F5F5F5]' : 'bg-white',
      ]"
      :to="`/room/chat/${room.id}`"
    >
      <div class="flex gap-2">
        <UiGradientProfile
          :name="room.business.title?.charAt(0).toUpperCase() || ''"
          size="48px"
          class="flex-none"
        />
        <div class="line-clamp-1 flex max-w-[50%] flex-1 flex-col break-all">
          <h1 class="line-clamp-1 font-medium">
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
              room.latest_message.user?.name || room.latest_message.admin?.name
            "
          />
          <p
            v-else-if="
              room.latest_message?.type === ChatType.Image ||
              room.latest_message?.type === ChatType.Video
            "
            class="line-clamp-1 text-sm text-[#8E8E93]"
          >
            {{ $t("send_an_attachment") }}
          </p>
          <p v-else class="line-clamp-1 text-sm text-[#8E8E93]">
            {{ room?.latest_message?.message || "" }}
          </p>
        </div>

        <div class="ml-auto flex flex-none flex-col items-end justify-between">
          <div class="inline-flex gap-1.5">
            <!-- <Icon name="DoubleCheck" color="#21C004" /> -->
            <p class="line-clamp-1 break-all text-sm text-[#8E8E93]">
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
    <template #right>
      <VanButton
        icon="delete"
        square
        :text="$t('delete')"
        type="danger"
        @click="emit('delete', room.id)"
      />
    </template>
    <template #left>
      <VanButton
        square
        :type="room.pin_at ? 'danger' : 'success'"
        @click="onTogglePin"
      >
        <template #icon>
          <Icon
            :name="room.pin_at ? 'tabler:pinned-off' : 'tabler:pin'"
            color="currentColor"
            size="20px"
          />
        </template>
      </VanButton>
    </template>
  </VanSwipeCell>
</template>

<script setup lang="ts">
import { ChatType } from "~/types/chat";
import type { ChatRoom } from "~/types/chatRoom";

const props = defineProps<{
  room: ChatRoom;
}>();

const emit = defineEmits<{
  (e: "delete", id: number): void;
  (e: "toggle-pin", id: number): void;
}>();

function onTogglePin() {
  emit("toggle-pin", props.room.id);
}
</script>

<style>
:root:root {
  --van-button-default-height: 100%;
}
</style>
