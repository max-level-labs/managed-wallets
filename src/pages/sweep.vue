<template>
  <section class="container">
    <div v-if="wallets.length > 0" style="margin: auto; width: 50vw">
      <div v-for="wal in wallets" :key="wal.address">
        <wallet :wallet="wal" :sweeper="true"/>
      </div>
    </div>
    <div v-else class="alert">
      <v-alert :value="true" dismissible class="title font-weight-black" type="info"> No wallets have been created </v-alert> 
    </div>
    <div v-if="wallets.reduce((a, b) => ({ balance: a.balance + b.balance })).balance === 0" class="alert">
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
      const wallets = this.$store.state.wallet.wallets
      if (wallets.length === 0) return false
      return wallets.filter(wal => wal.balance !== 0)
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
