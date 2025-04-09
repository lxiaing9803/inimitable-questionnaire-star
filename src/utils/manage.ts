export const renderPublishStatus = (isPublished: boolean) => {
  return isPublished ? '已发布' : '未发布';
};

export const renderPublishTagColor = (isPublished: boolean) => {
  return isPublished ? 'success' : 'default';
};
