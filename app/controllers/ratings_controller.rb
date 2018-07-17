class RatingsController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:create]

  def index
  end

  def create
    @rating = Rating.new params.fetch(:rating, {}).permit(:score)
    @rating.save!
    # Render the partial instead of redirect
    render partial: 'ratings/appreciate'
  rescue ActiveRecord::RecordInvalid
    flash[:error] = 'Could not save score'
    render :index
  end

end
