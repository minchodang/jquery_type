import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

http
  .createServer(async (req, res) => {
    try {
      const data = await fs.promises.readFile(
        path.join(__dirname, 'index.html')
      );
      res.writeHead(200);
      res.end(data);
    } catch (err) {
      console.log(err);
    }
  })
  .listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
  });
