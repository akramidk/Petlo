module CheckDashboardKey
   extend ActiveSupport::Concern

   def check_dashboard_key
     dashboard_key = request.headers["Authorization"]&.split(' ')&.last
     raise(RuntimeError, 1000002) unless dashboard_key == ENV['DASHBOARD_KEY']
   end
end