import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navbar } from '../navbar';
import { Home } from '../pages/Home';
import { Clientes } from '../pages/Clientes';
import { Carros } from '../pages/Carros';
import { Aluguel } from '../pages/Aluguel';
import { Login } from '../pages/Login';
import PageNotFound from '../pages/NotFound/PageNotFound';

export function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Login />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="carros" element={<Carros />} />
          <Route path="aluguel" element={<Aluguel />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
