import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import DataService from '../lib/dataService';

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const itemId = req.query.itemId || (req.body && req.body.itemId);
  const title = req.query.title || (req.body && req.body.title);
  const price = req.query.price || (req.body && req.body.price);
  const dataService = new DataService('items');
  if (itemId && title && price) {
    const entity = {
      PartitionKey: 'partition1',
      RowKey: itemId,
      title,
      price
    };

    const res = await dataService.updateEntity(entity);
    context.res = {
      body: res
    };
  } else {
    context.res = {
      status: 400,
      body:
        'Please pass a task and task Id on the query string or in the request body'
    };
  }
};

export default httpTrigger;