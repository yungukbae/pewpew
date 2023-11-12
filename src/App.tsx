import { Box, Button, Stack, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import Damage from "./components/damage";
import Level1 from "./components/level1";
import Level2 from "./components/level2";
import Level3 from "./components/level3";
import Level4 from "./components/level4";
import Loader from "./components/loader";
import Pending from "./components/pending";
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
  const { audios } = useAudio({ shot: "/sound/shotting_sound.mp3" });
  const [state, setState] = useState<GAME_STATE>(GAME_STATE.IDLE);
  const [position, setPosition] = useState<{ left: number; top: number }>({
    left: randNum(1000),
    top: randNum(600),
  });
  const ctx = useContext(GameContext);
  const handleHitTarget = useCallback(
    (x: boolean) => {
      if (x) {
        ctx.handlePointAim({ point: 10, aim: 1 });
        setPosition({ left: randNum(1000), top: randNum(600) });
      } else {
        ctx.handlePointAim({ point: 5, aim: 0.5 });
        setPosition({ left: randNum(1000), top: randNum(600) });
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
          handleHitTarget(false);
        } else if (hit?.[0] === "center") {
          handleHitTarget(true);
        } else {
          ctx.handlePointAim({ point: -2, aim: 0 });
        }
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [audios, ctx, handleHitTarget, position, state]);

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
          {state === GAME_STATE.PLAYING && <Damage />}
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
            <Pending
              ctx={ctx}
              timeOutFn={() => {
                setState(GAME_STATE.PLAYING);
              }}
            />
          )}
          {state === GAME_STATE.PLAYING && (
            <Box
              sx={{
                position: "absolute",
                ...position,
              }}
            >
              {Pointer[ctx.stage as keyof typeof Pointer]}
            </Box>
          )}
        </Box>
      </div>
      {state === GAME_STATE.PLAYING && (
        <Loader
          timeOut={() => {
            if (ctx.stage === 4) {
              setState(GAME_STATE.FINISH);
            } else {
              ctx.nextStage();
              setState(GAME_STATE.PENDING);
            }
          }}
        />
      )}
    </>
  );
}

export default App;
