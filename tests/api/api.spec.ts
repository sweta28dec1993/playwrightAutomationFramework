import { runApiTestsFromJson } from '../../framework/api/testRunner';
import * as path from 'path';

runApiTestsFromJson(path.join(__dirname, 'data/jsonplaceholder.json'));
