const Info = ({ Changestate, nftitem }) => {
    if (!nftitem) {
        return <div>Loading...</div>; // Render a loading message or component if nftitem is null
    }

    console.log(nftitem);

    return (
        <>
            <div className="flex items-center justify-center p-8 gap-4 border rounded-lg text-white">
                <div className="flex flex-col flex-grow">
                    <h1 className="text-3xl font-bold bg-gray-800 p-4 rounded-t-lg">NFT Name: {nftitem.name}</h1>
                    <div className="bg-gray-800 p-4 rounded-b-lg">
                        <p className="font-semibold">Item Description:</p>
                        <p>{nftitem.description}</p>
                    </div>
                </div>
                <div className="flex-shrink">
                    <video src={nftitem.video} className="h-auto max-h-96 w-auto" autoPlay controls />
                </div>
            </div>
            <div className="flex justify-center p-10">
                {/* <button onClick={Changestate} className="mt-8 px-6 py-3 bg-black text-red-500 text-xl rounded-lg hover:bg-red-500 hover:text-white focus:outline-none focus:bg-red-500 focus:text-white transition duration-300 ease-in-out">Exit</button> */}
                <a href="#_" class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
                    <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                    <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span onClick={Changestate} class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">EXIT</span>
                </a>
            </div>
        </>


    );
}

export default Info;


