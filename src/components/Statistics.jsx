import '../styles/Statistics.css';

export const Statistics = () => {
  const lifetimeVolume = 1000000; // Fetch this data from an API
  const dailyVolume = 100000; // Fetch this data from an API

  return (
    <div>
      <h3>Lifetime Volume Swapped</h3>
      <p>${lifetimeVolume.toLocaleString()}</p>
      <h3>Past 24-Hour Volume</h3>
      <p>${dailyVolume.toLocaleString()}</p>
    </div>
  );
};