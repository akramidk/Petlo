module BannersHelper::All
    def all(country:, language:, variant:)
        Banner.joins(
            :details
        ),where(
            details: {
                country: country,
                language: language,
                variant: variant
            }
        )
    end
end