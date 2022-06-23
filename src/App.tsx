import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutRouter from './components/LayoutRouter'
import Login from './pages/Login'
import Event from './pages/Event'
import { useAppSelector } from './hook/hook'

const App: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth)

  return (
    <Routes>
      <Route path="/" element={<LayoutRouter />}>
        <Route
          path="login"
          element={isAuth ? <Navigate to={'/event'} replace /> : <Login />}
        />
        <Route
          path="event"
          element={!isAuth ? <Navigate to={'/login'} replace /> : <Event />}
        />
        <Route path="*" element={<Navigate to={'/event'} replace />} />
        <Route path="/" element={<Navigate to={'/event'} replace />} />
      </Route>
    </Routes>
  )
}

export default App
