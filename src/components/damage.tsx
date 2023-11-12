import { Box, keyframes } from "@mui/material";
import { useEffect, useState } from "react";

const fadeOut = keyframes`
    0%{
        opacity:1;
    }
    100%{
        opacity:0;
    }
`;

interface HitInf {
  point: number;
  x: number;
  y: number;
}

const Damage = () => {
  const [hit, setHit] = useState<HitInf[]>();

  useEffect(() => {
    const handleClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLDivElement;
      if (target) {
        const name = target.className;
        const hit = name.match(/edge|center/);
        if (hit?.[0] === "edge") {
          setHit((x) =>
            x
              ? [...x, { point: 5, x: ev.x, y: ev.y }]
              : [{ point: 5, x: ev.x, y: ev.y }]
          );
        } else if (hit?.[0] === "center") {
          setHit((x) =>
            x
              ? [...x, { point: 10, x: ev.x, y: ev.y }]
              : [{ point: 10, x: ev.x, y: ev.y }]
          );
        } else {
          setHit((x) =>
            x
              ? [...x, { point: -2, x: ev.x, y: ev.y }]
              : [{ point: -2, x: ev.x, y: ev.y }]
          );
        }
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {hit?.map((value, i) => {
        const { point, x, y } = value;
        return (
          <Box
            key={i}
            sx={{
              opacity: 0,
              position: "absolute",
              top: y - 40,
              left: x - 15,
              color: point < 0 ? "red" : "green",
              fontWeight: 700,
              fontSize: "22px",
              animation: `${fadeOut} ease-out 2s`,
            }}
          >
            {point === 10 ? "Expert!" : point === 5 ? "Good" : "Miss"}
          </Box>
        );
      })}
    </>
  );
};

export default Damage;
