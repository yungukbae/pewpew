import { Box, Stack, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { useEffect, useRef } from "react";
import useTimer from "../hooks/useTimer";

interface Props {
  timeOut: () => void;
}

const Loader = ({ timeOut }: Props) => {
  const { time, timeOut: TO } = useTimer({ count: 10 });
  const isRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    TO && timeOut();
  }, [TO, timeOut]);

  return (
    <Stack
      direction={"row"}
      gap={1}
      sx={{
        position: "relative",
        width: "1100px",
        height: "20px",
        overflow: "hidden",
      }}
    >
      <Box
        ref={isRef}
        sx={{
          position: "absolute",
          right: `${(time - 0.1) * 10}%`,
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          transition: "all 0.1s ease-in-out",
        }}
      ></Box>
      <Typography
        variant="body1"
        color={time < 3 ? red[400] : blue[400]}
        sx={{ position: "absolute", right: 0 }}
      >
        {time}
      </Typography>
    </Stack>
  );
};

export default Loader;
