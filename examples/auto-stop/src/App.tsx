import { useState } from "react";
import ScreenSaver from "screen-saver";

function App() {
  console.log(555555555555);
  const [isActive, setIsActive] = useState(false);
  const ScreenSaverChildren = () => <h1>Screen Saver</h1>;
  return (
    <>
      <ScreenSaver
        isActive={isActive}
        setIsActive={setIsActive}
        autoStop
      />
      {!isActive ? <h1>My App</h1> : ScreenSaverChildren()}
    </>
  );
}

export default App;
