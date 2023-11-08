import { PropsWithChildren, createContext, useState } from "react";

interface GameCtxProps extends State {
  handlePointAim: (x: { point: number; aim: number }) => void;
  handleName: (x: string) => void;
  nextStage: () => void;
}

interface State {
  point: number;
  aim: number;
  hit: number;
  stage: number;
  name?: string;
}

export const GameContext = createContext<GameCtxProps>({
  point: 0,
  aim: 0,
  hit: 0,
  stage: 0,
  handlePointAim: () => {},
  handleName: () => {},
  nextStage: () => {},
});

export const GameProvider = (props: PropsWithChildren) => {
  const [state, setState] = useState<State>({
    point: 0,
    hit: 0,
    aim: 0,
    stage: 1,
  });

  const handlePointAim = ({ point, aim }: { point: number; aim: number }) => {
    if (point > 0) {
      setState({
        ...state,
        point: state.point + point,
        aim: state.aim + aim,
        hit: state.hit + 1,
      });
    } else {
      setState({
        ...state,
        point: state.point + point,
        aim: state.aim + aim,
      });
    }
  };

  const nextStage = () => {
    setState({ ...state, stage: state.stage + 1 });
  };

  const handleName = (x: string) => {
    setState({ ...state, name: x });
  };

  return (
    <GameContext.Provider
      value={{ ...state, handlePointAim, handleName, nextStage }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
