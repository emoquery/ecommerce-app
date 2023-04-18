import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Loading({ path = "login" }) {
  const [count, setCount] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 300);

    count === 0 && navigate(`/${path}`, { state: location.pathname });

    return () => clearInterval(interval);
  });

  return <div></div>;
}
