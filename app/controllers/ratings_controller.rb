class RatingsController < ApplicationController

  def index
  end

  def create
    @rating = Rating.new params.fetch(:rating, {promo: Rating.promoters_percentage}).permit(:score)
    @rating.save!
    # Reload out, javascript to the rescue!
    # redirect_to root_url
  rescue ActiveRecord::RecordInvalid
    flash[:error] = 'Could not save score'
    render :index
  end

end
