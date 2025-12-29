module.exports = function (eleventyConfig) {
    // Pass through static assets
    eleventyConfig.addPassthroughCopy("src/favicon.svg");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/CNAME");
    eleventyConfig.addPassthroughCopy("src/og-image.png");
    eleventyConfig.addPassthroughCopy("src/js");

    // Watch targets
    eleventyConfig.addWatchTarget("./src/css/");

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes"
        },
        templateFormats: ["html", "njk", "md"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
