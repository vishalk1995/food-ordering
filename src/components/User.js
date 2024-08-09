import { useState } from 'react';

const User = (pps) => {
  const [count, setCount] = useState(0);
  return (
    <div className="user-card">
      <h1>Count = {count}</h1>
      <h2>Name: {pps.name}</h2>
      <h3>Location: Delhi</h3>
      <h4>Contact: vkumar47 on LinkedIn</h4>
    </div>
  );
};

export default User;
