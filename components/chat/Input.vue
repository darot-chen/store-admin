<template>
  <div
    class="fixed bottom-0 left-0 right-0 mx-auto max-w-lg border-t-[1px] border-[#D7DBEE] bg-[#F5F8FE] p-3"
  >
    <div class="flex gap-2">
      <button
        class="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white shadow-[0px_2px_4px_0px_rgba(177,171,167,0.15)]"
      >
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          @change="onFileChange"
        />
        <img
          src="/img/icons/plus.svg"
          alt="add"
          @click="onDebounceAttachFile"
        />
      </button>
      <form class="relative flex-1" @submit="onSubmit">
        <input
          :value="formValue"
          class="h-full w-full break-all rounded-[20px] pl-3 pr-10 shadow-[0px_2px_4px_0px_rgba(177,171,167,0.15)]"
          type="text"
          @input="(e: any) => $emit('input', e.target.value)"
        />
        <img
          class="absolute bottom-0 right-2 top-0 m-auto cursor-pointer"
          src="/img/icons/send.svg"
          alt=""
          @click="onDebounceSubmit"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";

const props = defineProps<{
  disabled?: boolean;
  message: string | undefined;
  isLoading?: boolean;
}>();
const emits = defineEmits<{
  input: [value: string];
  submit: [];
  attachFile: [image: File];
}>();

const formValue = ref<string | undefined>(props.message);
const fileInput = ref<HTMLInputElement | null>(null);

const onFileChange = (event: Event) => {
  const selectedImage = (event.target as HTMLInputElement).files?.[0];
  if (selectedImage) {
    emits("attachFile", selectedImage);
  }
};
const onAttachFile = () => {
  if (fileInput.value) fileInput.value.click();
};

const onDebounceAttachFile = useDebounceFn(onAttachFile, 100);
const onDebounceSubmit = useDebounceFn(() => {
  emits("submit");
}, 100);

const onSubmit = (e: any) => {
  e.preventDefault();
  onDebounceSubmit();
};

watch(props, (values) => {
  formValue.value = values.message;
});
</script>
