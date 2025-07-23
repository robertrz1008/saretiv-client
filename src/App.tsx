import ProtectedRoute from './view/pages/RouteProtected'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./view/pages/RegisterPage";
import './App.css'
import MainPage from './view/pages/MainPage';
import UsersPage from './view/pages/main/register/UsersPage';
import "./view/styles/main.css"
import ClientPage from './view/pages/main/register/CustomerPage';
import Home from './view/pages/main/Home';
import CategoryProduct from './view/pages/main/register/CategoryProductPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<MainPage/>}>
            <Route path='Admin' element={<Home/>}/>
            <Route path='Usuarios' element={<UsersPage/>}/>
            <Route path='Clientes' element={<ClientPage/>}/>
            <Route path='CategoriasProducto' element={<CategoryProduct/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App