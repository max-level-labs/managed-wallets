import Web3 from 'web3'

const instance = new Web3(Web3.givenProvider || 'http://127.0.0.1:7546')

export default instance
