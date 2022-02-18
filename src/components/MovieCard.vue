<template>
  <div class="max-w-md h-md rounded overflow-hidden shadow-lg m-2">
    <img class="w-full" src="https://random.imagecdn.app/500/150" alt="Sunset in the mountains">
    <div class="px-6 py-4">
      <div data-testid="title" class="font-bold text-xl mb-2">{{ movie.Title }}</div>
    </div>
    <div data-testid=body class="px-2 pt-4 pb-2 flex flex-row justify-between">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">ID: {{movie.imdbID}}</span>
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Year: {{movie.Year}}</span>
      <span @click="toggleFavourite(movie.imdbID)" :class="[movie.favourite ? 'bg-yellow-200': 'bg-gray-200']" class="inline-block pointer rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Favourite</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Movie from '@/types/Movie';

export default defineComponent({
  name: 'MovieCard',
  props: {
    movie: {
      required: true,
      type: Object as PropType<Movie>
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
})

</script>
<style scoped lang="scss">
  .pointer {
    cursor: pointer;
  }
</style>
