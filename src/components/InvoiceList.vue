<template>
  <h1>Mon site de facturation</h1>
  <router-link to="/newInvoice">Nouveau devis</router-link>

  <h3>Liste de factures</h3>
  <table border="1">
    <thead>
      <tr>
        <td>Numero</td>
        <td>Client</td>
        <td>Date</td>
        <td>Montant (Eur)</td>
      </tr>
    </thead>
        <!-- <InvoiceLine /> -->

      <tr v-if="this.invoiceStore.invoices" v-for="invoice in this.invoiceStore.invoices" @click="handleChangeToInvoiceView(invoice.id)">
        <td>{{ invoice.id + 1 }}</td>
        <td>{{ invoice.client.firstname + " " + invoice.client.lastname }}</td>
        <td>{{ invoice.date }}</td>
        <td></td>
      </tr>
  </table>
</template>

<script lang="ts">
  import { useInvoiceStore } from "@/stores/invoice";
  import { mapState, storeToRefs } from "pinia";
  import InvoiceLine from "./InvoiceLine.vue";
import router from '../router/index';

  // const invoiceStore = storeToRefs(useInvoiceStore());
  // const invoiceStore = useInvoiceStore()

  export default {
    setup() {
      const invoiceStore =  useInvoiceStore() ;

      return {invoiceStore}
    },

    computed: {
        clientFullName: (invoice) => {
            return `${invoice.client.firstname} ${invoice.client.lastname}`;
        }
    },
    components: { InvoiceLine },
    methods: {
      handleChangeToInvoiceView: (index: number) => {
        router.push({path: '/invoice/' + index})
      }
    }
}
</script>