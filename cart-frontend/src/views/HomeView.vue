<template>
  <div class="home">
    <div>
      <v-container>
        <v-row>
          <v-col
            v-for="(item, index) in cartData.items"
            :key="index"
            cols="12"
            sm="6"
            md="2"
          >
            <product-card
              :title="item.title"
              :image="item.image"
              :actionLabel="buttonLabel"
              :action="() => handleButtonClick(item)"
            >
            </product-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import ProductCard from '@/components/product/ProductCard.vue'

export default {
  name: ProductCard
}
</script>
<script setup>
import { onMounted } from 'vue'
import { useProduct } from '@/use/useProduct'
import { useCartStore } from '@/stores/useCartStore'
const { addToCart } = useCartStore()

const buttonLabel = 'Add'
const { fetchCart, cartData } = useProduct()

onMounted(() => {
  fetchCart()
})

const handleButtonClick = (selectedItem) => {
  addToCart(selectedItem)
}
</script>
