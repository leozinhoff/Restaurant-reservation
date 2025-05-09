import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Layout, BookOpen, TrendingUp, Settings } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';

const RestaurantDashboard: React.FC = () => {
  // Mock data for the dashboard
  const stats = [
    { name: 'Total Reservations', value: '124', change: '+12%', changeType: 'increase' },
    { name: 'Available Tables', value: '18', change: '-3', changeType: 'decrease' },
    { name: 'Today\'s Guests', value: '47', change: '+5', changeType: 'increase' },
    { name: 'Avg. Rating', value: '4.8', change: '+0.2', changeType: 'increase' },
  ];

  const upcomingReservations = [
    { id: '1', name: 'John Smith', time: '18:00', date: 'Today', guests: 4, table: 'T3', status: 'confirmed' },
    { id: '2', name: 'Emma Johnson', time: '19:30', date: 'Today', guests: 2, table: 'T1', status: 'confirmed' },
    { id: '3', name: 'Michael Brown', time: '20:00', date: 'Today', guests: 6, table: 'T5', status: 'pending' },
    { id: '4', name: 'Sarah Davis', time: '12:30', date: 'Tomorrow', guests: 3, table: 'T2', status: 'confirmed' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Restaurant Dashboard
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button variant="outline" className="mr-2">
                <Settings className="h-5 w-5 mr-1" />
                Settings
              </Button>
              <Button variant="primary">
                <BookOpen className="h-5 w-5 mr-1" />
                View Reservations
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      {stat.name.includes('Reservations') ? (
                        <BookOpen className="h-6 w-6 text-white" />
                      ) : stat.name.includes('Tables') ? (
                        <Layout className="h-6 w-6 text-white" />
                      ) : stat.name.includes('Guests') ? (
                        <Users className="h-6 w-6 text-white" />
                      ) : (
                        <TrendingUp className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick access */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Quick Access
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Link to="/restaurant/floor-plan" className="group">
                  <div className="bg-gray-50 overflow-hidden shadow-sm rounded-lg border border-gray-200 p-6 hover:bg-indigo-50 hover:border-indigo-200 transition-colors duration-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3 group-hover:bg-indigo-200 transition-colors duration-200">
                        <Layout className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">Floor Plan</h4>
                        <p className="text-sm text-gray-500">Manage your restaurant layout</p>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/restaurant/schedule" className="group">
                  <div className="bg-gray-50 overflow-hidden shadow-sm rounded-lg border border-gray-200 p-6 hover:bg-indigo-50 hover:border-indigo-200 transition-colors duration-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3 group-hover:bg-indigo-200 transition-colors duration-200">
                        <Calendar className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">Schedule</h4>
                        <p className="text-sm text-gray-500">Set your opening hours</p>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/restaurant/reservations" className="group">
                  <div className="bg-gray-50 overflow-hidden shadow-sm rounded-lg border border-gray-200 p-6 hover:bg-indigo-50 hover:border-indigo-200 transition-colors duration-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3 group-hover:bg-indigo-200 transition-colors duration-200">
                        <BookOpen className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">Reservations</h4>
                        <p className="text-sm text-gray-500">Manage your bookings</p>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <div className="group">
                  <div className="bg-gray-50 overflow-hidden shadow-sm rounded-lg border border-gray-200 p-6 hover:bg-indigo-50 hover:border-indigo-200 transition-colors duration-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3 group-hover:bg-indigo-200 transition-colors duration-200">
                        <TrendingUp className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">Analytics</h4>
                        <p className="text-sm text-gray-500">View your performance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Upcoming reservations */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Upcoming Reservations
              </h3>
              <div className="mt-5 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            Guest
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Time
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Guests
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Table
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {upcomingReservations.map((reservation) => (
                          <tr key={reservation.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              {reservation.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {reservation.time} ({reservation.date})
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {reservation.guests}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {reservation.table}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                reservation.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {reservation.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                View<span className="sr-only">, {reservation.name}</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/restaurant/reservations">
                  <Button variant="outline" fullWidth>
                    View All Reservations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantDashboard;
