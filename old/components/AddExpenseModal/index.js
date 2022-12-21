import { useEffect, useState } from 'react';

import styles from './addexpensemodal.module.css';

const AddExpenseModal = ({ hideModal, submit }) => {
  const [data, setData] = useState({
    name: 'Netflix',
    amount: '1',
    paid: '/ monthly',
    notes: 'Using Airtel fiber connection subscription',
  });

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        hideModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [hideModal]);

  const onChange = (key, event) => {
    const value = event.target.value;
    setData({ ...data, [key]: value });
  };

  const isDisabled = !data.name || !data.amount || data.amount < 0 || data.amount === '';

  return (
    <>
      <div onClick={hideModal} className={styles.AddExpenseModalShadow}></div>
      <div style={{ transform: 'translateY(0%)' }} className={styles.AddExpenseModal}>
        <div className={styles.AddExpenseModalContent}>
          <h2>Add Subscription</h2>
          <label htmlFor="name">Name</label>
          <input
            autoFocus
            type="text"
            id="name"
            placeholder="Eg. Netflix"
            value={data.name}
            onChange={(event) => {
              onChange('name', event);
            }}
          />
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              placeholder="600"
              min={0}
              max={9999}
              value={data.amount}
              onChange={(event) => {
                onChange('amount', event);
              }}
            />
            <select
              name="per"
              id="payment"
              value={data.paid}
              onChange={(event) => {
                onChange('paid', event);
              }}
            >
              <option value="montly">/ month</option>
              <option value="yearly">/ year</option>
            </select>
          </div>

          <label htmlFor="note">Description (optional)</label>
          <textarea
            value={data.notes}
            onChange={(event) => {
              onChange('notes', event);
            }}
          />

          <div className={styles.AddExpenseAction}>
            <button onClick={hideModal}>Cancel</button>
            <button
              disabled={isDisabled}
              onClick={() => {
                submit(data);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpenseModal;
