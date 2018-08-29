import web3 from '~/plugins/web3'
import controllerAbi from './../../build/contracts/Controller.json'
import userWalletAbi from './../../build/contracts/UserWallet.json'

const controllerAddress = '0x1cb8eec4039348769a93935f577698e0f7192d0e'
const userWalletAddress = '0xfc50d258dc2c07424001637d2fe70667b3a96714'
const controller = new web3.eth.Contract(controllerAbi.abi, controllerAddress)
const userWallet = new web3.eth.Contract(userWalletAbi.abi, userWalletAddress)

let account
web3.eth.getAccounts().then(res => {
  account = res[0]
})

export const state = () => ({
  wallets: []
})

export const mutations = {
  addAddress: (state, wallet) => {
    state.wallets.push(wallet)
  },
  updateBalance: (state, wallet) => {
    state.wallets.find(obj => {
      return obj.address === wallet.address
    }).balance = wallet.balance
  },
  sweepWallet: (state, address) => {
    state.wallets.filter(obj => obj.address !== address)
  }
}

export const actions = {
  checkBalance({ dispatch, state }) {
    return Promise.all(
      state.wallets.map(wal => {
        return dispatch('getBalance', wal)
      })
    )
  },
  async getWallet({ commit }, callback) {
    return controller.methods
      .makeWallet()
      .send(
        {
          from: account,
          gas: 9000000
        },
        (err, result) => {
          if (err) {
            console.log(`error ${err}`)
            callback(err, null)
          } else {
            console.log(`result ${result}`)
          }
        }
      )
      .then(receipt => {
        const newAddress = receipt.events.LogNewWallet.returnValues[0]
        commit('addAddress', { address: newAddress, balance: 0 })
        callback(null, newAddress)
      })
      .catch(err => {
        console.log(`call err ${err}`)
        callback(err, null)
      })
  },
  async sweep({ commit }, { walletAddress, address, amount }, callback) {
    return userWallet.methods
      .sweep(address, amount * 1000000000000000000)
      .send(
        {
          from: account,
          gas: 9000000
        },
        (err, result) => {
          if (err) {
            console.log(`error ${err}`)
            callback(err, null)
          } else {
            console.log(`result ${result}`)
          }
        }
      )
      .then(receipt => {
        const sweepLog = receipt.events.LogSweep.returnValues[0]
        commit('sweepWallet', { address: walletAddress })
        callback(null, sweepLog)
      })
      .catch(err => {
        console.error(err)
        callback(err, null)
      })
  },
  async transfer(context, params) {
    const value = web3.utils.toWei(params.value, 'ether')
    const estimateGas = await web3.eth.estimateGas({
      from: params.from,
      to: params.to,
      value: value
    })
    const receipt = await web3.eth.sendTransaction({
      from: params.from,
      to: params.to,
      value: value,
      gas: estimateGas
    })

    return receipt
  },
  async getBalance({ commit }, params) {
    const ether = await web3.eth.getBalance(params.address)
    commit('updateBalance', {
      address: params.address,
      balance: parseInt(ether) / 1000000000000000000
    })
  }
}

export const getters = {
  wallets: state => state.wallets
}
