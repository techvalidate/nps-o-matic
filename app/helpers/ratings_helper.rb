module RatingsHelper
  def find_nearest(rating_number)
    rounded_number = (round_number(rating_number + 100, 10) / 25) * 25
    rounded_number / 2
  end

  def round_number(number, nearest)
    remainder = number % nearest
    remainder < (nearest / 2) ? number - remainder : number + (nearest - remainder)
  end

  def inline_svg(filename, options = {})
    file = File.read(Rails.root.join('app', 'assets', 'images', filename))
    doc = Nokogiri::HTML::DocumentFragment.parse file
    svg = doc.at_css 'svg'
    if options[:class].present?
      svg['class'] = options[:class]
    end
    doc.to_html.html_safe
  end
end
