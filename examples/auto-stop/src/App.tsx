import { useState } from "react";
import ScreenSaver from "screen-saver";

function App() {
  const [isActive, setIsActive] = useState(false);
  const ScreenSaverChildren = () => <h1>Screen Saver</h1>;
  return (
    <>
      <ScreenSaver
        isActive={isActive}
        setIsActive={setIsActive}
        autoStop
      />
      {isActive ? <h1>My App</h1> : ScreenSaverChildren()}
    </>
  );
}

export default App;
