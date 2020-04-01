# auct-bid
Auction Bidding Store

## Before Installation
- Download And MariaDB or minimum mysql 5.6 +
- Download and install latest stable nodejs and npm
- Install global dependecies and cli :
  * [express cli generator](https://expressjs.com/en/starter/generator.html) 
  - using command : 
    ```sh
    $ npm install -g express-generator
  * [sequelize-cli](https://sequelize.org/master/manual/migrations.html#installing-the-cli)
  - using command :
    ```sh
    $ npm install --save-dev sequelize-cli


## First Use Installation
This Apps Use Standard Nodejs Environment
- Please rename sample.env to .env file and configuration db setting and environtment needed
- Follow package.json scripts step by step for first install and generate database
- Install the dependencies and devDependencies and start the server.

Use sh and command line :
```sh
$ git clone https://github.com/rhyoharianja/auct-bid.git
$ cd auct-bid
$ npm run add:module
$ npm run db:install
$ npm run start 
