import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Reviews from './components/Reviews';
import Contact from './components/Contact';

export default function App() {
  const [tema, setTema] = useState('dia');

  useEffect(() => {
    const hora = new Date().getHours();
    if (hora >= 18 || hora < 6) {
      setTema('noite');
    } else {
      setTema('dia');
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950">
      {/* CAMADA 1: Imagem DIA */}
      <div 
        style={{ backgroundImage: `url('/White.jpg')` }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
      />

      {/* CAMADA 2: Imagem NOITE */}
      <div 
        style={{ backgroundImage: `url('/Black.jpg')` }}
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-1000 ease-in-out ${
          tema === 'noite' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* CAMADA 3: Conteúdo Principal */}
      <div className={`relative z-10 min-h-screen transition-colors duration-1000 ${
        tema === 'noite' 
          ? 'bg-slate-950/75 text-amber-100' 
          : 'bg-amber-50/80 text-slate-900'
      }`}>
        
        {/* Uso da classe com @media queries do CSS */}
        <div className="container-responsivo">
          <Header tema={tema} setTema={setTema} />
          <Hero tema={tema} />
          <About tema={tema} />
          <Projects tema={tema} />
          <Reviews tema={tema} />
          <Contact tema={tema} />
        </div>

      </div>
    </div>
  );
}