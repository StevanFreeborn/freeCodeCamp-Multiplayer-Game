const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
import setupExpress from '../startup/setupExpress.mjs'

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('Headers test', () => {
    let server;
    let listener;
    before(done => {
      server = setupExpress();
      listener = server.listen(4000, done)
    });

    after(done => {
      listener.close();
      done();
    })

    test("Prevent the client from trying to guess / sniff the MIME type.", done => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          assert.deepStrictEqual(res.header['x-content-type-options'], 'nosniff');
          done();
        });
    });

    test("Prevent cross-site scripting (XSS) attacks.", done => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          assert.deepStrictEqual(res.header['x-xss-protection'], '1; mode=block');
          done();
        });
    });

    test("Nothing from the website is cached in the client.", done => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          assert.deepStrictEqual(res.header['surrogate-control'], 'no-store');
          assert.deepStrictEqual(res.header['cache-control'], 'no-store, no-cache, must-revalidate, proxy-revalidate');
          assert.deepStrictEqual(res.header['pragma'], 'no-cache');
          assert.deepStrictEqual(res.header['expires'], '0');
          done();
        });
    });

    test("The headers say that the site is powered by 'PHP 7.4.3'.", done => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          assert.deepStrictEqual(res.header['x-powered-by'], 'PHP 7.4.3');
          done();
        });
    });
  });
});
