# rules_js_repro

Issue [#116](https://github.com/aspect-build/rules_js/issues/116).

The following works:

```
bazel run //services/hello-world:start
```

But when building a Docker image, symlinks destinations seems to get copied, causing indirect dependencies resolutions to fail. The problem seems unrelated to any of the Docker rules, but to the `pkg_tar`.

```
bazel run //services/hello-world:image # build and load Docker image
docker run bazel/services/hello-world:image
```

The Docker image fails since a indirect dependency can't be found:

```
node:internal/modules/cjs/loader:936
  throw err;
  ^

Error: Cannot find module 'lodash.camelcase'
Require stack:
- /services/hello-world/_start_launcher.sh.runfiles/repro/node_modules/@grpc/proto-loader/build/src/index.js
- /services/hello-world/_start_launcher.sh.runfiles/repro/services/hello-world/index.js
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:933:15)
    at Function.Module._load (node:internal/modules/cjs/loader:778:27)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/services/hello-world/_start_launcher.sh.runfiles/repro/node_modules/@grpc/proto-loader/build/src/index.js:20:19)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:1005:19) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/services/hello-world/_start_launcher.sh.runfiles/repro/node_modules/@grpc/proto-loader/build/src/index.js',
    '/services/hello-world/_start_launcher.sh.runfiles/repro/services/hello-world/index.js'
  ]
}
```
