import { Box, Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

import styles from "../styles/home.module.css";


function Home() {
  return (
    <div className={styles.container}>
     <Box>
     <NavLink to="/home/dragdrop">
     <Button>Generate Thumbnails</Button>
     </NavLink>
     <NavLink to="/home/image-edit">
      <Button>Image edit</Button>
     </NavLink>
     </Box>
    </div>
  );
}

export default Home;
