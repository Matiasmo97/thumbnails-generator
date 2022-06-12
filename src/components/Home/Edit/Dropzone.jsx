/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useRef } from "react";
import styles from "../../styles/dropzone.module.css";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import download from "downloadjs";
import animation_image from "../../../img/animation_image.gif";
import "animate.css";
import Edit from "./Edit-image";
import { toPng } from "html-to-image";

function Dropzone() {
  const [image, setImage] = useState([]);
  const extens = ["image/jpeg", "image/png"];
  const img = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const fileType = file.type;
      const overallSize = file.size / 1048576;

      if (overallSize < 5) {
        if (extens.includes(fileType)) {
          const reader = new FileReader();

          reader.onload = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          Swal.fire({
            icon: "error",
            title: "File format not allowed, must be (.png, .jpeg)",
            showConfirmButton: true,
            heightAuto: false,
            timer: 3000,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Allowed size exceeded",
          showConfirmButton: true,
          heightAuto: false,
          timer: 3000,
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

  return (
    <div className="animate__animated animate__backInDown">
      <div>
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
          <div className={styles.image_edit}>
            <img ref={img} src={image} alt="image" width={400} />
            <Button onClick={() => handleDownload(img)} variant="contained">
              Download
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Dropzone;
