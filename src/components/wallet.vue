<template>
  <v-flex xs12>
    <v-card class="wallet" style="margin: 10px; border-radius: 10px">
      <v-card-title primary-title>
        <div class="display-1" style="width: 100%; margin: 10px"> Wallet </div>
        <v-chip class="headline font-weight-bold" style="margin: auto">{{ wallet.address }}</v-chip>
        <v-card-text>{{ balance }} 
          <v-icon style="margin-left: 10px">fab fa-ethereum</v-icon>
        </v-card-text>
        <div v-if="!sweeper" class="sweep">
          <v-card-actions style="margin: auto; width: 171px">
            <v-btn ripple dark color="teal darken-1" style="border-radius: 15px" @click="() => { getBalance(wallet.address) }"> 
              Get Balance
              <v-icon style="margin-left: 10px">fab fa-ethereum</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
        <div v-else class="sweep">
          <v-flex xs12>
            <v-text-field
              v-model="recipientAddress"
              label="Recepient Address"
              box
              style="width: 20vw; margin: auto"
            />
          </v-flex>
          <v-flex xs12>
            <v-text-field 
              v-model="amount"
              label="Amount Transfer"
              box
              style="width: 20vw; margin: auto"
            />
          </v-flex>
          <v-flex>
            <v-btn round color="success" dark @click="() => { sweep(wallet.address) }">Sweep</v-btn>
          </v-flex>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    wallet: { type: Object, default: () => ({}) },
    sweeper: { type: Boolean, default: false }
  },
  data() {
    return {
      amount: 0,
      recipientAddress: ''
    }
  },
  computed: {
    balance() {
      return this.$store.state.wallet.wallets.find(
        wal => wal.address === this.wallet.address
      ).balance
    }
  },
  methods: {
    async getBalance(address) {
      await this.$store.dispatch('wallet/getBalance', { address })
    },
    async sweep(address) {
      let receiver = this.recipientAddress
      if (receiver === '')
        receiver = '0x0000000000000000000000000000000000000000'
      await this.$store.dispatch('wallet/sweep', {
        walletAddress: address,
        tokenAddress: receiver,
        amount: this.amount,
        callback: (err, result) => {
          if (err) throw err
          console.log(result)
        }
      })
    }
  }
}
</script>

<style>
.wallet {
  justify-content: center;
  align-items: center;
  background: #0f2027;
  background: -webkit-linear-gradient(to right, #2c5364, #203a43, #0f2027);
  background: linear-gradient(to right, #2c5364, #203a43, #0f2027);
}
.sweep {
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
