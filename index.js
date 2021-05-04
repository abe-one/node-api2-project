const server = require("./api/server");

const port = 8888;

server.listen(port, () => console.log(`Server running on ${port}`));
