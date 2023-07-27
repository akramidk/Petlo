module Dashboard
  class BannersController < ApplicationController
    before_action :check_dashboard_key
    def index
      data = Banner.all.map{|banner| banner.public_id}
      render json: { data: data }, status: 200
    end

    def create
      banner = Banner.create!(order: params[:order], path: params[:path])

      params[:details].each do |detail|
        variant =  BannerDetail.create!(
          banner_id: banner.id,
          country: detail[:country],
          language: detail[:language],
          variant: detail[:variant]
        )

        variant.image.attach(io: StringIO.new(Base64.decode64(detail[:image].split(',')[1])), content_type: "image/png", filename: "#{banner.public_id}_#{variant.id}.png")
      end

      render json: { status: "succeeded" }, status: 200
    end
  end
end