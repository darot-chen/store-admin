<template>
  <button
    :class="[
      'inline-flex w-full items-center justify-center gap-[0.44rem] rounded-[0.5rem]',
      type === 'secondary'
        ? 'bg-[#D8EEFF]'
        : disabled
          ? 'bg-[#f5f5f5]'
          : 'bg-[#50A7EA]',
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <Icon
      v-if="icon"
      :name="icon"
      :color="type === 'secondary' ? '#50A7EA' : '#fff'"
      size="18"
    />
    <p
      :class="[
        'semi-bold',
        type === 'secondary'
          ? 'text-[#50A7EA]'
          : disabled
            ? 'text-[#8f8f8f]'
            : 'text-[#fff]',
      ]"
    >
      {{ title }}
    </p>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon?: string;
  type?: "primary" | "secondary";
  disabled?: boolean;
}>();

defineEmits<{
  click: [];
}>();
</script>
