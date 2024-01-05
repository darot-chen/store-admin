<template>
  <div>
    <div class="absolute bottom-0 top-0 z-0">
      <img class="opacity-5" src="/img/chat-bg.jpeg" alt="" />
    </div>
    <div
      class="absolute bottom-0 top-[50px] z-10 w-full overflow-auto pb-[60px]"
    >
      <ChatTotalTransaction class="sticky top-0" />
      <ChatInput />
      <ChatMessage
        v-for="chat in chats"
        :key="chat.id"
        :is-sender="chat.from === 1"
        :content="chat.content"
        :type="chat.type"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import useUserStore from "~/stores/userStore";

definePageMeta({
  layout: "chat",
  title: "home",
  keepalive: true,
});
const route = useRoute();
const userStore = useUserStore();
onMounted(() => {
  const at = route.query.at?.toString();
  if (!at) return;
  const token = atob(at);
  setToken(token);
  setTimeout(() => {
    userStore.me();
  }, 1000);
});

const chats = ref([
  {
    id: 1,
    content:
      "需方已接受交易条款，订单：BS000001已进入担保系统。如果在担保过程中需要帮助，请联系客服。",
    type: "text",
    from: 1,
    to: 2,
  },
  {
    id: 2,
    content: "+19999",
    type: "text",
    from: 1,
    to: 2,
  },
  {
    id: 3,
    content: "打到我这个卡号 \n 陈志伟 中国银行 \n 000 000000 00684",
    type: "text",
    from: 2,
    to: 1,
  },
  {
    id: 4,
    content:
      "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
    type: "image",
    from: 1,
    to: 2,
  },
  {
    id: 5,
    content: "继续打",
    type: "text",
    from: 2,
    to: 1,
  },
  {
    id: 6,
    content:
      "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
    type: "image",
    from: 2,
    to: 1,
  },
  {
    id: 7,
    content:
      "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
    type: "image",
    from: 1,
    to: 2,
  },
]);
</script>
