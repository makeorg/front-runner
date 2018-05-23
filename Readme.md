# Make Front Proxy

This application is a proxy of make-front app to be able to add dynamic data rendered from server like meta-tags.

## Installation:
The application is builded into a Docker image. The stack contain:

* node
* npm

To launch the application:


```
docker build --rm -t makeorg/make-font-proxy .
docker run -p 9009:8080 makeorg/make-font-proxy
```

And visit http://localhost:9009/FR

## Tests
Todo
