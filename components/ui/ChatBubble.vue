<template>
  <UiTag
    v-if="showGroupDate"
    :title="getGroupDate()"
    bg-color="rgba(114, 131, 145, 1)"
    class="sticky top-0 z-10 mb-[1rem]"
    @click="() => (showCalendar = !showCalendar)"
  />
  <VanCalendar
    v-model:show="showCalendar"
    :value="date"
    :max-date="new Date()"
    :min-date="new Date(2024, 0, 1)"
    :style="{
      position: 'absolute',
    }"
    :show-confirm="false"
    @select="(d) => onDateClick(d)"
  />
  <div v-bind="$attrs" class="relative inline-flex flex-col justify-end">
    <div v-if="type !== ChatType.Action">
      <div
        :class="[
          'flex w-full items-end',
          chatType === 'incoming' ? 'justify-start' : 'justify-end',
        ]"
      >
        <div class="inline-flex items-end">
          <UiGradientProfile
            v-if="(showProfile || profile) && chatType === 'incoming'"
            :image-source="profile"
            :name="name"
            size="2.375rem"
          />
          <Icon
            v-if="chatType === 'incoming'"
            name="ChatTail"
            color="#ffff"
            size="10"
          />
        </div>
        <div
          :class="[
            'flex w-3/4 items-center ',
            chatType === 'incoming' ? '' : 'flex-row-reverse',
          ]"
        >
          <div
            :class="[
              chatType === 'incoming' ? 'incoming-layout' : 'outgoing-layout',
              {
                'flash-outgoing': chatType === 'outgoing' ? isSelected : false,
                'flash-incoming': chatType === 'incoming' ? isSelected : false,
              },
            ]"
          >
            <div class="flex flex-col gap-y-[0.75rem] p-[0.76rem]">
              <ChatReply
                v-if="chat?.reply_message"
                :chat="chat"
                @header-click="(id) => emit('header-reply', id)"
              />
              <div v-if="chatType === 'incoming'">
                <p
                  class="incoming-name"
                  :style="{ color: generateColorForName(name) }"
                >
                  {{
                    name +
                    ` ${
                      chat?.user_id === detail?.owner_id
                        ? " (" + $t("owner") + ")"
                        : ""
                    }`
                  }}
                </p>
              </div>
              <div
                :class="[
                  chatType === 'incoming'
                    ? 'incoming-content'
                    : 'outgoing-content',
                  {
                    'flash-incoming':
                      chatType === 'incoming' ? isSelected : false,
                  },
                ]"
              >
                <div
                  v-if="type === ChatType.Text"
                  class="w-full whitespace-normal break-words text-start"
                  @touchstart="onTouch(text)"
                >
                  <NuxtLink v-if="isUrl(text)" :to="text" class="underline">
                    {{ text }}
                  </NuxtLink>
                  <p v-else>
                    {{ text }}
                  </p>
                </div>
                <UiImg
                  v-else-if="type === ChatType.Image"
                  width="200"
                  height="400"
                  provider="s3"
                  :src="text"
                  class="mt-2 rounded-lg"
                  @click="onPreview(text)"
                />
                <video
                  v-else-if="type === ChatType.Video"
                  class="max-h-[400] max-w-[200] rounded-sm pt-2"
                  controls
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
          <div class="px-2" @click="emit('reply')">
            <Icon name="Reply" color="#6C808C" size="16" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col gap-[1rem]">
      <UiTag :title="getChatEvent(text, name)" />

      <template v-if="text === CHAT_ACTIONS.ORDER_UPDATED">
        <ChatSystem v-if="order && detail" :timestamp="timestamp" :text="text">
          <ChatOrderCreated :order="order" :detail="detail" />
        </ChatSystem>
        <UiTag class="mt-3" :title="$t(text)" />
      </template>

      <div v-if="text === CHAT_ACTIONS.ORDER_SUCCESS">
        <div class="flex flex-col gap-2">
          <ChatSystem :timestamp="timestamp" :text="text">
            <ChatOrderCreated v-if="detail" :order="order" :detail="detail" />
          </ChatSystem>
          <div class="ml-[48px] mr-[35px] w-[80%]">
            <UiButtonLink
              v-if="isSeller(order?.seller_id ?? 0)"
              :title="$t('one_more_order')"
              @click="emit('resale-order')"
            />
            <UiButtonLink
              v-else-if="detail && showRate"
              :title="$t('evaluate')"
              @click="emit('evaluate-order', detail)"
            />
          </div>
        </div>
      </div>

      <ChatSystem
        v-if="order && text === CHAT_ACTIONS.NEW_ORDER_CREATED && detail"
        :timestamp="timestamp"
        :text="text"
      >
        <ChatOrderCreated :order="order" :detail="detail" />
      </ChatSystem>

      <ChatSystem
        v-if="text === CHAT_ACTIONS.NEW_TICKET_CREATED"
        :timestamp="timestamp"
        class="whitespace-pre-wrap"
        :text="text"
      >
        <p>
          {{ $t("manual_cs_is_being_assigned") }}
        </p>

        <p>
          {{ $t("during_the_waiting_period") }}
        </p>
      </ChatSystem>

      <div
        v-if="showButton"
        :class="[
          'ml-[10px] mt-[0.3125rem] inline-flex w-[90%] justify-end gap-[0.3125rem]',
          showProfile ? 'max-w-[90%] pl-10' : 'max-w-[90%]',
        ]"
      >
        <UiButtonLink :title="$t('reject')" @click="onReject" />
        <UiButtonLink :title="$t('confirm')" @click="onConfirm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showConfirmDialog, showDialog, showImagePreview } from "vant";
