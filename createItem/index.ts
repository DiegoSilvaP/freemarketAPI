import { AzureFunction, Context, HttpRequest } from '@azure/functions';
const shortid = require('shortid');
import DataService from '../lib/dataService';

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const title = req.query.title || (req.body && req.body.title);
  const price = req.query.price || (req.body && req.body.price);
  const dataService = new DataService('items');
  if (title && price) {
    const entity = {
      PartitionKey: 'partition1',
      RowKey: shortid.generate(),
      title,
      price
    };
    const res = await dataService.insertEntity(entity, { echoContent: true });
    context.res = {
      body: res
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a todo on the query string or in the request body'
    };
  }
};
export default httpTrigger;