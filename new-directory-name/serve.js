// serve.js
import { createServer } from 'http';
import { handler } from 'serve-handler';

const server = createServer((request, response) => {
    return handler(request, response, {
        public: 'build',
    });
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});
