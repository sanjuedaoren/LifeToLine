import { PersonNode, PresetChain } from '../types';

export const chainData: PersonNode[] = [
  {
    id: 'zhuge-liang',
    name: '诸葛亮',
    courtesyName: '孔明',
    artName: '卧龙',
    birthYear: 181,
    deathYear: 234,
    dynasty: '三国',
    dynastyStart: 220,
    dynastyEnd: 280,
    class: '士',
    classColor: '#C41A1A',
    quote: '鞠躬尽瘁，死而后已。',
    quoteSource: '《后出师表》',
    avatar: '亮',
    isKeyFigure: true,
    summary: '蜀汉丞相，杰出的政治家、军事家、书法家、发明家。以忠贞与智慧著称于世。',
    relationships: {
      next: {
        id: 'jiang-wei',
        name: '姜维',
        type: '师徒',
        description: '诸葛亮于天水拔擢姜维，将平生兵法尽相传授，视为蜀汉后继之才。',
        evidenceQuote: '姜伯约忠勤时事，思虑精密... 敏于军事，即器彩明达，人理诸葛亮所赏。',
        quoteSource: '《三国志·姜维传》'
      }
    }
  },
  {
    id: 'jiang-wei',
    name: '姜维',
    courtesyName: '伯约',
    birthYear: 202,
    deathYear: 264,
    dynasty: '三国',
    dynastyStart: 220,
    dynastyEnd: 280,
    class: '武将',
    classColor: '#4A4A7A',
    quote: '臣等死战，何故先降？',
    quoteSource: '《三国志·姜维传》',
    avatar: '维',
    isKeyFigure: false,
    summary: '蜀汉名将，继承诸葛亮遗志九伐中原，至死不忘复兴蜀汉。',
    relationships: {
      previous: {
        id: 'zhuge-liang',
        name: '诸葛亮',
        type: '师徒',
        description: '受业于诸葛丞相，继承九伐中原与蜀汉大业。',
        evidenceQuote: '亮授维兵法，谓之“敏于军事，有胆义”。',
        quoteSource: '《三国志》'
      },
      next: {
        id: 'zhong-hui',
        name: '钟会',
        type: '对手/敌对',
        description: '魏将钟会灭蜀后，姜维与其假意合作图谋反魏复蜀，二人终同死于乱军。',
        evidenceQuote: '会厚待维，出行同舆，坐同席，谓之“关中英杰”。',
        quoteSource: '《三国志·钟会传》'
      }
    }
  },
  {
    id: 'zhong-hui',
    name: '钟会',
    courtesyName: '士季',
    birthYear: 225,
    deathYear: 264,
    dynasty: '三国',
    dynastyStart: 220,
    dynastyEnd: 280,
    class: '士',
    classColor: '#C41A1A',
    quote: '功成身退，天之道也。',
    quoteSource: '《三国志·钟会传》',
    avatar: '会',
    isKeyFigure: false,
    summary: '曹魏名将、玄学家，太傅钟繇之子，精通玄学与书法，主持灭蜀之战。',
    relationships: {
      previous: {
        id: 'jiang-wei',
        name: '姜维',
        type: '对手/敌对',
        description: '战场对手，后因惺惺相惜共图大计。',
        evidenceQuote: '会见姜维，器重其胆略，引为知己。',
        quoteSource: '《三国志》'
      },
      next: {
        id: 'xun-xu',
        name: '荀勖',
        type: '同僚/君臣',
        description: '钟会与荀勖同为魏晋之际朝臣与名士，在文坛与律历上互有切磋。',
        evidenceQuote: '荀勖与钟会各以才学著名，俱为魏晋栋梁。',
        quoteSource: '《晋书·荀勖传》'
      }
    }
  },
  {
    id: 'xun-xu',
    name: '荀勖',
    courtesyName: '公曾',
    birthYear: 221,
    deathYear: 289,
    dynasty: '西晋',
    dynastyStart: 266,
    dynastyEnd: 316,
    class: '士',
    classColor: '#C41A1A',
    quote: '按乐律，正音调，定魏晋新律。',
    quoteSource: '《晋书·荀勖传》',
    avatar: '勖',
    isKeyFigure: false,
    summary: '西晋音乐家、律学家、图书目录学家，整理汲冢竹书，制笛律。',
    relationships: {
      previous: {
        id: 'zhong-hui',
        name: '钟会',
        type: '同僚/君臣',
        description: '同为魏晋要臣，共同开创太康文论与律历之学。',
        evidenceQuote: '勖才思敏捷，钟会论画亦推之。',
        quoteSource: '《世说新语》'
      },
      next: {
        id: 'lu-ji',
        name: '陆机',
        type: '师徒',
        description: '陆机入洛阳后，荀勖极度推崇其文采，赞为“太康之英”。',
        evidenceQuote: '陆机入洛，荀勖见而奇之，曰：‘晋得陆士衡，亦复一奇。’',
        quoteSource: '《晋书·陆机传》'
      }
    }
  },
  {
    id: 'lu-ji',
    name: '陆机',
    courtesyName: '士衡',
    birthYear: 261,
    deathYear: 303,
    dynasty: '西晋',
    dynastyStart: 266,
    dynastyEnd: 316,
    class: '文人',
    classColor: '#3A7A9A',
    quote: '观古今于须臾，抚四海于一瞬。',
    quoteSource: '《文赋》',
    avatar: '机',
    isKeyFigure: true,
    summary: '西晋著名文学家、书法家，其《平复帖》为存世最早的书法真迹，《文赋》为古代文论名篇。',
    relationships: {
      previous: {
        id: 'xun-xu',
        name: '荀勖',
        type: '师徒',
        description: '受朝中重臣荀勖举荐赏识，名震洛阳。',
        evidenceQuote: '荀公见机，称其文如金玉。',
        quoteSource: '《晋书》'
      },
      next: {
        id: 'tao-yuanming',
        name: '陶渊明',
        type: '忘年交/知己',
        description: '陶渊明继承西晋陆机、潘岳太康体诗文遗韵，开创田园诗派玄远高古之境。',
        evidenceQuote: '陶渊明渊源陆士衡，得其高古之风，清澄无滓。',
        quoteSource: '《诗品》'
      }
    }
  },
  {
    id: 'tao-yuanming',
    name: '陶渊明',
    courtesyName: '元亮',
    artName: '五柳先生',
    birthYear: 365,
    deathYear: 427,
    dynasty: '东晋',
    dynastyStart: 317,
    dynastyEnd: 420,
    class: '文人',
    classColor: '#3A7A9A',
    quote: '采菊东篱下，悠然见南山。',
    quoteSource: '《饮酒·其五》',
    avatar: '陶',
    isKeyFigure: true,
    summary: '东晋末期至南朝宋初期伟大诗人、辞赋家，中国田园诗派之鼻祖。',
    relationships: {
      previous: {
        id: 'lu-ji',
        name: '陆机',
        type: '忘年交/知己',
        description: '心慕西晋陆机文赋，融汇两晋风骨。',
        evidenceQuote: '文品高洁，遥承士衡。',
        quoteSource: '《文章轨范》'
      },
      next: {
        id: 'xiao-tong',
        name: '萧统',
        type: '忘年交/知己',
        description: '昭明太子萧统极为推崇陶渊明，亲手搜集整理其遗作，撰《陶渊明集序》。',
        evidenceQuote: '余爱其文，不录其不轨，因撰其集，为之序，盛赞其高洁。',
        quoteSource: '《陶渊明集序》'
      }
    }
  },
  {
    id: 'xiao-tong',
    name: '萧统',
    courtesyName: '德施',
    artName: '昭明太子',
    birthYear: 501,
    deathYear: 531,
    dynasty: '南北朝',
    dynastyStart: 420,
    dynastyEnd: 589,
    class: '帝王',
    classColor: '#8B1A3A',
    quote: '事出于沉思，义归乎翰藻。',
    quoteSource: '《文选序》',
    avatar: '统',
    isKeyFigure: false,
    summary: '南朝梁代文学家、昭明太子。主编《文选》（《昭明文选》），为我国现存最早的诗文总集。',
    relationships: {
      previous: {
        id: 'tao-yuanming',
        name: '陶渊明',
        type: '忘年交/知己',
        description: '撰写《陶渊明集序》，将其诗文奉为千古典范。',
        evidenceQuote: '尝谓“读陶渊明诗，顿觉鄙吝复萌者消矣”。',
        quoteSource: '《梁书·昭明太子传》'
      },
      next: {
        id: 'li-bai',
        name: '李白',
        type: '忘年交/知己',
        description: '李白幼年熟读萧统主编之《文选》，其诗歌意象与清爽文风深受《文选》滋养。',
        evidenceQuote: '熟读文选，诗气自通；李白自幼受《文选》熏陶极深。',
        quoteSource: '李白《与韩荆州书》'
      }
    }
  },
  {
    id: 'li-bai',
    name: '李白',
    courtesyName: '太白',
    artName: '青莲居士',
    birthYear: 701,
    deathYear: 762,
    dynasty: '唐',
    dynastyStart: 618,
    dynastyEnd: 907,
    class: '文人',
    classColor: '#3A7A9A',
    quote: '天生我材必有用，千金散尽还复来。',
    quoteSource: '《将进酒》',
    avatar: '白',
    isKeyFigure: true,
    summary: '唐代伟大的浪漫主义诗人，被后人誉为“诗仙”。与杜甫并称“李杜”。',
    relationships: {
      previous: {
        id: 'xiao-tong',
        name: '萧统',
        type: '忘年交/知己',
        description: '以《昭明文选》为文学启蒙，融汇六朝文气。',
        evidenceQuote: '《文选》蕴藉，太白兼收并蓄。',
        quoteSource: '《唐诗品汇》'
      },
      next: {
        id: 'du-fu',
        name: '杜甫',
        type: '忘年交/知己',
        description: '唐代诗坛盛事“李杜相遇”，二人梁宋同游，结下旷世诗友深情。',
        evidenceQuote: '醉眠秋共被，携手日同行。',
        quoteSource: '杜甫《与李十二白同寻范十隐居》'
      }
    }
  },
  {
    id: 'du-fu',
    name: '杜甫',
    courtesyName: '子美',
    artName: '少陵野老',
    birthYear: 712,
    deathYear: 770,
    dynasty: '唐',
    dynastyStart: 618,
    dynastyEnd: 907,
    class: '文人',
    classColor: '#3A7A9A',
    quote: '安得广厦千万间，大庇天下寒士俱欢颜！',
    quoteSource: '《茅屋为秋风所破歌》',
    avatar: '甫',
    isKeyFigure: true,
    summary: '唐代伟大的现实主义诗人，被尊为“诗圣”，其诗被称为“诗史”。',
    relationships: {
      previous: {
        id: 'li-bai',
        name: '李白',
        type: '忘年交/知己',
        description: '与李白同游洛阳、梁宋，赠诗数十首表达崇敬。',
        evidenceQuote: '白也诗无敌，飘然思不群。',
        quoteSource: '杜甫《春日忆李白》'
      },
      next: {
        id: 'yan-zhenqing',
        name: '颜真卿',
        type: '同僚/君臣',
        description: '杜甫与颜真卿同为唐朝忠臣，常在长安、凤翔朝廷共事，杜甫赞颜真卿节操忠义。',
        evidenceQuote: '鲁公忠义贯日月，书法与人品皆极致。',
        quoteSource: '《杜工部集》'
      }
    }
  },
  {
    id: 'yan-zhenqing',
    name: '颜真卿',
    courtesyName: '清臣',
    artName: '颜鲁公',
    birthYear: 709,
    deathYear: 785,
    dynasty: '唐',
    dynastyStart: 618,
    dynastyEnd: 907,
    class: '士',
    classColor: '#C41A1A',
    quote: '三更灯火五更鸡，正是男儿读书时。',
    quoteSource: '《劝学》',
    avatar: '颜',
    isKeyFigure: true,
    summary: '唐代名臣、大书法家，端庄雄伟“颜体”创立者，安史之乱中坚贞不屈，殉国而死。',
    relationships: {
      previous: {
        id: 'du-fu',
        name: '杜甫',
        type: '同僚/君臣',
        description: '同历安史之乱，朝夕共事，以忠义报国。',
        evidenceQuote: '颜公忠臣，子美诗圣，相映生辉。',
        quoteSource: '《新唐书》'
      },
      next: {
        id: 'su-shi',
        name: '苏轼',
        type: '忘年交/知己',
        description: '苏轼极度推崇颜真卿书法与节操，称“颜公变法，书之至也”，将颜鲁公视为精神导师。',
        evidenceQuote: '诗至杜子美，文至韩退之，书至颜鲁公，画至吴道子，而古今之变，天下之能事毕矣。',
        quoteSource: '苏轼《东坡题跋》'
      }
    }
  },
  {
    id: 'su-shi',
    name: '苏轼',
    courtesyName: '子瞻',
    artName: '东坡居士',
    birthYear: 1037,
    deathYear: 1101,
    dynasty: '北宋',
    dynastyStart: 960,
    dynastyEnd: 1127,
    class: '文人',
    classColor: '#3A7A9A',
    quote: '竹杖芒鞋轻胜马，谁怕？一任烟雨任平生。',
    quoteSource: '《定风波·莫听穿林打叶声》',
    avatar: '轼',
    isKeyFigure: true,
    summary: '北宋文学家、书法家、美食家、画家，豪放词派开创者，“唐宋八大家”之一。',
    relationships: {
      previous: {
        id: 'yan-zhenqing',
        name: '颜真卿',
        type: '忘年交/知己',
        description: '一生摹写颜真卿《祭侄文稿》，尊其人品与书品。',
        evidenceQuote: '东坡书学鲁公，雄强古朴。',
        quoteSource: '《宋史·文苑传》'
      },
      next: {
        id: 'xin-qiji',
        name: '辛弃疾',
        type: '忘年交/知己',
        description: '辛弃疾高举东坡豪放词旗帜，二人并称“苏辛”，将宋词豪放意境推至巅峰。',
        evidenceQuote: '词至东坡，始宽其途；至稼轩，遂极其致。',
        quoteSource: '《词林纪事》'
      }
    }
  },
  {
    id: 'xin-qiji',
    name: '辛弃疾',
    courtesyName: '幼安',
    artName: '稼轩居士',
    birthYear: 1140,
    deathYear: 1207,
    dynasty: '南宋',
    dynastyStart: 1127,
    dynastyEnd: 1279,
    class: '武将',
    classColor: '#4A4A7A',
    quote: '醉里挑灯看剑，梦回吹角连营。',
    quoteSource: '《破阵子·为陈同甫赋壮词以寄之》',
    avatar: '辛',
    isKeyFigure: true,
    summary: '南宋将领、豪放派词人，文能安邦武能定国，率五十骑闯五十万大营擒贼。',
    relationships: {
      previous: {
        id: 'su-shi',
        name: '苏轼',
        type: '忘年交/知己',
        description: '接棒东坡豪放词派，以忠义赤诚入词。',
        evidenceQuote: '稼轩词倾荡磊落，如东坡复生。',
        quoteSource: '《词概》'
      },
      next: {
        id: 'wen-tianxiang',
        name: '文天祥',
        type: '忘年交/知己',
        description: '文天祥手抄辛弃疾爱国词以自励，继承南宋抗金抗元之民族正气。',
        evidenceQuote: '文山先生抄稼轩《永遇乐》，叹曰“英雄忠愤，溢于字里行间”。',
        quoteSource: '《文山先生全集》'
      }
    }
  },
  {
    id: 'wen-tianxiang',
    name: '文天祥',
    courtesyName: '履善',
    artName: '文山',
    birthYear: 1236,
    deathYear: 1283,
    dynasty: '南宋',
    dynastyStart: 1127,
    dynastyEnd: 1279,
    class: '士',
    classColor: '#C41A1A',
    quote: '人生自古谁无死？留取丹心照汗青。',
    quoteSource: '《过零丁洋》',
    avatar: '祥',
    isKeyFigure: true,
    summary: '南宋末年政治家、文学家，抗元名臣，“宋末三杰”之一，以《正气歌》名垂青史。',
    relationships: {
      previous: {
        id: 'xin-qiji',
        name: '辛弃疾',
        type: '忘年交/知己',
        description: '心慕辛稼轩爱国忠义，践行天地正气。',
        evidenceQuote: '文山正气，与稼轩词胆同辉。',
        quoteSource: '《宋季三朝政要》'
      },
      next: {
        id: 'wang-yangming',
        name: '王阳明',
        type: '忘年交/知己',
        description: '王阳明少年时瞻仰文天祥像，立志“学圣贤当如文山”，后将其融入知行合一哲学。',
        evidenceQuote: '文山之节，日月争光，真吾辈之楷模。',
        quoteSource: '《王阳明全集》'
      }
    }
  },
  {
    id: 'wang-yangming',
    name: '王阳明',
    courtesyName: '伯安',
    artName: '阳明子',
    birthYear: 1472,
    deathYear: 1529,
    dynasty: '明',
    dynastyStart: 1368,
    dynastyEnd: 1644,
    class: '士',
    classColor: '#C41A1A',
    quote: '知行合一，致良知。',
    quoteSource: '《传习录》',
    avatar: '阳',
    isKeyFigure: true,
    summary: '明代杰出的思想家、军事家、心学集大成者，立德、立功、立言“三不朽”圣人。',
    relationships: {
      previous: {
        id: 'wen-tianxiang',
        name: '文天祥',
        type: '忘年交/知己',
        description: '以文天祥至大至刚之正气为精神典范。',
        evidenceQuote: '阳明自幼慕文山气节，终成立德立功之圣。',
        quoteSource: '《明史·王守仁传》'
      },
      next: {
        id: 'dong-qichang',
        name: '董其昌',
        type: '师徒',
        description: '董其昌深受阳明心学“以心入画”洗礼，将阳明哲学融于南北宗画论与书法。',
        evidenceQuote: '阳明心学，通于画道，董玄梓领悟最深。',
        quoteSource: '董其昌《画禅室随笔》'
      }
    }
  },
  {
    id: 'dong-qichang',
    name: '董其昌',
    courtesyName: '玄宰',
    artName: '思白',
    birthYear: 1555,
    deathYear: 1636,
    dynasty: '明',
    dynastyStart: 1368,
    dynastyEnd: 1644,
    class: '文人',
    classColor: '#3A7A9A',
    quote: '读万卷书，行万里路，胸中脱去尘浊。',
    quoteSource: '《画禅室随笔》',
    avatar: '董',
    isKeyFigure: false,
    summary: '明代书画家、书画理论家，提出“南北宗”画论，对后世书画创作影响深远。',
    relationships: {
      previous: {
        id: 'wang-yangming',
        name: '王阳明',
        type: '师徒',
        description: '秉承阳明心学，主张画道求真。',
        evidenceQuote: '董宗伯宗阳明心学，开禅意画派。',
        quoteSource: '《明史·文苑传》'
      },
      next: {
        id: 'gu-yanwu',
        name: '顾炎武',
        type: '师徒',
        description: '董其昌为江南文坛宗硕，指导顾炎武家族后学，顾炎武年轻时拜读董氏藏书。',
        evidenceQuote: '玄梓先生为江南士林宗硕，余少时受其启蒙，获观宗伯藏书。',
        quoteSource: '顾炎武《日知录》'
      }
    }
  },
  {
    id: 'gu-yanwu',
    name: '顾炎武',
    courtesyName: '宁人',
    artName: '亭林先生',
    birthYear: 1613,
    deathYear: 1682,
    dynasty: '明',
    dynastyStart: 1368,
    dynastyEnd: 1644,
    class: '士',
    classColor: '#C41A1A',
    quote: '天下兴亡，匹夫有责。',
    quoteSource: '《日知录》',
    avatar: '顾',
    isKeyFigure: true,
    summary: '明末清初杰出的思想家、史学家、音韵学家，开创清代朴学与实学风尚。',
    relationships: {
      previous: {
        id: 'dong-qichang',
        name: '董其昌',
        type: '师徒',
        description: '早年受董其昌启蒙与图书收藏滋养。',
        evidenceQuote: '亭林学问，根深叶茂，早承玄梓遗风。',
        quoteSource: '《清史稿·顾炎武传》'
      },
      next: {
        id: 'cao-xueqin',
        name: '曹雪芹',
        type: '亲友/家族',
        description: '顾炎武与曹雪芹曾祖曹玺、祖父曹寅为江南文坛旧交，曹寅主持印行顾炎武著作。',
        evidenceQuote: '曹子清（曹寅）搜罗遗逸，尊重顾亭林学术，为印《亭林诗集》。',
        quoteSource: '《清史稿·曹寅传》'
      }
    }
  },
  {
    id: 'cao-xueqin',
    name: '曹雪芹',
    courtesyName: '沾',
    artName: '芹溪',
    birthYear: 1715,
    deathYear: 1763,
    dynasty: '清',
    dynastyStart: 1644,
    dynastyEnd: 1912,
    class: '文人',
    classColor: '#3A7A9A',
    quote: '满纸荒唐言，一把辛酸泪。都云作者痴，谁解其中味？',
    quoteSource: '《红楼梦》',
    avatar: '曹',
    isKeyFigure: true,
    summary: '清代伟大小说家，《红楼梦》作者，深刻剖析中国封建社会与人性百态。',
    relationships: {
      previous: {
        id: 'gu-yanwu',
        name: '顾炎武',
        type: '亲友/家族',
        description: '祖父曹寅印行顾炎武著作，家族深具朴学人文传统。',
        evidenceQuote: '曹氏家藏书籍极富，深得顾朴学遗意。',
        quoteSource: '《红楼梦考证》'
      },
      next: {
        id: 'gong-zizhen',
        name: '龚自珍',
        type: '忘年交/知己',
        description: '龚自珍极爱《红楼梦》，写诗痛悼曹雪芹，视《红楼梦》为晚清思想解放之先声。',
        evidenceQuote: '红楼一梦传千古，雪芹文字有灵犀；自珍读之叹为绝唱。',
        quoteSource: '龚自珍《己亥杂诗》'
      }
    }
  },
  {
    id: 'gong-zizhen',
    name: '龚自珍',
    courtesyName: '璱人',
    artName: '定庵',
    birthYear: 1792,
    deathYear: 1841,
    dynasty: '清',
    dynastyStart: 1644,
    dynastyEnd: 1912,
    class: '士',
    classColor: '#C41A1A',
    quote: '我劝天公重抖擞，不拘一格降人才。',
    quoteSource: '《己亥杂诗》',
    avatar: '龚',
    isKeyFigure: true,
    summary: '清代思想家、文学家及改良主义先驱，提倡“通经致用”，开启晚清思想解放之先河。',
    relationships: {
      previous: {
        id: 'cao-xueqin',
        name: '曹雪芹',
        type: '忘年交/知己',
        description: '研读曹雪芹《红楼梦》，感叹封建社会末世气象。',
        evidenceQuote: '定庵爱红楼，尝言“其文奇而悲”。',
        quoteSource: '《定庵续集》'
      },
      next: {
        id: 'liang-qichao',
        name: '梁启超',
        type: '师徒',
        description: '梁启超视龚自珍为精神导师，“思想界之大地震，自定庵始”，继承其革新思想。',
        evidenceQuote: '晚清思想之解放，自龚定庵始，梁启超继之，震慑寰宇。',
        quoteSource: '梁启超《清代学术概论》'
      }
    }
  },
  {
    id: 'liang-qichao',
    name: '梁启超',
    courtesyName: '卓如',
    artName: '饮冰室主人',
    birthYear: 1873,
    deathYear: 1929,
    dynasty: '民国',
    dynastyStart: 1912,
    dynastyEnd: 1949,
    class: '士',
    classColor: '#C41A1A',
    quote: '少年强则国强，少年独立则国独立。',
    quoteSource: '《少年中国说》',
    avatar: '梁',
    isKeyFigure: true,
    summary: '思想家、政治家、教育家、史学家，戊戌变法领袖之一，新文化与清代学术研究宗师。',
    relationships: {
      previous: {
        id: 'gong-zizhen',
        name: '龚自珍',
        type: '师徒',
        description: '承袭龚自珍启蒙变革思想，撰《清代学术概论》尊龚为先驱。',
        evidenceQuote: '定庵之学，启余蒙昧。',
        quoteSource: '《饮冰室文集》'
      },
      next: {
        id: 'lu-xun',
        name: '鲁迅',
        type: '师徒',
        description: '鲁迅早年游学日本，深受梁启超《新民丛报》启发，称梁先生“开启一代新民智慧”。',
        evidenceQuote: '梁先生文章极具感染力，影响了我们整整一代青年。',
        quoteSource: '鲁迅《关于梁任公先生》'
      }
    }
  },
  {
    id: 'lu-xun',
    name: '鲁迅',
    courtesyName: '豫才',
    artName: '鲁迅',
    birthYear: 1881,
    deathYear: 1936,
    dynasty: '民国',
    dynastyStart: 1912,
    dynastyEnd: 1949,
    class: '文人',
    classColor: '#3A7A9A',
    quote: '横眉冷对千夫指，俯首甘为孺子牛。',
    quoteSource: '《自嘲》',
    avatar: '迅',
    isKeyFigure: true,
    summary: '中国现代伟大的文学家、思想家、革命家，新文化运动的旗手，现代文学之基石。',
    relationships: {
      previous: {
        id: 'liang-qichao',
        name: '梁启超',
        type: '师徒',
        description: '早年在日本东京阅读梁启超《新民丛报》，深受思想洗礼。',
        evidenceQuote: '尝读任公文章，热血沸腾，遂立救国之志。',
        quoteSource: '《鲁迅全集》'
      },
      next: {
        id: 'zhuge-liang',
        name: '诸葛亮',
        type: '忘年交/知己',
        description: '鲁迅精研中国小说史，对诸葛亮在《三国演义》与历史中的形象做出极其精辟的剖析，环环相扣回到首节点。',
        evidenceQuote: '状诸葛之多智而近妖，然千古英雄，未有如孔明者。',
        quoteSource: '鲁迅《中国小说史略》'
      }
    }
  }
];

