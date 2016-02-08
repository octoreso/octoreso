class Version
  MAJOR    = 0
  MINOR    = 9
  REVISION = 9
  SUFFIX   = nil

  class << self
    def version
      "#{MAJOR}.#{MINOR}.#{REVISION}#{SUFFIX}"
    end
  end
end
