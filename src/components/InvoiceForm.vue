<template>
	<h1>Facture</h1>
	<p>Client : {{ clientFullName }}</p>
	<p>TVA : {{ this.invoices[getIndex()].vat }} %</p>
	<p>Échéance : {{ this.invoices[getIndex()].dueDate }}</p>
	<p>Prix total : {{ totalPrice }}</p>

	<h2>Client</h2>
	<template v-if="!displayClientForm">
		<Client v-bind:client="this.invoices[this.getIndex()].client" />
		<button v-on:click="showClientForm">Éditer</button>
	</template>
	<ClientForm v-else v-bind:client="invoice.client" v-on:form-submit="hideClientForm" />

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
			<template v-for="(line, index) in this.invoices[this.getIndex()].lines">
				<Line v-if="!displayLineForm[index]" v-bind:line="line" @click="handleEditLine(index)" />
				<LineForm v-else v-bind:line="line" @edit-finished="this.addLine(this.getIndex(), this)" />
			</template>
		</tbody>
	</table>
	<button v-on:click="addLine">Ajouter une ligne</button>
</template>

<script lang="ts">
	import Client from "./Client.vue";
	import ClientForm from "./ClientForm.vue";
	import Line from "./Line.vue";
	import LineForm from "./LineForm.vue";
	import { useInvoiceStore } from '@/stores/invoice';
	import { mapActions, mapState } from 'pinia';


	export default {
		

		components: {
			"Client": Client,
			"ClientForm": ClientForm,
			"Line": Line,
			"LineForm": LineForm,
		},

		setup() {
			const invoiceStore = useInvoiceStore();

			return {
				invoiceStore,
				fullName: invoiceStore.clientFullName
			}
		},

		data() {
			return {
				// invoice: {
				// 	id : 0,
				// 	client: {
				// 		firstname: "",
				// 		lastname: "",
				// 		phoneNumber: "",
				// 	},
				// 	lines: [
				// 		{
				// 			designation: "Ligne 1",
				// 			price: 30,
				// 			quantity: 5,
				// 		}
				// 	],
				// 	vat: 0,
				// 	dueDate: new Date(),
				// },
				displayClientForm: false,
				displayLineForm: [
					false
				]
			}
		},
		computed: {
			totalPrice() {
				let total = 0;

				for (let line of this.invoices[this.getIndex()].lines) {
					total += Number(line.quantity) * Number(line.price);
				}

				return total;
			},
		},
		methods: {
			addLine() {
				this.invoices[this.getIndex()].lines.push({
					designation: "",
					price: null,
					quantity: null,
				});
			},
			showClientForm() {
				this.displayClientForm = true;
			},
			hideClientForm(newClient) {
				this.displayClientForm = false;
				this.invoices[this.getIndex()].client.firstname = newClient.firstname;
				this.invoices[this.getIndex()].client.lastname = newClient.lastname;
				this.invoices[this.getIndex()].client.phoneNumber = newClient.phoneNumber;
			},
			handleEditLine(index) {
				this.displayLineForm.splice(index, 1, true);
			},
			handleEditLineFinished(index) {
				this.displayLineForm.splice(index, 1, false);
			},
			getIndex() {
				return Number( window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) )
			}
		}
	}
</script>