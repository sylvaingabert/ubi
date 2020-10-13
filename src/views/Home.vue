<template>
  <div class="home">
    <h1>Liste des salariés</h1>
    <input
      type="search"
      v-model="search"
      placeholder="Recherche..."
      @keyup.enter="onSearch"
    />
    <button
      type="button"
      @click="onSearch"
    >Recherche</button>
    <p>Nombre total de résultats: {{ employeesModule.total }}</p>
    <div v-if="employeesModule.total > 0">
      <ul class="container mx-auto flex flex-col flex-auto w9/12">
        <employee-line
          v-for="(employee, index) in employeesModule.searchResults"
          :key="index"
          :employee="employee"
        />
      </ul>
    </div>
    <p v-else>No result</p>
    <paginate
      v-model="page"
      :page-count="employeesModule.pagesNumber"
      :click-handler="onPageChosen"
      :container-class="'pagination'"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Paginate from 'vuejs-paginate';
import EmployeesModule from '@/store/Employees';
import EmployeeLine from '@/components/EmployeeLine.vue';

@Component({
  components: {
    EmployeeLine,
    Paginate,
  },
})
export default class Home extends Vue {
  employeesModule = EmployeesModule;

  private search = '';

  set page(value: number) {
    this.employeesModule.setPage(value);
  }

  get page(): number {
    return this.employeesModule.page;
  }

  @Watch('search')
  onSearchChanged(value: string) {
    if (value === '') {
      this.refreshSearch(value);
    }
  }

  @Watch('employeesModule.numInCurrentPage', { immediate: true })
  onTotalChanged(value: number) {
    if (value === 0 && this.page > 1) {
      this.refreshPageNum(this.page - 1);
    }
  }

  refreshPage(search: string) {
    const params = {
      page: String(this.page),
      search,
    };
    const name = (search !== '') ? 'Search' : 'Home';
    this.$router.push({ name, params }).catch(() => null);
  }

  refreshPageNum(page: number) {
    this.employeesModule.setPage(page);
    this.refreshPage(this.employeesModule.search);
  }

  refreshSearch(search: string) {
    this.employeesModule.resetSearch(search);
    this.refreshPage(this.employeesModule.search);
  }

  onPageChosen(page: number) {
    this.refreshPageNum(page);
  }

  onSearch() {
    this.refreshSearch(this.search);
  }

  mounted() {
    this.employeesModule.init(this.$route.params);
    this.search = this.employeesModule.search;
  }
}
</script>

<style>
.disabled a {
  opacity: 0.5;
}
</style>
