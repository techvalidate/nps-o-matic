class Rating < ApplicationRecord

  def self.detractors_percentage
    return 0 if Rating.none?
    ((Rating.detractors.count / Rating.count.to_f) * 100).round
  end

  def self.nps
    (promoters_percentage - detractors_percentage).round
  end

  def self.promoters_percentage
    return 0 if Rating.none?
    ((Rating.promoters.count / Rating.count.to_f) * 100).round
  end

  scope :detractors, ->{ where('score < 7') }
  scope :neutrals,   ->{ where('score = 7 OR score = 8') }
  scope :promoters,  ->{ where('score > 8') }

  validates :score, numericality: { only_integer: true, greater_than: -1, less_than: 11 }

end