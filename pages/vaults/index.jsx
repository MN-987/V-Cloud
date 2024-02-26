import React, { useState } from 'react';
import styles from '../../styles/vaults/vaults.module.css';
import CryptoJS from 'crypto-js';
import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';

import Storage from '../../artifacts/contracts/storage.sol/Storage.json';
import { getLibrary } from '../../utils/getLibrary';
import { UNSET } from '../../utils/states'

export default function Docs() {
  const [file, setFile] = useState(null);
  const projectID = process.env.NEXT_PUBLIC_INFURA_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_SECRET;
  const auth = "Basic " + Buffer.from(`${projectID}:${projectSecret}`).toString("base64");
  const [account, setAccount] = useState(UNSET)
  const [size, setSize] = useState(UNSET)
  const [hash, setHash] = useState(UNSET)
  const [contract, setContract] = useState(UNSET)
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  //const accountPrivateKey = "f9137a02639d74e7d292d7d914e3f2bcf9729332d567c8aac185a8fdaa71d6a1"


  const Initialize = async () => {
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer..
    const provider = getLibrary()
    await provider.send('eth_requestAccounts', [])

    const _signer = provider.getSigner()
    const _account = await _signer.getAddress()
    console.log(_signer);
    console.log(_account);

    setAccount(prevState => _account)

    const _contract = new ethers.Contract(contractAddress, Storage.abi, provider).connect(_signer)
    console.log(_contract);
    setContract(prevState => _contract)
  }
  

  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
       const filesContainer=[];    
  function displayFiles()
  {
       var cartona = "";
       for(var i=0 ;i<filesContainer.length ;i++)
        {
          cartona+=`

            <tr>
            <td className="bg-info" >${filesContainer[i].fileName} </td>
            <td className="bg-warning">${filesContainer[i].fileSize} </td>
            <td className="bg-primary">${filesContainer[i].fileHash} </td>
            <td className="bg-primary">${filesContainer[i].fileHash} </td>

            <button className='bg-primary' onclick=''> Download </button>
            <button className='bg-danger'> Delete </button>
            <button className='bg-warning'> Share </button>
            </tr>


          `

        }
        
        document.getElementById('content').innerHTML=cartona ;

  }
  const handleUpload = () => {
    const passphrase = prompt('Enter passphrase to encrypt the file:');
    if (!passphrase) {
      return; // user clicked cancel
    }

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const fileData = fileReader.result;
      const name = file.name;
      const type = file.type;
      const encryptedData = CryptoJS.AES.encrypt(fileData, passphrase).toString();
      console.log('encrypted Data: ',encryptedData)
      // to blockchane


      // create a buffer from the encrypted data to upload to IPFS
      const buffer = Buffer.from(encryptedData, 'utf-8');

      try {
        // add the buffer to IPFS
        const result = await ipfs.add(buffer);
        console.log(result.size);
        setSize(prevState => result.size);
        setHash(prevState => result.path);
        console.log('IPFS hash:', result.cid.toString()); 
        

      } catch (error) {
        console.error('Failed to upload to IPFS:', error);
      }
      try {
        await Initialize()
        console.log('Storing the files metadata in the blockchain...')
        //const _options = { from: account, gasLimit: 3000000 }
        // console.log(size);
        // console.log(name);
        // console.log(type);
        // console.log(hash);

        const _tx = await contract.storeFile(name, size, type, hash)
        // wait for the transaction to be mined
        const _receipt = await _tx.wait()
        console.log('Receipt:', _receipt)
       var files={

        fileSize:size,
        fileName:name,
        fileType:type,
        fileHash:hash
       }    

       filesContainer.push(files);
       displayFiles();
    console.log(filesContainer) ;

      } catch (err) {
        console.log('Cannot make a transaction to store files\' metadata:', err.message)
      }
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={' vh-100 ' + `${styles.main}`}>
      <div className={' container ' + `${styles.spacer}`}>
        <div className="form">
          <div className='row py-2'>
            <div className="col-md-8 mx-auto ">
              <input className="form-control input-color my-1" id="Search" type="text" placeholder="Search files....." />
            </div>
            <div className="col-md-3  ">
              <input className="form-control input-color my-1" id="fileUpload" type="file" multiple='multiple' onChange={handleFileChange} />
            </div>
          </div>
          <div className='text-center pt-2 '>
            <p className={styles.mainText}>Your data is your</p>
            <button className="btn btn-primary mx-auto" onClick={handleUpload}>Upload</button>
          </div>
          <table class=" table table-striped rounded-1 table-hover">
            <thead class="border-dark  ">
               <div className="row ">

                <div className="col-9">
                <th class=" text-color">Files Name</th>
             
                </div>
                
               </div>
               
            </thead>
            <tbody class="text-center" id= "content">

            </tbody>
        </table>
        
        </div>

      </div>
    </div>
  );
}
