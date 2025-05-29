
export interface KelurahanData {
  nama: string;
  kode: string;
}

export interface KecamatanData {
  nama: string;
  kode: string;
  kelurahan: KelurahanData[];
}

export const WILAYAH_OPERASI: KecamatanData[] = [
  {
    nama: 'Baros',
    kode: 'BRS',
    kelurahan: [
      { nama: 'Baros', kode: 'BRS01' },
      { nama: 'Jayaraksa', kode: 'BRS02' },
      { nama: 'Jayamekar', kode: 'BRS03' },
      { nama: 'Sudajaya Hilir', kode: 'BRS04' }
    ]
  },
  {
    nama: 'Cibeureum',
    kode: 'CBR',
    kelurahan: [
      { nama: 'Babakan', kode: 'CBR01' },
      { nama: 'Cibeureumhilir', kode: 'CBR02' },
      { nama: 'Limusnunggal', kode: 'CBR03' },
      { nama: 'Sindangpalay', kode: 'CBR04' }
    ]
  },
  {
    nama: 'Cikole',
    kode: 'CKL',
    kelurahan: [
      { nama: 'Cikole', kode: 'CKL01' },
      { nama: 'Cisarua', kode: 'CKL02' },
      { nama: 'Gunungparang', kode: 'CKL03' },
      { nama: 'Kebonjati', kode: 'CKL04' },
      { nama: 'Selabatu', kode: 'CKL05' },
      { nama: 'Subangjaya', kode: 'CKL06' }
    ]
  },
  {
    nama: 'Citamiang',
    kode: 'CTM',
    kelurahan: [
      { nama: 'Cikondang', kode: 'CTM01' },
      { nama: 'Citamiang', kode: 'CTM02' },
      { nama: 'Gedongpanjang', kode: 'CTM03' },
      { nama: 'Nanggeleng', kode: 'CTM04' },
      { nama: 'Tipar', kode: 'CTM05' }
    ]
  },
  {
    nama: 'Gunungpuyuh',
    kode: 'GPY',
    kelurahan: [
      { nama: 'Gunungpuyuh', kode: 'GPY01' },
      { nama: 'Karamat', kode: 'GPY02' },
      { nama: 'Karangtengah', kode: 'GPY03' },
      { nama: 'Sriwidari', kode: 'GPY04' }
    ]
  },
  {
    nama: 'Lembursitu',
    kode: 'LBS',
    kelurahan: [
      { nama: 'Cikundul', kode: 'LBS01' },
      { nama: 'Cipanengah', kode: 'LBS02' },
      { nama: 'Lembursitu', kode: 'LBS03' },
      { nama: 'Sindangsari', kode: 'LBS04' },
      { nama: 'Situmekar', kode: 'LBS05' }
    ]
  },
  {
    nama: 'Warudoyong',
    kode: 'WDY',
    kelurahan: [
      { nama: 'Benteng', kode: 'WDY01' },
      { nama: 'Dayeuhluhur', kode: 'WDY02' },
      { nama: 'Nyomplong', kode: 'WDY03' },
      { nama: 'Sukakarya', kode: 'WDY04' },
      { nama: 'Warudoyong', kode: 'WDY05' }
    ]
  }
];

export const getKecamatanByNama = (nama: string): KecamatanData | undefined => {
  return WILAYAH_OPERASI.find(k => k.nama === nama);
};

export const getKelurahanByNama = (kecamatan: string, kelurahan: string): KelurahanData | undefined => {
  const kec = getKecamatanByNama(kecamatan);
  return kec?.kelurahan.find(k => k.nama === kelurahan);
};

export const getAllKelurahan = (): Array<{ kecamatan: string; kelurahan: string; kode: string }> => {
  return WILAYAH_OPERASI.flatMap(kec => 
    kec.kelurahan.map(kel => ({
      kecamatan: kec.nama,
      kelurahan: kel.nama,
      kode: kel.kode
    }))
  );
};
