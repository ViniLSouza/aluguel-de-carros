import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CarRentalIcon from '@mui/icons-material/CarRental';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import './styles.scss';
import { CardDefault } from '../components/CardDefault';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Actions } from '../store/ducks/authDuck';

interface NavLink {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_LINKS: NavLink[] = [
  { to: '/', label: 'Home', icon: <HomeIcon /> },
  { to: '/clientes', label: 'Clientes', icon: <PersonIcon /> },
  { to: '/carros', label: 'Carros', icon: <DriveEtaIcon /> },
  { to: '/aluguel', label: 'Aluguel', icon: <CarRentalIcon /> },
];

function Header() {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);

  const toggleNavbar = () => setIsOpen((prev) => !prev);
  const handleLogout = () => dispatch(Actions.logout());

  return (
    <header className="navbar">
      <nav className={`navbar__nav ${isOpen ? 'navbar__nav--open' : 'navbar__nav--closed'}`}>
        {NAV_LINKS.map((link) => (
          <Link key={link.to} to={link.to} className="navbar__option">
            <Button className="navbar__toggle-btn" type="button" aria-label="Toggle menu">
              <div className="navbar__option-content">
                {link.icon}
                {isOpen && <span>{link.label}</span>}
              </div>
            </Button>
          </Link>
        ))}
      </nav>
      <div>
        {isAuthenticated && (
          <Button className="navbar__toggle-btn" onClick={handleLogout} aria-label="Logout">
            Sair
          </Button>
        )}
        <Button className="navbar__toggle-btn" onClick={toggleNavbar} aria-label="Toggle menu">
          <KeyboardDoubleArrowLeftIcon
            className={isOpen ? 'navbar__toggle-icon--open' : 'navbar__toggle-icon--closed'}
          />
        </Button>
      </div>
    </header>
  );
}

export function Navbar() {
  return (
    <>
      <Header />
      <CardDefault>
        <Outlet />
      </CardDefault>
    </>
  );
}
