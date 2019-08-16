FROM ruby:2.6.2

RUN apt-get update --fix-missing \
  && apt-get -y upgrade \
  && apt-get install -qq -y \
    imagemagick \
    mysql-client \
  && apt-get autoremove -y \
  && apt-get clean all \
  && fc-cache -f -v

RUN gem update --system
RUN gem install bundler

WORKDIR /app
COPY ./backend/Gemfile ./backend/Gemfile.lock ./
RUN bundle install --jobs=4 --retry=3

COPY ./backend .

EXPOSE 3000

# Start the main process.
CMD bin/rails server -b 0.0.0.0