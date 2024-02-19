import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister';
import Nav from './components/Nav';
import { useSelector } from 'react-redux';
import Profile from "./components/Profile";
import Events from './components/Events';
import EventsList from './components/EventsList';
import AddEventForm from './components/AddEventForm';
import DogsList from './components/DogsList';
import AddDogForm from './components/AddDogForm';
import CssBaseline from '@mui/material/CssBaseline';
import EditDogForm from './components/EditDogForm';
import EditEventForm from './components/EditEventForm';
import UserProfileForm from './components/UserProfileForm';
import CustomThemeProvider from './components/themeContext'; 

function App() {
  const { token } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <CustomThemeProvider> 
      <CssBaseline /> 
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister page="Login" />} />
        <Route path="/register" element={<LoginRegister page="Register" />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/{user_id}" element={<ProtectedRoute><UserProfileForm /></ProtectedRoute>} />
        <Route path="/events-list" element={<ProtectedRoute><EventsList /></ProtectedRoute>} />
        <Route path="/mydogs" element={<ProtectedRoute><DogsList /></ProtectedRoute>} />
        <Route path="/adddog" element={<ProtectedRoute><AddDogForm /></ProtectedRoute>} />
        <Route path="/dogs/:id/edit" element={<ProtectedRoute><EditDogForm /></ProtectedRoute>} />
        <Route path="/addevent" element={<ProtectedRoute><AddEventForm /></ProtectedRoute>} />
        <Route path="/events/:event_id/edit" element={<ProtectedRoute><EditEventForm /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </CustomThemeProvider>
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
// import EventsList from './components/EventsList';
// import AddEventForm from './components/AddEventForm';
// import DogsList from './components/DogsList';
// import AddDogForm from './components/AddDogForm';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import EditDogForm from './components/EditDogForm';
// import EditEventForm from './components/EditEventForm';
// import UserProfileForm from './components/UserProfileForm';
// import CustomThemeProvider from './themeContext';

// const theme = createTheme();

// function App() {
//   const { token } = useSelector((state) => state.auth);

//   const ProtectedRoute = ({ children }) => {
//     if (!token) {
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Nav />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginRegister page="Login" />} />
//         <Route path="/register" element={<LoginRegister page="Register" />} />
//         <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//         <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
//         <Route path="/my-profile" element={<ProtectedRoute><UserProfileForm /></ProtectedRoute>} />
//         <Route path="/events-list" element={<ProtectedRoute><EventsList /></ProtectedRoute>} />
//         <Route path="/mydogs" element={<ProtectedRoute><DogsList /></ProtectedRoute>} />
//         <Route path="/adddog" element={<ProtectedRoute><AddDogForm /></ProtectedRoute>} />
//         <Route path="/dogs/:id/edit" element={<ProtectedRoute><EditDogForm /></ProtectedRoute>} />
//         <Route path="/addevent" element={<ProtectedRoute><AddEventForm /></ProtectedRoute>} />
//         <Route path="/events/:event_id/edit" element={<ProtectedRoute><EditEventForm /></ProtectedRoute>} />
//         {/* Добавляем обработку неправильных маршрутов */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </ThemeProvider>
//   );
// }

// export default App;


// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Home from './components/Home';
// import LoginRegister from './components/LoginRegister';
// import Nav from './components/Nav';
// import { useSelector } from 'react-redux';
// import Profile from "./components/Profile";
// import Events from './components/Events';
// import EventsList from './components/EventsList';
// import AddEventForm from './components/AddEventForm';
// import DogsList from './components/DogsList';
// import AddDogForm from './components/AddDogForm';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import EditDogForm from './components/EditDogForm';
// import EditEventForm from './components/EditEventForm';

// const theme = createTheme();

// function App() {
//   const { token } = useSelector((state) => state.auth);

//   const ProtectedRoute = ({ children }) => {
//     if (!token) {
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Nav />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginRegister page="Login" />} />
//         <Route path="/register" element={<LoginRegister page="Register" />} />
//         <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//         <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
//         <Route path="/events-list" element={<ProtectedRoute><EventsList /></ProtectedRoute>} />
//         <Route path="/mydogs" element={<ProtectedRoute><DogsList /></ProtectedRoute>} />
//         <Route path="/adddog" element={<ProtectedRoute><AddDogForm /></ProtectedRoute>} />
//         <Route path="/dogs/:id/edit" element={<ProtectedRoute><EditDogForm /></ProtectedRoute>} />
//         <Route path="/addevent" element={<ProtectedRoute><AddEventForm /></ProtectedRoute>} />
//         <Route path="/events/:event_id/edit" element={<ProtectedRoute><EditEventForm /></ProtectedRoute>} />
//         {/* Добавляем обработку неправильных маршрутов */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </ThemeProvider>
//   );
// }

