
export interface MemberPhotoData {
  nama: string;
  password: string; // NIK
  pasfoto_convert: string;
  barcode_convert: string;
}

// Data dengan foto profil yang berbeda untuk setiap anggota
const memberPhotoData: MemberPhotoData[] = [
  { nama: 'MUHAMAD FARHAN WAHYUDI', password: '1505050305000002', pasfoto_convert: 'https://drive.google.com/file/d/1UeYQ_4znLXdPA5X9LgZFDsyd1yAA_Cox/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1uFOVPXQQnShBxLvj8PlRYOKjo0-jhgjz' },
  { nama: 'TB. AFFAN DARMASUMITRA', password: '3272032509720001', pasfoto_convert: 'https://drive.google.com/file/d/1FYhOzHIHE1DpoeglOvrlbvc1RiReWq1j/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1Vt2b6hPV1jtris38sGLI8F-557TuWoqB' },
  { nama: 'FIRMAN NURMANSYAH', password: '3272022806770001', pasfoto_convert: 'https://drive.google.com/file/d/1TtgV9dT7IWZJQ-b8jn5nDPgcn0STgQ5D/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1fxrv6ExagifktUFHbuF_DgOBn35maZiA' },
  { nama: 'SYAFRIL SANI', password: '3272062407740899', pasfoto_convert: 'https://drive.google.com/file/d/1xIep7elXYHT_r25Xo-HlT8JeDQTEwm_D/view?usp=drive_link', barcode_convert: 'https://drive.google.com/thumbnail?id=1-B_9j0erleHeLOh2Uut6f7HhjCQe01YR' },
  { nama: 'ERWAN RUSWANDI', password: '3272011606700001', pasfoto_convert: 'https://drive.google.com/file/d/1nvS0ByEB1LKBPpmwZP5zDxoXRTRs4JOr/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=15hc87M-LxquwLJVpFQ7a6fS4LeMkfU_-' },
  { nama: 'EKA ZULKARNAEN', password: '3202061808690001', pasfoto_convert: 'https://drive.google.com/file/d/149JAVnBX3E8xTTK5X1YBssXet9PCaCBP/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1jxasqtEM7PecAL4SY9KPuZ2MmOUglhcC' },
  { nama: 'PURNOMO SEPUTRO', password: '3272041301680001', pasfoto_convert: 'https://drive.google.com/file/d/12RASlxv3lzYYacQHkd9U3gMrLkkGxKiF/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1VX_a_G5zcmvbr4qPUeiNyh75SlphJILd' },
  { nama: 'YUDI IRAWAN', password: '3272020901690001', pasfoto_convert: 'https://drive.google.com/file/d/19aojCvk8DCO17UHP1LgopvnMBDNvJw25/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1Dr2gv3aYYf80KkKELknEOeekoEbHtigC' },
  { nama: 'ASEP TK, ST.', password: '3272022312810002', pasfoto_convert: 'https://drive.google.com/file/d/1KKTJeBpRmZ1ymhmzAZiQJSW4UPHgZMM0/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1sOu1e2n8V0rvqrhaA7l_5NwE5FK4WkPP' },
  { nama: 'MUHAMMAD REAL WIJAYA', password: '3202320806000002', pasfoto_convert: 'https://drive.google.com/file/d/1VTkfY1azBbdPXLoNnnJVZpBldMwtRK58/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1hkik5AirvGIDmsicpEavJLKIRDhuYbFz' },
  { nama: 'DODI MULYADI, SE', password: '3272013012630002', pasfoto_convert: 'https://drive.google.com/file/d/1FKU1qObc3nBWCGKD8BKO18fD3uwxcVit/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1VSZt1DeqqTGWGsKWstRAR9FTT0I2wwZN' },
  { nama: 'HENDRA RAMLAN', password: '3272031106830001', pasfoto_convert: 'https://drive.google.com/file/d/1H5fMnu4Ew4gfUZlYL1Wcd4IGCesSAPVM/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1Xby2eJ9MLbLrGrFTae7xeoRkhjP7PUS5' },
  { nama: 'RACHMAT SETIAWAN', password: '3272021910670901', pasfoto_convert: 'https://drive.google.com/file/d/1JRNzSfikLBJukUxVEk0XGcTGn2hFzmgb/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=18t7NEKVwLbCnucvT0K-xfc1d1hWmyb2W' },
  { nama: 'MOCH DINUL FAQIH', password: '3272070604980001', pasfoto_convert: 'https://drive.google.com/file/d/1t2JiD2EtUwXvl3kKDnhSg_MCNU9w97cm/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1lkOdEmYdvGrMinv-8jJp4o2I-oJ-Fh4y' },
  { nama: 'DERIS SETIAWAN', password: '3272032611820001', pasfoto_convert: 'https://drive.google.com/file/d/1ZgCkv4XgbR9NpLywW4yFhBIu6EG85EhF/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1Hj1DvF43WRUkn14vkE6YlU8ZArH3hBXM' },
  { nama: 'DEDI TURMUDHI', password: '3272060406720002', pasfoto_convert: 'https://drive.google.com/file/d/1r9I2_FP9bz0dRkzbEgSaGw8iaH9iJGag/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=14XHH2RwXjB0fZDmrFFgjIxr_qIo8Ypl8' },
  { nama: 'ADE SULAEMAN', password: '3272070407630001', pasfoto_convert: 'https://drive.google.com/file/d/1nLiok4sYa_JV4nJYhyXCz7eRC_wvEe1J/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1RloXRBGFkRox-8KeOEEjT0XRS0LSzrom' },
  { nama: 'ARIS HERMAWAN, S.IP', password: '3272050402910001', pasfoto_convert: 'https://drive.google.com/file/d/1SmnKkC5csk43ddJqyQYZitjHYWfjmVxU/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1sXQHP82rY_rfD8Mwm22-D1EI4h_sdg3j' },
  { nama: 'DADANG SUJANA', password: '3272031208660001', pasfoto_convert: 'https://drive.google.com/file/d/1YOM5ne3H15TK6_FGdwt_IL6-zPOY4LGH/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1NcxEyJ96cmvB39yD_dWpFEFgkO5dx-q9' },
  { nama: 'ENCEP SARIF HIDAYATTULLOH', password: '3272071606790002', pasfoto_convert: 'https://drive.google.com/file/d/1O8kZ2Xfhso0BmlgiAw3Xy0G0CsOplwS5/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=13lVCWx20yLgE5XVpUgTdElDk1DinT1Tq' },
  { nama: 'ENDANG JAMALUDIN', password: '3272031207660943', pasfoto_convert: 'https://drive.google.com/file/d/1uKA2UKjy-aDZ6VP8jIg62W8aICu8wcx-/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1Ntxdd6I93CBaFCStbaLNXiUfvwOLAecK' },
  { nama: 'ENDIN SARIPUDIN', password: '3272041807680001', pasfoto_convert: 'https://drive.google.com/file/d/1VRaBkyqn5xB0krQnx9bzzwlEZpEYn68_/view?usp=drive_link', barcode_convert: 'https://drive.google.com/thumbnail?id=1PQJ_oIliFY0ABIFbYzw0-1y-TOA-o1zY' },
  { nama: 'IMAN HENDRAWAN', password: '3272041407700002', pasfoto_convert: 'https://drive.google.com/file/d/1LNKqRBs4DhgLaH1dz-TyLTHT-ZMVWDH8/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1QmOQ4KaQWznGtDVlG1kCOZf4rREr3eZ7' },
  { nama: 'NENDA SAEPUROHMAN', password: '3272031906840899', pasfoto_convert: 'https://drive.google.com/file/d/1KFRcAirUTPvz4OfQBe1HkN3bdhvhu7i9/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=18OpOQFo0OUv4ZrIVAHFndVxIuYUZX6rZ' },
  { nama: 'RIDWAN IRAWAN', password: '3272031508660002', pasfoto_convert: 'https://drive.google.com/file/d/1_DzbprCwc7Jv95dCKxpMwvCZ6f5tseqW/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=19yz27lWgYDyG-nvzCowKcwjfs9JcR_-o' },
  { nama: 'TATAN SUTANDI', password: '3202221004900005', pasfoto_convert: 'https://drive.google.com/file/d/1zHKe6l8THq2ZUwIqoEjE50dafJcZCZ3Z/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1itxdLtQVRPkXtExGiBMY204-KoDsZEjR' },
  { nama: 'DERIAN DWI RAMDHAN', password: '3272051103950003', pasfoto_convert: 'https://drive.google.com/file/d/1x7u73EWxnPXHZ_Fbys0kwv_xDM-sql4a/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1T1hl1RYr3nx_UKXzkvRRKeRLimZK1GHc' },
  { nama: 'SUMARDIN LESTALLUHU', password: '3272022104760001', pasfoto_convert: 'https://drive.google.com/file/d/16G4Ch0H5yp_Nc6AjIFvn-mvuUeysw-Gq/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1q9U5VC3EOUDReX3ClC1IrqRywkCNoNJ4' },
  { nama: 'ERWAN KABUL', password: '3272032708680021', pasfoto_convert: 'https://drive.google.com/file/d/15kFU-33uQXoxAB67ZRuAlrG-urwFr19q/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1E_LiLOWE91ILZm_zdko4LsZCBCxQ3A9q' },
  { nama: 'RUSLAN HADI', password: '3272041703860002', pasfoto_convert: 'https://drive.google.com/file/d/1HEw213Vqd1GHKsKBnRpnpf-457xk42NH/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1uWEW1A5KMnny52be5OgQq0aEqEVNpF-1' },
  { nama: 'TUBAGUS WAHYUDIN', password: '3272041010730041', pasfoto_convert: 'https://drive.google.com/file/d/13cUnuhmIKfiyBVoZjI50RmjsDF7fStm9/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1lO1YajfyBaIlTR-JmUCq_b-ehbpGgGOh' },
  { nama: 'MUHAMMAD DINAR SUBAGJA', password: '3202322211970004', pasfoto_convert: 'https://drive.google.com/file/d/1rel1Mc5bi4s2TrphT-wpCc68v1nnWStr/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1mht3Zi2N1nKyfFJklbCGYegNqSENs_Ka' },
  { nama: 'TUTANG SURAHMAN', password: '3272051711700021', pasfoto_convert: 'https://drive.google.com/file/d/1x6TUS6vXtyP1T3v7a2cKdfdvR1g3hOqO/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1Z6Ngrw6cXXnsLkw0Di7c9quHuSo3zlgn' },
  { nama: 'IWAN RIDWAN TAUFIK', password: '3272052801770001', pasfoto_convert: 'https://drive.google.com/file/d/1H-pnI1gs_CzUwESegaM0xanv9Uf0e0FK/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1HcdcU1tKHikzdifkm8pwL06sP5ACPgra' },
  { nama: 'ILHAM GINANZAR', password: '3272031305930001', pasfoto_convert: 'https://drive.google.com/file/d/1xbTmLk_CEmHnLAHIXHDgaCMERqXjK5cE/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1J10tHpF4VidSrueFTLb-tHXhvwJdm61i' },
  { nama: 'DIDI JUNAEDI', password: '3272020111650901', pasfoto_convert: 'https://drive.google.com/file/d/1BxXc2jG5pdfXuET92_3ZP-txaroNxQG_/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1t1Pmb_3cc0uq4zctRcUnqlG-YQLHN28G' },
  { nama: 'NUSI SANUSI', password: '3272050505760901', pasfoto_convert: 'https://drive.google.com/file/d/14VqvegAxFom7zhAmJcXNfzfA77xpEZOJ/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=12x0DmTBmK4nhydfz-jwdNVGw1ntLkFFF' },
  { nama: 'INDRA SUNDAWAN, S.Pd.', password: '3272051811810001', pasfoto_convert: 'https://drive.google.com/file/d/10fsCn3paAeev3xgiDrRkak-B5iActvDW/view?usp=sharing', barcode_convert: 'https://drive.google.com/thumbnail?id=1qnuOzzAYIk4DNXo_RA3oyjzI2rkPfWQW' }
];

const STORAGE_KEY = 'fkdm_member_photos';

export class MemberPhotoService {
  static initializeMemberData(): void {
    if (!localStorage.getItem(STORAGE_KEY)) {
      this.saveMembers(memberPhotoData);
    }
  }

  static getMembers(): MemberPhotoData[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : memberPhotoData;
  }

  static saveMembers(members: MemberPhotoData[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  }

  static getAllMemberData(): MemberPhotoData[] {
    return this.getMembers();
  }

  static getMemberByNIK(nik: string): MemberPhotoData | null {
    const members = this.getMembers();
    return members.find(member => member.password === nik) || null;
  }
}
