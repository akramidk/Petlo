#Customers
#Brands
brand_1 = Brand.create!()
BrandName.create!([
  {
    brand_id: brand_1.id,
    language: "en",
    value: "Pedigree"
  },
  {
    brand_id: brand_1.id,
    language: "ar",
    value: "بادجري"
  }
])
brand_1.logo.attach(io: File.open("../images/pedigree.png"), filename: "pedigree")

brand_2 = Brand.create!()
BrandName.create!([
  {
    brand_id: brand_2.id,
    language: "en",
    value: "Royal Canin"
  },
  {
    brand_id: brand_2.id,
    language: "ar",
    value: "رويال كانين"
  }
])
brand_2.logo.attach(io: File.open("../images/royal-canin.png"), filename: "royal-canin")

#Items
item_1 = Item.create!(brand_id: brand_1.id)
ItemDetail.create!([
  {
    item_id: item_1.id,
    language: "en",
    name: "Roasted Chicken, Rice & Vegetable Flavor"
  },
  {
    item_id: item_1.id,
    language: "ar",
    name: "دجاج مشوي، أرز ونكهة نباتية"
  }
])
ItemAvailability.create!(
  item_id: item_1.id,
  country: "JO",
  value: true
)
item_1.image.attach(io: File.open("../images/item-1.png"), filename: "item-1")

item_1_option_1 = Option.create!(
  item_id: item_1.id,
  weighted: true,
  unit: "kg"
)
OptionName.create!([
  {
    option_id: item_1_option_1.id,
    language: "en",
    value: "Size"
  },
  {
    option_id: item_1_option_1.id,
    language: "ar",
    value: "الحجم"
  }
])
OptionValue.create!([
  {
    option_id: item_1_option_1.id,
    number: 1,
    language: "en",
    value: 2
  },
  {
    option_id: item_1_option_1.id,
    number: 1,
    language: "ar",
    value: 2
  },
  {
    option_id: item_1_option_1.id,
    number: 2,
    language: "en",
    value: 4
  },
  {
    option_id: item_1_option_1.id,
    number: 2,
    language: "ar",
    value: 4
  }
])

item_1_option_2 = Option.create!(
  item_id: item_1.id,
  weighted: false
)
OptionName.create!([
  {
    option_id: item_1_option_2.id,
    language: "en",
    value: "Breed Size"
  },
  {
    option_id: item_1_option_2.id,
    language: "ar",
    value: "حجم الفصيلة"
  }
])
OptionValue.create!([
  {
    option_id: item_1_option_2.id,
    number: 1,
    language: "en",
    value: "Small"
  },
  {
    option_id: item_1_option_2.id,
    number: 1,
    language: "ar",
    value: "صغير"
  },
  {
    option_id: item_1_option_2.id,
    number: 2,
    language: "en",
    value: "Large"
  },
  {
    option_id: item_1_option_2.id,
    number: 2,
    language: "ar",
    value: "كبير"
  }
])

item_1_variant_1 = Variant.create!(item_id: item_1.id)
item_1_variant_1_options = VariantOption.create!([
  {
    variant_id: item_1_variant_1.id,
    option_id: item_1_option_1.id,
    option_value_number: 1
  },
  {
    variant_id: item_1_variant_1.id,
    option_id: item_1_option_2.id,
    option_value_number: 1
  }
])
VariantAvailability.create!(variant_id: item_1_variant_1.id, country: "JO", value: true)
VariantPrice.create!(variant_id: item_1_variant_1.id, country: "JO", value: 1000)

item_1_variant_2 = Variant.create!(item_id: item_1.id)
item_1_variant_2_options = VariantOption.create!([
  {
    variant_id: item_1_variant_2.id,
    option_id: item_1_option_1.id,
    option_value_number: 1
  },
  {
    variant_id: item_1_variant_2.id,
    option_id: item_1_option_2.id,
    option_value_number: 2
  }
])
VariantAvailability.create!(variant_id: item_1_variant_2.id, country: "JO", value: true)
VariantPrice.create!(variant_id: item_1_variant_2.id, country: "JO", value: 2000)

