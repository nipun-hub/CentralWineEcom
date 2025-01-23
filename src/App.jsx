import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import RouterSet from "./routes/RouterSet";
import { Toaster } from "react-hot-toast";
import {useSelector } from "react-redux";



function App() {
  const { theme } = useContext(ThemeContext);
  const user = useSelector((state) => (state.auth.userId));

  console.log(user)

  return (
    <div
      style={{
        background: theme.background,
        color: theme.textColor,
        height: "100vh"
      }}
    >
      <RouterSet />
      <Toaster />
    </div>
  );
}

export default App;
