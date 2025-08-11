function UserProfile() {
  return (
    <div className=" bg-gray-100 rounded-lg shadow-lg max-w-xs sm:p-4 md:p-8 md:max-w-sm md:mx-auto my-20 hover:shadow-xl">
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="rounded-full mx-auto sm:w-24 sm:h-24 md:h-36 md:w-36 object-cover border-4 border-blue-500 hover:scale-110 transition-transform duration-300 ease-in-out"
      />
      <h1 className="sm:text-lg md:text-xl text-blue-800 my-4 hover:text-blue-500">
        John Doe
      </h1>
      <p className="text-gray-600 md:text-base sm:text-sm ">
        Developer at Example Co. Loves to write code and explore new
        technologies.
      </p>
    </div>
  );
}

export default UserProfile;