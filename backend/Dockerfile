FROM ruby:3.1.2
RUN gem install bundler
RUN gem instal rails -v 7.0.4
RUN apt-get update && apt-get install -y \
  build-essential \
  nodejs

WORKDIR /backend

COPY . .

RUN bundle

EXPOSE 3000