<template>
  <div class="bg-white">
    <form class="input-container" @submit.prevent="debounceSubmit">
      <div class="inline-flex items-center gap-[0.5rem]">
        <button class="menu-btn">
          <Icon name="Burger" color="#ffffff" size="20" />
          <p>Menu</p>
        </button>
        <button>
          <Icon name="Smiley" color="#8E959B" size="27" />
        </button>
      </div>
      <div class="flex-1">
        <input
          ref="input"
          autofocus
          class="input"
          type="text"
          :value="modelValue"
          placeholder="Message"
          @input="(e) => onInput(e)"
        />
      </div>
      <div class="inline-flex items-center justify-end gap-[1.12rem]">
        <div
          v-if="!loading"
          class="inline-flex items-center justify-end gap-[1.12rem]"
        >
          <button type="button" @click="debounceAttachFile">
            <Icon name="PaperClip" color="#868686" size="27" />
          </button>
          <transition name="pop">
            <button v-show="!isInputFocused">
              <Icon name="Mic" color="#868686" size="27" />
            </button>
          </transition>
        </div>
        <div v-else class="flex items-center justify-center">
          <div
            class="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"
          />
        </div>
        <transition name="pop">
          <button v-show="isInputFocused" type="submit">
            <Icon name="Send" color="#50a7ea" size="27" />
          </button>
        </transition>
      </div>
    </form>
    <input
      ref="fileInput"
      type="file"
      accept="image/*,video/*"
      class="hidden"
      @change="onFileChange"
    />
  </div>
</template>

<script setup lang="ts">
const fileInput = ref<HTMLInputElement | null>(null);
const input = ref<HTMLInputElement | null>(null);

const props = defineProps<{
  modelValue: string;
  loading?: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "submit"): void;
  (e: "attachFile", file: File): void;
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

function onFileChange(event: Event) {
  const selectedFile = (event.target as HTMLInputElement).files?.[0];
  if (selectedFile) {
    emits("attachFile", selectedFile);
  }
}

const debounceSubmit = useDebounceFn(() => {
  onSubmit();
  input.value?.focus();
}, 100);

const debounceAttachFile = useDebounceFn(() => {
  onAttachFile();
}, 100);

function onSubmit() {
  if (props.loading) return;
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
