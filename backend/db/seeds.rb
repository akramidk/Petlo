#Customers
Customer.create!([
  {
    name: "Akram",
    country: "JO",
    phone_number: "+962790119952",
    password: "12345678"
  },
  {
    name: "Hala",
    country: "JO",
    phone_number: "+962790119951",
    password: "12345678"
  }
])

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
    title: "Roasted Chicken, Rice & Vegetable Flavor"
  },
  {
    item_id: item_1.id,
    language: "ar",
    title: "دجاج مشوي، أرز ونكهة نباتية"
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
    option_number: 1
  },
  {
    variant_id: item_1_variant_1.id,
    option_id: item_1_option_2.id,
    option_number: 1
  }
])
VariantAvailability.create!(variant_id: item_1_variant_1.id, country: "JO", value: 1000)

item_1_variant_2 = Variant.create!(item_id: item_1.id)
item_1_variant_2_options = VariantOption.create!([
  {
    variant_id: item_1_variant_2.id,
    option_id: item_1_option_1.id,
    option_number: 1
  },
  {
    variant_id: item_1_variant_2.id,
    option_id: item_1_option_2.id,
    option_number: 2
  }
])
VariantAvailability.create!(variant_id: item_1_variant_2.id, country: "JO", value: 2000)

item_1_variant_3 = Variant.create!(item_id: item_1.id)
item_1_variant_3_options = VariantOption.create!([
  {
    variant_id: item_1_variant_3.id,
    option_id: item_1_option_1.id,
    option_number: 2
  },
  {
    variant_id: item_1_variant_3.id,
    option_id: item_1_option_2.id,
    option_number: 1
  }
])
VariantAvailability.create!(variant_id: item_1_variant_3.id, country: "JO", value: 3000)

item_1_variant_4 = Variant.create!(item_id: item_1.id)
item_1_variant_4_options = VariantOption.create!([
  {
    variant_id: item_1_variant_4.id,
    option_id: item_1_option_1.id,
    option_number: 2
  },
  {
    variant_id: item_1_variant_4.id,
    option_id: item_1_option_2.id,
    option_number: 2
  }
])
VariantAvailability.create!(variant_id: item_1_variant_4.id, country: "JO", value: 4000)


item_2 = Item.create!(brand_id: brand_2.id)
ItemDetail.create!([
  {
    item_id: item_2.id,
    language: "en",
    title: "Indoor Adult Dry Cat Food"
  },
  {
    item_id: item_2.id,
    language: "ar",
    title: "طعام داخلي جاف للقطط البالغة"
  }
])
ItemAvailability.create!(
  item_id: item_2.id,
  country: "JO",
  value: false
)
item_2.image.attach(io: File.open("../images/item-2.png"), filename: "item-2")