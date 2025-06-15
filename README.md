···文档持续更新中···
为什么写这个项目，纯粹是因为外面的呢ai面试收费太贵了😡，学生党用不起，这个项目直接开放给学校的学生，用户可以自选模型，自己写提示词，用多少钱干多少事

···项目技术栈···
trpc，nextjs15，react19，shadecn，Polar/支付宝/微信。nenodb，openai，stream，CodeRabbit，DrizzleORM，TanStaclQuery，
PostgreSQL，authjs，Ingest。
```技术栈作用···
nextjs和React构建我们的全栈框架，支持服务器组件和服务器端渲染，trpc用于全栈类型，安全性与TanStackQuery、DrizzleORM以及Neon提供的PostgreSQL数据库一起使用。使用Tailwind版本4进行样式设计，结合ChatsUI实现可访问且可重用的组件，使用BetterOut进行身份验证，Polar进行支付，Stream用于视频和聊天，Ingest用于后台作业，CodeRabbit用于人工智能，支持代码审查，最后使用OpenAI实现实时代理和人工智能驱动的功能。

```功能···
🤖 AI 驱动的视频通话🧠 自定义实时代理📞 流视频 SDK💬 流聊天 SDK📝 摘要、成绩单、录音📂 会议历史记录和状态🔍 成绩单搜索📺 视频回放💬 AI 会议问答🧠 OpenAI 集成💳 Polar 订阅🔐 Better Auth 登录📱 移动响应🌐 Next.js 15 + React 19🎨 Tailwind v4 + Shadcn/ui⚙️ Inngest 后台作业🧑‍💻 CodeRabbit PR 评论时间戳

```如何启动```
创建env.local文件，（注意不要创建.env）nextjs似乎无法识别env，只能识别.env.local至少我试了很多方法他都无法识别

(如果你都不想要这些，github和google完全不用管)
github登录，获取clientId和clientSecret，https://github.com/settings/developers
google登录，这里有点bug，可以暂时不考虑

填写数据库地址DATABASE_URL = "",本项目使用的nenodb，https://console.neon.tech/app/projects
