<template>
  <table class="address__table mt-3">
    <tbody>
      <tr class="border px-3" v-for="(address, index) in addresses" :key="index">
        <th>Adresse n°{{ index + 1 }}</th>
        <td class="address__table__label">
          {{ address.fullAddress }}
        </td>
        <td class="address__table__action" v-if="edit">
          <button type="button" class="btn btn-primary" @click="$emit('edit', index)">
            <i class="fas fa-edit"></i><span v-if="!isMobile()"> Modifier</span>
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('remove', address.id)">
            <i class="fas fa-trash-alt"></i><span v-if="!isMobile()"> Supprimer</span>
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

    &__label{
      min-width: $wd-popup-content-width-medium;

      @media all and (max-width: 640px){
        min-width: auto;
      }
    }

    &__action {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 250px;

      @media all and (max-width: 640px){
        flex-direction: column;
        width: auto;
        height: 100px;

        .btn {
          width: 100%;
        }
      }
    }
  }
}
</style>
