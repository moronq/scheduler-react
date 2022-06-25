import { FC, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutRouter from './components/LayoutRouter'
import { useAppDispatch, useAppSelector } from './hooks/hook'
import Event from './pages/Event'
import Login from './pages/Login'
import { setAuth, setUser } from './store/slices/authSlice'
import { UserType } from './types/UserTypes'

const App: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(
        setUser({ username: localStorage.getItem('user' || '') } as UserType)
      )
      dispatch(setAuth(true))
    }
  }, [])

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
