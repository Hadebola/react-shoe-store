import React from "react";

export function EmptyCart(props) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title">
          <h1>
            <strong className="text-info">{props.text}</strong>
          </h1>
        </div>
      </div>
    </div>
  );
}
