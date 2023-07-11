import React from "react";
import ReactDOM from "react-dom/client";

import { pizzaData } from "./data";
import "./index.css";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <div className="header">
      <h1>Papi's Pizza Co.</h1>
    </div>
  );
};

const Menu = () => {
  const pizzas = pizzaData;

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzas.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic and delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObject={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We are still working on our menu!</p>
      )}
    </main>
  );
};

const Order = ({ closeHour }) => {
  return (
    <div className="order">
      <p>We are open until {closeHour} hours.</p>
      <button className="btn">Order</button>
    </div>
  );
};

const Footer = () => {
  const openHour = 8;
  const closeHour = 22;
  const hour = new Date().getHours();
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? <Order closeHour={closeHour} /> : <p>Sorry, we are closed!</p>}
    </footer>
  );
};

const Pizza = ({ pizzaObject }) => {
  return (
    <li className={`pizza ${pizzaObject.soldOut && "sold-out"}`}>
      <img src={pizzaObject.photoName} alt={pizzaObject.name} />
      <div>
        <h3>{pizzaObject.name}</h3>
        <p>{pizzaObject.ingredients}</p>
        {pizzaObject.soldOut ? (
          <span>SOLD OUT!</span>
        ) : (
          <span>${pizzaObject.price}</span>
        )}
      </div>
    </li>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
