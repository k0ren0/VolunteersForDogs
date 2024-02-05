import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setUsers, setProfileData } from '../actions/profileActions';
import axios from "axios";
import ProfileForm from "./form/ProfileForm";


function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, profileData } = useSelector(state => state.profile);

  useEffect(() => {
    // Проверяем, есть ли токен в localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios.get("http://localhost:5005/users", {
        headers: { "x-access-token": token },
      }).then((response) => {
        dispatch(setUsers(response.data));
      }).catch((error) => {
        console.error("Failed to fetch user data:", error);
        if (error.response && error.response.status === 403) {
          navigate("/login");
        }
      });
    }
  }, [navigate, dispatch]);

  const handleUpdateProfile = (formData) => {
    axios.put("http://localhost:5005/profile", formData, {
      headers: { "x-access-token": localStorage.getItem("token") },
    }).then((response) => {
      dispatch(setProfileData(response.data));
    }).catch((error) => {
      console.error("Failed to update profile:", error);
    });
  };

  return (
    <div>
      <h1>Profile</h1>
      <ProfileForm profileData={profileData} onUpdateProfile={handleUpdateProfile} />
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            {user.name || "Unnamed User"} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
