<template>
  <v-container>
    <div v-if="cartLoaded">
      <v-row>
        <v-col v-for="item in cartItems" :key="item.id" cols="12">
          <cart-item-card :item="item" />
        </v-col>
      </v-row>
      <v-row class="justify-end">
        <v-btn color="orange" class="mr-2" dark>Check out</v-btn>
      </v-row>
    </div>
    <div v-else>Loading...</div>
  </v-container>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
import CartItemCard from '@/components/cart/CartItemCard.vue'

export default {
  name: CartItemCard
}
</script>

<script setup>
import { useCartStore } from '@/stores/useCartStore'
const { cartItems, cartLoaded } = useCartStore()
</script>
