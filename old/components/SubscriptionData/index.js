const SubscriptionData = ({ data = [] }) => {
  if (!data.length) {
    return <div>No subscription added yet!</div>;
  }
  return (
    <div>
      {data.map((datum) => {
        return (
          <div key={datum.id}>
            <p>{datum.name}</p>
            <p>{datum.price}</p>
            <p>{datum.paid}</p>
            <p>{datum.notes}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionData;
