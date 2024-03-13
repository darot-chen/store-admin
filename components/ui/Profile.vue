<template>
  <div class="flex flex-col items-center gap-[7px]">
    <VanPopup v-model:show="isEditPopupVisible" position="bottom" round>
      <VanCellGroup inset>
        <VanField
          v-model="userNameRef"
          center
          clearable
          autofocus
          label="Name"
          :placeholder="user.name"
        >
          <template #button>
            <VanButton
              :disabled="userNameRef.trim().length === 0"
              size="small"
              type="primary"
              :loading="isLoading"
              loading-type="spinner"
              @click="onSavedUsername"
            >
              Save
            </VanButton>
          </template>
        </VanField>
      </VanCellGroup>
    </VanPopup>

    <VanPopup
      v-model:show="isEditProfilePopupVisible"
      round
      closeable
      :close-on-click-overlay="false"
      @closed="
        () => {
          isEditProfilePopupVisible = false;
          previewImage = '';
        }
      "
    >
      <UiImageCropper :image-src="previewImage" />
      <van-button
        :loading="isUpdateProfileLoading"
        type="primary"
        class="w-full rounded-b-3xl"
        @click="onUploaded"
      >
        Upload
      </van-button>
    </VanPopup>
    <div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        style="display: none"
        @change="uploadImage"
      />
      <NuxtImg
        :src="refUser.profile_key"
        provider="s3"
        :alt="refUser.name"
        class="h-20 w-20 rounded-full object-cover"
        @click="
          () => {
            fileInput?.click();
          }
        "
      />
    </div>
    <div class="relative inline-flex items-center gap-[10px]">
      <h1
        class="text-[20px] font-semibold text-[#010101]"
        contenteditable="false"
      >
        {{ refUser.name }}
      </h1>
      <button class="absolute -right-7" @click="toggleEditMode">
        <Icon name="EditProfile" color="#818086" size="15" />
      </button>
    </div>
    <div class="text-[#818086]">
      <p>
        {{ `ID : ${refUser.id} · +855 10 995 682` }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/types/user";
import { ref, toRef } from "vue";
import { updateName, uploadProfileImage } from "~/api/user";
import { showFailToast, showSuccessToast } from "vant";

const props = defineProps<{
  user: User;
}>();

const refUser = toRef(props).value.user;
const isEditPopupVisible = ref(false);
const isEditProfilePopupVisible = ref(false);
const fileInput = ref<HTMLInputElement>();

const userNameRef = ref("");
const isLoading = ref(false);
const isUpdateProfileLoading = ref(false);
const previewImage = ref<string | ArrayBuffer | null | undefined>();
let imageSource: string;

watch(refUser, () => {
  imageSource = `https://dev-baishun-public.s3.ap-southeast-1.amazonaws.com${refUser.profile_key}`;
});

const uploadImage = (e: any) => {
  const image = e.target?.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = (e) => {
    previewImage.value = e.target?.result;
  };
  isEditProfilePopupVisible.value = true;
};

const onUploaded = async () => {
  isUpdateProfileLoading.value = true;

  if (typeof previewImage.value !== "string") return;

  const file = dataURLtoFile(previewImage.value, "profile-image.jpg", 2048);
  if (!file) {
    showFailToast("Image exceed 2mb");
    isEditProfilePopupVisible.value = false;
    isUpdateProfileLoading.value = false;
    return;
  }

  const isUpdated = await uploadProfileImage(file);

  if (isUpdated) {
    showSuccessToast("Updated");
  } else {
    showFailToast("Failed");
  }
  isEditProfilePopupVisible.value = false;
  isUpdateProfileLoading.value = false;
};

const onSavedUsername = async () => {
  isLoading.value = true;
  const isSuccess = await updateName(userNameRef.value);
  if (isSuccess) {
    showSuccessToast("Updated");
  } else {
    showFailToast("Failed");
  }
  isLoading.value = false;
  refUser.name = userNameRef.value;
  isEditPopupVisible.value = false;
};

const toggleEditMode = () => {
  isEditPopupVisible.value = !isEditPopupVisible.value;
};

const dataURLtoFile = (
  dataUrl: string,
  filename: string,
  maxSizeKB: number
): File | undefined => {
  // Convert data URL to byte array
  const byteString = atob(dataUrl.split(",")[1]);
  const bytes = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    bytes[i] = byteString.charCodeAt(i);
  }

  // Check if file size exceeds the maximum allowed size
  const fileSizeKB = bytes.length / 1024;
  if (fileSizeKB > maxSizeKB) {
    return;
  }

  // Create File object
  const mime = dataUrl.match(/:(.*?);/)?.[1];
  if (!mime) {
    return;
  }
  const blob = new Blob([bytes], { type: mime });
  return new File([blob], filename, { type: mime });
};
</script>

<style lang="css">
.upload-example-cropper {
  border: solid 1px #eee;
  height: 300px;
  width: 100%;
}
</style>
