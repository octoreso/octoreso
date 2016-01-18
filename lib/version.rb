class Version
  MAJOR    = 0
  MINOR    = 1
  REVISION = 0
  SUFFIX   = nil

  def version
    "#{MAJOR}.#{MINOR}.#{REVISION}#{SUFFIX}"
  end
end
