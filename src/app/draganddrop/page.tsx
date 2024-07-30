'use client'

import { useState } from 'react';
import DraggableList from './dragFile';

const initialItems = [
  { id: 'item-1', content: 'Item 1' },
  { id: 'item-2', content: 'Item 2' },
  { id: 'item-3', content: 'Item 3' },
];


const Home: React.FC = () => {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Draggable List</h1>
      <DraggableList items={items} setItems={setItems} />
    </div>
  );
};

export default Home;
