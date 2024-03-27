<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-between bg-[#F6F6F6] p-[20px]">
      <p class="text-[17px] text-[#007AFF]" @click="emit('cancel')">关闭</p>
      <p class="text-[17px] font-semibold text-black">选择日期（多选）</p>
      <p
        class="text-[17px] font-semibold text-[#007AFF]"
        @click="emit('confirmed', startDateRef, endDateRef)"
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
          {{ formattedStartDate }}
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
          {{ formattedEndDate }}
        </p>
      </div>
    </div>
    <VanDatePicker
      v-model="currentDateComputed"
      title="选择日期（多选"
      class="w-full"
      :show-toolbar="false"
      :min-date="minDateComputed"
      :max-date="new Date(2025, 5, 1)"
      cancel-button-text="关闭"
      confirm-button-text="确认"
      @change="handleDateChange"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  startDate: Date;
  endDate: Date;
}>();

onMounted(() => {
  console.log(props.startDate);
  console.log(props.endDate);
});

const selectedDateOption = ref(0);

const startDateRef = toRef(props.startDate);
const endDateRef = toRef(props.endDate);

const minDateComputed = computed(() => {
  return selectedDateOption.value === 0
    ? new Date(2020, 0, 1)
    : startDateRef.value;
});

const currentDateComputed = computed({
  get: () => {
    const baseDate = selectedDateOption.value === 0 ? startDateRef : endDateRef;

    const year = baseDate.value.getFullYear().toString();
    const month = (baseDate.value.getMonth() + 1).toString().padStart(2, "0");
    const day = baseDate.value.getDate().toString().padStart(2, "0");

    return [year, month, day];
  },
  set: (_) => {},
});

const formattedStartDate = computed(() => {
  const formattedDate = startDateRef.value.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate.replace(/\//g, "年").replace("/", "月") + "日";
});

const formattedEndDate = computed(() => {
  const formattedDate = endDateRef.value.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate.replace(/\//g, "年").replace("/", "月") + "日";
});

const emit = defineEmits<{
  (e: "confirmed", startDate: Date, endDate: Date): void;
  (e: "cancel"): void;
}>();

const handleDateChange = (date: any) => {
  if (selectedDateOption.value === 0) {
    startDateRef.value = new Date(date.selectedValues.join("-"));
  } else {
    endDateRef.value = new Date(date.selectedValues.join("-"));
  }
};
</script>
