<template>
  <v-flex xs12>
    <v-card class="wallet" style="border-radius: 10px; margin-left: 15px;">
      <v-card-title primary-title>
        <div class="caption" style="width: 100%; margin: 10px">
          Wallet
          <div class="headline">{{ walletInfo.address }}</div>
        </div>

        <v-card-text>{{ walletInfo.balance }}
          <v-icon style="margin-left: 10px">fab fa-ethereum</v-icon>
        </v-card-text>

        <div v-if="!sweeper" class="sweep">
          <v-card-actions style="margin: auto; width: 171px">
            <v-btn class="balBtn" style="border-radius: 5px" @click="() => { getBalance(walletInfo.address) }">
              Get Balance
            </v-btn>
          </v-card-actions>
        </div>

        <div v-else class="sweep">
          <v-flex xs12 reverse>
            <v-text-field
              v-model="amount"
              label="Amount Transfer"
              style="width: 20vw; margin: auto"
            />
            <v-btn round color="success" dark @click="() => { sweep(walletInfo.address) }">Sweep</v-btn>
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
    walletInfo() {
      return this.$store.state.wallet.walletInfo
    },
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
}

.balBtn {
  background: #42275a;
  background: -webkit-linear-gradient(to right, #734b6d, #42275a);
  background: linear-gradient(to right, #734b6d, #42275a);
}

.sweep {
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
