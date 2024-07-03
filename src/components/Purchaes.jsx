import { useState, useEffect } from 'react'
import { ethers } from "ethers"

export default function Purchases({ marketplace,  account }) {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "Purchases"
    loadPurchasedItems();
  }, []);

  const loadPurchasedItems = async () => {
    const itemCount = await marketplace.itemCount();
    let purchasedItems = [];

    for (let indx = 1; indx <= itemCount; indx++) {
      const item = await marketplace.items(indx);

      // Check if the item has been sold and if the buyer is the current account
      if (item.sold && item.seller === account) {
        // Get the token URI from the NFT contract
        const uri = await marketplace.tokenURI(item.tokenId);

        // Fetch metadata from the token URI
        const response = await fetch(uri);
        const metadata = await response.json();

        // Get the total price of the item
        const totalPrice = await marketplace.getTotalPrice(item.itemId);

        // Create the item object
        let purchasedItem = {
          totalPrice,
          price: item.price,
          itemId: item.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        };

        // Add the purchased item to the list
        purchasedItems.push(purchasedItem);
      }
    }

    // Set the state with the list of purchased items
    setPurchases(purchasedItems);
    setLoading(false);
  };

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )

  return (
    <div className="flex justify-center">
      {purchases.length > 0 ?
        <div className="px-5 container">
          <div className='flex flex-wrap gap-4 mt-4 justify-start items-center'>
            {purchases.map((item, idx) => (
              <div key={idx} className="w-1/5 h-fit bg-red-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                <img
                  className="rounded-t-lg overflow-hidden object-cover justify-center w-full max-h-60"
                  src={item.image}
                  alt="NFT"
                />
                <div className="py-2 flex flex-col items-center flex-center">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <strong>{ethers.utils.formatEther(item.totalPrice)} BIT</strong>
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
