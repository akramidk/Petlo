module Dashboard
  class BrandsController < ApplicationController
    before_action :check_dashboard_key

    def index
      data = []

      Brand.all.each do |brand|
        names = BrandName.where(brand_id: brand.id)

        data << {
          id: brand.public_id,
          ar_name: names.find{|name| name.language == "ar"}&.value,
          en_name: names.find{|name| name.language == "en"}&.value
        }
      end

      render json: { data: data }, status: 200
    end
  end
end