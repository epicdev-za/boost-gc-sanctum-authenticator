# Boost Error Plugin
This plugin is designed to add Google Cloud Secret Manager integration to allow authorization to Sanctum in Google Cloud environments

# Installation
```sh
npm install --save @epicdev/boost-gc-sanctum-authentictor
```

Register it in **server.config.js**
```js
...
sanctum: {
    project_key: '',
    gc_project_id: ''//Insert Google Cloud Project ID
},
plugins: ['boost-gc-sanctum-authentictor'], //Or use boost-error-plugin/gc for Google Cloud Error Reporting
endpoints: {
...
```
