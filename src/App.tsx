import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutRouter from './components/LayoutRouter'
import Login from './pages/Login'
import Event from './pages/Event'

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutRouter />}>
        <Route path="login" element={<Login />} />
        <Route path="event" element={<Event />} />
        <Route path="*" element={<Navigate to={'/event'} replace />} />
        <Route path="/" element={<Navigate to={'/event'} replace />} />
      </Route>
    </Routes>
  )
}

export default App
