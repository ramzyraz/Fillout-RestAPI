const express = require('express');
const formsRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (_, res) => { res.send("This is a Simple Rest API") });
app.use('/v1/api/forms', formsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});