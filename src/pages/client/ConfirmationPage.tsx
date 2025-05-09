import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin, CheckCircle, Share2, Printer, Phone, Mail } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';

const ConfirmationPage: React.FC = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  
  // Mock reservation data
  const reservation = {
    id: reservationId || '123456',
    restaurant: {
      name: 'Le Petit Bistro',
      address: '123 Gourmet Avenue, Paris',
      phone: '+33 1 23 45 67 89',
      email: 'contact@lepetitbistro.com',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    date: '2023-11-15',
    time: '19:30',
    guests: 4,
    table: 'Table 12 (Window)',
    specialRequests: 'Birthday celebration, please prepare a small surprise if possible.',
    status: 'confirmed',
    confirmationCode: 'LBTR-' + (reservationId || '123456')
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Reservation at ${reservation.restaurant.name}`,
        text: `I've made a reservation at ${reservation.restaurant.name} on ${formatDate(reservation.date)} at ${reservation.time} for ${reservation.guests} people.`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Share feature not supported by your browser. You can copy the URL manually.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Banner */}
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-green-800">Reservation Confirmed!</h3>
                <p className="text-green-700 mt-1">
                  Your reservation has been successfully confirmed. We've sent the details to your email.
                </p>
              </div>
            </div>
          </div>
          
          {/* Confirmation Card */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg print:shadow-none">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Reservation Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Confirmation #{reservation.confirmationCode}
                </p>
              </div>
              <div className="print:hidden flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare}
                  className="flex items-center"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrint}
                  className="flex items-center"
                >
                  <Printer className="h-4 w-4 mr-1" />
                  Print
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              {/* Restaurant Image */}
              <div className="md:w-1/3">
                <img 
                  src={reservation.restaurant.image} 
                  alt={reservation.restaurant.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              
              {/* Reservation Details */}
              <div className="md:w-2/3 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{reservation.restaurant.name}</h2>
                
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="text-base text-gray-900">{formatDate(reservation.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Time</p>
                      <p className="text-base text-gray-900">{reservation.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Party Size</p>
                      <p className="text-base text-gray-900">{reservation.guests} people</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Table</p>
                      <p className="text-base text-gray-900">{reservation.table}</p>
                    </div>
                  </div>
                </div>
                
                {reservation.specialRequests && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500">Special Requests</h4>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                      {reservation.specialRequests}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Restaurant Contact Info */}
            <div className="border-t border-gray-200 px-6 py-5">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Restaurant Information</h4>
              <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-3 sm:gap-x-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{reservation.restaurant.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <a href={`tel:${reservation.restaurant.phone}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                    {reservation.restaurant.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <a href={`mailto:${reservation.restaurant.email}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                    {reservation.restaurant.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 print:hidden">
            <Link to="/booking" className="w-full sm:w-auto">
              <Button variant="outline" fullWidth>
                Make Another Reservation
              </Button>
            </Link>
            <Link to="/" className="w-full sm:w-auto">
              <Button variant="primary" fullWidth>
                Return to Home
              </Button>
            </Link>
          </div>
          
          {/* Additional Information */}
          <div className="mt-10 bg-white shadow sm:rounded-lg overflow-hidden print:shadow-none">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Need to make changes?
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  If you need to modify or cancel your reservation, please contact the restaurant directly at least 2 hours before your reservation time.
                </p>
              </div>
              <div className="mt-5">
                <a
                  href={`tel:${reservation.restaurant.phone}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Restaurant
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Print Styles - Hidden in normal view, visible when printing */}
      <style jsx>{`
        @media print {
          @page {
            size: portrait;
            margin: 1cm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ConfirmationPage;