item_1_variant_3 = Variant.create!(item_id: item_1.id)
item_1_variant_3_options = VariantOption.create!([
  {
    variant_id: item_1_variant_3.id,
    option_id: item_1_option_1.id,
    option_value_number: 2
  },
  {
    variant_id: item_1_variant_3.id,
    option_id: item_1_option_2.id,
    option_value_number: 1
  }
])
VariantAvailability.create!(variant_id: item_1_variant_3.id, country: "JO", value: false)
VariantPrice.create!(variant_id: item_1_variant_3.id, country: "JO", value: 3000)

item_1_variant_4 = Variant.create!(item_id: item_1.id)
item_1_variant_4_options = VariantOption.create!([
  {
    variant_id: item_1_variant_4.id,
    option_id: item_1_option_1.id,
    option_value_number: 2
  },
  {
    variant_id: item_1_variant_4.id,
    option_id: item_1_option_2.id,
    option_value_number: 2
  }
])
VariantAvailability.create!(variant_id: item_1_variant_4.id, country: "JO", value: true)
VariantPrice.create!(variant_id: item_1_variant_4.id, country: "JO", value: 4000)

####
item_2 = Item.create!(brand_id: brand_2.id)
ItemDetail.create!([
  {
    item_id: item_2.id,
    language: "en",
    name: "Indoor Adult Dry Cat Food"
  },
  {
    item_id: item_2.id,
    language: "ar",
    name: "طعام داخلي جاف للقطط البالغة"
  }
])
ItemAvailability.create!(
  item_id: item_2.id,
  country: "JO",
  value: false
)
item_2.image.attach(io: File.open("../images/item-2.png"), filename: "item-2")


item_2_option_1 = Option.create!(
  item_id: item_2.id,
  weighted: true,
  unit: "kg"
)
OptionName.create!([
  {
    option_id: item_2_option_1.id,
    language: "en",
    value: "Size"
  },
  {
    option_id: item_2_option_1.id,
    language: "ar",
    value: "الحجم"
  }
])
OptionValue.create!([
  {
    option_id: item_2_option_1.id,
    number: 1,
    language: "en",
    value: 2
  },
  {
    option_id: item_2_option_1.id,
    number: 1,
    language: "ar",
    value: 2
  },
])

item_2_variant_1 = Variant.create!(item_id: item_2.id)
item_2_variant_1_options = VariantOption.create!([
  {
    variant_id: item_2_variant_1.id,
    option_id: item_2_option_1.id,
    option_value_number: 1
  }
])
VariantAvailability.create!(variant_id: item_2_variant_1.id, country: "JO", value: true)
VariantPrice.create!(variant_id: item_2_variant_1.id, country: "JO", value: 8000)

#categories
dogs_category = Category.create!(name: "dogs")
cats_category = Category.create!(name: "cats")
dogs_food_category = Category.create!(name: "food", parent_id: dogs_category.id)
cats_food_category = Category.create!(name: "food", parent_id: cats_category.id)
dogs_dry_food_category = Category.create!(name: "dry", parent_id: dogs_food_category.id)
cats_dry_food_category = Category.create!(name: "dry", parent_id: cats_food_category.id)

#relations
Relation.create!([
  {
    item_id: item_1.id,
    category_id: dogs_category.id
  },
  {
    item_id: item_1.id,
    category_id: dogs_food_category.id
  },
  {
    item_id: item_1.id,
    category_id: dogs_dry_food_category.id
  },
  {
    item_id: item_2.id,
    category_id: cats_category.id
  },
  {
    item_id: item_2.id,
    category_id: cats_food_category.id
  },
  {
    item_id: item_2.id,
    category_id: cats_dry_food_category.id
  }
])
