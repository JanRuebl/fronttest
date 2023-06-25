import useAuthCtx from "../../AuthCtx";

const Logout = () => {
  const { setLoggedIn, setUsername } = useAuthCtx();

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    localStorage.setItem("last", "");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
