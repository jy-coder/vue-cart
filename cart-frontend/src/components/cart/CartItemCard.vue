<template>
  <v-card @mouseover="showCloseIcon = true" @mouseleave="showCloseIcon = false">
    <v-row>
      <v-col cols="1" class="ml-10">
        <v-checkbox v-model="selected" @change="toggleSelected"></v-checkbox>
      </v-col>
      <v-col cols="4">
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-text> Price: {{ item.price * item.quantity }} </v-card-text>
      </v-col>
      <v-col cols="3" />
      <v-col cols="1">
        <v-card-text> Qty: </v-card-text>
        <v-text-field
          v-model="item.quantity"
          type="number"
          class="mt-n4 mx-auto"
          min="1"
        ></v-text-field>
      </v-col>
      <v-col cols="2" />
      <v-col>
        <v-icon
          icon="mdi-close"
          color="red"
          v-if="showCloseIcon"
          @click="removeItemFromCart(item.id)"
        ></v-icon>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const { removeItemFromCart, toggleSelectedItem } = useCartStore()

export default {
  props: {
    item: Object
  },
  data() {
    return {
      selected: false,
      showCloseIcon: false
    }
  },
  computed: {},
  methods: {
    toggleSelected() {
      toggleSelectedItem(this.item.id, this.item)
    }
  }
}
</script>
<script setup>
import { useCartStore } from '@/stores/useCartStore'
</script>

<style></style>
