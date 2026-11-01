// =====================================================================
//  THIS IS THE ONLY FILE YOU NEED TO EDIT FOR YOUR MENU AND SETTINGS
//  Change the text between the "quote marks". Keep the commas and brackets.
//  After editing, save the file and upload it to GitHub again.
// =====================================================================

var SETTINGS = {
  businessName: "Fresh Sandwiches",

  // Your WhatsApp number in international format: country code, no + and no spaces.
  // South Africa = 27, and drop the first 0. Example: 071 387 5231 becomes 27713875231
  whatsapp: "27713875231",
  whatsappDisplay: "071 387 5231",   // how the number is shown on the website

  // Optional: get every order emailed to you automatically (free).
  // Paste your Web3Forms access key between the quotes. Leave it empty to turn this off.
  formKey: "",

  // Text on the home page
  tagline: "Fresh sandwiches, made to order and delivered right to your door in the estate.",
  pills: ["Order 1 day ahead", "Made fresh", "Delivered 14:00 to 19:00"],

  // Text at the bottom of every page
  footerQuestion: "Questions or allergies? Message me any time.",
  footerSmall: "Fresh Sandwiches · made to order in the estate",

  // Bread choices shown on every sandwich
  breads: ["Sourdough", "Ciabatta", "Seed loaf", "White", "Brown"],

  // Delivery / collection times customers can choose from
  times: ["14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],

  // The "Build your own" sandwich.  show: false hides it everywhere. Change to true to bring it back.
  buildYourOwn: {
    show: false,
    tag: "Make it yours",
    name: "Build your own",
    description: "Pick your bread, fillings, cheese, salad and sauces."
  },

  // The "Allergy & ordering info" tab. Each line is one paragraph.
  // lead = bold start of the line (can be empty ""). warn: true = puts the line in a box.
  allergyTitle: "Allergy & ordering info",
  allergyInfo: [
    { lead: "Allergens at a glance.", text: "Gluten: all breads. Dairy: cheese, butter and basil pesto. Egg: egg, mayo and chicken mayo. Fish: tuna, and sometimes olive tapenade. Nuts: pestos may contain nuts. Mustard: all mustards." },
    { lead: "", warn: true, text: "Everything is made in a kitchen that handles gluten, dairy, eggs, nuts, fish and mustard, so I can’t promise any sandwich is completely free of them. If you have an allergy, please tell me in the notes when you order." },
    { lead: "Ordering.", text: "Please order at least a day ahead. Delivery in the estate is from 14:00 to 19:00, or you can collect." },
    { lead: "Onions", text: "are only added if you choose them." }
  ]
};

// ---------------------------------------------------------------------
//  YOUR SANDWICHES. Each one sits between { and } with a comma after it.
//  To add a sandwich: copy a whole { ... } block, paste it after the last one, and change the text.
//
//  id           short name used in the web link. Lowercase, hyphens, no spaces. Don't change it once live.
//  name         the name customers see
//  description  one short line shown on the menu
//  ingredients  the list in the "What's in it?" window
//  contains     allergens shown under the ingredients (use [] to show none)
//  placeholder  the example text in the "want it a little different?" box
//  available    true = on the menu.  false = hidden (use for sold out or off the menu)
// ---------------------------------------------------------------------
var MENU = [
  {
    id: "chicken-mayo",
    name: "Chicken Mayo",
    description: "Chicken mayo with gherkins and cucumber.",
    ingredients: ["Chicken in a creamy mayo", "Gherkins", "Cucumber"],
    contains: ["Gluten", "Egg"],
    placeholder: "e.g. no gherkins",
    available: true
  },
  {
    id: "rocket-ham-cheese",
    name: "Rocket, Ham & Cheese",
    description: "Sliced ham, cheddar cheese, fresh rocket and mayo.",
    ingredients: ["Sliced ham", "Cheddar cheese", "Fresh rocket", "Mayo"],
    contains: ["Gluten", "Dairy", "Egg"],
    placeholder: "e.g. no mayo, extra rocket",
    available: true
  }
];
