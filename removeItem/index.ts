import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import DataService from '../lib/dataService';

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const itemId = req.query.itemId || (req.body && req.body.itemId);
  const dataService = new DataService('items');
  if (itemId) {
    const entity = {
      PartitionKey: 'partition1',
      RowKey: itemId,
      title: undefined,
      price: undefined
    };
    const res = await dataService.removeEntity(entity);
    context.res = {
      body: res
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a task ID on the query string or in the request body'
    };
  }
};

export default httpTrigger;