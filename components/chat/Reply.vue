<template>
  <div class="flex items-center">
    <div v-if="replying" class="px-2">
      <Icon name="Replying" color="#6C808C" size="22" />
    </div>
    <div
      :class="[
        'flex w-full items-center justify-between px-2 py-1',
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
          <p :class="['text-[12px] font-bold']">
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
          <p
            :class="['text-[14px] font-bold', replying ? 'text-[#50a7ea]' : '']"
          >
            回复 {{ chat?.user?.name || chat?.admin?.name }}
          </p>
          <p class="text-[12px]">
            {{ chat?.message }}
          </p>
        </div>
      </div>
      <div v-if="replying">
        <VanIcon name="cross" color="#6C808C" @click="emits('cancel')" />
      </div>
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
  position: relative;
  background-color: rgba(255, 255, 255, 0.2);
}

.replying-layout::before {
  content: "";
  position: absolute;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: #50a7ea;
  @apply rounded;
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
