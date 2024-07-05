// import { useState, useEffect } from 'react'
// import { ethers } from "ethers"
// import { click } from '@testing-library/user-event/dist/click';

// const Home = ({ marketplace , account }) => {

//   useEffect(()=>{
//     document.title = "Home"
// }, []);

//   const [loading, setLoading] = useState(true)
//   const [items, setItems] = useState([])
//   const loadMarketplaceItems = async () => {

//     const itemCount = await marketplace.itemCount()
//     let items = []
//     for (let i = 1; i <= itemCount; i++) {
//       const item = await marketplace.items(i)
//       if (!item.sold) {

//         const uri = await marketplace.tokenURI(item.tokenId)

//         const response = await fetch(uri)
//         const metadata = await response.json()

//         const totalPrice = await marketplace.getTotalPrice(item.itemId)

//         items.push({
//           totalPrice,
//           itemId: item.itemId,
//           seller: item.seller,
//           name: metadata.name,
//           description: metadata.description,
//           image: metadata.image
//         })
//       }
//     }
//     setLoading(false)
//     setItems(items)

//   }

//   const viewMarketItem = async (item) => {
//     // await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
//     // await marketplace.item.seller=account;
//     await (await marketplace.seeNFT(item.itemId)).wait();
//     loadMarketplaceItems()
//   }

//   useEffect(() => {
//     loadMarketplaceItems()
//   }, [])
//   if (loading) return (
//     <main style={{ padding: "1rem 0" }}>
//       <h2>Loading...</h2>
//     </main>
//   )
//   const homeClick=()=>{
//     console.log("click");
//   }
//   return (
//     <>
//     <div className="flex justify-center">
//       {items.length > 0 ?
//       <div className="px-5 py-3 container">
//         <div className='flex flex-wrap  gap-4 mt-4 justify-start items-center'>
//             {items.map((item, idx) => (


//         <div className="w-1/5 h-fit bg-red-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">

//                 <img
//                     className="rounded-t-lg overflow-hidden object-cover justify-center w-full max-h-60"
//                     src={item.image}
//                     alt="flower"
//                 />

//             <div className="py-2 flex flex-col items-center flex-center">

//                     <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                         {item.name}
//                     </h5>

//                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                    <strong>{ethers.utils.formatEther(item.totalPrice)} BIT</strong>
//                 </p>
//                 <a onClick={() => viewMarketItem(item)} className="inline-flex no-underline w-20 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                    Buy
//                     <svg
//                         className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 14 10"
//                     >
//                         <path
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M1 5h12m0 0L9 1m4 4L9 9"
//                         />
//                     </svg>
//                 </a>
//             </div>
//         </div>

//             ))}
//          </div>
//         </div>
//         : (
//           <main style={{ padding: "1rem 0" }}>
//             <h2>No listed assets</h2>
//           </main>
//         )}
//         </div>
//     </>
//   );
// }
// export default Home


import { useState, useEffect } from 'react';
// import { ethers } from "ethers";
import Info from './Info';
import { toast } from 'react-toastify';
import Web3 from 'web3';
import ChangeNetwork from './changeNetwork';

