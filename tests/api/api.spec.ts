import { runApiTestsFromYaml } from '../../framework/api/testRunner';
import * as path from 'path';

runApiTestsFromYaml(path.join(__dirname, 'data/jsonplaceholder.yaml'));
