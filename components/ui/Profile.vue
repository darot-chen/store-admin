<template>
  <div class="relative flex flex-col items-center gap-[7px]">
    <div>
      <UiGradientProfile
        :image-source="
          isUser ? refUser.profile_key : refUser.business_profile_key ?? ''
        "
        :name="isUser ? refUser.name : refUser.business_name ?? ''"
        size="80px"
        @click="fileInput?.click()"
      />
    </div>
    <div class="relative inline-flex items-center gap-[10px]">
      <h1
        class="text-[20px] font-semibold text-[#010101]"
        contenteditable="false"
      >
        {{ isUser ? refUser.name : refUser.business_name ?? "" }}
      </h1>

      <!-- 
      Hide Edit profile name
      <button class="absolute -right-7" @click="toggleEditMode">
        <Icon name="EditProfile" color="#818086" size="15" />
      </button>
      -->
    </div>
    <div class="text-[#818086]">
      <p>
        {{ `ID : ${refUser.id}` }}
      </p>
    </div>
  </div>

  <VanDialog
    v-model:show="isEditPopupVisible"
    round
    theme="round-button"
    :close-on-click-overlay="true"
    :confirm-button-text="$t('save_edit')"
    confirm-button-color="#50a7ea"
    :confirm-button-disabled="userNameRef.trim() === ''"
    @confirm="onSavedUsername"
    @closed="
      () => {
        if (isUser) {
          if (userNameRef === user.name) return;
        } else {
          if (userNameRef === user.business_name) return;
        }
        userNameRef = '';
      }
    "
  >
    <VanCellGroup inset>
      <VanField
        v-model="userNameRef"
        center
        clearable
        autofocus
        :label="$t('name')"
        :placeholder="isUser ? user.name : user.business_name"
      >
      </VanField>
    </VanCellGroup>
  </VanDialog>

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
import {
  updateBusinessName,
  updateName,
  uploadBusinessProfileImage,
  uploadProfileImage,
} from "~/api/user";
import { showFailToast, showSuccessToast } from "vant";
import imageCompression from "browser-image-compression";

const props = defineProps<{
  user: User;
  isUser: boolean;
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

  let profileKey: string | undefined;

  if (props.isUser) {
    profileKey = await uploadProfileImage(profileImg);
  } else {
    profileKey = await uploadBusinessProfileImage(profileImg);
  }

  isEditProfilePopupVisible.value = false;
  isUpdateProfileLoading.value = false;
  if (profileKey) {
    if (props.isUser) {
      refUser.profile_key = profileKey;
    } else {
      refUser.business_profile_key = profileKey;
    }
    showSuccessToast("Updated");
  } else {
    showFailToast("Failed");
  }
};

const onSavedUsername = async () => {
  isLoading.value = true;
  let isSuccess = false;
  if (props.isUser) {
    isSuccess = await updateName(userNameRef.value);
  } else {
    isSuccess = await updateBusinessName(userNameRef.value);
  }
  if (isSuccess) {
    showSuccessToast("Updated");
    if (props.isUser) {
      refUser.name = userNameRef.value;
    } else {
      refUser.business_name = userNameRef.value;
    }
  } else {
    showFailToast("Failed");
  }

  isLoading.value = false;
  isEditPopupVisible.value = false;
  userNameRef.value = "";
};

// const toggleEditMode = () => {
//   isEditPopupVisible.value = !isEditPopupVisible.value;
// };

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
