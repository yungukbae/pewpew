import { Box } from "@mui/material";

const Level4 = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "30px",
        height: "30px",
        borderRadius: "30px",
      }}
    >
      <Box
        className={"edge"}
        sx={{
          position: "absolute",
          width: "30px",
          height: "30px",
          borderRadius: "30px",
          background: "#ffd400",
          top: "0",
          left: "0",
        }}
      ></Box>
      <Box
        className={"center"}
        sx={{
          position: "absolute",
          width: "10px",
          height: "10px",
          borderRadius: "20px",
          background: "#CF0000",
          top: "10px",
          left: "10px",
        }}
      ></Box>
    </Box>
  );
};

export default Level4;
