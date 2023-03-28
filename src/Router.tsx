import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { ToDoApp } from "./pages/ToDoApp";

export function Router() {
  return(
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/todos" element={<ToDoApp />} />
    </Routes>
  )
}