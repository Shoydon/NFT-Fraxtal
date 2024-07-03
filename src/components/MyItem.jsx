import { useState, useEffect } from 'react'
import { ethers } from "ethers"


function renderSoldItems(items) {

 
    
  return (
    <>
      <h2>Sold</h2>
      <div className='flex flex-wrap  gap-4 mt-4 justify-start items-center'>
        {items.map((item, idx) => (
          <div className="w-1/5 h-fit bg-red-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  hover:bg-slate-400">
            
          <img
              className="rounded-t-lg overflow-hidden object-cover justify-center w-full max-h-60"
              src={item.image}
              alt="flower"
          />
    
      <div className="py-2 flex flex-col items-center flex-center">
          
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.name}
              </h5>
          
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
             <strong> For {ethers.utils.formatEther(item.totalPrice)} ETH <br></br> Recieved {ethers.utils.formatEther(item.price)} BIT</strong>
          </p>
         
      </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default function MyItem({ marketplace, account }) {
  const [loading, setLoading] = useState(true)
  const [listedItems, setListedItems] = useState([])
  const [soldItems, setSoldItems] = useState([])

  useEffect(()=>{
    document.title = "My Items"
}, []); 

  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount()
    let listedItems = []
    let soldItems = []
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx)
      // const owner=await marketplace.
      console.log(i.ogOwner);
      if (i.ogOwner === account) {
        
        // get uri url from nft contract
        const uri = await marketplace.tokenURI(i.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId)
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        }
        listedItems.push(item)
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item)
      }
    }
    setLoading(false)
    setListedItems(listedItems)
    setSoldItems(soldItems)
  }

  useEffect(() => {
    loadListedItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Fetching...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {listedItems.length > 0 ?
        <div className="px-5 py-3 container">
            <h2>Created NFT</h2>
          <div className='flex flex-wrap  gap-4 mt-4 justify-start items-center'>
            {listedItems.map((item, idx) => (
               <div className="w-1/5 h-fit bg-red-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            
               <img
                   className="rounded-t-lg overflow-hidden object-cover justify-center w-full max-h-60"
                   src={item.image}
                   alt="flower"
               />
         
           <div className="py-2 flex flex-col items-center flex-center">
               
                   <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                       {item.name}
                   </h5>
               
               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <strong>{ethers.utils.formatEther(item.totalPrice)} ETH</strong>
               </p>
              
           </div>
               </div>
            ))}
            </div>
         
            {soldItems.length > 0 && renderSoldItems(soldItems)}
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed NFT's</h2>
          </main>
        )}
    </div>
  );
}