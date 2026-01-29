import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images/uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "product",
        label: "Shop Products",
        path: "src/data/products",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Product Name", required: true },
          { type: "string", name: "slug", label: "URL Slug", required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "number", name: "price", label: "Price (£)", required: true },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["clubs", "balls", "trolleys", "accessories", "clothing"],
          },
          { type: "boolean", name: "inStock", label: "In Stock" },
          { type: "boolean", name: "shippingAvailable", label: "Shipping Available" },
          { type: "boolean", name: "collectionAvailable", label: "Collection Available" },
          { type: "image", name: "image", label: "Product Image" },
        ],
      },
      {
        name: "homepage",
        label: "Homepage",
        path: "src/data",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        match: {
          include: "homepage",
        },
        fields: [
          { type: "string", name: "heroTitle", label: "Hero Title" },
          { type: "string", name: "heroTagline", label: "Hero Tagline" },
          { type: "string", name: "heroDescription", label: "Hero Description", ui: { component: "textarea" } },
        ],
      },
    ],
  },
});
