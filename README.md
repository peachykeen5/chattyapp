# README

## About

A minimal and light dev environment for ReactJS.

This project integrates a WebSocket server with a basic single page application to provide a seamless multi-user chat experience.


## Screenshots

* Users can set their original name and change it as many times as they like.

!["screenshot of new username notification"](https://github.com/peachykeen5/chattyapp/blob/master/docs/chatty-app1.gif)


* Other users can join the chat and all messages are sent and received to all users.

!["screenshot of second user joining chat"](https://github.com/peachykeen5/chattyapp/blob/master/docs/chatty-app2.gif)


* Users names stay the same color throughout chat history.

!["screenshot of conversation"](https://github.com/peachykeen5/chattyapp/blob/master/docs/chatty-app3.gif)


* Some mobile integrations.

!["screenshot of user experience on mobile"](https://github.com/peachykeen5/chattyapp/blob/master/docs/chatty-app4a.gif)


### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)


### Getting Started

* Install all dependencies (using the npm install command) in both the main folder and chatty-server folder.
* Run the development web server using the `npm start` command in the main folder.
* Run the web socket server using `npm start` command in the chatty_server folder.
* Go to http://localhost:3000/ in your web browser