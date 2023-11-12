import { useEffect, useState } from "react";

interface Props {
  count: number;
}

const useTimer = (props: Props) => {
  const { count } = props;
  const [time, setTime] = useState(count);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime((x) => Math.round((x - 0.1) * 100) / 100);
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return { time, timeOut: time <= 0 };
};

export default useTimer;
