import React from 'react';
import { TextField, Button, Grid, Container } from '@mui/material';
import { useSelector } from 'react-redux';

const UserProfileForm = ({ onUpdate }) => {
  const user = useSelector((state) => state.users.user); // Получаем данные пользователя из Redux-стейта

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обновление данных пользователя на сервере
    onUpdate({ email, username, firstName, lastName, dateOfBirth });
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const { email, username, firstName, lastName, dateOfBirth } = user;

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              fullWidth
              disabled // Блокируем изменение email
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              value={username}
              fullWidth
              disabled // Блокируем изменение username
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              value={firstName}
              fullWidth
              disabled // Блокируем изменение firstName
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              value={lastName}
              fullWidth
              disabled // Блокируем изменение lastName
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              type="date"
              value={dateOfBirth}
              fullWidth
              disabled // Блокируем изменение dateOfBirth
            />
          </Grid>
          {/* Кнопка обновления не требуется, так как поля только для чтения */}
        </Grid>
      </form>
    </Container>
  );
};

export default UserProfileForm;



// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Grid, Container } from '@mui/material';

// const UserProfileForm = ({ user_id, onUpdate }) => {
//   const [userData, setUserData] = useState(null);
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         console.log('Fetching user data...');
//         const response = await fetch(`http://localhost:5005/users/${user_id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }
//         const userData = await response.json();
//         setUserData(userData);
//         setEmail(userData.email);
//         setUsername(userData.username);
//         setFirstName(userData.firstName);
//         setLastName(userData.lastName);
//         setDateOfBirth(userData.dateOfBirth);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [user_id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate({ email, username, firstName, lastName, dateOfBirth });
//   };

//   if (!userData) {
//     return <div>Loading user data...</div>;
//   }

//   return (
//     <Container maxWidth="sm">
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               label="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="First Name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Last Name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Date of Birth"
//               type="date"
//               value={dateOfBirth}
//               onChange={(e) => setDateOfBirth(e.target.value)}
//               fullWidth
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Update
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Container>
//   );
// };

// export default UserProfileForm;





// import React, { useState } from 'react';
// import { TextField, Button, Grid, Container } from '@mui/material';

// const UserProfileForm = ({ userData, onUpdate }) => {
//   const [email, setEmail] = useState(userData.email || '');
//   const [username, setUsername] = useState(userData.username || '');
//   const [firstName, setFirstName] = useState(userData.firstName || '');
//   const [lastName, setLastName] = useState(userData.lastName || '');
//   const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth || '');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate({ email, username, firstName, lastName, dateOfBirth });
//   };

//   return (
//     <Container maxWidth="sm">
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               label="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="First Name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Last Name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Date of Birth"
//               type="date"
//               value={dateOfBirth}
//               onChange={(e) => setDateOfBirth(e.target.value)}
//               fullWidth
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Update
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Container>
//   );
// };

// export default UserProfileForm;
