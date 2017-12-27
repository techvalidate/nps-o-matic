module ApplicationHelper
  def pluralize_word(count, singular, plural = nil)
    ([1, '1'].include?(count) ? singular : (plural || singular.pluralize))
  end

  def svg(name)
    file_path = "#{Rails.root}/app/assets/images/#{name}.svg"
    return File.read(file_path).html_safe if File.exist?(file_path)
    '(not found)'
  end

end
