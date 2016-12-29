const MONGO_PROTOCOL = 'mongodb://';
const DEFAULT_PORT = 27017;
const DEFAULT_HOST = 'localhost';
const DEFAULT_HOSTS = [{ host: DEFAULT_HOST, port: DEFAULT_PORT }];

function credentials({username, password}) {
    return username ? password ? `${username}:${password}@` : `${username}@` : '';
}

function hosts({hosts=DEFAULT_HOSTS}){
    if(!Array.isArray(hosts)){
        throw new Error('hosts must be an array');
    }

    if(hosts.length === 0){
        hosts = DEFAULT_HOSTS;
    }

    return hosts.reduce((acc, h) =>
        acc.concat(`${h['host'] || DEFAULT_HOST}:${h['port'] || DEFAULT_PORT}`), [])
            .join(',');
}

function database({database}) {
    return database ? `/${database}` : '';
}

function queryStringOptions({database, options=[]}){
    if(options.length === 0){
        return '';
    }

    const prefix = database ? '?' : '/?';
    const optionsString = options.reduce((acc, o) => {
        const key = Object.keys(o)[0];
        return acc.concat(`${key}=${o[key]}`);
    }, []).join('&');

    return `${prefix}${optionsString}`;
}

function build(opts={}){
    let connectionString = '';
    connectionString += MONGO_PROTOCOL;
    connectionString += credentials(opts);
    connectionString += hosts(opts);
    connectionString += database(opts);
    connectionString += queryStringOptions(opts);
    return connectionString;
}

module.exports = exports.default = {
    credentials,
    hosts,
    database,
    queryStringOptions,
    build
};
