# error-cause-polyfill-test

This is a test to see how polyfill in `error.cause` affects the Node.js stack trace.

## Node.js v14.20.0

```console
$ node native.js
/Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/native.js:4
throw appError;
^

Error: App error
    at Object.<anonymous> (/Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/native.js:2:18)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:75:12)
    at internal/main/run_main_module.js:17:47
```

```console
$ node use-error-cause.js
/Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/use-error-cause.js:6
throw appError;
^

Error: App error
    at new Error (/Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/node_modules/.pnpm/error-cause@1.0.4/node_modules/error-cause/Error/implementation.js:13:33)
    at Object.<anonymous> (/Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/use-error-cause.js:4:18)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:75:12)
    at internal/main/run_main_module.js:17:47
```

```console
$ node use-error-cause-polyfill.mjs
file:///Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/use-error-cause-polyfill.mjs:4
const appError = new Error('App error', { cause: internalError });
                 ^

Error: App error
    at file:///Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/use-error-cause-polyfill.mjs:4:18
    at ModuleJob.run (internal/modules/esm/module_job.js:183:25)
    at async Loader.import (internal/modules/esm/loader.js:178:24)
    at async Object.loadESM (internal/process/esm_loader.js:68:5)
    at async handleMainPromise (internal/modules/run_main.js:59:12)
```


## Node.js v18.3.0

```console
$ node native.js
/Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/native.js:4
throw appError;
^

Error: App error
    at Object.<anonymous> (/Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/native.js:2:18)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    ... 4 lines matching cause stack trace ...
    at node:internal/main/run_main_module:17:47 {
  [cause]: Error: Original error
      at Object.<anonymous> (/Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/native.js:1:23)
      at Module._compile (node:internal/modules/cjs/loader:1105:14)
      at Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
      at Module.load (node:internal/modules/cjs/loader:981:32)
      at Module._load (node:internal/modules/cjs/loader:827:12)
      at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
      at node:internal/main/run_main_module:17:47
}

Node.js v18.3.0
```

```console
$ node use-error-cause.js
/Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/use-error-cause.js:6
throw appError;
^

Error: App error
    at Object.<anonymous> (/Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/use-error-cause.js:4:18)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    ... 4 lines matching cause stack trace ...
    at node:internal/main/run_main_module:17:47 {
  [cause]: Error: Original error
      at Object.<anonymous> (/Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/use-error-cause.js:3:23)
      at Module._compile (node:internal/modules/cjs/loader:1105:14)
      at Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
      at Module.load (node:internal/modules/cjs/loader:981:32)
      at Module._load (node:internal/modules/cjs/loader:827:12)
      at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
      at node:internal/main/run_main_module:17:47
}

Node.js v18.3.0
```

```console
$ node use-error-cause-polyfill.mjs
file:///Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/use-error-cause-polyfill.mjs:4
const appError = new Error('App error', { cause: internalError });
                 ^

Error: App error
    at file:///Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/use-error-cause-polyfill.mjs:4:18
    at ModuleJob.run (node:internal/modules/esm/module_job:198:25)
    ... 3 lines matching cause stack trace ...
    at async handleMainPromise (node:internal/modules/run_main:61:12) {
  [cause]: Error: Original error
      at file:///Users/mizdra/src/localhost/gomi/error-cause-polyfill-test/use-error-cause-polyfill.mjs:3:23
      at ModuleJob.run (node:internal/modules/esm/module_job:198:25)
      at async Promise.all (index 0)
      at async ESMLoader.import (node:internal/modules/esm/loader:409:24)
      at async loadESM (node:internal/process/esm_loader:85:5)
      at async handleMainPromise (node:internal/modules/run_main:61:12)
}

Node.js v18.3.0
```

