import './App.css';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import {
  Route,
  Routes,}
from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux/es/hooks/useSelector';
function App() {
  const user = useSelector((state)=>{
    return state.user;
})
localStorage.setItem("user",user);
  return (
    <div className="App">
    <Navigation />
      <Routes>
        <Route path='/' index element={<Home/>}/>
        <Route path='/signup' element ={<Signup/>}></Route>
        <Route path='/login' element ={<Login/>}></Route>
        <Route path='*' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
