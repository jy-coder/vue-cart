import express from "express";
import asyncHandler from "../utils/asyncHandler";
import CartController from "../controller/cartController";
import CartItemController from "../controller/cartItemController";

const cartRoute = express.Router();

const cartController = new CartController();

const cartItemController = new CartItemController();

cartRoute.get("/:userId", asyncHandler(cartController.getCart));

cartRoute.post("/:userId", asyncHandler(cartController.createCart));

cartRoute.put("/:cartId", asyncHandler(cartController.updateCart));

cartRoute.post(
  "/:cartId/item",
  asyncHandler(cartItemController.addItemsToCart)
);

export default cartRoute;
