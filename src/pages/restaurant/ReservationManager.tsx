import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Check, X, Calendar, Clock, Users, Phone, Mail } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';

// Reservation interface
interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  partySize: number;
  tableId: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  specialRequests?: string;
  createdAt: string;
}

// Mock data for reservations
const mockReservations: Reservation[] = [
  {
    id: 'res-001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    customerPhone: '+1 (555) 123-4567',
    date: '2023-06-15',
    time: '19:00',
    partySize: 4,
    tableId: 'T3',
    status: 'confirmed',
    specialRequests: 'Window seat if possible',
    createdAt: '2023-06-10T14:23:45Z'
  },
  {
    id: 'res-002',
    customerName: 'Emma Johnson',
    customerEmail: 'emma.j@example.com',
    customerPhone: '+1 (555) 987-6543',
    date: '2023-06-15',
    time: '20:30',
    partySize: 2,
    tableId: 'T1',
    status: 'confirmed',
    createdAt: '2023-06-11T09:15:22Z'
  },
  {
    id: 'res-003',
    customerName: 'Michael Brown',
    customerEmail: 'michael.b@example.com',
    customerPhone: '+1 (555) 456-7890',
    date: '2023-06-15',
    time: '18:00',
    partySize: 6,
    tableId: 'T5',
    status: 'pending',
    specialRequests: 'Celebrating a birthday, possible cake?',
    createdAt: '2023-06-12T16:45:10Z'
  },
  {
    id: 'res-004',
    customerName: 'Sarah Davis',
    customerEmail: 'sarah.d@example.com',
    customerPhone: '+1 (555) 234-5678',
    date: '2023-06-16',
    time: '12:30',
    partySize: 3,
    tableId: 'T2',
    status: 'confirmed',
    createdAt: '2023-06-10T11:30:00Z'
  },
  {
    id: 'res-005',
    customerName: 'Robert Wilson',
    customerEmail: 'robert.w@example.com',
    customerPhone: '+1 (555) 876-5432',
    date: '2023-06-14',
    time: '19:30',
    partySize: 5,
    tableId: 'T4',
    status: 'completed',
    createdAt: '2023-06-09T13:20:15Z'
  },
  {
    id: 'res-006',
    customerName: 'Jennifer Lee',
    customerEmail: 'jennifer.l@example.com',
    customerPhone: '+1 (555) 345-6789',
    date: '2023-06-14',
    time: '20:00',
    partySize: 2,
    tableId: 'T6',
    status: 'cancelled',
    specialRequests: 'Allergic to nuts',
    createdAt: '2023-06-08T10:15:30Z'
  },
  {
    id: 'res-007',
    customerName: 'David Miller',
    customerEmail: 'david.m@example.com',
    customerPhone: '+1 (555) 567-8901',
    date: '2023-06-16',
    time: '18:30',
    partySize: 4,
    tableId: 'T3',
    status: 'confirmed',
    createdAt: '2023-06-11T15:40:20Z'
  },
  {
    id: 'res-008',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa.a@example.com',
    customerPhone: '+1 (555) 678-9012',
    date: '2023-06-17',
    time: '19:00',
    partySize: 2,
    tableId: 'T1',
    status: 'pending',
    createdAt: '2023-06-12T09:10:45Z'
  }
];

