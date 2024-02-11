import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister';
import Nav from './components/Nav';
import { useSelector } from 'react-redux';
import Profile from "./components/Profile";
import Events from './components/Events';
import CreateEventForm from './components/CreateEventForm'; 
import DogsList from './components/DogsList';
import AddDogForm from './components/AddDogForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

function App() {
  const { token, user } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const VolunteerRoute = ({ children }) => {
    if (user?.role !== 'volunteer') {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister page="Login" />} />
        <Route path="/register" element={<LoginRegister page="Register" />} />
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />
        <Route
          path="/events"
          element={<ProtectedRoute><Events /></ProtectedRoute>}
        />
        <Route
          path="/mydogs"
          element={<ProtectedRoute><DogsList /></ProtectedRoute>}
        />
        <Route
          path="/adddog"
          element={<ProtectedRoute><AddDogForm /></ProtectedRoute>}
        />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <VolunteerRoute><CreateEventForm /></VolunteerRoute>
            </ProtectedRoute>
          }
        />

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
// import CreateEventForm from './components/CreateEventForm'; 
// import DogsList from './components/DogsList';
// import AddDogForm from './components/AddDogForm';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

// const theme = createTheme();

// function App() {
//   const { token, user } = useSelector((state) => state.auth);

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
//             <Route path="/mydogs" element={<DogsList />} />
//             <Route path="/adddog" element={<AddDogForm />} />
//             <Route path="/create-event" element={<CreateEventForm />} /> 
            
//             {user?.role === 'volunteer' && (
//               <Route path="/create-event" element={<CreateEventForm />} />
//             )}
//           </>
//         ) : (
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         )}
//       </Routes>
//     </ThemeProvider>
//   );
// }

// export default App;






