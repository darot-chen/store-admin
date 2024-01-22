<template>
  <div class="bg-white">
    <form class="input-container" @submit.prevent="debounceSubmit">
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
      <div class="flex-1">
        <input
          autofocus
          class="input"
          type="text"
          :value="modelValue"
          placeholder="Message"
          @input="(e) => onInput(e)"
        />
      </div>
      <div class="inline-flex items-center justify-end gap-[1.12rem]">
        <button type="button" @click="debounceAttachFile">
          <img
            class="h-[1.6875rem] w-[1.6875rem]"
            src="/icons/paper-clip.svg"
            alt="paper-clip"
          />
        </button>
        <transition name="pop">
          <button v-show="!isInputFocused">
            <img
              class="h-[1.6875rem] w-[1.6875rem]"
              src="/icons/mic.svg"
              alt="mic"
            />
          </button>
        </transition>
        <transition name="pop">
          <button v-show="isInputFocused" type="submit">
            <img
              class="h-[1.6875rem] w-[1.6875rem]"
              src="/icons/send.svg"
              alt="send"
            />
          </button>
        </transition>
      </div>
    </form>
    <input
      ref="fileInput"
      type="file"
      accept="image/*,video/*"
      class="hidden"
    />
  </div>
</template>

<script setup lang="ts">
const fileInput = ref<HTMLInputElement | null>(null);

const props = defineProps<{
  modelValue: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "submit"): void;
}>();

const isInputFocused = ref<boolean>(false);

function onInput(e: Event) {
  isInputFocused.value = true;
  const target = e.target as HTMLInputElement;
  emits("update:modelValue", target.value);
}

function onAttachFile() {
  if (fileInput.value) fileInput.value.click();
}

const debounceSubmit = useDebounceFn(() => {
  onSubmit();
}, 100);

const debounceAttachFile = useDebounceFn(() => {
  onAttachFile();
}, 100);

function onSubmit() {
  isInputFocused.value = true;
  emits("submit");
  emits("update:modelValue", "");
}

watch(
  () => props.modelValue,
  (v) => {
    if (v === "") {
      isInputFocused.value = false;
    }
  }
);
</script>

<style scoped>
.input-container {
  display: flex;
  padding: 0.625rem 0.625rem;
  align-items: center;
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
  background: #50a7ea;
  color: #fff;
  font-size: 0.875rem;
  font-style: normal;
  line-height: 1.125rem;
}

.pop-enter-active {
  transition: all 0.3s;
}

.pop-enter-from {
  opacity: 0;
  transform: translateY(1rem);
  position: absolute;
}

.pop-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
