<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-between bg-[#F6F6F6] p-[20px]">
      <p class="text-[17px] text-[#007AFF]">关闭</p>
      <p class="text-[17px] font-semibold text-black">选择日期（多选）</p>
      <p
        class="text-[17px] font-semibold text-[#007AFF]"
        @click="
          emit('confirmed', selectedDateOption === 1 ? startDate : endDate)
        "
      >
        确认
      </p>
    </div>
    <div class="flex flex-row justify-between p-[20px]">
      <div
        class="flex flex-col items-center"
        @click.prevent="() => (selectedDateOption = 0)"
      >
        <p
          class="text-[17px]"
          :class="
            selectedDateOption === 0
              ? 'font-semibold text-[#007AFF]'
              : 'font-normal text-[#8E8E93]'
          "
        >
          开始日期
        </p>
        <p
          class="font-[14px]"
          :class="
            selectedDateOption === 0
              ? 'font-semibold text-[#007AFF]'
              : 'font-normal text-[#8E8E93]'
          "
        >
          2017年09月17日
        </p>
      </div>
      <div
        class="flex flex-col items-center"
        @click.prevent="() => (selectedDateOption = 1)"
      >
        <p
          class="text-[17px]"
          :class="
            selectedDateOption === 1
              ? 'font-semibold text-[#007AFF]'
              : 'font-normal text-[#8E8E93]'
          "
        >
          结束日期
        </p>
        <p
          class="font-[14px]"
          :class="
            selectedDateOption === 1
              ? 'font-semibold text-[#007AFF]'
              : 'font-normal text-[#8E8E93]'
          "
        >
          2019年12月18日
        </p>
      </div>
    </div>
    <van-date-picker
      v-model="currentDate"
      title="选择日期（多选"
      class="w-full"
      :show-toolbar="false"
      :min-date="new Date(2020, 0, 1)"
      :max-date="new Date(2025, 5, 1)"
      cancel-button-text="关闭"
      confirm-button-text="确认"
      @change="() => {}"
    />
  </div>
</template>

<script setup lang="ts">
const selectedDateOption = ref(0);
const currentDate = ref(["2021", "01", "01"]);
defineProps<{
  startDate: Date;
  endDate: Date;
}>();

const emit = defineEmits<{
  (e: "confirmed", value: Date): void;
  (e: "cancel"): void;
}>();
</script>
