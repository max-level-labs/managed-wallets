const DefaultSweeper = artifacts.require('DefaultSweeper')
const Token = artifacts.require('Token')
const Controller = artifacts.require('Controller')
const UserWallet = artifacts.require('UserWallet')

module.exports = function(deployer) {
  deployer.deploy(Token)
  deployer.deploy(Controller).then(() => {
    return deployer.deploy(DefaultSweeper, Controller.address);
  }).then(() => {
    return deployer.deploy(UserWallet, Controller.address);
  })
}
