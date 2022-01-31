import React from "react";
import IdleTimeOutHandler from "./Components/IdleTimeOutHandler/IdleTimeOutHandler";

type ScreenSaverProps = {
  timeOutInterval?: number;
  setIsActive: (isActive: boolean) => void;
  autoStop?: boolean;
  isActive: boolean;
  isPaused?: boolean;
};

const ScreenSaver = ({
  timeOutInterval,
  setIsActive,
  autoStop = false,
  isActive,
  isPaused = false,
}: ScreenSaverProps) => {
  return (
    <IdleTimeOutHandler
      timeOutInterval={timeOutInterval}
      onActive={
        isPaused
          ? () => null
          : () => {
              setIsActive(true);
            }
      }
      onIdle={
        isPaused
          ? () => null
          : () => {
              setIsActive(false);
            }
      }
      autoStop={autoStop}
      isActive={isActive}
      isPaused={isPaused}
    />
  );
};

export default ScreenSaver;
