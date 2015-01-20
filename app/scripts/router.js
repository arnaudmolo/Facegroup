var monorouter = require('monorouter');
var reactRouting = require('monorouter-react');
var router;

router = monorouter()
  .setup(reactRouting());

export default router;
