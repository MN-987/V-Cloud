import { ethers } from 'ethers'

export const getLibrary = () => {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

    provider.on('network', (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload()
      }
    })
    return provider
  } else if (typeof window.web3 !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.web3.currentProvider, 'any')
    provider.on('network', (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload()
      }
    })
    return provider
  } else {
    return null
  }
}
