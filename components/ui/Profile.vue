<template>
  <div class="relative flex flex-col items-center gap-[7px]">
    <div>
      <UiGradientProfile
        :image-source="refUser.profile_key"
        :name="refUser.name"
        size="80px"
        @click="fileInput?.click()"
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

  <VanPopup v-model:show="isEditPopupVisible" position="bottom" round>
    <VanCellGroup inset>
      <VanField
        v-model="userNameRef"
        center
        clearable
        autofocus
        :label="$t('name')"
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
            {{ $t("save") }}
          </VanButton>
        </template>
      </VanField>
    </VanCellGroup>
  </VanPopup>

  <div
    v-if="previewImage && isEditProfilePopupVisible"
    class="absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.5)]"
  >
    <UiImageCropper
      v-model:show="isEditProfilePopupVisible"
      v-model:src="previewImage"
      :is-loading="isUpdateProfileLoading"
      @crop-image="cropImage"
    />
  </div>

  <input
    :key="previewImage?.toString()"
    ref="fileInput"
    type="file"
    accept="image/*"
    class="hidden"
    @change="uploadImage"
  />
</template>

<script setup lang="ts">
import type { User } from "~/types/user";
import { updateName, uploadProfileImage } from "~/api/user";
import { showFailToast, showSuccessToast } from "vant";
import imageCompression from "browser-image-compression";

const props = defineProps<{
  user: User;
}>();

const refUser = toRef(props).value.user;
const isEditPopupVisible = ref(false);
const isEditProfilePopupVisible = ref(false);
const fileInput = ref();

const userNameRef = ref("");
const isLoading = ref(false);
const isUpdateProfileLoading = ref(false);
const previewImage = ref<string>();

const uploadImage = (e: any) => {
  const image = e.target?.files[0];
  if (image) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target?.result?.toString();
    };
    reader.readAsDataURL(image);
  }
  image.value = null;
  isEditProfilePopupVisible.value = true;
};

const cropImage = async (cropperRef: Ref) => {
  if (cropperRef.value) {
    const { canvas } = cropperRef.value.getResult();
    const croppedImg = canvas.toDataURL("image/jpg");
    await onUpload(croppedImg);
  }
};

const onUpload = async (croppedImg: string) => {
  isUpdateProfileLoading.value = true;

  if (typeof croppedImg !== "string") return;

  const file = dataURLtoFile(croppedImg, "profile-image.jpg");

  if (!file) {
    isEditProfilePopupVisible.value = false;
    isUpdateProfileLoading.value = false;
    showFailToast("Failed");
    return;
  }

  const compressedFile = await imageCompression(file, {
    maxSizeMB: 2,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    fileType: "image/jpeg",
  });

  const profileImg = new File([compressedFile], "profile-image.jpg", {
    type: compressedFile.type,
  });

  const compressedFileSizeKB = compressedFile.size / 1024;
  if (compressedFileSizeKB > 1024 * 2) {
    showFailToast("Compressed file size exceeds the maximum allowed size");
    isEditProfilePopupVisible.value = false;
    isUpdateProfileLoading.value = false;
    return;
  }

  const isUpdated = await uploadProfileImage(profileImg);

  isEditProfilePopupVisible.value = false;
  isUpdateProfileLoading.value = false;
  if (isUpdated) {
    showSuccessToast("Updated");
    refUser.profile_key = isUpdated;
  } else {
    showFailToast("Failed");
  }
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

const dataURLtoFile = (dataUrl: string, filename: string): File | undefined => {
  const byteString = atob(dataUrl.split(",")[1]);
  const bytes = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    bytes[i] = byteString.charCodeAt(i);
  }

  const mime = dataUrl.match(/:(.*?);/)?.[1];
  if (!mime) {
    return;
  }
  const blob = new Blob([bytes], { type: mime });
  return new File([blob], filename, { type: mime });
};
</script>
