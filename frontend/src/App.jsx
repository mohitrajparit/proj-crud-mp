import React from 'react';
import CrudApp from './CrudApp';
import Map from './Map';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <CrudApp />
         <h1 className="text-4xl font-bold text-blue-500">Map </h1>
        <Map />
       
      </div>
    </div>             
  );
}

export default App;
