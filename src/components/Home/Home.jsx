import { Button, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import image from "../../img/image.svg";
import styles from "../styles/home.module.css";
import style from "../styles/spinner.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className={style.container_spinner}>
        <div className={style.spinner}></div>
      </div>
    );
  }

  return (
    isAuthenticated && (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Hello {user.name}!</h1>
          <img src={image} alt="images" width={300} />
        </div>
        <Stack direction="row" spacing={2}>
          <NavLink className={styles.button_link} to="/home/dragdrop">
            <Button
              sx={{
                backgroundColor: "#036cce",
              }}
              variant="contained"
            >
              Generate thumbnails
            </Button>
          </NavLink>
          <NavLink className={styles.button_link} to="/home/image-edit">
            <Button
              sx={{
                backgroundColor: "#036cce",
              }}
              variant="contained"
            >
              Image edit
            </Button>
          </NavLink>
        </Stack>
      </div>
    )
  );
}

export default Home;
