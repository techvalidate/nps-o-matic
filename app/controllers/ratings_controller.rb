class RatingsController < ApplicationController

  def index
  end

  def create
    byebug
    @rating = Rating.new params.fetch(:rating, {}).permit(:score)
    @rating.save!
    redirect_to root_url
  rescue ActiveRecord::RecordInvalid
    flash[:error] = 'Could not save score'
    render :index
  end

end
