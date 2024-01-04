<template>
  <div>
    <Head>
      <Title>{{ $t($route.meta.title || "") }}</Title>
    </Head>
    <div
      class="bg-white px-2 py-2"
      fixed
      style="max-width: 32rem; left: auto; z-index: 100"
    >
      <img class="h-8" src="/logo.png" alt="logo" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
