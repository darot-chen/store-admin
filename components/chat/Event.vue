<template>
  <div v-bind="$attrs">
    <p v-if="text === CHAT_ACTIONS.JOIN">
      {{
        $t("name_has_joined_the_chat", {
          name,
        })
      }}
    </p>

    <p v-if="text === CHAT_ACTIONS.SELLER_COMPLETE_ORDER" v>
      {{ $t("seller_complete_order") }}
    </p>

    <p v-if="text === CHAT_ACTIONS.ORDER_SUCCESS">
      {{ $t("order_success") }}
    </p>

    <p v-if="text === CHAT_ACTIONS.BUYER_CONFIRM_ORDER">
      {{ $t("buyer_confirm_order") }}
    </p>

    <p v-if="text === CHAT_ACTIONS.LEAVE">
      {{
        $t("name_has_left_the_chat", {
          name,
        })
      }}
    </p>

    <p v-if="text === CHAT_ACTIONS.NEW_ORDER_CREATED">
      {{ $t("new_order_create") }}
    </p>

    <p v-if="text === CHAT_ACTIONS.NEW_TICKET_CREATED">
      {{ $t("new_ticket_created") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { CHAT_ACTIONS } from "~/constants/chat-actions";

defineProps<{
  text: string;
  name?: string;
}>();
</script>
