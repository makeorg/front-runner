# Make Front Runner

This application is a proxy of make-front app to be able to add dynamic data rendered from server like meta-tags.

## Installation:
The application is built into a Docker image. The stack contains:

* node (v9.5.0+)
* npm (5.6.0+)

In dev environnement you should have a symlink of the dist folder from the make-front app:

```sh
ln -s /path/to/make-front/target/scala-2.12/scalajs-bundler/main/dist /path/to/make-front-proxy/front
```

To launch the application:
```sh
npm install

npm start
# OR
npm run dev # app auto restart

```

## Build
To build the application:

```
docker build --rm -t nexus.prod.makeorg.tech/front-runner:master-latest .
```

And visit http://localhost:9009/FR

## Metrics
The application expose a metric endpoint http://localhost:9009/metrics ready for prometheuse integration.

## Tests
Todo
