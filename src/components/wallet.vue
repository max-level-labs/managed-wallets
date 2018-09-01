<template>
  <v-flex xs12>
    <v-card class="wallet" style="border-radius: 10px; margin-left: 15px; width: 40vw">
      <v-card-title primary-title style="padding: 10px 10px 10px 10px;">
        <div class="subheading" style="width: 100%; margin: auto; font-weight: 600">
          <v-icon style="margin-right: 5px">fas fa-wallet</v-icon>
          {{ walletInfo.address }}
        </div>
        <v-card-text class="subheading" style="margin-right: 10px;">{{ walletInfo.balance }}
          <v-icon style="margin-left: 10px">fab fa-ethereum</v-icon>
        </v-card-text>
        <div v-if="!sweeper" class="sweep">
          <v-card-actions style="margin: auto; width: 171px">
            <v-btn class="balBtn" style="border-radius: 5px; font-weight: 800" @click="() => { getBalance(walletInfo.address) }">
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
    sweeper: { type: Boolean, default: false },
    address: { type: String, default: '' }
  },
  data() {
    return {
      amount: '',
      recipientAddress: ''
    }
  },
  computed: {
    walletInfo() {
      if (this.sweeper === true) {
        console.log(this.address)
        return this.$store.state.wallet.wallets.find(
          wal => wal.address === this.address
        )
      }
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
  margin-bottom: 20px;
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
