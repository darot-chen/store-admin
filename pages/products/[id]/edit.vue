<template>
  <h1>Edit Products: {{ product!.id }}</h1>

  <ProductDetail v-if="product" @on-submit="editProduct" :product="product" />
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/product_interface';
import { useMessage } from 'naive-ui';
const message = useMessage();

const { id } = useRoute().params;

const url: string = 'https://fakestoreapi.com/products/' + id;
const { data: product } = await useFetch<Product>(url);

const editProduct = async (formValue: Product) => {
  const { data: product } = await useFetch<Product>(url, {
    method: 'PUT',
    body: formValue,
  });

  console.log(product);
  if (product.value?.id) {
    message.success('Create product successfully');
  } else {
    message.error("Something went wrong.")
  }
}
</script>

<style scoped></style>