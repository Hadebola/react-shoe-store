import React, { useContext } from "react";
import { Title } from "../Title";
import { CartColumns } from "./CartColumns";
import { EmptyCart } from "./EmptyCart";
import { ProductContext } from "../../context";
import { CartList } from "./CartList";
import { CartTotals } from "./CartTotals";
export function Cart() {
  const context = useContext(ProductContext);

  const { cart } = context;

  return cart.length > 0 ? (
    <React.Fragment>
      <Title name="your" title="cart" />
      <CartColumns />
      <CartList context={context} />
      <CartTotals context={context} />
    </React.Fragment>
  ) : (
    <EmptyCart text="your cart is currently empty" />
  );
}
