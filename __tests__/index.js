const request = require('supertest')
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
let server

beforeEach(() => {
  server = require('../')
});

afterEach(() => {
  require('../').stop()
});

describe('api', () => {
  it('should return correct resonse for beers/1', async (done) => {
    const body = {
      action: 'API_CACHE',
      query: 'beers/1'
    }

    chai.request(server).post('/').set('Content-Type', 'application/json').send(body).then((res) => {
      res.status.should.eql(200)
      JSON.parse(res.text)[0].name.should.be.eq('Buzz')
      done()
    }).catch((e) => {
      console.log(e)
    })
  })

  it('should return correct resonse for beers/1 from cache', async (done) => {
    const body = {
      action: 'API_CACHE',
      query: 'beers/1'
    }

    chai.request(server).post('/').set('Content-Type', 'application/json').send(body).then((res) => {
      res.status.should.eql(200)
      JSON.parse(res.text)[0].name.should.be.eq('Buzz')
    }).catch((e) => {
      console.log(e)
    });
    chai.request(server).post('/').set('Content-Type', 'application/json').send(body).then((res) => {
      res.status.should.eql(200)
      JSON.parse(res.text)[0].name.should.be.eq('Buzz')
      done()
    }).catch((e) => {
      console.log(e)
    })
  })

  it('can delete cache for beers/1', async (done) => {
    const body = {
      action: 'CACHE_DELETE',
      query: 'beers/1'
    }

    chai.request(server).post('/').set('Content-Type', 'application/json').send(body).then((res) => {
      res.status.should.eql(200)
      JSON.parse(res.text).ok.should.be.eq(true)
      done()
    }).catch((e) => {
      console.log(e)
    })
  })
})
