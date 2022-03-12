import Context from "./context";
import { useReducer } from "react";
import reducer, { init } from "./reducer";
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default Provider;
