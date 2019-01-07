# mobu - (mo)ngoD(b) (u)RI builder

__mobu__ is a simple dependency free connection URI builder for MongoDB.

### Install
    $ npm install mobu

### Usage
```js
const mobu = require('mobu');

const mongoDbConnectionUri = mobu.build({
    username: 'username', // optional
    password: 'password', // optional but only if username is included
    hosts: [
        { host: 'localhost', port: 27017 }
    ],
    database: 'mydatabase',
    options: [
        { replicaSet: 'myreplicaset' }
    ]
});

// mongoDbConnectionUri = 'mongodb://username:password@localhost:27017/mydatabase?replicaSet=myreplicaset'
```

### API
* `mobu.build(options)` - Builds the connections string from the provided
  options. All options are optional. If no options are provided, the default
  connection string returned is: `'mongodb://localhost:27017'`.
  * `username` - __String__ The MongoDB username to use for the connection
  * `password` - __String__ The password for the MongoDB user. Only considered
    if `username` is also provided.
  * `hosts` - __Array__ The MongoDB hosts. Multiple can be provided. Each entry
    must be of the following form:
    * `host` - __String__ The network hostname of a MongoDB instance.
      __Default__: `'localhost'`
    * `port` - __number__ or __String__ The port number MongoDB is lisenting on for this instance.
      __Default__: `27017`
  * database - __String__ The name of the primary database to use for this
    connection.
  * `options` - __Array__ Any querystring parameters to include. mobu will
    accept any options so please check the [MongoDB connection string
    documentation](https://docs.mongodb.com/manual/reference/connection-string/) for the correct options. Each option is of the form: `optionName: optionValue`
    * `optionValue` - __String__ Any value for the provided option (`optionName`)

### Development

__mobu__ will always as simple as possible dealing only with MongoDB
connection strings. However in the future it will include additional validation
checks and parsing abilities.

If you find any bugs or want to contribute, great! Please know that we strive
for 100% code coverage in our tests so be sure to run the tests, add additional
if neccessary, and check the coverage before submitting.

    $ npm test
    $ npm run cover
