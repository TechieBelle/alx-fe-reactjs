import React from 'react'

const NavBar = () => {
  return (
    <div>
      <nav className="flex justify-around items-center p-4">
        <div>FOODEAT</div>
        <ul className="flex gap-10">
          <li>HOME</li>
          <li>MENU</li>
          <li>ABOUT</li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar