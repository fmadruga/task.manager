import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import PrivateRoutes from '../components/PrivateRoutes';
import TasksPage from '../pages/Tasks';
import { TaskFormPage } from '../pages/Tasks/form';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/tarefas' element={<PrivateRoutes><TasksPage /></PrivateRoutes>} />
        <Route path='/tarefa' element={<PrivateRoutes><TaskFormPage /></PrivateRoutes>} />
        <Route path='/tarefa/editar/:uuid' element={<PrivateRoutes><TaskFormPage /></PrivateRoutes>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;