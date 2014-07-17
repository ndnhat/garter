var request = require('supertest');
var should = require('should');

describe('GA', function() {
  request = request('http://localhost:' + (process.env.PORT || 3000));

  describe('real time API', function() {
    it('should return true', function(done) {
      request.get('/gart?profile=' + process.env.GA_PROFILE).end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.should.be.an.object;
        res.body.users.should.be.a.number;
        done();
      });
    });

  });

});
