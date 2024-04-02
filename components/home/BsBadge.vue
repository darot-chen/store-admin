<template>
  <div v-bind="$attrs" class="badge">
    <div class="relative flex items-center justify-center">
      <svg
        :style="{ borderRadius: rounded ? '7px 0 0 0' : '0' }"
        xmlns="http://www.w3.org/2000/svg"
        width="61"
        height="22"
        viewBox="0 0 61 22"
        fill="none"
      >
        <g filter="url(#filter0_d_6319_55198)">
          <path
            d="M0 0H61V10.8198C61 16.4125 56.4133 20.9181 50.8215 20.8182L10.0982 20.091C6.70926 20.0305 3.32366 20.3353 0 21V0Z"
            fill="#E10718"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_6319_55198"
            x="0"
            y="0"
            width="61"
            height="21.25"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="0.25" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.988235 0 0 0 0 0.313726 0 0 0 0 0.235294 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_6319_55198"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_6319_55198"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <UiImg src="bs-title.png" class="absolute h-[12px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rounded?: boolean;
}>();
</script>

<style scoped>
.badge {
  fill: #e10718;
  filter: drop-shadow(0px 0.25px 0px #fc503c);
}
</style>
