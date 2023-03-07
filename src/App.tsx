import { Routes, Route } from 'react-router-dom'

import HomePage from 'pages/Home'
import ControlPage from 'pages/Control'
import APage from 'pages/a'

import 'styles/global.css'

import 'styles/map.css'

import 'styles/app-layout.css'
import 'styles/control-layout.css'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/control" element={<ControlPage />}></Route>
      <Route path="/extra" element={<APage />}></Route>
    </Routes>
  )
}

export default App
