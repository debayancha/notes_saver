import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromPaste } from './pasteSlice';
import { toast } from 'react-toastify';

const Paste = () => {
  const paste = useSelector((state) => state.paste.paste);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = paste.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(removeFromPaste(pasteId));
      toast.success("Note deleted successfully!");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <input
        type="search"
        placeholder="Search notes..."
        className="p-3 rounded-2xl w-full mt-5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-6 max-w-[450px] max-h-[300px]" >
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste._id} className="bg-gray-800 text-white p-5 rounded-2xl shadow-lg transition-all hover:shadow-2xl">
              <h1 className="text-2xl font-semibold">{paste.title}</h1>
              <p className="mt-2 text-gray-300  overflow-hidden max-h-[100px]">{paste.content}</p>

              <div className="flex flex-wrap gap-4 mt-5 mx-auto">
                <button className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white">
                  <a href={`/?pasteId=${paste?._id}`} className='text-white'>Edit</a>
                </button>
                <button className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-white">
                  <a href={`/paste/${paste._id}`} className="text-white">View</a>
                </button>
                <button className='p-2 rounded-xl bg-green-500 text-white' onClick={() => { navigator.clipboard.writeText(paste.content); toast.success("copied to clipboard") }}>Copy</button>

                <button className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white" onClick={() => handleDelete(paste._id)}>
                  Delete
                </button>
                <button className="p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition text-white"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "Shared Note",
                        text: paste.content,
                        url: window.location.href
                      }).catch(console.error);
                    } else {
                      alert("Web Share API not supported.");
                    }
                  }}>
                  Share
                </button>
              </div>

              <div className="mt-3 text-gray-400 text-sm">{new Date(paste.createdAt).toLocaleString()}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
