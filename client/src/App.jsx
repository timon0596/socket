import React from 'react';
import { Route } from 'react-router-dom';
import MenuAppBar from './components/Navbar/Navbar';
import SignIn from './components/LoginForm/LoginForm';
import Home from './pages/Home/Home';

function App() {
  return (
    <div>
      <MenuAppBar />
      <Route path="/" exact component={Home} />
      <Route path="/Login" exact component={SignIn} />
    </div>
  );
}

export default App;
