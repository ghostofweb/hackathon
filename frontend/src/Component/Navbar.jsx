import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Navbar brand */}
        <a className="flex items-center" >
          <img
            src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
            className="h-8 mr-3"
            alt="MDB Logo"
            loading="lazy"
          />
        </a>
        
        {/* Toggle button for mobile */}
        <button
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          type="button"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5h14M3 10h14M3 15h14" clipRule="evenodd"></path>
          </svg>
        </button>

        {/* Collapsible wrapper */}
        <div className="hidden w-full md:flex md:w-auto" id="navbar-default">
          {/* Left links */}
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link to="/" className="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</Link>
            </li>
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Team</a>
            </li>
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Projects</a>
            </li>
          </ul>
        </div>

        {/* Right elements */}
        <div className="flex items-center space-x-4">
          {/* Icon */}
          <a className="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" href="#">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3z"></path>
            </svg>
          </a>

          {/* Notifications */}
          <div className="relative">
            <a className="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" href="#">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405C19.79 15.21 20 14.62 20 14v-2a7 7 0 00-14 0v2c0 .62.21 1.21.405 1.595L5 17h5m2 0v2m-7 2h10a2 2 0 002-2H5a2 2 0 00-2 2z"></path>
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">1</span>
            </a>
          </div>

          {/* Avatar */}
          <div className="relative">
            <Link className="flex items-center" to="/Profile">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="w-8 h-8 rounded-full"
                alt="Avatar"
                loading="lazy"
              />
            </Link>
            <ul className="absolute right-0 hidden mt-2 space-y-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">My profile</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
