require 'rails_helper'

# Test suite for the Item model
RSpec.describe Player, type: :model do

  # Validation test
  # ensure column name is present before saving
  it { should validate_presence_of(:name) }
end