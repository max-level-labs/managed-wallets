<template>
  <section class="container">
    <div v-if="wallets.length > 0" class="walletDisplay" style="display: flex;">
      <wallet />
      <wallet-menu />
    </div>
    <div v-else class="alert" >
      <v-alert :value="true" dismissible class="title font-weight-black" type="info"> No wallets have been created </v-alert> 
    </div>
  </section>
</template>

<script>
import Wallet from './../components/wallet.vue'
import WalletMenu from '~/components/walletMenu.vue'

export default {
  components: {
    Wallet,
    WalletMenu
  },
  computed: {
    wallets() {
      return this.$store.state.wallet.wallets
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  max-width: 100vw;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: start;
  text-align: center;
  margin: 0;
  padding: 0;
}

.walletDisplay {
  padding: 50px;
}

.alert {
  font-family: Montserrat;
  align-self: start;
  width: 100%;
}
</style>
