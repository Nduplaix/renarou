<template>
  <table class="address__table mt-3">
    <tbody>
      <tr v-for="(address, index) in addresses" :key="index">
        <th>Adresse n°{{ index + 1 }}</th>
        <td>
          {{ address.number }} {{ address.streetType }} {{ address.street }},
          {{ address.postalCode }} {{ address.city }}
        </td>
        <td class="address__table__action" v-if="edit">
          <button type="button" class="btn btn-info" @click="$emit('edit', index)">
            <i class="fas fa-edit"></i> Modifier
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('remove', address.id)">
            <i class="fas fa-trash-alt"></i> Supprimer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    addresses: { required: true, type: Array },
    edit: { required: false, default: false }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";
.address {
  &__table {
    th {
      padding-right: $wd-padding-3;
    }

    &__action {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 250px;

      @media all and (max-width: 640px){
        flex-direction: column;
        width: auto;
        height: 150px;

        .btn {
          width: 100%;
        }
      }
    }
  }
}
</style>
