import { Box } from "@mui/material";

const Level3 = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "50px",
        height: "50px",
        borderRadius: "30px",
      }}
    >
      <Box
        className={"edge"}
        sx={{
          position: "absolute",
          width: "50px",
          height: "50px",
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
          width: "15px",
          height: "15px",
          borderRadius: "20px",
          background: "#CF0000",
          top: "17.5px",
          left: "17.5px",
        }}
      ></Box>
    </Box>
  );
};

export default Level3;
