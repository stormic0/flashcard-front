import "./App.css";
import Title from "../Title/Title";
import { LoginContextProvider } from "./../../context/LoginContext/LoginContext";
import MainLayout from "../../layouts/MainLayout/MainLayout";

function App() {
  return (
    <div className="App">
      <LoginContextProvider>
        <Title />
        <MainLayout />
      </LoginContextProvider>
    </div>
  );
}

export default App;
