module BannersHelper::All
    def all(country:, language:, variant:)
        banners = Banner.joins(
            :details
        ).where(
            details: {
                country: country,
                language: language,
                variant: variant
            }
        )

        banners.map{|banner|
            details = banner.details.find_by(country: country, language: language, variant: variant)
            
            {
                public_id: banner.public_id,
                image: details.image.url,
                path: banner.path,
            }
        }
    end
end