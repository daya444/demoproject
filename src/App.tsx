import React from 'react';
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom'

import './App.css';
import { Navbar } from './components/Navbar';
import { Createpost } from './pages/create-post/create-post';
import { Login } from './pages/Login';
import { Main } from './main/main';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createpost' element={<Createpost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
