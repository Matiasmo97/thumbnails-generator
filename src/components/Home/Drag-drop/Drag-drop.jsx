/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useRef } from "react";
import styles from "../../styles/drag-drop.module.css";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import download from "downloadjs";
import animation_image from "../../../img/animation_image.gif";
import { resizeFile } from "../../utils/utils";
import "animate.css";


function DragDrop() {
  const [image, setImage] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [thumbnailTwo, setThumbnailTwo] = useState([]);
  const [thumbnailThree, setThumbnailThree] = useState([]);
  const [thumbnails, setThumbnails] = useState(false);
  const extens = ["image/jpeg", "image/png"];
  const img1 = useRef(null);
  const img2 = useRef(null);
  const img3 = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    setThumbnails(false);
    acceptedFiles.forEach((file) => {
      const fileType = file.type;
      const overallSize = file.size / 1048576;
      setThumbnail(file);
      
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


  const onChange = async () => {
    try {
      setThumbnail(await resizeFile(thumbnail, 300, 300));
      setThumbnailTwo(await resizeFile(thumbnail, 160, 160));
      setThumbnailThree(await resizeFile(thumbnail, 120, 120));
      setThumbnails(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async (images) => {
    download(images.current.src, "thumbnails.png");
  };

  return (
    <div className="animate__animated animate__backInDown">
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
            <div>
              {image.length > 0 ? (
                <div className="animate__animated animate__backInDown">
                  <div className={styles.image_update}>
                    <img
                      src={image}
                      width={230}
                      className={styles.image}
                      alt="images"
                    />
                    <Stack direction="row" spacing={2}>
                      <Button onClick={() => onChange()} variant="contained">
                        Generate thumbnails
                      </Button>
                    </Stack>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {thumbnails ? (
            <div className="animate__animated animate__backInRight">
              <div className={styles.container_thumbnails}>
                <p>Generated Thumbnails</p>
                <div className={styles.thumbnails}>
                  <div className={styles.content_thumbnails}>
                    <img
                      src={thumbnail}
                      ref={img1}
                      className={styles.image}
                      alt="images"
                    />
                    <Stack direction="row" spacing={2}>
                      <Button
                        onClick={() => handleDownload(img1)}
                        variant="contained"
                      >
                        Download
                      </Button>
                    </Stack>
                  </div>
                  <div className={styles.content_thumbnails}>
                    <img
                      src={thumbnailTwo}
                      ref={img2}
                      className={styles.image}
                      alt="images"
                    />
                    <Stack direction="row" spacing={2}>
                      <Button
                        onClick={() => handleDownload(img2)}
                        variant="contained"
                      >
                        Download
                      </Button>
                    </Stack>
                  </div>
                  <div className={styles.content_thumbnails}>
                    <img
                      src={thumbnailThree}
                      ref={img3}
                      className={styles.image}
                      alt="images"
                    />
                    <Stack direction="row" spacing={2}>
                      <Button
                        onClick={() => handleDownload(img3)}
                        variant="contained"
                      >
                        Download
                      </Button>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
    </div>
  );
}

export default DragDrop;
