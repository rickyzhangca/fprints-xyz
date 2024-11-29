import { logo } from '@/assets';
import { Link } from 'react-router-dom';
import fav from '/fav.svg';

export const Logo = () => {
  return (
    <Link to="/" className="shrink-0">
      <img
        src={logo}
        alt="logo"
        className="hidden h-11 transition duration-75 active:translate-y-1 active:scale-95 sm:block"
      />
      <img
        src={fav}
        alt="logo"
        className="h-11 transition duration-75 active:translate-y-1 active:scale-95 sm:hidden"
      />
    </Link>
  );
};
