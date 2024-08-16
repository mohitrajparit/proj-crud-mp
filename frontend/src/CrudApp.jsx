import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CrudApp() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('https://proj-crud-mp-1.onrender.com/api/v1/tasks');
      if (res.data && res.data.tasks) {
        setItems(res.data.tasks);
      } else {
        console.error('Unexpected response structure:', res.data);
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching items:', error.response ? error.response.data : error.message);
      setItems([]);
    }
  };

  const addItem = async () => {
    try {
      const res = await axios.post('https://proj-crud-mp-1.onrender.com/api/v1/tasks', { name, description });
      // console.log(res.data);
      
      setItems([...items, res.data.task]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding item:', error.response ? error.response.data : error.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`https://proj-crud-mp-1.onrender.com/api/v1/tasks/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error.response ? error.response.data : error.message);
    }
  };

  const startEditing = (item) => {
    setEditingId(item._id);
    setEditName(item.name);
    setEditDescription(item.description);
  };

  const updateItem = async () => {
    try {
      const res = await axios.patch(`https://proj-crud-mp-1.onrender.com/api/v1/tasks/${editingId}`, { 
        name: editName, 
        description: editDescription 
      });
      // console.log('Updated item:', res.data.task);
      const updatedItem = res.data.task;
      setItems(items.map((item) => (item._id === editingId ? updatedItem : item)));
  
      setEditingId(null);
      setEditName('');
      setEditDescription('');
    } catch (error) {
      console.error('Error updating item:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mt-10">CRUD App</h1>
      <div className="mt-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="border p-2 rounded-lg w-full text-gray-700"
            type="text"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="border p-2 rounded-lg w-full text-gray-700"
            placeholder="Enter item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Add Item
        </button>
      </div>

      {editingId && (
        <div className="mt-8 w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editName">
              Edit Name
            </label>
            <input
              id="editName"
              className="border p-2 rounded-lg w-full text-gray-700"
              type="text"
              placeholder="Edit item name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editDescription">
              Edit Description
            </label>
            <textarea
              id="editDescription"
              className="border p-2 rounded-lg w-full text-gray-700"
              placeholder="Edit item description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows="4"
            />
          </div>
          <button
            onClick={updateItem}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full mb-2"
          >
            Update Item
          </button>
          <button
            onClick={() => setEditingId(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full"
          >
            Cancel
          </button>
        </div>
      )}

<ul className="mt-8 w-full max-w-md">
  {Array.isArray(items) && items.map((item, index) => (
    <li
      key={item._id || index}  
      className="flex flex-col bg-white p-4 mb-2 shadow-md rounded-lg"
    >
      <div className="font-bold">{item.name}</div>
      <div className="text-gray-600 mt-1">{item.description}</div>
      <div className="mt-2 flex justify-between">
        <button
          onClick={() => startEditing(item)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => deleteItem(item._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
}

export default CrudApp;
