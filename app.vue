<template>
  <NuxtLayout>
    <NuxtPage
      :page-key="(route: any) => route.path"
      :keepalive="$route.meta.keepalive"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { setLocale, getLocaleCookie, setLocaleCookie } = useI18n();
const local = getLocaleCookie();

setLocaleCookie(local || "zh");
setLocale(local || "zh");
</script>
