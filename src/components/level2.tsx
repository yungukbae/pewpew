import { Box } from "@mui/material";

interface Props {
  center?: () => void;
  edge?: () => void;
}

const Level2 = (props: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "70px",
        height: "70px",
        borderRadius: "50px",
      }}
    >
      <Box
        className={"edge"}
        sx={{
          position: "absolute",
          width: "70px",
          height: "70px",
          borderRadius: "50px",
          background: "#ffd400",
          top: "0",
          left: "0",
        }}
        onClick={props.edge}
      ></Box>
      <Box
        className={"center"}
        sx={{
          position: "absolute",
          width: "30px",
          height: "30px",
          borderRadius: "20px",
          background: "#CF0000",
          top: "20px",
          left: "20px",
        }}
        onClick={props.center}
      ></Box>
    </Box>
  );
};

export default Level2;
