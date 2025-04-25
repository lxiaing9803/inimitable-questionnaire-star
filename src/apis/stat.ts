import { StatDataRequestType } from '@/types/stat';
import { request } from '@/utils/request';

export async function getQuestionStatList(questionId: string, params: StatDataRequestType) {
  return request.get(`/api/stat/${questionId}`, {
    params,
  });
}
// 获取组件统计数据汇总
export async function getComponentStat(questionId: string, componentId: string) {
  return request.get(`/api/stat/${questionId}/${componentId}`);
}
