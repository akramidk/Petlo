module CONSTANTS
  COUNTRIES = [
    "JO"
  ]

  COUNTRIES_CURRENCIES = {
    "JO" => {
      "ar" => "دينار",
      "en" => "JOD"
    }
  }

  LANGUAGES = [
    "ar",
    "en"
  ]

  OPTION_UNITS = {
    "kg" => {
      "ar" => "كيلو جرام",
      "en" => "KG"
    }
  }

  PETS = {
    "dog" => {
      name: {
        "ar" => "كلب",
        "en" => "Dog"
      },

      breeds: {
        "golden_retriever" => {
          "ar" => "جولدن ريترفير",
          "en" => "Golden Retriever"
        }
      }
    },

    "cat" => {
      name: {
        "ar" => "قطة",
        "en" => "Cat"
      },

      breeds: {
        "scottish_fold" => {
          "ar" => "سكوتش فولد",
          "en" => "Scottish Fold"
        }
      }
    }
  }

  PET_GENDERS = {
    "male" => {
      "ar" => "ذكر",
      "en" => "Male"
    },

    "female" => {
      "ar" => "انثى",
      "en" => "Female"
    }
  }
end
