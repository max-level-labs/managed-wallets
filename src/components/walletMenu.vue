<template>
  <div class="walletMenu">
    <div v-for="wal in wallets" :key="wal.address">
      <v-btn style="text-transform: none !important; width: 35vw;" dark @click="() => handleClick(wal)">
        WALLET
        {{ wal.address }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    wallets() {
      return this.$store.state.wallet.wallets
    }
  },
  methods: {
    handleClick(walletInfo) {
      return this.$store.dispatch('wallet/changeWalletView', walletInfo)
    }
  }
}
</script>

<style>
.walletMenu {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  max-height: 30vh;
  min-width: 40vw;
  overflow-y: scroll;
}
</style>
