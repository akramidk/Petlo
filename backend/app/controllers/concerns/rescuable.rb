module Rescuable
    extend ActiveSupport::Concern

    UNKNOWN_ERROR_CODE = 1000000
    @@code = UNKNOWN_ERROR_CODE

    included do
        rescue_from ActiveRecord::RecordInvalid do |error|
            @@code = ActiveRecordError.extract(object: error)
            @@error_object = get_the_error

            render_the_response
        end

        rescue_from RuntimeError do |error_code|
            @@code = error_code.message
            @@error_object = get_the_error

            render_the_response
        end
    end

    private
    def get_the_error
        begin
            { code: @@code.to_i, message: I18n.t!("errors.#{@@code}") }
        rescue
            { code: UNKNOWN_ERROR_CODE, message: I18n.t!("errors.#{UNKNOWN_ERROR_CODE}") }
        end
    end

    def render_the_response
        render json: { status: "failed", error: @@error_object }, status: 400
    end
end