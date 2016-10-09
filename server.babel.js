/**
 * Created by helga on 07.10.16.
 */

import express from 'express';

const app = express();

app.use('/', express.static('public'));

app.listen(process.env.PORT || 3000);