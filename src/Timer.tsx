import { Box } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  count: number;
  timeOutFn: () => void;
}

const Timer = ({ count, timeOutFn }: Props) => {
  const [time, setTime] = useState(count);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime((x) => Math.round((x - 0.1) * 100) / 100);
      } else {
        timeOutFn();
        clearInterval(timer);
      }
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [time, timeOutFn]);

  return <Box>{time}</Box>;
};
export default Timer;
