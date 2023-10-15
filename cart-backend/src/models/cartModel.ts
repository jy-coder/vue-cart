import { CartItem } from "./cartItemModel";

export interface Cart {
  id?: number;
  userId: number;
  cartItems: CartItem[];
}
