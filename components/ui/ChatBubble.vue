<template>
  <div
    :v-if="type === 'incoming'"
    class="relative inline-flex flex-col justify-end"
  >
    <div class="flex w-full items-end">
      <div class="inline-flex items-end">
        <div v-if="showProfile || profile" :class="!profile && 'bg-avatar'">
          <img
            v-if="profile"
            class="w-[2.375rem] rounded-full"
            src="/img/bs-logo.png"
          />
          <p v-else>{{ name.charAt(0) }}</p>
        </div>
        <img
          class="h-[0.625rem] w-[0.375rem]"
          src="/icons/chat-tail-incoming.svg"
          alt="mini-2"
        />
      </div>
      <div class="incoming-layout">
        <div class="flex flex-col gap-y-[0.75rem] p-[0.38rem]">
          <p class="incoming-name px-[0.38rem]">{{ name }}</p>
          <div class="incoming-content px-[0.38rem]">
            <p class="whitespace-pre-wrap break-all">{{ text }}</p>
          </div>
          <p class="incoming-timestamp">{{ timestamp }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="showButton"
      :class="[
        'mt-[0.3125rem] inline-flex w-full  justify-end gap-[0.3125rem]',
        showProfile ? 'max-w-[90%] pl-10' : 'max-w-[80%]',
      ]"
    >
      <UiButton title="取消" @click="onCancel" />
      <UiButton title="确认" @click="onConfirm" />
    </div>
  </div>
  <div
    :v-else-if="type === 'outgoing'"
    class="relative inline-flex flex-col justify-end"
  >
    <div class="flex w-full flex-row-reverse items-end">
      <div class="outgoing-layout">
        <div class="flex flex-col gap-y-[0.75rem] p-[0.38rem]">
          <div class="outgoing-content pb-[0.38rem] pt-[0.76rem]">
            <p class="whitespace-pre-wrap break-all">{{ text }}</p>
          </div>
          <p class="outgoing-timestamp">{{ timestamp }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showDialog } from "vant";

defineProps<{
  type: "incoming" | "outgoing";
  text: string;
  profile?: string;
  timestamp: string;
  name: string;
  showProfile?: boolean;
  showButton?: boolean;
}>();

function onConfirm() {
  showDialog({
    title: "发送成功",
    message: "等待对方点击确认。",
  }).then(() => {
    navigateTo("/mini-2/chat/1");
  });
}

function onCancel() {
  showDialog({
    title: "发送成功",
    message: "等待对方点击确认。",
  }).then(() => {
    navigateTo("/mini-2/chat/1");
  });
}
</script>

<style scoped>
.incoming-timestamp {
  color: #8e8e93;
  font-size: 0.6875rem;
  font-style: italic;
  text-align: right;
  display: inline-block;
  align-items: center;
  width: 100%;
}

.incoming-name {
  display: block;
  line-clamp: 1;
  overflow: hidden;
  color: #35c47c;
  padding-top: 0.75rem;
  leading-trim: both;
  text-edge: cap;
  text-overflow: ellipsis;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.125rem;
}

.incoming-layout {
  border-radius: 1.125rem 1.125rem 1.125rem 0rem;
  background: #fff;
  max-width: 80%;
}

.outgoing-timestamp {
  color: #d8eeff;
  font-size: 0.6875rem;
  font-style: italic;
  text-align: right;
  display: inline-block;
  align-items: center;
  width: 100%;
}

.outgoing-layout {
  border-radius: 1.125rem 1.125rem 0rem 1.125rem;
  background: #50a7ea;
  color: #fff;
  max-width: 80%;
}

.incoming-content {
  color: #000;
  text-align: left;
  font-size: 0.875rem;
  font-style: normal;
  line-height: 1.1875rem;
}

.outgoing-content {
  color: #fff;
  font-size: 0.875rem;
  text-align: right;
  font-style: normal;
  line-height: 1.1875rem;
}

.bg-avatar {
  background: linear-gradient(180deg, #a0da85 0%, #5bcc74 100%);
  width: 2.375rem;
  height: 2.375rem;
  border-radius: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  color: white;
}
</style>
