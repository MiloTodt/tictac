# Tic Tac Toe

## Description

Tic Tac Toe game with scoreboard implimented with a React front end, Ruby On Rails REST API backend.
![alt text](https://i.imgur.com/ymupNbC.png "Website")

## Requirements

* Frontend
NodeJS
```
sudo apt install nodejs -y
```

* Backend
Ruby 2.5.3, Rails 5.2.1

```

\curl -sSL https://get.rvm.io | bash -s stable --ruby
rvm install 2.5.3
rvm use ruby-2.5.3
gem install rails
```


## Running
* Open two terminal windows, in the first run:
```
git clone https://github.com/MiloTodt/tictac.git
cd tictac
bundle install
rake db:setup
rails server -p 3001
```
![alt text](https://i.imgur.com/gSktGvX.png "Back")

* In the second terminal, navigate to /tictac/client
```
npm start
```
![alt text](https://i.imgur.com/Y3v6UwB.png "Front")

