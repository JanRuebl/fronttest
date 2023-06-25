import { useEffect } from "react";
import useAuthCtx from "./AuthCtx";
import Header from "./components/header/Header";
import Loginpage from "./pages/Loginpage";
import Productpage from "./pages/Productpage";
import "./styles/global.scss";

function App() {
  const { username, isLoggedIn, setLoggedIn, setUsername } = useAuthCtx();

  const quicklogin = (name: string) => {
    if (name !== "") {
      setUsername(name);
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    localStorage.getItem("last") && quicklogin(localStorage.getItem("last"));
  }, []);

  return (
    <>
      <Header loggedIn={isLoggedIn} username={username} />
      <main>{isLoggedIn ? <Productpage /> : <Loginpage />}</main>
    </>
  );
}

export default App;
