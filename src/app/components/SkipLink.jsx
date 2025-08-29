import { AppContext } from './AppContextProvider';
import { useContext } from 'react';

export default function SkipLink() {
  const { italian } = useContext(AppContext);

  return (
    <a tabIndex="0" href="#main-content" className="skip-link">
      {italian ? "Vai al contenuto principale" : 'Skip to main content'}
    </a>
  );
}
