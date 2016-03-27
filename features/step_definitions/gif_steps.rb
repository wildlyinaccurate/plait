last_image = nil

Then(/^there should be a new cat gif$/) do
  sleep(1.2)

  current_image = find('img')[:src]

  if (current_image == last_image or not current_image.include?('giphy')) then
    raise Capybara::ExpectationNotMet.new("#{current_image} is not a new cat gif")
  end

  last_image = current_image
end

Then(/^there should be (\d+) total requests for "([^"]*)" gifs$/) do |n, topic|
  sleep(0.1)

  is_topic_gif = self.method(:is_gif_request).curry.call(topic)
  gifs = page.driver.network_traffic.select(&is_topic_gif)

  if (gifs.length != n.to_i) then
    raise Capybara::ExpectationNotMet.new("Expected to see #{n} requests for #{topic} gifs but there were #{gifs.length}")
  end
end

def is_gif_request(topic, request)
  request.url.include?("&tag=#{topic}")
end
