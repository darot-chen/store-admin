<template>
  <div class="bg-home flex h-full flex-col gap-4 px-4">
    <div class="inline-flex items-center justify-between pt-8">
      <div class="inline-flex gap-[8px]">
        <UiGradientProfile
          v-if="user"
          :src="user.profile_key"
          :name="user.name"
          size="28px"
        />
        <p>{{ user?.name }}</p>
      </div>
      <UiImg class="rounded-full" src="bs-logo.png" width="24" height="24" />
    </div>
    <UiCarousel />
    <HomeCard />
    <HomeFaq />
    <HomeGroup />
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/types/user";

const user = ref<User>();

definePageMeta({
  title: "home",
});

onMounted(() => {
  user.value = useAuthStore().user;
});
</script>

<style scoped>
.bg-home {
  background-image: url("/images/backgrounds/home.png");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
