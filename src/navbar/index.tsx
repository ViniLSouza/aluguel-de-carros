import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import './styles.scss';

function header() {
  return (
    <header className="navbar">
      <nav className="navbar__nav">
        <Link to="/" className="navbar__option">
          Home
        </Link>
        <Link to="/about" className="navbar__option">
          <span>About</span>
        </Link>
      </nav>
    </header>
  );
}

export function Navbar() {
  return (
    <BrowserRouter>
      {header()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
