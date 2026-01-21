import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import Calendar from './components/Calendar';
import RightPanel from './components/RightPanel';

const stats = [
  { title: 'Turnos Hoy', value: '8', change: '+2 vs ayer' },
  { title: 'Pacientes Activos', value: '124', change: '+12%' },
  { title: 'Tasa Asistencia', value: '94.2%', change: '+1.8%' },
  { title: 'Facturado Mes', value: '$850k', change: '+75%' },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      
      <main className="md:ml-64 p-6 lg:p-8">
        <Header />
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <Calendar />
          </div>
          <div className="xl:col-span-1">
            <RightPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;