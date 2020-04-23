import React, { useContext } from "react";
import { Product } from "./Product";
import { Title } from "./Title";
import { ProductContext } from "../context";

export function ProductList() {
  const context = useContext(ProductContext);

  return (
    <React.Fragment>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />

          <div className="row">
            {context.products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
