---
title: "第 7 章 · 准备并启用 AdSense"
description: "验证所有权、发布有用的原创内容、通过 AdSense 审核、部署同意管理,再只对审核过的正文文章启用广告。"
manual: learn
order: 7
icon: lucide:dollar-sign
tldr: "先完成有用内容、信任页和所有权验证,再申请 AdSense 审核。站点达到 Ready 后,部署适用的 Google 认证 CMP,逐页批准可投放文章,填写需要的广告位编号,最后打开广告投放和 CMP 就绪两个开关。"
updated: 2026-09-06
---

## 你现在在哪,这章解决什么

站上线了,Google 在收录了。但访客来了你没东西卖——这一章把**广告位**开起来,访客看到广告,Google 就给你分钱。

## 这章做完你会得到

- 广告位上线,开始积累收入
- 评论功能和访问统计的开关位置(可选,想开随时开)

## 先认识几个词

- **AdSense**:Google 的广告中介。它把广告放进你的页面,广告被看到/被点击,Google 按月把钱打给你。
- **RPM**:每一千次浏览挣多少钱。排行榜页和兑换码页通常 RPM 最高。
- **Lighthouse 4×100**:Google 给网站做的体检,速度/无障碍/规范/SEO 四项各 100 分。这套模板开箱就是满分——广告位是懒加载的,开了也不掉分。

## 第一步:申请 AdSense(先自查,别急着交)

**申请前对照清单**(缺一项都容易被拒):

- ☐ 自有域名(第 5 章买的;pages.dev 免费域名基本过不了审)
- ☐ 足以完成网站用途的原创、有用内容;Google 没有公布固定最低文章数或字数
- ☐ 隐私政策页和服务条款页(**模板已经自动内置**了 `/privacy-policy` 和 `/terms-of-service`,不用你做)
- ☐ 网站打开无死链(`pnpm check-links` 通过)

**怎么做**:打开 [adsense.google.com](https://adsense.google.com) → 添加网站 → 按后台提供的方式完成至少一种所有权验证 → 请求审核。
**被拒了怎么办**:以 AdSense 给出的具体原因和 Policy center 为准。修复受影响页面或站点行为,核对线上部署后再请求审核。

## 第二步:只验证账号,暂不投放

把本人真实发布商 ID 填入 `PUBLIC_ADSENSE_CLIENT`。构建会用它生成静态 `google-adsense-account` meta 和根目录 `ads.txt`;只要广告开关仍为 false,就不会因此请求广告。不要使用示例 ID 或他人的 ID。

仓库存在 `wrangler.toml`,所以 Cloudflare Pages 构建变量以其 `[vars]` 为准;此时 Dashboard 里的变量 UI 不生效。

## 第三步:准备同意管理和可投放页面

投放前,为适用的欧洲经济区、英国和瑞士流量部署并测试 Google 认证 TCF CMP。模板自带的本地 Cookie 横幅不是认证 CMP。接受、拒绝、管理和撤回流程均确认后,才能设置 `PUBLIC_ADSENSE_CMP_READY=true`。

逐篇审核允许投放的正文文章,只在合格文章 frontmatter 中设置 `adsEnabled: true`。法律页、导航页、空结果页、草稿和 noindex 页面保持无广告。

## 第四步:启用需要的广告位

站点状态达到 Ready 后,只创建准备使用的广告单元并修改 `wrangler.toml`:

1. AdSense 后台 → **广告** → 按广告位,拿到你的发布商 ID(样子像 `ca-pub-一串数字`)和各广告位编号。

| 变量名(照抄,区分大小写) | 填什么 |
|---|---|
| `PUBLIC_ADSENSE_CLIENT` | 你的发布商 ID(ca-pub- 开头) |
| `PUBLIC_ADSENSE_ENABLED` | 仅在站点 Ready 后设为 `true` |
| `PUBLIC_ADSENSE_CMP_READY` | 仅在适用的认证 CMP 部署并完成测试后设为 `true` |
| `PUBLIC_ADSENSE_SLOT_STICKY` | 底部横幅广告位编号 |
| `PUBLIC_ADSENSE_SLOT_SIDEBAR` | 侧边栏广告位编号 |
| `PUBLIC_ADSENSE_SLOT_INCONTENT` | 文章中间广告位编号 |

未使用的 slot 保持空字符串,然后保存、重新构建并部署。

**你会看到**:网站底部/侧栏/文章中间出现广告(新广告位可能要几小时到几天才有内容填充,先空白是正常的)。
**确认做对了**:用全新浏览器分别检查一篇已批准文章和一个排除页面。已批准文章只应在配置的同意路径后请求广告;排除页不应加载 AdSense 脚本或渲染广告单元。测试时不要点击真实广告。

## 可选:评论和统计(同样的开关玩法)

- **评论**(Giscus,靠 GitHub 仓库的讨论区承载):变量是 `PUBLIC_GISCUS_REPO` 等 4 个,想开的时候看开发手册「功能开关」章,有完整步骤。
- **访问统计**:Google Analytics 4(变量 `PUBLIC_GA_ID`)或 Cloudflare 自带统计(变量 `PUBLIC_CF_BEACON_TOKEN`),二选一或都开。

## 对收入的合理预期

- 黄金窗口是游戏爆发后的 **2 到 8 周**。窗口内 Google 逐步给你排名,**头 1 到 2 周收入为零是正常的**,不是失败了。
- 收入公式 ≈ 页面数 × 排名 × 每千次浏览收入。前 30 天拼页面数量,之后拼排名(保鲜 + 内链)。

## 卡住了怎么办

- **「广告位一直空白」**:确认站点是 Ready、两个广告开关为 true、文章设有 `adsEnabled: true`、对应 slot 已填写且同意流程正常。新广告位也可能需要时间填充。
- **「AdSense 被拒」**:按后台指出的审核或政策原因修复。增加页面不能解决所有权、导航、隐私、无效流量或复制内容问题。

## ✅ 验收(全部成立才算完成)

- 广告在线上真实展示(若已通过 AdSense)
- ☐ 本人发布商 ID 验证成功,`ads.txt` 与之匹配
- ☐ 站点审核与 CMP 测试完成后才打开两个投放开关
- ☐ 只有审核过的文章选择投放,排除路由不发出广告请求
- ☐ 心里有预期:头两周收入为零是正常的

## 下一步

广告开了,但游戏攻略最怕过期——过期内容会掉排名、掉访客。最后一章:每周 30 分钟的保鲜节奏,让站一直赚钱。[去第 8 章 · 每周保鲜与增长](/zh/landing/docs/weekly-ops)
