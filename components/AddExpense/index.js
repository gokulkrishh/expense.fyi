import { useState } from 'react';
import AddExpenseModal from '../AddExpenseModal';
import styles from './addexpense.module.css';

const AddExpense = () => {
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className={styles.AddExpense}
      >
        Add Expense
      </button>
      {showModal ? <AddExpenseModal hideModal={hideModal} /> : null}
    </>
  );
};

export default AddExpense;
