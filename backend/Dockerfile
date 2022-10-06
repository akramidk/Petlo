FROM ruby:3.1.2
RUN gem install bundler
RUN gem instal rails -v 7.0.4

WORKDIR /backend

COPY . .

RUN bundle

EXPOSE 3000

CMD ["rails", "s", "-b", "0.0.0.0", "-p", "3000"]
