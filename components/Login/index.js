import styles from './login.module.css';

const Login = () => {
  return (
    <div className={styles.Login}>
      <h1>Expense Tracker</h1>
      <div className={styles.LoginCard}>
        <h3>Login/Signup</h3>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="tim@apple.com" id="email" required />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