// export default App;





// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Home from './components/Home';
// import LoginRegister from './components/LoginRegister';
// import Nav from './components/Nav';
// import { useSelector } from 'react-redux';
// import Profile from "./components/Profile";
// import Events from './components/Events';
// import EventsList from './components/EventsList'; 
// import AddEventForm from './components/AddEventForm'; 
// import DogsList from './components/DogsList'; 
// import AddDogForm from './components/AddDogForm';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import EditDogForm from './components/EditDogForm';
// import EditEventForm from './components/EditEventForm';

// const theme = createTheme();

// function App() {
//   const { token, user } = useSelector((state) => state.auth);

//   const ProtectedRoute = ({ children }) => {
//     if (!token) {
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   };

//   const VolunteerRoute = ({ children }) => {
//     if (!token || user?.role !== 'volunteer') {
//       return <Navigate to="/" replace />;
//     }
//     return children;
//   };

//   // Обновленный ProfileRoute для обеспечения доступа к профилю для всех аутентифицированных пользователей
//   const ProfileRoute = ({ children }) => {
//     if (!token || !user) {
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Nav />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginRegister page="Login" />} />
//         <Route path="/register" element={<LoginRegister page="Register" />} />
//         <Route path="/profile" element={<ProfileRoute><Profile /></ProfileRoute>} />
//         <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
//         <Route path="/events-list" element={<ProtectedRoute><EventsList /></ProtectedRoute>} />
//         <Route path="/mydogs" element={<ProtectedRoute><DogsList /></ProtectedRoute>} />
//         <Route path="/adddog" element={<ProtectedRoute><AddDogForm /></ProtectedRoute>} />
//         <Route path="/dogs/:id/edit" element={<ProtectedRoute><EditDogForm /></ProtectedRoute>} />
//         <Route path="/addevent" element={<ProtectedRoute><VolunteerRoute><AddEventForm /></VolunteerRoute></ProtectedRoute>} />
//         <Route path="/events/:id/edit" element={<ProtectedRoute><EditEventForm /></ProtectedRoute>} />
//       </Routes>
//     </ThemeProvider>
//   );
// }

// export default App;





// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Home from './components/Home';
// import LoginRegister from './components/LoginRegister';
// import Nav from './components/Nav';
// import { useSelector } from 'react-redux';
// import Profile from "./components/Profile";
// import Events from './components/Events';
// import EventsList from './components/EventsList'; 
// import AddEventForm from './components/AddEventForm'; 
// import DogsList from './components/DogsList'; // Импорт DogsList
// import AddDogForm from './components/AddDogForm';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import EditDogForm from './components/EditDogForm';
// import EditEventForm from './components/EditEventForm';

// const theme = createTheme();

// function App() {
//   const { token, user } = useSelector((state) => state.auth);

//   const ProtectedRoute = ({ children }) => {
//     if (!token) {
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   };

//   const VolunteerRoute = ({ children }) => {
//     if (user?.role !== 'volunteer') {
//       return <Navigate to="/" replace />;
//     }
//     return children;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Nav />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginRegister page="Login" />} />
//         <Route path="/register" element={<LoginRegister page="Register" />} />
//         <Route
//           path="/profile"
//           element={<ProtectedRoute><Profile /></ProtectedRoute>}
//         />
//         <Route
//           path="/events"
//           element={<ProtectedRoute><Events /></ProtectedRoute>}
//         />
//         <Route
//           path="/events-list"
//           element={<ProtectedRoute><EventsList /></ProtectedRoute>}
//         />
//         <Route
//           path="/mydogs"
//           element={<ProtectedRoute><DogsList /></ProtectedRoute>} // Добавляем DogsList
//         />
//         <Route
//           path="/adddog"
//           element={<ProtectedRoute><AddDogForm /></ProtectedRoute>}
//         />
//         <Route
//           path="/dogs/:id/edit"
//           element={<ProtectedRoute><EditDogForm /></ProtectedRoute>}
//         />

//         <Route
//           path="/addevent"
//           element={
//             <ProtectedRoute>
//               <VolunteerRoute><AddEventForm /></VolunteerRoute>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/events/:id/edit"
//           element={<ProtectedRoute><EditEventForm /></ProtectedRoute>}
//         />

//       </Routes>
//     </ThemeProvider>
//   );
// }

// export default App;