const ReservationManager: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  
  // Filter reservations based on search query and filters
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.customerPhone.includes(searchQuery) ||
      reservation.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    const matchesDate = !dateFilter || reservation.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  // Update reservation status
  const updateReservationStatus = (id: string, newStatus: 'confirmed' | 'pending' | 'cancelled' | 'completed') => {
    setReservations(prev => 
      prev.map(res => 
        res.id === id ? { ...res, status: newStatus } : res
      )
    );
    
    if (selectedReservation?.id === id) {
      setSelectedReservation(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Reservation Manager
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View and manage all your restaurant reservations
              </p>
            </div>
          </div>
          
          {/* Filters and search */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="w-full sm:w-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search by name, email, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {/* Status filter */}
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                
                {/* Date filter */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
                
                {/* Clear filters */}
                {(statusFilter !== 'all' || dateFilter) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStatusFilter('all');
                      setDateFilter('');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Reservations list */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Reservations
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {filteredReservations.length} reservations found
                  </p>
                </div>
                
                {filteredReservations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Party
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredReservations.map((reservation) => (
                          <tr 
                            key={reservation.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedReservation?.id === reservation.id ? 'bg-indigo-50' : ''}`}
                            onClick={() => setSelectedReservation(reservation)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                              <div className="text-sm text-gray-500">{reservation.customerEmail}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{formatDate(reservation.date)}</div>
                              <div className="text-sm text-gray-500">{reservation.time}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{reservation.partySize} guests</div>
                              <div className="text-sm text-gray-500">Table {reservation.tableId}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(reservation.status)}`}>
                                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                {reservation.status === 'pending' && (
                                  <Button
                                    variant="success"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateReservationStatus(reservation.id, 'confirmed');
                                    }}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateReservationStatus(reservation.id, 'cancelled');
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                                {reservation.status === 'confirmed' && (
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateReservationStatus(reservation.id, 'completed');
                                    }}
                                  >
                                    Complete
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Calendar className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No reservations found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Reservation details */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Reservation Details
                  </h3>
                </div>
                
                {selectedReservation ? (
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reservation ID
                        </h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedReservation.id}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </h4>
                        <div className="mt-1">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(selectedReservation.status)}`}>
                            {selectedReservation.status.charAt(0).toUpperCase() + selectedReservation.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer Information
                        </h4>
                        <div className="mt-1 text-sm text-gray-900">
                          <p className="font-medium">{selectedReservation.customerName}</p>
                          <div className="mt-1 flex items-center text-gray-500">
                            <Mail className="h-4 w-4 mr-1" />
                            <span>{selectedReservation.customerEmail}</span>
                          </div>
                          <div className="mt-1 flex items-center text-gray-500">
                            <Phone className="h-4 w-4 mr-1" />
                            <span>{selectedReservation.customerPhone}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reservation Details
                        </h4>
                        <div className="mt-1 text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            <span>{formatDate(selectedReservation.date)}</span>
                          </div>
                          <div className="mt-1 flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span>{selectedReservation.time}</span>
                          </div>
                          <div className="mt-1 flex items-center">
                            <Users className="h-4 w-4 text-gray-400 mr-1" />
                            <span>{selectedReservation.partySize} guests</span>
                          </div>
                          <div className="mt-1">
                            <span className="text-gray-500">Table:</span> {selectedReservation.tableId}
                          </div>
                        </div>
                      </div>
                      
                      {selectedReservation.specialRequests && (
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Special Requests
                          </h4>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedReservation.specialRequests}
                          </p>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created At
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(selectedReservation.createdAt).toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex space-x-3">
                          {selectedReservation.status === 'pending' && (
                            <Button
                              variant="success"
                              onClick={() => updateReservationStatus(selectedReservation.id, 'confirmed')}
                              fullWidth
                            >
                              <Check className="h-5 w-5 mr-1" />
                              Confirm
                            </Button>
                          )}
                          
                          {(selectedReservation.status === 'pending' || selectedReservation.status === 'confirmed') && (
                            <Button
                              variant="danger"
                              onClick={() => updateReservationStatus(selectedReservation.id, 'cancelled')}
                              fullWidth
                            >
                              <X className="h-5 w-5 mr-1" />
                              Cancel
                            </Button>
                          )}
                          
                          {selectedReservation.status === 'confirmed' && (
                            <Button
                              variant="primary"
                              onClick={() => updateReservationStatus(selectedReservation.id, 'completed')}
                              fullWidth
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-12 text-center">
                    <p className="text-gray-500">
                      Select a reservation to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReservationManager;
