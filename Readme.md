# Make Front Proxy

This application is a proxy of make-front app to be able to add dynamic data rendered from server like meta-tags.

## Installation:
The application is builded into a Docker image. The stack contain:

* node
* npm

In dev environnement you should have a symlink of the dist folder from the make-front app:

```
ln -s ~/www/make-front/target/scala-2.12/scalajs-bundler/main/dist ~/www/make-front-proxy/front
```

To launch the application:
```
npm start
```

## Build
To build the application:

```
docker build --rm -t nexus.prod.makeorg.tech/front-runner:master-latest .
```

And visit http://localhost:9009/FR

## Tests
Todo
