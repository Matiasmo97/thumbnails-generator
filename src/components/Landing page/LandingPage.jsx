import React from "react";
import image from "../../img/animation.svg";
import styles from "../styles/landing-page.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Stack } from "@mui/material";

function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.container_landing}>
      <div className={styles.content}>
        <div className={styles.content_landing}>
          <h1 className={styles.name_thumbnail}>
            <span className={styles.name_one}>Thumbnail</span>
            <span className={styles.name_two}>Generator</span>
          </h1>
          <Stack direction="row" spacing={2}>
            <Button onClick={() => loginWithRedirect()} variant="contained">
              Login
            </Button>
          </Stack>
        </div>
        <img className={styles.image_landing} src={image} alt="images" />
      </div>
    </div>
  );
}

export default LandingPage;
