import Logout from "../logout/Logout";
import styles from "./styles.module.scss";

const Header = ({
  loggedIn,
  username,
}: {
  loggedIn: boolean;
  username: string;
}) => {
  return (
    <header className={styles.header}>
      <h1>Product Organiser</h1>
      <div>
        {loggedIn && (
          <div className={styles.statusbox}>
            <div className='greeting'>Hello, {username}</div>
            <Logout />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
