<template>
  <div
    v-if="type !== ChatType.Action"
    class="mx-1 inline-flex flex-col justify-end"
  >
    <div
      :class="[
        'flex w-full items-end',
        chatType === 'incoming' ? 'justify-start' : 'justify-end',
      ]"
    >
      <div class="inline-flex items-end">
        <div
          v-if="(showProfile || profile) && chatType === 'incoming'"
          :class="!profile && 'bg-avatar'"
          :style="{
            backgroundColor: generateColor(name),
          }"
        >
          <img
            v-if="profile"
            class="w-[2.375rem] rounded-full"
            src="/images/bs-logo.png"
          />
          <p v-else>{{ name.charAt(0) }}</p>
        </div>
        <Icon
          v-if="chatType === 'incoming'"
          name="ChatTail"
          color="#ffff"
          size="10"
        />
      </div>
      <div
        :class="[
          chatType === 'incoming' ? 'incoming-layout' : 'outgoing-layout',
        ]"
      >
        <div class="flex flex-col gap-y-[0.75rem] p-[0.38rem]">
          <p
            v-if="chatType === 'incoming'"
            class="incoming-name px-[0.38rem]"
            :style="{ color: generateColor(name) }"
          >
            {{ name }}
          </p>
          <div
            :class="[
              'px-[0.38rem]',
              chatType === 'incoming' ? 'incoming-content' : 'outgoing-content',
            ]"
          >
            <p
              v-if="type === ChatType.Text"
              class="whitespace-pre-wrap break-all"
            >
              {{ text }}
            </p>
            <NuxtImg
              v-else-if="type === ChatType.Image"
              :placeholder="[200, 20]"
              width="200"
              height="400"
              provider="s3"
              :src="text"
              @click="onPreview(text, 'image')"
            />
            <video
              v-else-if="type === ChatType.Video"
              style="max-width: 200px; max-height: 400px"
              controls
              @play="onPreview(text, 'video')"
            >
              <source :src="getS3Url(text)" />
            </video>
          </div>
          <p
            :class="[
              chatType === 'incoming'
                ? 'incoming-timestamp'
                : 'outgoing-timestamp',
            ]"
          >
            {{ formatDate(timestamp) }}
          </p>
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
  <div v-else>
    <UiTag :title="`${name} ${$t('has_joined_the_chat')}`" />
  </div>

  <VanImagePreview
    v-model:show="showPreview"
    :images="images"
    :close-on-click-image="false"
    closeable
  >
    <template #image="{ src }">
      <video class="mx-auto h-full w-full px-4" controls>
        <source :src="src" />
      </video>
    </template>
  </VanImagePreview>
</template>

<script setup lang="ts">
import { showDialog, showImagePreview } from "vant";
import { ChatType } from "~/types/chat";

const showPreview = ref(false);
const images = ref<string[]>([]);

defineProps<{
  chatType: "incoming" | "outgoing";
  type: ChatType;
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
  }).then(() => {});
}

function onCancel() {
  showDialog({
    title: "发送成功",
    message: "等待对方点击确认。",
  }).then(() => {});
}

function onPreview(v: string, type: "image" | "video") {
  if (type === "image") {
    showImagePreview({
      images: [getS3Url(v)],
      closeable: true,
    });
  } else if (type === "video") {
    showPreview.value = true;
    images.value = [getS3Url(v)];
  }
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
