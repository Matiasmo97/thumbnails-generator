import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import image from "../../img/animation.svg"
import styles from "../styles/landing-page.module.css";

function LandingPage() {
  return (
    <div className={styles.container_landing}>
      <div className={styles.content}>
    <div className={styles.content_landing}>
      <h1 className={styles.name_thumbnail}>
        <span className={styles.name_one}>Thumbnail</span>
        <span className={styles.name_two}>Generator</span>
      </h1>
      <NavLink className={styles.button_landing} to="/home">
        <Stack direction="row" spacing={2}>
          <Button variant="contained">
            Login
          </Button>
        </Stack>
      </NavLink>
    </div>
      <img className={styles.image_landing} src={image} alt="images" />
      </div>
    </div>
  );
}

export default LandingPage;
