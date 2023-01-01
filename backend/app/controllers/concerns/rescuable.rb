module Rescuable
    extend ActiveSupport::Concern

    UNKNOWN_ERROR_CODE = 1000000
    @@code = UNKNOWN_ERROR_CODE

    included do
        rescue_from Exception do |error_code|
            @@code = error_code.message
            error_object = get_the_error

            render json: {
                status: "failed",
                error: error_object
            }, status: CONSTANTS::ERRORS_STATUS_CODE[error_object[:code]]
        end
    end

    private
    def get_the_error
        begin
            {
                code: @@code.to_i,
                message: I18n.t!("errors.#{@@code}")
            }
        rescue
            {
                code: UNKNOWN_ERROR_CODE,
                message: I18n.t!("errors.#{UNKNOWN_ERROR_CODE}")
            }
        end
    end
end