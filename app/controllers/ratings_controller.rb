class RatingsController < ApplicationController
  respond_to :html, :js

  def index
  end

  def create
    @rating = Rating.new params.fetch(:rating, {}).permit(:score)
    @rating.save!
    redirect_to root_url

    # render partial: 'ratings/appreciate'

    # respond_to do |format|
    #   format.html { render partial: 'ratings/appreciate' }
    # end
  rescue ActiveRecord::RecordInvalid
    flash[:error] = 'Could not save score'
    render :index
  end

end
