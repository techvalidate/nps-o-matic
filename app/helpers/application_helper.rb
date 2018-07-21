module ApplicationHelper

	# Taken from https://stackoverflow.com/questions/36986925/how-do-i-display-svg-image-in-rails
	def show_svg(path)
	  File.open("app/assets/images/#{path}", "rb") do |file|
	    raw file.read
	  end
	end
end
