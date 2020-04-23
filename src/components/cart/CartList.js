import React from "react";
import { CartItem } from "./CartItem";

export function CartList({ context }) {
  const { cart } = context;
  return (
    <div className="container-fluid">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} context={context} />
      ))}
    </div>
  );
}
