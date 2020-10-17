<template>
  <paginate
    v-model="currentPage"
    :page-count="total"
    prev-text="<"
    next-text=">"
    class="pagination"
    data-testid="pagination"
  />
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Model,
} from 'vue-property-decorator';
import Paginate from 'vuejs-paginate';

@Component({
  components: {
    Paginate,
  },
})
export default class Pagination extends Vue {
  @Model('input', { type: Number, default: 1 }) readonly page!: number;

  @Prop({ type: Number, required: true }) readonly total!: number;

  get currentPage() {
    return this.page;
  }

  set currentPage(value: number) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    justify-content: center;
    border-style: solid;
    border-color: $paginationBorderColor;
    border-width: 1px 0 1px 1px;
    color: $paginationColor;

    $bRadius: 4px;

    &:first-child,
    &:last-child {
      width: 2rem;
      font-weight: 600;
    }

    &:first-child {
      border-width: 1px 0 1px 1px;
      border-radius: $bRadius 0 0 $bRadius;
    }

    &:last-child {
      border-width: 1px;
      border-radius: 0 $bRadius $bRadius 0;
    }

    &:hover {
      background: $paginationHoverColor;
    }

    a {
      outline: none;
      padding: 0.25rem 0.5rem;
    }

    &.active {
      background: $btnPrimaryBkg;
      color: $btnPrimaryColor;
    }

    &.disabled {
      a {
        cursor: default;
        opacity: 0.5;
      }
    }
  }
}
</style>
