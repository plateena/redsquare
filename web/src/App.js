import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home.js'

function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/">
      Hello
      </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App