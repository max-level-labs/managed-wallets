<template>
  <div class="transfer">
    <v-layout align-center justify-end column fill-height>
      <h3 class="paragraph-title">Transfer tokens</h3>
      <div class="row">
        <v-text-field
          v-model="senderAddress"
          label="Sender Address"
          style="width: 50vw; margin: auto"
        />
      </div>
      <div class="row">
        <v-text-field
          v-model="recipientAddress"
          label="Recepient Address"
          style="width: 50vw; margin: auto"
        />
      </div>
      <div class="row">
        <v-text-field
          v-model="amount"
          label="Amount Transfer"
          style="width: 50vw; margin: auto"
        />
      </div>
      <div class="row">
        <v-btn class="transBtn" @click="transfer">Send transaction</v-btn>
      </div>
      <v-card v-if="transferReceipt" style="width: 50vw; overflow-y: scroll; padding: 10px">
        Receipt:
        <v-card-title style="color:green;">{{ transferReceipt }}</v-card-title>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      senderAddress: '',
      recipientAddress: '',
      transferReceipt: '',
      amount: ''
    }
  },
  methods: {
    async transfer() {
      this.transferReceipt = await this.$store.dispatch('wallet/transfer', {
        to: this.recipientAddress,
        from: this.senderAddress,
        value: this.amount
      })
    }
  }
}
</script>

<style>
.transfer {
  margin: auto;
  margin-top: 50px;
}
.transBtn {
  background: #42275a;
  background: -webkit-linear-gradient(to right, #734b6d, #42275a);
  background: linear-gradient(to right, #734b6d, #42275a);
}
.row {
  margin: auto;
}
</style>