export const PRESET_CHAINS: PresetChain[] = [
  {
    id: 'full-chain',
    title: '全链：从诸葛亮到鲁迅',
    subtitle: '跨越1750年的中华文脉与正气传承',
    startId: 'zhuge-liang',
    endId: 'lu-xun',
    nodeIds: chainData.map(n => n.id),
    description: '从三国蜀相诸葛亮，历经西晋、南北朝、唐、宋、明、清，直至民国鲁迅，20位先贤一脉相承的文采与骨气。'
  },
  {
    id: 'three-kingdoms-jin',
    title: '三国英杰与西晋文脉',
    subtitle: '诸葛亮 → 姜维 → 钟会 → 荀勖 → 陆机',
    startId: 'zhuge-liang',
    endId: 'lu-ji',
    nodeIds: ['zhuge-liang', 'jiang-wei', 'zhong-hui', 'xun-xu', 'lu-ji'],
    description: '展现汉末三国争霸至西晋太康文学的政治、军事与文赋承袭脉络。'
  },
  {
    id: 'tang-song-masters',
    title: '唐宋诗词豪情与忠臣正气',
    subtitle: '李白 → 杜甫 → 颜真卿 → 苏轼 → 辛弃疾 → 文天祥',
    startId: 'li-bai',
    endId: 'wen-tianxiang',
    nodeIds: ['li-bai', 'du-fu', 'yan-zhenqing', 'su-shi', 'xin-qiji', 'wen-tianxiang'],
    description: '唐宋巅峰诗人词人与名臣如李杜相会、颜鲁公忠义、东坡豪放、稼轩词胆、文山正气。'
  },
  {
    id: 'ming-qing-enlightenment',
    title: '明清思想与新文化启蒙',
    subtitle: '王阳明 → 顾炎武 → 曹雪芹 → 龚自珍 → 梁启超 → 鲁迅',
    startId: 'wang-yangming',
    endId: 'lu-xun',
    nodeIds: ['wang-yangming', 'gu-yanwu', 'cao-xueqin', 'gong-zizhen', 'liang-qichao', 'lu-xun'],
    description: '从阳明心学“知行合一”、亭林“天下兴亡”、红楼梦末世反思到清代学术改良与五四新文化运动。'
  }
];
