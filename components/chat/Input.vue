<template>
  <div
    class="fixed bottom-0 left-0 right-0 border-t-[1px] border-[#D7DBEE] bg-[#F5F8FE] p-3"
  >
    <div class="flex gap-2">
      <button
        class="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white shadow-[0px_2px_4px_0px_rgba(177,171,167,0.15)]"
      >
        <img src="img/icons/plus.svg" alt="add" />
      </button>
      <div class="relative flex-1">
        <input
          class="h-full w-full break-all rounded-[20px] pl-3 pr-10 shadow-[0px_2px_4px_0px_rgba(177,171,167,0.15)]"
          type="text"
        />
        <img
          class="absolute bottom-0 right-2 top-0 m-auto"
          src="img/icons/send.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
