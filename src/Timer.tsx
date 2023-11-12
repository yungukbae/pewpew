import { Box } from "@mui/material";
import { useEffect } from "react";
import useTimer from "./hooks/useTimer";

interface Props {
  count: number;
  timeOutFn: () => void;
}

const Timer = ({ count, timeOutFn }: Props) => {
  const { time, timeOut } = useTimer({ count });

  useEffect(() => {
    timeOut && timeOutFn();
  }, [timeOut, timeOutFn]);

  return <Box>{time}</Box>;
};
export default Timer;
