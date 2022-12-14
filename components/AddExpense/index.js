import { useState } from 'react';
import AddExpenseModal from '../AddExpenseModal';
import styles from './addexpense.module.css';

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
    <path d="M10 15.833q-.354 0-.615-.26-.26-.261-.26-.615v-4.083H5.042q-.354 0-.615-.26-.26-.261-.26-.615t.26-.615q.261-.26.615-.26h4.083V5.042q0-.354.26-.615.261-.26.615-.26t.615.26q.26.261.26.615v4.083h4.083q.354 0 .615.26.26.261.26.615t-.26.615q-.261.26-.615.26h-4.083v4.083q0 .354-.26.615-.261.26-.615.26Z" />
  </svg>
);

const AddExpense = () => {
  const [showModal, setShowModal] = useState(true);

  const hideModal = () => {
    setShowModal(false);
  };

  const submit = async (data) => {
    try {
      await fetch(`/api/subscription/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      await Router.push('/drafts');
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(false);
    }
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
      {showModal ? (
        <AddExpenseModal hideModal={hideModal} submit={submit} />
      ) : null}
    </>
  );
};

export default AddExpense;
