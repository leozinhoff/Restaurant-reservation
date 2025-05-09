import React, { useState, useCallback } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import { Plus, Trash2, Save } from 'lucide-react';

// Table interface
interface TableItem {
  id: string;
  left: number;
  top: number;
  seats: number;
  minSeats: number;
  shape: 'round' | 'rectangle';
  width: number;
  height: number;
}

// Table component
const Table: React.FC<{
  table: TableItem;
  isSelected: boolean;
  onClick: () => void;
  onDragEnd: (id: string, left: number, top: number) => void;
}> = ({ table, isSelected, onClick, onDragEnd }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'table',
    item: { id: table.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  const style: React.CSSProperties = {
    position: 'absolute',
    left: table.left,
    top: table.top,
    width: table.width,
    height: table.height,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    border: isSelected ? '2px solid #4f46e5' : '2px solid #d1d5db',
    borderRadius: table.shape === 'round' ? '50%' : '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    zIndex: isSelected ? 10 : 1,
  };
  
  return (
    <div
      ref={drag}
      style={style}
      onClick={onClick}
      className="select-none"
    >
      <div className="text-center">
        <div className="font-bold">{table.id}</div>
        <div className="text-xs">{table.seats} seats</div>
      </div>
    </div>
  );
};

// Floor plan canvas with drop target
const FloorPlanCanvas: React.FC<{
  tables: TableItem[];
  selectedTable: string | null;
  onTableClick: (id: string) => void;
  onTableDragEnd: (id: string, left: number, top: number) => void;
}> = ({ tables, selectedTable, onTableClick, onTableDragEnd }) => {
  const [, drop] = useDrop(() => ({
    accept: 'table',
    drop: (item: { id: string }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta) return;
      
      const table = tables.find((t) => t.id === item.id);
      if (!table) return;
      
      const left = Math.max(0, Math.round(table.left + delta.x));
      const top = Math.max(0, Math.round(table.top + delta.y));
      
      onTableDragEnd(item.id, left, top);
    },
  }));
  
  return (
    <div
      ref={drop}
      className="relative border-2 border-dashed border-gray-300 rounded-lg"
      style={{ height: '600px', backgroundColor: '#f9fafb' }}
    >
      {tables.map((table) => (
        <Table
          key={table.id}
          table={table}
          isSelected={selectedTable === table.id}
          onClick={() => onTableClick(table.id)}
          onDragEnd={onTableDragEnd}
        />
      ))}
    </div>
  );
};

