import React from 'react';

export default function BookCard({ book }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300">
      <div className="bg-gray-50 rounded-xl p-4 flex justify-center items-center h-48 mb-4">
        <img src={book.image} alt={book.title} className="h-40 object-contain drop-shadow-md" />
      </div>
      <div className="flex text-amber-400 text-xs mb-1">
        {"★".repeat(Math.round(book.rating))}
      </div>
      <h4 className="font-bold text-gray-900 text-sm truncate">{book.title}</h4>
      <p className="text-gray-500 text-xs mb-2">{book.author}</p>
      <div className="flex items-center gap-2">
        {book.discountPrice ? (
          <>
            <span className="text-indigo-600 font-bold text-sm">${book.discountPrice}</span>
            <span className="text-gray-400 line-through text-xs">${book.price}</span>
          </>
        ) : (
          <span className="text-gray-900 font-bold text-sm">${book.price}</span>
        )}
      </div>
    </div>
  );
}