<template>
  <div>
    <div
      class="flex max-h-[100vh] flex-col gap-y-[10px] overflow-scroll"
      @scroll="handleScroll"
    >
      <div
        v-for="room in chatRooms"
        :key="room.id"
        class="flex max-h-[200px] cursor-pointer justify-between rounded-md bg-slate-400 p-5"
        @click="navigateTo(`/mini/chat/${room.id}`)"
      >
        <div class="flex gap-x-[10px]">
          <img
            class="h-[50px] w-[50px] rounded"
            src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
            alt=""
          />
          <div class="flex flex-col">
            <span class="text-sm">{{ userStore.username }}</span>
            <span class="text-sm">Hi</span>
          </div>
        </div>
        <div>
          <span>10:00pm</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useUserStore from "~/stores/userStore";
import { API_CHAT_ROOM } from "~/api/apiChatRoom";
import { ChatRoom } from "~/types/chatRoom";

definePageMeta({
  layout: "room",
  title: "home",
  keepalive: true,
});
const route = useRoute();
const userStore = useUserStore();

const chatRooms = ref<ChatRoom[]>([]);
const lastItemId = ref<number>(0);
const loadMore = ref<boolean>(true);
onMounted(() => {
  const at = route.query.at?.toString();
  let token: string | null | undefined;
  if (at) {
    token = atob(at);
    setToken(token);
  } else {
    token = getToken();
  }
  setTimeout(() => {
    if (token) {
      userStore.me();
    }
  }, 1000);
});

const fetchChatRooms = async () => {
  const { data } = await API_CHAT_ROOM.GET_PUBLIC_ROOM.execute({
    last: lastItemId.value,
    limit: 10,
  });

  if (data.value?.results?.length) {
    chatRooms.value.push(...data.value.results);
    lastItemId.value = data.value.results[data.value.results.length - 1].id;
    loadMore.value = data.value.meta.has_next;
  }
};

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement; // Type casting to HTMLElement
  const { scrollTop, clientHeight, scrollHeight } = target;

  setTimeout(() => {
    if (scrollTop + clientHeight >= scrollHeight) {
      if (loadMore.value) {
        fetchChatRooms();
      }
    }
  }, 300);
};

watch(userStore, () => {
  if (userStore.username) {
    fetchChatRooms();
  }
});

// const chats = ref([
//   {
//     id: 1,
//     content:
//       "需方已接受交易条款，订单：BS000001已进入担保系统。如果在担保过程中需要帮助，请联系客服。",
//     type: "text",
//     from: 1,
//     to: 2,
//   },
//   {
//     id: 2,
//     content: "+19999",
//     type: "text",
//     from: 1,
//     to: 2,
//   },
//   {
//     id: 3,
//     content: "打到我这个卡号 \n 陈志伟 中国银行 \n 000 000000 00684",
//     type: "text",
//     from: 2,
//     to: 1,
//   },
//   {
//     id: 4,
//     content:
//       "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
//     type: "image",
//     from: 1,
//     to: 2,
//   },
//   {
//     id: 5,
//     content: "继续打",
//     type: "text",
//     from: 2,
//     to: 1,
//   },
//   {
//     id: 6,
//     content:
//       "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
//     type: "image",
//     from: 2,
//     to: 1,
//   },
//   {
//     id: 7,
//     content:
//       "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
//     type: "image",
//     from: 1,
//     to: 2,
//   },
// ]);
</script>
