import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

export const ProductContext = React.createContext();

export class ProductProvider extends Component {
  state = {
    /* passing data as reference */

    // products: storeProducts,
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTotal: 0,
    cartTax: 0,
  };
  /* function for manipulating data passed as reference */
  // tester = () => {
  //   console.log(`state products ${this.state.products[0].inCart}`);
  //   console.log(`data products ${storeProducts[0].inCart}`);

  //   let tempProducts = [...this.state.products];
  //   tempProducts[0].inCart = true;
  //   this.setState({ products: tempProducts }, () => {
  //     console.log(`state products ${this.state.products[0].inCart}`);
  //     console.log(`data products ${storeProducts[0].inCart}`);
  //   });
  // };

  componentDidMount() {
    this.setProducts();
  }
  /* method for accessing data singly without passing as reference */
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];

      this.setState(() => ({ products: tempProducts }));
    });
  };
  getItem = (id) => this.state.products.find((item) => item.id === id);
  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => ({ detailProduct: product }));
  };
  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    let index = tempProducts.indexOf(this.getItem(id));
    let product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );
  };
  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => this.setState(() => ({ modalOpen: false }));
  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count += 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => this.addTotals()
    );
  };
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count -= 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(() => ({ cart: [...tempCart] }, () => this.addTotals()));
    }
  };

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter((item) => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    this.setState(
      () => {
        return { cart: [...tempCart], products: [...tempProducts] };
      },
      () => this.addTotals()
    );
  };
  clearCart = () => {
    this.setState(
      () => ({ cart: [] }),
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    let tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;

    this.setState(() => ({
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total,
    }));
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          clearCart: this.clearCart,
          removeItem: this.removeItem,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

// const ProductConsumer = ProductContext.Consumer;
// export { ProductProvider, ProductConsumer };

// import React, { Component } from "react";
// import { storeProducts, detailProduct } from "./data";
// export const ProductContext = React.createContext();

// class ProductProvider extends Component {
//   state = {
//     products: [],
//     details: detailProduct,
//     cart: [],
//     modalOpen: false,
//     modalProduct: detailProduct,
//     cartSubTotal: 0,
//     cartTax: 0,
//     cartTotal: 0,
//   };

//   componentDidMount() {
//     this.setProducts();
//   }

//   setProducts = () => {
//     let products = [];
//     storeProducts.forEach((item) => {
//       const singleItem = { ...item };
//       products = [...products, singleItem];
//     });

//     // this.setState(() => {
//     //     return {products};
//     // })

//     this.setState(() => ({ products }));
//   };

//   getItem = (id) => {
//     const product = this.state.products.find((item) => item.id === id);
//     return product;
//   };

//   handleDetail = (id) => {
//     const product = this.getItem(id);
//     this.setState(() => {
//       return { details: product };
//     });
//   };

//   addToCart = (id) => {
//     const tempProducts = [...this.state.products];
//     const index = tempProducts.indexOf(this.getItem(id));
//     const product = tempProducts[index];
//     product.inCart = true;
//     product.count = 1;
//     const price = product.price;
//     product.total = price;

//     this.setState(
//       () => {
//         return { products: tempProducts, cart: [...this.state.cart, product] };
//       },
//       () => {
//         this.addTotals();
//       }
//     );
//   };

//   openModal = (id) => {
//     const product = this.getItem(id);
//     this.setState(() => {
//       return { modalProduct: product, modalOpen: true };
//     });
//   };

//   closeModal = () => {
//     this.setState(() => {
//       return { modalOpen: false };
//     });
//   };

//   increment = (id) => {
//     let tempCart = [...this.state.cart];
//     const selectedProduct = tempCart.find((item) => item.id === id);
//     const index = tempCart.indexOf(selectedProduct);
//     const product = tempCart[index];
//     product.count = product.count + 1;
//     product.total = product.count * product.price;

//     this.setState(
//       () => {
//         return { cart: [...tempCart] };
//       },
//       () => {
//         this.addTotals();
//       }
//     );
//   };

//   decrement = (id) => {
//     let tempCart = [...this.state.cart];
//     const selectedProduct = tempCart.find((item) => item.id === id);
//     const index = tempCart.indexOf(selectedProduct);
//     const product = tempCart[index];
//     product.count = product.count - 1;

//     if (product.count === 0) {
//       this.removeItem(id);
//     } else {
//       product.total = product.count * product.price;
//       this.setState(
//         () => {
//           return { cart: [...tempCart] };
//         },
//         () => {
//           this.addTotals();
//         }
//       );
//     }
//   };

//   removeItem = (id) => {
//     let tempProducts = [...this.state.products];
//     let tempCart = [...this.state.cart];
//     tempCart = tempCart.filter((item) => item.id !== id);
//     const index = tempProducts.indexOf(this.getItem(id));
//     let removedProduct = tempProducts[index];
//     removedProduct.inCart = false;
//     removedProduct.count = 0;
//     removedProduct.total = 0;

//     this.setState(
//       () => {
//         return { cart: [...tempCart], products: [...tempProducts] };
//       },
//       () => {
//         this.addTotals();
//       }
//     );
//   };

//   clearCart = () => {
//     this.setState(
//       () => {
//         return { cart: [] };
//       },
//       () => {
//         this.setProducts();
//         this.addTotals();
//       }
//     );
//   };

//   addTotals = () => {
//     let subTotal = 0;
//     this.state.cart.map((item) => (subTotal += item.total));
//     const tempTax = subTotal * 0.1;
//     const tax = parseFloat(tempTax.toFixed(2));
//     const total = subTotal + tax;

//     this.setState(() => {
//       return {
//         cartSubTotal: subTotal,
//         cartTax: tax,
//         cartTotal: total,
//       };
//     });
//   };

//   render() {
//     return (
//       <div>
//         <ProductContext.Provider
//           value={{
//             ...this.state,
//             handleDetail: this.handleDetail,
//             addToCart: this.addToCart,
//             openModal: this.openModal,
//             closeModal: this.closeModal,
//             increment: this.increment,
//             decrement: this.decrement,
//             removeItem: this.removeItem,
//             clearCart: this.clearCart,
//           }}
//         >
//           {this.props.children}
//         </ProductContext.Provider>
//       </div>
//     );
//   }
// }

// const ProductConsumer = ProductContext.Consumer;
// export { ProductProvider, ProductConsumer };

// import React, { createContext, useEffect, useState } from "react";
// import { storeProducts, detailProduct } from "./data";

// export const ProductContext = createContext();

// function ProductProvider(props) {
//   const [products, setProducts] = useState([]);
//   const [details, setDetails] = useState(detailProduct);
//   const [cart, setCart] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalProduct, setModalProduct] = useState(detailProduct);
//   const [cartSubTotal, setCartSubTotal] = useState(0);
//   const [cartTax, setCartTax] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0);

//   useEffect(() => readyProducts());

//   const readyProducts = () => {
//     let products = [];
//     storeProducts.forEach((item) => {
//       const singleItem = { ...item };
//       products = [...products, singleItem];
//       setProducts(products);
//     });
//   };

//   const getItem = (id) => {
//     const product = products.find((item) => item.id === id);
//     return product;
//   };

//   const handleDetail = (id) => {
//     const product = getItem(id);
//     setDetails(product);
//   };

//   const addToCart = (id) => {
//     const tempProducts = [...products];
//     const index = tempProducts.indexOf(getItem(id));
//     const product = tempProducts[index];
//     product.inCart = true;
//     product.count = 1;
//     const price = product.price;
//     product.total = price;

//     setProducts(tempProducts);
//     setCart([...cart, product]);
//   };

//   useEffect(
//     () => {
//       addTotals();
//     },
//     [products],
//     [cart]
//   );

//   const openModal = (id) => {
//     const product = getItem(id);

//     setModalProduct(product);
//     setModalOpen(true);
//   };

//   const closeModal = () => setModalOpen(false);

//   const increment = (id) => {
//     let tempCart = [...cart];
//     const selectedProduct = tempCart.find((item) => item.id === id);
//     const index = tempCart.indexOf(selectedProduct);
//     const product = tempCart[index];
//     product.count = product.count + 1;
//     product.total = product.count * product.price;
//     setCart([...tempCart]);
//   };
//   useEffect(() => {
//     addTotals();
//   }, [cart]);

//   const decrement = (id) => {
//     let tempCart = [...cart];
//     const selectedProduct = tempCart.find((item) => item.id === id);
//     const index = tempCart.indexOf(selectedProduct);
//     const product = tempCart[index];
//     product.count = product.count - 1;
//     if (product.count === 0) {
//       removeItem(id);
//     } else {
//       product.total = product.count * product.price;
//       setCart([...tempCart]);
//     }
//   };

//   useEffect(() => {
//     addTotals();
//   }, [cart]);

//   const removeItem = (id) => {
//     let tempProducts = [...products];
//     let tempCart = [...cart];
//     tempCart = tempCart.filter((item) => item.id !== id);
//     const index = tempProducts.indexOf(getItem(id));
//     let removedProduct = tempProducts[index];
//     removedProduct.inCart = false;
//     removedProduct.count = 0;
//     removedProduct.total = 0;
//     setCart([...tempCart]);
//     setProducts([...tempProducts]);
//   };
//   useEffect(
//     () => {
//       addTotals();
//     },
//     [cart],
//     [products]
//   );

//   const clearCart = () => {
//     setCart([]);
//   };
//   useEffect(
//     () => {
//       readyProducts(), addTotals();
//     },
//     [products],
//     [cartSubTotal],
//     [cartTax],
//     [cartTotal]
//   );

//   const addTotals = () => {
//     let subTotal = 0;
//     cart.map((item) => (subTotal += item.total));
//     const tempTax = subTotal * 0.1;
//     const tax = parseFloat(tempTax.toFixed(2));
//     const total = subTotal + tax;

//     setCartSubTotal(subTotal);
//     setCartTax(tax);
//     setCartTotal(total);
//   };

//   return (
//     <div>
//       <ProductContext.Provider
//         value={{
//           products,
//           details,
//           cart,
//           modalOpen,
//           modalProduct,
//           cartSubTotal,
//           cartTax,
//           cartTotal,
//           handleDetail,
//           addToCart,
//           openModal,
//           closeModal,
//           increment,
//           decrement,
//           removeItem,
//           clearCart,
//         }}
//       >
//         {props.children}
//       </ProductContext.Provider>
//     </div>
//   );
// }

// const ProductConsumer = ProductContext.Consumer;
// export { ProductProvider, ProductConsumer };
