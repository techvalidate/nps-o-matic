class RatingsController < ApplicationController
  respond_to :html, :js, :json

  def index
  end

  def create
    @rating = Rating.new params.fetch(:rating, {}).permit(:score)
    @rating.save!
    respond_to do |format|
      format.js { render layout: false, content_type: 'text/javascript' }
    end
  rescue ActiveRecord::RecordInvalid
    flash[:error] = 'Could not save score'
    render :index
  end

end
