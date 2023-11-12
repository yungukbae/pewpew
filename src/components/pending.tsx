import { Stack, Typography } from "@mui/material";
import Timer from "../Timer";
import { GameCtxProps } from "../context";

interface Props {
  ctx: GameCtxProps;
  timeOutFn: () => void;
}

const Pending = ({ ctx, timeOutFn }: Props) => {
  return (
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
      <Typography
        align="center"
        variant="body2"
        fontWeight={700}
        color={ctx.stage !== 4 ? "primary" : "red"}
      >
        {ctx.stage !== 4 ? `ROUND ${ctx.stage}` : "Final Round"}
      </Typography>
      <Typography variant="h5" align="center">
        게임이 곧 시작됩니다!
      </Typography>
      <Timer count={5} timeOutFn={timeOutFn} />
    </Stack>
  );
};
export default Pending;