// Floor plan editor
const FloorPlanEditor: React.FC = () => {
  const [tables, setTables] = useState<TableItem[]>([
    { id: 'T1', left: 50, top: 50, seats: 2, minSeats: 1, shape: 'round', width: 80, height: 80 },
    { id: 'T2', left: 200, top: 50, seats: 4, minSeats: 2, shape: 'rectangle', width: 120, height: 80 },
    { id: 'T3', left: 50, top: 200, seats: 6, minSeats: 4, shape: 'rectangle', width: 160, height: 80 },
    { id: 'T4', left: 300, top: 200, seats: 8, minSeats: 6, shape: 'rectangle', width: 200, height: 100 },
  ]);
  
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [newTableCounter, setNewTableCounter] = useState(5);
  
  // Get selected table object
  const getSelectedTable = () => {
    if (!selectedTable) return null;
    return tables.find((t) => t.id === selectedTable) || null;
  };
  
  // Handle table selection
  const handleTableClick = (id: string) => {
    setSelectedTable(id);
  };
  
  // Handle table property change
  const handleTablePropertyChange = (property: keyof TableItem, value: any) => {
    if (!selectedTable) return;
    
    setTables((prev) =>
      prev.map((table) =>
        table.id === selectedTable ? { ...table, [property]: value } : table
      )
    );
  };
  
  // Add new table
  const addNewTable = (shape: 'round' | 'rectangle') => {
    const newTable: TableItem = {
      id: `T${newTableCounter}`,
      left: 100,
      top: 100,
      seats: shape === 'round' ? 2 : 4,
      minSeats: shape === 'round' ? 1 : 2,
      shape,
      width: shape === 'round' ? 80 : 120,
      height: shape === 'round' ? 80 : 80,
    };
    
    setTables((prev) => [...prev, newTable]);
    setNewTableCounter((prev) => prev + 1);
    setSelectedTable(newTable.id);
  };
  
  // Delete selected table
  const deleteSelectedTable = () => {
    if (!selectedTable) return;
    
    setTables((prev) => prev.filter((table) => table.id !== selectedTable));
    setSelectedTable(null);
  };
  
  // Handle table drag end
  const handleTableDragEnd = useCallback(
    (id: string, left: number, top: number) => {
      setTables((prev) =>
        prev.map((table) =>
          table.id === id ? { ...table, left, top } : table
        )
      );
    },
    []
  );
  
  // Save floor plan
  const saveFloorPlan = () => {
    // In a real app, this would save to a backend
    alert('Floor plan saved successfully!');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Floor Plan Editor
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Drag and drop tables to create your restaurant floor plan
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button
                variant="outline"
                onClick={() => addNewTable('round')}
                className="mr-2"
              >
                <Plus className="h-5 w-5 mr-1" />
                Add Round Table
              </Button>
              <Button
                variant="outline"
                onClick={() => addNewTable('rectangle')}
                className="mr-2"
              >
                <Plus className="h-5 w-5 mr-1" />
                Add Rectangle Table
              </Button>
              <Button
                variant="primary"
                onClick={saveFloorPlan}
              >
                <Save className="h-5 w-5 mr-1" />
                Save Floor Plan
              </Button>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Floor Plan Canvas */}
            <div className="lg:col-span-3">
              <div className="bg-white shadow rounded-lg p-4">
                <DndProvider backend={HTML5Backend}>
                  <FloorPlanCanvas
                    tables={tables}
                    selectedTable={selectedTable}
                    onTableClick={handleTableClick}
                    onTableDragEnd={handleTableDragEnd}
                  />
                </DndProvider>
              </div>
            </div>
            
            {/* Table Properties */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Table Properties</h3>
                
                {selectedTable ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Table ID</label>
                      <input
                        type="text"
                        value={getSelectedTable()?.id || ''}
                        onChange={(e) => handleTablePropertyChange('id', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Number of Seats</label>
                      <input
                        type="number"
                        min="1"
                        value={getSelectedTable()?.seats || 0}
                        onChange={(e) => handleTablePropertyChange('seats', parseInt(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Minimum Seats Required</label>
                      <input
                        type="number"
                        min="1"
                        max={getSelectedTable()?.seats || 1}
                        value={getSelectedTable()?.minSeats || 0}
                        onChange={(e) => handleTablePropertyChange('minSeats', parseInt(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Shape</label>
                      <select
                        value={getSelectedTable()?.shape || 'rectangle'}
                        onChange={(e) => handleTablePropertyChange('shape', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="round">Round</option>
                        <option value="rectangle">Rectangle</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Width (px)</label>
                      <input
                        type="number"
                        min="40"
                        value={getSelectedTable()?.width || 0}
                        onChange={(e) => handleTablePropertyChange('width', parseInt(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Height (px)</label>
                      <input
                        type="number"
                        min="40"
                        value={getSelectedTable()?.height || 0}
                        onChange={(e) => handleTablePropertyChange('height', parseInt(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        variant="danger"
                        onClick={deleteSelectedTable}
                        fullWidth
                      >
                        <Trash2 className="h-5 w-5 mr-1" />
                        Delete Table
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    <p>Select a table to edit its properties</p>
                    <p className="mt-2 text-sm">
                      Or add a new table using the buttons above
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

export default FloorPlanEditor;
