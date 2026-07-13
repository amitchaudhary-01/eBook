import { FaCartShopping, FaArrowRight } from 'react-icons/fa6';

const AdminOrderSale = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#121824] border border-slate-800/90 rounded-2xl">
      <div className="p-4 bg-slate-800/50 rounded-full text-slate-400 mb-4 border border-slate-700/50">
        <FaCartShopping className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-white">No Orders Yet</h2>
      <p className="text-sm text-slate-400 max-w-md mt-1 mb-6">
        Once customers start purchasing or renting e-books, orders and sales data will appear here in real-time.
      </p>
      <a
        href="/admin/books"
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
      >
        Browse Catalog <FaArrowRight size={12} />
      </a>
    </div>
  );
};

export default AdminOrderSale;
