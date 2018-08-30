<template>
  <v-flex xs12>
    <v-card class="wallet" style="margin: 10px; border-radius: 10px">
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
            <v-btn dark>Send</v-btn>
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
    }
  },
  methods: {
    async getBalance(address) {
      await this.$store.dispatch('wallet/getBalance', { address })
    },
    async sweep(address) {
      let receiver = this.recipientAddress
      if (receiver === '') receiver = '0x0'
      await this.$store.dispatch(
        'wallet/sweep',
        {
          walletAddress: address,
          address: receiver,
          amount: this.amount
        },
        (err, result) => {
          if (err) throw err
          console.log(result)
        }
      )
    }
  }
}
</script>

<style>
.wallet {
  justify-content: center;
  align-items: center;
  /* background: #0f2027;
  background: -webkit-linear-gradient(to right, #2c5364, #203a43, #0f2027);
  background: linear-gradient(to right, #2c5364, #203a43, #0f2027); */
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
