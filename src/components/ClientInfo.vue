<template>
  <p>Client : {{ clientFullName }}</p>
	<p>TVA : {{ invoice.vat }} %</p>
	<p>Échéance : {{ invoice.dueDate }}</p>
	<p>Prix total : {{ totalPrice }}</p>
</template>

<script>
  import Client from "./Client.vue";

  export default {
    components: {
      "Client": Client,
    },
    data() {
      return {

      }
    },
    computed: {
      clientFullName() {
				return `${this.invoice.client.firstname} ${this.invoice.client.lastname} (${this.invoice.client.phoneNumber})`;
      }
    }
  }
</script>