<template>
  <v-app>
    <v-toolbar density="compact">
      <v-toolbar-title>
        <RouterLink to="/"> Cart Project </RouterLink>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn :to="{ name: 'cart' }">
        <v-badge
          :content="cartItems.length"
          color="red darken-2"
          size="x-small"
        >
          <v-icon icon="mdi-cart-outline"></v-icon>
        </v-badge>
      </v-btn>
      <!-- <v-navigation-drawer
        v-model="drawer"
        location="right"
        temporary
        :width="400"
      >
        <v-list :items="items"></v-list>
      </v-navigation-drawer> -->
    </v-toolbar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { onMounted } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()

const { getCart } = cartStore
const { cartItems } = storeToRefs(cartStore)

onMounted(() => {
  getCart()
})
</script>
