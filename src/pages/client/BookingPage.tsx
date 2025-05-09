import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Utensils, CalendarCheck, ChevronRight, ChevronLeft, Info } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import MapPin from '../../components/ui/MapPin';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TableOption {
  id: string;
  name: string;
  capacity: number;
  location: string;
  available: boolean;
}

const BookingPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  
  // Booking steps
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Step 1: Date & Party Size
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(2);
  
  // Step 2: Time Selection
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Step 3: Table Selection
  const [selectedTable, setSelectedTable] = useState<string>('');
  
  // Step 4: Customer Details
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  
  // Mock restaurant data
  const restaurant = {
    id: restaurantId || '123',
    name: 'Le Petit Bistro',
    cuisine: 'French',
    address: '123 Gourmet Avenue, Paris',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'A charming bistro offering authentic French cuisine in a cozy atmosphere. Our chef specializes in traditional recipes with a modern twist.',
    openingHours: {
      monday: '12:00 - 22:00',
      tuesday: '12:00 - 22:00',
      wednesday: '12:00 - 22:00',
      thursday: '12:00 - 22:00',
      friday: '12:00 - 23:00',
      saturday: '12:00 - 23:00',
      sunday: '12:00 - 21:00'
    },
    rating: 4.7
  };
  
  // Mock available time slots
  const timeSlots: TimeSlot[] = [
    { time: '17:00', available: true },
    { time: '17:30', available: true },
    { time: '18:00', available: true },
    { time: '18:30', available: false },
    { time: '19:00', available: true },
    { time: '19:30', available: true },
    { time: '20:00', available: false },
    { time: '20:30', available: true },
    { time: '21:00', available: true },
    { time: '21:30', available: false }
  ];
  
  // Mock table options
  const tableOptions: TableOption[] = [
    { id: 'T1', name: 'Table 1', capacity: 2, location: 'Window', available: true },
    { id: 'T2', name: 'Table 2', capacity: 2, location: 'Bar', available: true },
    { id: 'T3', name: 'Table 3', capacity: 4, location: 'Window', available: true },
    { id: 'T4', name: 'Table 4', capacity: 4, location: 'Center', available: false },
    { id: 'T5', name: 'Table 5', capacity: 6, location: 'Private Room', available: true },
    { id: 'T6', name: 'Table 6', capacity: 8, location: 'Terrace', available: true }
  ];
  
  // Filter tables based on party size
  const availableTables = tableOptions.filter(
    table => table.available && table.capacity >= partySize && table.capacity <= partySize + 2
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit booking
      handleSubmitBooking();
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmitBooking = () => {
    // In a real app, this would send the booking data to an API
    console.log('Booking submitted:', {
      restaurantId,
      date: selectedDate,
      time: selectedTime,
      partySize,
      tableId: selectedTable,
      customer: customerDetails
    });
    
    // Navigate to confirmation page with a mock reservation ID
    const mockReservationId = Math.floor(Math.random() * 1000000).toString();
    navigate(`/confirmation/${mockReservationId}`);
  };
  
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return selectedDate && partySize > 0;
      case 2:
        return selectedTime !== '';
      case 3:
        return selectedTable !== '';
      case 4:
        return (
          customerDetails.firstName.trim() !== '' &&
          customerDetails.lastName.trim() !== '' &&
          customerDetails.email.trim() !== '' &&
          customerDetails.phone.trim() !== ''
        );
      default:
        return false;
    }
  };
  
  // Generate dates for the next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  const dates = generateDates();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Restaurant Header */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
            <div className="h-64 w-full relative">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                  <p className="mt-2 flex items-center">
                    <Utensils className="h-4 w-4 mr-1" />
                    {restaurant.cuisine} Cuisine
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">{restaurant.description}</p>
            </div>
          </div>
          
          {/* Booking Process */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Progress Steps */}
            <div className="border-b border-gray-200">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex justify-between py-4">
                  <button 
                    className={`flex flex-col items-center text-xs font-medium ${
                      currentStep >= 1 ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                    onClick={() => currentStep > 1 && setCurrentStep(1)}
                    disabled={currentStep < 1}
                  >
                    <span className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
                      currentStep >= 1 ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                    } mb-1`}>
                      <Calendar className="h-4 w-4" />
                    </span>
                    <span>Date & Party</span>
                  </button>
                  
                  <div className="hidden sm:block w-10 h-0.5 mt-4 bg-gray-200"></div>
                  
                  <button 
                    className={`flex flex-col items-center text-xs font-medium ${
                      currentStep >= 2 ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                    onClick={() => currentStep > 2 && setCurrentStep(2)}
                    disabled={currentStep < 2}
                  >
                    <span className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
                      currentStep >= 2 ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                    } mb-1`}>
                      <Clock className="h-4 w-4" />
                    </span>
                    <span>Time</span>
                  </button>
                  
                  <div className="hidden sm:block w-10 h-0.5 mt-4 bg-gray-200"></div>
                  
                  <button 
                    className={`flex flex-col items-center text-xs font-medium ${
                      currentStep >= 3 ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                    onClick={() => currentStep > 3 && setCurrentStep(3)}
                    disabled={currentStep < 3}
                  >
                    <span className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
                      currentStep >= 3 ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                    } mb-1`}>
                      <Users className="h-4 w-4" />
                    </span>
                    <span>Table</span>
                  </button>
                  
                  <div className="hidden sm:block w-10 h-0.5 mt-4 bg-gray-200"></div>
                  
                  <button 
                    className={`flex flex-col items-center text-xs font-medium ${
                      currentStep >= 4 ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                    onClick={() => currentStep > 4 && setCurrentStep(4)}
                    disabled={currentStep < 4}
                  >
                    <span className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
                      currentStep >= 4 ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                    } mb-1`}>
                      <CalendarCheck className="h-4 w-4" />
                    </span>
                    <span>Confirm</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Step Content */}
            <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
              {/* Step 1: Date & Party Size */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Party Size</h2>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Party Size
                    </label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <span className="mx-4 text-xl font-medium w-8 text-center">{partySize}</span>
                      <button
                        type="button"
                        className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
                        onClick={() => setPartySize(Math.min(20, partySize + 1))}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                      {dates.map((date) => {
                        const dateString = formatDate(date);
                        const isSelected = dateString === selectedDate;
                        
                        return (
                          <button
                            key={dateString}
                            type="button"
                            className={`p-3 rounded-md border text-center ${
                              isSelected
                                ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onClick={() => setSelectedDate(dateString)}
                          >
                            <div className="text-xs uppercase">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                            <div className="text-lg font-semibold">{date.getDate()}</div>
                            <div className="text-xs">{date.toLocaleDateString('en-US', { month: 'short' })}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Time Selection */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Time</h2>
                  <p className="text-gray-600 mb-6">
                    {selectedDate && (
                      <>For {formatDisplayDate(selectedDate)} · {partySize} {partySize === 1 ? 'person' : 'people'}</>
                    )}
                  </p>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        className={`py-3 px-4 rounded-md border text-center ${
                          !slot.available
                            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                            : selectedTime === slot.time
                              ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                              : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  
                  {!timeSlots.some(slot => slot.available) && (
                    <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                      <div className="flex">
                        <Info className="h-5 w-5 mr-2" />
                        <p>No available time slots for this date. Please select another date.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Step 3: Table Selection */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Table</h2>
                  <p className="text-gray-600 mb-6">
                    {selectedDate && selectedTime && (
                      <>For {formatDisplayDate(selectedDate)} at {selectedTime} · {partySize} {partySize === 1 ? 'person' : 'people'}</>
                    )}
                  </p>
                  
                  {availableTables.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {availableTables.map((table) => (
                        <button
                          key={table.id}
                          type="button"
                          className={`p-4 rounded-md border text-left ${
                            selectedTable === table.id
                              ? 'bg-indigo-50 border-indigo-500'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setSelectedTable(table.id)}
                        >
                          <div className="font-medium text-gray-900">{table.name}</div>
                          <div className="text-sm text-gray-500">
                            Seats up to {table.capacity} · {table.location}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                      <div className="flex">
                        <Info className="h-5 w-5 mr-2" />
                        <p>No tables available for your party size. Please adjust your party size or select another time.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Step 4: Customer Details */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Reservation</h2>
                  <p className="text-gray-600 mb-6">
                    {selectedDate && selectedTime && (
                      <>For {formatDisplayDate(selectedDate)} at {selectedTime} · {partySize} {partySize === 1 ? 'person' : 'people'}</>
                    )}
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Reservation Summary</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{formatDisplayDate(selectedDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{selectedTime}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{partySize} {partySize === 1 ? 'person' : 'people'}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                        <span>
                          {tableOptions.find(t => t.id === selectedTable)?.name} 
                          ({tableOptions.find(t => t.id === selectedTable)?.location})
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={customerDetails.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={customerDetails.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={customerDetails.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={customerDetails.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                        Special Requests (optional)
                      </label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        rows={3}
                        value={customerDetails.specialRequests}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Allergies, special occasions, seating preferences..."
                      />
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                      <div className="flex">
                        <Info className="h-5 w-5 text-blue-400 mr-2" />
                        <div className="text-sm text-blue-700">
                          <p className="font-medium">Reservation Policy</p>
                          <p className="mt-1">
                            Please arrive on time. We hold reservations for 15 minutes past the scheduled time.
                            To cancel or modify your reservation, please contact the restaurant at least 2 hours in advance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Navigation Buttons */}
            <div className="border-t border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                  className={currentStep === 1 ? 'invisible' : ''}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleNextStep}
                  disabled={!isStepComplete()}
                >
                  {currentStep < 4 ? (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    'Complete Reservation'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
