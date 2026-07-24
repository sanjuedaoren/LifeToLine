import { DynastyInfo } from '../types';

export const DYNASTIES: DynastyInfo[] = [
  { name: '秦', startYear: -221, endYear: -207, color: '#3E2A22' },
  { name: '西汉', startYear: -202, endYear: 8, color: '#4E2C22' },
  { name: '东汉', startYear: 25, endYear: 220, color: '#5E281F' },
  { name: '三国', startYear: 220, endYear: 280, color: '#2C3A2E' },
  { name: '西晋', startYear: 266, endYear: 316, color: '#3A382C' },
  { name: '东晋', startYear: 317, endYear: 420, color: '#2E383E' },
  { name: '南北朝', startYear: 420, endYear: 589, color: '#382E3E' },
  { name: '隋', startYear: 581, endYear: 618, color: '#4A3E2A' },
  { name: '唐', startYear: 618, endYear: 907, color: '#6A2A1A' },
  { name: '五代十国', startYear: 907, endYear: 960, color: '#383838' },
  { name: '北宋', startYear: 960, endYear: 1127, color: '#2A4A3E' },
  { name: '南宋', startYear: 1127, endYear: 1279, color: '#1E3E4A' },
  { name: '元', startYear: 1271, endYear: 1368, color: '#3E1E4A' },
  { name: '明', startYear: 1368, endYear: 1644, color: '#7A1C1C' },
  { name: '清', startYear: 1644, endYear: 1912, color: '#1F3F5E' },
  { name: '民国', startYear: 1912, endYear: 1949, color: '#3F3F5E' }
];

export const SOCIAL_CLASS_COLORS: Record<string, string> = {
  '士': '#C41A1A',
  '农': '#4A8A3A',
  '工': '#D4801A',
  '商': '#C4A030',
  '帝王': '#8B1A3A',
  '武将': '#4A4A7A',
  '文人': '#3A7A9A',
  '僧道': '#A08040',
  '其他': '#999999'
};

export const RELATIONSHIP_COLORS: Record<string, { color: string; style: 'solid' | 'dashed' | 'dotted' }> = {
  '师徒': { color: '#C41A1A', style: 'solid' },
  '同僚/君臣': { color: '#2B5B84', style: 'solid' },
  '亲友/家族': { color: '#3A8A5C', style: 'solid' },
  '对手/敌对': { color: '#8B1A1A', style: 'dashed' },
  '忘年交/知己': { color: '#C4A830', style: 'solid' },
  '传承': { color: '#C4A830', style: 'solid' },
  '承接': { color: '#C4A830', style: 'solid' },
  '启后': { color: '#C4A830', style: 'solid' },
  '其他': { color: '#888888', style: 'dotted' }
};
