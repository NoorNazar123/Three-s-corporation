interface SidebarProps {
  selected: string;
  setSelected: (category: string) => void;
}

export default function StoreSidebar({ selected, setSelected }: SidebarProps) {
  const categories = [
    'All',
    'Used Laptops',
    'Batteries',
    'External Hard Drives',
    'Adapters',
    'Storage',
    'RAMS',
    'Laptop Keyboards',
    'Screens',
    'Other Parts',
  ];

  console.log('cate123', selected);
  return (
    <aside className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Categories</h3>
      <ul className="space-y-3">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => setSelected(cat)}
              className={`w-full text-left py-2 px-4 rounded-md transition ${
                selected === cat ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
