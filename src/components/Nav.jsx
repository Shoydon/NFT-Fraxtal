import React from 'react';
import { Link } from "react-router-dom";

function Nav({ account, checkTronLink,loading }) {

  return (

    <nav className="border-gray-200 bg-gray-700 dark:bg-gray-700 dark:border-gray-700 transition ease-in-out hover:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between p-4">
          <div className="flex cursor-pointer items-center space-x-3 rtl:space-x-reverse">
            <Link to='/' className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white no-underline">Ignitus Networks</Link>
          </div>

          <div className="flex justify-around w-full max-w-md">
            <Link to="/home" className="no-underline text-gray-200 text-lg font-semibold transition-colors duration-300 hover:text-white hover:font-bold">Home</Link>
            <Link to="/create" className="no-underline text-gray-200 text-lg font-semibold transition-colors duration-300 hover:text-white hover:font-bold">Create</Link>
            {loading ? (<button onClick={checkTronLink} type="button" class="border-[0.5px] p-1 w-22  h-9 text-white bg-gradient-to-r from-purple-700 to-pink-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Connect Wallet</button>) : (<button onClick={checkTronLink} type="button" class="border-[0.5px] p-1 w-22  h-9 text-white bg-gradient-to-r from-purple-700 to-pink-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{account[0].slice(0, 6) + '...' + account[0].slice(account[0].length - 4)}</button>)}

            {/* <Link to="/my-listed-nfts" className="no-underline text-gray-200 text-lg font-semibold transition-colors duration-300 hover:text-white">My Listed Items</Link>
        <Link to="/my-purchases" className="no-underline text-gray-200 text-lg font-semibold transition-colors duration-300 hover:text-white">My Purchases</Link> */}
          </div>
        </div>
      </div>
    </nav>



  )
}

export default Nav