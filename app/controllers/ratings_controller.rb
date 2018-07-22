class RatingsController < ApplicationController
  respond_to :html, :js, :json
  protect_from_forgery except: :create

  def index
  end

  def create
    @rating = Rating.new params.fetch(:rating, {}).permit(:score)
    @rating.save!
    respond_to do |format|
      # format.html {redirect_to root_url }
      # format.json { render json: @rating }
      # format.js {render :content_type => 'text/javascript'}
      format.js { render layout: false, content_type: 'text/javascript' }
        # format.js
      # redirect_to root_url
    end
    #     @rating = Rating.new params.fetch(:rating, {}).permit(:score)
    # @rating.save!
  rescue ActiveRecord::RecordInvalid
    flash[:error] = 'Could not save score'
    render :index
  end

end
