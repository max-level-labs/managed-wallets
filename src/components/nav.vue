<template>
  <div>
    <v-toolbar>
      <v-toolbar-title><nuxt-link class="tabs display-2 font-weight-black" to="/">Wallet</nuxt-link></v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-dwn">
        <v-btn style="margin-left: 10px;" flat dark><nuxt-link class="tabs font-weight-medium" to="/sweep">Sweep Wallet</nuxt-link></v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-dwn">
        <v-btn style="margin-left: 10px;" flat dark><nuxt-link class="tabs font-weight-medium" to="/transfer">Transfer</nuxt-link></v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-dwn">
        <v-btn flat @click="getWallet">Create Wallet</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  methods: {
    async getWallet() {
      await this.$store.dispatch('wallet/getWallet', (err, result) => {
        if (err) throw err
        this.walletAddress = result
      })
    }
  }
}
</script>

<style>
.tabs {
  outline: none;
  text-decoration: none;
  color: white;
}
.row {
  padding: 10px;
}
</style>
