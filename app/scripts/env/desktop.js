import connect from 'connect';
import serveStatic from 'serve-static';

try {
  connect().use(serveStatic('./dist/')).listen(9000);
  if (window.location.href.indexOf('localhost') < 0) {
      window.location = 'http://localhost:9000';
  }
} catch (e) {
  console.log(e);
}