const Home = ({ marketplace, account, sendTra, connectedNetwork }) => {
  useEffect(() => {
    document.title = "Home";
    console.log(marketplace);
  }, []);

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false); // State for toggling Info component
  const [nftitem, setNftitem] = useState(null); // State to store NFT item

  const loadMarketplaceItems = async () => {

    console.log("Insside  of Load MarketPlace Items");
    try {
      const itemCounts = await marketplace.methods.itemCount().call();
      const itemCount = Number(itemCounts);
      console.log("Itemcount App", itemCount);
      let items = [];
      console.log("Before for");
      for (let i = 1; i <= itemCount; i++) {
        const item = await marketplace.methods.items(i).call();
        console.log(item);
        if (!item.sold) {
          const uri = await marketplace.methods.tokenURIs(item.tokenId).call();
          console.log(uri);
          const response = await fetch(uri);
          console.log(response);
          const metadata = await response.json();
          const totalPrice = await marketplace.methods.getTotalPrice(item.itemId).call();
          items.push({
            totalPrice,
            itemId: item.itemId,
            seller: item.seller,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            video: metadata.video,
          });
        }
      }
      setLoading(false);
      setItems(items);
    } catch (error) {
      console.log("Wallet connect inside loadmaretplace", error)
    }

  };
  const Changestate = async () => {
    setToggle(!toggle);
  }
  const delay = async (ms) => {
    return new Promise((resolve) =>
      setTimeout(resolve, ms));
  };

  const viewMarketItem = async (item) => {

    const owneris = await marketplace.methods.getOwner(item.itemId).call();
    console.log("The Owner is", owneris);
    console.log("Connected is ", account);
    if (account) {
      console.log("This is it");
    }
    else {
      alert('Please connect to the MetaMask wal')
    }

    try {
      // const tx = await sendTra(owneris, item.totalPrice);
      // await new Promise(resolve => setTimeout(resolve, 5000));
      // console.log("This is TX", tx);
      const web3 = new Web3(window.ethereum);
      const txObject = {
        from: account, // Use the default account provided by MetaMask or set it explicitly
        // from: web3.eth.defaultAccount, // Use the default account provided by MetaMask or set it explicitly
        to: owneris,
        value: item.totalPrice,
      };
      web3.eth
        .sendTransaction(txObject)
        .on("transactionHash", async function (hash) {
          console.log("Transaction sent successfully. Hash:", hash);
          console.log("code is not present result");
          // if (tx) {
            const response = await marketplace.methods.seeNFT(item.itemId).call();
            // const uri = await response.wait(); // Wait for the transaction to complete

            // const links=await marketplace.tokenURIs(item.itemId).call();
            const links = response;
            console.log("Links", links);
            const responses = await fetch(links);
            // console.log("Result",result);
            const result = await responses.json();
            console.log("Result", result);
            // console.log("This is tx code", tx.code);
            await delay(2000);
            setToggle(true); // Set toggle to true to show Info component
            // loadMarketplaceItems();
            setNftitem(result);
          // }
          // else {
          //   toast.error("Transaction failed")
          // }
        })
        .on("error", function (error) {
          console.error("Error sending transaction:", error);
        });

      // if (tx.code) {
      //   if (tx.code.toString() === 'CONTRACT_VALIDATE_ERROR') {

      //     // toast.error("Transaction faileds")
      //     throw 'error'
      //   }
      // }
      // else {
      //   console.log("code is not present result");
      //   if (tx) {
      //     const response = await marketplace.methods.seeNFT(item.itemId).call();
      //     // const uri = await response.wait(); // Wait for the transaction to complete

      //     // const links=await marketplace.tokenURIs(item.itemId).call();
      //     const links = response;
      //     console.log("Links", links);
      //     const responses = await fetch(links);
      //     // console.log("Result",result);
      //     const result = await responses.json();
      //     console.log("Result", result);
      //     console.log("This is tx code", tx.code);
      //     await delay(2000);
      //     setToggle(true); // Set toggle to true to show Info component
      //     // loadMarketplaceItems();
      //     setNftitem(result);
      //   }
      //   else {
      //     toast.error("Transaction failed")
      //   }
      // }

    } catch (error) {
      console.log(error);
      console.log("Here error");
      toast.error("Transaction fail")
    }


  };

  useEffect(() => {
    try {
      loadMarketplaceItems();
    } catch (error) {
      console.log("Wallet connect ", error);
    }

  }, []);

  const homeClick = () => {
    console.log("click");
  };

  return (
    <>
    {!connectedNetwork && <ChangeNetwork/>}
      {toggle ? (
        <Info Changestate={() => setToggle(false)} nftitem={nftitem} />
      ) : (
        <div className="flex justify-center min-h-screen">
          {items.length > 0 ? (
            <div className="container mx-auto mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item, idx) => (
                  <div key={idx} className="bg-gray-100 rounded-lg shadow-md dark:bg-gray-800 hover:transform hover:scale-105 transition-transform duration-300">
                    <img
                      className="rounded-t-lg object-cover w-full h-56"
                      src={item.image}
                      alt={item.name}
                    />
                    {/* {console.log(item)} */}
                    <div className="p-4">
                      <h5 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{item.name}</h5>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {/* <strong>1 TRX</strong> */}
                        <strong>{Number(item.totalPrice)} TRX</strong>
                      </p>

                      {connectedNetwork && <button onClick={() => viewMarketItem(item)} className="mt-4 w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-transform transform duration-300 bg-gradient-to-r from-blue-500 to-purple-600 border border-transparent rounded-lg shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        Play
                        <svg
                          className="rtl:rotate-180 w-4 h-4 inline-block ml-2 -mt-px"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 14 10"
                          fill="none"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <main className="container mx-auto mt-8">
              <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white">Loading</h2>
            </main>
          )}
        </div>
      )}
    </>



  );
};

export default Home;
