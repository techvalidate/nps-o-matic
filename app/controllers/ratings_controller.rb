class RatingsController < ApplicationController

  def index
  end

  def create
    @rating = Rating.new params.fetch(:rating, {}).permit(:score)
    @rating.save!
  rescue ActiveRecord::RecordInvalid
    flash[:error] = 'Could not save score'
    render :index
  end

  def get_ratings
    ratings = Rating.all
    render json: ratings
  end

end
