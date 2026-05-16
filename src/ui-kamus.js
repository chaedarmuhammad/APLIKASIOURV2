// ========== KAMUS KATEGORI MODULE ==========
// Category dictionary with organized vocabulary by type.
// Depends on: utils.js (escapeHtml), storage.js (lsGet, lsSet), srs.js (wordKey, srsGet)

'use strict';

// ========== KAMUS KATEGORI ==========

let kamusActiveCat = 'Kata Kerja';
let kamusCoreOnly = false;
// Track which sub-sections are open (by key)
let kamusOpenSections = {};

const KAMUS_CATS = [
  { key: 'Kata Kerja',      icon: '🏃', label: 'Kata Kerja' },
  { key: 'Kata Sifat',      icon: '✨', label: 'Kata Sifat' },
  { key: 'Kata Benda',      icon: '📦', label: 'Kata Benda' },
  { key: 'Ekspresi',        icon: '💬', label: 'Ekspresi' },
  { key: 'Kata Keterangan', icon: '🔄', label: 'Keterangan' },
  { key: 'Kata Tanya',      icon: '❓', label: 'Kata Tanya' },
  { key: 'Partikel',        icon: '🔗', label: 'Partikel' },
  { key: 'Konjungsi',       icon: '➕', label: 'Konjungsi' },
  { key: 'Kata Tunjuk',     icon: '👉', label: 'Kata Tunjuk' },
  { key: 'Posisi',          icon: '📍', label: 'Posisi' },
  { key: 'Angka',           icon: '🔢', label: 'Angka' },
];

// Sub-category definitions per main category
const KAMUS_SUBCAT = {
  'Kata Kerja': [
    {
      key: 'I', label: 'Golongan I — う動詞', icon: '①',
      color: '#38bdf8', badgeCls: 'grp-I',
      hint: [
        { ex: '<b>書き</b>ます' },{ ex: '<b>書き</b>ません' },{ ex: '<b>書き</b>ました' },{ ex: '<b>書いて</b>' },
      ],
      desc: 'Kata kerja yang berakhiran suara う sebelum ます. Pola て<ruby><rb>形</rb><rt>けい</rt></ruby>: く→いて, ぐ→いで, む/ぬ/ぶ→んで, つ/う/る→って, す→して.'
    },
    {
      key: 'II', label: 'Golongan II — る動詞', icon: '②',
      color: '#34d399', badgeCls: 'grp-II',
      hint: [
        { ex: '<b>食べ</b>ます' },{ ex: '<b>食べ</b>ません' },{ ex: '<b>食べ</b>ました' },{ ex: '<b>食べて</b>' },
      ],
      desc: 'Kata kerja berakhiran え/い sebelum ます. て<ruby><rb>形</rb><rt>けい</rt></ruby> dibentuk langsung dengan + て.'
    },
    {
      key: 'III', label: 'Golongan III — <ruby>不規則<rt>ふきそく</rt></ruby><ruby>動詞<rt>どうし</rt></ruby>', icon: '③',
      color: '#fbbf24', badgeCls: 'grp-III',
      hint: [
        { ex: '<b>します</b> / <b>しません</b> / <b>して</b>' },{ ex: '<b>きます</b> / <b>きません</b> / <b>きて</b>' },
      ],
      desc: 'Hanya dua kata kerja tidak beraturan: します dan きます.'
    },
    {
      key: null, label: 'Ekspresi Berverba', icon: '💡',
      color: '#9090b0', badgeCls: '', desc: ''
    },
  ],
  'Kata Sifat': [
    {
      key: 'い', label: 'Kata Sifat い — い形容詞', icon: 'い',
      color: '#f87171', badgeCls: 'grp-i',
      hint: [
        { ex: '<b>おおき</b>い' },{ ex: '<b>おおきく</b>ない' },{ ex: '<b>おおきか</b>った' },{ ex: '<b>おおきく</b> なる' },
      ],
      desc: 'Berakhiran い. Negatif: ~くない. Lampau: ~かった. Lampau negatif: ~くなかった. Memodifikasi KK: ~く.'
    },
    {
      key: 'な', label: 'Kata Sifat な — な形容詞', icon: 'な',
      color: '#c084fc', badgeCls: 'grp-na',
      hint: [
        { ex: '<b>きれい</b>な' },{ ex: '<b>きれい</b>じゃない' },{ ex: '<b>きれい</b>でした' },{ ex: '<b>きれいに</b> なる' },
      ],
      desc: 'Memerlukan な saat memodifikasi kata benda. Negatif: ~じゃない. Lampau: ~でした. Memodifikasi KK: ~に.'
    },
    {
      key: null, label: 'Lainnya', icon: '—',
      color: '#9090b0', badgeCls: '', desc: ''
    },
  ],
  'Kata Benda': [
    { key: '__orang__',       label: 'Orang, Profesi & Keluarga',          icon: '👤', color: '#38bdf8' },
    { key: '__tubuh__',       label: 'Anggota Tubuh',                       icon: '🫀', color: '#f87171' },
    { key: '__waktu__',       label: 'Waktu & Kalender',                    icon: '📅', color: '#fbbf24' },
    { key: '__tempat__',      label: 'Tempat, Gedung & Kota',               icon: '🗺️', color: '#34d399' },
    { key: '__transport__',   label: 'Transportasi & Perjalanan',           icon: '🚆', color: '#2dd4bf' },
    { key: '__benda__',       label: 'Benda & Peralatan Sehari-hari',       icon: '🔧', color: '#f472b6' },
    { key: '__pakaian__',     label: 'Pakaian & Aksesori',                  icon: '👕', color: '#c084fc' },
    { key: '__makanan__',     label: 'Makanan & Minuman',                   icon: '🍱', color: '#fb923c' },
    { key: '__alam__',        label: 'Alam, Cuaca & Hewan',                 icon: '🌿', color: '#a78bfa' },
    { key: '__bahasa__',      label: 'Bahasa, Pendidikan & Komunikasi',     icon: '📖', color: '#22d3ee' },
    { key: '__aktivitas__',   label: 'Aktivitas, Hobi & Acara',             icon: '🎭', color: '#818cf8' },
    { key: '__kesehatan__',   label: 'Kesehatan & Medis',                   icon: '🏥', color: '#4ade80' },
  ],
  'Ekspresi': [
    { key: '__eks_salam__',   label: 'Salam, Sapaan & Ungkapan Sopan', icon: '👋', color: '#38bdf8' },
    { key: '__eks_respon__',  label: 'Respon & Konfirmasi',             icon: '✅', color: '#34d399' },
    { key: '__eks_suffix__',  label: 'Akhiran & Pola Bilangan',         icon: '🔢', color: '#fbbf24' },
    { key: '__eks_kondisi__', label: 'Kondisi Tubuh & Kesehatan',       icon: '🏥', color: '#f87171' },
    { key: '__eks_situasi__', label: 'Situasi & Percakapan Umum',       icon: '💬', color: '#c084fc' },
    { key: '__eks_kegiatan__',label: 'Kegiatan & Tindakan',             icon: '🏃', color: '#60a5fa' },
  ],
  'Kata Keterangan': [
    { key: '__ket_frek__',    label: 'Frekuensi',                       icon: '🔁', color: '#38bdf8' },
    { key: '__ket_derajat__', label: 'Derajat & Intensitas',            icon: '📈', color: '#f87171' },
    { key: '__ket_waktu__',   label: 'Waktu & Urutan',                  icon: '⏱️', color: '#fbbf24' },
    { key: '__ket_cara__',    label: 'Cara & Kondisi',                  icon: '⚙️', color: '#34d399' },
    { key: '__ket_kepastian__',label: 'Kepastian & Kemungkinan',        icon: '🎯', color: '#a78bfa' },
  ],
  'Kata Tanya': [
    { key: '__orang_tanya__', label: 'Menanyakan Orang',             icon: '👤', color: '#38bdf8' },
    { key: '__benda_tanya__', label: 'Menanyakan Benda & Hal',       icon: '❓', color: '#34d399' },
    { key: '__tempat_tanya__',label: 'Menanyakan Tempat',            icon: '📍', color: '#fbbf24' },
    { key: '__waktu_tanya__', label: 'Menanyakan Waktu & Tanggal',   icon: '📅', color: '#fb923c' },
    { key: '__jumlah_tanya__',label: 'Menanyakan Jumlah & Harga',    icon: '🔢', color: '#a78bfa' },
    { key: '__cara_tanya__',  label: 'Menanyakan Cara & Keadaan',    icon: '⚙️', color: '#c084fc' },
  ],
  'Angka': [
    { key: '__satuan__',  label: 'Satuan Dasar (hyaku, sen, man)',   icon: '💯', color: '#38bdf8' },
    { key: '__bulan__',   label: 'Nama Bulan (～月)',                icon: '📅', color: '#34d399' },
    { key: '__tanggal__', label: 'Tanggal (～日)',                   icon: '🗓️', color: '#fbbf24' },
    { key: '__hitung__',  label: 'Kata Bantu Bilangan',              icon: '🔢', color: '#f472b6' },
    { key: '__lain_ang__',label: 'Lainnya',                          icon: '🔣', color: '#60a5fa' },
  ],
  'Kata Tunjuk': [
    { key: '__benda_tj__', label: 'Menunjuk Benda (これ/それ/あれ)',  icon: '📦', color: '#38bdf8' },
    { key: '__ktbenda_tj__',label: 'Menunjuk Kata Benda (この/その/あの)', icon: '🏷️', color: '#34d399' },
    { key: '__tempat_tj__', label: 'Menunjuk Tempat (ここ/そこ/あそこ)', icon: '📍', color: '#fbbf24' },
  ],
  'Posisi': [
    { key: '__vertikal__', label: 'Vertikal (atas/bawah)',           icon: '↕️', color: '#38bdf8' },
    { key: '__horizontal__',label: 'Horizontal (depan/belakang/kanan/kiri)', icon: '↔️', color: '#34d399' },
    { key: '__relasi__',   label: 'Relasi & Jarak',                  icon: '🔍', color: '#fbbf24' },
  ],
  'Konjungsi': [
    { key: '__tambah__',   label: 'Penambahan & Urutan',             icon: '➕', color: '#38bdf8' },
    { key: '__kontras__',  label: 'Kontras & Pertentangan',          icon: '⚡', color: '#f87171' },
    { key: '__sebab__',    label: 'Sebab & Akibat',                  icon: '💡', color: '#fbbf24' },
  ],
  'Partikel': [
    { key: '__all_part__', label: 'Semua Partikel',                  icon: '🔗', color: '#7c6af7' },
  ],
};

// ---- KB sub-categorizer: lookup-table per romaji, fallback regex ----
const _KB_LOOKUP = (function() {
  const T = {};
  const add = (cat, list) => list.forEach(r => { T[r] = cat; });

  // ── ORANG, PROFESI & KELUARGA ──
  add('__orang__', [
    'watashi','anata','minasan','ano hito','namae',
    'boku',
    'isha','kaishain','gakusei','ginkōin','kenkyūsha','shain','sensei','yakuzaishi','kanja',
    'haisha',
    'tomodachi','kazoku','kare','kanojo',
    'chichi','haha','otōsan','okāsan',
    'ani','ane','otōto','imōto',
    'ryōshin','ojīsan','obāsan',
    'otōto san','imōto san','otoko no hito','onna no hito',
    'otoko no ko','onna no ko','kyōdai','onīsan','onēsan',
    'kodomo','okosan','otto','tsuma','goshujin','okusan',
    'hosuto famirī','gokazoku',
    'toshi ue','toshi shita',
  ]);

  // ── ANGGOTA TUBUH ──
  add('__tubuh__', [
    'karada','atama','kao','me','mimi','kuchi',
    'kubi','yubi','tsume','onaka','senaka','ashi',
    'nodo',
  ]);

  // ── WAKTU & KALENDER ──
  add('__waktu__', [
    'asa','hiru','yoru','gozen','gogo','ima',
    'ototoi','kinō','kyō','ashita','asatte','kesa','konban',
    'maiasa','maiban','mainichi',
    'senshū','konshū','raishū',
    'sengetsu','kongetsu','raigetsu',
    'kyonen','kotoshi','rainen',
    'getsuyōbi','kayōbi','suiyōbi','mokuyōbi','kinyōbi','doyōbi','nichiyōbi',
    'shūmatsu','jikan','yasumi','hiruyasumi',
    'tanjōbi','oshōgatsu','haha no hi','kurisumasu',
  ]);

  // ── TEMPAT, GEDUNG & KOTA ──
  add('__tempat__', [
    'uchi','mise','kaisha','kanpanī','gakkō','daigaku','byōin',
    'resutoran','hoteru','sūpā','kōen','konbini',
    'kyōshitsu','shokudō','uketsuke','robī','heya','toire',
    'kaidan','erebētā','esukarētā','uriba','depāto','ginkō',
    'yūbinkyoku','toshokan','bijutsukan','biyōin','ryō','jimusho',
    'jimu shitsu','kissaten','izakaya','onsen','pūru',
    'shiyakusho','taishikan','nihongo gakkō','hanaya',
    'otera','kinkakuji',
    'machi','tokoro','biru',
    'indoneshia','nihon','kankoku','chūgoku','igirisu','furansu',
    'shingapōru','burajiru','amerika','firipin','betonamu','myānmā',
    'taiwan','gaikoku','sekai',
    'ōsaka','hiroshima','kyōto','hokkaidō','akihabara','shibuya',
    'shinjuku','ikebukuro','ueno','shinbashi','nagano ken','nyū yōku',
    'jakarta','fukuoka',
    'ken','(o)kuni','(go)shusshin',
    'yama','umi','eberesuto','fuji san',
  ]);

  // ── TRANSPORTASI & PERJALANAN ──
  add('__transport__', [
    'densha','hikōki','fune','basu','takushī','jitensha',
    'chikatetsu','shinkansen','baiku','jidōsha','eki','kūkō',
    'noriba','jei āru','pasupōto','biza','chizu','jūsho','michi','shingō',
    'kōtsū','rasshu','sūtsukēsu','chiketto','kippu','nimotsu',
    'shītoberto',
  ]);

  // ── PAKAIAN & AKSESORI ──
  add('__pakaian__', [
    'kutsu','nekutai','shatsu','tī shatsu','kōto','sūtsu',
    'sētā','bōshi','megane','saifu','kaban','kasa','kimono','saizu','fuku',
    'kutsushita','tebukuro','hankachi','yubiwa','zubon','yōfuku','taoru',
  ]);

  // ── MAKANAN & MINUMAN ──
  add('__makanan__', [
    'gohan','asagohan','hirugohan','bangohan','pan',
    'niku','sakana','yasai','kudamono','tamago','shio','satō',
    'mizu','ocha','kōcha','jūsu','bīru','kēki','wain',
    'bentō','(o)bentō','hanbāgā','kukkī','chokoreeto','kōhī','gyūnyū','miruku',
    'gyūdon','aisukurīmu','tenpura','nihonshu','yakisoba','okonomiyaki',
    '(o)sake','tabemono','nomimono','ryōri','nihon ryōri','okinawa no ryōri',
    'hashi','supūn','fōku','naifu','osara',
    'ringo','mikan',
    '(go)chūmon','(o)kashi',
  ]);

  // ── ALAM, CUACA & HEWAN ──
  add('__alam__', [
    'hare','ame','yuki','kumori','tenki','kisetsu',
    'haru','natsu','aki','fuyu',
    'jishin',
    'dōbutsu','zō','uma','inu','neko',
    'ki','midori','eda',
  ]);

  // ── BAHASA, PENDIDIKAN & KOMUNIKASI ──
  add('__bahasa__', [
    'nihongo','eigo','taigo','gaikokugo',
    'kanji','hiragana','katakana','kotoba','bunpō',
    'yomikata','hatsuon','imi',
    'hon','jisho','shinbun','zasshi','nōto','meishi','kādo',
    'shiken','tesuto','shukudai','tegami','mēru','mēru adoresu',
    'shashin','eiga','ongaku','dī bī dī','shī dī','repōto','sakubun',
    'shiryō','pen','senmon','bangō annai','denwa bangō','denwa',
    'nyūsu','supīchi','iken','anaunsu','nikki',
    'shōgakkō','chūgakkō','kōkō','ai-tī','uta','e','ji',
    'horā eiga',"ren'ai eiga",'rekishi',
    'rekishi','kurashikku','kurasu','jugyō',
    'igaku',
  ]);

  // ── AKTIVITAS, HOBI & ACARA ──
  add('__aktivitas__', [
    'ryokō','pātī','omatsuri','sakkā','tenisu',
    'basukettobōru','sukī','yoga','sumō','tsuri','gādeningu',
    '(o)hanami','keiken','kaigi','yakusoku','purezento','omiyage',
    'shumi','arubaito','risō','konsāto','karaoke','dansu','yakyū',
    'kabuki','ikebana','piano','gitā','gakki','supōtsu','kaimono',
    'junbi','yōji','benkyō','(o)mimai',
  ]);

  // ── KESEHATAN & MEDIS ──
  add('__kesehatan__', [
    'kaze','netsu','kusuri','byōki',
    '(kenkō) hokenshō','ofuro','shawā','chōshi','guai',
  ]);

  // ── BENDA & PERALATAN SEHARI-HARI (sisa yang tidak masuk kategori lain) ──
  add('__benda__', [
    'enpitsu','bōrupen','shāpu penshiru','kagi','tokei',
    'terebi','kamera','keitai denwa','pasokon','tsukue','isu',
    'hasami','hotchikisu','serotēpu','keshigomu','tsumekiri',
    'hako','doa','mado','suicchi','reizōko','tēburu','beddo',
    'tana','denchi','mono','ē tī emu','kopī ki','jidōhanbaiki',
    'denshi renji','eakon','denkiseihin','botan','kikai','oto',
    'fūtō','kitte','hagaki','jūminhyō','sābisu','chippu',
    'okane','genkin','komakai okane','kurejittokādo','nedan','yachin',
    'seikatsu','(o)shigoto','mondai','kotae','hajime','owari',
    'keizai','tabako','jinkō',
  ]);

  return T;
})();

