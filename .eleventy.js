module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "static": "uploads" });

  eleventyConfig.addCollection("chapters", (api) => {
    return api.getFilteredByGlob("content/chapters/*.md")
      .sort((a, b) => (b.date || b.data.date) - (a.date || a.data.date));
  });

  eleventyConfig.addFilter("excerpt", (html, n = 200) => {
    if (!html) return "";
    const plain = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    return plain.length > n ? plain.slice(0, n) + "…" : plain;
  });

  return {
    dir: {
      input: "src",          // <- a entrada agora é /src
      includes: "_includes", // <- então layouts ficam em /src/_includes
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md"]
  };
};
