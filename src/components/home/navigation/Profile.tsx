import { useState, useEffect } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import axios from "axios";

const UserMenu = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.email && session?.user?.name) {
          const response = await axios.post('/api/user-credit', {
            email: session.user.email,
            name: session.user.name,
          });
          const data = response.data;
          // Handle the fetched data if necessary
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (session?.user) {
      fetchData();
    }
  }, [session]);

  if (session && session.user) {
    const { name, image } = session.user;

    return (
      <div className="relative ml-auto">
        <img
          src={image || "https://i.pinimg.com/736x/76/82/93/768293dff0ff168a01c7d16fefc89699.jpg"}
          alt={`${name}'s profile`}
          className="w-8 h-8 rounded-full border-2 border-gray-600 shadow-lg cursor-pointer transition-transform transform hover:scale-105"
          onClick={toggleDropdown}
        />

        {showDropdown && (
          <div className="absolute right-0 mt-4 w-48 bg-gray-900 border border-gray-600 rounded-lg shadow-lg z-50">
            <div className="p-2">
              <button
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white rounded-md transition-colors duration-200"
                onClick={() => {
                  signOut();
                  setShowDropdown(false);
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="ml-auto">
        <button
          onClick={() => signIn()}
          className="text-blue-400 hover:text-blue-600 font-semibold transition-colors duration-200"
        >
          Sign In
        </button>
      </div>
    );
  }
};

export default UserMenu;
