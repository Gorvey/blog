# 离职交接文档

生成日期：2026-03-24

## 1. 统计范围与口径

- 扫描目录：`E:\ylc`、`E:\hi-teacher`
- 扫描范围：两个目录下的一级 Git 仓库
- 维护项目识别口径：Git 历史中存在作者邮箱 `2324850628@qq.com` 的提交记录
- 排序规则：按“最近一次本人提交时间”倒序排列
- 说明：本清单基于本地仓库扫描结果整理，适合作为离职交接时的“项目盘点 + 风险提醒”底稿

## 2. 我维护的项目清单（按最近 Git Commit 排序）

| 排序 | 平台 | 仓库 | 本地路径 | 当前分支 | 最近一次本人提交时间 | 最近一次本人提交 | 仓库最新提交作者 | 本地状态 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 引励场平台 | `corp-mp-pen` | `E:\ylc\corp-mp-pen` | `dev` | 2026-03-20 19:05 +08:00 | `8b1fe46` Merge branch 'feature_ai_hls_pen_v1.0' into dev | Gorvey | 干净 |
| 2 | 引励场平台 | `iep-web-corp` | `E:\ylc\iep-web-corp` | `dev` | 2026-03-20 18:27 +08:00 | `8c179e3f` Merge branch 'feature_ai_hls_pen_v1.0.0' into dev | Gorvey | 干净 |
| 3 | 引励场平台 | `corp-web` | `E:\ylc\corp-web` | `hotfix_20260319_zengzhe` | 2026-03-19 14:09 +08:00 | `bff95158` feat: update complete接口添加视频大小字段 | Gorvey | 干净 |
| 4 | 好老师平台 | `iep-platform-vue` | `E:\hi-teacher\iep-platform-vue` | `feature_ai_hls_pen_v1.0` | 2026-03-11 15:52 +08:00 | `7b41820f` feat: ts error fix | Gorvey | 有未提交改动 |
| 5 | 好老师平台 | `business-web` | `E:\hi-teacher\business-web` | `feature_iep_v1.4.4` | 2026-01-22 18:54 +08:00 | `5f28d5be2` Merge commit 'ebf74907bd433ec84445777dfdcf65307ff0b7f7' into feature_iep_v1.4.4 | Gorvey | 干净 |
| 6 | 引励场平台 | `tiku-web` | `E:\ylc\tiku-web` | `master` | 2025-12-22 18:35 +08:00 | `a978cb1` Merge branch 'hotfix_production-bug_zengzhe' into dev | 詹友林 | 有未提交改动 |
| 7 | 好老师平台 | `stu-live-pc` | `E:\hi-teacher\stu-live-pc` | `hotfix_20251219_zengzhe` | 2025-12-19 17:01 +08:00 | `34efce4` feat: update saveRecord 时间格式转换 | Gorvey | 有未提交改动 |
| 8 | 好老师平台 | `corp-web` | `E:\hi-teacher\corp-web` | `dev` | 2025-12-18 21:06 +08:00 | `70628bf7` Merge branch 'dev' of ssh://code.seevin.com:8022/ucu-platform/corp-web into dev | Gorvey | 干净 |
| 9 | 好老师平台 | `web-platform` | `E:\hi-teacher\web-platform` | `feature_uni_test_zengzhe` | 2025-12-18 10:50 +08:00 | `85b3b11` feat: update 联测问题修改 | Gorvey | 有未提交改动 |
| 10 | 好老师平台 | `tiku-web` | `E:\hi-teacher\tiku-web` | `dev` | 2025-12-15 18:45 +08:00 | `71b4b84` Merge branch 'feature_v1.4.2' into dev | Gorvey | 干净 |
| 11 | 好老师平台 | `dingtalk` | `E:\hi-teacher\dingtalk` | `feature_esms_v4.0` | 2025-08-14 18:46 +08:00 | `ef4c7253` feat: update docs | Gorvey | 干净 |
| 12 | 好老师平台 | `ylc` | `E:\hi-teacher\ylc` | `dev` | 2025-08-05 19:21 +08:00 | `faacdf7` feat: update 首次提交 | 万潇逸 | 干净 |
| 13 | 好老师平台 | `home-land-pages` | `E:\hi-teacher\home-land-pages` | `master` | 2025-08-05 19:10 +08:00 | `d85ec80` feat: update 引力场改造完成 | Gorvey | 有未提交改动 |
| 14 | 好老师平台 | `mall-web` | `E:\hi-teacher\mall-web` | `dev` | 2025-07-30 17:49 +08:00 | `3740c96` Merge branch 'feature_ai_pad_1.4.0' into dev | Gorvey | 干净 |

## 3. 需要重点交接的本地风险

以下仓库当前存在未提交改动，建议离职前明确这些改动是否需要提交、备份或废弃：

1. `E:\hi-teacher\iep-platform-vue`
   - 未跟踪文件：`.move.js`
2. `E:\ylc\tiku-web`
   - 已修改：`.nvmdrc`
   - 未跟踪文件：`pnpm-lock.yaml`
3. `E:\hi-teacher\stu-live-pc`
   - 已修改：`src/autoImport.d.ts`
   - 已修改：`src/components.d.ts`
4. `E:\hi-teacher\web-platform`
   - 已修改：`src/autoImport.d.ts`
   - 已修改：`src/components.d.ts`
   - 已修改：`src/views/platform-resource/audio-video/pages/manage.vue`
5. `E:\hi-teacher\home-land-pages`
   - 未跟踪目录：`ylc-2/`

## 4. 远端配置需确认的仓库

以下仓库本地未读取到 `origin` 远端，交接时建议确认代码托管位置或仓库是否仅为本地副本：

1. `E:\hi-teacher\iep-platform-vue`
2. `E:\hi-teacher\ylc`

## 5. 未纳入“我维护的项目”清单的仓库

以下仓库已扫描到 Git 仓库，但未发现作者邮箱 `2324850628@qq.com` 的提交记录，因此未纳入本次“我维护的项目”列表：

1. `E:\ylc\iep-web-platform`
2. `E:\hi-teacher\rsbuild-vue3-ai`
3. `E:\hi-teacher\tiku-admin-web`

## 6. 交接建议

1. 优先交接最近仍在变更的仓库：`corp-mp-pen`、`iep-web-corp`、`corp-web`、`iep-platform-vue`
2. 对存在未提交改动的仓库，逐一确认改动用途，避免遗漏本地代码或误交接临时文件
3. 对当前分支不是 `dev` / `master` 的仓库，交接时同步说明分支用途、是否已合并、是否仍在联调
4. 对仓库最新提交作者不是本人的项目，如 `E:\ylc\tiku-web`、`E:\hi-teacher\ylc`，交接时建议同时说明当前接力同事

