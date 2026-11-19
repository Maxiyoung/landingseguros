import { useState, useRef, useEffect } from 'react';
import { COBERTURAS_POR_RAMO } from './data/coberturas';
import { PRODUCTOR } from './config';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import LogosCompanias from './components/LogosCompanias';
import Planes from './components/Planes';
import Emergencia from './components/Emergencia';
import Footer from './components/Footer';
import BotonWhatsApp from './components/BotonWhatsApp';

export default function App() {
  const [ramo, setRamo] = useState('auto'); // 'auto' | 'moto'
  const [cotizadorHighlight, setCotizadorHighlight] = useState(false);
  const [formData, setFormData] = useState({
    auto: { marca: '', otraMarca: '', modelo: '', otroModelo: '', anio: '', otroAnio: '' },
    moto: { marca: '', otraMarca: '', modelo: '', otroModelo: '', anio: '', otroAnio: '' },
    gnc: false,
    cilindrada: 'Hasta 250cc',
    localidad: PRODUCTOR.localidadDefault,
    otraLocalidad: '',
    cobertura: {
      auto: COBERTURAS_POR_RAMO.auto[0].valor,
      moto: COBERTURAS_POR_RAMO.moto[0].valor
    }
  });

  const marcaSelectRef = useRef(null);
  const highlightTimerRef = useRef(null);
  const focusTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
      if (focusTimerRef.current) clearTimeout(focusTimerRef.current);
    };
  }, []);

  const handleRamoChange = (nuevoRamo) => {
    if (nuevoRamo === ramo) return;
    setRamo(nuevoRamo);
  };

  const irAlCotizador = (conResaltado = false) => {
    const cotizadorEl = document.getElementById('cotizador');
    if (cotizadorEl) {
      cotizadorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (conResaltado) {
      setCotizadorHighlight(true);
      if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
      highlightTimerRef.current = setTimeout(() => {
        setCotizadorHighlight(false);
      }, 1300);
    }
    if (focusTimerRef.current) clearTimeout(focusTimerRef.current);
    focusTimerRef.current = setTimeout(() => {
      marcaSelectRef.current?.focus({ preventScroll: true });
    }, 450);
  };

  const handleSeleccionarPlan = (nuevoRamo, valorCobertura) => {
    setRamo(nuevoRamo);
    setFormData((prev) => ({
      ...prev,
      cobertura: {
        ...prev.cobertura,
        [nuevoRamo]: valorCobertura
      }
    }));
    irAlCotizador(true);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col text-[#0F172A] selection:bg-[#6DA6C9]/30 relative z-10">
      <TopBar />
      <Header />

      <main className="flex-grow">
        <Hero
          ramo={ramo}
          onRamoChange={handleRamoChange}
          formData={formData}
          setFormData={setFormData}
          marcaSelectRef={marcaSelectRef}
          cotizadorHighlight={cotizadorHighlight}
        />
        <LogosCompanias />
        <Planes
          ramo={ramo}
          onRamoChange={handleRamoChange}
          onSeleccionarPlan={handleSeleccionarPlan}
        />
        <Emergencia />
      </main>

      <Footer />
      <BotonWhatsApp onIrAlCotizador={() => irAlCotizador(false)} />
    </div>
  );
}
