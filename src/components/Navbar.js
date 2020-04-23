import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import { FaCartArrowDown } from "react-icons/fa";
import { ButtonContainer } from "./Button";
import styled from "styled-components";

export function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [css, setCss] = useState("collapse navbar-collapse");
  const [links, setLinks] = useState([
    { id: 1, path: "/", text: "products" },
    { id: 2, path: "/services", text: "services" },
  ]);
  const navbarHandler = () => {
    navbarOpen
      ? setNavbarOpen(!navbarOpen, setCss("collapse navbar-collapse"))
      : setNavbarOpen(!navbarOpen, setCss("collapse navbar-collapse show"));
  };

  return (
    <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
      <Link to="/" className="navbar-brand mx-2">
        <img src={logo} alt="fashion logo" width="60" className="logo" />
      </Link>
      <button
        type="button"
        className="navbar-toggler button"
        onClick={navbarHandler}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={css}>
        <ul className="navbar-nav mx-auto">
          {links.map((link) => (
            <li key={link.id} className="nav-item mx-2 font-weight-bold">
              <Link to={link.path} className="nav-link">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/cart" className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              <FaCartArrowDown />
            </span>
            my cart
          </ButtonContainer>
        </Link>
      </div>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    text-transform: capitalize;
    font-size: 1.3rem;
    color: var(--lightBlue) !important;
  }
  .nav-link:hover {
    background: #ccc;

    transform: translate3d(0px, 0px, 5px);
    transition: all 0.5s ease-in-out;
  }
  /* .logo:hover {
    background: var(--lightBlue);
    transform: translate3d(0px, 0px, 5px);
    transition: all 0.5s ease-in-out;
  } */
`;
