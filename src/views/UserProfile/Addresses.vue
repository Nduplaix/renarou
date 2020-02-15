<template>
  <div>
    <div class="text-center">
      <span class="h1">Gérer mes adresses</span>
    </div>
    <addresses-list
      :addresses="currentUser.addresses"
      :edit="true"
      @edit="updateAddress"
      @remove="deleteAddress"
    />
    <button type="button" class="btn btn-info mt-3" @click="updateDisplayCreate">
      <i class="fas fa-plus"></i> Ajouter une adresse
    </button>
    <address-form
      v-if="showCreate"
      cancel-button-label="Annuler"
      @hideAddress="updateDisplayCreate"
    >
      Ajouter une adresse
    </address-form>
    <address-form
      v-if="showEdit"
      :id="selectedAddress.id"
      :number="selectedAddress.number"
      :street="selectedAddress.street"
      :street-type-selected="selectedAddress.streetType"
      :postal-code="selectedAddress.postalCode"
      :city="selectedAddress.city"
      cancel-button-label="Annuler"
      :edit="true"
      @hideAddress="updateDisplayEdit"
    >
      Modifier mon adresse
    </address-form>
    <pop-up v-if="showDelete">
      <div class="text-center h2">Voulez vous vraiment supprimer cette adresse?</div>
      <div class="d-flex flex-column align-items-center">
        <button class="popin-btn btn btn-danger btn-block" @click="confirmDelete">
          Supprimer cette adresse
        </button>
        <button
          type="button"
          class="popin-btn btn btn-primary btn-block"
          @click="updateDisplayDelete(false)"
        >
          Annuler
        </button>
      </div>
    </pop-up>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddressesList from "../../components/Addresses/AddressesList";
import AddressForm from "../../components/Form/AddressForm";
import PopUp from "../../components/PopUp/PopUp";

export default {
  components: {
    PopUp,
    AddressForm,
    AddressesList
  },
  computed: {
    ...mapGetters("user", ["currentUser"])
  },
  data() {
    return {
      user: {},
      selectedAddress: null,
      addressToDeleteId: null,
      showEdit: false,
      showCreate: false,
      showDelete: false
    };
  },
  watch: {
    currentUser: function() {
      this.user = this.currentUser;
    }
  },
  mounted() {
    this.user = this.currentUser;
  },
  methods: {
    ...mapActions("user", ["removeAddress"]),

    updateAddress(index) {
      this.selectedAddress = this.currentUser.addresses[index];
      this.updateDisplayEdit();
    },
    deleteAddress(id) {
      this.addressToDeleteId = id;
      this.updateDisplayDelete();
    },
    confirmDelete() {
      this.removeAddress({ id: this.addressToDeleteId });
      this.addressToDeleteId = null;
      this.updateDisplayDelete(false);
    },
    updateDisplayEdit(show = true) {
      if (!show) {
        this.selectedAddress = null;
      }

      this.showEdit = show;
    },
    updateDisplayCreate(show = true) {
      this.showCreate = show;
    },
    updateDisplayDelete(show = true) {
      this.showDelete = show;
    }
  }
};
</script>
