var cp = require('child_process');
var exports = module.exports = {};

exports.list = function() {
  var out = cp.execSync('gpg --list-public-keys | grep @');
  var lines = out.toString().split('\n');
  lines.pop();

  var keys = [];
  for (var i = 0; i < lines.length; i++) {
    var part1 = lines[i].split(' <');
    var email = part1[part1.length-1].split('>')[0];
    var part2 = part1[part1.length-2].split(' ');
    var userid = part2[part2.length-1];

    keys = keys.concat({ userid : userid, email : email });
  }

  return keys;
};

exports.pub = function(id) {
  var out = cp.execSync('gpg --export --armor %id%'.replace('%id%', id));

  return out.toString();
};

exports.encrypt = function(msg, id) {
  var out = cp.execSync('echo %msg% | gpg -ea -r %id%'.replace('%msg%', msg).replace('%id%', id));

  return out.toString();
};

exports.decrypt = function(msg) {
  var out = cp.execSync('echo "%msg%" | gpg -d'.replace('%msg%', msg));

  return out.toString();
};
