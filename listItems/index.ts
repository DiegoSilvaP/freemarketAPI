import { AzureFunction, Context } from '@azure/functions';
import { TableQuery } from 'azure-storage';
import DataService from '../lib/dataService';

const httpTrigger: AzureFunction = async function(context: Context): Promise<void> {
  const dataService = new DataService('items')
  const query = new TableQuery().top(100)

  const res = await dataService.listEntities(query)
  context.res = {
    body: res
  };
};

export default httpTrigger;