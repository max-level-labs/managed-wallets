<template>
  <section class="container">
    <div v-if="funded.length > 0" style="margin: auto; width: 50vw">
      <wallet v-for="wal in funded" :key="wal.address" :sweeper="true"/>
    </div>
    <div v-if="wallets.length === 0" class="alert">
      <v-alert :value="true" dismissible class="title font-weight-black" type="info"> No wallets have been created </v-alert> 
    </div>
    <div v-if="wallets.length > 0 && funded.length === 0" class="alert">
      <v-alert :value="true" dismissible class="title font-weight-black" type="info"> Wallets have no funds </v-alert>
    </div>
  </section>
</template>

<script>
import wallet from './../components/wallet.vue'

export default {
  components: {
    wallet
  },
  computed: {
    wallets() {
      return this.$store.state.wallet.wallets
    },
    funded() {
      return this.$store.state.wallet.wallets.filter(wal => wal.balance !== '0')
    }
  },
  async fetch({ store }) {
    await store.dispatch('wallet/checkBalance')
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
  padding: 0;
  margin: 0;
}

.alert {
  font-family: Montserrat;
  align-self: start;
  width: 100%;
}
</style>
