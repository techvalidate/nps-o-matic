class RatingsController < ApplicationController

  def index
  end

  def create
    @rating = Rating.new params.fetch(:rating, {}).permit(:score)
    @rating.save!

    rating_html_content = render_to_string :partial => 'ratings/rating_area'

    render json: {
      :status => :ok,
      :rating_html => rating_html_content,
      :nps_score =>  Rating.nps
    }
  rescue ActiveRecord::RecordInvalid
    flash[:error] = 'Could not save score'
    render json: {status: :expectation_failed}
  end

end
