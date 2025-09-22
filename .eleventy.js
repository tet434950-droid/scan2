module.exports = function(eleventyConfig) {
  // Copiar arquivos estáticos (uploads)
  eleventyConfig.addPassthroughCopy({ "static": "uploads" });

  // Coleção "chapters"
  eleventyConfig.addCollection("chapters", (api) => {
    return api.getFilteredByGlob("content/chapters/*.md")
      .sort((a, b) => (b.date || b.data.date) - (a.date || a.data.date));
  });

  // Filtro de resumo
  eleventyConfig.addFilter("excerpt", (html, n = 200) => {
    if (!html) return "";
    const plain = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    return plain.length > n ? plain.slice(0, n) + "…" : plain;
  });

  // 🔑 Filtro de data (corrige o erro "filter not found: date")
  eleventyConfig.addNunjucksFilter("date", (value, formatStr = "yyyy-LL-dd") => {
    const d = value === "now"
      ? new Date()
      : (value instanceof Date ? value : new Date(value));

    if (Number.isNaN(d.getTime())) return "";

    const yyyy = String(d.getUTCFullYear());
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(d.getUTCDate()).padStart(2, "0");

    if (formatStr === "yyyy") return yyyy;
    if (formatStr === "yyyy-LL-dd") return `${yyyy}-${mm}-${dd}`;

    return d.toISOString();
  });

  return {
    dir: {
      input: ".",                // raiz (enxerga src/ e content/)
      includes: "src/_includes", // layouts ficam em src/_includes
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md"]
  };
};
