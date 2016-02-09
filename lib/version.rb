class Version
  MAJOR    = 1
  MINOR    = 0
  REVISION = 0
  SUFFIX   = nil

  def version
    "#{MAJOR}.#{MINOR}.#{REVISION}#{SUFFIX}"
  end
end
