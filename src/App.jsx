import { useState, useRef } from 'react';
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
  const [formData, setFormData] = useState({
    auto: { marca: '', otraMarca: '', modelo: '', otroModelo: '' },
    moto: { marca: '', otraMarca: '', modelo: '', otroModelo: '' },
    anio: '',
    otroAnio: '',
    gnc: false,
    cilindrada: 'Hasta 250cc',
    localidad: PRODUCTOR.localidadDefault,
    cobertura: COBERTURAS_POR_RAMO.auto[0].valor
  });

  const marcaSelectRef = useRef(null);

  const handleRamoChange = (nuevoRamo) => {
    setRamo(nuevoRamo);
    setFormData((prev) => ({
      ...prev,
      cobertura: COBERTURAS_POR_RAMO[nuevoRamo][0].valor
    }));
  };

  const irAlCotizador = () => {
    const cotizadorEl = document.getElementById('cotizador');
    if (cotizadorEl) {
      cotizadorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      marcaSelectRef.current?.focus();
    }, 450);
  };

  const handleSeleccionarPlan = (nuevoRamo, valorCobertura) => {
    setRamo(nuevoRamo);
    setFormData((prev) => ({
      ...prev,
      cobertura: valorCobertura
    }));
    irAlCotizador();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EB] text-[#0F172A] selection:bg-[#6DA6C9]/30 relative">
      <TopBar />
      <Header />

      <main className="flex-grow">
        <Hero
          ramo={ramo}
          onRamoChange={handleRamoChange}
          formData={formData}
          setFormData={setFormData}
          marcaSelectRef={marcaSelectRef}
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
      <BotonWhatsApp onIrAlCotizador={irAlCotizador} />
    </div>
  );
}
