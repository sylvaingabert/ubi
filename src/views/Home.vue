<template>
  <main class="home container">
    <header>
      <h1 data-testid="title">
        Liste des salariés
      </h1>
      <div class="search-container">
        <input
          v-model="search"
          type="search"
          placeholder="Recherche..."
          class="search-input"
          data-testid="search"
          @keyup.enter="onSearch"
        >
        <ubi-btn
          modifier="primary"
          data-testid="searchbtn"
          @click="onSearch"
        >
          Recherche
        </ubi-btn>
      </div>
      <div class="add-line">
        <p>
          Nombre total de résultats: <span data-testid="total">{{ employeesModule.total }}</span>
        </p>
        <ubi-link
          :to="createRoute"
          modifier="primary"
          class="add-btn"
          data-testid="createbtn"
        >
          Ajouter un employé
        </ubi-link>
      </div>
    </header>
    <employees-list
      v-if="employeesModule.total > 0"
      :items="employeesModule.searchResults"
      class="list"
      data-testid="list"
    />
    <p
      v-else
      class="no-result"
    >
      Aucun résultat
    </p>
    <nav class="pagination-container">
      <ubi-pagination
        v-model="page"
        :total="employeesModule.pagesNumber"
      />
    </nav>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import EmployeesModule from '@/store/Employees';
import EmployeesList from '@/components/EmployeesList.vue';
import routesNames from '@/router/routesNames';

@Component({
  components: {
    EmployeesList,
  },
  metaInfo() {
    return {
      title: 'Ubi - Liste des employés',
    };
  },
})
export default class Home extends Vue {
  employeesModule = EmployeesModule;

  private search = '';

  private createRoute = { name: routesNames.EMPLOYEE_CREATE };

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

  @Watch('page')
  onPageChosen(page: number) {
    this.refreshPageNum(page);
  }

  refreshPage(search: string) {
    const params = {
      page: String(this.page),
      search,
    };
    const name = (search !== '') ? routesNames.SEARCH : routesNames.HOME;
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

  onSearch() {
    this.refreshSearch(this.search);
  }

  async mounted() {
    await this.employeesModule.init(this.$route.params);
    this.search = this.employeesModule.search;
  }
}
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
}

.list {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin: 2rem 0 0 0;
}

.search-container {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 10rem;
}

.no-result {
  padding: 2rem 0;
  font-style: italic;
}

.add-line {
  display: flex;
  flex-direction: column;
}

.add-btn {
  align-self: flex-end;
  max-width: 200px;
}
</style>
