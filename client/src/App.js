import './App.css';
import Home from "./Pages/Home";
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Logout from './Helpers/Logout';
import Registration from './Pages/Registration';
import Questions from './Pages/Questions';
import Profile from "./Pages/Profile";
import MyQuestions from './Pages/MyQuestions';
import Question from './Pages/Question';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/my-questions" element={<MyQuestions />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/question/:id" element={<Question />} />
      </Routes>
    </>
  );
}

export default App;