function kbSubCat(word) {
  const rom = word.rom.toLowerCase().trim();
  const id  = word.id.toLowerCase().trim();

  // 1. Exact lookup
  if (_KB_LOOKUP[rom]) return _KB_LOOKUP[rom];

  // 2. Disambiguasi kata ambigu berdasarkan id
  if (rom === 'hana')  return id.includes('hidung') ? '__tubuh__' : '__alam__';
  if (rom === 'kami')  return id.includes('rambut') ? '__tubuh__' : '__benda__';
  if (rom === 'te')    return id.includes('tangan') ? '__tubuh__' : '__benda__';
  if (rom === 'ha')    return id.includes('gigi') ? '__tubuh__' : '__alam__';

  // 3. Partial match romaji untuk nama kota/stasiun/prefektur
  if (/eki$|eki /.test(rom)) return '__transport__';
  if (/ken$/.test(rom))       return '__tempat__';

  // 4. Fallback berbasis id (Indonesia)
  if (/\btubuh\b|kepala|rambut|wajah|muka|\bmata\b|telinga|hidung|\bmulut\b|\bgigi\b|(?<!sarung )\btangan\b|(?<!kaus )\bkaki\b|perut|\bbadan\b|tenggorokan/.test(id)) return '__tubuh__';
  if (/(?<!ilmu ke)dokter|apoteker|guru|siswa|mahasiswa|pegawai|karyawan|peneliti|pasien|(?<!kerumunan |jumlah besar; |menjenguk )orang\b|wanita|pria|\banak\b|kakak|adik|\bayah\b|\bibu\b|teman|keluarga|saudara|kakek|nenek|istri|suami|\bsaya\b|\banda\b/.test(id)) return '__orang__';
  if (/\bpagi\b|\bsiang\b|\bmalam\b|hari ini|kemarin|besok|sekarang|senin|selasa|rabu|kamis|jumat|sabtu|\bminggu\b|akhir pekan|ulang tahun|setiap/.test(id)) return '__waktu__';
  if (/kereta|pesawat|kapal|\bbus\b|taksi|sepeda|bandara|paspor|koper|transportasi/.test(id)) return '__transport__';
  if (/sekolah|universitas|kantor|rumah sakit|perpustakaan|museum|gedung kesenian|negara|negeri|kota|kuil|luar negeri/.test(id)) return '__tempat__';
  if (/sepatu|dasi|kemeja|\bkaus\b|jaket|sweter|topi\b|kacamata|dompet|\btas\b|payung|pakaian|kimono|kaus kaki|sarung tangan|saputangan|celana|cincin|handuk/.test(id)) return '__pakaian__';
  if (/\bnasi\b|\broti\b|daging\b|\bikan\b|telur\b|susu\b|kopi\b|\bteh\b|\bbir\b|\bjus\b|\bair\b|\bkue\b|makanan|minuman|masakan|sarapan|makan siang|makan malam/.test(id)) return '__makanan__';
  if (/hujan|salju|cerah|berawan|cuaca|gempa|hewan|binatang|anjing|kucing|pohon|bunga|musim semi|musim panas|musim gugur|musim dingin/.test(id)) return '__alam__';
  if (/\bsakit\b|demam|\bflu\b|\bobat\b|asuransi|shower|bak mandi|kondisi/.test(id)) return '__kesehatan__';
  if (/bahasa|tata bahasa|ujian|sejarah|\bfilm\b|\bmusik\b|\blagu\b|koran|berita|pidato|pendapat|pengucapan|arti\b|pelajaran|silabus/.test(id)) return '__bahasa__';
  if (/wisata|festival|olahraga|konser|hobi|\brapat\b|janji\b|hadiah|pengalaman|\bbelajar\b|memancing|berkebun|berkebun/.test(id)) return '__aktivitas__';

  return '__benda__';
}

// ---- Ekspresi sub-categorizer (lookup-table) ----
const _EKS_LOOKUP = (function() {
  const T = {};
  const add = (cat, list) => list.forEach(r => { T[r] = cat; });

  // Salam, Sapaan & Ungkapan Sopan
  add('__eks_salam__', [
    'hajimemashite','dōzo, yoroshiku onegai shimasu','shitsurei desu ga',
    '(dōmo) arigatō gozaimasu','anō','dōzo',
    '(dōmo) arigatō gozaimashita','omedetō gozaimasu',
    'moshi moshi','onegai shimasu','odaiji ni','okage sama de',
  ]);

  // Respon & Konfirmasi
  add('__eks_respon__', [
    'hai','iie','chigaimasu','sō desu','sō desu ka','sō desu ne',
    'kashikomarimashita','daijōbu','yokatta desu ne','zannen desu',
    'taihen desu ne','ii desu ne','suteki desu ne','genki desu',
    'un','uun','dō shitara ii desu ka',
  ]);

  // Akhiran & Pola Bilangan
  add('__eks_suffix__', [
    '~san','~jin','~sai','~kai','~go','~en',
    '~ji','~fun','~jikanme','~jikan','~shūkan','~kagetsu','~nen',
    '~kai','~no hō ga','~senchi','~mētoru','~gurai','~kata',
    'mō~','~kun','~kedo','~nengō','~made ni','~dake',
    '~o misete kudasai','~kara kimashita','~wa ikaga desu ka',
    '~no toki','~ni tsuite','han',
  ]);

  // Kondisi Tubuh & Kesehatan
  add('__eks_kondisi__', [
    'kaze o hikimasu','~ga itai desu','netsu ga arimasu',
    'seki ga demasu','shokuyoku ga arimasen','kimochi ga warui desu',
    'atama ga itai desu','onaka ga itai desu',
    'se ga takai','se ga hikui','chōshi ga ii','chōshi ga warui',
    'onaka ga sukimashita','onaka ga ippai desu',
  ]);

  // Kegiatan & Tindakan
  add('__eks_kegiatan__', [
    'aruite','omochi kaeri','piano no renshū',
    'ha o migakimasu','te o araimasu','ki o tsukemasu',
    'tanoshiku narimasu','jōzu ni narimasu','shōgakkō ni hairu',
    'issho ni','minna de',
  ]);

  // Situasi & Percakapan Umum — semua sisanya
  add('__eks_situasi__', [
    'onamae wa?','sochira','hitori de','tsugi no',
    'nani mo~nai','nanika','kore kara','dochira no goshusshin desu ka',
    'okaikei','betsubetsu ni','hajimete','doko ka',
    'kondo','dō shimashita ka','ni san nichi','shikashi',
    'kono aida','~nengō','zenbu','jibun de',
    "kin'en",'desu kara',
    'hoka ni','boku',
  ]);

  return T;
})();

function ekspresiSubCat(word) {
  const rom = word.rom.toLowerCase().trim();
  if (_EKS_LOOKUP[rom]) return _EKS_LOOKUP[rom];

  const id = word.id.toLowerCase();

  // Fallback berbasis id
  if (/perkenalkan|salam kenal|terima kasih|permisi|halo|selamat|maaf|tolong\b|semoga lekas/.test(id)) return '__eks_salam__';
  if (/iya\b|tidak\b|bukan|betul|tepat|mengerti|begitu ya|baik ya|bagus ya|syukur|sayang sekali|tidak apa-apa/.test(id)) return '__eks_respon__';
  if (/akhiran|imbuhan|~ |〜|kata bantu|bahasa ~|lantai ~|pukul ~|jam ~|menit|yen|sentimeter|meter|kali\b|minggu|bulan|tahun|setengah|hanya|sekitar ~|cara ~|sampai dengan|ketika ~|apakah anda|mengenai ~/.test(id)) return '__eks_suffix__';
  if (/sakit|demam|batuk|lapar|kenyang|nafsu makan|merasa sakit|sakit kepala|sakit perut|tinggi|pendek|masuk angin|dalam kondisi/.test(id)) return '__eks_kondisi__';
  if (/berjalan|gosok|cuci|bawa pulang|latihan|bersama|hati-hati|menjadi mahir|menjadi menyenangkan|masuk sekolah/.test(id)) return '__eks_kegiatan__';
  return '__eks_situasi__';
}

// ---- Kata Keterangan sub-categorizer (lookup-table) ----
const _KET_LOOKUP = (function() {
  const T = {};
  const add = (cat, list) => list.forEach(r => { T[r] = cat; });

  // Frekuensi
  add('__ket_frek__', [
    'itsumo','tokidoki','yoku','zenzen','nakanaka',
    'ichido','ichido mo',
  ]);

  // Derajat & Intensitas
  add('__ket_derajat__', [
    'totemo','amari','takusan','sukoshi','ichiban ~',
    'zutto','mō sukoshi','sonna ni','zehi','hontō ni',
  ]);

  // Waktu & Urutan
  add('__ket_waktu__', [
    'mō','mada','saikin','sugu','mata','ato de',
    'mazu','tsugi ni','mō sugu','dandan',
  ]);

  // Cara & Kondisi
  add('__ket_cara__', [
    'daitai','hayaku','toku ni','yukkuri','massugu',
  ]);

  // Kepastian & Kemungkinan
  add('__ket_kepastian__', [
    'tabun','kitto','mochiron',
  ]);

  return T;
})();

function keteranganSubCat(word) {
  const rom = word.rom.toLowerCase().trim();
  if (_KET_LOOKUP[rom]) return _KET_LOOKUP[rom];

  const id = word.id.toLowerCase();
  if (/selalu|kadang|sering|jarang|tidak pernah|sekali\b|tiap|setiap|biasanya|pernah/.test(id)) return '__ket_frek__';
  if (/sangat|terlalu|paling\b|jauh lebih|sedikit lagi|sungguh|benar-benar|sama sekali|tidak terlalu/.test(id)) return '__ket_derajat__';
  if (/sudah|belum|nanti|segera|langsung|kemudian|pertama-tama|selanjutnya|lagi\b|akhir-akhir|bertahap/.test(id)) return '__ket_waktu__';
  if (/pelan|cepat|lurus|kira-kira|terutama|khususnya/.test(id)) return '__ket_cara__';
  if (/mungkin|pasti|yakin|tentu saja/.test(id)) return '__ket_kepastian__';
  return '__ket_cara__';
}

