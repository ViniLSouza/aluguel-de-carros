import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Clientes } from '../pages/Clientes';
import PageNotFound from '../pages/NotFound/PageNotFound';
import './styles.scss';
import { Carros } from '../pages/Carros';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { Aluguel } from '../pages/Aluguel';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Button } from '@mui/material';
import { useState } from 'react';

function Header() {
  const [openNavbar, setOpenNavbar] = useState(true);
  return (
    <>
      <header className="navbar">
        <nav className={`navbar__nav${openNavbar ? ' navbar__nav--open' : ' navbar__nav--closed'}`}>
          <Link to="/" className="navbar__option">
            <div className="navbar__option-content">
              <HomeIcon />
              {openNavbar && <span>Home</span>}
            </div>
          </Link>
          <Link to="/clientes" className="navbar__option">
            <div className="navbar__option-content">
              <PersonIcon />
              {openNavbar && <span>Clientes</span>}
            </div>
          </Link>
          <Link to="/carros" className="navbar__option">
            <div className="navbar__option-content">
              <DriveEtaIcon />
              {openNavbar && <span>Carros</span>}
            </div>
          </Link>
          <Link to="/aluguel" className="navbar__option">
            <div className="navbar__option-content">
              <CarRentalIcon />
              {openNavbar && <span>Aluguel</span>}
            </div>
          </Link>
        </nav>
        <Button
          className="navbar__toggle-btn"
          onClick={() => {
            setOpenNavbar((prev) => !prev);
          }}
        >
          <KeyboardDoubleArrowLeftIcon
            className={openNavbar ? 'navbar__toggle-icon--open' : 'navbar__toggle-icon--closed'}
          />
        </Button>
      </header>
    </>
  );
}

export function Navbar() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/carros" element={<Carros />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/aluguel" element={<Aluguel />} />
      </Routes>
    </BrowserRouter>
  );
}
