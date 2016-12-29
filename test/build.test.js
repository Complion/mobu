'use strict';

const chai = require('chai');
const expect = chai.expect;

const {
    build,
    credentials,
    hosts,
    database,
    queryStringOptions
} = require('../lib/build');

describe('lib/connection', function(){
    describe('Connection String', function(){
        describe('credentials', function(){
            it('should return an empty string if no credentials are provided', function(done){
                const opts = {};
                const credentialsFragment = credentials(opts);
                expect(credentialsFragment).to.be.a('string');
                expect(credentialsFragment).to.have.length(0);
                done();
            });

            it('should return properly formated credential when only username is provided', function(done){
                const opts = { username: 'username' };
                const expectedCredentials = 'username@';
                const credentialsFragment = credentials(opts);
                expect(credentialsFragment).to.be.a('string');
                expect(credentialsFragment).to.equal(expectedCredentials);
                done();
            });

            it('should return properly formated credential when username and password are provided', function(done){
                const opts = { username: 'username', password: 'password' };
                const expectedCredentials = 'username:password@';
                const credentialsFragment = credentials(opts);
                expect(credentialsFragment).to.be.a('string');
                expect(credentialsFragment).to.equal(expectedCredentials);
                done();
            });

        });

        describe('hosts', function(){
            it('should throw an assertion error when provided hosts is not an array', function(done){
                const opts = { hosts: '' };
                const fn = hosts.bind(null, opts);
                expect(fn).to.throw(Error);
                done();
            });

            it('should return properly formated default hosts when an empty array is provided', function(done){
                const opts = { hosts: [] };
                const expectedHosts = 'localhost:27017';
                const hostsFragment = hosts(opts);
                expect(hostsFragment).to.equal(expectedHosts);
                done();
            });

            it('should return properly formated default hosts when an array is provided with incorrect parameters', function(done){
                const opts = { hosts: [{incorrect: 'parameters'}]};
                const expectedHosts = 'localhost:27017';
                const hostsFragment = hosts(opts);
                expect(hostsFragment).to.equal(expectedHosts);
                done();
            });

            it('should return properly formated hosts when a single host is provided', function(done){
                const opts = { hosts: [{ host: 'mongo'}]};
                const expectedHosts = 'mongo:27017';
                const hostsFragment = hosts(opts);
                expect(hostsFragment).to.equal(expectedHosts);
                done();
            });

            it('should return properly formated hosts when a single host and port are provided', function(done){
                const opts = { hosts: [{ host: 'mongo', port: 123}]};
                const expectedHosts = 'mongo:123';
                const hostsFragment = hosts(opts);
                expect(hostsFragment).to.equal(expectedHosts);
                done();
            });
            it('should return properly formated hosts when multiple hosts are provided', function(done){
                const opts = { hosts: [{ host: 'mongo1'},{ host: 'mongo2' }]};
                const expectedHosts = 'mongo1:27017,mongo2:27017';
                const hostsFragment = hosts(opts);
                expect(hostsFragment).to.equal(expectedHosts);
                done();
            });
            it('should return properly formated hosts when multiple hosts and port are provided', function(done){
                const opts = { hosts: [{ host: 'mongo1', port: 123},{ host: 'mongo2', port: 123 }]};
                const expectedHosts = 'mongo1:123,mongo2:123';
                const hostsFragment = hosts(opts);
                expect(hostsFragment).to.equal(expectedHosts);
                done();
            });
        });

        describe('database', function(){
            it('should return empty string when no database is supplied', function(done){
                const opts = {};
                const expectedDatabase = '';
                const databaseFragment = database(opts);
                expect(databaseFragment).to.equal(expectedDatabase);
                done();
            });
            it('should return propertly formated database when database is provided', function(done){
                const opts = { database: 'database'};
                const expectedDatabase = '/database';
                const databaseFragment = database(opts);
                expect(databaseFragment).to.equal(expectedDatabase);
                done();
            });
        });

        describe('queryStringOptions', function(){
            it('should return empty string when no options are provided', function(done){
                const opts = {};
                const expectedQuerystringOptions = '';
                const queryStringOptionsFragment = queryStringOptions(opts);
                expect(queryStringOptionsFragment).to.equal(expectedQuerystringOptions);
                done();
            });
            it('should return properly formated querystring options when 1 is provided', function(done){
                const opts = {
                    options: [
                        {
                            option: 'value'
                        }
                    ]
                };
                const expectedQuerystringOptions = '/?option=value';
                const queryStringOptionsFragment = queryStringOptions(opts);
                expect(queryStringOptionsFragment).to.equal(expectedQuerystringOptions);
                done();
            });
            it('should return properly formated querystring options when 1 is provided with database', function(done){
                const opts = {
                    database: 'database',
                    options: [
                        {
                            option: 'value'
                        }
                    ]
                };
                const expectedQuerystringOptions = '?option=value';
                const queryStringOptionsFragment = queryStringOptions(opts);
                expect(queryStringOptionsFragment).to.equal(expectedQuerystringOptions);
                done();
            });
            it('should return properly formated querystring options when multiple are provided', function(done){
                const opts = {
                    options: [
                        {
                            option1: 'value1'
                        },
                        {
                            option2: 'value2'
                        }
                    ]
                };
                const expectedQuerystringOptions = '/?option1=value1&option2=value2';
                const queryStringOptionsFragment = queryStringOptions(opts);
                expect(queryStringOptionsFragment).to.equal(expectedQuerystringOptions);
                done();
            });
            it('should return properly formated querystring options when multiple are provided with database', function(done){
                const opts = {
                    database: 'database',
                    options: [
                        {
                            option1: 'value1'
                        },
                        {
                            option2: 'value2'
                        }
                    ]
                };
                const expectedQuerystringOptions = '?option1=value1&option2=value2';
                const queryStringOptionsFragment = queryStringOptions(opts);
                expect(queryStringOptionsFragment).to.equal(expectedQuerystringOptions);
                done();
            });
        });

        describe('build', function(){
            it('should return properly formated MongoDB connection string from provided options', function(done){
                const opts = {
                    username: 'username',
                    password: 'password',
                    hosts: [{ host: 'mongo1', port: 123},{ host: 'mongo2', port: 123 }],
                    database: 'database',
                    options: [
                        {
                            option1: 'value1'
                        },
                        {
                            option2: 'value2'
                        }
                    ]
                };
                const expectedConnectionString = 'mongodb://username:password@mongo1:123,mongo2:123/database?option1=value1&option2=value2';
                const connectionString = build(opts);
                expect(connectionString).to.equal(expectedConnectionString);
                done();

            });

            it('should build the default connection string when no options are provided', function(done){
                const expectedConnectionString = 'mongodb://localhost:27017';
                const connectionString = build();
                expect(connectionString).to.equal(expectedConnectionString);
                done();
            });
        });
    });
});
