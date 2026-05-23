import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Obras from './pages/Obras';
import Sobre from './pages/Sobre';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EsqueciSenha from './pages/EsqueciSenha';
import ObrasDetalhe from './pages/ObrasDetalhe';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Perfil from './pages/Perfil';
import AdminCodigo from './pages/AdminCodigo';
import AdminUsuarios from './pages/AdminUsuarios';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/obras" element={<Obras />} />
      <Route path="/obras/:id" element={<ObrasDetalhe />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/gestor" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      
      {/* Rotas protegidas */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
      <Route path="/admin/codigo" element={<PrivateRoute admin><AdminCodigo /></PrivateRoute>} />
      <Route path="/admin/usuarios" element={<PrivateRoute admin><AdminUsuarios /></PrivateRoute>} />

      {/* Rota 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
