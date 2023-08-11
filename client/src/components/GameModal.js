import React from 'react';
import '../styles/GameModal.css';

/* Define a functional component called GameModal that takes three props
isOpen: if false returns null to render nothing if true renders the modal overlay
onClose: callback function to close the modal when the close is clicked.
         functionality is defined in the parent component
children: prop used to render the content within the modal --Gary's lecture on React Context
*/
const GameModal = ({ isOpen, onClose, children }) => {

  // If the modal is not open, return null (don't render anything)
  if (!isOpen) return null;

  // Render the modal overlay and content
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose} style={{backgroundColor: "white"}}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default GameModal;


