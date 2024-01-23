<template>
  <div>
    <UiButton :title="$t('go_to_room')" @click="navigateTo(`/room`)" />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  title: "home",
});
</script>
