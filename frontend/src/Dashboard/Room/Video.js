import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import { Box } from '@mui/material';

const MainContainer = styled("div")(({ count }) => {
  let width = "100%";
  let height = "100%";

  if (count === 2) {
    width = "80%";
    height = "100%";
  } else if (count === 3 || count === 4) {
    width = "100%";
    height = "100%";
  }

  return {
    width,
    height,
    backgroundColor: "black",
    borderRadius: "8px",
    overflow: "hidden",
  };
});

const VideoEl = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
});

const Video = ({ stream, isLocalStream, index, count }) => {
  const videoRef = useRef();
  // const [isCameraOff, setIsCameraOff] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      
      if (videoTrack && videoTrack.enabled) {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
        };
        // setIsCameraOff(false); 
      } else {
        video.srcObject = null;
        // setIsCameraOff(true);  
      }
    }
  }, [stream]);

  // const showVideo =
  //   stream &&
  //   stream.getVideoTracks().length > 0 &&
  //   stream.getVideoTracks()[0].enabled;

  return (
    <MainContainer count={count} data-index={index}>
      {/* {showVideo ? ( */}
        <VideoEl autoPlay playsInline muted={isLocalStream} ref={videoRef} />
      {/* ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
          }}
        >
          <VideocamOffIcon sx={{ fontSize: 64, color: "white" }} />
        </Box>
      )} */}
    </MainContainer>
  );
};

export default Video;
