import { defineStore, mapState, mapStores } from 'pinia';
import { watch } from 'vue'

export const useInvoiceStore = defineStore('invoiceStore', {
  
  state: () => ({
    invoices: [
      {
        id: 0,
        client: {
          firstname: "Sandro",
          lastname: "Bakuradze",
          phoneNumber: "0764250842",
        },
        lines: [
          {
            designation: "Ligne 1",
            price: 30,
            quantity: 5,
          }
        ],
        vat: 0,
        dueDate: new Date(),
      },
    ],
    invoice: null
    // invoice: {
    //   id: 0,
    //   client: {
    //     firstname: "",
    //     lastname: "",
    //     phoneNumber: "",
    //   },
    //   lines: [
    //     {
    //       designation: "Ligne 1",
    //       price: 30,
    //       quantity: 5,
    //     }
    //   ],
    //   vat: 0,
    //   dueDate: new Date(),
    // },
  }),


  getters: {

    getInvoiceById: (state) => {
      return (invoiceId: number) => state.invoices.find((invoice) => invoice.id == invoiceId)
    },
    
    totalPrice(state) {
      
      return function(idx) {
        let total = 0;
        for (let line in state.invoices[idx].lines) {
          console.log(line.quantity + " " + line.price);
          total += Number(line.quantity) * Number(line.price);
        }
        return total;
      }
    },

    clientFullName: (state) => {
      return (idx: number) => {
        return `${state.invoices[idx].client.firstname} ${state.invoices[idx].client.lastname} (${state.invoices[idx].client.phoneNumber})`
      }
    }
    
  },
  
  actions: {

    addInvoiceLine(invoiceId, line) {
      this.invoices[invoiceId].lines.push(line)
    },

    addInvoice(invoice) {
      this.invoices.push(invoice);
    }

  },

})

