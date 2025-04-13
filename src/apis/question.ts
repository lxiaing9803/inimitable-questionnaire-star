import { QuestionnaireDataType, QuestionnaireRequestParams } from '@/types/question';
import { QuestionDataType } from '@/types/question';
import { request } from '@/utils/request';

export async function getQuestionDetail(id: string) {
  return await request.get<QuestionDataType>(`/api/question/detail/${id}`);
}

export async function createQuestion() {
  return await request.post<{ id: string }>('/api/question');
}

export async function getQuestionList(params?: Partial<QuestionnaireRequestParams>) {
  return await request.get<{ list: QuestionnaireDataType[]; total: number }>('/api/question/list', {
    params,
  });
}

export async function updateQuestion(id: string, data: Partial<QuestionnaireRequestParams>) {
  return await request.put<any>(`/api/question/update/${id}`, data);
}

export async function duplicateQuestion(id: string) {
  return await request.post<{ id: string }>(`/api/question/duplicate/${id}`);
}

export async function deleteQuestions(ids: string[]) {
  return await request.delete<any>('/api/question/delete', { data: ids });
}
