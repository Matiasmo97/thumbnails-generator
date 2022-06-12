/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useRef } from "react";
import styles from "../../styles/drag-drop.module.css";
import style from "../../styles/spinner.module.css";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import download from "downloadjs";
import animation_image from "../../../img/animation_image.gif";
import { resizeFile } from "../../utils/utils";
import { useAuth0 } from "@auth0/auth0-react";
import "animate.css";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DragDrop() {
  const { isAuthenticated, isLoading } = useAuth0();
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
                <img
                  src={animation_image}
                  alt="animation"
                  width={100}
                  height={100}
                />
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
        <ToastContainer />
      </div>
    )
  );
}

export default DragDrop;
