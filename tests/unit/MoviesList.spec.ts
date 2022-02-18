import { shallowMount } from "@vue/test-utils";
import MoviesList from "@/components/MoviesList.vue";

describe("MovieCard.vue", () => {
  it("should render HTML correctly", () => {
    const movies = [
      {
        Title: 'Water',
        Year: '2021',
        imdbID: '1234',
        favourite: true
      }
    ];
    const wrapper = shallowMount(MoviesList, {
      props: { movies },
    });
		expect(wrapper.vm.$el).toMatchSnapshot();
	});

  it("renders movies props correctly when passed", () => {
    const movies = [
      {
        Title: 'Water',
        Year: '2021',
        imdbID: '1234',
        favourite: true
      },
      {
        Title: 'Sea',
        Year: '2021',
        imdbID: '1235',
        favourite: false
      }
    ];
    const wrapper = shallowMount(MoviesList, {
      props: { movies, loading: false },
    });
		expect(wrapper.vm.$props.movies.length).toBe(2)
  });

});
