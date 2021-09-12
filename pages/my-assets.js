// pages/my-assets.js
import { useEffect, useState } from 'react'

export default function MyAssets() {
	const [nfts, setNfts] = useState([])

	useEffect(() => {
    setNfts([
      {
        price: '1',
        tokenId: 1,
        seller: "0x0wef2131",
        owner: "0x0123123123",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1366&q=80",
        name: "Flower",
        description: "It is a flower",
      }
    ])
  }, [])
	return (
    <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}