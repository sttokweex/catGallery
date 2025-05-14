import { useState } from 'react';
import GlobalStyle from './styles/GlobalStoles';
import Header from './components/header/Header';
import CatGallery from './components/cat-gallery/CatGallery';

function App() {
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <>
      <GlobalStyle />
      <Header autoUpdate={autoUpdate} setAutoUpdate={setAutoUpdate} />
      <CatGallery autoUpdate={autoUpdate} />
    </>
  );
}

export default App;
