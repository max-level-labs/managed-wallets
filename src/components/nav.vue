<template>
  <div>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <v-toolbar>
      <v-toolbar-title>
        <nuxt-link class="tabs font-weight-black" to="/">
          <v-icon>fas fa-wallet</v-icon>
          MGMT
        </nuxt-link>
      </v-toolbar-title>
      <v-toolbar-items style="margin-left: 10px;">
        <v-btn flat class="tabs">
          {{ total }}
          <v-icon style="margin-left: 10px">fab fa-ethereum</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-spacer />

      <v-toolbar-items class="hidden-sm-and-dwn">
        <v-btn flat @click="getWallet">
          <v-icon>far fa-plus-square</v-icon>
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-sm-and-dwn" style="align-items: center">
        <nuxt-link class="tabs" to="/sweep" style="height: 100%">
          <v-btn style="margin-left: 10px; display:flex;" flat dark>
            <v-icon>fas fa-broom</v-icon>
          </v-btn>
        </nuxt-link>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-sm-and-dwn" style="align-items: center">
        <nuxt-link class="tabs" to="/transfer" style="height: 100%">
          <v-btn style="margin-left: 10px; display:flex;" flat dark>
            <v-icon>fas fa-exchange-alt</v-icon>
          </v-btn>
        </nuxt-link>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-sm-and-dwn">
        <v-btn style="margin-left: 10px;" flat dark>
          <nuxt-link class="tabs" to="/auth">
            <v-icon>fas fa-user-circle</v-icon>
          </nuxt-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  computed: {
    total() {
      const wallets = this.$store.state.wallet.wallets
      if (wallets.length === 0) return 0
      return wallets.reduce((a, b) => ({
        balance: Number(a.balance) + Number(b.balance)
      })).balance
    }
  },
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

<style scoped>
.tabs {
  outline: none;
  text-decoration: none;
  color: white;
}
.row {
  padding: 10px;
}
</style>