// ---- Kata Tanya sub-categorizer (lookup-table) ----
const _TANYA_LOOKUP = {
  // Orang
  'dare':'__orang_tanya__','nan sai':'__orang_tanya__','oikutsu':'__orang_tanya__',
  // Benda & Hal
  'nan':'__benda_tanya__','nani':'__benda_tanya__','donna ~':'__benda_tanya__',
  'dore':'__benda_tanya__','dono~':'__benda_tanya__',
  // Tempat
  'doko':'__tempat_tanya__','dochira':'__tempat_tanya__',
  // Waktu & Tanggal
  'nan yōbi':'__waktu_tanya__','nanji':'__waktu_tanya__','nanpun':'__waktu_tanya__',
  'itsu':'__waktu_tanya__','nangatu':'__waktu_tanya__','nanichi':'__waktu_tanya__',
  // Jumlah & Harga
  'ikura':'__jumlah_tanya__','ikutsu':'__jumlah_tanya__',
  'dono gurai':'__jumlah_tanya__','nan gai':'__jumlah_tanya__',
  // Cara & Keadaan
  'dō':'__cara_tanya__','dōshite':'__cara_tanya__','dō yatte':'__cara_tanya__',
};
function kataTanyaSubCat(word) {
  const rom = word.rom.toLowerCase().trim();
  if (_TANYA_LOOKUP[rom]) return _TANYA_LOOKUP[rom];
  const id = word.id.toLowerCase();
  if (/siapa|nama/.test(id)) return '__orang_tanya__';
  if (/di mana|sebelah mana/.test(id)) return '__tempat_tanya__';
  if (/kapan|hari apa|jam berapa|berapa menit|bulan apa|tanggal|berapa hari/.test(id)) return '__waktu_tanya__';
  if (/berapa|harga|banyak|lama|lantai berapa/.test(id)) return '__jumlah_tanya__';
  if (/bagaimana|cara|keadaan|kenapa/.test(id)) return '__cara_tanya__';
  return '__benda_tanya__';
}

// ---- Angka sub-categorizer (lookup-table) ----
const _ANGKA_LOOKUP = {
  // Satuan dasar
  'hyaku':'__satuan__','sen':'__satuan__','man':'__satuan__',
  // Nama Bulan
  'ichigatsu':'__bulan__','nigatsu':'__bulan__','sangatsu':'__bulan__',
  'shigatsu':'__bulan__','gogatsu':'__bulan__','rokugatsu':'__bulan__',
  'shichigatsu':'__bulan__','hachigatsu':'__bulan__','kugatsu':'__bulan__',
  'juugatsu':'__bulan__','juuichigatsu':'__bulan__','juunigatsu':'__bulan__',
  // Tanggal
  'tsuitachi':'__tanggal__','futsuka':'__tanggal__','mikka':'__tanggal__',
  'yokka':'__tanggal__','itsuka':'__tanggal__','muika':'__tanggal__',
  'nanoka':'__tanggal__','youka':'__tanggal__','kokonoka':'__tanggal__',
  'tooka':'__tanggal__','juuyokka':'__tanggal__','hatsuka':'__tanggal__',
  'nijuuyokka':'__tanggal__',
  // Kata bantu bilangan & menghitung
  'hitotsu':'__hitung__','futatsu':'__hitung__','mittsu':'__hitung__',
  'yottsu':'__hitung__','itsutsu':'__hitung__','muttsu':'__hitung__',
  'nanatsu':'__hitung__','yattsu':'__hitung__','kokonotsu':'__hitung__',
  'tō':'__hitung__','hitori':'__hitung__','futari':'__hitung__',
  '~nin':'__hitung__','~dai':'__hitung__','~mai':'__hitung__',
};
function angkaSubCat(word) {
  const rom = word.rom.toLowerCase().trim();
  if (_ANGKA_LOOKUP[rom]) return _ANGKA_LOOKUP[rom];
  const id = word.id.toLowerCase();
  if (/januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember/.test(id)) return '__bulan__';
  if (/tanggal/.test(id)) return '__tanggal__';
  if (/seratus|seribu|sepuluh ribu/.test(id)) return '__satuan__';
  if (/buah|orang|lembar|unit|ekor|batang|pasang|kata bantu/.test(id)) return '__hitung__';
  return '__lain_ang__';
}

