import { Fragment } from 'react'
import { Routes, Route, Link } from "react-router-dom";

import HomePage from './pages/Home';
import APage from './pages/a';
import BPage from './pages/b';

import './styles/global.css'

const App = () => {

  return (
    <Fragment>
      <Link to='/'>Home</Link>
      <Link to='a'>AAAA</Link>
      <Link to='b'>BBBB</Link>
    
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/a" element={<APage />}></Route>
        <Route path="/b" element={<BPage />}></Route>
      </Routes>
    </Fragment>
  )
}

export default App