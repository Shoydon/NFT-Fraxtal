import { useState, useEffect } from 'react'
import { ethers } from "ethers"


export default function MyPurchases({ marketplace, nft, account }) {

  useEffect(()=>{
    document.title = "My Purchases"
}, []); 

  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState([])


  const loadPurchasedItems = async () => {
   
      const filter =  marketplace.filters.Bought(null,null,null,null,null,account)
      
      const results = await marketplace.queryFilter(filter)

      
      const purchases = await Promise.all(results.map(async i => {
        // fetch arguments from each result
        i = i.args
        // get uri url from nft contract
        const uri = await marketplace.tokenURI(i.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
      
        const response = await fetch(uri)
        
        const metadata = await response.json()
        // get total price of item (item price + fee)
        console.log(metadata);
        const totalPrice = await marketplace.getTotalPrice(i.itemId)
        // define listed item object
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        }
        return purchasedItem
      }))
      setLoading(false)
      setPurchases(purchases)
  }

 


  useEffect( () => {
    async function load(){
      await loadPurchasedItems();
    }

    load();
   
  }, [])



  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )


  return (
    <div className="flex justify-center">
      {purchases.length > 0 ?
        <div className="px-5 container">
          <div className='flex flex-wrap  gap-4 mt-4 justify-start items-center'>
            {purchases.map((item, idx) => (
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
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No purchases</h2>
          </main>
        )}
    </div>
  );
}