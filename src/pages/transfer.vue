<template>
  <div class="transfer">
    <h3 class="paragraph-title">Transfer tokens</h3>
    <div class="row">
      <v-text-field
        v-model="senderAddress"
        label="Sender Address"
        box
        style="width: 20vw; margin: auto"
      />
    </div>
    <div class="row">
      <v-text-field
        v-model="recipientAddress"
        label="Recepient Address"
        box
        style="width: 20vw; margin: auto"
      />
    </div>
    <div class="row">
      <v-text-field 
        v-model="amount"
        label="Amount Transfer"
        box
        style="width: 20vw; margin: auto"
      />
    </div>
    <div class="row">
      <v-btn round color="success" dark @click="transfer">Send transaction</v-btn>
    </div>
    <v-card v-if="transferReceipt" style="width: 20vw; overflow-y: scroll; padding: 10px">
      Receipt:
      <v-card-title style="color:green;  ">{{ transferReceipt }}</v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      senderAddress: '',
      recipientAddress: '',
      transferReceipt: '',
      amount: 0
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
}
.row {
  margin: auto;
}
</style>
