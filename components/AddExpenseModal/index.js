import { useEffect } from 'react';
import styles from './addexpensemodal.module.css';

const AddExpenseModal = ({ hideModal }) => {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        hideModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [hideModal]);

  return (
    <>
      <div onClick={hideModal} className={styles.AddExpenseModalShadow}></div>
      <div
        style={{ transform: 'translateY(0%)' }}
        className={styles.AddExpenseModal}
      >
        <div className={styles.AddExpenseModalContent}>
          <h2>Add Subscription</h2>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Netflix" />

          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            placeholder="600"
            min={0}
            max={9999}
          />

          <label htmlFor="note">Notes (optional)</label>
          <input type="text" id="note" />

          <div className={styles.AddExpenseAction}>
            <button onClick={hideModal}>Cancel</button>
            <button onClick={hideModal}>Add</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpenseModal;
