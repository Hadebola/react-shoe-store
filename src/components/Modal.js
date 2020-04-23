import React, { useContext } from "react";
import styled from "styled-components";
import { ProductContext } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";

export const Modal = () => {
  const context = useContext(ProductContext);
  const { img, title, price } = context.modalProduct;
  if (!context.modalOpen) {
    return null;
  } else {
    return (
      <ModalContainer>
        <div className="container">
          <div className="row">
            <div
              id="modal"
              className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5 mt-4"
            >
              <h3>Item added to cart</h3>
              <img src={img} alt="product" className="img-fluid" />
              <h5>{title}</h5>
              <h5 className="text-muted">
                Price: <strong>&#x20A6;{price}</strong>
              </h5>
              <Link to="/">
                <ButtonContainer onClick={() => context.closeModal()}>
                  continue shopping
                </ButtonContainer>
              </Link>
              <Link to="/cart">
                <ButtonContainer cart onClick={() => context.closeModal()}>
                  go to cart
                </ButtonContainer>
              </Link>
            </div>
          </div>
        </div>
      </ModalContainer>
    );
  }
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
  display: flex;
  #modal {
    background: var(--mainWhite);
  }
`;
