export default {
	tags: ["blog"],
	layout: "layouts/post.njk",
	permalink: "/blog/{{ title | slugify }}/",
};
