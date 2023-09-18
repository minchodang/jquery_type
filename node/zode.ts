http
  .createServer(async (req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      res.writeHead(200);
      res.end(data);
    });
    try {
      const data = await fs.promises.readFile(
        path.join(__dirname, 'index.html')
      );
    } catch (err) {
      console.log(err);
    }
  })
  .listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
  });
