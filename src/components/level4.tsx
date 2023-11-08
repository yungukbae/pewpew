import { Box } from "@mui/material";

interface Props {
  center?: () => void;
  edge?: () => void;
}

const Level4 = (props: Props) => {
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
        onClick={props.edge}
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
        onClick={props.center}
      ></Box>
    </Box>
  );
};

export default Level4;
