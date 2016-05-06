# Staty

Full-featured example of publishing platform built with
[React](http://facebook.github.io/react/),
[Redux](http://rackt.github.io/redux/),
[React Router](http://rackt.github.io/react-router/),
[Babel](https://babeljs.io/) and
[Webpack](http://webpack.github.io/).
[Immutable](https://facebook.github.io/immutable-js/)
Some features:
- Server-side rendering
- OAuth Facebook Login
- Dockerized services


## Running
```bash
npm install
```

### Production
```bash
make # build assets and server
npm start # start the server
```

Open [http://localhost:3000/](http://localhost:3000/) in the browser.

### Development
```bash
make dev # start development server with hot reloading
```

It will automatically open your default browser with project loaded.

**Note**: You will notice some latency between the moment it open the browser and really load the page. It's okay.

## You can

### while unauthorized

- View League games
- View game stats
- View player stats
- View team stats
- View schedule

### while authorized
- View profile

## TODO

- [ ] profile page
- [ ] google analytics
- [ ] server logging
