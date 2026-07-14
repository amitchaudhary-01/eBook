import React from 'react';

export default function BookCard({ book }) {
  const fileUrl = `${import.meta.env.VITE_SERVER_URL}/uploads/${book.coverImage}`;

  const renderCover = () => {
    if (!book.coverImage) {
      return <div className="text-gray-400 text-sm">No file uploaded</div>;
    }

    const type = book.fileType || (() => {
      const ext = book.coverImage?.split('.').pop()?.toLowerCase();
      const map = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml', mp4: 'video/mp4', webm: 'video/webm', pdf: 'application/pdf' };
      return map[ext] || '';
    })();

    if (type.startsWith('image/')) {
      return (
        <img
          src={fileUrl}
          alt={book.title}
          className="h-40 object-contain drop-shadow-md"
        />
      );
    }

    if (type.startsWith('video/')) {
      return (
        <video
          src={fileUrl}
          controls
          className="h-40 object-contain drop-shadow-md"
        />
      );
    }

    if (type === 'application/pdf') {
      return (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 text-purple-600 hover:text-purple-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <span className="text-xs font-semibold">View PDF</span>
        </a>
      );
    }

    return (
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:text-purple-800 text-xs font-semibold"
      >
        View File
      </a>
    );
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300">
      <div className="bg-gray-50 rounded-xl p-4 flex justify-center items-center h-48 mb-4">
        {renderCover()}
      </div>
      <div className="flex text-amber-400 text-xs mb-1">
        {"★".repeat(Math.round(book.rating || 0))}
      </div>
      <h4 className="font-bold text-gray-900 text-sm truncate">{book.title}</h4>
      <p className="text-gray-500 text-xs mb-2">{book.author}</p>
      <div className="flex items-center gap-2">
        {book.discountPrice ? (
          <div>
            <span className="text-indigo-600 font-bold text-sm">${book.discountPrice}</span>
            <span className="text-gray-400 line-through text-xs">${book.price}</span>
          </div>
        ) : (
          <span className="text-gray-900 font-bold text-sm">${book.price}</span>
        )}
      </div>
    </div>
  );
}
