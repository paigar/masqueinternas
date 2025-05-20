import pluginBundle from "@11ty/eleventy-plugin-bundle";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { DateTime } from "luxon";
import implicitFigures from "markdown-it-image-figures";
import md from "markdown-it";

export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"./images/": "/images/",
	});

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return new Date().toISOString();
	});

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" })
			.setLocale("es-ES")
			.toFormat(format || "dd LLLL yyyy");
	});
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	eleventyConfig.addShortcode("currentYear", () => {
		return new Date().getFullYear();
	});

	eleventyConfig.amendLibrary("md", (mdLib) =>
		mdLib.use(implicitFigures, {
			figcaption: "alt",
			classes: "lazy",
		})
	);

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	return {
		templateFormats: ["njk", "md", "html", "liquid"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: "src",
			output: "_site",
		},
	};
}
