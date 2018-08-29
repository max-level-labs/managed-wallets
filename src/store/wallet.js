import web3 from '~/plugins/web3'
import controllerAbi from './../../build/contracts/Controller.json'
import userWalletAbi from './../../build/contracts/UserWallet.json'

const controllerAddress = '0x885ab717fabe2d7d45132fd4cbbce2affe5faf00'
// const controllerAddress = '0x321da16bc5b58cd38b67191d6831f88ae7dfc043' //rinkeby
// const userWalletAddress = '0x128e075a4c47e04910f56e0413bb33dbf5bbfec9' //rinkeby
const controller = new web3.eth.Contract(controllerAbi.abi, controllerAddress)

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
    }).balance =
      wallet.balance
  },
  sweepWallet: (state, address) => {
    if (state.wallets.find(wal => wal.address === address).balance === '0') {
      state.wallets = state.wallets.filter(wal => wal.address !== address)
    }
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
          gas: 6000000
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
  async sweep(
    { dispatch, commit },
    { walletAddress, tokenAddress, amount, callback }
  ) {
    const transferAmount = Number(amount) * 1000000000000000000
    const userWalletAddress = walletAddress
    const userWallet = new web3.eth.Contract(
      userWalletAbi.abi,
      userWalletAddress
    )
    return userWallet.methods
      .sweep(tokenAddress, transferAmount)
      .send(
        {
          from: account,
          gas: 6000000
        },
        (err, result) => {
          if (err) {
            console.log(`error ${err}`)
            callback(err, null)
          } else {
            console.log(`result ${result}`)
            web3.eth.getTransaction(result).then(console.log)
          }
        }
      )
      .then(() => {
        commit('sweepWallet', walletAddress)
        dispatch('getBalance', { address: walletAddress })
      })
      .catch(err => {
        console.error(err)
        callback(err, null)
      })
  },
  async transfer({ dispatch }, params) {
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
    dispatch('checkBalance')
    return receipt
  },
  async getBalance({ commit }, params) {
    const ether = await web3.eth.getBalance(params.address)
    commit('updateBalance', {
      address: params.address,
      balance: (parseInt(ether) / 1000000000000000000).toString()
    })
  }
}

export const getters = {
  wallets: state => state.wallets
}
