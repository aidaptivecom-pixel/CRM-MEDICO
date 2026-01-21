import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import Calendar from './components/Calendar';
import RightPanel from './components/RightPanel';
import WhatsAppPage from './components/WhatsAppPage';
import TurnosPage from './components/TurnosPage';
import PacientesPage from './components/PacientesPage';
import FacturacionPage from './components/FacturacionPage';
import LoginPage from './components/LoginPage';

const stats = [
  { title: 'Turnos Hoy', value: '6', change: '+2 vs ayer' },
  { title: 'Pacientes Activos', value: '48', change: '+8%' },
  { title: 'Tasa Asistencia', value: '94.2%', change: '+1.8%' },
  { title: 'Facturado Mes', value: '$2.4M', change: '+12%' },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Check if user is already logged in
  useEffect(() => {
    const auth = localStorage.getItem('mindcare_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('mindcare_auth');
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const getPageTitle = () => {
    switch(currentPage) {
      case 'dashboard': return 'Bienvenido, Dr. Alejandro';
      case 'turnos': return 'Gestión de Turnos';
      case 'pacientes': return 'Pacientes';
      case 'whatsapp': return 'WhatsApp Business';
      case 'facturacion': return 'Facturación';
      default: return 'MindCare';
    }
  };

  const getPageSubtitle = () => {
    const today = new Date().toLocaleDateString('es-AR', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
    switch(currentPage) {
      case 'dashboard': return `Resumen de tu consultorio hoy, ${today}`;
      case 'turnos': return 'Administrá tu agenda y turnos';
      case 'pacientes': return 'Gestioná la información de tus pacientes';
      case 'whatsapp': return 'Inbox de mensajes y automatizaciones';
      case 'facturacion': return 'Facturación electrónica con ARCA';
      default: return '';
    }
  };

  const getButtonConfig = () => {
    switch(currentPage) {
      case 'dashboard': return { show: true, text: 'Nuevo Turno' };
      case 'turnos': return { show: true, text: 'Nuevo Turno' };
      case 'pacientes': return { show: true, text: 'Nuevo Paciente' };
      case 'whatsapp': return { show: false, text: '' };
      case 'facturacion': return { show: true, text: 'Nueva Factura' };
      default: return { show: false, text: '' };
    }
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <Calendar />
              </div>
              <div className="xl:col-span-1">
                <RightPanel />
              </div>
            </div>
          </>
        );
      case 'turnos':
        return <TurnosPage />;
      case 'pacientes':
        return <PacientesPage />;
      case 'whatsapp':
        return <WhatsAppPage />;
      case 'facturacion':
        return <FacturacionPage />;
      default:
        return (
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <p className="text-gray-500">Página en construcción</p>
          </div>
        );
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      {/* Single container with rounded corners */}
      <div className="bg-white rounded-[32px] min-h-[calc(100vh-32px)] shadow-sm flex overflow-hidden">
        {/* Sidebar inside the container */}
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />
        
        {/* Main content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Header 
            title={getPageTitle()}
            subtitle={getPageSubtitle()}
            showNewButton={buttonConfig.show}
            buttonText={buttonConfig.text}
            showNotifications={currentPage === 'dashboard'}
          />
          
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;