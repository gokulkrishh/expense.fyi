import styles from './addexpensemodal.module.css';

const AddExpenseModal = () => {
  return (
    <>
      <div className={styles.AddExpenseModalShadow}></div>
      <div className={styles.AddExpenseModal}>
        <div className={styles.AddExpenseModalContent}>
          <h2>Add Expense</h2>
          <label htmlFor="amount">
            Amount
            <input type="number" />
          </label>
          <label htmlFor="amount">
            Category
            <select>
              <option value="">Select a category</option>
              <option value="groceries">Groceries</option>
              <option value="home">Home</option>
              <option value="entertainment">Entertainment</option>
              <option value="car">Car</option>
              <option value="tech">Tech</option>
              <option value="subscription">Subscription</option>
              <option value="books">Books</option>
              <option value="clothing">Clothing</option>
              <option value="cafeandresturants">Cafes & Resturants</option>
              <option value="drinks">Drinks</option>
              <option value="snacks">Snacks</option>
              <option value="charity">Charity</option>
              <option value="savings">Savings</option>
              <option value="health">Health</option>
              <option value="medicine">Medicine</option>
            </select>
          </label>
          <label htmlFor="amount">
            Payment Mode
            <select>
              <option value="">Select a mode</option>
              <option value="debitcard">HDFC Debit Card</option>
              <option value="Paytm">Paytm Debit Card</option>
              <option value="netbanking">Netbanking</option>
              <option value="upi">UPI</option>
              <option value="creditcare">Slice Credit Card</option>
            </select>
          </label>
          <label htmlFor="amount">
            Name (optional)
            <input type="type" />
          </label>
        </div>
      </div>
    </>
  );
};

export default AddExpenseModal;
