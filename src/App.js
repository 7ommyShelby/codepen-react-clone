import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home';
import NewProjects from './components/NewProjects';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home/*' element={<Home />} />
        <Route path='/newproject' element={<NewProjects />} />
        <Route path='/*' element={<Navigate to={'/home'} />} />
      </Routes>
    </div>
  );
}

export default App;
