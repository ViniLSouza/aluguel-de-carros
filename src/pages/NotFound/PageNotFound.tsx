import { CardDefault } from '../../components/CardDefault';
import { Link } from 'react-router-dom';
import './pageNotFound.scss';

export default function PageNotFound() {
  return (
    <CardDefault>
      <div className="page-not-found">
        <div className="page-not-found__emoji" aria-label="Rosto triste">
          😔
        </div>
        <div className="page-not-found__title">404</div>
        <div className="page-not-found__desc">
          Ops! Não encontramos a página que você procurava.
        </div>
        <div className="page-not-found__tip">
          Talvez o endereço esteja incorreto ou a página tenha sido removida.
          <br />
          Que tal voltar para a <Link to="/">página inicial</Link>?
        </div>
      </div>
    </CardDefault>
  );
}
