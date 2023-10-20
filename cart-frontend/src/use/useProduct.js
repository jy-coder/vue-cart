import { reactive, computed, watch, onMounted, nextTick } from 'vue'
import axios from 'axios'

const cartData = reactive({
  items: []
})
export function useProduct() {
  const fetchCart = () => {
    axios.get('https://fakestoreapi.com/products').then((response) => {
      console.log(response)
      cartData.items = response.data
    })
  }

  return {
    fetchCart,
    cartData
  }
}
