/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useRef } from "react";
import styles from "../../styles/dropzone.module.css";
import style from "../../styles/spinner.module.css";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import download from "downloadjs";
import animation_image from "../../../img/animation_image.gif";
import "animate.css";
import Edit from "./Edit-image";
import { toPng } from "html-to-image";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dropzone() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [image, setImage] = useState([]);
  const extens = ["image/jpeg", "image/png"];
  const img = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const fileType = file.type;
      const overallSize = file.size / 1048576;

      if (overallSize < 5 && extens.includes(fileType)) {
        const reader = new FileReader();

        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Size exceeded allowed or File not supported (png, jpeg)", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleDownload = async (images) => {
    const dataUrl = await toPng(images.current);
    download(dataUrl, "image.png");
  };

  if (isLoading) {
    return (
      <div className={style.container_spinner}>
        <div className={style.spinner}></div>
      </div>
    );
  }

  return (
    isAuthenticated && (
      <div>
        <div className={styles.button_back}>
          <NavLink className={styles.link} to={"/home"}>
            <Button variant="contained">Back</Button>
          </NavLink>
        </div>
        <div className={styles.container}>
          <div className={styles.container_dropZone}>
            <div className={styles.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop image</p>
              ) : (
                <p>You can drop your image here</p>
              )}
              <img src={animation_image} alt="animation" width={100} />
            </div>
          </div>
          <div>
            <Edit image={image} setImage={setImage} />
          </div>
        </div>
        {image.length > 0 ? (
          <div className="animate__animated animate__backInRight">
            <div className={styles.image_edit}>
              <img ref={img} src={image} alt="images" width={400} />
              <Button onClick={() => handleDownload(img)} variant="contained">
                Download
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
        <ToastContainer />
      </div>
    )
  );
}

export default Dropzone;
