import { mount, shallowMount } from "@vue/test-utils";
import MovieCard from "@/components/MovieCard.vue";

describe("MovieCard.vue", () => {
  it("should render HTML correctly", () => {
    const movie = {
      Title: 'Water',
      Year: '2021',
      imdbID: '1234',
      favourite: true
    };
    const wrapper = shallowMount(MovieCard, {
      props: { movie },
    });
		expect(wrapper.vm.$el).toMatchSnapshot();
	});

  it("renders movie props correctly when passed", async () => {
    const movie = {
      Title: 'Water',
      Year: '2021',
      imdbID: '1234',
      favourite: true
    };
    const wrapper = shallowMount(MovieCard, {
      props: { movie },
    });
    const result = ['ID: 1234', 'Year: 2021', 'Favourite']
    let title = wrapper.find('[data-testid=title]');
		expect(title.text()).toBe("Water")
    let body = wrapper.findAllComponents('[data-testid=body] span');
    body.forEach((span, index) => {
      expect(span.text()).toBe(result[index])
    })
  });

});
