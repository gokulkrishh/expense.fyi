import styles from './addexpensemodal.module.css';

const AddExpenseModal = ({ hideModal }) => {
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
          <input type="text" id="name" />
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" />
          <label htmlFor="type">Category</label>
          <select id="type">
            <option value="">Select a service</option>
            <option value="netflix">Netflix</option>
            <option value="spotify">Spotify</option>
          </select>
          <label htmlFor="payment-mode">Payment mode</label>
          <select id="payment-mode">
            <option value="">Select a mode</option>
            <option value="creditcard">Credit Card</option>
            <option value="debitcard">Debit Card</option>
            <option value="netbanking">Netbanking</option>
            <option value="upi">UPI</option>
          </select>
          <div className={styles.AddExpenseAction}>
            <button onClick={hideModal}>Cancel</button>
            <button onClick={hideModal}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpenseModal;