// ---- Kata Tunjuk sub-categorizer ----
function kataTunjukSubCat(word) {
  const jp = word.jp.replace(/<[^>]+>/g,'');
  const id = word.id.toLowerCase();
  // これ/それ/あれ — standalone pronouns
  if (/ini \(dekat pembicara\)|itu \(dekat lawan|itu \(jauh/.test(id) && !/~ ini|~ itu|di sini|di situ|di sana|sebelah/.test(id)) return '__benda_tj__';
  // この/その/あの — modifiers
  if (/~ ini|~ itu/.test(id)) return '__ktbenda_tj__';
  // ここ/そこ/あそこ/こちら/そちら/あちら
  if (/di sini|di situ|di sana|sebelah sini|sebelah situ|sebelah sana/.test(id)) return '__tempat_tj__';
  return '__benda_tj__';
}

// ---- Posisi sub-categorizer ----
function posisiSubCat(word) {
  const id = word.id.toLowerCase();
  if (/atas|bawah/.test(id)) return '__vertikal__';
  if (/depan|belakang|kanan|kiri|dalam|luar/.test(id)) return '__horizontal__';
  return '__relasi__';
}

// ---- Konjungsi sub-categorizer ----
function konjungsiSubCat(word) {
  const id = word.id.toLowerCase();
  if (/karena|sebab/.test(id)) return '__sebab__';
  if (/tetapi|tapi|namun/.test(id)) return '__kontras__';
  return '__tambah__';
}
function dedupeWords(words) {
  const seen = new Set();
  return words.filter(k => {
    const key = k.jp.replace(/<[^>]+>/g,'').trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ---- Smart Thematic Sort ----
// Groups words by semantic clusters: antonyms, countries, animals, seasons, etc.
// Words in the same cluster are placed together for easier learning.

const _THEMATIC_GROUPS = (function() {
  // Each entry: [groupId, romaji...]
  // Words in the same group get the same groupId and are sorted together.
  const G = {};
  let gid = 0;
  function grp(...roms) {
    const id = gid++;
    roms.forEach(r => { const k=r.toLowerCase(); if(G[k]===undefined) G[k]=id; });
  }

  // ── KATA SIFAT: Pasangan antonim ──
  grp('ōkii','chiisai');                           // besar/kecil
  grp('takai','hikui','yasui');                    // tinggi/rendah/murah
  grp('nagai','mijikai');                          // panjang/pendek
  grp('hiroi','semai');                            // luas/sempit
  grp('omoi','karui');                             // berat/ringan
  grp('atarashii','furui');                        // baru/lama
  grp('ii (yoi)','warui');                         // bagus/buruk
  grp('hayai','osoi');                             // cepat/lambat
  grp('atsui/atsui','samui','tsumetai');           // panas/dingin
  grp('atatakai','suzushii');                      // hangat/sejuk
  grp('akai','aoi','kiiroi','shiroi','kuroi','chairoi'); // warna
  grp('oishii','mazui');                           // enak/tidak enak
  grp('nigiyaka (na)','shizuka (na)');             // ramai/sunyi
  grp('tanoshii','tsumaranai');                    // menyenangkan/membosankan
  grp('muzukashii','yasashii');                    // sulit/mudah
  grp('omoshiroi','tsumaranai');                   // menarik/membosankan
  grp('kirei (na)','kitanai');                     // cantik/kotor
  grp('genki (na)','isogashii','hima (na)');       // sehat/sibuk/senggang
  grp('jōzu (na)','heta (na)');                    // pandai/tidak pandai
  grp('suki (na)','kirai (na)');                   // suka/tidak suka
  grp('tōi','chikai');                             // jauh/dekat
  grp('akarui','kurai');                           // terang/gelap
  grp('hansamu (na)','shinsetsu (na)');            // tampan/baik hati

  // ── KATA BENDA: Negara & wilayah (urut abjad romaji) ──
  grp('nihon','indoneshia','kankoku','chūgoku','igirisu','furansu',
      'shingapōru','burajiru','amerika','firipin','betonamu','myānmā',
      'taiwan','gaikoku','sekai');

  // ── Hewan ──
  grp('dōbutsu','inu','neko','uma','zō');

  // ── Musim (semi → panas → gugur → dingin) ──
  grp('haru','natsu','aki','fuyu');

  // ── Cuaca ──
  grp('tenki','hare','ame','yuki','kumori');

  // ── Anggota keluarga (generasi tua → muda) ──
  grp('kazoku','ryōshin','ojīsan','obāsan',
      'chichi','otōsan','haha','okāsan',
      'ani','onīsan','ane','onēsan',
      'otto','tsuma','goshujin','okusan',
      'otōto','otōto san','imōto','imōto san',
      'kodomo','okosan','gokazoku');

  // ── Anggota tubuh (atas → bawah) ──
  grp('atama','kao','me','mimi','hana','kuchi','ha','kubi',
      'karada','te','yubi','onaka','senaka','ashi','tsume');

  // ── Alat kebersihan/perawatan ──
  grp('tsumekiri','hasami','hotchikisu','serotēpu','keshigomu');

  // ── Makanan pokok ──
  grp('gohan','pan','niku','sakana','yasai','kudamono','tamago');
  // ── Minuman ──
  grp('mizu','ocha','kōcha','kōhī','jūsu','gyūnyū','miruku','bīru','wain');
  // ── Waktu makan ──
  grp('asagohan','hirugohan','bangohan');

  // ── Hari dalam seminggu (Senin → Minggu) ──
  grp('getsuyōbi','kayōbi','suiyōbi','mokuyōbi','kinyōbi','doyōbi','nichiyōbi','shūmatsu');

  // ── Waktu relatif: hari (kemarin lusa → lusa) ──
  grp('ototoi','kinō','kyō','ashita','asatte');
  // ── Waktu relatif: minggu ──
  grp('senshū','konshū','raishū');
  // ── Waktu relatif: bulan ──
  grp('sengetsu','kongetsu','raigetsu');
  // ── Waktu relatif: tahun ──
  grp('kyonen','kotoshi','rainen');
  // ── Bagian hari ──
  grp('asa','gozen','hiru','gogo','yoru','kesa','konban');

  // ── Transportasi ──
  grp('densha','chikatetsu','shinkansen','basu','takushī',
      'jitensha','baiku','jidōsha','hikōki','fune');

  // ── Profesi ──
  grp('sensei','gakusei','isha','kaishain','ginkōin',
      'kenkyūsha','shain','yakuzaishi','kanja');

  // ── Olahraga & hobi ──
  grp('sakkā','tenisu','basukettobōru','yakyū','sukī','yoga','sumō','tsuri','gādeningu');

  // ── Alat tulis ──
  grp('enpitsu','bōrupen','pen','keshigomu','hasami','hotchikisu','serotēpu');

  // ── Pakaian & Aksesori ──
  grp('shatsu','tī shatsu','sūtsu','kōto','sētā','fuku','kutsu','kutsushita','bōshi','nekutai','kimono');

  // ── Posisi: vertikal ──
  grp('ue','shita');
  // ── Posisi: horizontal ──
  grp('mae','ushiro','migi','hidari','naka','soto');

  // ── Kata Kerja: pasangan tematik ──
  grp('ikimasu','kimasu','kaerimasu');     // pergi/datang/pulang
  grp('tabemasu','nomimasu');              // makan/minum
  grp('mimasu','kikimasu');               // melihat/mendengar
  grp('yomimasu','kakimasu');             // membaca/menulis
  grp('kaimasu','urimasu');               // membeli/menjual
  grp('akemasu','shimemasu');             // membuka/menutup
  grp('tsukemasu','keshimasu');           // menyalakan/mematikan
  grp('iremasu','dashimasu');             // memasukkan/mengeluarkan
  grp('agemasu','moraimasu','kuremasu');  // memberi/menerima
  grp('kashimasu','karimasu');            // meminjamkan/meminjam
  grp('hairimasu','demasu');              // masuk/keluar
  grp('norimasu','orimasu');              // naik/turun
  grp('imasu','arimasu');                 // ada (hidup/benda)
  grp('nemasu','okimasu');                // tidur/bangun
  grp('kimasu','nugimasu');               // memakai/melepas
  grp('oshiemasu','naraimasu');           // mengajar/belajar dari

  // ── Kata Kerja N4: Pasangan Transitif/Intransitif ──
  grp('akemasu','akimasu');               // membuka (tr) / terbuka (intr)
  grp('shimemasu','shimarimasu');         // menutup (tr) / tertutup (intr)
  grp('tsukemasu','tsukimasu');           // menyalakan (tr) / menyala (intr)
  grp('keshimasu','kiemasu');             // mematikan (tr) / padam (intr)
  grp('iremasu','hairimasu');             // memasukkan (tr) / masuk (intr)
  grp('dashimasu','demasu');              // mengeluarkan (tr) / keluar (intr)
  grp('hajimemasu','hajimarimasu');       // memulai (tr) / dimulai (intr)
  grp('owarimasu','owaru');              // mengakhiri/berakhir
  grp('naraemasu','narabimasu');         // menyusun (tr) / berbaris (intr)
  grp('tomemasu','tomarimasu');           // menghentikan (tr) / berhenti (intr)
  grp('atsumemasu','atsumarimasu');       // mengumpulkan (tr) / berkumpul (intr)
  grp('kaemasu','kawarimasu');            // mengubah (tr) / berubah (intr)
  grp('kowaremasu','kowashimasu');        // rusak (intr) / merusak (tr)
  grp('yogoremasu','yogoshimasu');        // kotor (intr) / mengotori (tr)
  grp('ochimasu','otoshimasu');           // jatuh (intr) / menjatuhkan (tr)
  grp('oremasu','orimasu');              // patah (intr) / mematahkan (tr)
  grp('waremasu','warimasu');            // pecah (intr) / memecahkan (tr)
  grp('kiremasu','kirimasu');            // terputus (intr) / memotong (tr)
  grp('nakunarimasu','nakushimasu');      // hilang (intr) / menghilangkan (tr)
  grp('taremasu','tarashimasu');          // menggantung
  grp('nuremasu','nurashimasu');          // basah (intr) / membasahi (tr)
  grp('yakemasu','yakimasu');             // terbakar (intr) / membakar (tr)
  grp('ugokimasu','ugokashimasu');        // bergerak (intr) / menggerakkan (tr)

  // ── Kata Kerja N4: Emosi & Perasaan ──
  grp('yorokobimasu','kanashimimasu');   // bergembira / bersedih
  grp('bikkuri shimasu','anshin shimasu'); // terkejut / lega
  grp('gakkari shimasu','yorokobimasu');  // kecewa / gembira
  grp('okoru','shikaru');                // marah / memarahi
  grp('waraimasu','nakimasu');           // tertawa / menangis
  grp('ureshii','kanashii');             // senang / sedih
  grp('hazukashii','hokori');            // malu / bangga

  // ── Kata Kerja N4: Komunikasi & Bicara ──
  grp('hanashimasu','iimasu');           // berbicara / berkata
  grp('kotaemasu','kikimasu');           // menjawab / bertanya
  grp('tsutaemasu','shirasemasu');       // menyampaikan / memberitahu
  grp('sōdan shimasu','setsumai shimasu'); // berkonsultasi / menjelaskan
  grp('homemasu','shikaru');             // memuji / memarahi
  grp('yobimasu','kotaemasu');           // memanggil / menjawab
  grp('tanomu','hikiukeru');             // meminta / menerima tugas

  // ── Kata Kerja N4: Gerakan Badan ──
  grp('tatsu','suwaru');                 // berdiri / duduk
  grp('arukimasu','hashirimasu');        // berjalan / berlari
  grp('tomarimasu','ugokimasu');         // berhenti / bergerak
  grp('agarimasu','sagarimasu');         // naik / turun
  grp('furimasu','tomaru');              // bergetar / berhenti
  grp('magarimasu','massugu ikimasu');   // berbelok / jalan lurus
  grp('wataru','tooru');                 // menyeberang / melewati

  // ── Kata Kerja N4: Kerja & Aktivitas ──
  grp('hatarakimasu','yasumimasu');       // bekerja / istirahat
  grp('tsutomemasu','yamemasu');          // bekerja di / berhenti
  grp('hajimemasu','owarimasu');          // memulai / mengakhiri
  grp('tsuzukemasu','yamemasu');          // melanjutkan / berhenti
  grp('ganbarimasu','akiramemasu');       // berusaha / menyerah
  grp('shippai shimasu','seikō shimasu'); // gagal / berhasil
  grp('susumiemasu','okuremasu');         // maju / terlambat

  // ── Kata Kerja N4: Rumah Sakit & Kesehatan ──
  grp('nyūin shimasu','taiin shimasu');   // masuk RS / keluar RS
  grp('nakunarimasu','umaremasu');        // meninggal / lahir
  grp('byōki ni narimasu','naorimasu');   // jatuh sakit / sembuh

  // ── Kata Kerja N4: Belajar & Pendidikan ──
  grp('oboeru','wasureru');              // mengingat / melupa
  grp('shirabemasu','mitukemasu');        // menyelidiki / menemukan
  grp('kangaemasu','kimemasu');           // berpikir / memutuskan
  grp('shitsumon shimasu','kotaemasu');   // bertanya / menjawab
  grp('goukaku shimasu','shippai shimasu'); // lulus / gagal

  // ── Kata Kerja N4: Memakai Pakaian (bagian tubuh) ──
  grp('kimasu','hakimasu','kaburimasu','kakemasu'); // baju/celana/topi/kacamata
  grp('kimasu','nugimasu');              // memakai / melepas (sudah ada di atas, diperkuat)

  // ── Kata Kerja N4: Membuat & Memperbaiki ──
  grp('tsukurimasu','naoshimasu');        // membuat / memperbaiki
  grp('kumitatemasu','barasimasu');       // merakit / membongkar
  grp('hatsumei shimasu','hakken shimasu'); // menciptakan / menemukan
  grp('sekkei shimasu','kensetsu shimasu'); // merancang / membangun

  // ── Kata Kerja N4: Perdagangan & Ekspor/Impor ──
  grp('yushutsu shimasu','yunyū shimasu'); // mengekspor / mengimpor
  grp('okuru','ukeru');                   // mengirim / menerima
  grp('todokemasu','uketorimasu');        // mengantarkan / menerima

  // ── Kata Kerja N4: Saklar & Perangkat ──
  grp('(dengen o) iremasu','(dengen o) kirimasu'); // menyalakan/mematikan daya
  grp('(kagi o) kakemasu','(kagi o) akemasu');     // mengunci / membuka kunci

  // ── Kata Kerja N4: Rumah Tangga ──
  grp('sentaku shimasu','sōji shimasu','ryōri shimasu'); // mencuci/membersihkan/memasak
  grp('katazukemasu','chirakashimasu');   // merapikan / mengacaukan
  grp('seiri shimasu','junbi shimasu');    // memilah / mempersiapkan

  // ── Kata Kerja N4: Sosial & Hubungan ──
  grp('au','wakareru');                   // bertemu / berpisah
  grp('kenka shimasu','nakanaori shimasu'); // bertengkar / berbaikan
  grp('kekkon shimasu','rikon shimasu');   // menikah / bercerai
  grp('sewa o shimasu','sodatemasu');      // mengurus / merawat

  // ── Kata Kerja N4: Cuaca & Alam ──
  grp('furimasu','yamuimasu');            // hujan turun / berhenti (hujan)
  grp('funka shimasu','jishin');          // meletus / gempa

  // ── Kata Kerja N4: Keuangan ──
  grp('haraimasu','azukemasu');           // membayar / menyimpan
  grp('oroshimasu','furikomomasu');       // menarik uang / mentransfer
  grp('tamemasu','tsukaimasu');           // menabung / menggunakan

  // ── Kata Benda N4: Bencana ──
  grp('jishin','taifū','kaji','jiko','tsunami','kaminari');

  // ── Kata Benda N4: Perasaan ──
  grp('kimochi','kibun','shimpai','anshin');

  // ── Kata Benda N4: Sekolah ──
  grp('shōgakkō','chūgakkō','kōkō','daigaku');

  // ── Kata Keterangan: frekuensi (selalu → tidak pernah) ──
  grp('itsumo','yoku','tokidoki','amari','zenzen');
  // ── Jumlah ──
  grp('takusan','sukoshi');
  // ── Sudah/belum ──
  grp('mō','mada');

  // ── Kata Sifat tambahan: pasangan & kluster ──
  grp('suki (na)','kirai (na)');                   // suka/tidak suka
  grp('jōzu (na)','heta (na)');                    // pandai/tidak pandai
  grp('genki (na)','hima (na)','isogashii');       // sehat/senggang/sibuk
  grp('ōi','sukunai');                             // banyak/sedikit
  grp('amai','karai','suppai','nigai');            // rasa: manis/pedas/asam/pahit
  grp('futoi','hosoi');                            // gemuk/tipis(kurus)
  grp('tsuyoi','yowai');                           // kuat/lemah
  grp('ureshii','sabishii');                       // senang/kesepian
  grp('hansamu (na)','kawaii','suteki (na)','kirei (na)'); // penampilan positif
  grp('shinsetsu (na)','taisetsu (na)');           // baik hati/penting
  grp('benri (na)','fuben na');                    // praktis/tidak praktis
  grp('ii (yoi)','warui');                         // bagus/buruk
  grp('shizuka (na)','nigiyaka (na)');             // sunyi/ramai
  grp('kantan (na)','muzukashii','yasashii');      // mudah/sulit
  grp('daijōbu (na)','abunai');                    // aman/berbahaya
  grp('wakai','toshi ue');                         // muda/lebih tua
  grp('atama ga ii','yōmei (na)');                // pintar/terkenal
  grp('nemui','hoshii');                           // mengantuk/menginginkan
  grp('sugoi','onaji');                            // menakjubkan/sama
  grp('taihen (na)','muzukashii');                 // berat/sulit - sudah ada muzukashii, taihen bergabung
  grp('yūmei (na)','suteki (na)');                 // terkenal/indah
  grp('iroiro (na)','onaji');                       // berbagai macam/sama
  grp('muda na','fuben na');                        // sia-sia/tidak praktis

  // ── Kata Kerja: Pergerakan & Perpindahan ──
  grp('arukimasu','hashirimasu','oyogimasu');       // berjalan/berlari/berenang
  grp('tachimasu','suwarimasu');                    // berdiri/duduk
  grp('isogimasu','machimasu');                     // terburu-buru/menunggu
  grp('motte ikimasu','motte kimasu');             // membawa pergi/membawa datang
  grp('tsurete ikimasu','tsurete kimasu');          // mengajak pergi/mengajak datang
  grp('dekakemasu','modorimasu','kaette kimasu');   // berangkat/kembali/pulang kembali
  grp('shuppatsu shimasu','tōchaku shimasu');       // berangkat/tiba
  grp('mukaimasu','(eki ni) tsukimasu');            // menuju/tiba
  grp('tōrimasu','(hashi o) watarimasu');          // lewat/menyeberang
  grp('(michi o) arukimasu','(michi o) hashirimasu'); // berjalan di jalan/berlari di jalan
  grp('(yama ni) noborimasu','(hoteru ni) tomarimasu'); // mendaki/menginap
  grp('norimasu','orimasu','norikaemasu');          // naik/turun/ganti kendaraan
  grp('(densha ni) norimasu','(densha o) orimasu','(densha ni) norikaemasu'); // naik kereta/turun/pindah

  // ── Kata Kerja: Memegang & Membawa ──
  grp('mochimasu','hakobimasu');                   // membawa/mengangkut
  grp('torimasu','watashimasu');                   // mengambil/menyerahkan
  grp('hiroimasu','otoshimasu');                   // memungut/menjatuhkan

  // ── Kata Kerja: Melihat & Mendengar ──
  grp('miemasu','kikoemasu');                      // terlihat/terdengar
  grp('misemasu','(sensei ni) kikimasu');           // menunjukkan/bertanya

  // ── Kata Kerja: Berbicara & Komunikasi ──
  grp('hanashimasu','iimasu','kotaemasu');          // berbicara/berkata/menjawab
  grp('denwa shimasu','(denwa o) kakemasu','renraku shimasu'); // menelepon/menghubungi
  grp('setsumei shimasu','shōkai shimasu','annai shimasu'); // menjelaskan/memperkenalkan/memandu
  grp('tanomimasu','sasoimasu','shōtai shimasu');   // meminta/mengundang/mengundang (formal)
  grp('yobimasu','okoshimasu');                    // memanggil/membangunkan
  grp('shikarimasu','chūi shimasu','homemasu');     // memarahi/memperingatkan/memuji

  // ── Kata Kerja: Membeli & Bayar ──
  grp('kaimasu','haraimasu','kaeshimasu');          // membeli/membayar/mengembalikan
  grp('chokin shimasu','okane');                    // menabung

  // ── Kata Kerja: Belajar & Pendidikan ──
  grp('benkyō shimasu','naraimasu','oshiemasu');    // belajar/belajar dari/mengajar
  grp('oboemasu','wasuremasu','omoidashimasu');     // menghafal/lupa/mengingat kembali
  grp('shirabemasu','sagashimasu','mitsukemasu');   // menyelidiki/mencari/menemukan
  grp('shitsumon shimasu','(shitsumon ni) kotaemasu'); // bertanya/menjawab
  grp('yoshū shimasu','fukushū shimasu','fukushū o shimasu'); // persiapan/ulangan/meninjau
  grp('renshū shimasu','undō shimasu');            // berlatih/berolahraga
  grp('(daigaku ni) nyūgaku shimasu','(daigaku o) sotsugyō shimasu'); // masuk univ/lulus
  grp('(daigaku ni) hairimasu','(daigaku o) demasu'); // masuk/lulus
  grp('(shiken o) ukemasu','(shiken ni) gōkaku shimasu','(shiken ni) ochimasu'); // ikut ujian/lulus/gagal
  grp('ryūgaku shimasu','shūshoku shimasu');       // belajar di LN/bekerja

  // ── Kata Kerja: Kerja & Rutinitas ──
  grp('hatarakimasu','yasumimasu','(kaisha o) yasumimasu'); // bekerja/istirahat/libur
  grp('shutchō shimasu','zangyō shimasu');         // perjalanan bisnis/lembur
  grp('kyūkei shimasu','sanpo shimasu');           // istirahat/jalan santai
  grp('sanka shimasu','(kaigi ni) shusseki shimasu'); // berpartisipasi/menghadiri
  grp('mōshikomimasu','yoyaku shimasu','kyanseru shimasu'); // mendaftar/reservasi/batal
  grp('okonaimasu','junbi shimasu','yōi shimasu'); // menyelenggarakan/mempersiapkan

  // ── Kata Kerja: Membuat & Memperbaiki ──
  grp('tsukurimasu','naoshimasu','kowashimasu');    // membuat/memperbaiki/merusak
  grp('tatemasu','sekkei shimasu');                 // membangun/merancang
  grp('hatsumei shimasu','hakken shimasu');         // menciptakan/menemukan

  // ── Kata Kerja: Membersihkan & Rumah Tangga ──
  grp('sentaku shimasu','sōji shimasu','katazukemasu'); // cuci/bersihkan/rapikan
  grp('araimasu','migakimasu','fukimasu');          // mencuci/menyikat/mengelap
  grp('sutemasu','shimaimasu');                     // membuang/menyimpan
  grp('harimasu','kakemasu','kazarimasu','narabemasu'); // tempel/gantung/hias/tata
  grp('uemasu','sodatemasu');                      // menanam/merawat

  // ── Kata Kerja: Memakai Pakaian ──
  grp('(shatsu o) kimasu','(kutsu o) hakimasu','(bōshi o) kaburimasu','(megane o) kakemasu'); // baju/sepatu/topi/kacamata
  grp('nugimasu','(kasa o) sashimasu','shītoberto o shimasu'); // melepas/payung/seat belt

  // ── Kata Kerja: Memasak & Makanan ──
  grp('yakimasu','mazemasu','wakashimasu','hiyashimasu'); // panggang/campur/didihkan/dinginkan
  grp('kawakashimasu','kawakimasu');                // mengeringkan/kering
  grp('tsutsumimasu','kirimasu');                  // membungkus/memotong

  // ── Kata Kerja: Kesehatan & Rumah Sakit ──
  grp('nyūin shimasu','taiin shimasu');             // masuk RS/keluar RS
  grp('(byōki ga) naorimasu','(kaze o) hikimasu'); // sembuh/terkena flu
  grp('(kusuri o) nomimasu','(shawā o) abimasu','(ofuro ni) hairimasu'); // minum obat/mandi
  grp('kansen shimasu','(byōki o) utsushimasu');   // terjangkit/menularkan
  grp('futorimasu','yasemasu');                    // gemuk/kurus
  grp('(netsu ga) tsuzukimasu','(ketsuatsu ga) agarimasu'); // demam berlanjut/tekanan naik

  // ── Kata Kerja: Emosi & Perasaan ──
  grp('waraimasu','nakimasu','nemurimasu');         // tertawa/menangis/tidur
  grp('yorokobimasu','komarimasu');                // senang/kesulitan
  grp('bikkuri shimasu','anshin shimasu','gakkari shimasu'); // terkejut/lega/kecewa
  grp('shinpai shimasu','gaman shimasu','kinchō shimasu'); // khawatir/sabar/gugup
  grp('tanoshimimasu','akiramemasu');              // menikmati/menyerah
  grp('enryo shimasu','ōen shimasu');              // sungkan/mendukung

  // ── Kata Kerja: Pintu/Saklar/Mesin (Transitif & Intransitif) ──
  grp('(doa ga) akimasu','(doa ga) shimarimasu');  // pintu terbuka/tertutup
  grp('(denki ga) tsukimasu','(denki ga) kiemasu'); // lampu nyala/padam
  grp('(dengen o) iremasu','(dengen o) kirimasu'); // menyalakan/mematikan daya
  grp('(kagi o) kakemasu','(kagi ga) kakarimasu'); // mengunci/terkunci
  grp('(erebētā ga) tomarimasu','(tokei ga) ugokimasu'); // lift berhenti/jam bergerak

  // ── Kata Kerja: Kerusakan (Intransitif) ──
  grp('(isu ga) kowaremasu','(koppu ga) waremasu','(ki ga) oremasu'); // rusak/pecah/patah
  grp('(kami ga) yaburemasu','(fuku ga) yogoremasu'); // sobek/kotor
  grp('(himo ga) kiremasu','(botan ga) toremasu','(nimotsu ga) ochimasu'); // putus/lepas/jatuh
  grp('(gasorin ga) nakunarimasu','taoremasu');     // habis/roboh

  // ── Kata Kerja: Kerusakan (Penyebab/Transitif) ──
  grp('kowashimasu','yogoshimasu','warimasu','otoshimasu'); // merusak/mengotori/memecah/menjatuhkan
  grp('machigaemasu','nakushimasu');               // salah/kehilangan
  grp('modoshimasu','matomemasu');                 // mengembalikan/mengumpulkan

  // ── Kata Kerja: Cuaca & Alam ──
  grp('(ame ga) furimasu','(ame ga) yamimasu');    // hujan turun/berhenti
  grp('haremasu','kumorimasu','(kaze ga) fukimasu'); // cerah/mendung/angin bertiup
  grp('(hana ga) sakimasu','(iro ga) kawarimasu'); // bunga mekar/warna berubah
  grp('funka shimasu','teiden shimasu');            // meletus/pemadaman listrik

  // ── Kata Kerja: Naik/Turun (Angka, Harga, Jumlah) ──
  grp('(nedan ga) agarimasu','(nedan ga) sagarimasu'); // harga naik/turun
  grp('(yushutsu ga) fuemasu','(yushutsu ga) herimasu'); // ekspor naik/turun
  grp('agarimasu','sagarimasu');                   // naik/turun

  // ── Kata Kerja: Perdagangan & Bisnis ──
  grp('yushutsu shimasu','yunyū shimasu','hon\'yaku shimasu'); // ekspor/impor/terjemah
  grp('seikō shimasu','shippai shimasu');           // berhasil/gagal
  grp('umaku ikimasu','ganbarimasu');              // berjalan baik/berjuang

  // ── Kata Kerja: Sosial & Hubungan ──
  grp('kekkon shimasu','rikon shimasu','saikon shimasu'); // nikah/cerai/nikah lagi
  grp('kon\'yaku shimasu','shiriai masu');          // bertunangan/berkenalan
  grp('(tomodachi ni) aimasu','wakaremasu');        // bertemu/berpisah
  grp('kenka shimasu','ayamarimasu');              // bertengkar/meminta maaf
  grp('tetsudaimasu','sewa o shimasu');             // membantu/mengurus

  // ── Kata Kerja: Kehormatan (Sonkeigo) ──
  grp('irasshaimasu','meshiagarimasu','osshaimasu','goran ni narimasu','nasaimasu'); // hormat
  // ── Kata Kerja: Kerendahan (Kenjougo) ──
  grp('mairimasu','orimasu','mōshimasu','haiken shimasu','itashimasu','ukagaimasu','ome ni kakarimasu'); // rendah

  // ── Kata Kerja: Memberi & Menerima ──
  grp('agemasu','moraimasu','kuremasu');            // memberi/menerima/diberi
  grp('itadakimasu','kudasaimasu','yarimasu');      // menerima(hormat)/memberi(hormat)/memberi(ke bawahan)
  grp('gochisō shimasu','shinsetsu ni shimasu');    // mentraktir/baik hati
  grp('todokemasu','(nimotsu ga) todokimasu');     // mengantarkan/barang tiba
  grp('okurimasu','(hito o) okurimasu');           // mengirim/mengantarkan orang

  // ── Kata Kerja: Melakukan & Mengerjakan ──
  grp('shimasu','yarimasu','okonaimasu');           // melakukan
  grp('tsukaimasu','kopī shimasu');                // menggunakan/memfotokopi
  grp('erabimasu','kimemasu','kangaemasu');         // memilih/memutuskan/berpikir
  grp('omoimasu','shinjimasu','rikai shimasu');     // berpikir/meyakini/memahami

  // ── Kata Kerja: Waktu & Jadwal ──
  grp('ma ni aimasu','okuremasu','chikoku shimasu'); // tepat waktu/terlambat
  grp('sugoshimasu','(shichiji o) sugimasu');       // menghabiskan waktu/lewat jam
  grp('tsuzukemasu','nokorimasu');                 // melanjutkan/tersisa

  // ── Kata Kerja: Lalu lintas & Jalan ──
  grp('(migi e) magarimasu','(michi ga) komimasu','(michi ga) sukimasu'); // belok/macet/sepi
  grp('(jiko ni) aimasu','(wasuremono ni) ki ga tsukimasu'); // kecelakaan/menyadari

  // ── Kata Kerja: Hidup & Mati ──
  grp('umaremasu','nakunarimasu','shinimasu','nagaiki shimasu'); // lahir/meninggal/panjang umur
  grp('sumimasu','sunde imasu','hikkoshi shimasu'); // tinggal/pindahan
  grp('narimasu','(toshi o) torimasu');            // menjadi/menua

  // ── Kata Kerja: Bermain & Hiburan ──
  grp('asobimasu','odorimasu','utaimasu');          // bermain/menari/menyanyi
  grp('hikimasu','shashin o torimasu');             // main alat musik/foto
  grp('jogingu shimasu','pūru de oyogimasu','oyogimasu'); // joging/berenang
  grp('kaimono shimasu','shokuji shimasu');         // belanja/makan

  // ── Kata Kerja: Merokok & Kebiasaan ──
  grp('suimasu','ase o kakimasu');                 // merokok/berkeringat
  grp('(shūkan ni) naremasu','kayoimasu');          // terbiasa/bolak-balik

  // ── Kata Kerja: Mengukur & Menghitung ──
  grp('kazoemasu','hakarimasu','tashikamemasu');    // menghitung/mengukur/memastikan
  grp('chekku shimasu','memo shimasu');             // mengecek/menulis memo

  // ── Kata Kerja: Rekaman & Digital ──
  grp('rokuon shimasu','mēru ni tenpu shimasu');    // rekam suara/lampirkan email
  grp('risaikuru shimasu','seiri shimasu');         // daur ulang/memilah

  // ── Kata Kerja: Lain-lain Pasangan ──
  grp('koboshimasu','nugimasu');                    // menumpahkan/melepas
  grp('suberimasu','fumimasu');                    // tergelincir/menginjak
  grp('uchimasu','kamimasu');                      // memukul/menggigit
  grp('mamorimasu','nigemasu','sawagimasu');        // menjaga/melarikan diri/keributan
  grp('tsutaemasu','shirasemasu','todokemasu');     // menyampaikan/memberitahu/mengantar
  grp('(denwa ga) kakarimasu','(maru o) tsukemasu'); // dapat telepon/menandai
  grp('(shiai ni) demasu','(takarakuji ni) atarimasu'); // ikut pertandingan/menang lotre

  // ── Kata Kerja: Mabuk & Basah ──  
  grp('yoimasu','nuremasu');                       // mabuk/basah
  grp('(jiko ga) okimasu','(biru ga) taoremasu');  // kecelakaan terjadi/bangunan runtuh
  grp('(niku ga) yakemasu','(gomi ga) moemasu');   // dipanggang/terbakar
  grp('(hito ga) atsumarimasu','(seki o) hazushimasu'); // berkumpul/meninggalkan meja

  // ── Kata Kerja: Kemampuan & Kondisi ──
  grp('dekimasu','wakarimasu','shirimasu');         // bisa/mengerti/tahu
  grp('shitte imasu','tsukaremashita');            // tahu(sekarang)/lelah
  grp('tarimasu','irimasu');                       // cukup/memerlukan
  grp('chigaimasu','aimasu');                      // berbeda/cocok
  grp('yaku ni tachimasu','tasukarimasu');          // bermanfaat/terbantu

  // ── Kata Kerja: Dorong & Tarik ──
  grp('oshimasu','hikimasu','mawashimasu');         // dorong/tarik/putar

  // ── Kata Kerja: Cuaca Sebagai Aksi ──
  grp('oiwai shimasu','sutoresu o kaishō shimasu'); // merayakan/hilangkan stres
  grp('jitsugen shimasu','sono mama ni shimasu');   // mewujudkan/membiarkan

  // ── Kata Kerja: Memulai & Mengakhiri ──
  grp('hajimemasu','owarimasu','tsuzukemasu');      // mulai/akhiri/lanjut
  grp('(shiki ga) hajimarimasu','me ga samemasu'); // upacara dimulai/bangun tidur

  // ── Kata Kerja: Sōtai & Waktu Kerja ──
  grp('sōtai shimasu','chikoku shimasu','zangyō shimasu'); // pulang awal/terlambat/lembur

  // ── Kata Kerja: Kontekstual (dengan keterangan objek) ──
  grp('(tomodachi ni) aimasu','(hito o) okurimasu'); // bertemu teman/mengantar orang
  grp('(denwa o) kakemasu','(jūsho o) oshiemasu'); // menelepon/memberitahu alamat
  grp('(kissaten ni) hairimasu','(kissaten o) demasu'); // masuk kafe/keluar kafe
  grp('(kuruma o) tomemasu','mukaemasu');           // memarkir/menjemput
  grp('(repōto o) dashimasu','(kyōshitsu o) hirakimasu'); // serahkan laporan/buka kelas
  grp('(shatsu o) kimasu','(kutsu o) hakimasu','(bōshi o) kaburimasu','(megane o) kakemasu','(sōsu o) tsukemasu','(kasa o) sashimasu'); // semua memakai
  grp('biza o torimasu','(biza ga) irimasu');      // ambil visa/butuh visa
  grp('(sensei ni) kikimasu','(shitsumon ni) kotaemasu'); // bertanya ke guru/menjawab
  grp('(kōhī o) iremasu','(doa ni) sawarimasu');   // buat kopi/sentuh pintu
  grp('(michi o) arukimasu','(michi o) hashirimasu','(michi ga) komimasu','(michi ga) sukimasu'); // jalan kaki/berlari/macet/sepi
  grp('(hashi o) watarimasu','(migi e) magarimasu'); // menyeberang/belok
  grp('(eki ni) tsukimasu','(toshi o) torimasu');  // tiba stasiun/menua
  grp('(yasumi o) torimasu','(takarakuji ni) atarimasu'); // ambil cuti/menang lotre
  grp('(ame ga) furimasu','(ame ga) yamimasu','(kaze ga) fukimasu'); // hujan/berhenti/angin
  grp('(byōki ga) naorimasu','(koshō ga) naorimasu','(kaze o) hikimasu'); // sembuh/perbaiki/flu
  grp('(netsu ga) tsuzukimasu','(ketsuatsu ga) agarimasu','(byōki o) utsushimasu'); // demam/tekanan/menular
  grp('(kusuri o) nomimasu','(shawā o) abimasu','(ofuro ni) hairimasu'); // minum obat/mandi
  grp('(doa ga) akimasu','(doa ga) shimarimasu');  // pintu buka/tutup
  grp('(denki ga) tsukimasu','(denki ga) kiemasu'); // lampu nyala/mati
  grp('(dengen o) iremasu','(dengen o) kirimasu'); // saklar on/off
  grp('(kagi o) kakemasu','(kagi ga) kakarimasu'); // kunci/terkunci
  grp('(erebētā ga) tomarimasu','(tokei ga) ugokimasu'); // lift berhenti/jam jalan
  grp('(isu ga) kowaremasu','(koppu ga) waremasu','(ki ga) oremasu'); // rusak/pecah/patah
  grp('(kami ga) yaburemasu','(fuku ga) yogoremasu'); // sobek/kotor
  grp('(himo ga) kiremasu','(botan ga) toremasu','(nimotsu ga) ochimasu'); // putus/lepas/jatuh
  grp('(gasorin ga) nakunarimasu','taoremasu');     // habis/roboh
  grp('(wasuremono ni) ki ga tsukimasu','ki o tsukemasu'); // menyadari/hati-hati
  grp('(shiken o) ukemasu','(shiken ni) gōkaku shimasu','(shiken ni) ochimasu'); // ujian/lulus/gagal
  grp('(daigaku ni) nyūgaku shimasu','(daigaku o) sotsugyō shimasu'); // masuk/lulus univ
  grp('(daigaku ni) hairimasu','(daigaku o) demasu'); // masuk/keluar univ
  grp('(kaigi ni) shusseki shimasu','(shiai ni) demasu'); // hadiri rapat/ikut pertandingan
  grp('(hana ga) sakimasu','(iro ga) kawarimasu'); // mekar/berubah warna
  grp('(nedan ga) agarimasu','(nedan ga) sagarimasu'); // harga naik/turun
  grp('(yushutsu ga) fuemasu','(yushutsu ga) herimasu'); // ekspor naik/turun
  grp('(denwa ga) kakarimasu','(maru o) tsukemasu'); // dapat telepon/menandai
  grp('(shichiji o) sugimasu','(shūkan ni) naremasu'); // lewat jam/terbiasa
  grp('(uso o) tsukimasu','(otsuri ga) demasu');   // bohong/kembalian keluar
  grp('(biru ga) taoremasu','(niku ga) yakemasu','(gomi ga) moemasu'); // runtuh/panggang/bakar
  grp('(jiko ga) okimasu','(jiko ni) aimasu');     // kecelakaan terjadi/mengalami
  grp('(hito ga) atsumarimasu','(seki o) hazushimasu'); // berkumpul/tinggalkan meja
  grp('(koe/oto/aji) ga shimasu','(nimotsu ga) todokimasu'); // terdengar/barang tiba
  grp('(jishin o) mochimasu','(sekinin o) mochimasu'); // percaya diri/tanggung jawab
  grp('(kaisha o) yasumimasu','kakarimasu');        // libur kerja/memakan waktu
  grp('(shiki ga) hajimarimasu','me ga samemasu'); // upacara mulai/bangun tidur

  // ── Kata Kerja: Tambahan yang belum masuk ──
  grp('kenkyū shimasu','shirabemasu');             // meneliti/menyelidiki
  grp('unten shimasu','(yama ni) noborimasu','(hoteru ni) tomarimasu'); // menyetir/mendaki/menginap
  grp('kayoimasu','(densha ni) norimasu','(densha o) orimasu','(densha ni) norikaemasu'); // pulang pergi/naik/turun/ganti
  grp('mukaemasu','(shawā o) abimasu');            // menjemput/mandi
  grp('(enpitsu o) kezurimasu','torikaemasu');      // meraut/menukar
  grp('sagemasu','chōsetsu shimasu');              // menurunkan/menyesuaikan
  grp('uremasu','wakaremasu');                     // terjual/berpisah
  grp('nagemasu','(seki o) hazushimasu');           // melempar/tinggalkan meja
  grp("kon'yaku shimasu",'shiriai masu');           // bertunangan/berkenalan
  grp("hon'yaku shimasu",'kenkyū shimasu');         // menerjemahkan/meneliti
  grp('jiritsu o tasukemasu','sodatemasu');         // dukung kemandirian/merawat
  grp('(kasa o) sashimasu','shītoberto o shimasu'); // payung/seat belt

  return G;
})();

// Canonical order for thematic groups (secondary sort within same group)
const _GROUP_ORDER = (function() {
  const O = {};
  let pos = 0;
  function seq(...roms) { roms.forEach(r => { O[r.toLowerCase()] = pos++; }); }

  // Warna: merah → biru → kuning → putih → hitam → coklat
  seq('akai','aoi','kiiroi','shiroi','kuroi','chairoi');
  // Musim: semi → panas → gugur → dingin
  seq('haru','natsu','aki','fuyu');
  // Cuaca: cerah → hujan → salju → mendung
  seq('tenki','hare','ame','yuki','kumori');
  // Hari: Senin → Minggu → akhir pekan
  seq('getsuyōbi','kayōbi','suiyōbi','mokuyōbi','kinyōbi','doyōbi','nichiyōbi','shūmatsu');
  // Keluarga: generasi tua → muda
  seq('kazoku','ryōshin','ojīsan','obāsan',
      'chichi','otōsan','haha','okāsan',
      'ani','onīsan','ane','onēsan',
      'otto','tsuma','goshujin','okusan',
      'otōto','otōto san','imōto','imōto san',
      'kodomo','okosan','gokazoku');
  // Tubuh: atas → bawah
  seq('atama','kao','me','mimi','hana','kuchi','ha','kubi',
      'karada','te','yubi','onaka','senaka','ashi','tsume');
  // Alat tulis & peralatan kecil
  seq('tsumekiri');
  // Waktu relatif: lampau → sekarang → depan
  seq('ototoi','kinō','kyō','ashita','asatte');
  seq('senshū','konshū','raishū');
  seq('sengetsu','kongetsu','raigetsu');
  seq('kyonen','kotoshi','rainen');
  // Bagian hari: pagi → malam
  seq('asa','gozen','hiru','gogo','yoru','kesa','konban');
  // Waktu makan: pagi → siang → malam
  seq('asagohan','hirugohan','bangohan');
  // Transportasi: kereta → bus → taksi → sepeda → dll
  seq('densha','chikatetsu','shinkansen','basu','takushī',
      'jitensha','baiku','jidōsha','hikōki','fune');
  // Kata kerja tematik
  seq('ikimasu','kimasu','kaerimasu');         // pergi/datang/pulang
  seq('tabemasu','nomimasu');                  // makan/minum
  seq('mimasu','kikimasu');                    // melihat/mendengar
  seq('yomimasu','kakimasu');                  // membaca/menulis
  seq('kaimasu','urimasu');                    // membeli/menjual
  seq('akemasu','shimemasu');                  // membuka/menutup
  seq('tsukemasu','keshimasu');                // nyala/mati
  seq('iremasu','dashimasu');                  // memasukkan/mengeluarkan
  seq('agemasu','moraimasu','kuremasu');        // memberi/menerima
  seq('kashimasu','karimasu');                 // meminjamkan/meminjam
  seq('hairimasu','demasu');                   // masuk/keluar
  seq('norimasu','orimasu');                   // naik/turun
  seq('imasu','arimasu');                      // ada
  seq('nemasu','okimasu');                     // tidur/bangun
  seq('kimasu','nugimasu');                    // pakai/lepas
  seq('oshiemasu','naraimasu');                // mengajar/belajar

  // ── Kata Kerja N4: Transitif/Intransitif ──
  seq('akemasu','akimasu');
  seq('shimemasu','shimarimasu');
  seq('tsukemasu','tsukimasu');
  seq('keshimasu','kiemasu');
  seq('iremasu','hairimasu');
  seq('dashimasu','demasu');
  seq('hajimemasu','hajimarimasu');
  seq('owarimasu','owaru');
  seq('tomemasu','tomarimasu');
  seq('atsumemasu','atsumarimasu');
  seq('kaemasu','kawarimasu');
  seq('kowaremasu','kowashimasu');
  seq('yogoremasu','yogoshimasu');
  seq('ochimasu','otoshimasu');
  seq('oremasu','orimasu');
  seq('waremasu','warimasu');
  seq('kiremasu','kirimasu');
  seq('nakunarimasu','nakushimasu');
  seq('nuremasu','nurashimasu');
  seq('yakemasu','yakimasu');
  seq('ugokimasu','ugokashimasu');

  // ── Kata Kerja N4: Emosi ──
  seq('bikkuri shimasu','anshin shimasu');
  seq('gakkari shimasu','yorokobimasu');
  seq('waraimasu','nakimasu');
  seq('ureshii','kanashii');

  // ── Kata Kerja N4: Komunikasi ──
  seq('hanashimasu','iimasu');
  seq('kotaemasu','kikimasu');
  seq('tsutaemasu','shirasemasu');
  seq('homemasu','shikaru');
  seq('yobimasu','kotaemasu');

  // ── Kata Kerja N4: Gerakan Badan ──
  seq('tatsu','suwaru');
  seq('arukimasu','hashirimasu');
  seq('agarimasu','sagarimasu');
  seq('magarimasu','massugu ikimasu');
  seq('wataru','tooru');

  // ── Kata Kerja N4: Kerja & Aktivitas ──
  seq('hatarakimasu','yasumimasu');
  seq('tsutomemasu','yamemasu');
  seq('hajimemasu','owarimasu');
  seq('tsuzukemasu','yamemasu');
  seq('ganbarimasu','akiramemasu');
  seq('shippai shimasu','seikō shimasu');

  // ── Kata Kerja N4: Rumah Sakit ──
  seq('nyūin shimasu','taiin shimasu');
  seq('nakunarimasu','umaremasu');

  // ── Kata Kerja N4: Belajar ──
  seq('oboeru','wasureru');
  seq('shirabemasu','mitukemasu');
  seq('kangaemasu','kimemasu');

  // ── Kata Kerja N4: Pakaian ──
  seq('kimasu','hakimasu','kaburimasu','kakemasu');

  // ── Kata Kerja N4: Membuat ──
  seq('tsukurimasu','naoshimasu');
  seq('hatsumei shimasu','hakken shimasu');
  seq('sekkei shimasu','kensetsu shimasu');

  // ── Kata Kerja N4: Perdagangan ──
  seq('yushutsu shimasu','yunyū shimasu');
  seq('okuru','ukeru');
  seq('todokemasu','uketorimasu');

  // ── Kata Kerja N4: Saklar ──
  seq('(dengen o) iremasu','(dengen o) kirimasu');
  seq('(kagi o) kakemasu','(kagi o) akemasu');

  // ── Kata Kerja N4: Rumah Tangga ──
  seq('sentaku shimasu','sōji shimasu','ryōri shimasu');
  seq('katazukemasu','chirakashimasu');
  seq('seiri shimasu','junbi shimasu');

  // ── Kata Kerja N4: Sosial ──
  seq('au','wakareru');
  seq('kenka shimasu','nakanaori shimasu');
  seq('kekkon shimasu','rikon shimasu');
  seq('sewa o shimasu','sodatemasu');

  // ── Kata Kerja N4: Keuangan ──
  seq('haraimasu','azukemasu');
  seq('oroshimasu','furikomomasu');
  seq('tamemasu','tsukaimasu');

  // ── Kata Benda N4: Bencana ──
  seq('jishin','taifū','kaji','jiko','tsunami','kaminari');

  // ── Kata Benda N4: Sekolah ──
  seq('shōgakkō','chūgakkō','kōkō','daigaku');

  // Frekuensi: selalu → tidak pernah
  seq('itsumo','yoku','tokidoki','amari','zenzen');
  // Jumlah: banyak/sedikit
  seq('takusan','sukoshi');
  // Sudah/belum
  seq('mō','mada');
  // Minuman: air → teh → kopi → jus → susu → bir → wine
  seq('mizu','ocha','kōcha','kōhī','jūsu','gyūnyū','miruku','bīru','wain');
  // Kata sifat antonim
  seq('ōkii','chiisai');
  seq('takai','hikui','yasui');
  seq('atarashii','furui');
  seq('hayai','osoi');
  seq('atsui/atsui','samui','tsumetai');
  seq('atatakai','suzushii');
  seq('muzukashii','yasashii');
  seq('tanoshii','tsumaranai');
  seq('suki (na)','kirai (na)');
  seq('jōzu (na)','heta (na)');
  seq('genki (na)','isogashii','hima (na)');
  seq('ii (yoi)','warui');
  // Posisi: atas/bawah, depan/belakang, kanan/kiri, dalam/luar
  seq('ue','shita','mae','ushiro','migi','hidari','naka','soto');
  // Negara: Jepang terlebih dahulu, lalu Asia, lalu lainnya
  seq('nihon','kankoku','chūgoku','taiwan','firipin','betonamu','myānmā',
      'indoneshia','shingapōru','igirisu','furansu','burajiru','amerika',
      'gaikoku','sekai');
  // Kata Sifat tambahan
  seq('suki (na)','kirai (na)');
  seq('jōzu (na)','heta (na)');
  seq('genki (na)','hima (na)','isogashii');
  seq('ōi','sukunai');
  seq('amai','karai','suppai','nigai');
  seq('futoi','hosoi');
  seq('tsuyoi','yowai');
  seq('ureshii','sabishii');
  seq('hansamu (na)','kawaii','suteki (na)','kirei (na)');
  seq('ii (yoi)','warui');
  seq('shizuka (na)','nigiyaka (na)');
  seq('kantan (na)','muzukashii','yasashii');
  seq('benri (na)','fuben na');

  // ── Kata Kerja Tambahan: Pergerakan & Perpindahan ──
  seq('arukimasu','hashirimasu','oyogimasu');
  seq('tachimasu','suwarimasu');
  seq('isogimasu','machimasu');
  seq('motte ikimasu','motte kimasu');
  seq('tsurete ikimasu','tsurete kimasu');
  seq('dekakemasu','modorimasu','kaette kimasu');
  seq('shuppatsu shimasu','tōchaku shimasu');
  seq('mukaimasu','(eki ni) tsukimasu');
  seq('tōrimasu','(hashi o) watarimasu');
  seq('(michi o) arukimasu','(michi o) hashirimasu');
  seq('(yama ni) noborimasu','(hoteru ni) tomarimasu');
  seq('norimasu','orimasu','norikaemasu');
  seq('(densha ni) norimasu','(densha o) orimasu','(densha ni) norikaemasu');

  // ── Memegang & Membawa ──
  seq('mochimasu','hakobimasu');
  seq('torimasu','watashimasu');
  seq('hiroimasu','otoshimasu');

  // ── Melihat & Mendengar ──
  seq('miemasu','kikoemasu');
  seq('misemasu','(sensei ni) kikimasu');

  // ── Berbicara & Komunikasi ──
  seq('hanashimasu','iimasu','kotaemasu');
  seq('denwa shimasu','(denwa o) kakemasu','renraku shimasu');
  seq('setsumei shimasu','shōkai shimasu','annai shimasu');
  seq('tanomimasu','sasoimasu','shōtai shimasu');
  seq('yobimasu','okoshimasu');
  seq('shikarimasu','chūi shimasu','homemasu');

  // ── Membeli & Bayar ──
  seq('kaimasu','haraimasu','kaeshimasu');

  // ── Belajar & Pendidikan ──
  seq('benkyō shimasu','naraimasu','oshiemasu');
  seq('oboemasu','wasuremasu','omoidashimasu');
  seq('shirabemasu','sagashimasu','mitsukemasu');
  seq('shitsumon shimasu','(shitsumon ni) kotaemasu');
  seq('yoshū shimasu','fukushū shimasu','fukushū o shimasu');
  seq('renshū shimasu','undō shimasu');
  seq('(daigaku ni) nyūgaku shimasu','(daigaku o) sotsugyō shimasu');
  seq('(daigaku ni) hairimasu','(daigaku o) demasu');
  seq('(shiken o) ukemasu','(shiken ni) gōkaku shimasu','(shiken ni) ochimasu');
  seq('ryūgaku shimasu','shūshoku shimasu');

  // ── Kerja & Rutinitas ──
  seq('hatarakimasu','yasumimasu','(kaisha o) yasumimasu');
  seq('shutchō shimasu','zangyō shimasu');
  seq('kyūkei shimasu','sanpo shimasu');
  seq('sanka shimasu','(kaigi ni) shusseki shimasu');
  seq('mōshikomimasu','yoyaku shimasu','kyanseru shimasu');
  seq('okonaimasu','junbi shimasu','yōi shimasu');

  // ── Membuat & Memperbaiki ──
  seq('tsukurimasu','naoshimasu','kowashimasu');
  seq('tatemasu','sekkei shimasu');
  seq('hatsumei shimasu','hakken shimasu');

  // ── Membersihkan & Rumah Tangga ──
  seq('sentaku shimasu','sōji shimasu','katazukemasu');
  seq('araimasu','migakimasu','fukimasu');
  seq('sutemasu','shimaimasu');
  seq('harimasu','kakemasu','kazarimasu','narabemasu');
  seq('uemasu','sodatemasu');

  // ── Memakai Pakaian ──
  seq('(shatsu o) kimasu','(kutsu o) hakimasu','(bōshi o) kaburimasu','(megane o) kakemasu');
  seq('nugimasu','(kasa o) sashimasu','shītoberto o shimasu');

  // ── Memasak & Makanan ──
  seq('yakimasu','mazemasu','wakashimasu','hiyashimasu');
  seq('kawakashimasu','kawakimasu');
  seq('tsutsumimasu','kirimasu');

  // ── Kesehatan & Rumah Sakit ──
  seq('nyūin shimasu','taiin shimasu');
  seq('(byōki ga) naorimasu','(kaze o) hikimasu');
  seq('(kusuri o) nomimasu','(shawā o) abimasu','(ofuro ni) hairimasu');
  seq('kansen shimasu','(byōki o) utsushimasu');
  seq('futorimasu','yasemasu');
  seq('(netsu ga) tsuzukimasu','(ketsuatsu ga) agarimasu');

  // ── Emosi & Perasaan ──
  seq('waraimasu','nakimasu','nemurimasu');
  seq('yorokobimasu','komarimasu');
  seq('bikkuri shimasu','anshin shimasu','gakkari shimasu');
  seq('shinpai shimasu','gaman shimasu','kinchō shimasu');
  seq('tanoshimimasu','akiramemasu');
  seq('enryo shimasu','ōen shimasu');

  // ── Pintu/Saklar/Mesin ──
  seq('(doa ga) akimasu','(doa ga) shimarimasu');
  seq('(denki ga) tsukimasu','(denki ga) kiemasu');
  seq('(dengen o) iremasu','(dengen o) kirimasu');
  seq('(kagi o) kakemasu','(kagi ga) kakarimasu');
  seq('(erebētā ga) tomarimasu','(tokei ga) ugokimasu');

  // ── Kerusakan (Intransitif) ──
  seq('(isu ga) kowaremasu','(koppu ga) waremasu','(ki ga) oremasu');
  seq('(kami ga) yaburemasu','(fuku ga) yogoremasu');
  seq('(himo ga) kiremasu','(botan ga) toremasu','(nimotsu ga) ochimasu');
  seq('(gasorin ga) nakunarimasu','taoremasu');

  // ── Kerusakan (Transitif) ──
  seq('kowashimasu','yogoshimasu','warimasu','otoshimasu');
  seq('machigaemasu','nakushimasu');
  seq('modoshimasu','matomemasu');

  // ── Cuaca & Alam ──
  seq('(ame ga) furimasu','(ame ga) yamimasu');
  seq('haremasu','kumorimasu','(kaze ga) fukimasu');
  seq('(hana ga) sakimasu','(iro ga) kawarimasu');
  seq('funka shimasu','teiden shimasu');

  // ── Naik/Turun (Angka) ──
  seq('(nedan ga) agarimasu','(nedan ga) sagarimasu');
  seq('(yushutsu ga) fuemasu','(yushutsu ga) herimasu');

  // ── Perdagangan & Bisnis ──
  seq('yushutsu shimasu','yunyū shimasu','hon\'yaku shimasu');
  seq('seikō shimasu','shippai shimasu');
  seq('umaku ikimasu','ganbarimasu');

  // ── Sosial & Hubungan ──
  seq('kekkon shimasu','rikon shimasu','saikon shimasu');
  seq('kon\'yaku shimasu','shiriai masu');
  seq('(tomodachi ni) aimasu','wakaremasu');
  seq('kenka shimasu','ayamarimasu');
  seq('tetsudaimasu','sewa o shimasu');

  // ── Kehormatan (Sonkeigo) ──
  seq('irasshaimasu','meshiagarimasu','osshaimasu','goran ni narimasu','nasaimasu');
  // ── Kerendahan (Kenjougo) ──
  seq('mairimasu','orimasu','mōshimasu','haiken shimasu','itashimasu','ukagaimasu','ome ni kakarimasu');

  // ── Memberi & Menerima ──
  seq('itadakimasu','kudasaimasu','yarimasu');
  seq('gochisō shimasu','shinsetsu ni shimasu');
  seq('todokemasu','(nimotsu ga) todokimasu');
  seq('okurimasu','(hito o) okurimasu');

  // ── Melakukan & Mengerjakan ──
  seq('shimasu','yarimasu','okonaimasu');
  seq('tsukaimasu','kopī shimasu');
  seq('erabimasu','kimemasu','kangaemasu');
  seq('omoimasu','shinjimasu','rikai shimasu');

  // ── Waktu & Jadwal ──
  seq('ma ni aimasu','okuremasu','chikoku shimasu');
  seq('sugoshimasu','(shichiji o) sugimasu');
  seq('tsuzukemasu','nokorimasu');

  // ── Lalu lintas ──
  seq('(migi e) magarimasu','(michi ga) komimasu','(michi ga) sukimasu');
  seq('(jiko ni) aimasu','(wasuremono ni) ki ga tsukimasu');

  // ── Hidup & Mati ──
  seq('umaremasu','nakunarimasu','shinimasu','nagaiki shimasu');
  seq('sumimasu','sunde imasu','hikkoshi shimasu');
  seq('narimasu','(toshi o) torimasu');

  // ── Bermain & Hiburan ──
  seq('asobimasu','odorimasu','utaimasu');
  seq('hikimasu','shashin o torimasu');
  seq('jogingu shimasu','pūru de oyogimasu','oyogimasu');
  seq('kaimono shimasu','shokuji shimasu');

  // ── Mengukur & Menghitung ──
  seq('kazoemasu','hakarimasu','tashikamemasu');
  seq('chekku shimasu','memo shimasu');

  // ── Rekaman & Digital ──
  seq('rokuon shimasu','mēru ni tenpu shimasu');
  seq('risaikuru shimasu','seiri shimasu');

  // ── Kemampuan & Kondisi ──
  seq('dekimasu','wakarimasu','shirimasu');
  seq('shitte imasu','tsukaremashita');
  seq('tarimasu','irimasu');
  seq('chigaimasu','aimasu');
  seq('yaku ni tachimasu','tasukarimasu');

  // ── Dorong & Tarik ──
  seq('oshimasu','hikimasu','mawashimasu');

  // ── Sōtai & Waktu Kerja ──
  seq('sōtai shimasu','chikoku shimasu','zangyō shimasu');

  // ── Kontekstual (dengan keterangan objek) ──
  seq('(tomodachi ni) aimasu','(hito o) okurimasu');
  seq('(denwa o) kakemasu','(jūsho o) oshiemasu');
  seq('(kissaten ni) hairimasu','(kissaten o) demasu');
  seq('(kuruma o) tomemasu','mukaemasu');
  seq('(repōto o) dashimasu','(kyōshitsu o) hirakimasu');
  seq('(shatsu o) kimasu','(kutsu o) hakimasu','(bōshi o) kaburimasu','(megane o) kakemasu','(sōsu o) tsukemasu','(kasa o) sashimasu');
  seq('biza o torimasu','(biza ga) irimasu');
  seq('(sensei ni) kikimasu','(shitsumon ni) kotaemasu');
  seq('(kōhī o) iremasu','(doa ni) sawarimasu');
  seq('(michi o) arukimasu','(michi o) hashirimasu','(michi ga) komimasu','(michi ga) sukimasu');
  seq('(hashi o) watarimasu','(migi e) magarimasu');
  seq('(eki ni) tsukimasu','(toshi o) torimasu');
  seq('(yasumi o) torimasu','(takarakuji ni) atarimasu');
  seq('(ame ga) furimasu','(ame ga) yamimasu','(kaze ga) fukimasu');
  seq('(byōki ga) naorimasu','(koshō ga) naorimasu','(kaze o) hikimasu');
  seq('(netsu ga) tsuzukimasu','(ketsuatsu ga) agarimasu','(byōki o) utsushimasu');
  seq('(kusuri o) nomimasu','(shawā o) abimasu','(ofuro ni) hairimasu');
  seq('(doa ga) akimasu','(doa ga) shimarimasu');
  seq('(denki ga) tsukimasu','(denki ga) kiemasu');
  seq('(dengen o) iremasu','(dengen o) kirimasu');
  seq('(kagi o) kakemasu','(kagi ga) kakarimasu');
  seq('(erebētā ga) tomarimasu','(tokei ga) ugokimasu');
  seq('(isu ga) kowaremasu','(koppu ga) waremasu','(ki ga) oremasu');
  seq('(kami ga) yaburemasu','(fuku ga) yogoremasu');
  seq('(himo ga) kiremasu','(botan ga) toremasu','(nimotsu ga) ochimasu');
  seq('(gasorin ga) nakunarimasu','taoremasu');
  seq('(wasuremono ni) ki ga tsukimasu','ki o tsukemasu');
  seq('(shiken o) ukemasu','(shiken ni) gōkaku shimasu','(shiken ni) ochimasu');
  seq('(daigaku ni) nyūgaku shimasu','(daigaku o) sotsugyō shimasu');
  seq('(daigaku ni) hairimasu','(daigaku o) demasu');
  seq('(kaigi ni) shusseki shimasu','(shiai ni) demasu');
  seq('(hana ga) sakimasu','(iro ga) kawarimasu');
  seq('(nedan ga) agarimasu','(nedan ga) sagarimasu');
  seq('(yushutsu ga) fuemasu','(yushutsu ga) herimasu');
  seq('(denwa ga) kakarimasu','(maru o) tsukemasu');
  seq('(shichiji o) sugimasu','(shūkan ni) naremasu');
  seq('(uso o) tsukimasu','(otsuri ga) demasu');
  seq('(biru ga) taoremasu','(niku ga) yakemasu','(gomi ga) moemasu');
  seq('(jiko ga) okimasu','(jiko ni) aimasu');
  seq('(hito ga) atsumarimasu','(seki o) hazushimasu');
  seq('(koe/oto/aji) ga shimasu','(nimotsu ga) todokimasu');
  seq('(jishin o) mochimasu','(sekinin o) mochimasu');
  seq('(kaisha o) yasumimasu','kakarimasu');
  seq('(shiki ga) hajimarimasu','me ga samemasu');

  // ── Tambahan ──
  seq('kenkyū shimasu','shirabemasu');
  seq('unten shimasu','(yama ni) noborimasu','(hoteru ni) tomarimasu');
  seq('kayoimasu','(densha ni) norimasu','(densha o) orimasu','(densha ni) norikaemasu');
  seq('mukaemasu','(shawā o) abimasu');
  seq('(enpitsu o) kezurimasu','torikaemasu');
  seq('sagemasu','chōsetsu shimasu');
  seq('uremasu','wakaremasu');
  seq('nagemasu','(seki o) hazushimasu');
  seq("kon'yaku shimasu",'shiriai masu');
  seq("hon'yaku shimasu",'kenkyū shimasu');
  seq('jiritsu o tasukemasu','sodatemasu');
  seq('(kasa o) sashimasu','shītoberto o shimasu');

  return O;
})();

function sortByRom(words) {
  const arr = [...words];

  // Assign group id per word
  arr.forEach(w => {
    const rom = w.rom.toLowerCase().trim();
    w._gid = _THEMATIC_GROUPS[rom] !== undefined ? _THEMATIC_GROUPS[rom] : -1;
    w._gorder = _GROUP_ORDER[rom] !== undefined ? _GROUP_ORDER[rom] : 99999;
  });

  // Build group-anchor map: for each group, find the first romaji alphabetically
  // so the whole group can be placed at the right alphabetical slot.
  const groupAnchor = {};
  arr.forEach(w => {
    if (w._gid < 0) return;
    const rom = w.rom.toLowerCase();
    if (groupAnchor[w._gid] === undefined || rom < groupAnchor[w._gid]) {
      groupAnchor[w._gid] = rom;
    }
  });

  arr.sort((a, b) => {
    const ag = a._gid, bg = b._gid;
    if (ag === bg && ag >= 0) {
      // Same thematic group: use canonical order, then romaji
      if (a._gorder !== b._gorder) return a._gorder - b._gorder;
      return a.rom.localeCompare(b.rom);
    }
    // Different groups: sort by anchor romaji of the group (or own romaji if ungrouped)
    const aKey = ag >= 0 ? groupAnchor[ag] : a.rom.toLowerCase();
    const bKey = bg >= 0 ? groupAnchor[bg] : b.rom.toLowerCase();
    if (aKey !== bKey) return aKey.localeCompare(bKey);
    // Same anchor (different groups, shouldn't happen often): group before ungrouped
    if (ag >= 0 && bg < 0) return -1;
    if (ag < 0 && bg >= 0) return 1;
    return a.rom.localeCompare(b.rom);
  });

  return arr;
}

function toggleKamusCore() {
  kamusCoreOnly = !kamusCoreOnly;
  const el = document.getElementById('kamusCoreToggle');
  if (el) el.classList.toggle('on', kamusCoreOnly);
  renderKamusBody();
}

function initKamus() {
  // Cache subCat sekali (single source of truth, alih-alih dispatch tiap render)
  precomputeSubCats();
  kamusOpenSections = {}; // reset
  const allWords = BABS.flatMap(b => b.kotoba.map(k => ({...k, babNum: b.num})));
  const catCounts = {};
  KAMUS_CATS.forEach(c => catCounts[c.key] = 0);
  allWords.forEach(k => { if (catCounts[k.cat] !== undefined) catCounts[k.cat]++; });

  document.getElementById('kamusCatTabs').innerHTML = KAMUS_CATS.map(c => `
    <button class="kamus-cat-tab${kamusActiveCat===c.key?' active':''}"
      onclick="setKamusCat('${c.key}')">
      ${c.icon} ${c.label} <span style="opacity:0.6">(${catCounts[c.key]})</span>
    </button>`).join('');

  const coreEl = document.getElementById('kamusCoreToggle');
  if (coreEl) coreEl.classList.toggle('on', kamusCoreOnly);

  renderKamusBody();
}

// Precompute subCat sekali. Mapping cat → resolver. Hasilnya disimpan di
// k._sub (per object) supaya pencarian per render hanya butuh O(1) lookup.
let _subCatsComputed = false;
const SUBCAT_RESOLVERS = {
  'Kata Benda':      kbSubCat,
  'Ekspresi':        ekspresiSubCat,
  'Kata Keterangan': keteranganSubCat,
  'Kata Tanya':      kataTanyaSubCat,
  'Angka':           angkaSubCat,
  'Kata Tunjuk':     kataTunjukSubCat,
  'Posisi':          posisiSubCat,
  'Konjungsi':       konjungsiSubCat,
};
function precomputeSubCats() {
  if (_subCatsComputed) return;
  BABS.forEach(b => {
    b.kotoba.forEach(k => {
      const fn = SUBCAT_RESOLVERS[k.cat];
      if (fn) {
        try { k._sub = fn(k); } catch(_) { k._sub = null; }
      }
    });
  });
  _subCatsComputed = true;
}

function setKamusCat(cat) {
  kamusActiveCat = cat;
  kamusOpenSections = {};
  document.getElementById('kamusSearch').value = '';
  document.querySelectorAll('.kamus-cat-tab').forEach((btn, i) => {
    btn.classList.toggle('active', KAMUS_CATS[i]?.key === cat);
  });
  renderKamusBody();
}

function toggleKamusSection(key) {
  kamusOpenSections[key] = !kamusOpenSections[key];
  const el = document.getElementById('ksec_' + key);
  if (el) el.classList.toggle('open', kamusOpenSections[key]);
}

function renderKamusBody() {
  const q       = (document.getElementById('kamusSearch')?.value || '').toLowerCase().trim();
  const bodyEl  = document.getElementById('kamusBody');
  const statEl  = document.getElementById('kamusStatBar');
  const subEl   = document.getElementById('kamusSubtitle');

  // ── MODE PENCARIAN LINTAS KATEGORI ──
  if (q) {
    let allPool = BABS.flatMap(b => b.kotoba.map(k => ({...k, babNum: b.num})));
    if (kamusCoreOnly) allPool = allPool.filter(k => k.lv === 'core');
    allPool = dedupeWords(allPool);

    const matches = allPool.filter(k => {
      const jp = k.jp.replace(/<[^>]+>/g,'').toLowerCase();
      return jp.includes(q) || k.id.toLowerCase().includes(q)
        || k.rom.toLowerCase().includes(q) || (k.furigana||'').toLowerCase().includes(q);
    });

    if (subEl) subEl.textContent = `🔍 Hasil pencarian "${q}" — ${matches.length} kata ditemukan`;
    statEl.innerHTML = `
      <span class="kamus-stat-chip">📊 ${matches.length} kata</span>
      <span class="kamus-stat-chip" style="color:var(--amber);border-color:var(--amber)">🔍 "${escapeHtml(q)}"</span>
      ${kamusCoreOnly ? `<span class="kamus-stat-chip" style="color:var(--green);border-color:var(--green)">✅ Hanya inti</span>` : ''}`;

    if (!matches.length) {
      bodyEl.innerHTML = `<div class="kamus-empty">😕 Tidak ada kata ditemukan untuk "<b>${escapeHtml(q)}</b>".<br><span style="font-size:0.8rem">Coba kata lain atau cek ejaan.</span></div>`;
      return;
    }

    // Kelompokkan hasil per kategori
    const byCat = {};
    matches.forEach(k => {
      if (!byCat[k.cat]) byCat[k.cat] = [];
      byCat[k.cat].push(k);
    });

    // Tampilkan per kategori sesuai urutan KAMUS_CATS, plus kategori lain yang ada
    const catOrder = KAMUS_CATS.map(c => c.key);
    const sortedCats = Object.keys(byCat).sort((a, b) => {
      const ai = catOrder.indexOf(a), bi = catOrder.indexOf(b);
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
    });

    let html = '';
    sortedCats.forEach(cat => {
      const catObj = KAMUS_CATS.find(c => c.key === cat);
      const words  = byCat[cat];
      const secKey = 'search_' + cat;
      const isOpen = kamusOpenSections[secKey] !== false; // default open saat search
      kamusOpenSections[secKey] = isOpen;
      html += `
        <div class="kamus-sub-section${isOpen?' open':''}" id="ksec_${secKey}">
          <div class="kamus-sub-header" onclick="toggleKamusSection('${secKey}')">
            <span class="kamus-sub-icon">${catObj?.icon||'📝'}</span>
            <span class="kamus-sub-title" style="color:var(--accent2)">${cat}</span>
            <span class="kamus-sub-count">${words.length}</span>
            <span class="kamus-sub-chevron">▶</span>
          </div>
          <div class="kamus-sub-body">
            <div class="kotoba-list">${groupedKamusRows(words, q)}</div>
          </div>
        </div>`;
    });
    bodyEl.innerHTML = html;
    return;
  }

  // ── MODE NORMAL (per kategori aktif) ──
  let pool = BABS.flatMap(b => b.kotoba.map(k => ({...k, babNum: b.num})))
               .filter(k => k.cat === kamusActiveCat);
  if (kamusCoreOnly) pool = pool.filter(k => k.lv === 'core');
  pool = dedupeWords(pool);

  const catObj = KAMUS_CATS.find(c => c.key === kamusActiveCat);
  if (subEl) subEl.textContent = `${catObj?.icon||''} ${kamusActiveCat} — ${pool.length} kata${kamusCoreOnly?' (hanya inti)':''}`;

  statEl.innerHTML = `
    <span class="kamus-stat-chip">📊 ${pool.length} kata</span>
    <span class="kamus-stat-chip">📖 Bab 1–${BABS[BABS.length-1].num}</span>
    ${kamusCoreOnly ? `<span class="kamus-stat-chip" style="color:var(--green);border-color:var(--green)">✅ Hanya inti</span>` : ''}`;

  if (!pool.length) {
    bodyEl.innerHTML = `<div class="kamus-empty">😕 Tidak ada kata ditemukan.</div>`;
    return;
  }

  const subDefs = KAMUS_SUBCAT[kamusActiveCat];
  let html = '';

  if (!subDefs) {
    html = buildFlatSection('flat', pool, q);
  } else if (kamusActiveCat === 'Kata Kerja') {
    subDefs.forEach(sub => {
      const words = sortByRom(sub.key !== null ? pool.filter(k => k.grp === sub.key) : pool.filter(k => !k.grp));
      if (!words.length) return;
      html += buildKKSection(sub, words, q);
    });
  } else if (kamusActiveCat === 'Kata Sifat') {
    subDefs.forEach(sub => {
      const words = sortByRom(sub.key !== null ? pool.filter(k => k.grp === sub.key) : pool.filter(k => !k.grp));
      if (!words.length) return;
      html += buildKSSection(sub, words, q);
    });
  } else if (kamusActiveCat === 'Kata Benda') {
    subDefs.forEach(sub => {
      const words = sortByRom(pool.filter(k => (k._sub || kbSubCat(k)) === sub.key));
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Ekspresi') {
    subDefs.forEach(sub => {
      const words = sortByRom(pool.filter(k => (k._sub || ekspresiSubCat(k)) === sub.key));
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Kata Keterangan') {
    subDefs.forEach(sub => {
      const words = sortByRom(pool.filter(k => (k._sub || keteranganSubCat(k)) === sub.key));
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Kata Tanya') {
    subDefs.forEach(sub => {
      const words = sortByRom(pool.filter(k => (k._sub || kataTanyaSubCat(k)) === sub.key));
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Angka') {
    subDefs.forEach(sub => {
      const words = pool.filter(k => (k._sub || angkaSubCat(k)) === sub.key); // preserve original order for angka
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Kata Tunjuk') {
    subDefs.forEach(sub => {
      const words = pool.filter(k => (k._sub || kataTunjukSubCat(k)) === sub.key);
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Posisi') {
    subDefs.forEach(sub => {
      const words = pool.filter(k => (k._sub || posisiSubCat(k)) === sub.key);
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Konjungsi') {
    subDefs.forEach(sub => {
      const words = pool.filter(k => (k._sub || konjungsiSubCat(k)) === sub.key);
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Partikel') {
    html = buildFlatSection('flat_partikel', pool, q);
  } else {
    html = buildFlatSection('flat_' + kamusActiveCat, pool, q);
  }

  bodyEl.innerHTML = html || `<div class="kamus-empty">Tidak ada kata di kategori ini.</div>`;
}

function buildKKSection(sub, words, q) {
  const isOpen = !!kamusOpenSections[sub.key ?? 'null'];
  const hintHtml = sub.hint ? `<div class="kamus-conj-hint">${sub.hint.map(h =>
    `<span class="kamus-conj-chip">${h.ex}</span>`).join('')}</div>` : '';
  const descHtml = sub.desc ? `<div style="font-size:0.74rem;color:var(--text2);margin-bottom:10px;line-height:1.6">${sub.desc}</div>` : '';
  const badgeHtml = sub.badgeCls ? `<span class="kotoba-grp ${sub.badgeCls}" style="font-size:0.7rem">${sub.key||'?'}</span>` : '';
  return `
  <div class="kamus-sub-section${isOpen?' open':''}" id="ksec_${sub.key??'null'}">
    <div class="kamus-sub-header" onclick="toggleKamusSection('${sub.key??'null'}')">
      <span class="kamus-sub-icon" style="color:${sub.color}">${sub.icon}</span>
      ${badgeHtml}
      <span class="kamus-sub-title" style="color:${sub.color}">${sub.label}</span>
      <span class="kamus-sub-count">${words.length}</span>
      <span class="kamus-sub-chevron">▶</span>
    </div>
    <div class="kamus-sub-body">
      ${hintHtml}${descHtml}
      <div class="kotoba-list">${groupedKamusRows(words, q)}</div>
    </div>
  </div>`;
}

function buildKSSection(sub, words, q) {
  const isOpen = !!kamusOpenSections[sub.key ?? 'ks_null'];
  const hintHtml = sub.hint ? `<div class="kamus-conj-hint">${sub.hint.map(h =>
    `<span class="kamus-conj-chip">${h.ex}</span>`).join('')}</div>` : '';
  const descHtml = sub.desc ? `<div style="font-size:0.74rem;color:var(--text2);margin-bottom:10px;line-height:1.6">${sub.desc}</div>` : '';
  const badgeHtml = sub.badgeCls ? `<span class="kotoba-grp ${sub.badgeCls}" style="font-size:0.7rem">${sub.key||'?'}</span>` : '';
  return `
  <div class="kamus-sub-section${isOpen?' open':''}" id="ksec_${sub.key??'ks_null'}">
    <div class="kamus-sub-header" onclick="toggleKamusSection('${sub.key??'ks_null'}')">
      <span class="kamus-sub-icon" style="color:${sub.color}">${sub.icon}</span>
      ${badgeHtml}
      <span class="kamus-sub-title" style="color:${sub.color}">${sub.label}</span>
      <span class="kamus-sub-count">${words.length}</span>
      <span class="kamus-sub-chevron">▶</span>
    </div>
    <div class="kamus-sub-body">
      ${hintHtml}${descHtml}
      <div class="kotoba-list">${groupedKamusRows(words, q)}</div>
    </div>
  </div>`;
}

function buildGenSection(secKey, label, icon, color, words, q) {
  const isOpen = !!kamusOpenSections[secKey];
  return `
  <div class="kamus-sub-section${isOpen?' open':''}" id="ksec_${secKey}">
    <div class="kamus-sub-header" onclick="toggleKamusSection('${secKey}')">
      <span class="kamus-sub-icon">${icon}</span>
      <span class="kamus-sub-title" style="color:${color}">${label}</span>
      <span class="kamus-sub-count">${words.length}</span>
      <span class="kamus-sub-chevron">▶</span>
    </div>
    <div class="kamus-sub-body">
      <div class="kotoba-list">${groupedKamusRows(words, q)}</div>
    </div>
  </div>`;
}

function buildFlatSection(secKey, words, q) {
  const isOpen = !!kamusOpenSections[secKey];
  const sorted = sortByRom(words);
  return `
  <div class="kamus-sub-section${isOpen?' open':''}" id="ksec_${secKey}">
    <div class="kamus-sub-header" onclick="toggleKamusSection('${secKey}')">
      <span class="kamus-sub-title" style="color:var(--accent2)">Semua Kata</span>
      <span class="kamus-sub-count">${words.length}</span>
      <span class="kamus-sub-chevron">▶</span>
    </div>
    <div class="kamus-sub-body">
      <div class="kotoba-list">${groupedKamusRows(sorted, q)}</div>
    </div>
  </div>`;
}

function highlight(text, q) {
  // Escape teks dulu, baru inject <mark>. Mencegah XSS dari query
  // yang masuk ke innerHTML, dan dari teks yang berisi karakter HTML.
  const safeText = escapeHtml(text);
  if (!q) return safeText;
  const safeQ = escapeHtml(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return safeText.replace(new RegExp(`(${safeQ})`, 'gi'),
    '<mark style="background:rgba(124,106,247,0.35);color:inherit;border-radius:2px">$1</mark>');
}

// Render rows with subtle thematic dividers between groups
function groupedKamusRows(words, q) {
  let html = '';
  let prevGid = undefined;
  words.forEach(w => {
    const gid = w._gid !== undefined ? w._gid : -1;
    if (prevGid !== undefined && gid !== prevGid && gid >= 0 && prevGid >= 0) {
      // Different group: add thin divider
      html += '<div class="kamus-group-sep"></div>';
    }
    html += kamusRow(w, q);
    prevGid = gid;
  });
  return html;
}

function kamusRow(k, q) {
  const grpBadge = k.grp ? `<span class="kotoba-grp grp-${escapeHtml(k.grp)}" style="font-size:0.66rem;flex-shrink:0">${escapeHtml(k.grp)}</span>` : '';
  const idText   = highlight(k.id, q);
  return `<div class="kamus-row">
    <div style="flex-shrink:0">
      <div class="kamus-row-jp">${k.jp}</div>
      <div class="kamus-row-rom">${highlight(k.rom, q)}</div>
    </div>
    <div class="kamus-row-id">${idText}</div>
    ${grpBadge}
    <span class="kamus-row-bab">Bab ${escapeHtml(k.babNum)}</span>
  </div>`;
}

