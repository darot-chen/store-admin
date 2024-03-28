<template>
  <div class="flex w-full items-end justify-start">
    <div class="inline-flex items-end">
      <div class="bg-avatar">
        <UiImg class="w-[2.375rem] rounded-full" src="bs-logo.png" />
      </div>
      <Icon name="ChatTail" color="#ffff" size="10" />
      <div class="layout">
        <div class="flex flex-col gap-y-[0.75rem] p-[0.38rem]">
          <p class="name px-[0.38rem]">{{ $t("baishun") }}</p>
          <div class="content px-[0.38rem]">
            <slot />
          </div>
          <p class="timestamp">{{ formatDate(timestamp) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
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
