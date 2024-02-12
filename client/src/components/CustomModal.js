import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CustomModal = ({ isOpen, message, onRequestClose, isSuccess }) => {
  // Determine the title based on whether the message is a success or error
  const title = isSuccess ? "Success" : "Error";

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Button onClick={onRequestClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;




// import React from 'react';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// const CustomModal = ({ isOpen, message, onRequestClose }) => {
//   return (
//     <Modal
//       open={isOpen}
//       onClose={onRequestClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid 000', boxShadow: 24, p: 4 }}>
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//           Error
//         </Typography>
//         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//           {message}
//         </Typography>
//         <Button onClick={onRequestClose} sx={{ mt: 2 }}>
//           Close
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default CustomModal;
