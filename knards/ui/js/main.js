import { initNew } from './new';
import { initEdit } from './edit';
import { initList } from './list';
import { initRevise } from './revise';

// Common vars
var host = 'http://0.0.0.0:8000';

initNew(host);
initEdit(host);
initList(host);
initRevise(host);
