<template>
  <div class="bg-white">
    <div class="input-container">
      <div class="inline-flex items-center gap-[0.5rem]">
        <button class="menu-btn">
          <img
            class="h-[1.25rem] w-[1.25rem]"
            src="/icons/hamburger.svg"
            alt="menu"
          />
          <p>Menu</p>
        </button>
        <button>
          <img
            class="h-[1.6875rem] w-[1.6875rem]"
            src="/icons/smiley.svg"
            alt="emoji"
          />
        </button>
      </div>
      <div>
        <input class="input" placeholder="Message" />
      </div>
      <div class="inline-flex items-center justify-end gap-[1.12rem]">
        <button>
          <img
            class="h-[1.6875rem] w-[1.6875rem]"
            src="/icons/paper-clip.svg"
            alt="emoji"
          />
        </button>
        <button>
          <img
            class="h-[1.6875rem] w-[1.6875rem]"
            src="/icons/mic.svg"
            alt="emoji"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.input-container {
  display: flex;
  padding: 0.625rem 0.625rem;
  align-items: center;
  flex-shrink: 0;
  gap: 0.5rem;
  justify-content: space-between;
  box-shadow: 0px -0.668px 2.004px 0px rgba(0, 0, 0, 0.13);
}

.input {
  width: 100%;
  caret-color: #50a7ea;
  font-size: 0.975rem;
}

.menu-btn {
  border-radius: 6.25rem;
  padding: 0.31rem 0.5rem;
  display: inline-flex;
  align-items: center;
  background: var(--Blue-Main-Color, #50a7ea);
  color: #fff;
  font-size: 0.875rem;
  font-style: normal;
  line-height: 1.125rem;
}
</style>
