/* =============================================================
 * history-his 人物数据文件
 * -------------------------------------------------------------
 * 本文件集中存放所有「人物数据」与「预设关系链」，供 history-his.html 调用。
 * 项目持续更新时，只需在此文件中增删人物，无需改动 HTML/逻辑。
 *
 * 【新增人物字段说明】
 *   id           : 唯一标识（英文/拼音，供关系引用）
 *   name         : 姓名
 *   birthYear    : 出生年（公元前用负数，如 -221）
 *   deathYear    : 卒年
 *   dynasty      : 所属朝代（须与 history-his.html 中 dynasties 的 name 一致）
 *   class        : 职业（帝王/文人/武将/士/僧道/农/工/商，决定颜色）
 *   classColor   : 备用颜色（classColors 未命中时使用）
 *   quote        : 代表名句
 *   quoteSource  : 名句出处
 *   isKeyFigure  : 是否关键人物
 *   relationships: { previous?: {id,type,description}, next?: {id,type,description} }
 *                  type 可选：师徒/同僚/君臣/亲友/家族/对手/敌对/忘年交/知己/其他
 *
 * 【预设链 predefinedHis】：每个数组是一条按顺序排列的人物 id 链。
 * ============================================================= */

const hisData = [
  {
    id: "zhuge", name: "诸葛亮", birthYear: 181, deathYear: 234, dynasty: "三国",
    class: "文人", classColor: "#1685A9",
    quote: "鞠躬尽瘁，死而后已。", quoteSource: "《后出师表》",
    isKeyFigure: true,
    relationships: { next: { id: "sima", type: "对手", description: "诸葛亮六出祁山，与司马懿多次交锋，两人互为一生之敌亦为一生的知己。" } }
  },
  {
    id: "sima", name: "司马懿", birthYear: 179, deathYear: 251, dynasty: "三国",
    class: "帝王", classColor: "#8C4356",
    quote: "夫将兵者，不战则守，不守则走。", quoteSource: "《晋书·宣帝纪》",
    isKeyFigure: true,
    relationships: { previous: { id: "zhuge", type: "对手", description: "与诸葛亮在渭滨对峙，叹其天下奇才。" }, next: { id: "jikang", type: "其他", description: "司马氏掌权后，嵇康因不合作态度被司马昭所杀，思想传承却在魏晋名士中延续。" } }
  },
  {
    id: "jikang", name: "嵇康", birthYear: 223, deathYear: 262, dynasty: "三国",
    class: "文人", classColor: "#1685A9",
    quote: "目送归鸿，手挥五弦。俯仰自得，游心太玄。", quoteSource: "《赠秀才入军》",
    isKeyFigure: true,
    relationships: { previous: { id: "sima", type: "敌对", description: "拒不出仕司马氏，终遭构陷被害。" }, next: { id: "shantao", type: "知己", description: "与山涛为竹林之交，虽绝交于纸，却托孤以子，真情可见。" } }
  },
  {
    id: "shantao", name: "山涛", birthYear: 205, deathYear: 283, dynasty: "三国",
    class: "文人", classColor: "#1685A9",
    quote: "山公启事，朝野无遗才。", quoteSource: "《晋书·山涛传》",
    isKeyFigure: false,
    relationships: { previous: { id: "jikang", type: "知己", description: "与嵇康竹林同游，嵇康临刑前将子女托付于山涛。" }, next: { id: "ruanji", type: "同僚", description: "同为竹林七贤，在朝中共事，互相敬重。" } }
  },
  {
    id: "ruanji", name: "阮籍", birthYear: 210, deathYear: 263, dynasty: "三国",
    class: "文人", classColor: "#1685A9",
    quote: "夜中不能寐，起坐弹鸣琴。薄帷鉴明月，清风吹我襟。", quoteSource: "《咏怀诗》",
    isKeyFigure: false,
    relationships: { previous: { id: "shantao", type: "同僚", description: "竹林七贤之友，与山涛共隐共仕。" }, next: { id: "xizhi", type: "其他", description: "魏晋风骨传至东晋，王羲之承其风流，书法中见名士精神。" } }
  },
  {
    id: "xizhi", name: "王羲之", birthYear: 303, deathYear: 361, dynasty: "东晋",
    class: "文人", classColor: "#1685A9",
    quote: "仰观宇宙之大，俯察品类之盛，所以游目骋怀，足以极视听之娱。", quoteSource: "《兰亭集序》",
    isKeyFigure: true,
    relationships: { previous: { id: "ruanji", type: "其他", description: "承魏晋名士风流，兰亭雅集再现竹林之逸。" }, next: { id: "xiean", type: "同僚", description: "与谢安同为东晋名士，兰亭雅集座上宾，共支撑江左风流。" } }
  },
  {
    id: "xiean", name: "谢安", birthYear: 320, deathYear: 385, dynasty: "东晋",
    class: "文人", classColor: "#1685A9",
    quote: "安石不出，如苍生何？", quoteSource: "《晋书·谢安传》",
    isKeyFigure: false,
    relationships: { previous: { id: "xizhi", type: "同僚", description: "与王羲之相交甚笃，兰亭集会共论天下。" }, next: { id: "taoyuan", type: "其他", description: "谢安身后，陶渊明以另一种方式诠释了东晋士人的精神追求。" } }
  },
  {
    id: "taoyuan", name: "陶渊明", birthYear: 365, deathYear: 427, dynasty: "东晋",
    class: "文人", classColor: "#1685A9",
    quote: "采菊东篱下，悠然见南山。山气日夕佳，飞鸟相与还。", quoteSource: "《饮酒·其五》",
    isKeyFigure: true,
    relationships: { previous: { id: "xiean", type: "其他", description: "东晋最后的名士之光，以归隐完成了士人精神的另一种表达。" }, next: { id: "huiyuan", type: "忘年交", description: "与慧远法师为方外之友，虎溪三笑传为千古佳话。" } }
  },
  {
    id: "huiyuan", name: "慧远", birthYear: 334, deathYear: 416, dynasty: "东晋",
    class: "僧道", classColor: "#F0C239",
    quote: "法音之流，譬彼尘霭。尘霭弥敛，朗照愈明。", quoteSource: "《沙门不敬王者论》",
    isKeyFigure: false,
    relationships: { previous: { id: "taoyuan", type: "忘年交", description: "庐山脚下，与陶渊明谈玄论道，儒释交融。" }, next: { id: "lidaoyuan", type: "其他", description: "慧远之后，南北朝佛教兴盛，郦道元以地理之学记录山川与佛教遗迹。" } }
  },
  {
    id: "lidaoyuan", name: "郦道元", birthYear: 466, deathYear: 527, dynasty: "南北朝",
    class: "文人", classColor: "#1685A9",
    quote: "巴东三峡巫峡长，猿鸣三声泪沾裳。", quoteSource: "《水经注·江水》",
    isKeyFigure: false,
    relationships: { previous: { id: "huiyuan", type: "其他", description: "继南北朝佛教文化之后，以地理志记录华夏山河。" }, next: { id: "wangwei", type: "其他", description: "郦道元的山水之笔，至唐代王维而化为诗中有画、画中有诗的意境。" } }
  },
  {
    id: "wangwei", name: "王维", birthYear: 701, deathYear: 761, dynasty: "唐",
    class: "文人", classColor: "#1685A9",
    quote: "空山不见人，但闻人语响。返景入深林，复照青苔上。", quoteSource: "《鹿柴》",
    isKeyFigure: true,
    relationships: { previous: { id: "lidaoyuan", type: "其他", description: "承南北朝山水传统，开盛唐山水田园诗派。" }, next: { id: "libai", type: "同僚", description: "与李白并称盛唐双璧，一个诗佛一个诗仙，交相辉映。" } }
  },
  {
    id: "libai", name: "李白", birthYear: 701, deathYear: 762, dynasty: "唐",
    class: "文人", classColor: "#1685A9",
    quote: "飞流直下三千尺，疑是银河落九天。", quoteSource: "《望庐山瀑布》",
    isKeyFigure: true,
    relationships: { previous: { id: "wangwei", type: "同僚", description: "与王维同朝为官，诗风迥异却互相欣赏。" }, next: { id: "dufu", type: "知己", description: "与杜甫相见恨晚，虽年龄相差十一岁，却成千古莫逆之交。" } }
  },
  {
    id: "dufu", name: "杜甫", birthYear: 712, deathYear: 770, dynasty: "唐",
    class: "文人", classColor: "#1685A9",
    quote: "安得广厦千万间，大庇天下寒士俱欢颜，风雨不动安如山！", quoteSource: "《茅屋为秋风所破歌》",
    isKeyFigure: true,
    relationships: { previous: { id: "libai", type: "知己", description: "与李白相交甚深，一生作诗怀念李白不下十余首。" }, next: { id: "hanyu", type: "其他", description: "杜甫之后，韩愈承其现实主义精神，倡导古文运动。" } }
  },
  {
    id: "hanyu", name: "韩愈", birthYear: 768, deathYear: 824, dynasty: "唐",
    class: "文人", classColor: "#1685A9",
    quote: "师者，所以传道受业解惑也。", quoteSource: "《师说》",
    isKeyFigure: false,
    relationships: { previous: { id: "dufu", type: "其他", description: "继承杜甫现实主义传统，以古文运动革除骈文之弊。" }, next: { id: "baijuyi", type: "同僚", description: "与白居易同为中唐文坛领袖，诗风各异却志同道合。" } }
  },
  {
    id: "baijuyi", name: "白居易", birthYear: 772, deathYear: 846, dynasty: "唐",
    class: "文人", classColor: "#1685A9",
    quote: "同是天涯沦落人，相逢何必曾相识。", quoteSource: "《琵琶行》",
    isKeyFigure: false,
    relationships: { previous: { id: "hanyu", type: "同僚", description: "与韩愈共倡古文，又开创新乐府运动，诗求通俗而意深远。" }, next: { id: "sushi", type: "其他", description: "白居易之后，宋人继其通俗精神，至苏轼而集大成。" } }
  },
  {
    id: "sushi", name: "苏轼", birthYear: 1037, deathYear: 1101, dynasty: "北宋",
    class: "文人", classColor: "#1685A9",
    quote: "大江东去，浪淘尽，千古风流人物。", quoteSource: "《念奴娇·赤壁怀古》",
    isKeyFigure: true,
    relationships: { previous: { id: "baijuyi", type: "其他", description: "继唐代白居易通俗精神，北宋苏轼集文学、书法、绘画之大成。" }, next: { id: "zhuxi", type: "其他", description: "苏轼之后，南宋朱熹承北宋儒学，开理学之宗。" } }
  },
  {
    id: "zhuxi", name: "朱熹", birthYear: 1130, deathYear: 1200, dynasty: "南宋",
    class: "文人", classColor: "#1685A9",
    quote: "问渠那得清如许？为有源头活水来。", quoteSource: "《观书有感》",
    isKeyFigure: true,
    relationships: { previous: { id: "sushi", type: "其他", description: "承北宋文化之盛，朱熹集理学之大成，影响东亚数百年。" }, next: { id: "wentianxiang", type: "其他", description: "朱熹理学之后，文天祥以气节实践了儒家精神的最高理想。" } }
  },
  {
    id: "wentianxiang", name: "文天祥", birthYear: 1236, deathYear: 1283, dynasty: "南宋",
    class: "武将", classColor: "#065279",
    quote: "人生自古谁无死，留取丹心照汗青。", quoteSource: "《过零丁洋》",
    isKeyFigure: false,
    relationships: { previous: { id: "zhuxi", type: "其他", description: "以朱熹理学为精神根基，以死明志，成千古忠义之范。" }, next: { id: "wangyangming", type: "其他", description: "文天祥之后，明代王阳明承宋儒之学，创心学一派。" } }
  },
  {
    id: "wangyangming", name: "王阳明", birthYear: 1472, deathYear: 1529, dynasty: "明",
    class: "文人", classColor: "#1685A9",
    quote: "知行合一。", quoteSource: "《传习录》",
    isKeyFigure: true,
    relationships: { previous: { id: "wentianxiang", type: "其他", description: "承宋儒理学，文天祥之忠义精神内化于心学之中。" }, next: { id: "lizhi", type: "其他", description: "王阳明心学之后，李贽以异端自居，将思想解放推向极致。" } }
  },
  {
    id: "lizhi", name: "李贽", birthYear: 1527, deathYear: 1602, dynasty: "明",
    class: "文人", classColor: "#1685A9",
    quote: "夫童心者，真心也。若以童心为不可，是以真心为不可也。", quoteSource: "《童心说》",
    isKeyFigure: false,
    relationships: { previous: { id: "wangyangming", type: "其他", description: "承王阳明心学，李贽更进一步，倡童心说，挑战传统礼教。" }, next: { id: "guyanwu", type: "其他", description: "李贽之后，明清之际顾炎武承其批判精神，开朴学之风。" } }
  },
  {
    id: "guyanwu", name: "顾炎武", birthYear: 1613, deathYear: 1682, dynasty: "明",
    class: "文人", classColor: "#1685A9",
    quote: "天下兴亡，匹夫有责。", quoteSource: "《日知录》",
    isKeyFigure: false,
    relationships: { previous: { id: "lizhi", type: "其他", description: "继李贽批判精神，明清之际顾炎武以实学救国。" }, next: { id: "huangzongxi", type: "同僚", description: "与黄宗羲同为明末清初三大思想家，互相砥砺。" } }
  },
  {
    id: "huangzongxi", name: "黄宗羲", birthYear: 1610, deathYear: 1695, dynasty: "明",
    class: "文人", classColor: "#1685A9",
    quote: "天下为主，君为客。", quoteSource: "《明夷待访录》",
    isKeyFigure: false,
    relationships: { previous: { id: "guyanwu", type: "同僚", description: "与顾炎武并称清初大儒，共同反思明亡教训。" }, next: { id: "wangfuzhi", type: "同僚", description: "与王夫之同为明末清初思想巨擘，三家并称。" } }
  },
  {
    id: "wangfuzhi", name: "王夫之", birthYear: 1619, deathYear: 1692, dynasty: "明",
    class: "文人", classColor: "#1685A9",
    quote: "知行相资以为用。", quoteSource: "《礼记章句》",
    isKeyFigure: false,
    relationships: { previous: { id: "huangzongxi", type: "同僚", description: "与黄宗羲、顾炎武并称明末清初三大思想家。" }, next: { id: "caoxueqin", type: "其他", description: "清初思想启蒙之后，曹雪芹以小说承载时代之思。" } }
  },
  {
    id: "caoxueqin", name: "曹雪芹", birthYear: 1715, deathYear: 1763, dynasty: "清",
    class: "文人", classColor: "#1685A9",
    quote: "满纸荒唐言，一把辛酸泪。都云作者痴，谁解其中味。", quoteSource: "《红楼梦》",
    isKeyFigure: false,
    relationships: { previous: { id: "wangfuzhi", type: "其他", description: "承清初思想之遗，曹雪芹以文学之笔写尽人间悲欢。" }, next: { id: "luxun", type: "其他", description: "《红楼梦》之后，鲁迅以现代文学重新审视国民性。" } }
  },
  {
    id: "luxun", name: "鲁迅", birthYear: 1881, deathYear: 1936, dynasty: "民国",
    class: "文人", classColor: "#1685A9",
    quote: "横眉冷对千夫指，俯首甘为孺子牛。", quoteSource: "《自嘲》",
    isKeyFigure: true,
    relationships: { previous: { id: "caoxueqin", type: "其他", description: "曹雪芹以小说写尽封建末世，鲁迅以杂文唤醒沉睡国民。" } }
  }
];

const predefinedHis = [
  ["zhuge","sima","jikang","shantao","ruanji","xizhi","xiean","taoyuan","huiyuan","lidaoyuan","wangwei","libai","dufu","hanyu","baijuyi","sushi","zhuxi","wentianxiang","wangyangming","lizhi","guyanwu","huangzongxi","wangfuzhi","caoxueqin","luxun"],
  ["zhuge","sima","jikang","xizhi","taoyuan","wangwei","libai","dufu","sushi","zhuxi","wangyangming","caoxueqin","luxun"],
  ["libai","dufu","hanyu","baijuyi","sushi"],
  ["xizhi","xiean","taoyuan","wangwei"],
  ["zhuxi","wentianxiang","wangyangming","guyanwu","huangzongxi","wangfuzhi"],
  ["jikang","shantao","ruanji","xizhi"],
  ["wangwei","libai","dufu","sushi","zhuxi"],
  ["caoxueqin","luxun"]
];
