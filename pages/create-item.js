// pages/create-item.js
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'     // Interact with IPFS for uploading and downloading files
import { useRouter } from 'next/router'     // Programmatically route to different routes
import Web3Modal from 'web3modal'

// This is using Infura URL that sets and pins items to IPFS
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function CreateItem() {
	// Local state
	const [fileUrl, setFileUrl] = useState(null)	// For IPFS file
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })		// For form inputs
	const router = useRouter()		 // A refercence to the router from useRouter hook

  async function onChange(e) {
    const file = e.target.files[0]  // Take the first image that was uploaded
    try {
      // Upload the file to IPFS
      const added = await client.add(
        file,
        {
          // Progress callback
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function CreateItem() {
    // Get the inputs
    const { name, description, price } = formInput

    // Break if these input field are null
    if (!name || !description || !price || !fileUrl) return

    // First, upload to IPFS
    const data = JSON.stringify({
      name, description, image: fileUrl
    })

    try {
      // Save json data to IPFS
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url);
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

	return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={CreateItem} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Asset
        </button>
      </div>
    </div>
  )
}