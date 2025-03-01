import '../styles/RecentTransactions.css';

export const RecentTransactions = () => {
  const transactions = [
    // Fetch recent transactions from an API
  ];

  return (
    <div>
      <h3>Recent Transactions</h3>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            {tx.amount} {tx.currency} sent to {tx.address}
          </li>
        ))}
      </ul>
    </div>
  );
};