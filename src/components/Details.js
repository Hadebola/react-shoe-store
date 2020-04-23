import React, { useContext } from "react";
import { ProductContext } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

export function Details() {
  const context = useContext(ProductContext);

  const {
    id,
    img,
    title,
    price,
    info,
    inCart,
    company,
  } = context.detailProduct;

  return (
    <div className="container py-5">
      {/* title */}
      <div className="row">
        <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
          <h1>{title}</h1>
        </div>
      </div>
      {/* end title */}

      {/* product info */}

      <div className="row">
        <div className="col-10 mx-auto col-md-6 my-3">
          <img src={img} alt="product" className="img-fluid" />
        </div>
        <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
          <h3>model: {title}</h3>
          <h4 className="text-title text-uppercase text-muted mt-3 mb-0">
            made by : <span className="text-uppercase">{company}</span>
          </h4>
          <h4 className="text-blue mt-2">
            <strong>
              price: <span>&#x20A6;</span>
              {price}
            </strong>
          </h4>
          <p className="text-capitalize font-weight-bold">about the product:</p>
          <p className="text-muted lead">{info}</p>
          {/* buttons */}
          <div>
            <Link to="/">
              <ButtonContainer>back to products</ButtonContainer>
            </Link>
            <ButtonContainer
              cart
              disabled={inCart ? true : false}
              onClick={() => {
                context.addToCart(id);
                context.openModal(id);
              }}
            >
              {inCart ? "in cart" : "add to cart"}
            </ButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
