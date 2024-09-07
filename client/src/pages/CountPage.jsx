import axios from "axios";
import { useState } from "react";

const CountPage = () => {
 
  const [count, setCount] = useState(0);

  return (
    <div>
      <button value={count} onClick={(e) => setCount(e.target.value)}>Count: <span>{count}</span></button>
    </div>
  );
};

export default CountPage;
