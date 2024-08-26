import { useState } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      profilePicture: null,
    });
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
      if (type === 'file') {
        setFormData({
          ...formData,
          [name]: files[0],
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const { email, password, confirmPassword } = formData;
      let formErrors = {};
  
      // Validation
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        formErrors.email = 'Invalid email address';
      }
      if (!password || password.length < 8) {
        formErrors.password = 'Password must be at least 8 characters long';
      }
      if (password !== confirmPassword) {
        formErrors.confirmPassword = 'Passwords do not match';
      }
  
      if (Object.keys(formErrors).length === 0) {
        // Handle form submission
        console.log('Form submitted', formData);
      } else {
        setErrors(formErrors);
      }
    };
  
    return (
      <div className="mx-auto flex h-screen max-w-lg flex-col md:max-w-none md:flex-row md:pr-10">
        <div className="max-w-md rounded-3xl bg-gradient-to-t from-orange-500 via-orange-500 to-orange-500 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
          <p className="mb-20 font-bold tracking-wider">SyncSource</p>
          <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
            Start your <br />
            journey with us
          </p>
          <p className="mb-28 leading-relaxed text-gray-200">Where Code Finds Its{" "}Home</p>
          <div className="bg-orange-500/80 rounded-2xl px-4 py-8">
            <p className="mb-3 text-gray-200">The real project was the friends we made alaong the way</p>
            <div className="">
              <div>
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full object-cover" src="src/assets/logoff.jpg" alt="Simon Lewis" />
                <p className="ml-4 w-56">
                  <strong className="block font-medium">Sambhav Sahiljeet Tanuj Aalekh</strong>
                  <span className="text-xs text-gray-200"> Published 12 Bestsellers </span>
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-20">
          <h2 className="mb-2 text-3xl font-bold">Sign Up</h2>
          <a href="#" className="mb-10 block font-bold text-gray-600">Have an account</a>
          <div className="mb-6 flex flex-col gap-y-2 gap-x-4 lg:flex-row">
  
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-4">
              <label htmlFor="username" className="text-gray-500 font-medium w-32">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="flex-1 border-gray-300 bg-white px-4 py-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="email" className="text-gray-500 font-medium w-32">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`flex-1 border-gray-300 bg-white px-4 py-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-600' : 'focus:ring-blue-600'}`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            <div className="flex items-center gap-4">
              <label htmlFor="password" className="text-gray-500 font-medium w-32">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`flex-1 border-gray-300 bg-white px-4 py-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-600' : 'focus:ring-blue-600'}`}
                placeholder="Choose a password (minimum 8 characters)"
              />
            </div>
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
            <div className="flex items-center gap-4">
              <label htmlFor="confirmPassword" className="text-gray-500 font-medium w-32">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`flex-1 border-gray-300 bg-white px-4 py-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'focus:ring-red-600' : 'focus:ring-blue-600'}`}
                placeholder="Confirm your password"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
            <div className="flex items-center gap-4">
              <label htmlFor="profilePicture" className="text-gray-500 font-medium w-32">Profile Picture</label>
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="flex-1 border-gray-300 bg-white px-4 py-2 text-gray-700 rounded-md"
              />
            </div>
            <button type="submit" className="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-orange-500 to-orange-500 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Register;