export interface HoroscopeData {
  zodiacSign: string; // Con giáp
  date: string; // Ngày tra cứu
  generalInfo: string; // Thông tin chung (VD: "Cẩn thận hao tài")
  indices: {
    career: number; // Sự nghiệp
    fortune: number; // Tài lộc
    health: number; // Sức khỏe
    love: number; // Tình cảm
  };
  generalInterpretation: string; // Luận giải chung
  luckyNumbers: number[]; // Con số may mắn
}

export enum VietnameseZodiac {
  TY = 'ty', // Tý (Rat)
  SUU = 'suu', // Sửu (Ox)
  DAN = 'dan', // Dần (Tiger)
  MAO = 'mao', // Mão (Rabbit)
  THIN = 'thin', // Thìn (Dragon)
  TI = 'ti', // Tỵ (Snake)
  NGO = 'ngo', // Ngọ (Horse)
  MUI = 'mui', // Mùi (Goat)
  THAN = 'than', // Thân (Monkey)
  DAU = 'dau', // Dậu (Rooster)
  TUAT = 'tuat', // Tuất (Dog)
  HOI = 'hoi', // Hợi (Pig)
}
