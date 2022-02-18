<template>
  <div v-if="pagination" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 m-2">
    <div class="flex-1 flex justify-between sm:hidden">
      <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
      <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ (pagination.page - 1) * pagination.per_page || 1 }}</span>
          to
          <span class="font-medium">{{ (pagination.page) * pagination.per_page }}</span>
          of
          <span class="font-medium">{{ pagination.per_page * pagination.total_pages }}</span>
          results
        </p>
      </div>
      <div class="flex justify-end">
        <ul class="pagination items-center bg-white p-2 shadow-sm rounded">
          <li class="pagination-item">
            <span
              class="rounded-l rounded-sm border border-gray-100 px-3 py-2 cursor-not-allowed no-underline text-gray-600 h-10"
              v-if="isInFirstPage"
            >&laquo;</span>
            <a
              v-else
              @click.prevent="onClickFirstPage"
              class="rounded-l rounded-sm border-t border-b border-l border-gray-100 px-3 py-2 text-gray-600 hover:bg-gray-100 no-underline"
              href="#"
              role="button"
              rel="prev"
            >
              &laquo;
            </a>
          </li>

          <li class="pagination-item">
            <button
              type="button"
              @click="onClickPreviousPage"
              :disabled="isInFirstPage"
              aria-label="Go to previous page"
              class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
              :class="{'cursor-not-allowed': isInFirstPage}"
            >Previous</button>
          </li>

          <li
            v-for="page in pages"
            class="pagination-item"
            :key="page.name"
          >
            <span
              class="rounded-sm border border-blue-100 px-3 py-2 bg-blue-100 no-underline text-blue-500 cursor-not-allowed mx-2"
              v-if="isPageActive(page.name)"
            >{{ page.name }}</span>
            <a
              class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2"
              href="#"
              v-else
              @click.prevent="onClickPage(page.name)"
              role="button"
            >{{ page.name }}</a>
          </li>

          <li class="pagination-item">
            <button
              type="button"
              @click="onClickNextPage"
              :disabled="isInLastPage"
              aria-label="Go to next page"
              class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
              :class="{'cursor-not-allowed': isInLastPage}"
            >Next</button>
          </li>

          <li class="pagination-item">
            <a
              class="rounded-r rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline"
              href="#"
              @click.prevent="onClickLastPage"
              rel="next"
              role="button"
              v-if="hasMorePages"
            >&raquo;</a>
            <span
              class="rounded-r rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline cursor-not-allowed"
              v-else
            >&raquo;</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import Pagination from '@/types/Pagination';

export default defineComponent({
  name: 'MovieList',
  props: {
    pagination: {
      required: true,
      type: Object as PropType<Pagination>
    },
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 5
    }
  },
  setup (props, { emit }) {
    const startPage = computed(() => {
      if (props.pagination.page === 1) {
        return 1;
      }
      if (props.pagination.page === props.pagination.total_pages) {
        return props.pagination.total_pages - props.maxVisibleButtons + 1;
      }
      return props.pagination.page - 1;
    })
    const endPage = computed(() => {
      return Math.min(
        startPage.value + props.maxVisibleButtons - 1,
        props.pagination.total_pages
      );
    })
    const pages = computed(() => {
      const range = [];
      for (let i = startPage.value; i <= endPage.value; i += 1) {
        range.push({
          name: i,
          isDisabled: i === props.pagination.page
        });
      }
      return range;
    })
    const isInFirstPage = computed(() => {
      return props.pagination.page === 1;
    })
    const isInLastPage = computed(() => {
      return props.pagination.page === props.pagination.total_pages;
    })

    function onClickFirstPage() {
      emit("pagechanged", 1);
    }
    function onClickPreviousPage() {
      emit("pagechanged", props.pagination.page - 1);
    }
    function onClickPage(page: number) {
      emit("pagechanged", page);
    }
    function onClickNextPage() {
      emit("pagechanged", props.pagination.page + 1);
    }
    function onClickLastPage() {
      emit("pagechanged", props.pagination.total_pages);
    }
    function isPageActive(page: number) {
      return props.pagination.page === page;
    }

    return {
      startPage,
      endPage,
      pages,
      isInLastPage,
      isInFirstPage,
      onClickFirstPage,
      onClickPreviousPage,
      onClickPage,
      onClickNextPage,
      onClickLastPage,
      isPageActive
    }
  }
});
</script>

<style scoped lang="scss">
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  @apply border-t border-b border-l border-blue-100 px-3 py-2 bg-blue-100 no-underline text-blue-500 text-sm;
}

</style>
