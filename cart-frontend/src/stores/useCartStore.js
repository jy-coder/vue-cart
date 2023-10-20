import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('storeCart', {
  state: () => {
    return {
      cartItems: [],
      cartLoaded: false,
      selectedItemsToCheckout: []
    }
  },
  actions: {
    init() {
      this.getCart()
    },
    async getCart() {
      this.cartLoaded = false
      const response = await axios.get('http://localhost:8000/cart/1')
      this.cartItems = response.data.cartItems
      this.cartLoaded = true
    },
    addToCart(item) {
      const existingItem = this.cartItems.find(
        (cartItem) => cartItem.id === item.id
      )
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push({ ...item, quantity: 1 })
      }
    },
    removeItemFromCart(itemId) {
      const itemIndex = this.cartItems.findIndex((item) => item.id === itemId)
      if (itemIndex !== -1) {
        this.cartItems.splice(itemIndex, 1)
      }
    },
    toggleSelectedItem(itemId, item) {
      if (this.selectedItemsToCheckout.includes(itemId)) {
        this.selectedItemsToCheckout = this.selectedItemsToCheckout.filter(
          (id) => id !== itemId
        )
      } else {
        this.selectedItemsToCheckout.push(item)
      }
    }
  }
})
