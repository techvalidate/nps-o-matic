class RatingsController < ApplicationController
  skip_before_action :verify_authenticity_token # to avoid 422 error https://stackoverflow.com/questions/27098239/post-422-unprocessable-entity-in-rails-due-to-the-routes-or-the-controller

  def index
  end

  def create
    @rating = Rating.new params.fetch(:rating, {}).permit(:score)

    if @rating.save
      render json: @rating
    else
      render json: @rating.errors, status: :unprocessable_entity
    end

  rescue ActiveRecord::RecordInvalid
    flash[:error] = 'Could not save score'
    render :index
  end

  def nps_attributes
    render json: {
      total_ratings: Rating.count,
      nps: Rating.nps,
      detractors_percentage: Rating.detractors_percentage,
      promoters_percentage: Rating.promoters_percentage
    }
  end

end
