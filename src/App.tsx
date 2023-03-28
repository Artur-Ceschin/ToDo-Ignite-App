import { BrowserRouter } from 'react-router-dom';
import { ToDoApp } from 'src/pages/ToDoApp';
import { SignIn } from './pages/SignIn';
import { Router } from './Router';

export function App() {
  return(
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
