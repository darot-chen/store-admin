<template>
  <div
    class="fulls-screen safe-area-padding-bottom mx-auto flex max-w-lg flex-col"
  >
    <slot name="header">
      <Head>
        <Title>{{ $t($route.meta.title || "") }}</Title>
      </Head>
    </slot>
    <main class="w-full bg-[#F5F8FE]" data-scroll>
      <slot />
    </main>
    <slot name="footer">
      <!-- <MFooter /> -->
    </slot>
  </div>
</template>
