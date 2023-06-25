import useAuthCtx from "../AuthCtx";
import LoginForm from "../components/loginform/LoginForm";

const Loginpage = () => {
  const { setLoggedIn, setUsername } = useAuthCtx();
  const handleLoginSubmit = (email: string, password: string) => {
    //  MOCK !
    if (
      (email === "max@mustermann.de" || email === "peter@beispiel.de") &&
      password === "123"
    ) {
      const username = email === "max@mustermann.de" ? "Max" : "Peter";
      setLoggedIn(true);
      setUsername(username);
      localStorage.setItem("last", username);
      !localStorage.getItem(username) &&
        localStorage.setItem(username, JSON.stringify({ products: {} }));
    } else {
      throw new Error("email or password incorrect");
    }
  };

  return (
    <>
      <h1>Login with max@mustermann.de</h1>
      <h1>or</h1>
      <h1>Login with peter@beispiel.de</h1>
      <h1>password: 123</h1>
      <h1>&#8595;</h1>
      <LoginForm onSubmit={handleLoginSubmit} />
    </>
  );
};

export default Loginpage;
