// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default withNuxt(
  // 你的自定义配置
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error'
    }
  }
);
