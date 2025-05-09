import React, { useState } from 'react';
import { Clock, Plus, Trash2, Save } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';

interface TimeSlot {
  id: string;
  day: string;
  openTime: string;
  closeTime: string;
}

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const ScheduleManager: React.FC = () => {
  const [schedule, setSchedule] = useState<TimeSlot[]>([
    { id: '1', day: 'Monday', openTime: '11:00', closeTime: '22:00' },
    { id: '2', day: 'Tuesday', openTime: '11:00', closeTime: '22:00' },
    { id: '3', day: 'Wednesday', openTime: '11:00', closeTime: '22:00' },
    { id: '4', day: 'Thursday', openTime: '11:00', closeTime: '23:00' },
    { id: '5', day: 'Friday', openTime: '11:00', closeTime: '23:00' },
    { id: '6', day: 'Saturday', openTime: '10:00', closeTime: '23:00' },
    { id: '7', day: 'Sunday', openTime: '10:00', closeTime: '22:00' },
  ]);

  const [specialDays, setSpecialDays] = useState<TimeSlot[]>([
    { id: 'special-1', day: '2023-12-24', openTime: '11:00', closeTime: '15:00' },
    { id: 'special-2', day: '2023-12-25', openTime: '00:00', closeTime: '00:00' }, // Closed
    { id: 'special-3', day: '2023-12-31', openTime: '11:00', closeTime: '01:00' },
  ]);

  const [newSpecialDay, setNewSpecialDay] = useState<{
    day: string;
    openTime: string;
    closeTime: string;
  }>({
    day: '',
    openTime: '11:00',
    closeTime: '22:00',
  });

  // Update regular schedule
  const updateSchedule = (id: string, field: keyof TimeSlot, value: string) => {
    setSchedule((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot
      )
    );
  };

  // Update special day
  const updateSpecialDay = (id: string, field: keyof TimeSlot, value: string) => {
    setSpecialDays((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot
      )
    );
  };

  // Add new special day
  const addSpecialDay = () => {
    if (!newSpecialDay.day) return;

    const newId = `special-${Date.now()}`;
    setSpecialDays((prev) => [
      ...prev,
      {
        id: newId,
        day: newSpecialDay.day,
        openTime: newSpecialDay.openTime,
        closeTime: newSpecialDay.closeTime,
      },
    ]);

    // Reset form
    setNewSpecialDay({
      day: '',
      openTime: '11:00',
      closeTime: '22:00',
    });
  };

  // Remove special day
  const removeSpecialDay = (id: string) => {
    setSpecialDays((prev) => prev.filter((slot) => slot.id !== id));
  };

  // Save schedule
  const saveSchedule = () => {
    // In a real app, this would save to a backend
    alert('Schedule saved successfully!');
  };

  // Check if a day is closed (00:00 to 00:00)
  const isClosed = (openTime: string, closeTime: string) => {
    return openTime === '00:00' && closeTime === '00:00';
  };

  // Toggle closed status
  const toggleClosed = (id: string, type: 'regular' | 'special') => {
    if (type === 'regular') {
      const slot = schedule.find((s) => s.id === id);
      if (!slot) return;

      if (isClosed(slot.openTime, slot.closeTime)) {
        updateSchedule(id, 'openTime', '11:00');
        updateSchedule(id, 'closeTime', '22:00');
      } else {
        updateSchedule(id, 'openTime', '00:00');
        updateSchedule(id, 'closeTime', '00:00');
      }
    } else {
      const slot = specialDays.find((s) => s.id === id);
      if (!slot) return;

      if (isClosed(slot.openTime, slot.closeTime)) {
        updateSpecialDay(id, 'openTime', '11:00');
        updateSpecialDay(id, 'closeTime', '22:00');
      } else {
        updateSpecialDay(id, 'openTime', '00:00');
        updateSpecialDay(id, 'closeTime', '00:00');
      }
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
                Schedule Manager
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Set your regular opening hours and special days
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button variant="primary" onClick={saveSchedule}>
                <Save className="h-5 w-5 mr-1" />
                Save Schedule
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Regular Schedule */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Regular Opening Hours
              </h3>

              <div className="space-y-4">
                {schedule.map((slot) => (
                  <div key={slot.id} className="flex items-center space-x-4">
                    <div className="w-28">
                      <span className="text-sm font-medium text-gray-700">
                        {slot.day}
                      </span>
                    </div>

                    {isClosed(slot.openTime, slot.closeTime) ? (
                      <div className="flex-grow">
                        <span className="text-sm font-medium text-red-600">
                          Closed
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <select
                            value={slot.openTime}
                            onChange={(e) =>
                              updateSchedule(slot.id, 'openTime', e.target.value)
                            }
                            className="block w-24 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {Array.from({ length: 24 }).map((_, i) => (
                              <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                                {`${i.toString().padStart(2, '0')}:00`}
                              </option>
                            ))}
                          </select>
                        </div>

                        <span className="text-gray-500">to</span>

                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <select
                            value={slot.closeTime}
                            onChange={(e) =>
                              updateSchedule(slot.id, 'closeTime', e.target.value)
                            }
                            className="block w-24 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {Array.from({ length: 24 }).map((_, i) => (
                              <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                                {`${i.toString().padStart(2, '0')}:00`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}

                    <Button
                      variant={isClosed(slot.openTime, slot.closeTime) ? "outline" : "danger"}
                      size="sm"
                      onClick={() => toggleClosed(slot.id, 'regular')}
                    >
                      {isClosed(slot.openTime, slot.closeTime) ? 'Set Open' : 'Set Closed'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Days */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Special Days
              </h3>

              {/* Add new special day */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Add Special Day
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="special-date" className="block text-xs font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      id="special-date"
                      value={newSpecialDay.day}
                      onChange={(e) =>
                        setNewSpecialDay({ ...newSpecialDay, day: e.target.value })
                      }
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="special-open" className="block text-xs font-medium text-gray-700">
                      Open
                    </label>
                    <select
                      id="special-open"
                      value={newSpecialDay.openTime}
                      onChange={(e) =>
                        setNewSpecialDay({ ...newSpecialDay, openTime: e.target.value })
                      }
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                          {`${i.toString().padStart(2, '0')}:00`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="special-close" className="block text-xs font-medium text-gray-700">
                      Close
                    </label>
                    <select
                      id="special-close"
                      value={newSpecialDay.closeTime}
                      onChange={(e) =>
                        setNewSpecialDay({ ...newSpecialDay, closeTime: e.target.value })
                      }
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                          {`${i.toString().padStart(2, '0')}:00`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewSpecialDay({
                        ...newSpecialDay,
                        openTime: '00:00',
                        closeTime: '00:00',
                      });
                    }}
                  >
                    Set as Closed
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={addSpecialDay}
                    disabled={!newSpecialDay.day}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Special Day
                  </Button>
                </div>
              </div>

              {/* Special days list */}
              {specialDays.length > 0 ? (
                <div className="space-y-4">
                  {specialDays.map((slot) => (
                    <div key={slot.id} className="flex items-center space-x-4 border-b border-gray-200 pb-3">
                      <div className="w-28">
                        <span className="text-sm font-medium text-gray-700">
                          {new Date(slot.day).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      {isClosed(slot.openTime, slot.closeTime) ? (
                        <div className="flex-grow">
                          <span className="text-sm font-medium text-red-600">
                            Closed
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <select
                              value={slot.openTime}
                              onChange={(e) =>
                                updateSpecialDay(slot.id, 'openTime', e.target.value)
                              }
                              className="block w-24 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              {Array.from({ length: 24 }).map((_, i) => (
                                <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                                  {`${i.toString().padStart(2, '0')}:00`}
                                </option>
                              ))}
                            </select>
                          </div>

                          <span className="text-gray-500">to</span>

                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <select
                              value={slot.closeTime}
                              onChange={(e) =>
                                updateSpecialDay(slot.id, 'closeTime', e.target.value)
                              }
                              className="block w-24 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              {Array.from({ length: 24 }).map((_, i) => (
                                <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                                  {`${i.toString().padStart(2, '0')}:00`}
                                </option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}

                      <div className="flex space-x-2">
                        <Button
                          variant={isClosed(slot.openTime, slot.closeTime) ? "outline" : "danger"}
                          size="sm"
                          onClick={() => toggleClosed(slot.id, 'special')}
                        >
                          {isClosed(slot.openTime, slot.closeTime) ? 'Set Open' : 'Set Closed'}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeSpecialDay(slot.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No special days added yet.</p>
                  <p className="text-sm mt-1">
                    Use the form above to add holidays or special opening hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ScheduleManager;
