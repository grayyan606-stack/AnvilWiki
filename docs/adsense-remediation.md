# AdSense 整改与站长复检记录

核验日期：2026-09-06。对象：`https://steal-an-egg-3ny.wiki`。依据：用户提供的预检报告、整改开始时的本地源码，以及文中链接的 Google 官方文档。

这份记录把**整改前已确认的事实、实施验收目标、仍需站长确认的事项**分开。复检框中已勾选的是本地源码与构建已经验证的项目；线上部署、账号和运营行为仍留给站长核验。代码完成不等于已经部署，也不等于 AdSense 后台已批准。`ADS-*` 是第三方工具的检查编号，不是 Google 官方条款编号。

## 先纠正报告里的判断边界

- **不能据此断定“存在 3 个 Blocker 就必拒”。** 本地 About 和页脚在整改前已经说明独立粉丝站、与 Roblox Corporation 及游戏开发者无从属关系。工具抽样遗漏、缓存或线上版本不同都有可能。Google 禁止虚假身份或从属关系；并未规定必须在某一位置放某一句固定免责声明。仍应加强首页可见声明并核对线上输出。[官方：Misleading representation](https://support.google.com/publisherpolicies/answer/11185754)
- **ads.txt 并非所有申请的强制前置条件。** Google 官方将它列为强烈建议；发布时要用本人账号的真实发布商 ID。对已使用 ads.txt 的域名，投放 Google 广告的发布商必须在清单中获得授权。因此“尚无广告、没有 Google 行”与“正在请求未授权广告”不能直接画等号。[官方：Ads.txt guide](https://support.google.com/adsense/answer/12171612?hl=en)、[Authorized inventory](https://support.google.com/publisherpolicies/answer/11128498)
- **800–1500 词是本次内容编辑目标；500 词、130–150 页、60–70% 通过率不是已核实的官方门槛。** 核验的官方资格及内容说明要求有价值的原创内容、完整站点和可用导航，没有给出这些固定数字或通过率。工具的 80 个 URL 也不等于 80 篇独立文章；整改前 `src/content/wiki/en/` 实际有 27 个 MDX 文件。[官方：Eligibility requirements](https://support.google.com/adsense/answer/9724?hl=en)、[Site isn't ready to show ads](https://support.google.com/adsense/answer/12176698?hl=en)
- **“推广低于 30%”不是该 AdSense 条款的原文。** 官方要求广告及付费推广不得多于发布商内容，且页头、页脚、留白和站内导航链接不能冒充主体内容。不能只计算字数或整页面积，也不能认为小于 30% 就自动安全。[官方：More ads or paid promotional material than publisher-content](https://support.google.com/publisherpolicies/answer/11169917?hl=en)
- **评论或 UGC 不是申请的必选功能。** 不要为“互动信号”新增无人管理的评论区。只要承载用户内容，就需要管理违规内容；“当前未启用”应按实际状态记录。[官方：AdSense Program policies](https://support.google.com/adsense/answer/48182?hl=en)

## Blocker：先解决真实身份、授权和广告启用条件

### 1. 身份及隐私披露：ADS-PUB-05、ADS-PRIV-01/02

**整改前证据：** `src/config/site.ts` 的 `legalNotice`、`src/locales/en.json` 的 `footer.copyrightText`、`src/components/layout/LegalContent.astro` 的 About 已有非官方声明。真正要核查的是线上是否显示，以及其他输出是否与它矛盾。`site.sameAs` 当时将 Roblox 游戏页声明为 wiki Organization 的同一身份；这是可避免的身份混淆。

**实施及验收目标：**

| 页面 / 文件 | 具体措施 | 验收方式 |
| --- | --- | --- |
| 首页；`src/locales/en.json` | Hero 文案直接说明独立、非官方、服务于该 Roblox 游戏的攻略和工具站 | 首屏能看懂站点用途，不依赖查看元标签 |
| 页脚；`src/components/footer/SiteFooter.astro`、`src/locales/en.json` | 展示粉丝站与非从属声明；保持 About、Contact、Privacy Policy、Terms、Copyright 可点击 | 首页及文章页页脚肉眼可见；链接都能访问 |
| `/about`；`LegalContent.astro` 及文案数据 | 说明维护者角色、内容范围、证据和更正机制、非官方身份；不编造公司名称、资质或团队成员 | 正文与首页、作者、结构化数据一致 |
| `src/config/site.ts` | 从 wiki 的 `sameAs` 移除游戏官方链接；正常游戏外链留在 `social.official` | HTML 的 Organization JSON-LD 不把 wiki 声明为游戏官方实体 |
| `/privacy-policy`；`LegalContent.astro` 及文案数据 | 覆盖实际启用的主机/分析服务、本地偏好存储、广告启用后的 Cookie/标识符/IP 处理、第三方链接、同意和撤回、用户请求途径、儿童数据、更新时间 | 每条“正在使用”或“尚未启用”都能和部署配置及网络请求对应 |
| `/contact` | 清楚区分网站更正渠道和游戏官方客服；公开 GitHub issue 不索取账号密码、邮箱、儿童资料或完整个人证件 | 实际联系方式可用；私人请求渠道由站长提供真实值后再配置 |

隐私政策需要描述实际处理，不能以“静态网站”为由承诺完全不处理个人信息，也不能笼统称分析数据全部匿名。第三方服务即使不使用 Cookie，也可能接收 IP、浏览器和页面请求信息。Google 要求披露广告所涉及的数据技术及第三方使用，并给出 Google 数据使用说明。[官方：Privacy disclosures](https://support.google.com/publisherpolicies/answer/10437794)

### 2. ads.txt：ADS-PUB-09、ADS-TXT-01

**整改前证据：** `wrangler.toml` 的 `PUBLIC_ADSENSE_CLIENT` 及三个广告位均为空；`src/pages/ads.txt.ts` 已在无客户端时返回 404，在客户端格式错误时抛错。本次基线构建成功且 `dist/ads.txt` 不存在，说明现有空值分支在本地有效，不需要为报告重写路由。线上仍需同步部署并检查，报告看到的是 200 的零行文件。

**无真实 ID 时的项目策略：** 保持广告关闭，不发布 Google 授权行，不用文档示例 ID、全零 ID、别人的 ID 或 `pub-你的ID`。构建后确认没有残留的空 `dist/ads.txt` 被当成 200 文件部署；必要时在构建生成阶段跳过该文件。部署后 `/ads.txt` 应为真实 404，不是返回 200 的 HTML 首页或空文本。此项应记为“暂无授权清单，广告未启用”，不能声称“Google 授权已完成”。

**拿到真实 ID 后：** 从 AdSense 后台复制完整信息，在 `wrangler.toml` 的 `[vars]` 填入本人 `PUBLIC_ADSENSE_CLIENT`，重新构建部署。根目录输出应与后台提供的 Google 授权行逐字对应，发布商部分使用 `pub-` 前缀。ID 通过格式校验只证明格式正确，不能证明账号归属。ID 可以在审核通过前用于所有权验证，无需为了等待审核而刻意不配置它。[官方：Ads.txt guide](https://support.google.com/adsense/answer/12171612?hl=en)

所有权验证可按后台提供的代码、ads.txt 或 meta 方式部署；优先把不发送广告请求的验证与广告投放开关分离。`<meta name="google-adsense-account">` 的账号值与 Search Console 的 `google-site-verification` token 不是同一回事。确认后台验证成功后提交审核；只有站点状态达到 `Ready` 才开启投放。[官方：AdSense site management](https://support.google.com/adsense/answer/12131223?hl=en)、[Add a new site](https://support.google.com/adsense/answer/12169212?hl=en)

### 3. 广告开启前的同意管理和页面范围

**整改前证据：** `BaseLayout.astro` 把 GA 和 AdSense 放进同一个加载函数；普通 `CookieConsent.astro` 接受按钮会同时启动它们。该横幅仅存 `accepted/declined`，不是已核验的 Google 认证 TCF CMP。`LocaleLayout.astro` 又在全站壳层渲染 `StickyBanner`，仅靠广告环境变量控制。若以后直接填完 ID 和 slot，信任页也可能带广告。

**实施及验收目标：**

1. 在 `BaseLayout.astro`、`CookieConsent.astro` 和广告配置中拆开所有权验证、可选分析同意、广告投放。本次设计使用 `PUBLIC_ADSENSE_ENABLED=false` 默认关闭投放，`PUBLIC_ADSENSE_CLIENT` 单独提供验证 meta 和 ads.txt；展示还需要 `PUBLIC_ADSENSE_CMP_READY=true`、内容页显式 `adsEnabled` 及合规同意实现。`CMP_READY` 只是站长完成部署和测试后的人工确认，不会把本项目横幅变成认证 CMP。未完成 CMP 与页面审核前保持广告加载器和广告单元关闭。
2. 在 `LocaleLayout.astro`、`LegalPage.astro`、文章布局及 `src/components/ads/` 统一落实广告页面许可。信任页、404、搜索/标签/空分类等纯导航或空结果页不请求广告；文章页也需人工审核内容价值。仅把广告容器隐藏、仅不填写某个 slot，或者仅对页面加 `noindex`，都不能代替关闭广告请求。
3. 对 EEA、英国、瑞士流量，在计划提供个性化广告时部署 Google 认证且集成 TCF 的 CMP，核查拒绝、管理选项、重新打开和撤回。普通横幅点击 Accept 不产生这种认证；认证 CMP 本身也不是法律合规保证。[官方：CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en)
4. 非个性化广告仍可能使用 Cookie，不应把 NPA 当作免同意开关；limited ads 也应按实际实现核查存储。隐私页可近旁链接 Google 的数据使用页面，并记录用户看到的文案版本、选择和时间；撤回应便于找到。[官方：EU user consent policy help](https://www.google.com/about/company/user-consent-policy-help/)

## High：内容、导航与可解释的外链

### 4. 扩写薄页，并增加真正成型的内容页

按用户指定的 **800–1500 个英文词**规划薄内容文章，统计正文时排除导航、页脚、标签、代码和重复模板。法律及联系方式页面以完整准确为准，不为凑词制造冗余。已有更长且有用的文章无需删减到 1500 词。

本轮先检查 `src/content/wiki/en/eggs/rare-egg-timing.mdx`、`wiki/source-policy.mdx` 等报告抽样薄页，再按本地正文清单确定其他缺口。每篇扩写都应补充该问题特有的决策依据、分步操作、实际输入示例、误区、证据限制和下一步，而不是每篇粘贴同一套“资料可能变化”的说明。

新增页从已有证据充分的主题开始：工具结果的交叉验证、一次有记录的路线比较、代码排查或新手决策。新增页要有独立搜索意图、完整正文、相关内链、封面、来源日期和明确结论，创建后从栏目或关联文章链接进入。

**本次实施结果：** 27 篇原有英文 MDX 已逐页复核，对薄页完成扩写；按排除 frontmatter、组件标签和模板导航的本地正文统计，全部为 800–1245 词。另新增 `guides/route-profitability-field-test.mdx`（856 词）及 1200×675 封面。新增页明确是可复现实测协议，没有冒充已完成的实测或写入虚构概率。

| 内容类型 | 成型页面应回答 | 发布前必须补足的证据 |
| --- | --- | --- |
| 逐宠物页面 | 当前作用、与可比选项的差异、适用阶段、观察到的限制 | 可追溯的宠物身份、显示数值、版本或观察日期；没有资料不批量造 30 页 |
| 路线攻略 | 什么时候选这条路线、怎样操作、失败后怎样调整 | 实际可核验的操作；虚构算例明确标为说明示例，不能称为实测 |
| 工具教程 | 每个输入是什么、公式来自哪里、结果单位、什么时候不适用 | 与 `src/components/` 或工具实现一致的公式；不凭空增加游戏机制 |
| 更新解读 | 官方变化是什么、旧结论是否失效、对玩家有哪些可证实影响 | 真实公告或带日期的一手资料；没有更新就不制造版本新闻 |
| 视频辅助攻略 | 作者自己的文字解释、关键步骤和对照价值 | 有权使用的媒体与来源；单纯嵌入他人视频不算原创成型页 |

不足证据的候选先留 `draft: true`，不进入线上导航或 sitemap；已有空壳页要补齐、合并或移除入口，不能只靠 `noindex` 留着骗点击。每个公开页面解决的问题不同，比追求 130 页更有价值。[官方：Google-served ads on screens without publisher-content](https://support.google.com/publisherpolicies/answer/11112688)、[Site isn't ready to show ads](https://support.google.com/adsense/answer/12176698?hl=en)

### 5. 内链与外链：ADS-UX-03、ADS-CONTENT-05

- `pnpm build` 后执行 `pnpm check-links`；对新页、分类卡、首页 Open 按钮逐一核查目标和上下文。HTTP 200 只证明页面存在，不能证明不是空壳或软 404。
- 部署后再跑 sitemap URL 状态检查，并抽查跳转后的内容。开发分支或本地构建成功不能证明正式域名已经更新。
- 整改前 `src/config/site.ts` 的 `social.official` 为正常 Roblox 游戏 URL，未带 referral 参数；`src/config/affiliates.ts` 为空，赞助环境变量为空。保持按钮明确写明去 Roblox 玩游戏，核对最终跳转目标。
- 若以后改成付费推广或联盟链接，在相邻位置说明商业关系，并使用现有 `AffiliateLink` 的 `rel="sponsored"` 约束。普通官方外链不必虚构 Sponsored 身份。[官方：More ads or paid promotional material than publisher-content](https://support.google.com/publisherpolicies/answer/11169917?hl=en)

## Medium：运营说明与真实版面

### 6. 投稿和评论：ADS-CONTENT-07

整改前 Giscus 四个必需变量均为空；公开 GitHub issue 是站外更正渠道。About / Contact 应说明：投稿不会自动显示到 wiki，公开内容经过维护者核对才会更新；不要声称有尚未执行的审核时限。以后若启用 Giscus，应先配置垃圾内容处理、删除/锁帖权限、审核负责人和举报方式。GitHub issue 的外部可见性与本网站的发布审核是两件事。

### 7. 品牌词与广告布局：ADS-CONTENT-08、ADS-UX-06

品牌名称自然出现不等于关键词堆砌。只删无信息增量的重复句，不盲目替换所有专有名词。对相似主题页人工比较，合并实质重复内容。

上线广告前，在手机和桌面分别检查顶部、正文中部、文末和侧栏。保留清晰中性广告标识，让广告与菜单、代码复制、计算器按钮有足够间距；不能遮挡正文、伪装下载入口或诱导误点。初次投放可优先使用正文后的单元，再按真实屏幕效果决定是否加其他位置。信任页不投放是本项目策略；官方依据是屏幕内容价值和可用性，并非“法律页少于 500 词必违规”。[官方：AdSense Program policies](https://support.google.com/adsense/answer/48182?hl=en)、[Screens without publisher-content](https://support.google.com/publisherpolicies/answer/11112688)

## 全部 18 项 Unknown：逐条确认方法

报告前半部分只列出 15 条；此表补齐完整检查表中的 **ADS-CONTENT-07、ADS-UX-03、ADS-PRIV-04**。站长证据建议保存在私人运营记录中；不要把身份证明、账户截图里的个人信息或访问日志原样提交到公开仓库。

| 编号 | 如何确认 | 通过证据 / 当前边界 |
| --- | --- | --- |
| ADS-ELIG-01 | 核对 AdSense 申请人和收款账户的实际主体及年龄；未满 18 岁时按官方要求由成年父母或监护人申请管理 | 站长自行确认年龄及主体一致；源码无法核实，不上传证件。[官方资格](https://support.google.com/adsense/answer/9724?hl=en) |
| ADS-ELIG-02 | 检查本人使用过的 Google 登录及 AdSense 关联，查看是否已有同一收款人账号；新站加到现有账号，发现重复按后台流程处理 | 账号清单及后台结果；不能凭域名数判定多账号，也不能断言每次重复都会立即封号。[官方账户要求](https://support.google.com/adsense/answer/9729?hl=en) |
| ADS-OWN-01 | 修改本地模板或验证配置，构建并部署一次，然后查看首页原始 HTML 的 head | 本仓库可编辑只能证明源码能力；还需部署成功且正式页面包含后台要求的验证内容 |
| ADS-OWN-02 | 登录域名注册商、DNS 及 Cloudflare Pages，确认你或获授权主体能管理域名、内容及部署；核对最终 canonical 域名 | 后台访问权限、域名绑定及验证成功；公开 WHOIS 隐藏资料不等于没有所有权 |
| ADS-SITE-01 | 在 AdSense 的 Sites 找到本域名，记录审核状态；需要操作时验证并 Request review | 必须是正式站点状态 Ready；“已添加”“已验证”“ads.txt Authorized”各自都不等于审核通过。[官方状态说明](https://support.google.com/adsense/answer/12170222?hl=en) |
| ADS-SITE-02 | 按该站后台实际提供的代码、ads.txt 或 meta 方式完成至少一种验证；核查公开 HTML/文本并点击 Verify | 后台验证成功，加上匹配的线上产物；不靠需要用户点击的分析横幅承载唯一验证代码。[官方添加网站](https://support.google.com/adsense/answer/12169212?hl=en) |
| ADS-CONTENT-07 | 列出评论、表单、GitHub issue、自动导入等所有入口；确认哪些会直接出现在带广告的页面；核对管理权限和举报处置 | 当前 Giscus 配置关闭只是本地证据；部署后确认无评论脚本。外部投稿需编辑审核后发布，不能把“有社区”当作已建立审核机制 |
| ADS-UX-03 | 构建后运行 check-links；线上抽查每种导航、Open、代码复制、工具和游戏外链；检查手机菜单、软 404、空页面及跳转目的 | 通过的内部链接报告及人工抽样记录；noindex 不能修复坏链接或假按钮 |
| ADS-PROG-01 | 核对团队是否有自点、自动刷新、奖励点击或购买点击行为；测试使用本地预览和非真实广告占位 | 维护人员操作约定、异常流量处置记录；历史行为无法由源码证明，严禁用点击真实广告来“验收” |
| ADS-PROG-04 | 检查分析/Cloudflare 中引荐、来源、地域与突增情况；审核投放合同和获客方式，排除 PTC、互点、垃圾邮件和机器人 | 来源记录、异常调查结果；搜索自然流量也需看异常，普通付费推广本身不等于非法流量 |
| ADS-PROG-06 | 列出允许广告的路由类型；同时检查手动单元、全局加载器和 AdSense Auto ads 设置；在已完成正文的页面检查上下文 | 信任页、404、空结果等无广告请求；正文页面人工审核，不能仅以超过 500 词放行。[官方库存价值](https://support.google.com/publisherpolicies/answer/11112688) |
| ADS-PRIV-03 | 在已授权的测试环境检查 URL、page title、dataLayer、分析事件及广告请求，搜索 email/phone/name 等个人字段；检查查询参数是否被自动带入 | 不向 Google 发送可识别个人的信息；必要时在采集前去除或改设计，单纯在隐私政策里声明不够。当前未启用广告时只能作源码初检。[官方 Identifying users](https://support.google.com/publisherpolicies/answer/10436913) |
| ADS-PRIV-04 | 判断是否向 EEA、英国、瑞士访客提供 Google 广告；到 Privacy & messaging 设置适用的认证 CMP，测试首次、接受、拒绝、撤回和再次访问 | CMP 已发布至正确域名、同意信号及请求行为匹配；普通横幅不等于认证 CMP；NPA 不自动免同意。[官方 CMP 要求](https://support.google.com/adsense/answer/13554116?hl=en) |
| ADS-PRIV-05 | 搜索 geolocation、GPS、Wi-Fi/基站位置获取及第三方 SDK；用全新浏览器检查权限提示和网络数据 | 当前源码未见主动精确定位 API，仅是初步证据；无此功能可记 N/A。若启用，先说明用途和共享方、取得明确同意，并加密传输及披露。[官方设备和位置政策](https://support.google.com/publisherpolicies/answer/10437073) |
| ADS-PRIV-07 | 审计自定义广告代理、Service Worker、扩展/注入、响应头重写和 Cookie 操作；不只检查页面 JS | 无设置、删除、拦截或篡改 Google 域 Cookie 的实现；Cloudflare 后台规则还需站长核验。[官方 Google 域 Cookie 政策](https://support.google.com/publisherpolicies/answer/10437485) |
| ADS-PRIV-08 | 检查 Google Ads、GA 受众、再营销、Customer Match、第三方数据服务；确认不根据健康、信仰、政治、性取向等敏感数据建立或选择广告受众 | 无此受众功能可记录当前 N/A；后来接入就重查，不能仅凭网站主题是游戏判定。[官方个性化广告政策](https://support.google.com/publisherpolicies/answer/15101728) |
| ADS-PRIV-09 | 如使用 Google 平台做美加住房、就业、信贷等受限制领域定向，检查年龄、性别、婚姻/育儿状态和邮编等设置；本站若无相关操作记录 N/A | 本地未发现相关配置，但账号后台不可见；不能把“仅广告主适用”当作发布商永远免责的理由。[官方个性化广告政策](https://support.google.com/publisherpolicies/answer/15101728) |
| ADS-PRIV-10 | 如启用个性化广告，核对每份受众数据的合法来源、使用权限和披露；检查相关方与退出方式是否在 CMP/隐私页中准确说明 | 受众权限记录及对应披露、同意状态；未启用时记“上线前待确认”，不要虚构已经获得的同意。[官方个性化广告政策](https://support.google.com/publisherpolicies/answer/15101728) |

行为类 ADS-PROG-01/04 应持续遵守，并非一次截图就永久通过。[官方：AdSense Program policies](https://support.google.com/adsense/answer/48182?hl=en)

### 报告标为 Pass、广告启用时仍须重查的儿童事项

**ADS-PRIV-06 不能永久沿用本次 Pass。** Roblox 玩家可能包含儿童和青少年；站长需要根据内容设计、营销方式及已知用户情况判断适用的年龄处理，而不是仅写一句“not directed at children under 13”。对 COPPA 覆盖的站点/部分或已知未满 13 岁用户，按 Google 要求通知、标记并禁用相应兴趣广告和再营销。[官方：Tag a site or ad request for age-restricted treatment](https://support.google.com/adsense/answer/3248194?hl=en)

2026-09-06 查询到的 Google 文档已把 TFCD / TFUA 标为弃用，改用 **TFAT** 处理儿童和青少年广告请求。具体参数按启用时对应产品的最新官方说明实施；不要直接复制旧文章或把 GPT 示例当作本站 AdSense 标签。没有受众判定和实际请求验证时保持广告关闭。[官方：Tag an ad request for age restricted treatment](https://support.google.com/adsense/answer/9007197?hl=en)

## 整改后复检清单

### 本地内容与代码

- [x] 本次变更中的游戏名、联系方式、法律及 UI 文案位于配置/内容层，没有新增硬编码游戏信息到通用框架。
- [x] 首页、About、页脚声明一致；Organization.sameAs 不错误指向游戏官方实体。
- [x] 隐私页准确说明当前启用服务，并区分未来广告功能；没有虚构邮箱、公司身份、实测、授权或“一定合规”的承诺。
- [x] Contact 使用现有公开 GitHub issue 渠道；公开性和个人信息提醒清楚，未虚构私人联系方式。
- [x] 27 篇原有英文正文均达到本次 800–1500 词目标；新增 856 词路线实测协议页，并生成封面和站内入口。
- [x] 新文章 frontmatter、H2 起始和封面通过 `pnpm check-content`、`pnpm check-config`、`pnpm check-i18n --strict-ui`。
- [x] `pnpm typecheck`、`pnpm lint`、`pnpm test`、`pnpm build` 全部通过（2026-09-06）。
- [x] `pnpm check-links` 检查 86 个构建页面、3963 个内部链接，全部可解析；sitemap 成功生成。
- [x] 空广告配置构建 HTML 无 AdSense 标记，且不产生 `dist/ads.txt`。
- [x] 信任页、404、空结果等默认无广告；当前所有文章也保持 `adsEnabled: false`，没有页面投放广告。

### 部署与公开访问

- [ ] Cloudflare Pages 部署对应本次变更，`SITE_URL` 是正式 HTTPS 域名；构建时变量与 `wrangler.toml` 一致。
- [ ] 首页、About、Contact、Privacy Policy、新增文章线上内容与本地一致；真实访客无需登录。
- [ ] `/ads.txt` 无 ID 时是真实 404，有真实 ID 时是 200 的纯文本授权行；没有 HTML 回退、旧缓存或跳转错误。
- [ ] robots 不阻拦必要 Google/AdSense 爬虫，sitemap 可访问；线上检查重要 URL 状态和最终正文。
- [ ] 手机和桌面查看首屏身份、菜单、搜索、按钮、主题切换和工具；广告测试不点击真实广告。
- [ ] 重新运行第三方预检。对仍被标红的空 ads.txt/字数阈值项，依据真实状态与官方条文复核，不为分数伪造授权或内容。

### 账号和广告开启前

- [ ] 上表 18 个 Unknown 均记录为通过 / 待确认 / N/A，并附理由及日期；账号和历史行为项由站长确认。
- [ ] AdSense 站点验证成功，Sites 显示 Ready；真实发布商 ID 及 ads.txt 已核对，Policy center 没有待处理问题。[官方状态说明](https://support.google.com/adsense/answer/12170222?hl=en)
- [ ] EEA、英国、瑞士的同意管理已实际部署并测试；能拒绝和撤回，网络及存储行为与选择一致。
- [ ] 儿童/青少年受众处理已确认；必要标签按当前产品文档配置，个性化广告和再营销设置符合实际受众。
- [ ] 广告页面范围、Auto ads 排除、移动布局、推广披露和流量来源已复核后，才启用真实广告。

完成记录：本地检查 2026-09-06 全绿；部署版本 bb2627b（2026-09-07，含 ads.txt 缓存修复与重新部署）；第三方预检（seo.web.cafe/adsense，2026-09-07）：Blocker 0 / High 0 / Medium 1（ADS-TXT-02 ads.txt 按设计待发布商 ID 后上线，其余为站长自查与启用前项）；站长账号核验 ______；AdSense 审核状态 ______。

