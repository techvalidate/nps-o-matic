require 'rails_helper'

describe RatingsController do

  it 'loads the home page' do
    get ratings_url
    expect(response).to be_success
  end

  it 'saves a rating' do
    expect {
      post ratings_url, params: { rating: { score: 10 } }
      expect(response).to be_success
    }.to change(Rating, :count).by(1)
  end

  it 'handles an empty ratings hash' do
    expect {
      post ratings_url
      expect(response).to have_http_status(422)
    }.not_to change(Rating, :count)
  end

  it 'handles an invalid rating score' do
    expect {
      post ratings_url, params: { rating: { score: 11 } }
      expect(response).to have_http_status(422)
    }.not_to change(Rating, :count)
  end

end
