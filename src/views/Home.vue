<template>
  <div class="container mx-auto mb-5">
    <Tabs
      :tab="tab"
      :search="search"
      @changeTab="changeTab"
      @setSearch="setSearch"
    />
    <MoviesList
      v-if="tab === 'movies'"
      :movies="movies"
      :loading="loading"
      @toggleFavourite="toggleFavourite"
    />
    <MoviesList
      v-if="tab === 'favourites'"
      :movies="favouritesMovies"
      :loading="loading"
      @toggleFavourite="toggleFavourite"
    />
    <Pagination
      v-if="tab !== 'favourites'"
      @pagechanged="pagechanged"
      :pagination="pagination"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, computed } from "vue";
import MoviesList from "@/components/MoviesList.vue"; // @ is an alias to /src
import Pagination from "@/components/Pagination.vue";
import Tabs from "@/components/Tabs.vue";
import Movie from "@/types/Movie";
import PaginationType from "@/types/Pagination";
import MovieAPIService from "@/services/MovieList";
import MovieListReponse from "@/types/MovieListReponse";

export default defineComponent({
  name: "Home",
  components: {
    MoviesList,
    Pagination,
    Tabs,
  },
  setup() {
    const moviesListResponse = ref<MovieListReponse>({
      page: 0,
      per_page: 0,
      total: 0,
      total_pages: 0,
      data: [],
    });
    const pagination = ref<PaginationType>({
      page: 0,
      per_page: 0,
      total: 0,
      total_pages: 0,
    });
    const movies = ref<Movie[]>([]);
    const search = ref("");
    const tab = ref("movies");
    const loading = ref(false);

    onMounted(() => {
      fetchData();
    });

    async function fetchData() {
      loading.value = true;
      moviesListResponse.value = await MovieAPIService.getMovies(
        search.value,
        pagination.value.page
      );
      const { data, ...pages } = moviesListResponse.value;
      pagination.value = pages;
      movies.value = data;
      loading.value = false;
    }

    const favouritesMovies = computed(() => {
      return movies.value.filter((movie) => movie.favourite);
    });

    function pagechanged(page: number) {
      pagination.value.page = page;
      fetchData();
    }
    function setSearch(s: string) {
      search.value = s;
      fetchData();
    }
    function changeTab(t: string) {
      tab.value = t;
    }
    function toggleFavourite(imdbID: string) {
      const movie = movies.value.find((movie) => movie.imdbID === imdbID);
      if (movie) movie.favourite = !movie.favourite;
    }

    return {
      movies,
      pagination,
      loading,
      search,
      tab,
      favouritesMovies,
      pagechanged,
      changeTab,
      setSearch,
      toggleFavourite,
    };
  },
});
</script>
