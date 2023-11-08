import { Box, Button, Stack, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import Timer from "./Timer";
import Level1 from "./components/level1";
import Level2 from "./components/level2";
import Level3 from "./components/level3";
import Level4 from "./components/level4";
import { GameContext } from "./context";
import useAudio from "./hooks/useAudio";
import { randNum } from "./util/random";

export enum GAME_STATE {
  IDLE = "IDLE",
  PENDING = "PENDING",
  PLAYING = "PLAYING",
  FINISH = "FINISH",
}

const Pointer = {
  1: <Level1 />,
  2: <Level2 />,
  3: <Level3 />,
  4: <Level4 />,
};

function App() {
  const { loaded, audios } = useAudio({ shot: "/sound/shotting_sound.mp3" });
  const [state, setState] = useState<GAME_STATE>(GAME_STATE.IDLE);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: randNum(1000),
    y: randNum(600),
  });
  const ctx = useContext(GameContext);
  const handleHitMiddle = useCallback(
    (x: boolean) => {
      if (x) {
        ctx.handlePointAim({ point: 10, aim: 1 });
        setPosition({ x: randNum(1000), y: randNum(600) });
      } else {
        ctx.handlePointAim({ point: 5, aim: 0.5 });
        setPosition({ x: randNum(1000), y: randNum(600) });
      }
    },
    [ctx]
  );

  useEffect(() => {
    const handleClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLDivElement;
      if (state === GAME_STATE.PLAYING && target) {
        const name = target.className;
        const hit = name.match(/edge|center/);
        audios.get("shot")?.();
        if (hit?.[0] === "edge") {
          handleHitMiddle(false);
        } else if (hit?.[0] === "center") {
          handleHitMiddle(true);
        } else {
          ctx.handlePointAim({ point: 10, aim: 0 });
        }
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [audios, ctx, handleHitMiddle, position, state]);

  return (
    <>
      <div className="App">
        <Box
          width={1100}
          height={700}
          sx={{
            position: "relative",
            border: "1px solid gray",
            cursor: "crosshair",
          }}
        >
          {state === GAME_STATE.FINISH && (
            <Stack
              direction={"column"}
              alignItems={"center"}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <Typography>에임정확도: {ctx.aim}</Typography>
              <Typography>포인트: {ctx.point}</Typography>
              <Typography>이름:{ctx.name}</Typography>
            </Stack>
          )}
          {state === GAME_STATE.IDLE && (
            <Button
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
              variant="contained"
              onClick={() => setState(GAME_STATE.PENDING)}
            >
              게임 시작
            </Button>
          )}
          {state === GAME_STATE.PENDING && (
            <Stack
              direction={"column"}
              alignItems={"center"}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <Typography align="center" variant="h5">
                {ctx.stage !== 4 ? `Round ${ctx.stage}` : "Final Round"}
              </Typography>
              <Typography align="center">게임이 곧 시작됩니다!</Typography>
              <Timer
                count={5}
                timeOutFn={() => {
                  setState(GAME_STATE.PLAYING);
                }}
              />
            </Stack>
          )}
          {state === GAME_STATE.PLAYING && (
            <Box
              sx={{
                position: "absolute",
                left: position?.x,
                top: position?.y,
              }}
            >
              {Pointer[ctx.stage as keyof typeof Pointer]}
            </Box>
          )}
        </Box>
      </div>
      <Stack direction={"row"} gap={1} p={1}>
        {state === GAME_STATE.PLAYING && (
          <Typography>
            남은시간:
            <Timer
              count={10}
              timeOutFn={() => {
                if (ctx.stage === 4) {
                  setState(GAME_STATE.FINISH);
                } else {
                  ctx.nextStage();
                  setState(GAME_STATE.PENDING);
                }
              }}
            />
          </Typography>
        )}
      </Stack>
    </>
  );
}

export default App;
