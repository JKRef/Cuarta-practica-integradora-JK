const chai = require('chai');
const superTest = require('supertest');
const testingURL = 'http://localhost:8080';
const request = superTest(testingURL);
const expect = chai.expect;
const testingProducts = ['7789e10988edf593'];

describe('Test de productos', () => {
  const product = {
    title: 'Testing product',
    description: 'Descripcion de prueba para testing',
    code: 'PRTS1',
    price: 50000,
    stock: 200,
    category: 'testing',
    thumbnails: ['...links'],
  };

  it(`Testing para obtener productos - ${testingURL}/api/products`, async () => {
    const { statusCode, ok, _body } = await request.get(`/api/productsBd`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body.payload).to.be.an.instanceof(Array);
  });

  it(`Test para obtener la id de un producto - ${testingURL}/api/products/:pid`, async () => {
    const { statusCode, ok, _body } = await request.get(`/api/productsBd/${testingProducts[0]}`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  });

  it(`Test para crear un producto - ${testingURL}/api/products/`, async () => {
    const { statusCode, ok, _body } = await request.post(`/api/products/`).send(product);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  });
});


describe('Test de carritos', () => {
const testingProducts = ['7789e10988edf593'];
let id = [''];
  it(`Test para obtener carritos `, async () => {
    const { statusCode, ok, _body } = await request.get('/api/cartsBd');
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Array);
  });

  it(`Test para obtener id del carrito `, async () => {
    const { statusCode, ok, _body } = await request.get(`/api/cartsBd/${id}`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  });

  it(`Test para añadir un carrito `, async () => {
    const response = await request.post(`/api/session/login`).send({
      email: 'osca5car@gmail.com',
      password: '163',
    });
    const { headers } = response;
    const array = headers['set-cookie'][0].split('=');
    cookie = {
      name: array[0],
      value: array[1],
    };
    const { statusCode, ok, _body } = await request.post(`/api/cartsBd/${id}/product/${testingProducts[0]}`).set('Cookie', `${cookie.name}=${cookie.value}`);
    console.log(statusCode);
    expect(statusCode).to.deep.equal(201);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  });
});


describe('Test de sesiones', () => {
  const user = {
    firstName: 'coder',
    lastName: 'user',
    email: 'coderuser@coder.com',
    password: '874',
  };

  // const userLogin = {
  //   email: 'coderuser@coder.com',
  //   password: '874',
  // };
  let cookie;

  it(`Testing de registro`, async () => {
    const response = await request.post(`/api/session/register`).send(user);
    const { statusCode, _body, ok } = response;
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body);
  }).timeout(10000);

  it(`Testing de inicio de sesion`, async () => {
    const response = await request.post(`/api/session/login`).send({
      email: user.email,
      password: user.password,
    });
    const { statusCode, _body, headers } = response;
    console.log(_body);
    const array = headers['set-cookie'][0].split('=');
    cookie = {
      name: array[0],
      value: array[1],
    };
    expect(statusCode).to.deep.equal(200);
    expect(headers['set-cookie']).to.be.ok;
    expect(_body.firstName).to.equal(user.firstName);
    expect(_body.lastName).to.equal(user.lastName);
    expect(cookie.name).to.equal('connect.sid');
    expect(cookie.value).to.equal;
  }).timeout(10000);

  it(`Current Usuario`, async () => {
    const response = await request.get(`/api/session/current`).set('Cookie', `${cookie.name}=${cookie.value}`);
    const { statusCode, _body } = response;
    console.log(statusCode, _body);
    expect(statusCode).to.deep.equal(200);
    expect(_body.email).to.deep.equal(user.email);
    expect(_body).to.be.an.instanceof(Object);
  }).timeout(10000);
});
