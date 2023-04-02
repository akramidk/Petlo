10.times do
    Brand.create!()
end

BrandName.create!([
        {
            brand_id: 1,
            value: "Purina",
            language: "en"
        },
        {
            brand_id: 1,
            value: "بورينا", # "Purina" in Arabic
            language: "ar"
        },

        {
            brand_id: 2,
            value: "Iams",
            language: "en"
        },
        {
            brand_id: 2,
            value: "أيامز", # "Iams" in Arabic
            language: "ar"
        },

        {
            brand_id: 3,
            value: "Hill's Science Diet",
            language: "en"
        },
        {
            brand_id: 3,
            value: "هيلز ساينس دايت", # "Hill's Science Diet" in Arabic
            language: "ar"
        },

        {
            brand_id: 4,
            value: "Royal Canin",
            language: "en"
        },
        {
            brand_id: 4,
            value: "رويال كانين", # "Royal Canin" in Arabic
            language: "ar"
        },

        {
            brand_id: 5,
            value: "Merrick",
            language: "en"
        },
        {
            brand_id: 5,
            value: "ميريك", # "Merrick" in Arabic
            language: "ar"
        },

        {
            brand_id: 6,
            value: "Blue Buffalo",
            language: "en"
        },
        {
            brand_id: 6,
            value: "بلو بفلو", # "Blue Buffalo" in Arabic
            language: "ar"
        },

        {
            brand_id: 7,
            value: "Taste of the Wild",
            language: "en"
        },
        {
            brand_id: 7,
            value: "طعم البرية", # "Taste of the Wild" in Arabic
            language: "ar"
        },

        {
            brand_id: 8,
            value: "Wellness",
            language: "en"
        },
        {
            brand_id: 8,
            value: "ويلنس", # "Wellness" in Arabic
            language: "ar"
        },

        {
            brand_id: 9,
            value: "Canidae",
            language: "en"
        },
        {
            brand_id: 9,
            value: "كانيدا", # "Canidae" in Arabic
            language: "ar"
        },

        {
            brand_id: 10,
            value: "Orijen",
            language: "en"
        },
        {
            brand_id: 10,
            value: "أوريجين", # "Orijen" in Arabic
            language: "ar"
        }
])