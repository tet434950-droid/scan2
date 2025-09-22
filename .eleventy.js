// .eleventy.js (na raiz do repo)
module.exports = function(eleventyConfig) {
  // Arquivos estáticos enviados pelo CMS:
  eleventyConfig.addPassthroughCopy({ "static": "uploads" });

  // Coleção "chapters" (pode ficar fora da pasta de input)
  eleventyConfig.addCollection("chapters", (api) => {
    return api.getFilteredByGlob("content/chapters/*.md")
      .sort((a, b) => (b.date || b.data.date) - (a.date || a.data.date));
  });

  // Filtro simples de resumo
  eleventyConfig.addFilter("excerpt", (html, n = 200) => {
    if (!html) return "";
    const plain = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    return plain.length > n ? plain.slice(0, n) + "…" : plain;
  });

  // ⚠️ PONTO-CHAVE: diga ao Eleventy que os templates estão em "src"
  return {
    dir: {
      input: "src",          // <- agora a pasta de entrada é /src
      includes: "_includes", // <- então layouts ficam em /src/_includes
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk","md"]
  };
};
