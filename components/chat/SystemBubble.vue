<template>
  <div
    v-if="text === CHAT_ACTIONS.NEW_ORDER_CREATED"
    class="flex w-full items-end justify-start"
  >
    <div class="inline-flex items-end">
      <div class="bg-avatar">
        <img class="w-[2.375rem] rounded-full" src="/images/bs-logo.png" />
      </div>
      <Icon name="ChatTail" color="#ffff" size="10" />
      <div class="layout">
        <div class="flex flex-col gap-y-[0.75rem] p-[0.38rem]">
          <p class="name px-[0.38rem]">Baishun</p>
          <div class="content px-[0.38rem]">
            <div class="whitespace-pre-wrap">
              <p>
                {{
                  $t("order_message.business_name", {
                    name: detail?.business?.title,
                  })
                }}
              </p>
              <p>
                {{
                  $t("order_message.contact_person", {
                    name: detail?.business?.owner.name,
                  })
                }}
              </p>
              <p>
                {{
                  $t("order_message.exchange_rate", {
                    value: order?.exchange_rate || 0,
                  })
                }}
              </p>
              <p>
                {{
                  $t("order_message.rate", {
                    value: order?.handling_fee_percentage || 0,
                  })
                }}
              </p>
              <br />
              <p>
                {{
                  $t("order_message.total_amount_payable_by_the_demander", {
                    value: order?.amount_to_be_paid || 0,
                  })
                }}
              </p>
              <p>
                {{
                  $t("order_message.total_amount_payable_by_supplier", {
                    value: order?.quantity_to_be_given || 0,
                  })
                }}
              </p>
              <br />
              <p>{{ $t("order_message.received_without_any_problem") }}</p>
              <p>{{ $t("order_message.remaining_settled_in_a_few_days") }}</p>
              <p>{{ $t("order_message.settlement_end_date") }}</p>
              <p>{{ $t("order_message.acceptance_standard") }}</p>
              <p>{{ $t("order_message.kind_tips") }}</p>
            </div>
          </div>
          <p class="timestamp">{{ formatDate(timestamp) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CHAT_ACTIONS } from "~/constants/chat-actions";
import type { ChatDetail } from "~/types/chat";
import type { Order } from "~/types/order";

defineProps<{
  text: string;
  order?: Order;
  detail: ChatDetail;
  timestamp?: string;
}>();
</script>

<style scoped>
.layout {
  border-radius: 1.125rem 1.125rem 1.125rem 0rem;
  background: #fff;
  max-width: 80%;
}

.name {
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

.content {
  color: #000;
  text-align: left;
  font-size: 0.875rem;
  font-style: normal;
  line-height: 1.1875rem;
}

.timestamp {
  color: #8e8e93;
  font-size: 0.6875rem;
  font-style: italic;
  text-align: right;
  display: inline-block;
  align-items: center;
  width: 100%;
}
</style>
