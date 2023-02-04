module Customer::ValidatesPassword
    MINIMUM_PASSWORD_LENGTH = 8

    def validates_password(password:)        
        if password == nil
            raise(RuntimeError, 2000007)
        elsif password.strip.length < MINIMUM_PASSWORD_LENGTH
            raise(RuntimeError, 2000008)
        end
    end
end