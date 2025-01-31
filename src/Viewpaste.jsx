// import React from 'react'
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPaste, updatToPaste } from './pasteSlice';
import { useDispatch, useSelector } from 'react-redux';

const Viewpaste = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const id=useParams();
  const allPastes=useSelector((state)=>state.paste.paste);

  const paste=allPastes.find((p)=>p._id===id.id);
  // Get existing paste if updating
  const existingPaste = useSelector((state) =>
    state.paste.paste.find((p) => p._id === pasteId)
  );

  // Prefill fields if updating
  useEffect(() => {
    if (pasteId && existingPaste) {
      setTitle(existingPaste.title);
      setValue(existingPaste.content);
    }
  }, [pasteId, existingPaste]);


  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input
          className='p-2 rounded-2xl pl-4 mt-2 w-[100%] text-center'
          type="text"
          // placeholder='Enter Title here'
          placeholder={`${paste.title}`}
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
          readOnly
        />
      </div>
      <div className='mt-8'>
        <textarea
          className='rounded-2xl mt-4 p-4 min-w-[500px]'
          // placeholder='Enter content here'
          placeholder={`${paste.content}`}
          value={paste.value}
          onChange={(e) => setValue(e.target.value)}
          rows={10}
          readOnly
        />
      </div>
    </div>
  );
}

export default Viewpaste
