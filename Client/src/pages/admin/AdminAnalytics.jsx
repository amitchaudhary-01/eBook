import { FaChartBar, FaPlus } from 'react-icons/fa6';

const AdminAnalytics = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#121824] border border-slate-800/90 rounded-2xl">
      <div className="p-4 bg-slate-800/50 rounded-full text-slate-400 mb-4 border border-slate-700/50">
        <FaChartBar className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-white">No Analytics Data Yet</h2>
      <p className="text-sm text-slate-400 max-w-md mt-1 mb-6">
        Once customers start purchasing e-books or renting physical books from your store, real-time performance insights will appear here automatically.
      </p>
      <a
        href="/admin/books"
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
      >
        <FaPlus size={12} /> Add Books to Store
      </a>
    </div>
  );
};

export default AdminAnalytics;
