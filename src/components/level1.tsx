import { Box } from "@mui/material";

const Level1 = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100px",
        height: "100px",
        borderRadius: "50px",
      }}
    >
      <Box
        className={"edge"}
        sx={{
          position: "absolute",
          width: "100px",
          height: "100px",
          borderRadius: "50px",
          background: "#ffd400",
          top: "0",
          left: "0",
        }}
      ></Box>
      <Box
        className={"center"}
        sx={{
          position: "absolute",
          width: "50px",
          height: "50px",
          borderRadius: "50px",
          background: "#FF0000",
          top: "25px",
          left: "25px",
        }}
      ></Box>
    </Box>
  );
};

export default Level1;
