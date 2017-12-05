require 'rails_helper'

RSpec.describe Rating do

  it 'calculates NPS' do
    expect(Rating.promoters_percentage).to be(18)
    expect(Rating.detractors_percentage).to be(64)
    expect(Rating.nps).to be(-46)
  end

  it 'validates score' do
    expect(Rating.new).not_to be_valid
    expect(Rating.new(score: -1)).not_to be_valid
    expect(Rating.new(score: 11)).not_to be_valid
    expect(Rating.new(score: 3.14)).not_to be_valid
  end

end
