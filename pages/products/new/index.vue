<template>
  <h1>Add New Products</h1>
  <ProductDetail @on-submit="addProduct" :product="product" />
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/product_interface';
import { useMessage } from 'naive-ui';
const message = useMessage();

const product: Product = {
  id: null,
  title: '',
  price: '',
  category: '',
  description: '',
  image: null,
}

const addProduct = async (formValue: Product) => {
  console.log(formValue);
  const { data: product } = await useFetch<Product>("https://fakestoreapi.com/products", {
    method: 'POST',
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
