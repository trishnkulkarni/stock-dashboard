import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [email, setEmail] = useState(null);

  return email ? (
    <Dashboard email={email} setEmail={setEmail} />
  ) : (
    <Login setEmail={setEmail} />
  );
}

export default App;
