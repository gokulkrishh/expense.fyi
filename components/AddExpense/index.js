import { useState } from 'react';
import AddExpenseModal from '../AddExpenseModal';
import styles from './addexpense.module.css';

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
    <path d="M10 15.833q-.354 0-.615-.26-.26-.261-.26-.615v-4.083H5.042q-.354 0-.615-.26-.26-.261-.26-.615t.26-.615q.261-.26.615-.26h4.083V5.042q0-.354.26-.615.261-.26.615-.26t.615.26q.26.261.26.615v4.083h4.083q.354 0 .615.26.26.261.26.615t-.26.615q-.261.26-.615.26h-4.083v4.083q0 .354-.26.615-.261.26-.615.26Z" />
  </svg>
);

const AddExpense = () => {
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        title="Add subscription"
        onClick={() => {
          setShowModal(true);
        }}
        className={styles.AddExpense}
      >
        {AddIcon()} Add
      </button>
      {showModal ? <AddExpenseModal hideModal={hideModal} /> : null}
    </>
  );
};

export default AddExpense;
