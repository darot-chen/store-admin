<template>
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
          name: detail?.business?.owner?.name,
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
          value: order?.quantity_to_be_given || 0,
        })
      }}
    </p>
    <p>
      {{
        $t("order_message.total_amount_payable_by_supplier", {
          value: order?.amount_to_be_paid || 0,
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
</template>

<script setup lang="ts">
import type { ChatDetail } from "~/types/chat";
import type { Order } from "~/types/order";

defineProps<{
  order?: Order;
  detail: ChatDetail;
}>();
</script>
