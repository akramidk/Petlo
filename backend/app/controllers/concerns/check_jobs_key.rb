module CheckJobsKey
   extend ActiveSupport::Concern

   def check_jobs_key
    jobs_key = request.headers["Authorization"]
     raise(RuntimeError, 1000002) unless jobs_key == ENV['JOBS_KEY']
   end
end