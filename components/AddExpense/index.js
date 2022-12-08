import AddExpenseModal from '../AddExpenseModal';
import styles from './addexpense.module.css';

const AddExpense = () => {
  return (
    <>
      <button className={styles.AddExpense}>Add Expense</button>
      <AddExpenseModal />
    </>
  );
};

export default AddExpense;
