<template>
  <div
    :class="[
      'flex items-center justify-between px-2 py-1',
      replying ? 'replying-layout' : 'layout',
    ]"
    @click="
      () => {
        if (replying) return;

        emits('on-header-click', chat?.reply_message?.id || 0);
      }
    "
  >
    <div>
      <div v-if="chat?.reply_message">
        <p class="text-[12px] font-bold">
          {{
            chat?.reply_message.user?.name ||
            chat?.reply_message.user_id ||
            chat?.reply_message.admin?.name ||
            chat?.reply_message.admin_id
          }}
        </p>
        <p class="text-[12px]">
          {{ chat?.reply_message?.message }}
        </p>
      </div>
      <div v-else>
        <p class="text-[12px] font-bold">
          回复 {{ chat?.user?.name || chat?.admin?.name }}
        </p>
        <p class="text-[12px]">
          {{ chat?.message }}
        </p>
      </div>
    </div>
    <div v-if="replying">
      <VanIcon name="cross" color="#50a7ea" @click="emits('cancel')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Chat } from "~/types/chat";

defineProps<{
  chat?: Chat;
  chatType?: "incoming" | "outgoing";
  replying?: boolean;
}>();

const emits = defineEmits<{
  (e: "cancel"): void;
  (e: "on-header-click", id: number): void;
}>();
</script>

<style scoped>
.replying-layout {
  border-left: 4px solid #50a7ea;
  border-radius: 4px 0px 0px 4px;
  background-color: rgba(255, 255, 255, 0.2);
}

.layout {
  border-left: 4px solid white;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  padding-left: 4px;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
