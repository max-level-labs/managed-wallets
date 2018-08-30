<template>
  <div class="walletMenu">
    <div v-for="wal in wallets" :key="wal.address">
      <v-btn dark @click="() => handleClick(wal)">
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
</style>
