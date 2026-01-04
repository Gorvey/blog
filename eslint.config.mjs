/*
 * @Author: Gorvey 2324850628@qq.com
 * @Date: 2026-01-04 09:36:46
 * @LastEditors: Gorvey 2324850628@qq.com
 * @LastEditTime: 2026-01-04 09:48:00
 * @FilePath: \blog\eslint.config.mjs
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
