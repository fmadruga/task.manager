import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import PrivateRoutes from '../components/PrivateRoutes';
import TasksPage from '../pages/Tasks';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/tarefas' element={<PrivateRoutes><TasksPage /></PrivateRoutes>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;