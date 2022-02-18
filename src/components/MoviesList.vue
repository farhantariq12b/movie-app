<template>
  <div id="movie-list">
    <div v-if="loading" >Loading....</div>
    <div v-else class="flex flex-wrap justify-center" >
      <div data-testid="movie-list" v-for="(movie, index) in movies" :key="index">
        <MovieCard @toggleFavourite="toggleFavourite" :movie="movie"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Movie from '@/types/Movie';
import MovieCard from '@/components/MovieCard.vue'

export default defineComponent({
  name: 'MovieList',
  components: {
    MovieCard
  },
  props: {
    movies: {
      required: true,
      type: Array as PropType<Movie[]>
    },
    loading: {
      type: Boolean,
    }
  },
  setup (props, { emit }) {
    function toggleFavourite (imdbID: string) {
      emit('toggleFavourite', imdbID)
    }
    return {
      toggleFavourite
    }
  }
});
</script>

<style scoped lang="scss">
</style>
