module V1
    class TrackController < ApplicationController
        def app_download
            Tracking::TrackingJob.perform_async(
                "AppDownload",
                request.user_agent,
                request.remote_ip
            )

            render json: { status: "succeeded" }, status: 200
        end
    end
end