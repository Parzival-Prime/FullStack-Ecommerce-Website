import React from "react";
import "../styles/about.css";
import { Typography } from "@mui/material";

function About() {
  return (
    <>
      <div className="about-container">
        <div className="about-box">
          <Typography variant="h1" sx={{
            fontSize: '3rem', fontWeight: '500'
          }} className="about-title">About Us</Typography>
          <p className="about-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            mollitia saepe ipsum voluptas incidunt expedita accusamus nostrum
            reiciendis quod nobis optio distinctio, consectetur earum maxime,
            eaque excepturi neque, vero doloremque nesciunt alias. Porro earum
            sunt repudiandae quod non dolorem ullam odio reiciendis, ea
            dignissimos sint exercitationem error, ex aut maiores labore quasi
            cumque voluptates impedit odit voluptas.{" "}
          </p>
        </div>
        <div className="about-img-container">
          {/* <img src="\image1 (2).png" alt="image" className="about-image" /> */}
          <img src="/image3wisperingwillow.png" alt="image" className="about-image" />
        </div>
      </div>
    </>
    
  );
}

export default About;
