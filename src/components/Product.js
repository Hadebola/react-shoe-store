import React, { useContext } from "react";
import styled from "styled-components";
import { ProductContext } from "../context";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import PropTypes from "prop-types";

export function Product(props) {
  const context = useContext(ProductContext);
  const { id, title, img, price, inCart } = props.product;
  return (
    <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        <div
          className="img-container px-5"
          onClick={() => context.handleDetail(id)}
        >
          <Link to="/details">
            <img src={img} alt="product" className="card-img-top" />
          </Link>
          <button
            className="cart-btn"
            disabled={inCart ? true : false}
            onClick={() => {
              context.addToCart(id);
              context.openModal(id);
            }}
          >
            {inCart ? (
              <p className="text-capitalize mb-0" disabled>
                in cart
              </p>
            ) : (
              <FaCartArrowDown />
            )}
          </button>
        </div>
        {/* card image footer */}
        <div className="card-footer d-flex justify-content-between">
          <p className="align-self-center mb-0">{title}</p>
          <h5 className="text-blue font-italic mb-0">
            <span className="mr-1">&#x20A6;</span>
            {price}
          </h5>
        </div>
      </div>
    </ProductWrapper>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    img: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
  }).isRequired,
};

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-color: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }

  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: perspective(500px) translateX(10px) scale(1.2)
      rotate3d(1, 0, 0, 45deg);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    background: var(--mainCoral);
    border: none;
    color: var(--mainWhite);
    padding: 0.2rem 0.4rem;
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0.5rem 0;
    transform: translate(100%, 100%);
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
    transition: all 1s linear;
  }

  .cart-btn:hover {
    color: green;
    cursor: pointer;
  }
`;
