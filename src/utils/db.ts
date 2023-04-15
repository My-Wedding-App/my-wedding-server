import db from "../config/db";

export const dynamoDBPutItem = async (tableName: string, item: any) => {
  const params = {
      Item: item,
      TableName: tableName
  };
  await db.put(params).promise();
};

export const dynamoDBQuery = async (tableName: string, partitionKeyName: string, partitionKeyVal: string, {
  requiredAttributes = undefined,
  expressionAttributeNames = {},
  expressionAttributeValues = {},
  filterExpression = undefined,
  limit = undefined,
  sortDesc = false,
  indexName = undefined,
  fetchAll = true,
  returnLastEvaluatedKey = false,
  lastEvaluatedKey = undefined
} = {}) => {
  let params = {
      TableName: tableName,
      KeyConditionExpression: '#parKey = :parKeyVal',
      ExpressionAttributeNames: { '#parKey': partitionKeyName, ...expressionAttributeNames },
      ExpressionAttributeValues: { ':parKeyVal': partitionKeyVal, ...expressionAttributeValues },
      FilterExpression: undefined,
      ProjectionExpression: undefined,
      Limit: undefined,
      ScanIndexForward: true,
      IndexName: undefined,
      ExclusiveStartKey: undefined
  };

  if (filterExpression) params.FilterExpression = filterExpression;
  if (requiredAttributes) params.ProjectionExpression = requiredAttributes;
  if (limit) params.Limit = limit;
  if (sortDesc) params.ScanIndexForward = false;
  if (indexName) params.IndexName = indexName;
  if (lastEvaluatedKey) params.ExclusiveStartKey = lastEvaluatedKey;

  console.log(params);
  let items = await dynamoDBQueryWithParams(params, fetchAll, returnLastEvaluatedKey);
  return items;
};

export const dynamoDBQueryByKeyExpression = async (tableName: string, {
  requiredAttributes = undefined,
  keyConditionExpression = undefined,
  expressionAttributeNames = {},
  expressionAttributeValues = {},
  filterExpression = undefined,
  limit = undefined,
  sortDesc = false,
  indexName = undefined,
  fetchAll = true,
  returnLastEvaluatedKey = false,
  lastEvaluatedKey = undefined
} = {}) => {
  let params: any = {
      TableName: tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues
  };

  if (filterExpression) params.FilterExpression = filterExpression;
  if (requiredAttributes) params.ProjectionExpression = requiredAttributes;
  if (limit) params.Limit = limit;
  if (sortDesc) params.ScanIndexForward = false;
  if (indexName) params.IndexName = indexName;
  if (lastEvaluatedKey) params.ExclusiveStartKey = lastEvaluatedKey;

  console.log(params);
  let items = await dynamoDBQueryWithParams(params, fetchAll, returnLastEvaluatedKey);
  return items;
};



export const dynamoDBQueryWithParams = async (params: any, fetchAll: any, returnLastEvaluatedKey: any) => {
  console.log(params);
  let data: any = await db.query(params).promise();
  let items = data.Items;
  if (!fetchAll) return returnLastEvaluatedKey ? { items: data.Items, lastEvaluatedKey: data.LastEvaluatedKey } : data.Items;
  while (data.LastEvaluatedKey) {
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      data = await db.query(params).promise();
      items?.push(...data.Items);
  }
  return items;
};

export const dynamoDBGetItem = async (tableName: string, partitionKeyName: string, partitionKeyVal: string, sortKeyName?: string, sortKeyVal?: string, requiredAttributes?: any) => {
  let params = {
      TableName: tableName,
      Key: {
          [partitionKeyName]: partitionKeyVal,
          ...(sortKeyName ? { [sortKeyName]: sortKeyVal } : {})
      },
      ProjectionExpression: undefined
  };
  if (requiredAttributes) {
      params.ProjectionExpression = requiredAttributes.join();
  }
  console.log({ params });

  const data = await db.get(params).promise();
  return [data.Item];
};

export const dynamoDeleteItem = async (tableName: string, partitionKeyName: string, partitionKeyVal: string, sortKeyName = undefined, sortKeyVal = undefined) => {
  let params = {
      TableName: tableName,
      Key: {
          [partitionKeyName]: partitionKeyVal,
          ...(sortKeyName ? { [sortKeyName]: sortKeyVal } : {})
      }
  };
  console.log({ params });

  const data = await db.delete(params).promise();
  return data;
};

export const dynamoDBScan = async (tableName: string,
  expressionAttributeNames?: string,
  expressionAttributeValues?: string,
  filterExpression?: string,
  {  
  requiredAttributes = undefined,
  limit = undefined,
  indexName = undefined,
  fetchAll = true
} = {}) => {
  let params: any = {
      TableName: tableName,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues
  };

  if (filterExpression) {
      params.FilterExpression = `${expressionAttributeNames} = ${expressionAttributeValues}`;
  }

  if (requiredAttributes) {
      params.ProjectionExpression = requiredAttributes;
  }

  if (limit) {
      params.Limit = limit;
  }

  if (indexName) {
      params.IndexName = indexName;
  }
  console.log(params);

  let data: any = await db.scan(params).promise();
  if (!fetchAll) return data.Items;

  let items = data.Items;
  while (data.LastEvaluatedKey) {
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      data = await db.scan(params).promise();
      items?.push(...data.Items);
  }
  return items;
};

export const dynamoDBUpdateItem = async (tableName: string, partitionKeyName: string, partitionKeyVal: string, sortKeyName = undefined, sortKeyVal = undefined, keyValsToUpdate: any) => {
  let updateExpression = '';
  const expressionAttributeNames: any = {};
  const expressionAttributeValues: any = {};
  let i = 0;

  for (const [key, val] of Object.entries(keyValsToUpdate)) {
      let namePlaceholder = `#n${i}`;
      let valPlaceholder = `:v${i}`;
      updateExpression = `${updateExpression}${i == 0 ? 'set' : ','} ${namePlaceholder} = ${valPlaceholder}`;
      expressionAttributeNames[namePlaceholder] = key;
      expressionAttributeValues[valPlaceholder] = val;
      i++;
  }

  let params = {
      TableName: tableName,
      Key: {
          [partitionKeyName]: partitionKeyVal,
          ...(sortKeyName ? {
              [sortKeyName]: sortKeyVal
          } : {})
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues
  };
  console.log({ params });
  const data = await db.update(params).promise();
  return data;
};

