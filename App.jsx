import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BmiForm from './pages/BmiForm'
import Result from './pages/Result'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bmi" element={<BmiForm />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}

export default App
