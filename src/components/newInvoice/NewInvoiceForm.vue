<template >
  <h1>Nouvelle Facture</h1>
  <br>
  <h2>Client</h2>
  <p>
		Prénom : <input type="text" v-model="invoice.client.firstname" />
		<br>
		Nom : <input type="text" v-model="invoice.client.lastname" />
		<br>
		Numéro : <input type="phone" v-model="invoice.client.phoneNumber" />
	</p>

  <h2>Lignes</h2>
	<table>
		<thead>
			<tr>
				<td>Désignation</td>
				<td>Prix</td>
				<td>Quantité</td>
				<td>Total</td>
			</tr>
		</thead>
    <tbody>
      <template v-for="(line, index) in this.invoice.lines">
        <Line v-if="!displayLineForm[index]" v-bind:line="line" @click="handleEditLine(index)" />
        <LineForm v-else v-bind:line="line" @edit-finished="handleEditLineFinished(index)"/>
      </template>
    </tbody>
  </table>
  <button @click="addLine">Ajouter une ligne</button>
  <br>
  <h3>VAT</h3>
  VAT : <input type="number" v-model="vat" />

  <br>
  <router-link to="/">
    <button @click="handleAddInvoice(this.invoice)">Ajoute aux donnees</button>
  </router-link>

</template>

<script>
  import Line from "@/components/Line.vue";
  import LineForm from "@/components/LineForm.vue";
  import { useInvoiceStore } from '@/stores/invoice';

  export default {
    setup() {
      const invoiceStore = useInvoiceStore();

      return {invoiceStore}
    },

    data() {
      return {
        invoice: {
          id: this.invoiceStore.invoices.length,
          client: {
						firstname: "",
						lastname: "",
						phoneNumber: "",
					},
					lines: [],
					vat: null,
					dueDate: new Date(),
        },
        displayLineForm: [
          true
        ]
      }
    },

    methods: {
      addLine() {
        this.invoice.lines.push({
          designation: "",
          price: null,
          quantity: null
        })
      },

      handleEditLine(index) {
        this.displayLineForm.splice(index, 1, true);
      },

      handleEditLineFinished(index) {
        this.displayLineForm.splice(index, 1, false);
      },

      handleAddInvoice(invoice) {
        this.invoiceStore.addInvoice(invoice);
        router.push({path: '/'})
      }
    },

    components: {
      "Line": Line,
      "LineForm": LineForm
    }

  }
</script>