export type SocialClass = '士' | '农' | '工' | '商' | '帝王' | '武将' | '文人' | '僧道' | '其他';

export type RelationshipType = '师徒' | '同僚/君臣' | '亲友/家族' | '对手/敌对' | '忘年交/知己' | '传承' | '承接' | '启后' | '其他';

export interface RelationTarget {
  id: string;
  name: string;
  type: RelationshipType;
  description: string;
  evidenceQuote?: string;
  quoteSource?: string;
}

export interface PersonNode {
  id: string;
  name: string;
  birthYear: number;
  deathYear: number;
  dynasty: string;
  dynastyStart: number;
  dynastyEnd: number;
  class: SocialClass;
  classColor: string;
  quote: string;
  quoteSource: string;
  avatar: string;
  isKeyFigure: boolean;
  courtesyName?: string; // 字
  artName?: string; // 号
  summary: string;
  relationships: {
    previous?: RelationTarget;
    next?: RelationTarget;
  };
}

export interface DynastyInfo {
  name: string;
  startYear: number;
  endYear: number;
  color: string;
  textColor?: string;
}

export interface PresetChain {
  id: string;
  title: string;
  subtitle: string;
  startId: string;
  endId: string;
  chainIds?: string[];
  nodeIds?: string[];
  description: string;
}
