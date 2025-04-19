import { HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME } from '@/constants';
import { QuestionComponentItemDataType, QuestionComponentStateType } from '@/types/question';

export const IsLoginOrRegister = (pathname: string) => {
  return pathname === LOGIN_PATHNAME || pathname === REGISTER_PATHNAME;
};

export const WithoutUserInfo = (pathname: string) => {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
};

/**
 *
 * @param selectedId
 * @param componentList 组件列表
 * @returns
 */
export const getNextSelectedId = (
  selectedId: string,
  componentList: QuestionComponentItemDataType[]
) => {
  const visibleComponentList = componentList.filter((item) => !item.isHidden);
  const index = visibleComponentList.findIndex((item) => item.fe_id === selectedId);
  if (index === -1) return '';
  const length = visibleComponentList.length;
  if (length <= 1) {
    return '';
  } else {
    if (index === length - 1) {
      return visibleComponentList[index - 1].fe_id;
    } else {
      return visibleComponentList[index + 1].fe_id;
    }
  }
};

export const insertNewComponent = (
  draft: QuestionComponentStateType,
  newComponent: QuestionComponentItemDataType
) => {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex((item) => item.fe_id === selectedId);
  if (index < 0) {
    draft.componentList.push(newComponent);
  } else {
    draft.componentList.splice(index + 1, 0, newComponent);
  }
  draft.selectedId = newComponent.fe_id;
};
