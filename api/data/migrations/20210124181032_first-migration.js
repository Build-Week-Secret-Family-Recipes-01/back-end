exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (table) => {
      table.increments("user_id");
      table.text("username", 200).notNullable();
      table.text("password", 200).notNullable();
      table.text("permissions");
      table.timestamps(false, true);
    })
    .createTable("recipes", (table) => {
      table.increments("recipe_id");
      table.text("title").notNullable();
      table.text("source");
      table.text("ingredients").notNullable();
      table.text("instructions").notNullable();
      table.text("image");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    })
    .createTable("categories", (table) => {
      table.increments("category_id");
      table.text("category_name").notNullable();
    })
    .createTable("recipe_categories", (table) => {
      table.increments("recipe_category_id");
      table
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      table
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("category_id")
        .inTable("categories")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("recipe_categories");
  await knex.schema.dropTableIfExists("categories");
  await knex.schema.dropTableIfExists("recipes");
  await knex.schema.dropTableIfExists("users");
};
