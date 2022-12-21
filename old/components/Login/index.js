import { useState } from 'react';
import { supabase } from 'lib/supabase';

import styles from './login.module.css';
import Spinner from '../Spinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [sendEmail, setSendEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLogin = async (email) => {
    setSendEmail(true);
    setHasError(false);
    setEmailSent(false);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setHasError(true);
        throw error;
      } else {
        setEmailSent(true);
      }
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setSendEmail(false);
      const id = setTimeout(() => {
        setEmailSent(false);
        setHasError(false);
        clearTimeout(id);
      }, 7000);
    }
  };

  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  return (
    <div className={styles.Login}>
      <h1 className='text-3xl font-bold underline'>Expense Tracker</h1>
      <div className={styles.LoginCard}>
        <h3>Login/Signup</h3>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin(email);
          }}
        >
          <label htmlFor='email'>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='tim@apple.com'
            id='email'
            required
          />

          <button
            className={sendEmail ? 'sending' : ''}
            disabled={!validateEmail(email) || sendEmail}
          >
            {sendEmail ? (
              <>
                <Spinner /> Sending...
              </>
            ) : (
              `Send magic link`
            )}
          </button>
        </form>
      </div>
      <p className={hasError ? 'error' : ''}>
        {emailSent ? 'Email is sent, check your email inbox to login.' : null}
        {hasError ? 'Error occurred, please try again.' : null}
      </p>
    </div>
  );
};

export default Login;