import { CHAT_ACTIONS } from "~/constants/chat-actions";
import { ChatType, type ChatDetail, type Chat } from "~/types/chat";
import { type Order } from "~/types/order";

const props = defineProps<{
  chatType: "incoming" | "outgoing";
  type: ChatType;
  text: string;
  timestamp: string;
  name: string;
  chat?: Chat;
  profile?: string;
  showProfile?: boolean;
  showButton?: boolean;
  detail?: ChatDetail;
  showRate?: boolean;
  order?: Order;
  isSelected?: boolean;
  showGroupDate?: boolean;
  groupDate?: string;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "reply"): void;
  (e: "cancel-reply"): void;
  (e: "reject"): void;
  (e: "header-reply", id: number): void;
  (e: "evaluate-order", detail: ChatDetail): void;
  (e: "resale-order"): void;
  (e: "touch-start-message", value: string): void;
  (e: "date-click", date?: string): void;
}>();

const getGroupDate = () => {
  const today = formatDate(new Date().toDateString(), "DD MMM");
  const _groupDate = formatDate(props.groupDate, "DD MMM");
  if (today === _groupDate) return "今天";
  return _groupDate;
};

const { t } = useI18n();
const showCalendar = ref(false);
const date = ref("");

function onConfirm() {
  if (props.showButton) {
    showConfirmDialog({
      title: t("confirm"),
      message: t("confirm_sending"),
      showCancelButton: true,
      cancelButtonText: t("cancel"),
    })
      .then(() => {
        emit("confirm");
      })
      .catch(() => {});
  }
}

function onReject() {
  if (props.showButton) {
    showDialog({
      title: t("reject"),
      message: t("reject_sending"),
      showCancelButton: true,
      cancelButtonText: t("cancel"),
    })
      .then(() => {
        emit("reject");
      })
      .catch(() => {});
  }
}

function onPreview(v: string) {
  showImagePreview({
    images: [getS3Url(v)],
    closeable: true,
  });
}

function onTouch(text: string) {
  emit("touch-start-message", text);
}

function onDateClick(date: string | undefined) {
  showCalendar.value = false;
  const d = date ? new Date(date).toISOString().split("T")[0] : "";
  emit("date-click", d);
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

@keyframes flashBackground {
  0% {
    background-color: #d8eeff;
  }
  50% {
    background-color: #d8eeff;
  }
  100% {
    background-color: #50a7ea;
  }
}

@keyframes flashBackgroundIncoming {
  0% {
    background-color: #d8eeff;
    color: white;
  }
  50% {
    background-color: #d8eeff;
    color: white;
  }
  100% {
    background-color: white;
    color: #d8eeff;
  }
}

.flash-outgoing {
  animation: flashBackground 1.5s linear;
}

.flash-incoming {
  animation: flashBackgroundIncoming 1.5s linear;
}
</style>
