import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updatToPaste } from './pasteSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();
    
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

    function createPaste() {
        const paste = {
            title,
            content: value,
            _id: pasteId || crypto.randomUUID(), // More unique ID
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updatToPaste(paste)); // Fix typo if needed
        } else {
            dispatch(addToPaste(paste));
        }

        // Clear fields after action
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input 
                    className='p-2 rounded-2xl pl-4 mt-2 w-[80%]' 
                    type="text" 
                    placeholder='Enter Title here' 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <button 
                    className='p-2 rounded-xl bg-blue-500 text-white mt-2' 
                    onClick={createPaste}
                >
                    {pasteId ? "Update Paste" : "Create Paste"}
                </button>
            </div>
            <div className='mt-8'>
                <textarea 
                    className='rounded-2xl mt-4 p-4 min-w-[500px]' 
                    placeholder='Enter content here' 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    rows={10} 
                />
            </div>
        </div>
    );
};

export default Home;
