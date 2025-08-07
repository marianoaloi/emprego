import DataTable from '@/components/DataTable';
import TopMenu from '@/components/TopMenu';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopMenu />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Employment data from backend server
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
}
