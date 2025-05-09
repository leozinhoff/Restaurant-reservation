import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, Filter, ChevronDown, MapPin as MapPinIcon } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import MapPin from '../components/ui/MapPin';

// Mock data for restaurants
const restaurantData = [
  {
    id: '1',
    name: 'Le Bistro Parisien',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    cuisine: 'French',
    priceRange: '€€€',
    rating: 4.7,
    reviewCount: 243,
    address: '15 Rue de Rivoli, Paris',
    openingHours: '12:00 - 23:00',
    description: 'Authentic French cuisine in a cozy atmosphere with a view of the Seine.',
    tags: ['Romantic', 'View', 'Wine Selection']
  },
  {
    id: '2',
    name: 'Trattoria Milano',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    cuisine: 'Italian',
    priceRange: '€€',
    rating: 4.5,
    reviewCount: 187,
    address: '42 Via Roma, Milan',
    openingHours: '11:30 - 22:30',
    description: 'Family-owned Italian restaurant serving homemade pasta and wood-fired pizzas.',
    tags: ['Family-Friendly', 'Outdoor Seating', 'Pasta']
  },
  {
    id: '3',
    name: 'Sakura Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    cuisine: 'Japanese',
    priceRange: '€€€',
    rating: 4.8,
    reviewCount: 312,
    address: '8 Shinjuku, Tokyo',
    openingHours: '17:00 - 23:00',
    description: 'Premium sushi restaurant with fresh fish imported daily from Tsukiji market.',
    tags: ['Sushi', 'Sake', 'Omakase']
  },
  {
    id: '4',
    name: 'El Tapeo',
    image: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    cuisine: 'Spanish',
    priceRange: '€€',
    rating: 4.6,
    reviewCount: 156,
    address: '23 Calle Mayor, Madrid',
    openingHours: '18:00 - 01:00',
    description: 'Authentic Spanish tapas bar with a wide selection of wines and sangrias.',
    tags: ['Tapas', 'Wine Bar', 'Late Night']
  },
  {
    id: '5',
    name: 'The Grill House',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    cuisine: 'American',
    priceRange: '€€€',
    rating: 4.4,
    reviewCount: 201,
    address: '55 Broadway, New York',
    openingHours: '16:00 - 23:30',
    description: 'Premium steakhouse serving dry-aged beef and classic American sides.',
    tags: ['Steakhouse', 'Cocktails', 'Business Meals']
  },
  {
    id: '6',
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    cuisine: 'Indian',
    priceRange: '€€',
    rating: 4.5,
    reviewCount: 178,
    address: '12 Curry Lane, London',
    openingHours: '12:00 - 22:00',
    description: 'Authentic Indian cuisine with a modern twist, featuring dishes from all regions of India.',
    tags: ['Spicy', 'Vegetarian Options', 'Curry']
  }
];

// Filter options
const cuisineOptions = ['All', 'French', 'Italian', 'Japanese', 'Spanish', 'American', 'Indian'];
const priceOptions = ['All', '€', '€€', '€€€', '€€€€'];

const RestaurantsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  
  // Filter restaurants based on search query and filters
  const filteredRestaurants = restaurantData.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
    const matchesPrice = selectedPrice === 'All' || restaurant.priceRange === selectedPrice;
    
    return matchesSearch && matchesCuisine && matchesPrice;
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="relative h-64 bg-gradient-to-r from-indigo-500 to-purple-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4">
                  <h1 className="text-3xl font-bold text-white sm:text-4xl">
                    Discover Amazing Restaurants
                  </h1>
                  <p className="mt-2 text-lg text-indigo-100">
                    Find and book the perfect table for any occasion
                  </p>
                  
                  {/* Search bar */}
                  <div className="mt-6 max-w-xl mx-auto">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-white bg-opacity-90 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                        placeholder="Search restaurants, cuisines, or locations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700 font-medium">Filters:</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {/* Cuisine filter */}
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                  >
                    <option disabled>Cuisine</option>
                    {cuisineOptions.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                
                {/* Price filter */}
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  >
                    <option disabled>Price</option>
                    {priceOptions.map((price) => (
                      <option key={price} value={price}>
                        {price}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                Showing {filteredRestaurants.length} restaurants
              </div>
            </div>
          </div>
          
          {/* Restaurant list */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative h-48">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-medium text-gray-700">
                    {restaurant.priceRange}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        {restaurant.rating}
                      </span>
                    </div>
                  </div>
                  
                  <p className="mt-1 text-sm text-gray-500">
                    {restaurant.cuisine} • {restaurant.reviewCount} reviews
                  </p>
                  
                  <div className="flex items-center mt-1">
                    <MapPinIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">{restaurant.address}</span>
                  </div>
                  
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    {restaurant.openingHours}
                  </div>
                  
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {restaurant.description}
                  </p>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {restaurant.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Link to={`/book/${restaurant.id}`}>
                      <Button variant="primary" fullWidth>
                        Book a Table
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty state */}
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No restaurants found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCuisine('All');
                    setSelectedPrice('All');
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantsPage;
