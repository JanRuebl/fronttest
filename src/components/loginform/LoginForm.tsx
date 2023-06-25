import { useState } from "react";
import styles from "./styles.module.scss";

const { fieldwrapper, form, login, button } = styles;

const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (email: string, password: string) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(email, password);
  };

  return (
    <div className={login}>
      <form className={form} onSubmit={handleSubmit}>
        <div className={fieldwrapper}>
          <label>
            Email Address
            <input
              required
              onChange={handleEmailChange}
              value={email}
              type='email'
              name='email'
              id='email'
            />
          </label>
          <label>
            Password
            <input
              required
              onChange={handlePasswordChange}
              type='password'
              value={password}
              name='password'
              id='password'
            />
          </label>
        </div>

        <button className={button} type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
