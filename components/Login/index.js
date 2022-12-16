import { useState } from 'react';
import { supabase } from 'lib/supabase';

import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');

  const handleLogin = async (email) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <div className={styles.Login}>
      <h1>Expense Tracker</h1>
      <div className={styles.LoginCard}>
        <h3>Login/Signup</h3>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin(email);
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="tim@apple.com"
            id="email"
            required
          />
          <button>Send magic link</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
