import eventBus from "../../utils/eventBus.js";


eventBus.on("recipe.created.setmetadata", ({ _id, slug, title }) => {
  console.log("📢 recipe.created.setmetadata  -- " + slug);
});


