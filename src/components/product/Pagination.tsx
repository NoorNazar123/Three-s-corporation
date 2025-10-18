interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, setCurrentPage }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
            currentPage === i + 1
              ? 'bg-red-600 text-white border-red-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
