module PetsHelper::Information
  def information(language:)
    data = CONSTANTS::PETS.keys.map{|pet|
      breeds = CONSTANTS::PETS[pet][:breeds].keys.map{|breed|
        {
          key: breed,
          value: CONSTANTS::PETS[pet][:breeds][breed][language]
        }
      }

      {
        key: pet,
        value: CONSTANTS::PETS[pet][:name][language],
        breeds: breeds
      }
    }

    { data: data }
  end
end
