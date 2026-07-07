import React from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow-lg relative w-[90%] max-w-md">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl text-gray-400 hover:text-red-400">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
