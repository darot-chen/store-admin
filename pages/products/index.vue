<template>
  <h1>Products List</h1>
  <NGrid :x-gap="12" :y-gap="12" :cols="4">
    <NGridItem v-for="product in products" class="product-card">
      <NCard :title="product.title">
        <template #cover>
          <img :src="product.image" alt="Product Image">
        </template>
        <div>
          <NSpace class="product-description">
            {{ product.price }}
          </NSpace>
          <NSpace vertical>
            <NButton>Edit</NButton>
            <NButton>Delete</NButton>
          </NSpace>
        </div>

      </NCard>
    </NGridItem>
  </NGrid>
</template>

<script setup lang="ts">
import { NGrid, NGridItem, NCard, NButton } from 'naive-ui';
import type { Product } from '~/interfaces/product_interface';
const { pending, data: products } = await useFetch<Product[]>("https://fakestoreapi.com/products");
</script>

<style scoped>
:deep(.n-card-header__main) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

:deep(.n-card-cover) {
  width: 100%;
  display: flex;
  justify-content: center;
}

.product-card {
  margin: 2px 2px;
}

.product-card img {
  margin: 2px 2px;
  height: 150px;
  width: auto;
  justify-self: center;
  align-self: center;
}

.product-card p {
  margin: 2px 2px;
  widows: 100px;
  display: flex;
  justify-items: center;
}

.product-description {
  /* height: 65px; */
  overflow: hidden;
  display: block;
}
</style>