<template>
  <div
    v-if="type !== ChatType.Action"
    :class="['inline-flex flex-col justify-end']"
  >
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
          chatType === 'incoming' ? 'incoming-layout' : 'outgoing-layout',
          {
            'flash-outgoing': chatType === 'outgoing' ? isSelected : false,
            'flash-incoming': chatType === 'incoming' ? isSelected : false,
          },
        ]"
      >
        <div class="flex flex-col gap-y-[0.75rem] p-[0.38rem]">
          <ChatReply v-if="chat?.reply_message" :chat="chat" />
          <p
            v-if="chatType === 'incoming'"
            class="incoming-name px-[0.38rem]"
            :style="{ color: generateColorForName(name) }"
          >
            {{ name }}
          </p>
          <div
            :class="[
              'px-[0.38rem]',
              chatType === 'incoming' ? 'incoming-content' : 'outgoing-content',
              {
                'flash-incoming': chatType === 'incoming' ? isSelected : false,
              },
            ]"
          >
            <p v-if="type === ChatType.Text" class="whitespace-pre-wrap">
              {{ text }}
            </p>
            <NuxtImg
              v-else-if="type === ChatType.Image"
              :placeholder="[200, 20]"
              width="200"
              height="400"
              provider="s3"
              :src="text"
              class="rounded-sm pt-2"
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
        <Icon name="Edit" color="#ffff" size="20" />
      </div>
    </div>
  </div>
  <div v-else>
    <UiTag
      v-if="text === CHAT_ACTIONS.JOIN"
      :title="
        $t('name_has_joined_the_chat', {
          name,
        })
      "
    />
    <UiTag
      v-if="text === CHAT_ACTIONS.SELLER_COMPLETE_ORDER"
      :title="$t('seller_complete_order')"
    />
    <UiTag
      v-if="text === CHAT_ACTIONS.BUYER_COMPLETE_ORDER"
      :title="$t('buyer_complete_order')"
    />
    <UiTag
      v-if="text === CHAT_ACTIONS.ORDER_SUCCESS"
      :title="$t('order_success')"
    />
    <UiTag
      v-if="text === CHAT_ACTIONS.BUYER_CONFIRM_ORDER"
      :title="$t('buyer_confirm_order')"
    />
    <UiTag
      v-if="text === CHAT_ACTIONS.LEAVE"
      :title="
        $t('name_has_left_the_chat', {
          name,
        })
      "
    />

    <UiTag
      v-if="text === CHAT_ACTIONS.SELLER_CANCEL"
      :title="$t('seller_cancel_order')"
    />

    <UiTag
      v-if="text === CHAT_ACTIONS.BUYER_REJECT"
      :title="$t('buyer_reject_order')"
    />

    <template v-if="text === CHAT_ACTIONS.ORDER_UPDATED">
      <ChatSystem v-if="order && detail" :timestamp="timestamp" :text="text">
        <ChatOrderCreated :order="order" :detail="detail" />
      </ChatSystem>
      <UiTag class="mt-3" :title="$t('order_updated')" />
    </template>

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
        'mt-[0.3125rem] inline-flex w-full  justify-end gap-[0.3125rem]',
        showProfile ? 'max-w-[90%] pl-10' : 'max-w-[80%]',
      ]"
    >
      <UiButtonLink :title="$t('reject')" @click="onReject" />
      <UiButtonLink :title="$t('confirm')" @click="onConfirm" />
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
  order?: Order;
  isSelected?: boolean;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "reply"): void;
  (e: "cancel-reply"): void;
  (e: "reject"): void;
}>();

const { t } = useI18n();

function onConfirm() {
  if (props.showButton) {
    showConfirmDialog({
      title: t("confirm"),
      message: t("confirm_sending"),
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
    background-color: black;
  }
  50% {
    background-color: black;
  }
  100% {
    background-color: #50a7ea;
  }
}
@keyframes flashBackgroundIncoming {
  0% {
    background-color: black;
    color: white;
  }
  50% {
    background-color: black;
    color: white;
  }
  100% {
    background-color: white;
    color: black;
  }
}

.flash-outgoing {
  animation: flashBackground 1.5s linear;
}

.flash-incoming {
  animation: flashBackgroundIncoming 1.5s linear;
}
</style>
