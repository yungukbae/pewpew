import { Box } from "@mui/material";

interface Props {
  center?: () => void;
  edge?: () => void;
}

const Level1 = (props: Props) => {
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
        onClick={props.edge}
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
        onClick={props.center}
      ></Box>
    </Box>
  );
};

export default Level1;
