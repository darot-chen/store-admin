<template>
  <div class="relative flex h-full flex-col">
    <!-- <div class="absolute mt-2 flex w-full">
      <UiTag title="21 January" />
    </div> -->
    <Chat2TradeControl :total="500000" order-number="BS0000001" />
    <div
      class="my-[0.18rem] flex h-full flex-col-reverse gap-[1rem] overflow-auto px-[0.5rem] py-[0.2rem]"
    >
      <UiChatBubble
        v-for="(m, i) in MESSAGES"
        :key="i"
        :name="m.name"
        :text="m.msg"
        :profile="m.profile"
        :timestamp="m.time"
        :show-profile="true"
        :show-button="m.action === 'event'"
        type="incoming"
      />
      <UiChatBubble
        v-for="(m, i) in MESSAGES"
        :key="i"
        :name="m.name"
        :text="m.msg"
        :profile="m.profile"
        :timestamp="m.time"
        :show-profile="true"
        :show-button="m.action === 'event'"
        type="outgoing"
      />
      <UiTag title="21 January" />
    </div>
    <Chat2Input />
  </div>
</template>

<script setup lang="ts">
import { MESSAGES } from "~/constants/messages";

definePageMeta({
  layout: "chat2",
  title: "公群 50002 房间 1",
});
</script>
