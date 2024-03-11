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
    <img
      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987"
      :alt="refUser.name"
      class="h-20 w-20 rounded-full object-cover"
    />
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
import { updateName } from "~/api/user";
import { showFailToast, showSuccessToast } from "vant";

const props = defineProps<{
  user: User;
}>();

const refUser = toRef(props).value.user;
const isEditPopupVisible = ref(false);
const userNameRef = ref("");
const isLoading = ref(false);

const onSavedUsername = async () => {
  isLoading.value = true;
  const isSuccess = await updateName(userNameRef.value);
  if (!isSuccess) {
    showFailToast("Failed");
  } else {
    showSuccessToast("Updated");
  }
  isLoading.value = false;
  refUser.name = userNameRef.value;
  isEditPopupVisible.value = false;
};

const toggleEditMode = () => {
  isEditPopupVisible.value = !isEditPopupVisible.value;
};
</script>
