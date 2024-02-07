// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister';
import Nav from './components/Nav';
import { useSelector } from 'react-redux';
import Profile from "./components/Profile";
import Events from './components/Events';
import CreateEventForm from './components/CreateEventForm'; // Добавлено
import DogsList from './components/DogsList';
import AddDogForm from './components/AddDogForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Создайте кастомную тему здесь (это опционально)
const theme = createTheme({
  // Вы можете настроить тему по вашему усмотрению
});

function App() {
  const { token, user } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister page="Login" />} />
        <Route path="/register" element={<LoginRegister page="Register" />} />
        {token ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<Events />} />
            <Route path="/mydogs" element={<DogsList />} />
            <Route path="/adddog" element={<AddDogForm />} />
            <Route path="/create-event" element={<CreateEventForm />} /> {/* Добавлено */}
            {/* Условный рендеринг на основе роли пользователя */}
            {user?.role === 'volunteer' && (
              <Route path="/create-event" element={<CreateEventForm />} />
            )}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </ThemeProvider>
  );
}

export default App;



// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Home from './components/Home';
// import LoginRegister from './components/LoginRegister';
// import Nav from './components/Nav';
// import { useSelector } from 'react-redux';
// import Profile from "./components/Profile";
// import Events from './components/Events';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

// // Создайте кастомную тему здесь (это опционально)
// const theme = createTheme({
//   // Вы можете настроить тему по вашему усмотрению
// });

// function App() {
//   const { token } = useSelector((state) => state.auth);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Nav />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginRegister page="Login" />} />
//         <Route path="/register" element={<LoginRegister page="Register" />} />
//         {token ? (
//           <>
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/events" element={<Events />} />
//           </>
//         ) : (
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         )}
//       </Routes>
//     </ThemeProvider>
//   );
// }

// export default App;
