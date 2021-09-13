// pages/creator-dashboard.js
import { useEffect, useState } from 'react'

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])

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
    setSold([
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
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Created</h2>
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
        <div className="px-4">
          <div>
            <h2 className="text-2xl py-2">Items sold</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {
                sold.map((nft, i) => (
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
    </div>
  )
}