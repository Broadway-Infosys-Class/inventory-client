import react, { useEffect } from "react";
import { useCookies } from "react-cookie";

const Cookie = () => {
  const [cookies, setCookie] = useCookies(["name"]);

  const setNewCookie = () => {
    setCookie("name", "Broadway", { path: "/" });
  };

  useEffect(() => {
    setNewCookie();
  }, []);
  return <h3>Welcome to react, {cookies.name} </h3>;
};

export default Cookie;
