<template>
  <NGrid :cols="4" item-responsive>
    <NGridItem span="2">
      <div class="input-form">
        <NForm ref="formRef" :model="formValue">
          <NFormItem label="Title">
            <NInput v-model:value="formValue.title" placeholder="Input title" />
          </NFormItem>
          <NFormItem label="Price">
            <NInput v-model:value="formValue.price" placeholder="Input price" />
          </NFormItem>
          <NFormItem label="Category">
            <NInput v-model:value="formValue.category" placeholder="Input category" />
          </NFormItem>
          <NFormItem label="Image">
            <NInput v-model:value="formValue.image" placeholder="Input image url" />
          </NFormItem>
          <NFormItem label="Description">
            <NInput v-model:value="formValue.description" placeholder="Input description" type="textarea" />
          </NFormItem>
          <NSpace justify="end">
            <NFormItem>
              <NButton @click="$emit('onSubmit', formValue)">Add Product</NButton>
            </NFormItem>
          </NSpace>
        </NForm>
      </div>
    </NGridItem>
    <NGridItem span="2">
      <NImage
        :src="formValue.image ?? 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'"
        width="300" />
    </NGridItem>
  </NGrid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NSpace, NGrid, NGridItem, NForm, NFormItem, NInput, NButton, NImage } from 'naive-ui';
import type { FormInst } from 'naive-ui';
import type { Product } from '~/interfaces/product_interface.ts';

const { product } = defineProps<{
  product: Product
}>();



const formRef = ref<FormInst | null>(null);
const formValue = ref<Product>(product);

</script>

<style scoped>
:deep(.n-image img) {
  margin: 10px 10px;
  width: -webkit-fill-available;
  max-height: 70vh;
}
</style>