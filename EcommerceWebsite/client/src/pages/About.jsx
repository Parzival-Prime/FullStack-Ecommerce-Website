import React from "react";
import "../styles/about.css";
import { Typography } from "@mui/material";
import { useTheme } from "../theme/theme";

function About() {
  const theme = useTheme()
  return (
    <>
      <div className="about-container" style={{backgroundColor: theme.background2}}>
        <div className="about-box" style={{backgroundColor: theme.background, color: theme.heading}}>
          <Typography variant="h1" sx={{
            fontSize: '3rem', fontWeight: '500', fontFamily: 'var(--sansitaSwashed)', marginBottom: '1rem'
          }} className="about-title">About Us</Typography>
          <p className="about-text" style={{color: theme.heading2}}>
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
          <img src="/image3wisperingwillow.png" alt="image" className="about-image" />
        </div>
      </div>
    </>
    
  );
}

export default About;
