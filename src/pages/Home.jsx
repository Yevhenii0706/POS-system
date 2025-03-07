import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <header>
        <div className="circle"></div>
        <div className="circles"></div>
        <a href="/" className="logo">
          Pos<span>System</span>
        </a>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </header>
      <div className="texts">
        <h1>
          POS <span>System</span>
        </h1>
      </div>
      <div className="background_image">
        <img style={{ height: "70%" }} src={require("../images/pos-bg.png")} alt="..." />
      </div>
      <footer style={{ position: "fixed", bottom: "0px", width: "100%" }}>
        <div >
          <p style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto", marginBottom: "30px", fontWeight: "bold", fontSize: "20px", color: "purple" }}>
            Copyright @Alina Kazi
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Home;
