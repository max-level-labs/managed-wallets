<template>
  <section class="container">
    <div v-if="wallets.length > 0" style="margin: auto; width: 50vw">
      <wallet />
      <wallet-menu />
    </div>
    <div v-else class="alert">
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
  align-items: center;
  text-align: center;
  padding: 0;
  margin: 0;
}

.alert {
  font-family: Montserrat;
  align-self: start;
  width: 100%;
}
</style>
