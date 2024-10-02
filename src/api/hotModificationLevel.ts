// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** setLoggerLevel POST /api/logger/level */
export async function setLoggerLevelUsingPost(
  body: API.SetLoggerLevelParam,
  options?: { [key: string]: any },
) {
  return request<any>('/api/logger/level', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
