import React from 'react';
import { MapPin as MapPinIcon } from 'lucide-react';

interface MapPinProps {
  address: string;
  className?: string;
  iconClassName?: string;
}

const MapPin: React.FC<MapPinProps> = ({ address, className = '', iconClassName = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <MapPinIcon className={`h-4 w-4 text-gray-400 mr-1 ${iconClassName}`} />
      <span className="text-sm text-gray-500">{address}</span>
    </div>
  );
};

export default MapPin;
