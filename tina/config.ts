import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "heroHeadline",
            label: "Hero Headline",
          },
          {
            type: "string",
            name: "heroTagline",
            label: "Hero Tagline",
          },
          {
            type: "string",
            name: "heroSubtext",
            label: "Hero Subtext",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "ctaText",
            label: "CTA Button Text",
          },
          {
            type: "string",
            name: "ctaLink",
            label: "CTA Button Link",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body Content",
            isBody: true,
          },
        ],
      },
      {
        name: "events",
        label: "Events",
        path: "content/events",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Event Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Event Date",
          },
          {
            type: "string",
            name: "location",
            label: "Location",
          },
          {
            type: "string",
            name: "format",
            label: "Competition Format",
            description: "e.g., Pairs Betterball Stableford, Pairs Matchplay Knockout",
          },
          {
            type: "number",
            name: "price",
            label: "Entry Fee (£)",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
          },
          {
            type: "boolean",
            name: "entriesOpen",
            label: "Entries Open",
          },
        ],
      },
      {
        name: "products",
        label: "Products",
        path: "content/products",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Product Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "number",
            name: "price",
            label: "Price (£)",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              { value: "clubs", label: "Clubs" },
              { value: "balls", label: "Balls" },
              { value: "accessories", label: "Accessories" },
              { value: "clothing", label: "Clothing" },
              { value: "trolleys", label: "Trolleys" },
            ],
          },
          {
            type: "boolean",
            name: "inStock",
            label: "In Stock",
          },
          {
            type: "boolean",
            name: "shippingAvailable",
            label: "Shipping Available",
          },
          {
            type: "boolean",
            name: "collectionAvailable",
            label: "Collection Available",
          },
          {
            type: "image",
            name: "image",
            label: "Product Image",
          },
        ],
      },
    ],
  },
});
