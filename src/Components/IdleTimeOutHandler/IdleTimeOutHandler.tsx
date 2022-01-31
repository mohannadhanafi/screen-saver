import { useEffect, useRef } from "react";
import { EVENTS } from "../../constants";

type IdleTimeOutHandlerProps = {
  onActive: () => void;
  onIdle: () => void;
  timeOutInterval?: number;
  isActive: boolean;
  autoStop: boolean;
  isPaused?: boolean;
};

const IdleTimeOutHandler = ({
  onActive,
  timeOutInterval = 6000,
  onIdle,
  autoStop = false,
  isActive,
  isPaused,
}: IdleTimeOutHandlerProps) => {
  let timer: number = 0;
  const _onIdleRef = useRef(onIdle);
  const _lastInteractionTimeRef = useRef(Date.now());
  const _onActiveRef = useRef(onActive);
  const events = EVENTS;

  /**
   * This function is for calculate the idle time
   * It calculates the difference between the current time and idle time
   * If the idle time is more than the interval time it starts the the screen saver by (_onIdleRef.current();)
   */
  const startTimer = () => {
    _lastInteractionTimeRef.current = Date.now();
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      let lastInteractionTime = _lastInteractionTimeRef.current;
      const diff = Date.now() - lastInteractionTime;
      if (diff > timeOutInterval && !isPaused) {
        _onIdleRef.current();
      }
    }, timeOutInterval);
  };

  const eventHandler = () => {
    if (timer) {
      console.log({autoStop});
      if (autoStop) {
        console.log("Hello from autoStop");
        onActive();
      }
      startTimer();
    }
  };

  const addEvents = () => {
    events.forEach((eventName) => {
      window.addEventListener(eventName, eventHandler);
    });
    startTimer();
  };

  const removeEvents = () => {
    events.forEach((eventName) => {
      window.removeEventListener(eventName, eventHandler);
    });
  };

  const handleOnActiveRefOnIdleRef = () => {
    _onIdleRef.current = onIdle;
    _onActiveRef.current = onActive;
  };

  useEffect(() => {
    startTimer();
  }, [isActive]);

  useEffect(() => {
    handleOnActiveRefOnIdleRef();
  }, [onActive, onIdle]);

  useEffect(() => {
    addEvents();
    return () => {
      removeEvents();
      clearTimeout(timer);
    };
  }, []);

  return null;
};

export default IdleTimeOutHandler;
