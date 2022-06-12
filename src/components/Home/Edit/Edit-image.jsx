import CropIcon from "@mui/icons-material/Crop";
import {
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/utils";
import styles from "../../styles/dropzone.module.css";



function Edit({ image, setDrop, setImage }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { url } = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setImage(url);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div >
      <DialogContent
        dividers
        sx={{
          background: "#333",
          position: "relative",
          height: 400,
          width: "auto",
          minWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: "column",
          mx: 2,
          my: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            mb: 1,
          }}
        >
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={cropImage}
          >
            Crop
          </Button>
        </Box>
      </DialogActions>
    </div>
  );
}

export default Edit;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
