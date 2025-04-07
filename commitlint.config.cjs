module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // bug修复
        'docs', // 文档更新
        'style', // 代码格式/样式
        'refactor', // 代码重构
        'test', // 测试相关
        'chore', // 构建/工具/配置
        'revert', // 回退提交
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'never', []],
    'header-max-length': [2, 'always', 72],
  },
};
