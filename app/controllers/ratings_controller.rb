class RatingsController < ApplicationController

  def index
  end

  def create
    @rating = Rating.new params.fetch(:rating, {}).permit(:score)
    @rating.save!
    render partial: 'meter'
    # redirect_to root_url
  rescue ActiveRecord::RecordInvalid
    flash[:error] = 'Could not save score'
    render :index
  end

end
