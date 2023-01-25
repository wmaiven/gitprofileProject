/* const app = require('../controller/controller');  // my attempt to do automatic tests but it didn't work :( I searched a lot and couldn't make it work
const router = require('../proxy/Proxy_controller');
const request = require('supertest');

describe ("Api tests", ()=>{
    test("test my index controller", ()=>{
        const res = request(router).get('/api/users');
        console.log(res);
        expect(res.statusCode).toEqual(200);
    })
}) */