class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  before_action :set_locale

  include CurrentCustomer
  include Rescuable
  include CheckDashboardKey
  include CheckJobsKey

  private
  def set_locale
    I18n.locale = params[:locale]
  end
end
