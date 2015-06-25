var proxyquire = require('proxyquire')
var describe = require('mocha').describe
var beforeEach = require('mocha').beforeEach
var it = require('mocha').it
var expect = require('chai').expect
var sinon = require('sinon')

describe('lib/from-env-or-file', function () {
  var fsStub
  var fromEnvOrFile

  beforeEach(function() {
    fsStub = {}

    fromEnvOrFile = proxyquire('../', {
      'fs': fsStub
    })
  })

  it('should read from env', function (done) {
    var env = 'foo'
    fromEnvOrFile(env, null, function (error, result) {
      expect(error).to.not.exist
      expect(result).to.equal(env)
      done()
    })
  })

  it('should read from file', function (done) {
    var path = 'path'
    var file = 'foo'
    fsStub.readFile = sinon.stub().withArgs('path', 'uft8').callsArgWith(2, null, file)
    fromEnvOrFile(null, path, function (error, result) {
      expect(error).to.not.exist
      expect(result).to.equal(file)
      done()
    })
  })

  it('should survive no path being send', function (done) {
    fromEnvOrFile(null, null, function (error, result) {
      expect(error).to.not.exist
      expect(result).to.not.exist
      done()
    })
  })
})
