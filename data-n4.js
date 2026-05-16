// ========== DATA N4 (Bab 36-78) ==========
const BABS_N4 = [
{
  num: 36,
  title: "Petunjuk Arah & Perangkat",
  sub: "KK bentuk kamus と、〜 (Kalau…, maka….)",
  color: "bab-36",
  tips: [
    {icon:"💡", title:"Tips: と vs たら vs ば", points:[
      "<b>と</b> = kondisi alami/otomatis, hasil PASTI terjadi. Cocok untuk petunjuk arah, mesin, alam.",
      "<b>たら</b> (bab 37-38) = kondisi hipotetis, bisa untuk saran/keinginan.",
      "<b>ば</b> (bab lanjut) = kondisi logis, lebih formal.",
      "と TIDAK bisa diikuti kalimat berisi keinginan (~たい), ajakan (~ましょう), atau perintah (~てください)."
    ]},
    {icon:"🗺️", title:"Petunjuk Arah dengan と", points:[
      "まっすぐ いくと、〜があります = kalau jalan lurus, ada 〜",
      "<ruby><rb>角</rb><rt>かど</rt></ruby>を まがると、〜がみえます = kalau belok di tikungan, terlihat 〜",
      "<ruby><rb>交差点</rb><rt>こうさてん</rt></ruby>を わたると、<ruby><rb>右</rb><rt>みぎ</rt></ruby>に 〜があります = kalau menyeberang persimpangan, di kanan ada 〜"
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK bentuk kamus と、〜",
      pattern: "KK bentuk kamus と、〜 (klausa utama)",
      desc: "Pola kalimat ini digunakan untuk menunjukkan situasi atau keadaan (yang terjadi sebelum と), kemudian diikuti dengan situasi atau keadaan (setelah と) yang pasti akan terjadi. Digunakan untuk petunjuk arah, cara kerja mesin/alat, dan fenomena alam.",
      reibun: [
        {jp:"この ボタンを <ruby><rb>押</rb><rt>お</rt></ruby>すと、おつりが <ruby><rb>出</rb><rt>で</rt></ruby>ます。", rom:"Kono botan o osu to, otsuri ga demasu.", id:"Kalau menekan tombol ini, kembalian akan keluar."},
        {jp:"お<ruby><rb>酒</rb><rt>さけ</rt></ruby>を <ruby><rb>飲</rb><rt>の</rt></ruby>むと、<ruby><rb>顔</rb><rt>かお</rt></ruby>が <ruby><rb>赤</rb><rt>あか</rt></ruby>く なります。", rom:"Osakeo nomu to, kao ga akaku narimasu.", id:"Kalau minum sake, wajah jadi merah."},
        {jp:"あの <ruby><rb>交差点</rb><rt>こうさてん</rt></ruby>を まっすぐ <ruby><rb>行</rb><rt>い</rt></ruby>くと、スーパーが あります。", rom:"Ano kōsaten o massugu iku to, sūpā ga arimasu.", id:"Kalau jalan lurus di persimpangan itu, ada supermarket."}
      ],
      note: {type:"amber", text:"<b>⚠️ Batasan pola と:</b> Klausa setelah と TIDAK boleh berisi: keinginan (~たい), ajakan (~ましょう), permintaan (~てください), atau perintah/larangan. Gunakan たら atau ば untuk kasus tersebut."}
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>思</rb><rt>おも</rt></ruby>い<ruby><rb>出</rb><rt>で</rt></ruby>します",furigana:"おもいだします",rom:"omoidashimasu",id:"mengingat kembali; teringat",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（ドアに）<ruby><rb>触</rb><rt>さわ</rt></ruby>ります",furigana:"（どあに）さわります",rom:"(doa ni) sawarimasu",id:"menyentuh (pintu)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（お<ruby><rb>釣</rb><rt>つ</rt></ruby>りが）<ruby><rb>出</rb><rt>で</rt></ruby>ます",furigana:"（おつりが）でます",rom:"(otsuri ga) demasu",id:"keluar (uang kembalian)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>時計</rb><rt>とけい</rt></ruby>が）<ruby><rb>動</rb><rt>うご</rt></ruby>きます",furigana:"（とけいが）うごきます",rom:"(tokei ga) ugokimasu",id:"bergerak/berjalan (jam)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>道</rb><rt>みち</rt></ruby>を）<ruby><rb>歩</rb><rt>ある</rt></ruby>きます",furigana:"（みちを）あるきます",rom:"(michi o) arukimasu",id:"berjalan kaki (di jalan)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>橋</rb><rt>はし</rt></ruby>を）<ruby><rb>渡</rb><rt>わた</rt></ruby>ります",furigana:"（はしを）わたります",rom:"(hashi o) watarimasu",id:"menyeberang (jembatan)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>気</rb><rt>き</rt></ruby>をつけます",furigana:"きをつけます",rom:"ki o tsukemasu",id:"berhati-hati; berwaspada",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>回</rb><rt>まわ</rt></ruby>します",furigana:"まわします",rom:"mawashimasu",id:"memutar",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>引</rb><rt>ひ</rt></ruby>きます",furigana:"ひきます",rom:"hikimasu",id:"tarik",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>電気屋</rb><rt>でんきや</rt></ruby>",furigana:"でんきや",rom:"denkiya",id:"toko alat elektronik",cat:"Kata Benda",lv:"core"},
    {jp:"〜<ruby><rb>屋</rb><rt>や</rt></ruby>",furigana:"〜や",rom:"~ya",id:"toko ~",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>道</rb><rt>みち</rt></ruby>",furigana:"みち",rom:"michi",id:"jalan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>交差点</rb><rt>こうさてん</rt></ruby>",furigana:"こうさてん",rom:"kōsaten",id:"persimpangan; perempatan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>信号</rb><rt>しんごう</rt></ruby>",furigana:"しんごう",rom:"shingō",id:"lampu lalu lintas; sinyal",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>角</rb><rt>かど</rt></ruby>",furigana:"かど",rom:"kado",id:"tikungan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>駐車場</rb><rt>ちゅうしゃじょう</rt></ruby>",furigana:"ちゅうしゃじょう",rom:"chūshajō",id:"tempat parkir",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>建物</rb><rt>たてもの</rt></ruby>",furigana:"たてもの",rom:"tatemono",id:"bangunan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>場所</rb><rt>ばしょ</rt></ruby>",furigana:"ばしょ",rom:"basho",id:"tempat",cat:"Kata Benda",lv:"core"},
    {jp:"つまみ",furigana:"",rom:"tsumami",id:"tombol putaran; knop",cat:"Kata Benda",lv:"core"},
    {jp:"レバー",furigana:"",rom:"rebā",id:"tuas",cat:"Kata Benda",lv:"core"},
    {jp:"おつり",furigana:"",rom:"otsuri",id:"uang kembalian",cat:"Kata Benda",lv:"core"},
    {jp:"〜め",furigana:"",rom:"~me",id:"yang ke ~",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>橋</rb><rt>はし</rt></ruby>",furigana:"はし",rom:"hashi",id:"jembatan",cat:"Kata Benda",lv:"extra"}
  ]
},
{
  num: 37,
  title: "Kondisi Hipotetis たら",
  sub: "Bentuk biasa lampau 〜たら、〜 (Kalau 〜)",
  color: "bab-37",
  tips: [
    {icon:"💡", title:"Tips: Cara membentuk 〜たら", points:[
      "Ambil bentuk lampau biasa (た/だ) lalu tambahkan ら:",
      "のみます → のんだ → <b>のんだら</b>",
      "たべます → たべた → <b>たべたら</b>",
      "くれいです → きれいだった → <b>きれいだったら</b>",
      "あめです → あめだった → <b>あめだったら</b>"
    ]},
    {icon:"⚠️", title:"たら vs と — Perbedaan Kunci", points:[
      "<b>と</b>: Hasil PASTI, otomatis. Tidak bisa pakai keinginan/ajakan.",
      "<b>たら</b>: Kondisi hipotetis. BISA pakai keinginan (〜たい), ajakan (〜ましょう), permintaan (〜てください).",
      "もし digunakan bersama たら untuk menekankan kondisi yang belum tentu terjadi."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "Bentuk biasa lampau 〜たら、〜",
      pattern: "Bentuk lampau + ら、(klausa utama)",
      desc: "Menambahkan ら di belakang kata kerja, kata sifat atau kata benda bentuk biasa lampau dapat menunjukkan suatu kondisi tertentu. Klausa utama menjelaskan apa yang akan dilakukan jika klausa bersyarat itu terjadi. Pendapat pembicara berupa keinginan, ajakan, permintaan, dll., dapat diungkapkan dalam klausa utama (setelah 〜たら). Penggunaan もし yang diikuti dengan bentuk 〜たら berfungsi untuk lebih menekankan atau menegaskan keinginan pembicara.",
      reibun: [
        {jp:"もし 1<ruby><rb>億</rb><rt>おく</rt></ruby>円 あったら、<ruby><rb>家</rb><rt>いえ</rt></ruby>を <ruby><rb>買</rb><rt>か</rt></ruby>いたいです。", rom:"Moshi ichi-oku-en attara, ie o kaitai desu.", id:"Kalau ada 100 juta yen, ingin beli rumah."},
        {jp:"あした <ruby><rb>忙</rb><rt>いそが</rt></ruby>しくなかったら、いっしょに <ruby><rb>晩</rb><rt>ばん</rt></ruby>ごはんを <ruby><rb>食</rb><rt>た</rt></ruby>べに <ruby><rb>行</rb><rt>い</rt></ruby>きましょう。", rom:"Ashita isogashiku nakattara, issho ni bangohan o tabe ni ikimashō.", id:"Kalau besok tidak sibuk, ayo makan malam bersama."},
        {jp:"もし <ruby><rb>雨</rb><rt>あめ</rt></ruby>だったら、タクシーで <ruby><rb>行</rb><rt>い</rt></ruby>きます。", rom:"Moshi ame dattara, takushī de ikimasu.", id:"Kalau hujan, akan pergi dengan taksi."}
      ],
      note: {type:"teal", text:"<b>💡 Konjugasi 〜たら:</b><br>KK グループI: のむ→のんだ→<b>のんだら</b> / まつ→まった→<b>まったら</b><br>KK グループII: たべる→たべた→<b>たべたら</b><br>KK グループIII: くる→きた→<b>きたら</b> / する→した→<b>したら</b><br>KS い: あつい→あつかった→<b>あつかったら</b><br>KS な: きれいだ→きれいだった→<b>きれいだったら</b><br>KB: あめだ→あめだった→<b>あめだったら</b>"}
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>考</rb><rt>かんが</rt></ruby>えます",furigana:"かんがえます",rom:"kangaemasu",id:"memikirkan; mempertimbangkan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>駅</rb><rt>えき</rt></ruby>に）<ruby><rb>着</rb><rt>つ</rt></ruby>きます",furigana:"（えきに）つきます",rom:"(eki ni) tsukimasu",id:"tiba (di stasiun)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>留学</rb><rt>りゅうがく</rt></ruby>します",furigana:"りゅうがくします",rom:"ryūgaku shimasu",id:"belajar di luar negeri",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>無理</rb><rt>むり</rt></ruby>（な）",furigana:"むり（な）",rom:"muri (na)",id:"tidak mungkin",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>田舎</rb><rt>いなか</rt></ruby>",furigana:"いなか",rom:"inaka",id:"pedesaan; kampung",cat:"Kata Benda",lv:"core"},
    {jp:"グループ",furigana:"",rom:"gurūpu",id:"grup; kelompok",cat:"Kata Benda",lv:"core"},
    {jp:"チャンス",furigana:"",rom:"chansu",id:"kesempatan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>億</rb><rt>おく</rt></ruby>",furigana:"おく",rom:"oku",id:"seratus juta",cat:"Kata Benda",lv:"core"},
    {jp:"もし（〜たら）",furigana:"",rom:"moshi (~tara)",id:"jika 〜; kalau 〜",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>世界旅行</rb><rt>せかいりょこう</rt></ruby>",furigana:"せかいりょこう",rom:"sekai ryokō",id:"wisata keliling dunia",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>値段</rb><rt>ねだん</rt></ruby>",furigana:"ねだん",rom:"nedan",id:"harga",cat:"Kata Benda",lv:"core"}
  ]
},
{
  num: 38,
  title: "Setelah/Ketika たら",
  sub: "KK bentuk たら、(klausa utama) — Ketika/Setelah/Saat….",
  color: "bab-38",
  tips: [
    {icon:"💡", title:"たら untuk urutan kejadian", points:[
      "KK たら digunakan untuk menyatakan suatu tindakan tertentu akan dilakukan SETELAH suatu hal yang dipastikan akan terjadi.",
      "Berbeda dengan たら kondisional (bab 37): di sini klausa たら lebih kepada urutan waktu.",
      "Contoh: <ruby><rb>駅</rb><rt>えき</rt></ruby>に <ruby><rb>着いた</rb><rt>ついた</rt></ruby>ら、<ruby><rb>電話</rb><rt>でんわ</rt></ruby>して ください = Setelah tiba di stasiun, tolong telepon."
    ]},
    {icon:"⚠️", title:"Perbedaan たら kondisional vs temporal", points:[
      "<b>Kondisional</b> (bab 37): もし 〜たら = Kalau seandainya... (belum tentu terjadi)",
      "<b>Temporal</b> (bab 38): 〜たら、すぐ = Setelah/saat..., langsung... (pasti terjadi)"
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK bentuk たら、(klausa utama)",
      pattern: "KK たら、(klausa utama)",
      desc: "Pola ini digunakan untuk menyatakan suatu tindakan tertentu akan dilakukan atau situasi tertentu akan timbul setelah suatu hal, tindakan, atau situasi tertentu yang dipastikan akan terjadi menurut pembicara. Artinya: Ketika/Setelah/Saat....",
      reibun: [
        {jp:"<ruby><rb>駅</rb><rt>えき</rt></ruby>に <ruby><rb>着</rb><rt>つ</rt></ruby>いたら、<ruby><rb>電話</rb><rt>でんわ</rt></ruby>して ください。", rom:"Eki ni tsuitara, denwa shite kudasai.", id:"Setelah tiba di stasiun, tolong telepon."},
        {jp:"うちへ <ruby><rb>帰</rb><rt>かえ</rt></ruby>ったら、すぐ シャワーを <ruby><rb>浴</rb><rt>あ</rt></ruby>びます。", rom:"Uchi e kaettara, sugu shawā o abimasu.", id:"Setelah pulang ke rumah, langsung mandi."},
        {jp:"<ruby><rb>夏休</rb><rt>なつやす</rt></ruby>みに なったら、<ruby><rb>田舎</rb><rt>いなか</rt></ruby>へ <ruby><rb>帰</rb><rt>かえ</rt></ruby>ります。", rom:"Natsuyasumi ni nattara, inaka e kaerimasu.", id:"Saat liburan musim panas tiba, akan pulang ke kampung."}
      ]
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>年</rb><rt>とし</rt></ruby>を）<ruby><rb>取</rb><rt>と</rt></ruby>ります",furigana:"（としを）とります",rom:"(toshi o) torimasu",id:"(usia) menua",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>就職</rb><rt>しゅうしょく</rt></ruby>します",furigana:"しゅうしょくします",rom:"shūshoku shimasu",id:"bekerja",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>離婚</rb><rt>りこん</rt></ruby>します",furigana:"りこんします",rom:"rikon shimasu",id:"bercerai",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>再婚</rb><rt>さいこん</rt></ruby>します",furigana:"さいこんします",rom:"saikon shimasu",id:"menikah lagi",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>足</rb><rt>た</rt></ruby>ります",furigana:"たります",rom:"tarimasu",id:"cukup; memadai",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>頑張</rb><rt>がんば</rt></ruby>ります",furigana:"がんばります",rom:"ganbarimasu",id:"berjuang; berusaha",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>宇宙</rb><rt>うちゅう</rt></ruby>",furigana:"うちゅう",rom:"uchū",id:"luar angkasa; alam semesta",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>宇宙飛行士</rb><rt>うちゅうひこうし</rt></ruby>",furigana:"うちゅうひこうし",rom:"uchū hikōshi",id:"astronot",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>建築家</rb><rt>けんちくか</rt></ruby>",furigana:"けんちくか",rom:"kenchikuka",id:"arsitek",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>外交官</rb><rt>がいこうかん</rt></ruby>",furigana:"がいこうかん",rom:"gaikōkan",id:"diplomat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>観光</rb><rt>かんこう</rt></ruby>",furigana:"かんこう",rom:"kankō",id:"wisata; jalan-jalan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>通訳</rb><rt>つうやく</rt></ruby>",furigana:"つうやく",rom:"tsūyaku",id:"juru bahasa",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>夏休</rb><rt>なつやす</rt></ruby>み",furigana:"なつやすみ",rom:"natsuyasumi",id:"liburan musim panas",cat:"Kata Benda",lv:"extra"},
    {jp:"スケジュール",furigana:"",rom:"sukejūru",id:"jadwal",cat:"Kata Benda",lv:"extra"}
  ]
},
{
  num: 39,
  title: "Walaupun (〜ても)",
  sub: "〜ても : Walaupun 〜",
  color: "bab-39",
  tips: [
    {icon:"💡", title:"Tips: Cara membentuk 〜ても", points:[
      "KK bentuk て + も: たべて → <b>たべても</b>",
      "KK bentuk ない なくて + も: たべない → たべなくて → <b>たべなくても</b>",
      "KS い: あつい → あつくて → <b>あつくても</b>",
      "KS な: きれい → きれいで → <b>きれいでも</b>",
      "KB: あめ → あめで → <b>あめでも</b>"
    ]},
    {icon:"⚠️", title:"ても vs たら — Perbedaan Kunci", points:[
      "<b>ても</b>: Walaupun kondisi X, tetap Y (berlawanan harapan).",
      "<b>たら</b>: Kalau kondisi X, maka Y (kondisi → hasil).",
      "いくら 〜ても = Bagaimanapun caranya 〜 (penegas)."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "〜ても",
      pattern: "〜ても、〜 (klausa utama)",
      desc: "Pola kalimat ini digunakan untuk mengatakan sesuatu yang berlawanan dengan apa yang biasanya dipikirkan seseorang. Klausa dibelakang ても menggambarkan sesuatu yang biasanya diharapkan tidak terjadi atau dilakukan.",
      reibun: [
        {jp:"<ruby><rb>高</rb><rt>たか</rt></ruby>くても、この <ruby><rb>車</rb><rt>くるま</rt></ruby>を <ruby><rb>買</rb><rt>か</rt></ruby>います。", rom:"Takakute mo, kono kuruma o kaimasu.", id:"Walaupun mahal, akan membeli mobil ini."},
        {jp:"<ruby><rb>日曜日</rb><rt>にちようび</rt></ruby>でも、<ruby><rb>仕事</rb><rt>しごと</rt></ruby>を します。", rom:"Nichiyōbi de mo, shigoto o shimasu.", id:"Walaupun hari Minggu, tetap bekerja."},
        {jp:"いくら <ruby><rb>考</rb><rt>かんが</rt></ruby>えても、わかりません。", rom:"Ikura kangaete mo, wakarimasen.", id:"Bagaimanapun saya memikirkannya, tetap tidak mengerti."}
      ]
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>宝</rb><rt>たから</rt></ruby>くじに）<ruby><rb>当</rb><rt>あ</rt></ruby>たります",furigana:"（たからくじに）あたります",rom:"(takarakuji ni) atarimasu",id:"menang (lotre)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>続</rb><rt>つづ</rt></ruby>けます",furigana:"つづけます",rom:"tsuzukemasu",id:"meneruskan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>貯金</rb><rt>ちょきん</rt></ruby>します",furigana:"ちょきんします",rom:"chokin shimasu",id:"menabung",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>素晴</rb><rt>すば</rt></ruby>らしい",furigana:"すばらしい",rom:"subarashii",id:"hebat",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>美</rb><rt>うつく</rt></ruby>しい",furigana:"うつくしい",rom:"utsukushii",id:"indah; cantik",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>寂</rb><rt>さび</rt></ruby>しい",furigana:"さびしい",rom:"sabishii",id:"kesepian",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"ストレス",furigana:"",rom:"sutoresu",id:"stres",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>宝</rb><rt>たから</rt></ruby>くじ",furigana:"たからくじ",rom:"takarakuji",id:"lotre",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>自分</rb><rt>じぶん</rt></ruby>",furigana:"じぶん",rom:"jibun",id:"diri sendiri",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>職場</rb><rt>しょくば</rt></ruby>",furigana:"しょくば",rom:"shokuba",id:"tempat kerja",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>給料</rb><rt>きゅうりょう</rt></ruby>",furigana:"きゅうりょう",rom:"kyūryō",id:"gaji",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>将来</rb><rt>しょうらい</rt></ruby>",furigana:"しょうらい",rom:"shōrai",id:"masa depan",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>美術</rb><rt>びじゅつ</rt></ruby>",furigana:"びじゅつ",rom:"bijutsu",id:"seni",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>幸</rb><rt>しあわ</rt></ruby>せに <ruby><rb>暮</rb><rt>く</rt></ruby>らします",furigana:"しあわせにくらします",rom:"shiawase ni kurashimasu",id:"hidup bahagia",cat:"Ekspresi",lv:"extra"},
    {jp:"いくら（〜ても）",furigana:"",rom:"ikura (~te mo)",id:"bagaimanapun caranya 〜",cat:"Ekspresi",lv:"core"}
  ]
},
{
  num: 40,
  title: "Penjelasan & Alasan (〜んです)",
  sub: "〜んです : Alasannya adalah…; Faktanya adalah…",
  color: "bab-40",
  tips: [
    {icon:"💡", title:"Tips: Kapan pakai 〜んです", points:[
      "Gunakan 〜んです saat menjelaskan ALASAN atau KONDISI suatu situasi.",
      "Juga digunakan dalam bentuk tanya untuk meminta penjelasan: どうしたんですか？",
      "〜んです membuat percakapan terasa lebih hangat dan personal.",
      "Bandingkan: <ruby><rb>雨が</rb><rt>あめが</rt></ruby> <ruby><rb>降</rb><rt>ふ</rt></ruby>っています (netral) vs <ruby><rb>雨が</rb><rt>あめが</rt></ruby> <ruby><rb>降</rb><rt>ふ</rt></ruby>っているんです (menjelaskan situasi/alasan)."
    ]},
    {icon:"📝", title:"Konjugasi 〜んです", points:[
      "KK/KS い (bentuk biasa) + んです: たべる → <b>たべるんです</b>",
      "KS な (bentuk biasa, だ→な) + んです: きれいだ → <b>きれいなんです</b>",
      "KB (bentuk biasa, だ→な) + んです: がくせいだ → <b>がくせいなんです</b>"
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "〜んです",
      pattern: "〜んです (Alasannya adalah…; Faktanya adalah…; Itu adalah…)",
      desc: "〜んです digunakan ketika menjelaskan alasan atau kondisi sesuatu. 〜んです juga bisa digunakan dalam bentuk pertanyaan untuk meminta penjelasan lebih lanjut dari lawan bicara.",
      reibun: [
        {jp:"A: どうしたんですか。（kenapa?）<br>B: <ruby><rb>気分</rb><rt>きぶん</rt></ruby>が <ruby><rb>悪</rb><rt>わる</rt></ruby>いんです。", rom:"A: Dō shita n desu ka. B: Kibun ga warui n desu.", id:"A: Ada apa? B: Badan saya sedang tidak enak."},
        {jp:"A: どうして <ruby><rb>日本語</rb><rt>にほんご</rt></ruby>を <ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>して いるんですか。<br>B: <ruby><rb>日本人</rb><rt>にほんじん</rt></ruby>と <ruby><rb>話</rb><rt>はな</rt></ruby>したいんです。", rom:"A: Dōshite nihongo o benkyō shite iru n desu ka. B: Nihonjin to hanashitai n desu.", id:"A: Kenapa belajar bahasa Jepang? B: Karena ingin berbicara dengan orang Jepang."}
      ],
      note: {type:"blue", text:"<b>💡 Konjugasi 〜んです:</b><br>KK bentuk biasa + んです: たべる → たべるんです<br>KS い bentuk biasa + んです: あつい → あついんです<br>KS な: きれいだ → きれい<b>な</b>んです (だ→な)<br>KB: がくせいだ → がくせい<b>な</b>んです (だ→な)"}
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>診</rb><rt>み</rt></ruby>ます",furigana:"みます",rom:"mimasu",id:"memeriksa; melihat",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>遅</rb><rt>おく</rt></ruby>れます",furigana:"おくれます",rom:"okuremasu",id:"terlambat",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>間</rb><rt>ま</rt></ruby>に<ruby><rb>合</rb><rt>あ</rt></ruby>います",furigana:"まにあいます",rom:"ma ni aimasu",id:"tepat waktu",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>連絡</rb><rt>れんらく</rt></ruby>します",furigana:"れんらくします",rom:"renraku shimasu",id:"menghubungi",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>都合</rb><rt>つごう</rt></ruby>がいい",furigana:"つごうがいい",rom:"tsugō ga ii",id:"tepat; cocok (waktu)",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>都合</rb><rt>つごう</rt></ruby>が<ruby><rb>悪</rb><rt>わる</rt></ruby>い",furigana:"つごうがわるい",rom:"tsugō ga warui",id:"tidak tepat; susah (waktu)",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>気分</rb><rt>きぶん</rt></ruby>がいい",furigana:"きぶんがいい",rom:"kibun ga ii",id:"merasa enak badan",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>気分</rb><rt>きぶん</rt></ruby>が<ruby><rb>悪</rb><rt>わる</rt></ruby>い",furigana:"きぶんがわるい",rom:"kibun ga warui",id:"merasa tidak enak badan",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>運動会</rb><rt>うんどうかい</rt></ruby>",furigana:"うんどうかい",rom:"undōkai",id:"lomba olahraga",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>平日</rb><rt>へいじつ</rt></ruby>",furigana:"へいじつ",rom:"heijitsu",id:"hari kerja",cat:"Kata Benda",lv:"core"},
    {jp:"ごみ",furigana:"",rom:"gomi",id:"sampah",cat:"Kata Benda",lv:"core"},
    {jp:"どうしたんですか",furigana:"",rom:"dō shita n desu ka",id:"kenapa? ada apa?",cat:"Ekspresi",lv:"core"}
  ]
},
{
  num: 41,
  title: "Meminta Bantuan (〜んですが)",
  sub: "〜んですが、〜 (Menyampaikan topik + permintaan)",
  color: "bab-41",
  tips: [
    {icon:"💡", title:"Tips: 〜んですが vs 〜んです", points:[
      "〜んです = menjelaskan kondisi/alasan (pernyataan selesai).",
      "〜んですが = menjelaskan kondisi lalu melanjutkan ke permintaan/pertanyaan.",
      "〜が di sini berfungsi sebagai pengantar topik, bukan 'tapi'.",
      "Lebih sopan: 〜て いただけませんか (vs 〜てください)."
    ]},
    {icon:"⚠️", title:"〜て いただけませんか vs 〜てください", points:[
      "〜てください = permintaan langsung (agak memerintah).",
      "〜て いただけませんか = meminta dengan sangat sopan kepada lawan bicara.",
      "〜たら いいですか = meminta saran/arahan cara terbaik."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "〜んですが、〜",
      pattern: "〜んですが、(permintaan/pertanyaan)",
      desc: "〜んですが digunakan untuk menyampaikan topik yang diikuti bentuk permintaan, ajakan, atau ungkapan meminta izin. Partikel が dalam pola kalimat ini digunakan untuk pengantar topik atau pokok pembicaraan berikutnya.",
      reibun: [
        {jp:"<ruby><rb>日本語</rb><rt>にほんご</rt></ruby>で メールを <ruby><rb>書</rb><rt>か</rt></ruby>いたんですが、ちょっと <ruby><rb>見</rb><rt>み</rt></ruby>て いただけませんか。", rom:"Nihongo de mēru o kaita n desu ga, chotto mite itadakemasen ka.", id:"Saya telah menulis email dalam bahasa Jepang, bisakah Anda sedikit memeriksanya?"},
        {jp:"ディズニーシーへ <ruby><rb>行</rb><rt>い</rt></ruby>きたいんですが、どうやって <ruby><rb>行</rb><rt>い</rt></ruby>ったら いいですか。", rom:"Dizunīshī e ikitai n desu ga, dō yatte ittara ii desu ka.", id:"Saya ingin pergi ke DisneySea, bagaimana cara terbaik ke sana?"}
      ],
      note: {type:"blue", text:"<b>💡 〜て いただけませんか</b><br>Bentuk yang lebih sopan untuk meminta lawan bicara melakukan sesuatu (dibanding 〜てください). Pola: KK bentuk て + いただけませんか. Contoh: <ruby><rb>見</rb><rt>み</rt></ruby>てください → <b><ruby><rb>見</rb><rt>み</rt></ruby>ていただけませんか</b>"}
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>探</rb><rt>さが</rt></ruby>します",furigana:"さがします",rom:"sagashimasu",id:"mencari",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"やります",furigana:"",rom:"yarimasu",id:"melakukan; mengerjakan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>参加</rb><rt>さんか</rt></ruby>します",furigana:"さんかします",rom:"sanka shimasu",id:"berpartisipasi; mengikuti",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>申</rb><rt>もう</rt></ruby>し<ruby><rb>込</rb><rt>こ</rt></ruby>みます",furigana:"もうしこみます",rom:"mōshikomimasu",id:"mendaftar",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"チェックします",furigana:"",rom:"chekku shimasu",id:"mengecek; memeriksa",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"アプリ",furigana:"",rom:"apuri",id:"aplikasi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>場所</rb><rt>ばしょ</rt></ruby>",furigana:"ばしょ",rom:"basho",id:"tempat",cat:"Kata Benda",lv:"core"},
    {jp:"ボランティア",furigana:"",rom:"borantia",id:"volunter; sukarelawan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>燃</rb><rt>も</rt></ruby>えるごみ",furigana:"もえるごみ",rom:"moeru gomi",id:"sampah organik",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>料理教室</rb><rt>りょうりきょうしつ</rt></ruby>",furigana:"りょうりきょうしつ",rom:"ryōri kyōshitsu",id:"kelas memasak",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>今度</rb><rt>こんど</rt></ruby>",furigana:"こんど",rom:"kondo",id:"kali ini; lain kali",cat:"Kata Keterangan",lv:"core"},
    {jp:"ずいぶん",furigana:"",rom:"zuibun",id:"sangat; amat",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>直接</rb><rt>ちょくせつ</rt></ruby>",furigana:"ちょくせつ",rom:"chokusetsu",id:"langsung",cat:"Kata Keterangan",lv:"core"},
    {jp:"いつでも",furigana:"",rom:"itsudemo",id:"kapan pun",cat:"Ekspresi",lv:"core"},
    {jp:"どこでも",furigana:"",rom:"dokodemo",id:"di mana pun",cat:"Ekspresi",lv:"core"},
    {jp:"だれでも",furigana:"",rom:"daredemo",id:"siapa pun",cat:"Ekspresi",lv:"core"},
    {jp:"なんでも",furigana:"",rom:"nandemo",id:"apa pun",cat:"Ekspresi",lv:"core"}
  ]
},
{
  num: 42,
  title: "Kata Kerja Potensial & しか",
  sub: "可能動詞 (bisa 〜) / しか〜ません (hanya) / は perbandingan",
  color: "bab-42",
  tips: [
    {icon:"💡", title:"Cara Membentuk Kata Kerja Potensial", points:[
      "<b>Grup I</b>: Ganti akhiran u→eru. のむ→<b>のめる</b>, かく→<b>かける</b>, いく→<b>いける</b>",
      "<b>Grup II</b>: Tambah られる. たべる→<b>たべられる</b>, みる→<b>みられる</b>",
      "<b>Grup III</b>: くる→<b>こられる</b>, する→<b>できる</b>",
      "Partikel objek berubah: を → <b>が</b> (umumnya, meskipun を juga dapat digunakan)."
    ]},
    {icon:"⚠️", title:"しか + bentuk negatif", points:[
      "しか selalu diikuti bentuk NEGATIF kata kerja.",
      "ひらがなしか よめません = hanya bisa membaca hiragana.",
      "Kata sebelum しか: kata benda atau kata keterangan bilangan."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "可能動詞 (Kata Kerja Potensial) — bisa 〜",
      pattern: "KB が KK-potensial",
      desc: "Kata kerja potensial digunakan untuk menyatakan 'bisa' atau 'memiliki kemampuan' untuk melakukan sesuatu. Kata kerja potensial menunjukkan keadaan, bukan tindakan atau aktivitas. Jadi, objek pada kata kerja potensial biasanya menggunakan partikel が.",
      reibun: [
        {jp:"わたしは <ruby><rb>日本語</rb><rt>にほんご</rt></ruby>が <ruby><rb>話</rb><rt>はな</rt></ruby>せます。", rom:"Watashi wa nihongo ga hanasemasu.", id:"Saya bisa berbicara bahasa Jepang."},
        {jp:"<ruby><rb>田中</rb><rt>たなか</rt></ruby>さんは ギターが <ruby><rb>弾</rb><rt>ひ</rt></ruby>けません。", rom:"Tanaka san wa gitā ga hikemasen.", id:"Tanaka tidak bisa bermain gitar."},
        {jp:"あの <ruby><rb>店</rb><rt>みせ</rt></ruby>で <ruby><rb>日本料理</rb><rt>にほんりょうり</rt></ruby>が <ruby><rb>食</rb><rt>た</rt></ruby>べられます。", rom:"Ano mise de nihon ryōri ga taberaremasu.", id:"Di toko itu bisa makan masakan Jepang."}
      ],
      note: {type:"teal", text:"<b>💡 Konjugasi Potensial:</b><br>Grup I: か<b>く</b>→か<b>ける</b> / の<b>む</b>→の<b>める</b> / か<b>う</b>→か<b>える</b><br>Grup II: たべ<b>る</b>→たべ<b>られる</b> / み<b>る</b>→み<b>られる</b><br>Grup III: く<b>る</b>→こられる / す<b>る</b>→できる"}
    },
    {
      tag: "B", label: "しか〜 KK ません — hanya 〜",
      pattern: "KB/Bilangan しか KK ません",
      desc: "しか menunjukkan arti 'hanya', 'saja' atau 'cuma'. Kata sebelum しか diikuti oleh kata benda, kata keterangan bilangan, dan selalu diakhiri dengan kata kerja bentuk negatif.",
      reibun: [
        {jp:"わたしは <ruby><rb>豚肉</rb><rt>ぶたにく</rt></ruby>しか <ruby><rb>食</rb><rt>た</rt></ruby>べられません。", rom:"Watashi wa butaniku shika taberamasen.", id:"Saya hanya bisa makan daging babi."},
        {jp:"ひらがなしか <ruby><rb>読</rb><rt>よ</rt></ruby>めません。", rom:"Hiragana shika yomemasen.", id:"Hanya bisa membaca hiragana."},
        {jp:"わたしの <ruby><rb>会社</rb><rt>がいしゃ</rt></ruby>は <ruby><rb>日曜日</rb><rt>にちようび</rt></ruby>しか <ruby><rb>休</rb><rt>やす</rt></ruby>みが <ruby><rb>取</rb><rt>と</rt></ruby>れません。", rom:"Watashi no kaisha wa nichiyōbi shika yasumi ga toremasen.", id:"Di perusahaan saya hanya bisa ambil libur di hari Minggu."}
      ]
    },
    {
      tag: "C", label: "KB は (perbandingan)",
      pattern: "KB₁ は 〜が、KB₂ は 〜",
      desc: "Selain memperkenalkan topik, は juga dapat menunjukkan perbandingan.",
      reibun: [
        {jp:"ひらがなは <ruby><rb>読</rb><rt>よ</rt></ruby>めますが、カタカナは <ruby><rb>読</rb><rt>よ</rt></ruby>めません。", rom:"Hiragana wa yomemasu ga, katakana wa yomemasen.", id:"Bisa membaca hiragana, tetapi tidak bisa membaca katakana."},
        {jp:"<ruby><rb>音楽</rb><rt>おんがく</rt></ruby>は <ruby><rb>好</rb><rt>す</rt></ruby>きですが、<ruby><rb>映画</rb><rt>えいが</rt></ruby>は <ruby><rb>好</rb><rt>す</rt></ruby>きじゃ ありません。", rom:"Ongaku wa suki desu ga, eiga wa suki ja arimasen.", id:"Saya suka musik, tetapi tidak suka film."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>飼</rb><rt>か</rt></ruby>います",furigana:"かいます",rom:"kaimasu",id:"memelihara (hewan)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>建</rb><rt>た</rt></ruby>てます",furigana:"たてます",rom:"tatemasu",id:"membangun; mendirikan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>道</rb><rt>みち</rt></ruby>を）<ruby><rb>走</rb><rt>はし</rt></ruby>ります",furigana:"（みちを）はしります",rom:"(michi o) hashirimasu",id:"berlari; melaju (di jalan)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>休</rb><rt>やす</rt></ruby>みを）<ruby><rb>取</rb><rt>と</rt></ruby>ります",furigana:"（やすみを）とります",rom:"(yasumi o) torimasu",id:"mengambil (liburan/cuti)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>教室</rb><rt>きょうしつ</rt></ruby>を）<ruby><rb>開</rb><rt>ひら</rt></ruby>きます",furigana:"（きょうしつを）ひらきます",rom:"(kyōshitsu o) hirakimasu",id:"membuka (kursus/kelas)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"ペット",furigana:"",rom:"petto",id:"hewan peliharaan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>鳥</rb><rt>とり</rt></ruby>",furigana:"とり",rom:"tori",id:"burung; ayam",cat:"Kata Benda",lv:"core"},
    {jp:"マンション",furigana:"",rom:"manshon",id:"apartemen",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>台所</rb><rt>だいどころ</rt></ruby>",furigana:"だいどころ",rom:"daidokoro",id:"dapur",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>豚肉</rb><rt>ぶたにく</rt></ruby>",furigana:"ぶたにく",rom:"butaniku",id:"daging babi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>鶏肉</rb><rt>とりにく</rt></ruby>",furigana:"とりにく",rom:"toriniku",id:"daging ayam",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>牛肉</rb><rt>ぎゅうにく</rt></ruby>",furigana:"ぎゅうにく",rom:"gyūniku",id:"daging sapi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>現金</rb><rt>げんきん</rt></ruby>",furigana:"げんきん",rom:"genkin",id:"uang tunai",cat:"Kata Benda",lv:"core"},
    {jp:"カップラーメン",furigana:"",rom:"kappu rāmen",id:"cup ramen",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>他</rb><rt>ほか</rt></ruby>の",furigana:"ほかの",rom:"hoka no",id:"lainnya; lain",cat:"Kata Keterangan",lv:"core"}
  ]
},
{
  num: 43,
  title: "Simultanitas & Penginderaan",
  sub: "ながら (sambil) / 見えます・聞こえます / できます",
  color: "bab-43",
  tips: [
    {icon:"💡", title:"ながら vs て bentuk", points:[
      "<b>ながら</b>: dua tindakan terjadi BERSAMAAN, tindakan utama ada di KK2.",
      "<b>て bentuk</b>: urutan tindakan (pertama lakukan KK1, lalu KK2).",
      "ながら: <ruby><rb>音楽</rb><rt>おんがく</rt></ruby>を <ruby><rb>聞</rb><rt>き</rt></ruby>き<b>ながら</b> <ruby><rb>料理</rb><rt>りょうり</rt></ruby>します (memasak sambil dengar musik).",
      "て bentuk: <ruby><rb>音楽</rb><rt>おんがく</rt></ruby>を <ruby><rb>聞</rb><rt>き</rt></ruby>い<b>て</b> <ruby><rb>料理</rb><rt>りょうり</rt></ruby>します (dengar musik dulu, baru masak)."
    ]},
    {icon:"⚠️", title:"<ruby><rb>見</rb><rt>み</rt></ruby>えます vs <ruby><rb>見</rb><rt>み</rt></ruby>ます / <ruby><rb>聞</rb><rt>き</rt></ruby>こえます vs <ruby><rb>聞</rb><rt>き</rt></ruby>きます", points:[
      "<ruby><rb>見</rb><rt>み</rt></ruby>ます = melihat secara aktif (sengaja).",
      "<ruby><rb>見</rb><rt>み</rt></ruby>えます = terlihat secara alami (tanpa usaha).",
      "<ruby><rb>聞</rb><rt>き</rt></ruby>きます = mendengar secara aktif / bertanya.",
      "<ruby><rb>聞</rb><rt>き</rt></ruby>こえます = terdengar secara alami."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK1 bentuk ます + ながら + KK2",
      pattern: "KK1 ますながら KK2 : ketika; selama; sambil",
      desc: "Pola kalimat ini menunjukkan bahwa seseorang melakukan tindakan yang ditunjukkan oleh KK1 dan secara bersamaan melakukan tindakan lainnya yang ditunjukkan oleh KK2, di mana KK2 mengindikasikan tindakan utama.",
      reibun: [
        {jp:"<ruby><rb>歌</rb><rt>うた</rt></ruby>を <ruby><rb>歌</rb><rt>うた</rt></ruby>いながら、<ruby><rb>料理</rb><rt>りょうり</rt></ruby>を <ruby><rb>作</rb><rt>つく</rt></ruby>ります。", rom:"Uta o utainagara, ryōri o tsukurimasu.", id:"Membuat masakan sambil bernyanyi."},
        {jp:"<ruby><rb>音楽</rb><rt>おんがく</rt></ruby>を <ruby><rb>聞</rb><rt>き</rt></ruby>きながら、<ruby><rb>宿題</rb><rt>しゅくだい</rt></ruby>を します。", rom:"Ongaku o kikinagara, shukudai o shimasu.", id:"Mengerjakan PR sambil mendengarkan musik."},
        {jp:"アルバイトを しながら、<ruby><rb>大学</rb><rt>だいがく</rt></ruby>に <ruby><rb>通</rb><rt>かよ</rt></ruby>って います。", rom:"Arubaito o shinagara, daigaku ni kayotte imasu.", id:"Berkuliah sambil bekerja paruh waktu."}
      ]
    },
    {
      tag: "B", label: "見えます dan 聞こえます",
      pattern: "KB が <ruby>見<rt>み</rt></ruby>えます / <ruby>聞<rt>き</rt></ruby>こえます",
      desc: "みえます dan きこえます adalah kata kerja yang menyatakan kemungkinan dapat melakukan sesuatu. Keduanya memiliki nuansa makna 'terlihat' dan 'terdengar' secara alami.",
      reibun: [
        {jp:"<ruby><rb>部屋</rb><rt>へや</rt></ruby>の <ruby><rb>窓</rb><rt>まど</rt></ruby>から <ruby><rb>富士山</rb><rt>ふじさん</rt></ruby>が <ruby><rb>見</rb><rt>み</rt></ruby>えます。", rom:"Heya no mado kara Fujisan ga miemasu.", id:"Gunung Fuji terlihat dari jendela kamar."},
        {jp:"<ruby><rb>隣</rb><rt>となり</rt></ruby>の <ruby><rb>教室</rb><rt>きょうしつ</rt></ruby>から <ruby><rb>先生</rb><rt>せんせい</rt></ruby>の <ruby><rb>声</rb><rt>こえ</rt></ruby>が <ruby><rb>聞</rb><rt>き</rt></ruby>こえます。", rom:"Tonari no kyōshitsu kara sensei no koe ga kikoemasu.", id:"Suara guru terdengar dari ruang kelas sebelah."}
      ]
    },
    {
      tag: "C", label: "できます (dibangun/selesai)",
      pattern: "KB が できます",
      desc: "Arti kata kerja できます pada pola kalimat ini adalah 'dibangun', 'diselesaikan', 'dibuat', dll.",
      reibun: [
        {jp:"<ruby><rb>家</rb><rt>いえ</rt></ruby>の <ruby><rb>近</rb><rt>ちか</rt></ruby>くに <ruby><rb>映画館</rb><rt>えいがかん</rt></ruby>が できます。", rom:"Ie no chikaku ni eigakan ga dekimasu.", id:"Bioskop akan dibangun dekat rumah."},
        {jp:"<ruby><rb>東京</rb><rt>とうきょう</rt></ruby>スカイツリーは 2011<ruby><rb>年</rb><rt>ねん</rt></ruby>に できました。", rom:"Tōkyō Sukaitsurī wa 2011 nen ni dekimashita.", id:"Tokyo Sky Tree selesai dibangun pada tahun 2011."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>見</rb><rt>み</rt></ruby>えます",furigana:"みえます",rom:"miemasu",id:"terlihat",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"メモします",furigana:"",rom:"memo shimasu",id:"menulis memo",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>聞</rb><rt>き</rt></ruby>こえます",furigana:"きこえます",rom:"kikoemasu",id:"terdengar",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>出来</rb><rt>でき</rt></ruby>ます",furigana:"できます",rom:"dekimasu",id:"dibangun; dibuat; diselesaikan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>踊</rb><rt>おど</rt></ruby>ります",furigana:"おどります",rom:"odorimasu",id:"menari",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>噛</rb><rt>か</rt></ruby>みます",furigana:"かみます",rom:"kamimasu",id:"menggigit; mengunyah",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>通</rb><rt>かよ</rt></ruby>います",furigana:"かよいます",rom:"kayoimasu",id:"pulang pergi (sekolah)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>不動産屋</rb><rt>ふどうさんや</rt></ruby>",furigana:"ふどうさんや",rom:"fudōsan ya",id:"agen real estate; agen properti",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>東京</rb><rt>とうきょう</rt></ruby>スカイツリー",furigana:"とうきょうスカイツリー",rom:"Tōkyō Sukaitsurī",id:"Tokyo Sky Tree",cat:"Kata Benda",lv:"extra"},
    {jp:"クリーニング",furigana:"",rom:"kurīningu",id:"laundry",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>介護</rb><rt>かいご</rt></ruby>",furigana:"かいご",rom:"kaigo",id:"perawat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>夢</rb><rt>ゆめ</rt></ruby>",furigana:"ゆめ",rom:"yume",id:"mimpi; impian",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>歌手</rb><rt>かしゅ</rt></ruby>",furigana:"かしゅ",rom:"kashu",id:"penyanyi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>声</rb><rt>こえ</rt></ruby>",furigana:"こえ",rom:"koe",id:"suara",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>花火</rb><rt>はなび</rt></ruby>",furigana:"はなび",rom:"hanabi",id:"kembang api",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>景色</rb><rt>けしき</rt></ruby>",furigana:"けしき",rom:"keshiki",id:"pemandangan alam",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>波</rb><rt>なみ</rt></ruby>の<ruby><rb>音</rb><rt>おと</rt></ruby>",furigana:"なみのおと",rom:"nami no oto",id:"suara ombak",cat:"Kata Benda",lv:"extra"},
    {jp:"ガム",furigana:"",rom:"gamu",id:"permen karet",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>昼間</rb><rt>ひるま</rt></ruby>",furigana:"ひるま",rom:"hiruma",id:"siang hari",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>昔</rb><rt>むかし</rt></ruby>",furigana:"むかし",rom:"mukashi",id:"zaman dulu; masa lalu",cat:"Kata Keterangan",lv:"core"},
    {jp:"〜<ruby><rb>後</rb><rt>ご</rt></ruby>",furigana:"〜ご",rom:"~go",id:"setelah 〜 (durasi waktu)",cat:"Ekspresi",lv:"core"},
    {jp:"はっきり",furigana:"",rom:"hakkiri",id:"jelas",cat:"Kata Keterangan",lv:"core"},
    {jp:"ほとんど",furigana:"",rom:"hotondo",id:"hampir",cat:"Kata Keterangan",lv:"core"},
    {jp:"いつか",furigana:"",rom:"itsuka",id:"suatu hari nanti",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>将来</rb><rt>しょうらい</rt></ruby>",furigana:"しょうらい",rom:"shōrai",id:"masa depan",cat:"Kata Benda",lv:"core"}
  ]
},
{
  num: 44,
  title: "Cara Melakukan (て/ないで)",
  sub: "KK bentuk て/ないで + KK2 (dengan cara; tanpa melakukan)",
  color: "bab-44",
  tips: [
    {icon:"💡", title:"Tips: て vs ながら", points:[
      "<b>て bentuk + KK2</b>: KK1 adalah cara/kondisi melakukan KK2.",
      "<b>ながら</b>: dua tindakan secara BERSAMAAN.",
      "Contoh て: ソースを つけて たべます (makan dengan memakai saus — cara).",
      "Contoh ながら: テレビを みながら たべます (makan sambil nonton TV — simultan)."
    ]},
    {icon:"⚠️", title:"ないで: tanpa melakukan KK1", points:[
      "KK1 ないで = tanpa melakukan KK1, lakukan KK2.",
      "ソースを つけないで <ruby><rb>食</rb><rt>た</rt></ruby>べます = makan tanpa memakai saus.",
      "Bisa juga menunjukkan pilihan alternatif dari dua tindakan."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK1 bentuk て/ないで + KK2",
      pattern: "KK1 (bentuk て / ないで) KK2",
      desc: "Pola kalimat ini menunjukkan bahwa KK1 adalah tindakan atau keadaan yang menyertai KK2. KK1 bentuk ないで juga dapat digunakan untuk menunjukkan keputusan melakukan satu dari tindakan alternatif yang terdapat pada KK1 dan KK2.",
      reibun: [
        {jp:"ソースを つけて <ruby><rb>食</rb><rt>た</rt></ruby>べます。", rom:"Sōsu o tsukete tabemasu.", id:"Makan dengan memakai saus."},
        {jp:"ソースを つけないで <ruby><rb>食</rb><rt>た</rt></ruby>べます。", rom:"Sōsu o tsukenaide tabemasu.", id:"Makan tanpa memakai saus."},
        {jp:"<ruby><rb>日曜日</rb><rt>にちようび</rt></ruby>は どこも <ruby><rb>行</rb><rt>い</rt></ruby>かないで、うちで ゆっくり <ruby><rb>休</rb><rt>やす</rt></ruby>みます。", rom:"Nichiyōbi wa doko mo ikanaide, uchi de yukkuri yasumimasu.", id:"Hari Minggu tanpa pergi ke mana pun, istirahat santai di rumah."}
      ]
    }
  ],
  kotoba: [
    {jp:"（ソースを）つけます",furigana:"",rom:"(sōsu o) tsukemasu",id:"memakai (saus)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>傘</rb><rt>かさ</rt></ruby>を）さします",furigana:"（かさを）さします",rom:"(kasa o) sashimasu",id:"memakai (payung)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"シートベルトをします",furigana:"",rom:"shītoberto o shimasu",id:"memakai seat belt",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>苦</rb><rt>にが</rt></ruby>い",furigana:"にがい",rom:"nigai",id:"pahit",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"シートベルト",furigana:"",rom:"shītoberto",id:"seat belt; sabuk pengaman",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>説明書</rb><rt>せつめいしょ</rt></ruby>",furigana:"せつめいしょ",rom:"setsumei sho",id:"buku panduan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>黒</rb><rt>くろ</rt></ruby>",furigana:"くろ",rom:"kuro",id:"hitam",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>白</rb><rt>しろ</rt></ruby>",furigana:"しろ",rom:"shiro",id:"putih",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>赤</rb><rt>あか</rt></ruby>",furigana:"あか",rom:"aka",id:"merah",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>青</rb><rt>あお</rt></ruby>",furigana:"あお",rom:"ao",id:"biru",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>紺</rb><rt>こん</rt></ruby>",furigana:"こん",rom:"kon",id:"navy; biru gelap",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>緑</rb><rt>みどり</rt></ruby>",furigana:"みどり",rom:"midori",id:"hijau",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>茶色</rb><rt>ちゃいろ</rt></ruby>",furigana:"ちゃいろ",rom:"chairo",id:"coklat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>黄色</rb><rt>きいろ</rt></ruby>",furigana:"きいろ",rom:"kiiro",id:"kuning",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>紫</rb><rt>むらさき</rt></ruby>",furigana:"むらさき",rom:"murasaki",id:"ungu",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>客</rb><rt>きゃく</rt></ruby>（さん）",furigana:"おきゃく（さん）",rom:"okyaku (san)",id:"pengunjung; tamu; pelanggan; klien",cat:"Kata Benda",lv:"core"},
    {jp:"ゆうべ",furigana:"",rom:"yūbe",id:"kemarin malam",cat:"Kata Keterangan",lv:"core"},
    {jp:"ラーメン",furigana:"",rom:"rāmen",id:"ramen",cat:"Kata Benda",lv:"extra"},
    {jp:"こしょう",furigana:"",rom:"koshō",id:"lada",cat:"Kata Benda",lv:"extra"},
    {jp:"しょうゆ",furigana:"",rom:"shōyu",id:"kecap asin",cat:"Kata Benda",lv:"extra"},
    {jp:"わさび",furigana:"",rom:"wasabi",id:"wasabi",cat:"Kata Benda",lv:"extra"},
    {jp:"アドバイス",furigana:"",rom:"adobaisu",id:"nasihat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>先</rb><rt>さき</rt></ruby>に",furigana:"さきに",rom:"saki ni",id:"pertama; di depan",cat:"Kata Keterangan",lv:"core"}
  ]
},
{
  num: 45,
  title: "Kata Kerja Intransitif & Transitif",
  sub: "<ruby>自動詞<rt>じどうし</rt></ruby> と <ruby>他動詞<rt>たどうし</rt></ruby> / KK Intransitif て います",
  color: "bab-45",
  tips: [
    {icon:"💡", title:"Intransitif vs Transitif", points:[
      "<b><ruby>自動詞<rt>じどうし</rt></ruby> (Intransitif)</b>: Perubahan spontan dari luar, tidak ada pelaku. Partikel: <b>が</b>.",
      "<b><ruby><rb>他動詞</rb><rt>たどうし</rt></ruby> (Transitif)</b>: Ada pelaku yang melakukan tindakan. Partikel: <b>を</b>.",
      "Contoh: <ruby><rb>電気</rb><rt>でんき</rt></ruby>が <b>つきます</b> (lampu menyala—otomatis) vs <ruby><rb>電気</rb><rt>でんき</rt></ruby>を <b>つけます</b> (menyalakan lampu—ada pelaku)."
    ]},
    {icon:"📝", title:"Pasangan Intransitif & Transitif", points:[
      "つきます ↔ つけます (lampu menyala ↔ menyalakan lampu)",
      "きえます ↔ けします (lampu padam ↔ memadamkan lampu)",
      "あきます ↔ あけます (pintu terbuka ↔ membuka pintu)",
      "しまります ↔ しめます (pintu tertutup ↔ menutup pintu)",
      "とまります ↔ とめます (mobil berhenti ↔ menghentikan mobil)"
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "<ruby>自動詞<rt>じどうし</rt></ruby> と <ruby>他動詞<rt>たどうし</rt></ruby> : Kata Kerja Intransitif dan Kata Kerja Transitif",
      pattern: "KB が KK-intransitif / KB を KK-transitif",
      desc: "Beberapa kata kerja seperti つきます, きえます menjelaskan perubahan yang disebabkan oleh keadaan eksternal yang spontan terjadi. Kata kerja ini disebut <ruby>自動詞<rt>じどうし</rt></ruby> (Kata Kerja Intransitif). Sedangkan kata kerja seperti つけます, けします mengungkapkan perubahan yang dihasilkan akibat dari tindakan seseorang. Kata kerja seperti ini disebut <ruby>他動詞<rt>たどうし</rt></ruby> (Kata Kerja Transitif).",
      reibun: [
        {jp:"<ruby><rb>電気</rb><rt>でんき</rt></ruby>を つけます。 / <ruby><rb>電気</rb><rt>でんき</rt></ruby>が つきます。", rom:"Denki o tsukemasu. / Denki ga tsukimasu.", id:"Menyalakan lampu. (transitif) / Lampu menyala. (intransitif)"},
        {jp:"<ruby><rb>窓</rb><rt>まど</rt></ruby>を あけます。 / <ruby><rb>窓</rb><rt>まど</rt></ruby>が あきます。", rom:"Mado o akemasu. / Mado ga akimasu.", id:"Membuka jendela. (transitif) / Jendela terbuka. (intransitif)"}
      ]
    },
    {
      tag: "B", label: "Kata Kerja Intransitif bentuk て います",
      pattern: "KB が KK-intransitif て います",
      desc: "\"Kata Kerja Intransitif bentuk て います\" digunakan untuk menyatakan keadaan yang dihasilkan akibat dari tindakan yang masih berlanjut.",
      reibun: [
        {jp:"<ruby><rb>教室</rb><rt>きょうしつ</rt></ruby>の エアコンが ついて います。", rom:"Kyōshitsu no eakon ga tsuite imasu.", id:"AC di kelas sedang menyala (dalam kondisi menyala)."},
        {jp:"<ruby><rb>窓</rb><rt>まど</rt></ruby>が <ruby><rb>割</rb><rt>わ</rt></ruby>れて います。", rom:"Mado ga warete imasu.", id:"Jendela dalam kondisi pecah."},
        {jp:"<ruby><rb>木</rb><rt>き</rt></ruby>の <ruby><rb>枝</rb><rt>えだ</rt></ruby>が <ruby><rb>折</rb><rt>お</rt></ruby>れて います。", rom:"Ki no eda ga orete imasu.", id:"Ranting pohon dalam kondisi patah."}
      ],
      note: {type:"blue", text:"<b>💡 KK-transitif て います vs KK-intransitif て います</b><br>KK-transitif て います = sedang melakukan. ドアを <b>あけています</b> (sedang membuka pintu).<br>KK-intransitif て います = keadaan hasil. ドアが <b>あいています</b> (pintu dalam kondisi terbuka)."}
    }
  ],
  kotoba: [
    {jp:"（ドアが）<ruby><rb>開</rb><rt>あ</rt></ruby>きます",furigana:"（ドアが）あきます",rom:"(doa ga) akimasu",id:"(pintu) terbuka",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（ドアが）<ruby><rb>閉</rb><rt>し</rt></ruby>まります",furigana:"（ドアが）しまります",rom:"(doa ga) shimarimasu",id:"(pintu) tertutup",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>電気</rb><rt>でんき</rt></ruby>が）つきます",furigana:"（でんきが）つきます",rom:"(denki ga) tsukimasu",id:"(lampu) menyala",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>電気</rb><rt>でんき</rt></ruby>が）<ruby><rb>消</rb><rt>き</rt></ruby>えます",furigana:"（でんきが）きえます",rom:"(denki ga) kiemasu",id:"(lampu) padam; mati",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>道</rb><rt>みち</rt></ruby>が）<ruby><rb>込</rb><rt>こ</rt></ruby>みます",furigana:"（みちが）こみます",rom:"(michi ga) komimasu",id:"(jalanan) ramai; macet",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>道</rb><rt>みち</rt></ruby>が）<ruby><rb>空</rb><rt>す</rt></ruby>きます",furigana:"（みちが）すきます",rom:"(michi ga) sukimasu",id:"(jalanan) sepi; tidak macet",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（いすが）<ruby><rb>壊</rb><rt>こわ</rt></ruby>れます",furigana:"（いすが）こわれます",rom:"(isu ga) kowaremasu",id:"(kursi) rusak",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（コップが）<ruby><rb>割</rb><rt>わ</rt></ruby>れます",furigana:"（コップが）われます",rom:"(koppu ga) waremasu",id:"(gelas) pecah",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>木</rb><rt>き</rt></ruby>が）<ruby><rb>折</rb><rt>お</rt></ruby>れます",furigana:"（きが）おれます",rom:"(ki ga) oremasu",id:"(pohon) patah",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>紙</rb><rt>かみ</rt></ruby>が）<ruby><rb>破</rb><rt>やぶ</rt></ruby>れます",furigana:"（かみが）やぶれます",rom:"(kami ga) yaburemasu",id:"(kertas) sobek",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>服</rb><rt>ふく</rt></ruby>が）<ruby><rb>汚</rb><rt>よご</rt></ruby>れます",furigana:"（ふくが）よごれます",rom:"(fuku ga) yogoremasu",id:"(pakaian) menjadi kotor",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（エレベーターが）<ruby><rb>止</rb><rt>と</rt></ruby>まります",furigana:"（エレベーターが）とまります",rom:"(erebētā ga) tomarimasu",id:"(lift) berhenti",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（かぎが）<ruby><rb>掛</rb><rt>か</rt></ruby>かります",furigana:"（かぎが）かかります",rom:"(kagi ga) kakarimasu",id:"terkunci",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>倒</rb><rt>たお</rt></ruby>れます",furigana:"たおれます",rom:"taoremasu",id:"roboh; jatuh",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（お）<ruby><rb>皿</rb><rt>さら</rt></ruby>",furigana:"（お）さら",rom:"(o)sara",id:"piring",cat:"Kata Benda",lv:"core"},
    {jp:"（お）<ruby><rb>茶碗</rb><rt>ちゃわん</rt></ruby>",furigana:"（お）ちゃわん",rom:"(o)chawan",id:"mangkuk",cat:"Kata Benda",lv:"core"},
    {jp:"コップ",furigana:"",rom:"koppu",id:"gelas",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>袋</rb><rt>ふくろ</rt></ruby>",furigana:"ふくろ",rom:"fukuro",id:"tas",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>財布</rb><rt>さいふ</rt></ruby>",furigana:"さいふ",rom:"saifu",id:"dompet",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>枝</rb><rt>えだ</rt></ruby>",furigana:"えだ",rom:"eda",id:"dahan; ranting",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>会議室</rb><rt>かいぎしつ</rt></ruby>",furigana:"かいぎしつ",rom:"kaigishitsu",id:"ruang rapat; ruang pertemuan",cat:"Kata Benda",lv:"core"},
    {jp:"まだ",furigana:"",rom:"mada",id:"belum",cat:"Kata Keterangan",lv:"core"}
  ]
},
// ===== BAB 46 =====
{
  num: 46,
  title: "Tindakan yang Terlanjur / Disayangkan",
  sub: "KK て しまいました / て しまいます",
  color: "bab-46",
  tips: [
    {icon:"💡", title:"てしまいました — dua makna", points:[
      "<b>Penyelesaian tuntas:</b> Menekankan bahwa tindakan sudah benar-benar selesai dilakukan. <ruby><rb>図書館</rb><rt>としょかん</rt></ruby>の<ruby><rb>本</rb><rt>ほん</rt></ruby>を <ruby><rb>読</rb><rt>よ</rt></ruby>んでしまいました (Sudah selesai membaca buku perpustakaan).",
      "<b>Penyesalan/tidak disengaja:</b> Menyatakan penyesalan atas tindakan yang terjadi. どこかで パスポートを <ruby><rb>落</rb><rt>お</rt></ruby>としてしまいました (Saya tidak sengaja menjatuhkan paspor di suatu tempat).",
      "Bentuk percakapan informal: てしまいました → <b>ちゃいました</b>、でしまいました → <b>じゃいました</b>."
    ]}
  ],
  bunpou: [
    {
      tag:"A", label:"KK bentuk てしまいました① — Penyelesaian tindakan",
      pattern:"KK-て + しまいました",
      desc:"KK て しまいました menekankan bahwa suatu tindakan telah selesai dilakukan. 〜て しまいます menunjukkan bahwa suatu tindakan akan selesai di waktu yang akan datang.",
      reibun:[
        {jp:"<ruby><rb>図書館</rb><rt>としょかん</rt></ruby>で <ruby><rb>借</rb><rt>か</rt></ruby>りた <ruby><rb>本</rb><rt>ほん</rt></ruby>を <ruby><rb>読</rb><rt>よ</rt></ruby>んで しまいました。",rom:"Toshokan de karita hon o yonde shimaimashita.",id:"Saya sudah selesai membaca buku pinjaman dari perpustakaan."},
        {jp:"DVDを <ruby><rb>全部</rb><rt>ぜんぶ</rt></ruby> <ruby><rb>見</rb><rt>み</rt></ruby>て しまいました。",rom:"DVD o zenbu mite shimaimashita.",id:"Saya sudah menonton semua DVD."},
        {jp:"<ruby><rb>家</rb><rt>いえ</rt></ruby>に <ruby><rb>帰</rb><rt>かえ</rt></ruby>る <ruby><rb>前</rb><rt>まえ</rt></ruby>に、あしたの <ruby><rb>会議</rb><rt>かいぎ</rt></ruby>の <ruby><rb>資料</rb><rt>しりょう</rt></ruby>を <ruby><rb>作</rb><rt>つく</rt></ruby>って しまいます。",rom:"Ie ni kaeru mae ni, ashita no kaigi no shiryō o tsukutte shimaimasu.",id:"Sebelum pulang ke rumah, saya akan menyelesaikan dokumen rapat untuk besok."}
      ]
    },
    {
      tag:"B", label:"KK bentuk てしまいました② — Keadaan yang disayangkan",
      pattern:"KK-て + しまいました",
      desc:"〜て しまいました juga digunakan untuk menyatakan penyesalan atas tindakan tertentu yang terjadi tidak sengaja.",
      reibun:[
        {jp:"どこかで パスポートを <ruby><rb>落</rb><rt>お</rt></ruby>として しまいました。",rom:"Dokoka de pasupōto o otoshite shimaimashita.",id:"Saya tidak sengaja menjatuhkan paspor di suatu tempat."},
        {jp:"タクシーの <ruby><rb>中</rb><rt>なか</rt></ruby>に <ruby><rb>荷物</rb><rt>にもつ</rt></ruby>を <ruby><rb>忘</rb><rt>わす</rt></ruby>れて しまいました。",rom:"Takushī no naka ni nimotsu o wasurete shimaimashita.",id:"Saya tidak sengaja meninggalkan barang di dalam taksi."},
        {jp:"<ruby><rb>電車</rb><rt>でんしゃ</rt></ruby>が <ruby><rb>止</rb><rt>と</rt></ruby>まりましたから、<ruby><rb>約束</rb><rt>やくそく</rt></ruby>の <ruby><rb>時間</rb><rt>じかん</rt></ruby>に <ruby><rb>遅</rb><rt>おく</rt></ruby>れて しまいました。",rom:"Densha ga tomarimashita kara, yakusoku no jikan ni okurete shimaimashita.",id:"Karena kereta berhenti, saya terlambat dari waktu yang dijanjikan."}
      ],
      note:{type:"amber",text:"<b>💡 Cara ingat:</b> しまう asal katanya berarti 'menyimpan/menyelesaikan' — sehingga てしまう berarti tindakan sudah 'tersimpan' / selesai. Nuansa penyesalan muncul dari konteks kalimat."}
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>間違</rb><rt>まちが</rt></ruby>えます",furigana:"まちがえます",rom:"machigaemasu",id:"membuat kesalahan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>落</rb><rt>お</rt></ruby>とします",furigana:"おとします",rom:"otoshimasu",id:"menjatuhkan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>忘</rb><rt>わす</rt></ruby>れ<ruby><rb>物</rb><rt>もの</rt></ruby>に）<ruby><rb>気</rb><rt>き</rt></ruby>がつきます",furigana:"（わすれものに）きがつきます",rom:"(wasuremono ni) ki ga tsukimasu",id:"memperhatikan; menyadari (barang yang terlupa)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>壊</rb><rt>こわ</rt></ruby>します",furigana:"こわします",rom:"kowashimasu",id:"merusakkan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>汚</rb><rt>よご</rt></ruby>します",furigana:"よごします",rom:"yogoshimasu",id:"mengotori",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>割</rb><rt>わ</rt></ruby>ります",furigana:"わります",rom:"warimasu",id:"memecahkan (gelas, piring, dll.)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"ガラス",furigana:"",rom:"garasu",id:"kaca",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>駅員</rb><rt>えきいん</rt></ruby>",furigana:"えきいん",rom:"ekiin",id:"petugas stasiun",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>返事</rb><rt>へんじ</rt></ruby>",furigana:"へんじ",rom:"henji",id:"balasan; jawaban",cat:"Kata Benda",lv:"core"},
    {jp:"このくらい",furigana:"",rom:"kono kurai",id:"sekitar sebesar ini",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>忘</rb><rt>わす</rt></ruby>れ<ruby><rb>物</rb><rt>もの</rt></ruby>",furigana:"わすれもの",rom:"wasuremono",id:"barang yang tertinggal; barang yang hilang",cat:"Kata Benda",lv:"core"},
    {jp:"ポケット",furigana:"",rom:"poketto",id:"saku",cat:"Kata Benda",lv:"core"},
    {jp:"〜<ruby><rb>側</rb><rt>がわ</rt></ruby>",furigana:"〜がわ",rom:"~gawa",id:"sisi 〜",cat:"Kata Benda",lv:"core"},
    {jp:"〜<ruby><rb>辺</rb><rt>へん</rt></ruby>",furigana:"〜へん",rom:"~hen",id:"sekitar 〜",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>網棚</rb><rt>あみだな</rt></ruby>",furigana:"あみだな",rom:"amidana",id:"rak barang; rak bagasi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>確</rb><rt>たし</rt></ruby>か",furigana:"たしか",rom:"tashika",id:"mungkin; kalau tidak salah",cat:"Kata Keterangan",lv:"core"},
    {jp:"（ああ、）<ruby><rb>良</rb><rt>よ</rt></ruby>かった",furigana:"（ああ、）よかった",rom:"(aa,) yokatta",id:"(oh,) bagus sekali; syukurlah!",cat:"Ekspresi",lv:"core"},
    {jp:"※<ruby><rb>実</rb><rt>じつ</rt></ruby>は",furigana:"じつは",rom:"jitsu wa",id:"sebenarnya",cat:"Kata Keterangan",lv:"core"}
  ]
},
// ===== BAB 47 =====
{
  num: 47,
  title: "Persiapan & Tindakan Sengaja",
  sub: "KK て おきます — mempersiapkan terlebih dahulu",
  color: "bab-47",
  tips: [
    {icon:"💡", title:"ておきます — persiapan terlebih dahulu", points:[
      "Digunakan saat melakukan sesuatu <b>sebagai persiapan</b> untuk kejadian mendatang.",
      "Contoh: <ruby><rb>友</rb><rt>とも</rt></ruby>だちが <ruby><rb>来</rb><rt>き</rt></ruby>ますから、<ruby><rb>部屋</rb><rt>へや</rt></ruby>を <ruby><rb>掃除</rb><rt>そうじ</rt></ruby>して おきます (Karena teman akan datang, saya akan membersihkan kamar terlebih dahulu).",
      "Bentuk informal: ておきます → <b>とく</b>、ておいてください → <b>といてください</b>."
    ]}
  ],
  bunpou: [
    {
      tag:"A", label:"KK bentuk て おきます — mempersiapkan terlebih dahulu",
      pattern:"KK-て + おきます",
      desc:"Pola kalimat ini dapat menunjukkan bahwa diperlukan tindakan persiapan yang harus dilakukan dalam waktu tertentu.",
      reibun:[
        {jp:"3<ruby><rb>時</rb><rt>じ</rt></ruby>に <ruby><rb>授業</rb><rt>じゅぎょう</rt></ruby>が <ruby><rb>始</rb><rt>はじ</rt></ruby>まりますから、<ruby><rb>教室</rb><rt>きょうしつ</rt></ruby>の エアコンを つけて おきます。",rom:"San-ji ni jugyō ga hajimarimasu kara, kyōshitsu no eakon o tsukete okimasu.",id:"Karena kelas dimulai jam 3, saya akan menyalakan AC di kelas terlebih dahulu."},
        {jp:"<ruby><rb>会議</rb><rt>かいぎ</rt></ruby>の まえに <ruby><rb>資料</rb><rt>しりょう</rt></ruby>を <ruby><rb>読</rb><rt>よ</rt></ruby>んで おいて ください。",rom:"Kaigi no mae ni shiryō o yonde oite kudasai.",id:"Tolong baca dokumen sebelum rapat."},
        {jp:"ホッチキスを <ruby><rb>使</rb><rt>つか</rt></ruby>ったら、<ruby><rb>引き出し</rb><rt>ひきだし</rt></ruby>の <ruby><rb>中</rb><rt>なか</rt></ruby>に <ruby><rb>戻</rb><rt>もど</rt></ruby>して おきましょう。",rom:"Hotchikisu o tsukattara, hikidashi no naka ni modoshite okimashō.",id:"Setelah memakai stapler, mari kembalikan ke dalam laci."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>戻</rb><rt>もど</rt></ruby>します",furigana:"もどします",rom:"modoshimasu",id:"mengembalikan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"まとめます",furigana:"",rom:"matomemasu",id:"mengumpulkan; menempatkan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>片付</rb><rt>かたづ</rt></ruby>けます",furigana:"かたづけます",rom:"katazukemasu",id:"merapikan; membersihkan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"しまいます",furigana:"",rom:"shimaimasu",id:"menyimpan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>相談</rb><rt>そうだん</rt></ruby>します",furigana:"そうだんします",rom:"sōdan shimasu",id:"berdiskusi",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>予習</rb><rt>よしゅう</rt></ruby>します",furigana:"よしゅうします",rom:"yoshū shimasu",id:"menyiapkan materi belajar",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>復習</rb><rt>ふくしゅう</rt></ruby>します",furigana:"ふくしゅうします",rom:"fukushū shimasu",id:"mengulangi materi belajar",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"そのままにします",furigana:"",rom:"sono mama ni shimasu",id:"membiarkan begitu saja",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>授業</rb><rt>じゅぎょう</rt></ruby>",furigana:"じゅぎょう",rom:"jugyō",id:"kelas; pelajaran",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>講義</rb><rt>こうぎ</rt></ruby>",furigana:"こうぎ",rom:"kōgi",id:"kuliah",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>道具</rb><rt>どうぐ</rt></ruby>",furigana:"どうぐ",rom:"dōgu",id:"alat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>引き出し</rb><rt>ひきだし</rt></ruby>",furigana:"ひきだし",rom:"hikidashi",id:"laci",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>元の所</rb><rt>もとのところ</rt></ruby>",furigana:"もとのところ",rom:"moto no tokoro",id:"tempat semula",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>教科書</rb><rt>きょうかしょ</rt></ruby>",furigana:"きょうかしょ",rom:"kyōkasho",id:"buku teks; buku pelajaran",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>結婚式</rb><rt>けっこんしき</rt></ruby>",furigana:"けっこんしき",rom:"kekkonshiki",id:"resepsi pernikahan",cat:"Kata Benda",lv:"core"}
  ]
},
// ===== BAB 48 =====
{
  num: 48,
  title: "Keadaan Hasil Tindakan",
  sub: "KK Transitif bentuk て あります — Sudah 〜",
  color: "bab-48",
  tips: [
    {icon:"💡", title:"てあります vs ています", points:[
      "<b>KK-transitif て あります</b>: Menyatakan keadaan berkelanjutan yang dihasilkan dari tindakan yang memiliki tujuan. Partikel が setelah KB. Contoh: ポスターが <ruby><rb>貼</rb><rt>は</rt></ruby>って あります (Poster sudah ditempel).",
      "<b>KK-intransitif て います</b>: Menyatakan keadaan hasil yang terjadi alami. Contoh: ドアが <ruby><rb>開</rb><rt>あ</rt></ruby>いて います (Pintu terbuka).",
      "Perbedaan: てあります ada 'pelaku yang sengaja melakukan', ています tidak."
    ]}
  ],
  bunpou: [
    {
      tag:"A", label:"Kata Kerja Transitif bentuk て あります — Sudah 〜",
      pattern:"KB が KK-transitif て あります",
      desc:"Kata kerja transitif bentuk て あります menunjukkan keadaan berkelanjutan yang dihasilkan dari tindakan yang memiliki tujuan tertentu. Pola kalimat ini diikuti oleh partikel が setelah kata benda yang biasanya ditandai dengan partikel を.",
      reibun:[
        {jp:"<ruby><rb>壁</rb><rt>かべ</rt></ruby>に <ruby><rb>時計</rb><rt>とけい</rt></ruby>が <ruby><rb>掛</rb><rt>か</rt></ruby>けて あります。",rom:"Kabe ni tokei ga kakete arimasu.",id:"Jam sudah digantungkan di dinding."},
        {jp:"カレンダーに <ruby><rb>今月</rb><rt>こんげつ</rt></ruby>の <ruby><rb>予定</rb><rt>よてい</rt></ruby>が <ruby><rb>書</rb><rt>か</rt></ruby>いて あります。",rom:"Karendā ni kongetsu no yotei ga kaite arimasu.",id:"Jadwal bulan ini sudah ditulis di kalender."},
        {jp:"<ruby><rb>玄関</rb><rt>げんかん</rt></ruby>に <ruby><rb>人形</rb><rt>にんぎょう</rt></ruby>が かざって あります。",rom:"Genkan ni ningyō ga kazatte arimasu.",id:"Boneka sudah didekorasi di pintu masuk."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>貼</rb><rt>は</rt></ruby>ります",furigana:"はります",rom:"harimasu",id:"menempelkan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>掛</rb><rt>か</rt></ruby>けます",furigana:"かけます",rom:"kakemasu",id:"menggantungkan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>飾</rb><rt>かざ</rt></ruby>ります",furigana:"かざります",rom:"kazarimasu",id:"menghias",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>並</rb><rt>なら</rt></ruby>べます",furigana:"ならべます",rom:"narabemasu",id:"menata",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>植</rb><rt>う</rt></ruby>えます",furigana:"うえます",rom:"uemasu",id:"menanam",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>決</rb><rt>き</rt></ruby>めます",furigana:"きめます",rom:"kimemasu",id:"memutuskan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>知</rb><rt>し</rt></ruby>らせます",furigana:"しらせます",rom:"shirasemasu",id:"menginformasikan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"※<ruby><rb>目</rb><rt>め</rt></ruby>が<ruby><rb>覚</rb><rt>さ</rt></ruby>めます",furigana:"めがさめます",rom:"me ga samemasu",id:"bangun tidur",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"※ポスター",furigana:"",rom:"posutā",id:"poster",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>予定</rb><rt>よてい</rt></ruby>",furigana:"よてい",rom:"yotei",id:"rencana; jadwal",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>知</rb><rt>し</rt></ruby>らせ",furigana:"おしらせ",rom:"oshirase",id:"pengumuman",cat:"Kata Benda",lv:"core"},
    {jp:"カレンダー",furigana:"",rom:"karendā",id:"kalender",cat:"Kata Benda",lv:"core"},
    {jp:"ごみ<ruby><rb>箱</rb><rt>ばこ</rt></ruby>",furigana:"ごみばこ",rom:"gomibako",id:"keranjang sampah",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>人形</rb><rt>にんぎょう</rt></ruby>",furigana:"にんぎょう",rom:"ningyō",id:"boneka",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>花瓶</rb><rt>かびん</rt></ruby>",furigana:"かびん",rom:"kabin",id:"vas bunga",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>鏡</rb><rt>かがみ</rt></ruby>",furigana:"かがみ",rom:"kagami",id:"cermin",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>玄関</rb><rt>げんかん</rt></ruby>",furigana:"げんかん",rom:"genkan",id:"pintu masuk rumah Jepang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>廊下</rb><rt>ろうか</rt></ruby>",furigana:"ろうか",rom:"rōka",id:"koridor",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>壁</rb><rt>かべ</rt></ruby>",furigana:"かべ",rom:"kabe",id:"tembok",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>回</rb><rt>まわ</rt></ruby>り",furigana:"まわり",rom:"mawari",id:"sekeliling; sekitar",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>真ん中</rb><rt>まんなか</rt></ruby>",furigana:"まんなか",rom:"mannaka",id:"tengah",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>隅</rb><rt>すみ</rt></ruby>",furigana:"すみ",rom:"sumi",id:"sudut",cat:"Kata Benda",lv:"core"},
    {jp:"※メモ",furigana:"",rom:"memo",id:"memo",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>終点</rb><rt>しゅうてん</rt></ruby>",furigana:"しゅうてん",rom:"shūten",id:"titik pemberhentian terakhir",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>旅館</rb><rt>りょかん</rt></ruby>",furigana:"りょかん",rom:"ryokan",id:"penginapan tradisional ala Jepang",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>失敗</rb><rt>しっぱい</rt></ruby>",furigana:"しっぱい",rom:"shippai",id:"kesalahan; kegagalan",cat:"Kata Benda",lv:"core"}
  ]
},
// ===== BAB 49 =====
{
  num: 49,
  title: "Niat, Rencana & Keadaan Belum",
  sub: "意向形 / 〜と思っています / まだ〜ていません",
  color: "bab-49",
  tips: [
    {icon:"💡", title:"Tiga pola penting Bab 49", points:[
      "<b><ruby><rb>意向形</rb><rt>いこうけい</rt></ruby> (Bentuk Maksud):</b> Bentuk ます → bentuk maksud. Gol.I: ます→お (よみます→よもう). Gol.II: ます→よう (たべます→たべよう). Gol.III: きます→こよう、します→しよう.",
      "<b>〜と<ruby><rb>思</rb><rt>おも</rt></ruby>っています:</b> Menyatakan niat/rencana pembicara. <ruby><rb>来年</rb><rt>らいねん</rt></ruby> <ruby><rb>日本</rb><rt>にほん</rt></ruby>へ <ruby><rb>行</rb><rt>い</rt></ruby>こうと <ruby><rb>思</rb><rt>おも</rt></ruby>っています (Saya berniat pergi ke Jepang tahun depan).",
      "<b>まだ〜ていません:</b> Menyatakan sesuatu belum dilakukan. まだ <ruby><rb>食</rb><rt>た</rt></ruby>べて いません (Belum makan)."
    ]}
  ],
  bunpou: [
    {
      tag:"A", label:"意向形 — Bentuk Maksud",
      pattern:"KK bentuk maksud",
      desc:"Bentuk ます diubah menjadi bentuk maksud. Dalam bentuk kalimat biasa, pola ini merupakan bentuk sederhana dari 〜ましょう.",
      reibun:[
        {jp:"A：ちょっと <ruby><rb>休</rb><rt>やす</rt></ruby>まない？ B：うん、<ruby><rb>休</rb><rt>やす</rt></ruby>もう。",rom:"A: Chotto yasumanai? B: Un, yasumō.",id:"A: Istirahat sebentar yuk? B: Iya, ayo istirahat."},
        {jp:"<ruby><rb>傘</rb><rt>かさ</rt></ruby>、<ruby><rb>持</rb><rt>も</rt></ruby>って <ruby><rb>行</rb><rt>い</rt></ruby>こうか。",rom:"Kasa, motte ikō ka.",id:"Ayo bawa payung, ya?"}
      ]
    },
    {
      tag:"B", label:"Bentuk Maksud と 思って います — Saya bermaksud 〜",
      pattern:"KK-bentuk maksud + と 思って います",
      desc:"Digunakan untuk menyatakan maksud, niat atau rencana pembicara.",
      reibun:[
        {jp:"<ruby><rb>連休</rb><rt>れんきゅう</rt></ruby>に <ruby><rb>旅行</rb><rt>りょこう</rt></ruby>しようと <ruby><rb>思</rb><rt>おも</rt></ruby>って います。",rom:"Renkyū ni ryokō shiyō to omotte imasu.",id:"Saya berniat pergi liburan saat liburan panjang."},
        {jp:"<ruby><rb>将来</rb><rt>しょうらい</rt></ruby> <ruby><rb>自分</rb><rt>じぶん</rt></ruby>の <ruby><rb>会社</rb><rt>かいしゃ</rt></ruby>を <ruby><rb>作</rb><rt>つく</rt></ruby>ろうと <ruby><rb>思</rb><rt>おも</rt></ruby>って います。",rom:"Shōrai jibun no kaisha o tsukurō to omotte imasu.",id:"Saya berniat mendirikan perusahaan sendiri di masa depan."}
      ]
    },
    {
      tag:"C", label:"まだ KK bentuk て いません — masih belum 〜",
      pattern:"まだ + KK-て いません",
      desc:"Pola kalimat ini menunjukkan bahwa suatu situasi belum terjadi, atau sesuatu belum dilakukan.",
      reibun:[
        {jp:"A：もう <ruby><rb>昼</rb><rt>ひる</rt></ruby>ごはんを <ruby><rb>食</rb><rt>た</rt></ruby>べましたか。 B：いいえ、まだ <ruby><rb>食</rb><rt>た</rt></ruby>べて いません。",rom:"A: Mō hirugohan o tabemashita ka. B: Iie, mada tabete imasen.",id:"A: Apakah sudah makan siang? B: Belum, belum makan."},
        {jp:"<ruby><rb>作文</rb><rt>さくぶん</rt></ruby>は まだ <ruby><rb>書</rb><rt>か</rt></ruby>いて いません。",rom:"Sakubun wa mada kaite imasen.",id:"Karangan masih belum ditulis."}
      ],
      note:{type:"blue",text:"<b>💡 もう vs まだ:</b> もう + positive = sudah. まだ + negative = belum. もう <ruby><rb>食</rb><rt>た</rt></ruby>べましたか (Sudah makan?) → まだ <ruby><rb>食</rb><rt>た</rt></ruby>べていません (Belum makan)."}
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>試験</rb><rt>しけん</rt></ruby>を）<ruby><rb>受</rb><rt>う</rt></ruby>けます",furigana:"（しけんを）うけます",rom:"(shiken o) ukemasu",id:"mengikuti (ujian)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>大学</rb><rt>だいがく</rt></ruby>に）<ruby><rb>入学</rb><rt>にゅうがく</rt></ruby>します",furigana:"（だいがくに）にゅうがくします",rom:"(daigaku ni) nyūgaku shimasu",id:"masuk (universitas)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（<ruby><rb>大学</rb><rt>だいがく</rt></ruby>を）<ruby><rb>卒業</rb><rt>そつぎょう</rt></ruby>します",furigana:"（だいがくを）そつぎょうします",rom:"(daigaku o) sotsugyō shimasu",id:"lulus (dari universitas)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>休憩</rb><rt>きゅうけい</rt></ruby>します",furigana:"きゅうけいします",rom:"kyūkei shimasu",id:"beristirahat",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>続</rb><rt>つづ</rt></ruby>けます",furigana:"つづけます",rom:"tsuzukemasu",id:"melanjutkan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>見</rb><rt>み</rt></ruby>つけます",furigana:"みつけます",rom:"mitsukemasu",id:"menemukan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>連休</rb><rt>れんきゅう</rt></ruby>",furigana:"れんきゅう",rom:"renkyū",id:"liburan panjang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>作文</rb><rt>さくぶん</rt></ruby>",furigana:"さくぶん",rom:"sakubun",id:"karangan; esai",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>大学院</rb><rt>だいがくいん</rt></ruby>",furigana:"だいがくいん",rom:"daigakuin",id:"pascasarjana",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>動物園</rb><rt>どうぶつえん</rt></ruby>",furigana:"どうぶつえん",rom:"dōbutsuen",id:"kebun binatang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>温泉</rb><rt>おんせん</rt></ruby>",furigana:"おんせん",rom:"onsen",id:"pemandian air panas",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>仕事</rb><rt>しごと</rt></ruby>の<ruby><rb>面接</rb><rt>めんせつ</rt></ruby>",furigana:"しごとのめんせつ",rom:"shigoto no mensetsu",id:"wawancara kerja",cat:"Kata Benda",lv:"core"},
    {jp:"ずっと",furigana:"",rom:"zutto",id:"sepanjang waktu; untuk waktu lama",cat:"Kata Keterangan",lv:"core"},
    {jp:"※よかったら",furigana:"",rom:"yokattara",id:"jika Anda berkenan",cat:"Ekspresi",lv:"core"}
  ]
},
// ===== BAB 50 =====
{
  num: 50,
  title: "Niat & Rencana Lebih Formal",
  sub: "KK つもりです / 予定です",
  color: "bab-50",
  tips: [
    {icon:"💡", title:"つもりです vs <ruby><rb>予定</rb><rt>よてい</rt></ruby>です vs と<ruby><rb>思</rb><rt>おも</rt></ruby>っています", points:[
      "<b>つもりです:</b> Niat/tekad pribadi yang sudah cukup pasti. KK bentuk kamus + つもりです.",
      "<b><ruby><rb>予定</rb><rt>よてい</rt></ruby>です:</b> Rencana yang sudah lebih terencana/terjadwal. Bisa KK bentuk kamus + <ruby><rb>予定</rb><rt>よてい</rt></ruby>です atau KB の + <ruby><rb>予定</rb><rt>よてい</rt></ruby>です.",
      "<b>と<ruby><rb>思</rb><rt>おも</rt></ruby>っています:</b> Niat yang masih dalam pikiran, belum terlalu pasti.",
      "Urutan kepastian: つもり ≒ と<ruby><rb>思</rb><rt>おも</rt></ruby>っています < <ruby><rb>予定</rb><rt>よてい</rt></ruby> (<ruby><rb>予定</rb><rt>よてい</rt></ruby> paling pasti)."
    ]}
  ],
  bunpou: [
    {
      tag:"A", label:"KK bentuk kamus つもりです — Saya berniat untuk 〜",
      pattern:"KK-kamus + つもりです / KK-ない + つもりです",
      desc:"KK bentuk kamus つもりです mengungkapkan niat pembicara untuk melakukan sesuatu. Sebaliknya, untuk mengungkapkan tidak berniat melakukan sesuatu biasanya menggunakan KK bentuk ない つもりです.",
      reibun:[
        {jp:"<ruby><rb>日本</rb><rt>にほん</rt></ruby>で 5<ruby><rb>年</rb><rt>ねん</rt></ruby> <ruby><rb>働</rb><rt>はたら</rt></ruby>く つもりです。",rom:"Nihon de go-nen hataraku tsumori desu.",id:"Saya berniat bekerja di Jepang selama 5 tahun."},
        {jp:"<ruby><rb>来年</rb><rt>らいねん</rt></ruby> <ruby><rb>車</rb><rt>くるま</rt></ruby>を <ruby><rb>買</rb><rt>か</rt></ruby>う つもりです。",rom:"Rainen kuruma o kau tsumori desu.",id:"Saya berniat membeli mobil tahun depan."},
        {jp:"<ruby><rb>今年</rb><rt>ことし</rt></ruby>は JLPTを <ruby><rb>受</rb><rt>う</rt></ruby>けない つもりです。",rom:"Kotoshi wa JLPT o ukenai tsumori desu.",id:"Saya tidak berniat mengikuti JLPT tahun ini."}
      ]
    },
    {
      tag:"B", label:"KK bentuk kamus 予定です / KB の 予定です — berencana untuk 〜",
      pattern:"KK-kamus + <ruby>予定<rt>よてい</rt></ruby>です / KB の + <ruby>予定<rt>よてい</rt></ruby>です",
      desc:"Pola kalimat ini digunakan untuk menyatakan suatu rencana yang akan dilakukan.",
      reibun:[
        {jp:"<ruby><rb>電車</rb><rt>でんしゃ</rt></ruby>は 12<ruby><rb>時</rb><rt>じ</rt></ruby>に <ruby><rb>着</rb><rt>つ</rt></ruby>く <ruby><rb>予定</rb><rt>よてい</rt></ruby>です。",rom:"Densha wa jū-ni-ji ni tsuku yotei desu.",id:"Kereta dijadwalkan tiba jam 12."},
        {jp:"<ruby><rb>来年</rb><rt>らいねん</rt></ruby>の 7<ruby><rb>月</rb><rt>がつ</rt></ruby>に <ruby><rb>結婚</rb><rt>けっこん</rt></ruby>する <ruby><rb>予定</rb><rt>よてい</rt></ruby>です。",rom:"Rainen no shichi-gatsu ni kekkon suru yotei desu.",id:"Saya berencana menikah bulan Juli tahun depan."},
        {jp:"<ruby><rb>来週</rb><rt>らいしゅう</rt></ruby> ジョンさんは <ruby><rb>出張</rb><rt>しゅっちょう</rt></ruby>の <ruby><rb>予定</rb><rt>よてい</rt></ruby>です。",rom:"Raishū Jon-san wa shutchō no yotei desu.",id:"Minggu depan John berencana dinas ke luar kota."}
      ],
      note:{type:"green",text:"<b>💡 Perbedaan nuansa:</b> つもりです = niat pribadi. <ruby><rb>予定</rb><rt>よてい</rt></ruby>です = jadwal/rencana yang sudah ditetapkan (lebih objektif dan pasti)."}
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>式</rb><rt>しき</rt></ruby>が）<ruby><rb>始</rb><rt>はじ</rt></ruby>まります",furigana:"（しきが）はじまります",rom:"(shiki ga) hajimarimasu",id:"memulai (upacara)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>会議</rb><rt>かいぎ</rt></ruby>に）<ruby><rb>出席</rb><rt>しゅっせき</rt></ruby>します",furigana:"（かいぎに）しゅっせきします",rom:"(kaigi ni) shusseki shimasu",id:"menghadiri (pertemuan)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>残</rb><rt>のこ</rt></ruby>ります",furigana:"のこります",rom:"nokorimasu",id:"tersisa; tertinggal",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>結婚式</rb><rt>けっこんしき</rt></ruby>",furigana:"けっこんしき",rom:"kekkonshiki",id:"resepsi pernikahan",cat:"Kata Benda",lv:"core"},
    {jp:"（お）<ruby><rb>葬式</rb><rt>そうしき</rt></ruby>",furigana:"（お）そうしき",rom:"(o)sōshiki",id:"upacara pemakaman",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>教会</rb><rt>きょうかい</rt></ruby>",furigana:"きょうかい",rom:"kyōkai",id:"gereja",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>本社</rb><rt>ほんしゃ</rt></ruby>",furigana:"ほんしゃ",rom:"honsha",id:"kantor pusat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>支店</rb><rt>してん</rt></ruby>",furigana:"してん",rom:"shiten",id:"kantor cabang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>帰</rb><rt>かえ</rt></ruby>り",furigana:"かえり",rom:"kaeri",id:"pulang",cat:"Kata Benda",lv:"core"},
    {jp:"〜<ruby><rb>号</rb><rt>ごう</rt></ruby>",furigana:"〜ごう",rom:"~gō",id:"nomor kereta, nomor yang disematkan pada saat terjadi angin topan, dll.",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>入学試験</rb><rt>にゅうがくしけん</rt></ruby>",furigana:"にゅうがくしけん",rom:"nyūgaku shiken",id:"ujian masuk (sekolah/universitas)",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>出張</rb><rt>しゅっちょう</rt></ruby>",furigana:"しゅっちょう",rom:"shutchō",id:"perjalanan bisnis; dinas",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>自由</rb><rt>じゆう</rt></ruby>に",furigana:"じゆうに",rom:"jiyū ni",id:"dengan bebas",cat:"Kata Keterangan",lv:"core"}
  ]
},
{
  num: 51,
  title: "Saran & Nasihat Kesehatan",
  sub: "KK た / KK ない + <ruby><rb>ほうが</rb><rt></rt></ruby> いいです",
  color: "bab-51",
  tips: [
    {icon:"💡", title:"た ほうがいいです vs ない ほうがいいです", points:[
      "<b>KK bentuk た + ほうがいいです</b>: Sebaiknya lakukan ~ (saran positif).",
      "<ruby><rb>毎日</rb><rt>まいにち</rt></ruby> <ruby><rb>野菜</rb><rt>やさい</rt></ruby>を たくさん <b><ruby><rb>食</rb><rt>た</rt></ruby>べた ほうが いいです</b>。→ Sebaiknya makan banyak sayuran setiap hari.",
      "<b>KK bentuk ない + ほうがいいです</b>: Sebaiknya jangan ~ (saran negatif/larangan halus).",
      "<ruby><rb>寝</rb><rt>ね</rt></ruby>る まえに スマホを <b><ruby><rb>見</rb><rt>み</rt></ruby>ない ほうが いいです</b>。→ Sebaiknya jangan lihat HP sebelum tidur.",
      "Bedakan dengan てください (perintah langsung) — ほうがいいです lebih halus dan terasa seperti saran, bukan perintah."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK た ほうがいいです / KK ない ほうがいいです — Sebaiknya ~",
      pattern: "KK-た + ほうが いいです / KK-ない + ほうが いいです",
      desc: "Pola ini digunakan untuk memberi saran atau nasihat. KK bentuk た ほうがいいです memiliki makna membandingkan dua hal dan memilih salah satu yang paling baik. Hal tersebut menyiratkan bahwa akan buruk apabila tidak mengambil tindakan yang disarankan.",
      note: {type:"amber", text:"<b>⚠️ Jangan pakai bentuk kamus sebelum ほうがいいです!</b><br>✗ <s><ruby><rb>食べる</rb><rt>たべる</rt></ruby> ほうがいいです</s> → ✓ <b><ruby><rb>食べた</rb><rt>たべた</rt></ruby> ほうがいいです</b><br>✗ <s><ruby><rb>見</rb><rt>み</rt></ruby>ない ほうがいいです</s> bisa, tapi pastikan ない bukan kamus-ない. Gunakan bentuk ない dari konjugasi negatif, bukan kamus."},
      reibun: [
        {jp:"<ruby><rb>毎日</rb><rt>まいにち</rt></ruby> <ruby><rb>野菜</rb><rt>やさい</rt></ruby>を たくさん <ruby><rb>食</rb><rt>た</rt></ruby>べた ほうが いいです。", rom:"Mainichi yasai o takusan tabeta hō ga ii desu.", id:"Sebaiknya makan banyak sayuran setiap hari."},
        {jp:"<ruby><rb>疲</rb><rt>つか</rt></ruby>れた ときは、<ruby><rb>早</rb><rt>はや</rt></ruby>く <ruby><rb>寝</rb><rt>ね</rt></ruby>た ほうが いいです。", rom:"Tsukareta toki wa, hayaku neta hō ga ii desu.", id:"Saat lelah, sebaiknya segera tidur."},
        {jp:"<ruby><rb>目</rb><rt>め</rt></ruby>に よくないですから、<ruby><rb>寝</rb><rt>ね</rt></ruby>る まえに スマホを <ruby><rb>見</rb><rt>み</rt></ruby>ない ほうが いいです。", rom:"Me ni yokunai desu kara, neru mae ni sumaho o minai hō ga ii desu.", id:"Karena tidak baik untuk mata, sebaiknya jangan lihat HP sebelum tidur."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>運動</rb><rt>うんどう</rt></ruby>します",furigana:"うんどうします",rom:"undō shimasu",id:"berolahraga",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（<ruby><rb>病気が</rb><rt>びょうきが</rt></ruby>）<ruby><rb>治</rb><rt>なお</rt></ruby>ります",furigana:"（びょうきが）なおります",rom:"(byōki ga) naorimasu",id:"sembuh dari (sakit)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>故障が</rb><rt>こしょうが</rt></ruby>）<ruby><rb>直</rb><rt>なお</rt></ruby>ります",furigana:"（こしょうが）なおります",rom:"(koshō ga) naorimasu",id:"memperbaiki (kerusakan)",cat:"Kata Kerja",lv:"extra",grp:"I"},
    {jp:"（<ruby><rb>熱が</rb><rt>ねつが</rt></ruby>）<ruby><rb>続</rb><rt>つづ</rt></ruby>きます",furigana:"（ねつが）つづきます",rom:"(netsu ga) tsuzukimasu",id:"(demam) berlanjut",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>風邪を</rb><rt>かぜを</rt></ruby>）ひきます",furigana:"（かぜを）ひきます",rom:"(kaze o) hikimasu",id:"terkena (demam)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>冷</rb><rt>ひ</rt></ruby>やします",furigana:"ひやします",rom:"hiyashimasu",id:"mendinginkan",cat:"Kata Kerja",lv:"extra",grp:"I"},
    {jp:"<ruby><rb>心配</rb><rt>しんぱい</rt></ruby>（な）",furigana:"しんぱい（な）",rom:"shinpai (na)",id:"khawatir; gelisah",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>十分</rb><rt>じゅうぶん</rt></ruby>（な）",furigana:"じゅうぶん（な）",rom:"jūbun (na)",id:"cukup; memadai",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"おかしい",furigana:"おかしい",rom:"okashii",id:"aneh; lucu",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"うるさい",furigana:"うるさい",rom:"urusai",id:"bising",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>注射</rb><rt>ちゅうしゃ</rt></ruby>",furigana:"ちゅうしゃ",rom:"chūsha",id:"suntikan",cat:"Kata Benda",lv:"core"},
    {jp:"やけど",furigana:"やけど",rom:"yakedo",id:"luka bakar",cat:"Kata Benda",lv:"core"},
    {jp:"けが",furigana:"けが",rom:"kega",id:"luka",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>咳</rb><rt>せき</rt></ruby>",furigana:"せき",rom:"seki",id:"batuk",cat:"Kata Benda",lv:"core"},
    {jp:"なかなか（〜ない）",furigana:"なかなか（〜ない）",rom:"nakanaka (~nai)",id:"tidak mudah; sulit",cat:"Kata Keterangan",lv:"core"}
  ]
},
{
  num: 52,
  title: "Kemungkinan & Perkiraan",
  sub: "〜かもしれません / 〜でしょう",
  color: "bab-52",
  tips: [
    {icon:"💡", title:"かもしれません vs でしょう — Tingkat Kepastian", points:[
      "<b>〜かもしれません</b>: Mungkin saja ~ (ketidakpastian, sekitar 50% atau kurang). Pembicara tidak yakin sama sekali.",
      "<ruby><rb>今夜</rb><rt>こんや</rt></ruby> <ruby><rb>雪が降る</rb><rt>ゆきがふる</rt></ruby> <b>かもしれません</b>。→ Malam ini mungkin saja turun salju.",
      "<b>〜でしょう</b>: Akan/pasti ~ (perkiraan lebih yakin, ~70-80%). Sering untuk prediksi cuaca.",
      "<ruby><rb>午後から</rb><rt>ごごから</rt></ruby> <ruby><rb>強い風が吹く</rb><rt>つよいかぜがふく</rt></ruby> <b>でしょう</b>。→ Sore ini angin kencang akan bertiup.",
      "Keduanya pakai <b>bentuk biasa</b> KK/KS い, dan bentuk biasa だ (diganti menjadi な/だ) untuk KS な dan KB."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "〜かもしれません — mungkin ~",
      pattern: "KK/KS い [bentuk biasa] + かもしれません\nKS な / KB [bentuk biasa だ] + かもしれません",
      desc: "〜かもしれません digunakan ketika pembicara tidak yakin apa yang sebenarnya terjadi tetapi ingin menebak. Tingkat kepastiannya lebih rendah dari でしょう.",
      note: {type:"blue", text:"<b>💡 Konjugasi sebelum かもしれません:</b><br>KK: <ruby><rb>降る</rb><rt>ふる</rt></ruby> → <ruby><rb>降</rb><rt>ふ</rt></ruby>る<b>かもしれません</b><br>KS い: <ruby><rb>寒い</rb><rt>さむい</rt></ruby> → <ruby><rb>寒</rb><rt>さむ</rt></ruby>い<b>かもしれません</b><br>KS な: きれい<s>だ</s> → きれい<b>かもしれません</b> (だ dihilangkan)<br>KB: <ruby><rb>日本人</rb><rt>にほんじん</rt></ruby><s>だ</s> → <ruby><rb>日本人</rb><rt>にほんじん</rt></ruby><b>じゃない/かもしれません</b>"},
      reibun: [
        {jp:"<ruby><rb>今夜</rb><rt>こんや</rt></ruby> <ruby><rb>雪</rb><rt>ゆき</rt></ruby>が <ruby><rb>降</rb><rt>ふ</rt></ruby>る かも しれません。", rom:"Konya yuki ga furu kamo shiremasen.", id:"Malam ini mungkin saja turun salju."},
        {jp:"<ruby><rb>約束</rb><rt>やくそく</rt></ruby>の <ruby><rb>時間</rb><rt>じかん</rt></ruby>に <ruby><rb>間</rb><rt>ま</rt></ruby>に <ruby><rb>合</rb><rt>あ</rt></ruby>わない かも しれません。", rom:"Yakusoku no jikan ni ma ni awanai kamo shiremasen.", id:"Saya mungkin tidak tepat waktu sesuai janji."},
        {jp:"あの <ruby><rb>人</rb><rt>ひと</rt></ruby>は <ruby><rb>日本人</rb><rt>にほんじん</rt></ruby>じゃない かも しれません。", rom:"Ano hito wa Nihonjin ja nai kamo shiremasen.", id:"Orang itu mungkin bukan orang Jepang."}
      ]
    },
    {
      tag: "B", label: "〜でしょう — akan / (sudah pasti) ~",
      pattern: "KK/KS い [bentuk biasa] + でしょう\nKS な / KB [bentuk biasa だ → ] + でしょう",
      desc: "〜でしょう digunakan ketika pembicara ingin menyampaikan pendapat tentang sesuatu di masa depan atau sesuatu yang tidak pasti. Tingkat keyakinannya lebih tinggi dari かもしれません.",
      note: {type:"teal", text:"<b>💡 でしょう vs だろう:</b><br>でしょう = bentuk sopan / formal (percakapan, siaran cuaca)<br>だろう = bentuk kasual (dalam pikiran, monolog, percakapan santai antar teman)"},
      reibun: [
        {jp:"<ruby><rb>今夜</rb><rt>こんや</rt></ruby>は <ruby><rb>寒</rb><rt>さむ</rt></ruby>く なる でしょう。", rom:"Konya wa samuku naru deshō.", id:"Malam ini akan menjadi dingin."},
        {jp:"<ruby><rb>今日</rb><rt>きょう</rt></ruby>の <ruby><rb>東京</rb><rt>とうきょう</rt></ruby>の <ruby><rb>最高気温</rb><rt>さいこうきおん</rt></ruby>は 33<ruby><rb>度</rb><rt>ど</rt></ruby> でしょう。", rom:"Kyō no Tōkyō no saikō kion wa sanjūsando deshō.", id:"Suhu tertinggi Tokyo hari ini akan mencapai 33 derajat."},
        {jp:"<ruby><rb>午後</rb><rt>ごご</rt></ruby>から <ruby><rb>強</rb><rt>つよ</rt></ruby>い <ruby><rb>風</rb><rt>かぜ</rt></ruby>が <ruby><rb>吹</rb><rt>ふ</rt></ruby>く でしょう。", rom:"Gogo kara tsuyoi kaze ga fuku deshō.", id:"Sore ini angin kencang akan bertiup."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>成功</rb><rt>せいこう</rt></ruby>します",furigana:"せいこうします",rom:"seikō shimasu",id:"berhasil",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>失敗</rb><rt>しっぱい</rt></ruby>します",furigana:"しっぱいします",rom:"shippai shimasu",id:"gagal; membuat kesalahan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（<ruby><rb>試験に</rb><rt>しけんに</rt></ruby>）<ruby><rb>合格</rb><rt>ごうかく</rt></ruby>します",furigana:"（しけんに）ごうかくします",rom:"(shiken ni) gōkaku shimasu",id:"lulus (ujian)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（<ruby><rb>試験に</rb><rt>しけんに</rt></ruby>）<ruby><rb>落</rb><rt>お</rt></ruby>ちます",furigana:"（しけんに）おちます",rom:"(shiken ni) ochimasu",id:"gagal (ujian)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>戻</rb><rt>もど</rt></ruby>ります",furigana:"もどります",rom:"modorimasu",id:"kembali",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>雨が</rb><rt>あめが</rt></ruby>）<ruby><rb>止</rb><rt>や</rt></ruby>みます",furigana:"（あめが）やみます",rom:"(ame ga) yamimasu",id:"(hujan) berhenti",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>晴</rb><rt>は</rt></ruby>れます",furigana:"はれます",rom:"haremasu",id:"cerah",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>曇</rb><rt>くも</rt></ruby>ります",furigana:"くもります",rom:"kumorimasu",id:"berawan; mendung",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>風が</rb><rt>かぜが</rt></ruby>）<ruby><rb>吹</rb><rt>ふ</rt></ruby>きます",furigana:"（かぜが）ふきます",rom:"(kaze ga) fukimasu",id:"(angin) bertiup",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>合格</rb><rt>ごうかく</rt></ruby>",furigana:"ごうかく",rom:"gōkaku",id:"lulus",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>不合格</rb><rt>ふごうかく</rt></ruby>",furigana:"ふごうかく",rom:"fugōkaku",id:"tidak lulus (ujian)",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>空</rb><rt>そら</rt></ruby>",furigana:"そら",rom:"sora",id:"langit",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>風</rb><rt>かぜ</rt></ruby>",furigana:"かぜ",rom:"kaze",id:"angin",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>北</rb><rt>きた</rt></ruby>",furigana:"きた",rom:"kita",id:"utara",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>南</rb><rt>みなみ</rt></ruby>",furigana:"みなみ",rom:"minami",id:"selatan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>西</rb><rt>にし</rt></ruby>",furigana:"にし",rom:"nishi",id:"barat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>東</rb><rt>ひがし</rt></ruby>",furigana:"ひがし",rom:"higashi",id:"timur",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>今夜</rb><rt>こんや</rt></ruby>",furigana:"こんや",rom:"konya",id:"malam ini",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>夕方</rb><rt>ゆうがた</rt></ruby>",furigana:"ゆうがた",rom:"yūgata",id:"sore",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>最高気温</rb><rt>さいこうきおん</rt></ruby>",furigana:"さいこうきおん",rom:"saikō kion",id:"suhu tertinggi",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>故障</rb><rt>こしょう</rt></ruby>",furigana:"こしょう",rom:"koshō",id:"malfungsi; kerusakan",cat:"Kata Benda",lv:"extra"},
    {jp:"ロッカー",furigana:"ロッカー",rom:"rokkā",id:"loker",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>遅</rb><rt>おそ</rt></ruby>く",furigana:"おそく",rom:"osoku",id:"terlambat",cat:"Kata Keterangan",lv:"core"}
  ]
},
{
  num: 53,
  title: "Alasan Berlapis & Penekanan",
  sub: "Bentuk Biasa し、Bentuk Biasa し、それに",
  color: "bab-53",
  tips: [
    {icon:"💡", title:"し digunakan untuk menyebutkan beberapa alasan sekaligus", points:[
      "<b>〜し、〜し</b>: Menghubungkan dua atau lebih alasan/fakta yang mendukung suatu kesimpulan.",
      "<ruby><rb>値段</rb><rt>ねだん</rt></ruby>も <ruby><rb>安い</rb><rt>やすい</rt></ruby><b>し</b>、<ruby><rb>味</rb><rt>あじ</rt></ruby>も <ruby><rb>いい</rb><rt></rt></ruby><b>し</b>、いつも この <ruby><rb>店</rb><rt>みせ</rt></ruby>で <ruby><rb>食べています</rb><rt></rt></ruby>。→ Harganya murah dan rasanya enak, jadi saya selalu makan di sini.",
      "<b>それに</b>: Ditambah lagi ~ (menambahkan poin ketiga yang memperkuat). Bisa muncul atau tidak.",
      "Berbeda dengan から (karena satu sebab), し menekankan <b>beberapa alasan sekaligus</b>.",
      "Selalu pakai <b>bentuk biasa</b> sebelum し. KS な dan KB cukup pakai bentuk biasa langsung (tanpa だ)."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "Bentuk Biasa し、Bentuk Biasa し、それに — Selain itu / Lagi pula ~",
      pattern: "[Bentuk biasa] し、[Bentuk biasa] し、それに ~",
      desc: "Pola kalimat ini digunakan untuk menyebutkan dua atau lebih hal yang berhubungan dengan topik. Partikel も juga sering digunakan untuk menekankan hal yang dimaksud. Kata それに dapat digunakan untuk lebih memperjelas hal yang ingin disampaikan.",
      note: {type:"purple", text:"<b>💡 し vs から vs て:</b><br>• <b>し</b>: beberapa alasan sejajar (A dan B, keduanya mendukung C)<br>• <b>から</b>: satu sebab langsung (A, karena itu B)<br>• <b>て</b>: urutan kejadian atau cara (A lalu B)"},
      reibun: [
        {jp:"バオさんは <ruby><rb>日本語</rb><rt>にほんご</rt></ruby>も <ruby><rb>話</rb><rt>はな</rt></ruby>せるし、<ruby><rb>料理</rb><rt>りょうり</rt></ruby>も できるし、それに スポーツも <ruby><rb>上手</rb><rt>じょうず</rt></ruby>です。", rom:"Bao-san wa Nihongo mo hanaseru shi, ryōri mo dekiru shi, sorenni supōtsu mo jōzu desu.", id:"Bao bisa berbahasa Jepang, bisa memasak, dan ditambah lagi juga jago olahraga."},
        {jp:"わたしの <ruby><rb>家</rb><rt>うち</rt></ruby>は <ruby><rb>広</rb><rt>ひろ</rt></ruby>いし、<ruby><rb>新</rb><rt>あたら</rt></ruby>しいし、それに スーパーに <ruby><rb>近</rb><rt>ちか</rt></ruby>いです。", rom:"Watashi no uchi wa hiroi shi, atarashii shi, sorenni sūpā ni chikai desu.", id:"Rumah saya luas, baru, dan ditambah dekat dengan supermarket."},
        {jp:"<ruby><rb>値段</rb><rt>ねだん</rt></ruby>も <ruby><rb>安</rb><rt>やす</rt></ruby>いし、<ruby><rb>味</rb><rt>あじ</rt></ruby>も いいし、いつも この <ruby><rb>店</rb><rt>みせ</rt></ruby>で <ruby><rb>食</rb><rt>た</rt></ruby>べて います。", rom:"Nedan mo yasui shi, aji mo ii shi, itsumo kono mise de tabete imasu.", id:"Harganya murah dan rasanya enak, jadi saya selalu makan di restoran ini."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>売</rb><rt>う</rt></ruby>れます",furigana:"うれます",rom:"uremasu",id:"terjual; laku",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>選</rb><rt>えら</rt></ruby>びます",furigana:"えらびます",rom:"erabimasu",id:"memilih",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>違</rb><rt>ちが</rt></ruby>います",furigana:"ちがいます",rom:"chigaimasu",id:"berbeda",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>真面目</rb><rt>まじめ</rt></ruby>（な）",furigana:"まじめ（な）",rom:"majime (na)",id:"jujur; rajin",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>熱心</rb><rt>ねっしん</rt></ruby>（な）",furigana:"ねっしん（な）",rom:"nesshin (na)",id:"antusias",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>優</rb><rt>やさ</rt></ruby>しい",furigana:"やさしい",rom:"yasashii",id:"baik; lemah lembut",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>偉</rb><rt>えら</rt></ruby>い",furigana:"えらい",rom:"erai",id:"hebat",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"ちょうどいい",furigana:"ちょうどいい",rom:"chōdo ii",id:"cocok; pas",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>習慣</rb><rt>しゅうかん</rt></ruby>",furigana:"しゅうかん",rom:"shūkan",id:"kebiasaan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>力</rb><rt>ちから</rt></ruby>",furigana:"ちから",rom:"chikara",id:"kekuatan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>経験</rb><rt>けいけん</rt></ruby>",furigana:"けいけん",rom:"keiken",id:"pengalaman",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>人気</rb><rt>にんき</rt></ruby>",furigana:"にんき",rom:"ninki",id:"kepopuleran",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>形</rb><rt>かたち</rt></ruby>",furigana:"かたち",rom:"katachi",id:"bentuk; wujud",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>色</rb><rt>いろ</rt></ruby>",furigana:"いろ",rom:"iro",id:"warna",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>味</rb><rt>あじ</rt></ruby>",furigana:"あじ",rom:"aji",id:"rasa",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>品物</rb><rt>しなもの</rt></ruby>",furigana:"しなもの",rom:"shinamono",id:"barang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>値段</rb><rt>ねだん</rt></ruby>",furigana:"ねだん",rom:"nedan",id:"harga; biaya",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>給料</rb><rt>きゅうりょう</rt></ruby>",furigana:"きゅうりょう",rom:"kyūryō",id:"gaji",cat:"Kata Benda",lv:"core"},
    {jp:"サービス",furigana:"サービス",rom:"sābisu",id:"servis; layanan",cat:"Kata Benda",lv:"extra"},
    {jp:"おすすめ",furigana:"おすすめ",rom:"osusume",id:"rekomendasi",cat:"Kata Benda",lv:"core"},
    {jp:"ウェブサイト",furigana:"ウェブサイト",rom:"uebusaito",id:"website; situs halaman",cat:"Kata Benda",lv:"extra"},
    {jp:"しばらく",furigana:"しばらく",rom:"shibaraku",id:"sementara waktu",cat:"Kata Keterangan",lv:"core"}
  ]
},
{
  num: 54,
  title: "Pengandaian dengan ば",
  sub: "Kata Kerja / Kata Sifat / Kata Benda + <ruby><rb>ば</rb><rt></rt></ruby>",
  color: "bab-54",
  tips: [
    {icon:"💡", title:"Cara membentuk kondisional ば — 3 kelompok KK", points:[
      "<b>Grup I (〜う → 〜えば):</b> のむ → のめば / まつ → まてば / かく → かけば",
      "<b>Grup II (〜る → 〜れば):</b> たべる → たべれば / みる → みれば",
      "<b>Grup III:</b> くる → <b>くれば</b> / する → <b>すれば</b>",
      "<b>KS い (〜い → 〜ければ):</b> あつい → あつければ / いい → よければ (tidak teratur!)",
      "<b>KS な / KB (+ なら):</b> きれいなら / あめなら — ini bentuk ば khusus untuk KS な dan KB.",
      "Negatif semua: akhiran ない → <b>なければ</b>. Contoh: のまない → のまなければ"
    ]},
    {icon:"⚠️", title:"Batasan penting penggunaan ば", points:[
      "Klausa ば menunjukkan kondisi, dan klausa utama adalah konsekuensinya.",
      "ば <b>tidak bisa</b> dipakai jika klausa utama berisi ungkapan keinginan langsung pembicara (〜たい、〜てください) atau perintah. Gunakan たら atau と untuk konteks tersebut.",
      "ば cocok untuk kondisi yang <b>alami dan umum</b>: <ruby><rb>春に</rb><rt>はるに</rt></ruby> なれば、<ruby><rb>桜が</rb><rt>さくらが</rt></ruby> <ruby><rb>咲きます</rb><rt>さきます</rt></ruby>。→ Kalau sudah musim semi, bunga sakura mekar."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK / KS / KB + ば — Jika ~, maka ~",
      pattern: "KK [bentuk ば] / KS い [〜ければ] / KS な・KB [〜なら] + ~",
      desc: "Bentuk kondisional ば (<ruby><rb>条件形</rb><rt>じょうけんけい</rt></ruby>) menyatakan hubungan bahwa A adalah kondisi dan B adalah konsekuensinya. Digunakan untuk kondisi yang bersifat alami, general, atau logis.",
      note: {type:"amber", text:"<b>⚠️ ば vs たら vs と:</b><br>• <b>ば</b>: kondisi alami/logis, bersifat umum<br>• <b>たら</b>: kondisi hipotesis, urutan waktu, lebih fleksibel<br>• <b>と</b>: kondisi otomatis/pasti terjadi (alam, mesin)"},
      reibun: [
        {jp:"<ruby><rb>毎日</rb><rt>まいにち</rt></ruby> <ruby><rb>日本語</rb><rt>にほんご</rt></ruby>で <ruby><rb>話</rb><rt>はな</rt></ruby>せば、<ruby><rb>日本語</rb><rt>にほんご</rt></ruby>が <ruby><rb>上手</rb><rt>じょうず</rt></ruby>に なります。", rom:"Mainichi Nihongo de hanaseba, Nihongo ga jōzu ni narimasu.", id:"Kalau berbicara bahasa Jepang setiap hari, bahasa Jepangmu akan menjadi mahir."},
        {jp:"7<ruby><rb>時</rb><rt>じ</rt></ruby>30<ruby><rb>分</rb><rt>ふん</rt></ruby>に <ruby><rb>起</rb><rt>お</rt></ruby>きなければ、<ruby><rb>学校</rb><rt>がっこう</rt></ruby>に <ruby><rb>遅刻</rb><rt>ちこく</rt></ruby>します。", rom:"Shichiji sanjuppun ni okinakereba, gakkō ni chikoku shimasu.", id:"Kalau tidak bangun jam 7.30, akan terlambat ke sekolah."},
        {jp:"<ruby><rb>春</rb><rt>はる</rt></ruby>に なれば、<ruby><rb>桜</rb><rt>さくら</rt></ruby>が <ruby><rb>咲</rb><rt>さ</rt></ruby>きます。", rom:"Haru ni nareba, sakura ga sakimasu.", id:"Kalau sudah musim semi, bunga sakura akan mekar."}
      ]
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>花が</rb><rt>はなが</rt></ruby>）<ruby><rb>咲</rb><rt>さ</rt></ruby>きます",furigana:"（はなが）さきます",rom:"(hana ga) sakimasu",id:"(bunga) mekar",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>色が</rb><rt>いろが</rt></ruby>）<ruby><rb>変</rb><rt>か</rt></ruby>わります",furigana:"（いろが）かわります",rom:"(iro ga) kawarimasu",id:"(warna) berubah",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>困</rb><rt>こま</rt></ruby>ります",furigana:"こまります",rom:"komarimasu",id:"dalam masalah; kesulitan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>拾</rb><rt>ひろ</rt></ruby>います",furigana:"ひろいます",rom:"hiroimasu",id:"memungut",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>電話が</rb><rt>でんわが</rt></ruby>）<ruby><rb>かかります</rb><rt></rt></ruby>",furigana:"（でんわが）かかります",rom:"(denwa ga) kakarimasu",id:"mendapat panggilan telepon",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>紐</rb><rt>ひも</rt></ruby>",furigana:"ひも",rom:"himo",id:"tali",cat:"Kata Benda",lv:"core"},
    {jp:"ふた",furigana:"ふた",rom:"futa",id:"tutup; penutup",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>葉</rb><rt>は</rt></ruby>",furigana:"は",rom:"ha",id:"daun",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>曲</rb><rt>きょく</rt></ruby>",furigana:"きょく",rom:"kyoku",id:"lagu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>機会</rb><rt>きかい</rt></ruby>",furigana:"きかい",rom:"kikai",id:"peluang; kesempatan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>許可</rb><rt>きょか</rt></ruby>",furigana:"きょか",rom:"kyoka",id:"izin",cat:"Kata Benda",lv:"core"},
    {jp:"カーテン",furigana:"カーテン",rom:"kāten",id:"tirai; gorden",cat:"Kata Benda",lv:"extra"},
    {jp:"ホワイトボード",furigana:"ホワイトボード",rom:"howaito bōdo",id:"papan tulis putih",cat:"Kata Benda",lv:"extra"},
    {jp:"アフリカ",furigana:"アフリカ",rom:"Afurika",id:"Afrika",cat:"Kata Benda",lv:"extra"},
    {jp:"もっと",furigana:"もっと",rom:"motto",id:"lagi; lebih",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>初めに</rb><rt>はじめに</rt></ruby>",furigana:"はじめに",rom:"hajime ni",id:"pertama-tama",cat:"Kata Keterangan",lv:"core"}
  ]
},
{
  num: 55,
  title: "Pengandaian dengan なら & KS/KB ば",
  sub: "KS / KB + <ruby><rb>なら</rb><rt></rt></ruby> / KS い + <ruby><rb>ければ</rb><rt></rt></ruby>",
  color: "bab-55",
  tips: [
    {icon:"💡", title:"Cara membentuk KS i/na dan KB ke bentuk kondisional", points:[
      "<b>KS い → 〜ければ:</b> あつい → あつければ / さむい → さむければ",
      "<b>Pengecualian: いい → よければ</b> (tidak pakai いければ!)",
      "<b>KS な → 〜なら:</b> きれい → きれいなら / しずか → しずかなら",
      "<b>KB → 〜なら:</b> あめ → あめなら / ひま → ひまなら",
      "Negatif KS い: あつくなければ / よくなければ. Negatif KS な/KB: きれいじゃなければ"
    ]},
    {icon:"💡", title:"KB なら — kalau memang soal ~", points:[
      "<b>KB なら</b> bisa dipakai saat merespons informasi yang baru saja dikatakan lawan bicara.",
      "A: <ruby><rb>東京で花見がしたいんですが。</rb><rt></rt></ruby> (Saya ingin hanami di Tokyo.)",
      "B: <ruby><rb>花見</rb><rt>はなみ</rt></ruby><b>なら</b>、<ruby><rb>上野公園がいいですよ。</rb><rt>うえのこうえんがいいですよ。</rt></ruby> (Kalau hanami, Taman Ueno cocok!)",
      "Nuansa なら: 'kalau memang itu yang kamu maksud / soal itu'. Merespons konteks sebelumnya, bukan kondisi hipotetis murni."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KS い ければ / KS な・KB なら — Jika ~, maka ~",
      pattern: "KS い [〜ければ] / KS な・KB [〜なら] + ~",
      desc: "Bentuk kondisional untuk kata sifat dan kata benda. KS い menggunakan akhiran ければ, sedangkan KS な dan KB menggunakan なら.",
      note: {type:"blue", text:"<b>💡 Tabel kondisional KS dan KB:</b><br>あつい → あつ<b>ければ</b> / あつくな<b>ければ</b><br>いい → <b>よければ</b> / よくな<b>ければ</b> ⚠️ tidak teratur!<br>きれいな → きれい<b>なら</b> / きれいじゃな<b>ければ</b><br>あめ (KB) → あめ<b>なら</b> / あめじゃな<b>ければ</b>"},
      reibun: [
        {jp:"<ruby><rb>暑</rb><rt>あつ</rt></ruby>ければ、エアコンを つけてください。", rom:"Atsukere ba, eakon o tsukete kudasai.", id:"Kalau panas, tolong nyalakan AC."},
        {jp:"あした <ruby><rb>暇</rb><rt>ひま</rt></ruby>なら、<ruby><rb>海</rb><rt>うみ</rt></ruby>へ <ruby><rb>泳</rb><rt>およ</rt></ruby>ぎに <ruby><rb>行</rb><rt>い</rt></ruby>きましょう。", rom:"Ashita hima nara, umi e oyogi ni ikimashō.", id:"Kalau besok senggang, ayo pergi berenang ke laut."},
        {jp:"<ruby><rb>雨</rb><rt>あめ</rt></ruby>なら、<ruby><rb>会社</rb><rt>かいしゃ</rt></ruby>を <ruby><rb>休</rb><rt>やす</rt></ruby>みます。", rom:"Ame nara, kaisha o yasumimasu.", id:"Kalau hujan, saya akan absen dari kantor."}
      ]
    },
    {
      tag: "B", label: "KB なら — Kalau (memang soal) ~",
      pattern: "KB + なら、~",
      desc: "Kata benda なら juga dapat digunakan ketika memberikan informasi kepada seseorang tentang sesuatu yang baru saja mereka katakan. Nuansa なら di sini adalah merespons konteks percakapan sebelumnya.",
      note: {type:"teal", text:"<b>💡 なら vs たら vs ば:</b><br>• <b>なら</b>: merespons informasi lawan bicara; kalau itu yang kamu maksud<br>• <b>たら</b>: kondisi hipotesis urutan waktu; lebih umum & fleksibel<br>• <b>ば</b>: kondisi alami/logis yang bersifat umum"},
      reibun: [
        {jp:"A：<ruby><rb>東京</rb><rt>とうきょう</rt></ruby>で <ruby><rb>花見</rb><rt>はなみ</rt></ruby>が したいんですが。B：<ruby><rb>花見</rb><rt>はなみ</rt></ruby>なら、<ruby><rb>上野公園</rb><rt>うえのこうえん</rt></ruby>が いいですよ。", rom:"A: Tōkyō de hanami ga shitain desu ga. B: Hanami nara, Ueno Kōen ga ii desu yo.", id:"A: Saya ingin hanami di Tokyo. B: Kalau hanami, Taman Ueno cocok!"},
        {jp:"A：<ruby><rb>日本</rb><rt>にほん</rt></ruby>で <ruby><rb>旅行</rb><rt>りょこう</rt></ruby>に <ruby><rb>行</rb><rt>い</rt></ruby>きたいんですが、どこが おすすめですか。B：<ruby><rb>旅行</rb><rt>りょこう</rt></ruby>なら、<ruby><rb>北海道</rb><rt>ほっかいどう</rt></ruby>が いいですよ。", rom:"A: Nihon de ryokō ni ikitain desu ga, doko ga osusume desu ka. B: Ryokō nara, Hokkaidō ga ii desu yo.", id:"A: Saya ingin berwisata di Jepang, mana yang direkomendasikan? B: Kalau wisata, Hokkaido bagus!"}
      ]
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>丸を</rb><rt>まるを</rt></ruby>）つけます",furigana:"（まるを）つけます",rom:"(maru o) tsukemasu",id:"menandai (dengan lingkaran)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>楽</rb><rt>らく</rt></ruby>（な）",furigana:"らく（な）",rom:"raku (na)",id:"nyaman; mudah",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>正</rb><rt>ただ</rt></ruby>しい",furigana:"ただしい",rom:"tadashii",id:"benar",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>珍</rb><rt>めずら</rt></ruby>しい",furigana:"めずらしい",rom:"mezurashii",id:"langka; tidak biasa",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>楽</rb><rt>たの</rt></ruby>しみ（な）",furigana:"たのしみ（な）",rom:"tanoshimi (na)",id:"kesenangan; kenikmatan",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>操作</rb><rt>そうさ</rt></ruby>",furigana:"そうさ",rom:"sōsa",id:"operasional; penanganan",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>方法</rb><rt>ほうほう</rt></ruby>",furigana:"ほうほう",rom:"hōhō",id:"metode",cat:"Kata Benda",lv:"core"},
    {jp:"くじら",furigana:"くじら",rom:"kujira",id:"ikan paus",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>丸</rb><rt>まる</rt></ruby>",furigana:"まる",rom:"maru",id:"lingkaran",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>東京観光</rb><rt>とうきょうかんこう</rt></ruby>",furigana:"とうきょうかんこう",rom:"Tōkyō kankō",id:"wisata di Tokyo",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>紅葉</rb><rt>こうよう</rt></ruby>",furigana:"こうよう",rom:"kōyō",id:"daun maple; daun musim gugur",cat:"Kata Benda",lv:"extra"}
  ]
},
{
  num: 56,
  title: "Tujuan & Perubahan Kemampuan",
  sub: "〜ように、KK / KK Potensial + ように なりました",
  color: "bab-56",
  tips: [
    {icon:"💡", title:"ように — dua fungsi berbeda", points:[
      "<b>KK kamus/ない + ように、KK</b>: Melakukan KK2 agar tercapai tujuan yang dinyatakan ように.",
      "<ruby><rb>試合に</rb><rt>しあいに</rt></ruby><ruby><rb>出</rb><rt>で</rt></ruby>られる<b>ように</b>、<ruby><rb>毎日</rb><rt>まいにち</rt></ruby><ruby><rb>練習</rb><rt>れんしゅう</rt></ruby>しています。→ Saya latihan tiap hari <b>agar bisa</b> tampil di pertandingan.",
      "<b>KK Potensial + ように なりました</b>: Menyatakan perubahan kemampuan — sesuatu yang dulu tidak bisa, kini bisa.",
      "<ruby><rb>漢字</rb><rt>かんじ</rt></ruby>が<ruby><rb>少</rb><rt>すこ</rt></ruby>し<ruby><rb>読</rb><rt>よ</rt></ruby>める<b>ように なりました</b>。→ Sekarang sudah bisa membaca sedikit kanji.",
      "⚠️ Beda dengan KK + ように して います (sedang berusaha membiasakan diri) — lihat Bab 57."
    ]},
    {icon:"⚠️", title:"KK sebelum ように — kamus atau ない?", points:[
      "Pakai <b>bentuk kamus</b> (potensial) jika tujuannya positif: わかるように、ゆっくり <ruby><rb>話</rb><rt>はな</rt></ruby>します。",
      "Pakai <b>bentuk ない</b> jika tujuannya menghindari sesuatu: <ruby><rb>感染</rb><rt>かんせん</rt></ruby>しないように、よく <ruby><rb>手</rb><rt>て</rt></ruby>を<ruby><rb>洗</rb><rt>あら</rt></ruby>いましょう。",
      "KK non-kehendak (わかります、みえます、きこえます、なります) selalu pakai bentuk kamus sebelum ように."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK kamus / KK ない + ように、KK — Agar ~",
      pattern: "KK-kamus / KK-ない + ように、KK",
      desc: "Pola ini menunjukkan upaya yang dilakukan di KK2 untuk mencapai situasi yang dinyatakan oleh ように. Bentuk kamus dari kata kerja non-kehendak (seperti わかります, みえます, きこえます, なります) atau kata kerja bentuk negatif digunakan sebelum ように.",
      note: {type:"blue", text:"<b>💡 KK non-kehendak sebelum ように:</b><br>Kata kerja yang tidak bisa dikontrol langsung (わかる、みえる、きこえる、なれる) selalu pakai bentuk kamus sebelum ように, bukan bentuk て.<br><ruby><rb>例</rb><rt>れい</rt></ruby>: <ruby><rb>聞</rb><rt>き</rt></ruby>こえるように、マイクを <ruby><rb>使</rb><rt>つか</rt></ruby>います。(Pakai mikrofon agar terdengar.)"},
      reibun: [
        {jp:"<ruby><rb>試合</rb><rt>しあい</rt></ruby>に <ruby><rb>出</rb><rt>で</rt></ruby>られる ように、<ruby><rb>毎日</rb><rt>まいにち</rt></ruby> <ruby><rb>練習</rb><rt>れんしゅう</rt></ruby>して います。", rom:"Shiai ni derareru yō ni, mainichi renshū shite imasu.", id:"Saya berlatih setiap hari agar bisa tampil di pertandingan."},
        {jp:"<ruby><rb>知</rb><rt>し</rt></ruby>らない ことばが あったら <ruby><rb>調</rb><rt>しら</rt></ruby>べられる ように、いつも <ruby><rb>電子辞書</rb><rt>でんしじしょ</rt></ruby>を <ruby><rb>持</rb><rt>も</rt></ruby>って います。", rom:"Shiranai kotoba ga attara shiraberu yō ni, itsumo denshi jisho o motte imasu.", id:"Agar bisa mencari kata yang tidak diketahui, saya selalu membawa kamus elektronik."},
        {jp:"ノロウイルスに <ruby><rb>感染</rb><rt>かんせん</rt></ruby>しない ように、よく <ruby><rb>手</rb><rt>て</rt></ruby>を <ruby><rb>洗</rb><rt>あら</rt></ruby>いましょう。", rom:"Noroウイルス ni kansen shinai yō ni, yoku te o araimashō.", id:"Agar tidak tertular norovirus, mari rajin cuci tangan."}
      ]
    },
    {
      tag: "B", label: "KK Potensial + ように なりました — menjadi bisa ~",
      pattern: "KK [potensial / bentuk kamus] + ように なりました",
      desc: "Pola ini digunakan untuk menyatakan perubahan kemampuan atau keadaan untuk memungkinkan terjadinya suatu kondisi tertentu. Menyatakan sesuatu yang dulu tidak bisa, kini sudah bisa.",
      note: {type:"teal", text:"<b>💡 ように なりました vs ように して います:</b><br>• ように <b>なりました</b>: Perubahan sudah terjadi (hasil). <ruby><rb>漢字</rb><rt>かんじ</rt></ruby>が<ruby><rb>読</rb><rt>よ</rt></ruby>めるように なりました。<br>• ように <b>して います</b>: Sedang berusaha membiasakan (proses). バスに<ruby><rb>乗</rb><rt>の</rt></ruby>らないように して います。(Bab 57)"},
      reibun: [
        {jp:"<ruby><rb>漢字</rb><rt>かんじ</rt></ruby>が <ruby><rb>少</rb><rt>すこ</rt></ruby>し <ruby><rb>読</rb><rt>よ</rt></ruby>める ように なりました。", rom:"Kanji ga sukoshi yomeru yō ni narimashita.", id:"Sekarang sudah bisa membaca sedikit kanji."},
        {jp:"<ruby><rb>日本語</rb><rt>にほんご</rt></ruby>で メールが <ruby><rb>書</rb><rt>か</rt></ruby>ける ように なりました。", rom:"Nihongo de mēru ga kakeru yō ni narimashita.", id:"Sekarang sudah bisa menulis email dalam bahasa Jepang."},
        {jp:"<ruby><rb>自転車</rb><rt>じてんしゃ</rt></ruby>に <ruby><rb>乗</rb><rt>の</rt></ruby>れる ように なりました。", rom:"Jitensha ni noreru yō ni narimashita.", id:"Sekarang sudah bisa naik sepeda."}
      ]
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>試合に</rb><rt>しあいに</rt></ruby>）<ruby><rb>出ます</rb><rt>でます</rt></ruby>",furigana:"（しあいに）でます",rom:"(shiai ni) demasu",id:"berpartisipasi dalam (pertandingan)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>打ちます</rb><rt>うちます</rt></ruby>",furigana:"うちます",rom:"uchimasu",id:"memukul",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>太ります</rb><rt>ふとります</rt></ruby>",furigana:"ふとります",rom:"futorimasu",id:"menjadi gemuk",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>痩せます</rb><rt>やせます</rt></ruby>",furigana:"やせます",rom:"yasemasu",id:"menjadi kurus",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>貯金します</rb><rt>ちょきんします</rt></ruby>",furigana:"ちょきんします",rom:"chokin shimasu",id:"menabung",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（<ruby><rb>習慣に</rb><rt>しゅうかんに</rt></ruby>）<ruby><rb>慣れます</rb><rt>なれます</rt></ruby>",furigana:"（しゅうかんに）なれます",rom:"(shūkan ni) naremasu",id:"terbiasa (pada kebiasaan)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>感染します</rb><rt>かんせんします</rt></ruby>",furigana:"かんせんします",rom:"kansen shimasu",id:"terjangkit",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"（<ruby><rb>病気を</rb><rt>びょうきを</rt></ruby>）<ruby><rb>うつします</rb><rt>うつします</rt></ruby>",furigana:"（びょうきを）うつします",rom:"(byōki o) utsushimasu",id:"menularkan (penyakit)",cat:"Kata Kerja",lv:"extra",grp:"I"},
    {jp:"<ruby><rb>電子</rb><rt>でんし</rt></ruby>〜",furigana:"でんし〜",rom:"denshi~",id:"~ elektronik",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>携帯</rb><rt>けいたい</rt></ruby>〜",furigana:"けいたい〜",rom:"keitai~",id:"~ portabel",cat:"Kata Benda",lv:"core"},
    {jp:"ノロウイルス",furigana:"ノロウイルス",rom:"Noroウイrusu",id:"Norovirus",cat:"Kata Benda",lv:"extra"},
    {jp:"マスク",furigana:"マスク",rom:"masuku",id:"masker",cat:"Kata Benda",lv:"core"}
  ]
},
{
  num: 57,
  title: "Kebiasaan & Permintaan Sopan",
  sub: "〜ように して います / 〜ように して ください",
  color: "bab-57",
  tips: [
    {icon:"💡", title:"ように して います vs ように なりました", points:[
      "<b>ように して います</b>: Sedang berusaha membiasakan diri (proses, masih berlangsung).",
      "バスに <ruby><rb>乗</rb><rt>の</rt></ruby>らない<b>ように して います</b>。→ Saya sedang berusaha tidak naik bus (kebiasaan baru).",
      "<b>ように なりました</b>: Perubahan sudah terjadi dan selesai (hasil/pencapaian). (Bab 56)",
      "バスに<ruby><rb>乗</rb><rt>の</rt></ruby>れる<b>ように なりました</b>。→ Sekarang sudah bisa naik bus.",
      "Kunci: して います = proses/usaha sedang berjalan. なりました = hasil sudah tercapai."
    ]},
    {icon:"💡", title:"ように して ください — permintaan tidak langsung", points:[
      "<b>〜ように して ください</b>: Mohon usahakan agar ~ (lebih sopan dari てください).",
      "<ruby><rb>面接</rb><rt>めんせつ</rt></ruby>のとき、<ruby><rb>丁寧</rb><rt>ていねい</rt></ruby>な<ruby><rb>言葉</rb><rt>ことば</rt></ruby>で<ruby><rb>話</rb><rt>はな</rt></ruby>す<b>ように して ください</b>。→ Saat wawancara, mohon usahakan berbicara dengan sopan.",
      "Cocok dipakai saat meminta perubahan kebiasaan, bukan sekadar tindakan sekali.",
      "〜<b>てください</b> = perintah langsung satu tindakan. ように して ください = mohon jadikan kebiasaan."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK kamus / KK ない + ように して います — Sedang berusaha membiasakan ~",
      pattern: "KK-kamus / KK-ない + ように して います",
      desc: "Pola ini menunjukkan bahwa pembicara sedang mencoba untuk melakukan suatu kebiasaan tertentu. Berbeda dengan ように なりました yang menyatakan hasil, ように して います menyatakan usaha yang masih berlangsung.",
      reibun: [
        {jp:"バスに <ruby><rb>乗</rb><rt>の</rt></ruby>らないで <ruby><rb>駅</rb><rt>えき</rt></ruby>まで <ruby><rb>歩</rb><rt>ある</rt></ruby>く ように して います。", rom:"Basu ni noranaide eki made aruku yō ni shite imasu.", id:"Saya sedang membiasakan diri untuk tidak naik bus dan jalan kaki ke stasiun."},
        {jp:"できるだけ 11<ruby><rb>時</rb><rt>じ</rt></ruby>までに <ruby><rb>寝</rb><rt>ね</rt></ruby>る ように して います。", rom:"Dekiru dake jūichiji made ni neru yō ni shite imasu.", id:"Saya berusaha tidur sebelum jam 11 sebisa mungkin."},
        {jp:"できるだけ エレベーターに <ruby><rb>乗</rb><rt>の</rt></ruby>らない ように して います。", rom:"Dekiru dake erebētā ni noranai yō ni shite imasu.", id:"Saya berusaha untuk tidak naik lift sebisa mungkin."}
      ]
    },
    {
      tag: "B", label: "KK kamus / KK ない + ように して ください — Mohon usahakan ~",
      pattern: "KK-kamus / KK-ない + ように して ください",
      desc: "Pola ini digunakan untuk meminta seseorang melakukan suatu kebiasaan tertentu. Berbeda dengan 〜て/〜ないで ください yang bermakna meminta secara langsung, bentuk 〜ように して ください merupakan permintaan secara tidak langsung dan lebih sopan.",
      note: {type:"teal", text:"<b>💡 Perbandingan tingkat kesopanan permintaan:</b><br>• <b>てください</b>: langsung, setara perintah sopan<br>• <b>ように して ください</b>: tidak langsung, lebih sopan, cocok untuk atasan/dokter<br>• <b>ていただけませんか</b>: sangat sopan (N4 lanjutan)"},
      reibun: [
        {jp:"<ruby><rb>面接</rb><rt>めんせつ</rt></ruby>の とき、<ruby><rb>丁寧</rb><rt>ていねい</rt></ruby>な <ruby><rb>言葉</rb><rt>ことば</rt></ruby>で <ruby><rb>話</rb><rt>はな</rt></ruby>す ように して ください。", rom:"Mensetsu no toki, teinei na kotoba de hanasu yō ni shite kudasai.", id:"Saat wawancara, mohon usahakan berbicara dengan kata-kata yang sopan."},
        {jp:"<ruby><rb>熱</rb><rt>ねつ</rt></ruby>が ある ときは、お<ruby><rb>風呂</rb><rt>ふろ</rt></ruby>に <ruby><rb>入</rb><rt>はい</rt></ruby>らない ように して ください。", rom:"Netsu ga aru toki wa, ofuro ni hairanai yō ni shite kudasai.", id:"Saat demam, mohon usahakan untuk tidak mandi berendam."},
        {jp:"<ruby><rb>明日</rb><rt>あした</rt></ruby>の <ruby><rb>試験</rb><rt>しけん</rt></ruby>に <ruby><rb>遅</rb><rt>おく</rt></ruby>れない ように して ください。", rom:"Ashita no shiken ni okurenai yō ni shite kudasai.", id:"Mohon usahakan tidak terlambat untuk ujian besok."}
      ]
    }
  ],
  kotoba: [
    {jp:"（7<ruby><rb>時を</rb><rt>じを</rt></ruby>）<ruby><rb>過ぎます</rb><rt>すぎます</rt></ruby>",furigana:"（7じを）すぎます",rom:"(shichiji o) sugimasu",id:"lewat (jam 7)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>残業します</rb><rt>ざんぎょうします</rt></ruby>",furigana:"ざんぎょうします",rom:"zangyō shimasu",id:"kerja lembur",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（<ruby><rb>血圧が</rb><rt>けつあつが</rt></ruby>）<ruby><rb>上がります</rb><rt>あがります</rt></ruby>",furigana:"（けつあつが）あがります",rom:"(ketsuatsu ga) agarimasu",id:"tekanan darah naik",cat:"Kata Kerja",lv:"extra",grp:"I"},
    {jp:"<ruby><rb>硬い</rb><rt>かたい</rt></ruby>",furigana:"かたい",rom:"katai",id:"keras; padat",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>柔らかい</rb><rt>やわらかい</rt></ruby>",furigana:"やわらかい",rom:"yawarakai",id:"lembut; halus",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>丁寧</rb><rt>ていねい</rt></ruby>（な）",furigana:"ていねい（な）",rom:"teinei (na)",id:"sopan",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>健康</rb><rt>けんこう</rt></ruby>",furigana:"けんこう",rom:"kenkō",id:"kesehatan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>毎週</rb><rt>まいしゅう</rt></ruby>",furigana:"まいしゅう",rom:"maishū",id:"setiap minggu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>毎月</rb><rt>まいつき</rt></ruby>",furigana:"まいつき",rom:"maitsuki",id:"setiap bulan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>毎年</rb><rt>まいとし</rt></ruby>",furigana:"まいとし",rom:"maitoshi",id:"setiap tahun",cat:"Kata Benda",lv:"core"},
    {jp:"ノートパソコン",furigana:"ノートパソコン",rom:"nōto pasokon",id:"laptop",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>小説</rb><rt>しょうせつ</rt></ruby>",furigana:"しょうせつ",rom:"shōsetsu",id:"novel",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>歴史小説</rb><rt>れきししょうせつ</rt></ruby>",furigana:"れきししょうせつ",rom:"rekishi shōsetsu",id:"novel sejarah",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>血圧</rb><rt>けつあつ</rt></ruby>",furigana:"けつあつ",rom:"ketsuatsu",id:"tekanan darah",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>必ず</rb><rt>かならず</rt></ruby>",furigana:"かならず",rom:"kanarazu",id:"tentu; pasti",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>絶対に</rb><rt>ぜったいに</rt></ruby>",furigana:"ぜったいに",rom:"zettai ni",id:"tentu saja; sangat",cat:"Kata Keterangan",lv:"core"},
    {jp:"できるだけ",furigana:"できるだけ",rom:"dekiru dake",id:"sebisa mungkin",cat:"Kata Keterangan",lv:"core"},
    {jp:"このごろ",furigana:"このごろ",rom:"konogoro",id:"belakangan ini",cat:"Kata Keterangan",lv:"core"},
    {jp:"〜ずつ",furigana:"〜ずつ",rom:"~zutsu",id:"per ~",cat:"Kata Keterangan",lv:"core"}
  ]
},
{
  num: 58,
  title: "Kata Kerja Pasif (受身形)",
  sub: "<ruby><rb>受身形</rb><rt>うけみけい</rt></ruby> — Bentuk Pasif",
  color: "bab-58",
  tips: [
    {icon:"💡", title:"Cara membentuk kata kerja pasif", points:[
      "<b>Grup I (Godan)</b>: vokal う → あ + れます。かく→かかれます / のむ→のまれます / よぶ→よばれます",
      "<b>Grup II (Ichidan)</b>: る → られます。たべる→たべられます / みる→みられます",
      "<b>Grup III</b>: くる→<b>こられます</b> / する→<b>されます</b>",
      "Pola pasif berkonjugasi seperti KK Grup II (ます、て、た、ない).",
      "⚠️ Grup I: akhiran う langsung → あ. のむ → のま<b>れ</b>ます (bukan のもれます!)."
    ]},
    {icon:"⚠️", title:"Tiga pola kalimat pasif", points:[
      "<b>Pasif langsung</b> (Bab B): KB1 は KB2 に KK pasif → Orang 1 menerima tindakan dari orang 2.",
      "(わたしは) <ruby><rb>父</rb><rt>ちち</rt></ruby>に ほめられました。→ Saya dipuji oleh ayah.",
      "<b>Pasif kepemilikan</b> (Bab C): KB1 は KB2 に KB3 を KK pasif → Orang 2 melakukan sesuatu pada milik orang 1.",
      "(わたしは) <ruby><rb>弟</rb><rt>おとうと</rt></ruby>に パソコンを <ruby><rb>壊</rb><rt>こわ</rt></ruby>されました。→ Komputer saya dirusak oleh adik (mengganggu).",
      "<b>Pasif impersonal</b> (Bab 59): Subjek tak jelas/tak penting. この<ruby><rb>本</rb><rt>ほん</rt></ruby>は 100<ruby><rb>年</rb><rt>ねん</rt></ruby><ruby><rb>前</rb><rt>まえ</rt></ruby>に<ruby><rb>書</rb><rt>か</rt></ruby>かれました。→ Buku ini ditulis 100 tahun lalu."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "受身形 — Konjugasi Kata Kerja Pasif",
      pattern: "Grup I: ~う → ~あれます / Grup II: ~る → ~られます / Grup III: tidak beraturan",
      desc: "Kata kerja pasif terkonjugasi sebagai kata kerja grup II.",
      note: {type:"blue", text:"<b>💡 Tabel konjugasi pasif ringkas:</b><br>Gr I: かく→かか<b>れます</b> / よむ→よま<b>れます</b> / よぶ→よば<b>れます</b><br>Gr II: たべる→たべ<b>られます</b> / みる→み<b>られます</b><br>Gr III: くる→こ<b>られます</b> / する→<b>されます</b>"},
      reibun: [
        {jp:"（わたしは） <ruby><rb>子どもの</rb><rt>こどもの</rt></ruby> とき、よく <ruby><rb>父</rb><rt>ちち</rt></ruby>に <ruby><rb>ほめられました</rb><rt></rt></ruby>。", rom:"(Watashi wa) kodomo no toki, yoku chichi ni homeraremashita.", id:"(Saya) waktu kecil sering dipuji oleh ayah."},
        {jp:"（わたしは） <ruby><rb>宿題</rb><rt>しゅくだい</rt></ruby>を <ruby><rb>忘れて</rb><rt>わすれて</rt></ruby>、<ruby><rb>先生</rb><rt>せんせい</rt></ruby>に <ruby><rb>叱られました</rb><rt>しかられました</rt></ruby>。", rom:"(Watashi wa) shukudai o wasurete, sensei ni shikararemashita.", id:"Saya lupa PR dan dimarahi oleh guru."},
        {jp:"リーさんは <ruby><rb>友達</rb><rt>ともだち</rt></ruby>に コンサートに <ruby><rb>誘われました</rb><rt>さそわれました</rt></ruby>。", rom:"Rī-san wa tomodachi ni konsāto ni sasowaremashita.", id:"Lee diajak konser oleh temannya."}
      ]
    },
    {
      tag: "B", label: "KB1 は KB2 に KK pasif — Pasif langsung",
      pattern: "KB1 (orang 1) は KB2 (orang 2) に KK pasif",
      desc: "Pola ini menunjukkan suatu perbuatan yang dilakukan oleh KB2 (orang 2) dan berdampak kepada KB1 (orang 1) yang menjadi sasaran perbuatan. Orang 1 sebagai topik yang diikuti partikel は dan orang yang melakukan perbuatan (orang 2) ditunjukkan dengan partikel に.",
      reibun: [
        {jp:"（わたしは） <ruby><rb>弟</rb><rt>おとうと</rt></ruby>に パソコンを <ruby><rb>壊</rb><rt>こわ</rt></ruby>されました。", rom:"(Watashi wa) otōto ni pasokon o kowasaremashita.", id:"Komputer saya dirusak oleh adik (mengganggu saya)."},
        {jp:"バオさんは だれかに かさを <ruby><rb>取</rb><rt>と</rt></ruby>られました。", rom:"Bao-san wa dareka ni kasa o toraremashita.", id:"Payung Bao diambil oleh seseorang."},
        {jp:"（わたしは） <ruby><rb>犬</rb><rt>いぬ</rt></ruby>に <ruby><rb>手</rb><rt>て</rt></ruby>を <ruby><rb>かまれました</rb><rt></rt></ruby>。", rom:"(Watashi wa) inu ni te o kamaremashita.", id:"Tangan saya digigit anjing."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>褒めます</rb><rt>ほめます</rt></ruby>",furigana:"ほめます",rom:"homemasu",id:"memuji",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>叱ります</rb><rt>しかります</rt></ruby>",furigana:"しかります",rom:"shikarimasu",id:"memarahi",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>誘います</rb><rt>さそいます</rt></ruby>",furigana:"さそいます",rom:"sasoimasu",id:"mengundang",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>起こします</rb><rt>おこします</rt></ruby>",furigana:"おこします",rom:"okoshimasu",id:"membangunkan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>招待します</rb><rt>しょうたいします</rt></ruby>",furigana:"しょうたいします",rom:"shōtai shimasu",id:"mengundang (formal)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>頼みます</rb><rt>たのみます</rt></ruby>",furigana:"たのみます",rom:"tanomimasu",id:"bertanya; meminta",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>注意します</rb><rt>ちゅういします</rt></ruby>",furigana:"ちゅういします",rom:"chūi shimasu",id:"memperingatkan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>取ります</rb><rt>とります</rt></ruby>",furigana:"とります",rom:"torimasu",id:"mengambil",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>踏みます</rb><rt>ふみます</rt></ruby>",furigana:"ふみます",rom:"fumimasu",id:"menginjak",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>汚します</rb><rt>よごします</rt></ruby>",furigana:"よごします",rom:"yogoshimasu",id:"mengotori",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>最悪</rb><rt>さいあく</rt></ruby>（な）",furigana:"さいあく（な）",rom:"saiaku (na)",id:"paling buruk",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"デート",furigana:"デート",rom:"dēto",id:"kencan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>泥棒</rb><rt>どろぼう</rt></ruby>",furigana:"どろぼう",rom:"dorobō",id:"maling; perampok",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>警官</rb><rt>けいかん</rt></ruby>",furigana:"けいかん",rom:"keikan",id:"polisi",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>部長</rb><rt>ぶちょう</rt></ruby>",furigana:"ぶちょう",rom:"buchō",id:"general manager",cat:"Kata Benda",lv:"core"},
    {jp:"うれしそうです",furigana:"うれしそうです",rom:"ureshisō desu",id:"terlihat senang",cat:"Ekspresi",lv:"core"},
    {jp:"だれか",furigana:"だれか",rom:"dareka",id:"seseorang",cat:"Kata Keterangan",lv:"core"}
  ]
},
{
  num: 59,
  title: "Pasif Impersonal & によって",
  sub: "KB が/は KK pasif / 〜によって",
  color: "bab-59",
  tips: [
    {icon:"💡", title:"Pasif impersonal — subjek tak perlu disebutkan", points:[
      "<b>KB が/は KK pasif</b>: Kalimat pasif tanpa menyebut pelaku. Dipakai saat pelaku tidak diketahui, tidak penting, atau sudah jelas.",
      "この<ruby><rb>本</rb><rt>ほん</rt></ruby>は 100<ruby><rb>年</rb><rt>ねん</rt></ruby><ruby><rb>前</rb><rt>まえ</rt></ruby>に<ruby><rb>書</rb><rt>か</rt></ruby>かれました。→ Buku ini ditulis 100 tahun lalu. (oleh siapa tidak penting)",
      "インスタントラーメンは 1958<ruby><rb>年</rb><rt>ねん</rt></ruby>に<ruby><rb>発明</rb><rt>はつめい</rt></ruby>されました。→ Mie instan ditemukan pada tahun 1958.",
      "Berbeda dengan pasif Bab 58 yang fokus pada dampak ke orang 1, pasif ini lebih <b>netral dan objektif</b>.",
      "Pelaku bisa disebutkan dengan <b>によって</b>: 〜によって + KK pasif → Ditulis/dibuat/ditemukan <b>oleh</b> ~."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KB (berwujud/tak berwujud) が/は KK pasif — Pasif impersonal",
      pattern: "KB が/は [keterangan waktu/tempat] に KK pasif",
      desc: "Kalimat pasif ini dapat digunakan ketika tidak perlu menyebutkan siapa yang melakukan tindakan yang terlibat, dan subjek atau topik dapat berwujud atau tidak berwujud.",
      note: {type:"teal", text:"<b>💡 によって vs に:</b><br>• <b>に</b>: pelaku tindakan langsung (orang/hewan). <ruby><rb>先生</rb><rt>せんせい</rt></ruby>に <ruby><rb>叱</rb><rt>しか</rt></ruby>られた。<br>• <b>によって</b>: pelaku karya/penemuan/ciptaan. <ruby><rb>夏目漱石</rb><rt>なつめそうせき</rt></ruby>によって<ruby><rb>書</rb><rt>か</rt></ruby>かれた。<br>によって lebih formal, sering untuk karya seni, penemuan, dokumen resmi."},
      reibun: [
        {jp:"<ruby><rb>東京</rb><rt>とうきょう</rt></ruby>で <ruby><rb>展覧会</rb><rt>てんらんかい</rt></ruby>が <ruby><rb>開</rb><rt>ひら</rt></ruby>かれました。", rom:"Tōkyō de tenrankai ga hirakaremashita.", id:"Pameran diadakan di Tokyo."},
        {jp:"<ruby><rb>銀河鉄道</rb><rt>ぎんがてつどう</rt></ruby>の <ruby><rb>夜</rb><rt>よる</rt></ruby>は <ruby><rb>宮沢賢治</rb><rt>みやざわけんじ</rt></ruby>に よって <ruby><rb>書</rb><rt>か</rt></ruby>かれました。", rom:"Ginga Tetsudō no Yoru wa Miyazawa Kenji ni yotte kakaremashita.", id:"Night on the Galactic Railroad ditulis oleh Miyazawa Kenji."},
        {jp:"<ruby><rb>漢字</rb><rt>かんじ</rt></ruby>は <ruby><rb>中国</rb><rt>ちゅうごく</rt></ruby>や <ruby><rb>日本</rb><rt>にほん</rt></ruby>で <ruby><rb>使</rb><rt>つか</rt></ruby>われて います。", rom:"Kanji wa Chūgoku ya Nihon de tsukawarete imasu.", id:"Kanji digunakan di China dan Jepang."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>行います</rb><rt>おこないます</rt></ruby>",furigana:"おこないます",rom:"okonaimasu",id:"menyelenggarakan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>輸出します</rb><rt>ゆしゅつします</rt></ruby>",furigana:"ゆしゅつします",rom:"yushutsu shimasu",id:"mengekspor",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>輸入します</rb><rt>ゆにゅうします</rt></ruby>",furigana:"ゆにゅうします",rom:"yunyū shimasu",id:"mengimpor",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>翻訳します</rb><rt>ほんやくします</rt></ruby>",furigana:"ほんやくします",rom:"hon'yaku shimasu",id:"menerjemahkan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>発明します</rb><rt>はつめいします</rt></ruby>",furigana:"はつめいします",rom:"hatsumei shimasu",id:"menciptakan; menemukan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>発見します</rb><rt>はっけんします</rt></ruby>",furigana:"はっけんします",rom:"hakken shimasu",id:"menemukan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>設計します</rb><rt>せっけいします</rt></ruby>",furigana:"せっけいします",rom:"sekkei shimasu",id:"merancang",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"オリンピック",furigana:"オリンピック",rom:"Orinpikku",id:"Olimpiade",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>洋服</rb><rt>ようふく</rt></ruby>",furigana:"ようふく",rom:"yōfuku",id:"pakaian",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>米</rb><rt>こめ</rt></ruby>",furigana:"こめ",rom:"kome",id:"beras",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>石油</rb><rt>せきゆ</rt></ruby>",furigana:"せきゆ",rom:"sekiyu",id:"minyak bumi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>原料</rb><rt>げんりょう</rt></ruby>",furigana:"げんりょう",rom:"genryō",id:"bahan baku",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>漫画</rb><rt>まんが</rt></ruby>",furigana:"まんが",rom:"manga",id:"komik; kartun",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>展覧会</rb><rt>てんらんかい</rt></ruby>",furigana:"てんらんかい",rom:"tenrankai",id:"pameran",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>世界中</rb><rt>せかいじゅう</rt></ruby>",furigana:"せかいじゅう",rom:"sekaijū",id:"di seluruh dunia",cat:"Kata Benda",lv:"core"},
    {jp:"〜<ruby><rb>製</rb><rt>せい</rt></ruby>",furigana:"〜せい",rom:"~sei",id:"buatan ~",cat:"Kata Benda",lv:"core"},
    {jp:"〜<ruby><rb>中</rb><rt>じゅう</rt></ruby>",furigana:"〜じゅう",rom:"~jū",id:"seluruh ~",cat:"Kata Benda",lv:"core"},
    {jp:"インスタントラーメン",furigana:"インスタントラーメン",rom:"insutanto rāmen",id:"mie instan",cat:"Kata Benda",lv:"extra"},
    {jp:"ロボット",furigana:"ロボット",rom:"robotto",id:"robot",cat:"Kata Benda",lv:"extra"},
    {jp:"〜によって",furigana:"〜によって",rom:"~ni yotte",id:"oleh ~",cat:"Ekspresi",lv:"core"}
  ]
},
{
  num: 60,
  title: "Nominalisasi KK dengan の",
  sub: "KK-kamus の は / KK-kamus の が + KS",
  color: "bab-60",
  tips: [
    {icon:"💡", title:"の sebagai nominalizer — mengubah KK menjadi KB", points:[
      "<b>KK + の</b>: mengubah kata kerja atau frasa kerja menjadi kata benda (nominalisasi).",
      "<ruby><rb>音楽</rb><rt>おんがく</rt></ruby>を<ruby><rb>聞</rb><rt>き</rt></ruby>く<b>の</b>が <ruby><rb>好き</rb><rt>す</rt></ruby>です。→ Saya suka mendengarkan musik. (の = subjek yang disukai)",
      "みんなで<ruby><rb>晩ごはん</rb><rt>ばんごはん</rt></ruby>を<ruby><rb>食べる</rb><rt>たべる</rt></ruby><b>の</b>は <ruby><rb>楽</rb><rt>たの</rt></ruby>しいです。→ Makan malam bersama itu menyenangkan. (の = topik)",
      "⚠️ Beda fungsi: <b>のは</b> → KK menjadi topik kalimat. <b>のが</b> → KK menjadi objek KS (すき、きらい、じょうず、へた、はやい、おそい)."
    ]},
    {icon:"⚠️", title:"のは vs のが — pilih yang tepat", points:[
      "<b>KK の<u>は</u></b>: diikuti kata sifat yang mendeskripsikan/menilai topik (むずかしい、たのしい、おもしろい、たいへん).",
      "<ruby><rb>毎日</rb><rt>まいにち</rt></ruby><ruby><rb>新</rb><rt>あたら</rt></ruby>しい<ruby><rb>漢字</rb><rt>かんじ</rt></ruby>を<ruby><rb>覚</rb><rt>おぼ</rt></ruby>えるの<b>は</b> <ruby><rb>大変</rb><rt>たいへん</rt></ruby>です。→ Menghapal kanji baru tiap hari itu berat.",
      "<b>KK の<u>が</u></b>: diikuti kata sifat preferensi/kemampuan (すき、きらい、じょうず、へた、はやい、おそい).",
      "<ruby><rb>料理</rb><rt>りょうり</rt></ruby>を<ruby><rb>作</rb><rt>つく</rt></ruby>るの<b>が</b> <ruby><rb>上手</rb><rt>じょうず</rt></ruby>です。→ Pandai memasak.",
      "Kata sifat seperti むずかしい、たのしい bisa pakai keduanya tergantung nuansa."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK-kamus のは KS です — KK menjadi topik",
      pattern: "KK [bentuk kamus] + のは + KS です",
      desc: "Pada pola kalimat ini, 'KK bentuk kamus + の' ditampilkan sebagai topik dengan menyematkan partikel は. Kata sifat seperti むずかしい、やさしい、おもしろい、たのしい dan たいへん（な） sering digunakan dalam pola kalimat ini.",
      reibun: [
        {jp:"みんなで <ruby><rb>晩ごはん</rb><rt>ばんごはん</rt></ruby>を <ruby><rb>食</rb><rt>た</rt></ruby>べる のは <ruby><rb>楽</rb><rt>たの</rt></ruby>しいです。", rom:"Minna de bangohan o taberu no wa tanoshii desu.", id:"Makan malam bersama-sama itu menyenangkan."},
        {jp:"<ruby><rb>朝</rb><rt>あさ</rt></ruby> <ruby><rb>早</rb><rt>はや</rt></ruby>く <ruby><rb>散歩</rb><rt>さんぽ</rt></ruby>する のは <ruby><rb>気持</rb><rt>きも</rt></ruby>ちが いいです。", rom:"Asa hayaku sanpo suru no wa kimochi ga ii desu.", id:"Berjalan-jalan pagi hari itu terasa menyenangkan."},
        {jp:"<ruby><rb>毎日</rb><rt>まいにち</rt></ruby> <ruby><rb>新</rb><rt>あたら</rt></ruby>しい <ruby><rb>漢字</rb><rt>かんじ</rt></ruby>を <ruby><rb>覚</rb><rt>おぼ</rt></ruby>えるのは <ruby><rb>大変</rb><rt>たいへん</rt></ruby>です。", rom:"Mainichi atarashii kanji o oboeru no wa taihen desu.", id:"Menghapal kanji baru setiap hari itu berat."}
      ]
    },
    {
      tag: "B", label: "KK-kamus のが KS です — KK menjadi objek KS",
      pattern: "KK [bentuk kamus] + のが + KS (すき/じょうず/はやい dll.)",
      desc: "Pada pola kalimat ini, 'KK bentuk kamus + の' adalah sesuatu yang dijelaskan oleh kata sifat. Kata sifat seperti すき（な）、きらい（な）、じょうず（な）、へた（な）、はやい dan おそい sering digunakan untuk menggambarkan hal-hal seperti preferensi, keterampilan, dan kemampuan.",
      note: {type:"amber", text:"<b>⚠️ のが vs のは — panduan cepat:</b><br>• KK の<b>が</b> すきです / じょうずです / きらいです → preferensi/kemampuan, pakai <b>が</b><br>• KK の<b>は</b> たのしいです / むずかしいです → penilaian/deskripsi topik, pakai <b>は</b>"},
      reibun: [
        {jp:"わたしは <ruby><rb>音楽</rb><rt>おんがく</rt></ruby>を <ruby><rb>聞</rb><rt>き</rt></ruby>く のが <ruby><rb>好</rb><rt>す</rt></ruby>きです。", rom:"Watashi wa ongaku o kiku no ga suki desu.", id:"Saya suka mendengarkan musik."},
        {jp:"バオさんは <ruby><rb>料理</rb><rt>りょうり</rt></ruby>を <ruby><rb>作</rb><rt>つく</rt></ruby>る のが <ruby><rb>上手</rb><rt>じょうず</rt></ruby>です。", rom:"Bao-san wa ryōri o tsukuru no ga jōzu desu.", id:"Bao pandai memasak."},
        {jp:"<ruby><rb>亀</rb><rt>かめ</rt></ruby>は <ruby><rb>歩</rb><rt>ある</rt></ruby>く のが <ruby><rb>遅</rb><rt>おそ</rt></ruby>いです。", rom:"Kame wa aruku no ga osoi desu.", id:"Kura-kura berjalan lambat."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>育てます</rb><rt>そだてます</rt></ruby>",furigana:"そだてます",rom:"sodatemasu",id:"merawat; membesarkan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>運びます</rb><rt>はこびます</rt></ruby>",furigana:"はこびます",rom:"hakobimasu",id:"membawa; mengangkut",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>嘘を</rb><rt>うそを</rt></ruby>）つきます",furigana:"（うそを）つきます",rom:"(uso o) tsukimasu",id:"berbohong",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>気持ちがいい</rb><rt>きもちがいい</rt></ruby>",furigana:"きもちがいい",rom:"kimochi ga ii",id:"menyenangkan; nyaman",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>気持ちが悪い</rb><rt>きもちがわるい</rt></ruby>",furigana:"きもちがわるい",rom:"kimochi ga warui",id:"tidak menyenangkan; menjijikkan",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>大人しい</rb><rt>おとなしい</rt></ruby>",furigana:"おとなしい",rom:"otonashii",id:"diam; bersikap lembut",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>嘘</rb><rt>うそ</rt></ruby>",furigana:"うそ",rom:"uso",id:"bohong",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>気持ち</rb><rt>きもち</rt></ruby>",furigana:"きもち",rom:"kimochi",id:"perasaan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>亀</rb><rt>かめ</rt></ruby>",furigana:"かめ",rom:"kame",id:"kura-kura",cat:"Kata Benda",lv:"extra"},
    {jp:"ダイエット（をします）",furigana:"ダイエット（をします）",rom:"daietto (o shimasu)",id:"(menjalani) diet",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>金魚</rb><rt>きんぎょ</rt></ruby>",furigana:"きんぎょ",rom:"kingyo",id:"ikan mas",cat:"Kata Benda",lv:"extra"},
    {jp:"たいてい",furigana:"たいてい",rom:"taitei",id:"sebagian besar",cat:"Kata Keterangan",lv:"core"},
    {jp:"きちんと",furigana:"きちんと",rom:"kichinto",id:"dengan rapi",cat:"Kata Keterangan",lv:"core"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 61 — KK bentuk biasa のを わすれました／しっていますか
// ─────────────────────────────────────────────────
{
  num: 61,
  title: "Nominalisasi のを + わすれました／しっていますか",
  sub: "KK-biasa のを 忘れました / 知っていますか",
  color: "bab-61",
  tips: [
    {icon:"💡", title:"のを — nominalizer sebagai objek", points:[
      "Pola: <b>KK bentuk biasa + のを</b> → KK dijadikan objek dari kata kerja utama seperti わすれました、しっています、みました.",
      "Contoh: でんきを <b>けすのを</b> わすれました → (saya) lupa mematikan lampu.",
      "Contoh: はたのせんせいに あかちゃんが <b>うまれたのを</b> しっていますか → Apakah kamu tahu bahwa Ibu Hatano melahirkan bayi?",
      "⚠️ Bedakan: <b>のを わすれました</b> (lupa melakukan) vs <b>KB を わすれました</b> (lupa membawa benda)."
    ]},
    {icon:"⚠️", title:"のを vs ことを", points:[
      "Keduanya dapat nominalisasi kata kerja, tetapi <b>のを</b> lebih natural untuk peristiwa konkret/fakta yang dapat dirasakan.",
      "<b>ことを</b> lebih formal dan dipakai untuk hal abstrak atau kalimat tidak langsung.",
      "Dengan わすれます dan しります: lebih sering memakai <b>のを</b>.",
      "Contoh pararel: くすりを のむ<b>のを</b> わすれました (のを lebih natural dari ことを di sini)."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK bentuk biasa のを 忘れました／知っていますか",
      pattern: "KK [bentuk biasa] + のを + 忘れました / 知っていますか",
      desc: "'KK bentuk biasa + の' menjadi objek dari kata kerja seperti わすれました dan しっていますか, yang ditandai dengan partikel を.",
      reibun: [
        {jp:"<ruby><rb>部屋</rb><rt>へや</rt></ruby>の <ruby><rb>電気</rb><rt>でんき</rt></ruby>を <ruby><rb>消</rb><rt>け</rt></ruby>すのを <ruby><rb>忘</rb><rt>わす</rt></ruby>れました。", rom:"Heya no denki o kesu no o wasuremashita.", id:"Saya lupa mematikan lampu kamar."},
        {jp:"<ruby><rb>畑野先生</rb><rt>はたのせんせい</rt></ruby>に <ruby><rb>赤</rb><rt>あか</rt></ruby>ちゃんが <ruby><rb>生</rb><rt>う</rt></ruby>まれたのを <ruby><rb>知</rb><rt>し</rt></ruby>っていますか。", rom:"Hatano-sensei ni akachan ga umareta no o shitte imasu ka.", id:"Apakah kamu tahu bahwa Ibu Hatano melahirkan bayi?"}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>亡くなります</rb><rt>なくなります</rt></ruby>",furigana:"なくなります",rom:"nakunarimasu",id:"meninggal",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>入院します</rb><rt>にゅういんします</rt></ruby>",furigana:"にゅういんします",rom:"nyūin shimasu",id:"masuk rumah sakit (dirawat)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>退院します</rb><rt>たいいんします</rt></ruby>",furigana:"たいいんします",rom:"taiin shimasu",id:"keluar rumah sakit",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（<ruby><rb>電源を</rb><rt>でんげんを</rt></ruby>）<ruby><rb>入れます</rb><rt>いれます</rt></ruby>",furigana:"（でんげんを）いれます",rom:"(dengen o) iremasu",id:"menyalakan (saklar daya)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>電源を</rb><rt>でんげんを</rt></ruby>）<ruby><rb>切ります</rb><rt>きります</rt></ruby>",furigana:"（でんげんを）きります",rom:"(dengen o) kirimasu",id:"mematikan (saklar daya)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>鍵を</rb><rt>かぎを</rt></ruby>）かけます",furigana:"（かぎを）かけます",rom:"(kagi o) kakemasu",id:"mengunci",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>整理します</rb><rt>せいりします</rt></ruby>",furigana:"せいりします",rom:"seiri shimasu",id:"memilah (hal)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>世話をします</rb><rt>せわをします</rt></ruby>",furigana:"せわをします",rom:"sewa o shimasu",id:"mengurus",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"※<ruby><rb>遅延証明書</rb><rt>ちえんしょうめいしょ</rt></ruby>",furigana:"ちえんしょうめいしょ",rom:"chien shōmei sho",id:"surat keterangan keterlambatan",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>赤ちゃん</rb><rt>あかちゃん</rt></ruby>",furigana:"あかちゃん",rom:"akachan",id:"bayi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>小学校</rb><rt>しょうがっこう</rt></ruby>",furigana:"しょうがっこう",rom:"shōgakkō",id:"Sekolah Dasar (SD)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>中学校</rb><rt>ちゅうがっこう</rt></ruby>",furigana:"ちゅうがっこう",rom:"chūgakkō",id:"Sekolah Menengah Pertama (SMP)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>駅前</rb><rt>えきまえ</rt></ruby>",furigana:"えきまえ",rom:"ekimae",id:"depan stasiun",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>工場</rb><rt>こうじょう</rt></ruby>",furigana:"こうじょう",rom:"kōjō",id:"pabrik",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>村</rb><rt>むら</rt></ruby>",furigana:"むら",rom:"mura",id:"desa",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>書類</rb><rt>しょるい</rt></ruby>",furigana:"しょるい",rom:"shorui",id:"dokumen",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>電源</rb><rt>でんげん</rt></ruby>",furigana:"でんげん",rom:"dengen",id:"sumber daya",cat:"Kata Benda",lv:"core"},
    {jp:"おととし",furigana:"おととし",rom:"ototoshi",id:"dua tahun lalu",cat:"Kata Keterangan",lv:"core"},
    {jp:"はんこ",furigana:"はんこ",rom:"hanko",id:"segel; stempel",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>性格</rb><rt>せいかく</rt></ruby>",furigana:"せいかく",rom:"seikaku",id:"karakter; kepribadian",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>模擬試験</rb><rt>もぎしけん</rt></ruby>",furigana:"もぎしけん",rom:"mogi shiken",id:"tes uji coba",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>花火大会</rb><rt>はなびたいかい</rt></ruby>",furigana:"はなびたいかい",rom:"hanabi taikai",id:"festival kembang api",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>横浜</rb><rt>よこはま</rt></ruby>",furigana:"よこはま",rom:"yokohama",id:"Yokohama",cat:"Kata Benda",lv:"extra"},
    {jp:"※お<ruby><rb>祝い</rb><rt>いわい</rt></ruby>",furigana:"おいわい",rom:"oiwai",id:"perayaan",cat:"Kata Benda",lv:"extra"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 62 — 〜て、〜 (karena/ketika) & KB で (penyebab)
// ─────────────────────────────────────────────────
{
  num: 62,
  title: "〜て〜 (sebab/akibat) & KB で (penyebab)",
  sub: "〜て、〜 karena/ketika / KB で fenomena",
  color: "bab-62",
  tips: [
    {icon:"💡", title:"〜て、〜 untuk sebab & akibat", points:[
      "Pola <b>〜て、〜</b> menyatakan sebab/alasan. Bagian kedua berisi pernyataan non-kehendak atau keadaan.",
      "KK: て-form + klausa akhir. KS い: 〜くて. KS な/KB: 〜で.",
      "Contoh KK: たかはしさんが <b>けっこんすると きいて</b>、びっくりしました → mendengar Takahashi menikah, saya kaget.",
      "Contoh KS い: しけんに <b>ごうかくできなくて</b>、がっかりしました → karena tidak lulus ujian, kecewa."
    ]},
    {icon:"🔑", title:"KB で — penyebab fenomena alam/kecelakaan", points:[
      "Partikel <b>で</b> setelah kata benda menyatakan penyebab/alasan untuk fenomena alam, kecelakaan, dll.",
      "Contoh: <b>じしんで</b> ビルが たおれました → Karena gempa, gedung runtuh.",
      "Contoh: <b>たいふうで</b> でんしゃが とまって しまいました → Karena topan, kereta berhenti.",
      "Berbeda dengan て-form yang memakai kata kerja: で digunakan langsung setelah kata benda penyebab."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "〜て、〜 : karena 〜; ketika 〜",
      pattern: "KK / KS い (〜くて) / KS な (〜で) / KB (〜で), 〜",
      desc: "Pola kalimat 〜て、〜 dapat menunjukkan sebab atau alasan dan untuk akibatnya terletak di akhir kalimat. Bagian akhir kalimat merupakan pernyataan non-kehendak atau menjelaskan keadaan.",
      reibun: [
        {jp:"<ruby><rb>高橋</rb><rt>たかはし</rt></ruby>さんが <ruby><rb>結婚</rb><rt>けっこん</rt></ruby>すると <ruby><rb>聞</rb><rt>き</rt></ruby>いて、びっくりしました。", rom:"Takahashi-san ga kekkon suru to kiite, bikkuri shimashita.", id:"Mendengar bahwa Takahashi akan menikah, saya kaget."},
        {jp:"<ruby><rb>試験</rb><rt>しけん</rt></ruby>に <ruby><rb>合格</rb><rt>ごうかく</rt></ruby>できなくて、がっかりしました。", rom:"Shiken ni gōkaku dekinakute, gakkari shimashita.", id:"Karena tidak bisa lulus ujian, saya kecewa."},
        {jp:"<ruby><rb>土曜日</rb><rt>どようび</rt></ruby>は <ruby><rb>都合</rb><rt>つごう</rt></ruby>が <ruby><rb>悪</rb><rt>わる</rt></ruby>くて、<ruby><rb>行</rb><rt>い</rt></ruby>けません。", rom:"Doyōbi wa tsugō ga warukute, ikemasen.", id:"Karena Sabtu tidak bisa (ada halangan), saya tidak bisa pergi."}
      ]
    },
    {
      tag: "B", label: "Kata Benda で",
      pattern: "KB で + klausa",
      desc: "Kata benda で sering digunakan untuk menjelaskan fenomena dan peristiwa alam seperti じこ (kecelakaan), じしん (gempa bumi) dan かじ (kebakaran).",
      reibun: [
        {jp:"<ruby><rb>地震</rb><rt>じしん</rt></ruby>で ビルが <ruby><rb>倒</rb><rt>たお</rt></ruby>れました。", rom:"Jishin de biru ga taoremashita.", id:"Karena gempa, gedung runtuh."},
        {jp:"<ruby><rb>台風</rb><rt>たいふう</rt></ruby>で <ruby><rb>電車</rb><rt>でんしゃ</rt></ruby>が <ruby><rb>止</rb><rt>と</rt></ruby>まって しまいました。", rom:"Taifū de densha ga tomatte shimaimashita.", id:"Karena topan, kereta berhenti."},
        {jp:"<ruby><rb>今日</rb><rt>きょう</rt></ruby>は <ruby><rb>病気</rb><rt>びょうき</rt></ruby>で <ruby><rb>学校</rb><rt>がっこう</rt></ruby>に <ruby><rb>行</rb><rt>い</rt></ruby>けません。", rom:"Kyō wa byōki de gakkō ni ikemasen.", id:"Hari ini karena sakit tidak bisa ke sekolah."}
      ]
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>質問に</rb><rt>しつもんに</rt></ruby>）<ruby><rb>答えます</rb><rt>こたえます</rt></ruby>",furigana:"（しつもんに）こたえます",rom:"(shitsumon ni) kotaemasu",id:"menjawab (pertanyaan)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（ビルが）<ruby><rb>倒れます</rb><rt>たおれます</rt></ruby>",furigana:"（ビルが）たおれます",rom:"(biru ga) taoremasu",id:"(bangunan) runtuh",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>肉が</rb><rt>にくが</rt></ruby>）<ruby><rb>焼けます</rb><rt>やけます</rt></ruby>",furigana:"（にくが）やけます",rom:"(niku ga) yakemasu",id:"(daging/roti) dipanggang",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>通ります</rb><rt>とおります</rt></ruby>",furigana:"とおります",rom:"tōrimasu",id:"lewat",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>死にます</rb><rt>しにます</rt></ruby>",furigana:"しにます",rom:"shinimasu",id:"meninggal",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"びっくりします",furigana:"びっくりします",rom:"bikkuri shimasu",id:"terkejut",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"がっかりします",furigana:"がっかりします",rom:"gakkari shimasu",id:"kecewa",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>安心します</rb><rt>あんしんします</rt></ruby>",furigana:"あんしんします",rom:"anshin shimasu",id:"lega",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>遅刻します</rb><rt>ちこくします</rt></ruby>",furigana:"ちこくします",rom:"chikoku shimasu",id:"terlambat",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>早退します</rb><rt>そうたいします</rt></ruby>",furigana:"そうたいします",rom:"sōtai shimasu",id:"pulang lebih awal",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"けんかします",furigana:"けんかします",rom:"kenka shimasu",id:"bertengkar; berkelahi",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"※<ruby><rb>停電します</rb><rt>ていでんします</rt></ruby>",furigana:"ていでんします",rom:"teiden shimasu",id:"pemadaman listrik",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"<ruby><rb>噴火します</rb><rt>ふんかします</rt></ruby>",furigana:"ふんかします",rom:"funka shimasu",id:"meletus (erupsi)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>複雑</rb><rt>ふくざつ</rt></ruby>（な）",furigana:"ふくざつ（な）",rom:"fukuzatsu (na)",id:"rumit",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>邪魔</rb><rt>じゃま</rt></ruby>（な）",furigana:"じゃま（な）",rom:"jama (na)",id:"gangguan",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>汚い</rb><rt>きたない</rt></ruby>",furigana:"きたない",rom:"kitanai",id:"kotor",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>嬉しい</rb><rt>うれしい</rt></ruby>",furigana:"うれしい",rom:"ureshii",id:"senang; bahagia",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>悲しい</rb><rt>かなしい</rt></ruby>",furigana:"かなしい",rom:"kanashii",id:"sedih",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>恥ずかしい</rb><rt>はずかしい</rt></ruby>",furigana:"はずかしい",rom:"hazukashii",id:"malu",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>火山</rb><rt>かざん</rt></ruby>",furigana:"かざん",rom:"kazan",id:"gunung berapi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>地震</rb><rt>じしん</rt></ruby>",furigana:"じしん",rom:"jishin",id:"gempa bumi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>台風</rb><rt>たいふう</rt></ruby>",furigana:"たいふう",rom:"taifū",id:"angin topan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>火事</rb><rt>かじ</rt></ruby>",furigana:"かじ",rom:"kaji",id:"kebakaran",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>事故</rb><rt>じこ</rt></ruby>",furigana:"じこ",rom:"jiko",id:"kecelakaan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>大勢</rb><rt>おおぜい</rt></ruby>",furigana:"おおぜい",rom:"ōzei",id:"orang dalam jumlah besar; kerumunan orang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>理由</rb><rt>りゆう</rt></ruby>",furigana:"りゆう",rom:"riyū",id:"alasan",cat:"Kata Benda",lv:"core"},
    {jp:"※ウイルス",furigana:"ウイルス",rom:"uirusu",id:"virus",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>原因</rb><rt>げんいん</rt></ruby>",furigana:"げんいん",rom:"gen'in",id:"penyebab",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>落雷</rb><rt>らくらい</rt></ruby>",furigana:"らくらい",rom:"rakurai",id:"sambaran petir",cat:"Kata Benda",lv:"extra"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 63 — 〜ので (karena)
// ─────────────────────────────────────────────────
{
  num: 63,
  title: "〜ので (karena)",
  sub: "〜ので、〜 : karena 〜 (alasan sopan)",
  color: "bab-63",
  tips: [
    {icon:"💡", title:"〜ので vs 〜から — bedakan penggunaannya", points:[
      "Keduanya menyatakan alasan, namun <b>〜ので</b> lebih sopan/halus dan cocok untuk meminta izin.",
      "<b>〜ので</b> memiliki sifat menunjukkan sebab dan akibat, sehingga sangat cocok untuk memberikan alasan atau pembenaran dengan lembut.",
      "<b>〜から</b> lebih langsung/subjektif, cocok untuk percakapan sehari-hari.",
      "Contoh ので: <ruby><rb>漢字</rb><rt>かんじ</rt></ruby>が わからない<b>ので</b>、ひらがなで かいて いただけませんか → Karena tidak mengerti kanji, bisakah ditulis dengan hiragana?"
    ]},
    {icon:"⚠️", title:"Konjugasi sebelum ので", points:[
      "<b>KK & KS い</b>: gunakan bentuk biasa langsung. のむ→のむ<b>ので</b>、たかい→たかい<b>ので</b>.",
      "<b>KS な</b>: tambah <b>な</b> sebelum ので. きれい→きれい<b>なので</b>.",
      "<b>KB</b>: tambah <b>な</b> sebelum ので. がくせい→がくせい<b>なので</b>.",
      "Pengecualian: bentuk sopan (〜ます/〜です) juga bisa dipakai sebelum ので dalam konteks formal."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "〜ので : karena 〜",
      pattern: "KK/KS い [bentuk biasa] + ので / KS な・KB + な + ので、〜",
      desc: "Seperti 〜から, 〜ので juga menunjukkan penyebab atau alasan. ので memiliki sifat menunjukkan sebab dan akibat, sehingga sangat cocok untuk memberikan alasan atau pembenaran dengan lembut ketika meminta izin untuk sesuatu.",
      reibun: [
        {jp:"<ruby><rb>漢字</rb><rt>かんじ</rt></ruby>が わからない ので、ひらがなで <ruby><rb>書</rb><rt>か</rt></ruby>いて いただけませんか。", rom:"Kanji ga wakaranai node, hiragana de kaite itadakemasen ka.", id:"Karena tidak mengerti kanji, bisakah Anda menulisnya dengan hiragana?"},
        {jp:"<ruby><rb>最近</rb><rt>さいきん</rt></ruby> <ruby><rb>忙</rb><rt>いそが</rt></ruby>しい ので、<ruby><rb>映画</rb><rt>えいが</rt></ruby>を <ruby><rb>見</rb><rt>み</rt></ruby>る <ruby><rb>時間</rb><rt>じかん</rt></ruby>が ありません。", rom:"Saikin isogashii node, eiga o miru jikan ga arimasen.", id:"Karena belakangan ini sibuk, tidak ada waktu untuk menonton film."},
        {jp:"<ruby><rb>明日</rb><rt>あした</rt></ruby>は <ruby><rb>仕事</rb><rt>しごと</rt></ruby>が <ruby><rb>休み</rb><rt>やすみ</rt></ruby> な ので、<ruby><rb>彼女</rb><rt>かのじょ</rt></ruby>と デートに <ruby><rb>行</rb><rt>い</rt></ruby>く つもりです。", rom:"Ashita wa shigoto ga yasumi na node, kanojo to dēto ni iku tsumori desu.", id:"Karena besok libur kerja, saya berencana pergi kencan dengan pacar."}
      ]
    }
  ],
  kotoba: [
    {jp:"※<ruby><rb>早退します</rb><rt>そうたいします</rt></ruby>",furigana:"そうたいします",rom:"sōtai shimasu",id:"pulang lebih awal",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>汗をかきます</rb><rt>あせをかきます</rt></ruby>",furigana:"あせをかきます",rom:"ase o kakimasu",id:"berkeringat",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>電話代</rb><rt>でんわだい</rt></ruby>",furigana:"でんわだい",rom:"denwa dai",id:"biaya telepon",cat:"Kata Benda",lv:"core"},
    {jp:"〜<ruby><rb>代</rb><rt>だい</rt></ruby>",furigana:"〜だい",rom:"~dai",id:"biaya 〜",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>首相</rb><rt>しゅしょう</rt></ruby>",furigana:"しゅしょう",rom:"shushō",id:"Perdana Menteri",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>津波</rb><rt>つなみ</rt></ruby>",furigana:"つなみ",rom:"tsunami",id:"Tsunami",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>雷</rb><rt>かみなり</rt></ruby>",furigana:"かみなり",rom:"kaminari",id:"petir",cat:"Kata Benda",lv:"core"},
    {jp:"バイキング",furigana:"バイキング",rom:"baikingu",id:"Makan sepuasnya (system perasmanan) atau *bersepeda",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>会場</rb><rt>かいじょう</rt></ruby>",furigana:"かいじょう",rom:"kaijō",id:"tempat; lokasi acara",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>汗</rb><rt>あせ</rt></ruby>",furigana:"あせ",rom:"ase",id:"keringat",cat:"Kata Benda",lv:"core"},
    {jp:"タオル",furigana:"タオル",rom:"taoru",id:"handuk",cat:"Kata Benda",lv:"core"},
    {jp:"☆<ruby><rb>空気</rb><rt>くうき</rt></ruby>",furigana:"くうき",rom:"kūki",id:"udara",cat:"Kata Benda",lv:"core"},
    {jp:"☆<ruby><rb>加湿器</rb><rt>かしつき</rt></ruby>",furigana:"かしつき",rom:"kashitsuki",id:"alat pelembab udara",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>石鹸</rb><rt>せっけん</rt></ruby>",furigana:"せっけん",rom:"sekken",id:"sabun",cat:"Kata Benda",lv:"core"},
    {jp:"※ブラシ",furigana:"ブラシ",rom:"burashi",id:"sikat",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>蒸し暑い</rb><rt>むしあつい</rt></ruby>",furigana:"むしあつい",rom:"mushiatsui",id:"lembab",cat:"Kata Sifat",lv:"extra",grp:"i"},
    {jp:"※できれば",furigana:"できれば",rom:"dekireba",id:"jika memungkinkan",cat:"Kata Keterangan",lv:"extra"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 64 — Interogatif か、〜 / か どうか、〜 / KK て みます
// ─────────────────────────────────────────────────
{
  num: 64,
  title: "Interogatif か、〜 / かどうか / てみます",
  sub: "Pertanyaan terbenam & mencoba melakukan",
  color: "bab-64",
  tips: [
    {icon:"💡", title:"Interogatif か vs か どうか — pilih yang tepat", points:[
      "<b>Interogatif + か、〜</b>: digunakan saat pertanyaan mengandung kata tanya (いつ、どこ、なに、だれ、etc.).",
      "Contoh: <ruby><rb>明日</rb><rt>あした</rt></ruby> <ruby><rb>何時</rb><rt>なんじ</rt></ruby>に<ruby><rb>出発</rb><rt>しゅっぱつ</rt></ruby>するか、<ruby><rb>教</rb><rt>おし</rt></ruby>えてください → Tolong beritahu jam berapa berangkat besok.",
      "<b>〜か どうか、〜</b>: digunakan saat pertanyaan TIDAK mengandung kata tanya (ya/tidak).",
      "Contoh: <ruby><rb>間違い</rb><rt>まちがい</rt></ruby>が ない<b>か どうか</b>、もう<ruby><rb>一度</rb><rt>いちど</rt></ruby> よく <ruby><rb>見</rb><rt>み</rt></ruby>て ください → Tolong periksa apakah ada kesalahan atau tidak."
    ]},
    {icon:"🔍", title:"KK て みます — mencoba / coba lakukan", points:[
      "Digunakan untuk menyatakan minat atau keingintahuan seseorang terhadap sesuatu yang belum pernah dicoba sebelumnya.",
      "Contoh: この ズボン、はい<b>て みても</b> いいですか → Boleh saya coba pakai celana ini?",
      "Contoh: わからない ことが あったら インターネットで <ruby><rb>調</rb><rt>しら</rt></ruby>べ<b>て みましょう</b> → Kalau ada yang tidak mengerti, coba cari di internet.",
      "て みたいです = ingin mencoba: いつか <ruby><rb>日本</rb><rt>にほん</rt></ruby>の お<ruby><rb>祭り</rb><rt>まつり</rt></ruby>に <ruby><rb>参加</rb><rt>さんか</rt></ruby>し<b>て みたいです</b>。"
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "interogatif + bentuk biasa か、〜",
      pattern: "interogatif + KK/KS い/KS な/KB [bentuk biasa] か、〜",
      desc: "Digunakan pada saat bertanya dengan menyertakan bentuk interogatif.",
      reibun: [
        {jp:"<ruby><rb>明日</rb><rt>あした</rt></ruby> <ruby><rb>何時</rb><rt>なんじ</rt></ruby>に <ruby><rb>出発</rb><rt>しゅっぱつ</rt></ruby>する か、<ruby><rb>教</rb><rt>おし</rt></ruby>えて ください。", rom:"Ashita nanji ni shuppatsu suru ka, oshiete kudasai.", id:"Tolong beritahu jam berapa kita berangkat besok."},
        {jp:"<ruby><rb>今度</rb><rt>こんど</rt></ruby>の <ruby><rb>会議</rb><rt>かいぎ</rt></ruby>に だれが <ruby><rb>出席</rb><rt>しゅっせき</rt></ruby>する か、<ruby><rb>知</rb><rt>し</rt></ruby>っていますか。", rom:"Kondo no kaigi ni dare ga shusseki suru ka, shitte imasu ka.", id:"Apakah kamu tahu siapa yang menghadiri rapat berikutnya?"},
        {jp:"どこに <ruby><rb>携帯電話</rb><rt>けいたいでんわ</rt></ruby>を <ruby><rb>置</rb><rt>お</rt></ruby>いた か、<ruby><rb>覚</rb><rt>おぼ</rt></ruby>えて いません。", rom:"Doko ni keitai denwa o oita ka, oboete imasen.", id:"Saya tidak ingat di mana meletakkan ponsel."}
      ]
    },
    {
      tag: "B", label: "〜か どうか、〜 : Apakah 〜 atau tidak",
      pattern: "KK/KS い/KS な/KB [bentuk biasa] か どうか、〜",
      desc: "Pola kalimat ini dipakai ketika bertanya dengan tidak menyertakan bentuk interogatif.",
      reibun: [
        {jp:"その <ruby><rb>話</rb><rt>はなし</rt></ruby>が <ruby><rb>本当</rb><rt>ほんとう</rt></ruby> か どうか、<ruby><rb>確</rb><rt>たし</rt></ruby>かめて ください。", rom:"Sono hanashi ga hontō ka dōka, tashikamete kudasai.", id:"Tolong pastikan apakah cerita itu benar atau tidak."},
        {jp:"<ruby><rb>間違い</rb><rt>まちがい</rt></ruby>が ない か どうか、もう<ruby><rb>一度</rb><rt>いちど</rt></ruby> よく <ruby><rb>見</rb><rt>み</rt></ruby>て ください。", rom:"Machigai ga nai ka dōka, mō ichido yoku mite kudasai.", id:"Tolong periksa sekali lagi apakah ada kesalahan atau tidak."},
        {jp:"<ruby><rb>申し込み</rb><rt>もうしこみ</rt></ruby>が <ruby><rb>必要</rb><rt>ひつよう</rt></ruby> か どうか、わかりません。", rom:"Mōshikomi ga hitsuyō ka dōka, wakarimasen.", id:"Saya tidak tahu apakah pendaftaran diperlukan atau tidak."}
      ]
    },
    {
      tag: "C", label: "KK bentuk て みます : akan mencoba melakukan 〜",
      pattern: "KK [bentuk て] + みます",
      desc: "Digunakan untuk menyatakan minat atau keingintahuan seseorang terhadap sesuatu yang belum pernah dicoba sebelumnya.",
      reibun: [
        {jp:"この ズボン、はい<ruby><rb>て</rb><rt></rt></ruby> みても いいですか。", rom:"Kono zubon, haite mitemo ii desu ka.", id:"Boleh saya coba pakai celana ini?"},
        {jp:"わからない ことが あったら インターネットで <ruby><rb>調</rb><rt>しら</rt></ruby>べて みましょう。", rom:"Wakaranai koto ga attara intānetto de shirabete mimashō.", id:"Kalau ada yang tidak mengerti, coba cari di internet."},
        {jp:"いつか <ruby><rb>日本</rb><rt>にほん</rt></ruby>の お<ruby><rb>祭り</rb><rt>まつり</rt></ruby>に <ruby><rb>参加</rb><rt>さんか</rt></ruby>して みたいです。", rom:"Itsuka Nihon no omatsuri ni sanka shite mitai desu.", id:"Suatu saat saya ingin mencoba ikut festival Jepang."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>数えます</rb><rt>かぞえます</rt></ruby>",furigana:"かぞえます",rom:"kazoemasu",id:"menghitung",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>測ります</rb><rt>はかります</rt></ruby>",furigana:"はかります",rom:"hakarimasu",id:"mengukur",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>確かめます</rb><rt>たしかめます</rt></ruby>",furigana:"たしかめます",rom:"tashikamemasu",id:"memastikan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>合います</rb><rt>あいます</rt></ruby>",furigana:"あいます",rom:"aimasu",id:"cocok (ukuran)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>出発します</rb><rt>しゅっぱつします</rt></ruby>",furigana:"しゅっぱつします",rom:"shuppatsu shimasu",id:"berangkat",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>到着します</rb><rt>とうちゃくします</rt></ruby>",furigana:"とうちゃくします",rom:"tōchaku shimasu",id:"tiba",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>酔います</rb><rt>よいます</rt></ruby>",furigana:"よいます",rom:"yoimasu",id:"mabuk",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>危険</rb><rt>きけん</rt></ruby>（な）",furigana:"きけん（な）",rom:"kiken (na)",id:"bahaya",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>必要</rb><rt>ひつよう</rt></ruby>（な）",furigana:"ひつよう（な）",rom:"hitsuyō (na)",id:"butuh",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>申し込み</rb><rt>もうしこみ</rt></ruby>",furigana:"もうしこみ",rom:"mōshikomi",id:"pendaftaran",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>本当</rb><rt>ほんとう</rt></ruby>",furigana:"ほんとう",rom:"hontō",id:"kebenaran",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>間違い</rb><rt>まちがい</rt></ruby>",furigana:"まちがい",rom:"machigai",id:"kesalahan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>傷</rb><rt>きず</rt></ruby>",furigana:"きず",rom:"kizu",id:"luka",cat:"Kata Benda",lv:"core"},
    {jp:"ズボン",furigana:"ズボン",rom:"zubon",id:"celana panjang; celana",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>長さ</rb><rt>ながさ</rt></ruby>",furigana:"ながさ",rom:"nagasa",id:"panjang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>重さ</rb><rt>おもさ</rt></ruby>",furigana:"おもさ",rom:"omosa",id:"bobot",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>高さ</rb><rt>たかさ</rt></ruby>",furigana:"たかさ",rom:"takasa",id:"tinggi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>大きさ</rb><rt>おおきさ</rt></ruby>",furigana:"おおきさ",rom:"ōkisa",id:"ukuran",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>締め切り</rb><rt>しめきり</rt></ruby>",furigana:"しめきり",rom:"shimekiri",id:"deadline; tenggat waktu",cat:"Kata Benda",lv:"core"},
    {jp:"※インターネット",furigana:"インターネット",rom:"intānetto",id:"internet",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>静岡県</rb><rt>しずおかけん</rt></ruby>",furigana:"しずおかけん",rom:"shizuoka ken",id:"Prefektur Shizuoka",cat:"Kata Benda",lv:"extra"},
    {jp:"※スピーチコンテスト",furigana:"スピーチコンテスト",rom:"supīchi kontesuto",id:"kontes pidato",cat:"Kata Benda",lv:"extra"},
    {jp:"※ミーティング",furigana:"ミーティング",rom:"mītingu",id:"rapat",cat:"Kata Benda",lv:"extra"},
    {jp:"ところで",furigana:"ところで",rom:"tokorode",id:"omong-omong",cat:"Konjungsi",lv:"core"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 65 — いただきます / くださいます / やります (memberi/menerima hormat)
// ─────────────────────────────────────────────────
{
  num: 65,
  title: "いただきます・くださいます・やります",
  sub: "KB1 に KB2 を いただきます / くださいます",
  color: "bab-65",
  tips: [
    {icon:"💡", title:"Hierarki memberi & menerima — 3 kata kunci", points:[
      "<b>いただきます (もらいます)</b>: pembicara MENERIMA dari orang berstatus LEBIH TINGGI. いただきます lebih sopan.",
      "<b>くださいます (くれます)</b>: orang berstatus LEBIH TINGGI MEMBERI kepada pembicara. くださいます lebih sopan.",
      "<b>やります</b>: pembicara MEMBERI kepada orang yang berstatus LEBIH RENDAH atau bawahan (hewan, tanaman).",
      "⚠️ Pilih kata yang tepat sesuai arah aliran & status — kesalahan ini sangat noticeable dalam bahasa Jepang!"
    ]},
    {icon:"🔄", title:"Perbedaan いただきます vs くださいます", points:[
      "<b>いただきます</b>: SAYA yang menerima dari orang status lebih tinggi. <ruby><rb>先生</rb><rt>せんせい</rt></ruby><b>に</b> <ruby><rb>本</rb><rt>ほん</rt></ruby>を <b>いただきました</b>。",
      "<b>くださいます</b>: MEREKA (status lebih tinggi) yang memberi kepada saya. <ruby><rb>先生</rb><rt>せんせい</rt></ruby><b>が</b>（わたしに）<ruby><rb>本</rb><rt>ほん</rt></ruby>を <b>くださいました</b>。",
      "Perbedaan partikel: いただきます pakai <b>に</b> untuk pengirim, くださいます pakai <b>が</b> untuk pemberi.",
      "Keduanya bisa dikombinasikan dengan bentuk て: <ruby><rb>先生</rb><rt>せんせい</rt></ruby>に <ruby><rb>教</rb><rt>おし</rt></ruby>えて <b>いただきました</b> / <ruby><rb>先生</rb><rt>せんせい</rt></ruby>が <ruby><rb>教</rb><rt>おし</rt></ruby>えて <b>くださいました</b>。"
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KB1 (orang) に KB2 を いただきます",
      pattern: "KB1 (orang) に KB2 を いただきます",
      desc: "Digunakan ketika pembicara menerima sesuatu (KB2) dari seseorang yang berstatus lebih tinggi (KB1). Penggunaan いただきます lebih sopan daripada もらいます.",
      reibun: [
        {jp:"<ruby><rb>先生</rb><rt>せんせい</rt></ruby>に <ruby><rb>本</rb><rt>ほん</rt></ruby>を <ruby><rb>いただきました</rb><rt>いただきました</rt></ruby>。", rom:"Sensei ni hon o itadakimashita.", id:"Saya menerima buku dari guru."},
        {jp:"さっき お<ruby><rb>客</rb><rt>きゃく</rt></ruby>さんに <ruby><rb>いただいた</rb><rt>いただいた</rt></ruby> ケーキを <ruby><rb>食</rb><rt>た</rt></ruby>べましょう。", rom:"Sakki okyaku-san ni itadaita kēki o tabemashō.", id:"Mari makan kue yang tadi diterima dari tamu."},
        {jp:"<ruby><rb>木村</rb><rt>きむら</rt></ruby>さんから お<ruby><rb>礼</rb><rt>れい</rt></ruby>の <ruby><rb>手紙</rb><rt>てがみ</rt></ruby>を <ruby><rb>いただきました</rb><rt>いただきました</rt></ruby>。", rom:"Kimura-san kara orei no tegami o itadakimashita.", id:"Saya menerima surat ucapan terima kasih dari Kimura-san."}
      ]
    },
    {
      tag: "B", label: "（わたしに）KB を くださいます",
      pattern: "（わたしに）KB を くださいます",
      desc: "Digunakan ketika seseorang dengan status yang lebih tinggi memberikan sesuatu kepada pembicara. Penggunaan くださいます lebih sopan daripada くれます.",
      reibun: [
        {jp:"<ruby><rb>社長</rb><rt>しゃちょう</rt></ruby>が （わたしに） お<ruby><rb>土産</rb><rt>みやげ</rt></ruby>を <ruby><rb>くださいました</rb><rt>くださいました</rt></ruby>。", rom:"Shachō ga (watashi ni) omiyage o kudasaimashita.", id:"Direktur memberi saya oleh-oleh."},
        {jp:"<ruby><rb>先生</rb><rt>せんせい</rt></ruby>が （わたしに） <ruby><rb>絵はがき</rb><rt>えはがき</rt></ruby>を <ruby><rb>くださいました</rb><rt>くださいました</rt></ruby>。", rom:"Sensei ga (watashi ni) ehagaki o kudasaimashita.", id:"Guru memberi saya kartu pos bergambar."},
        {jp:"<ruby><rb>友達</rb><rt>ともだち</rt></ruby>の お<ruby><rb>父</rb><rt>とう</rt></ruby>さんが （わたしに） お<ruby><rb>年玉</rb><rt>としだま</rt></ruby>を <ruby><rb>くださいました</rb><rt>くださいました</rt></ruby>。", rom:"Tomodachi no otōsan ga (watashi ni) otoshidama o kudasaimashita.", id:"Ayah teman saya memberi saya uang tahun baru."}
      ]
    }
  ],
  kotoba: [
    {jp:"いただきます",furigana:"いただきます",rom:"itadakimasu",id:"menerima (bentuk hormat dari もらいます)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"くださいます",furigana:"くださいます",rom:"kudasaimasu",id:"memberi (bentuk hormat dari くれます)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"やります",furigana:"やります",rom:"yarimasu",id:"memberi (kepada orang yang lebih muda atau bawahan)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"お<ruby><rb>年玉</rb><rt>としだま</rt></ruby>",furigana:"おとしだま",rom:"otoshidama",id:"uang yang diberikan sebagai hadiah Tahun Baru",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>猿</rb><rt>さる</rt></ruby>",furigana:"さる",rom:"saru",id:"monyet; kera",cat:"Kata Benda",lv:"extra"},
    {jp:"えさ",furigana:"えさ",rom:"esa",id:"makanan hewan; umpan",cat:"Kata Benda",lv:"core"},
    {jp:"おもちゃ",furigana:"おもちゃ",rom:"omocha",id:"mainan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>絵本</rb><rt>えほん</rt></ruby>",furigana:"えほん",rom:"ehon",id:"buku bergambar",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>絵はがき</rb><rt>えはがき</rt></ruby>",furigana:"えはがき",rom:"ehagaki",id:"kartu pos gambar",cat:"Kata Benda",lv:"core"},
    {jp:"ハンカチ",furigana:"ハンカチ",rom:"hankachi",id:"saputangan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>靴下</rb><rt>くつした</rt></ruby>",furigana:"くつした",rom:"kutsushita",id:"kaus kaki",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>手袋</rb><rt>てぶろ</rt></ruby>",furigana:"てぶくろ",rom:"tebukuro",id:"sarung tangan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>指輪</rb><rt>ゆびわ</rt></ruby>",furigana:"ゆびわ",rom:"yubiwa",id:"cincin",cat:"Kata Benda",lv:"core"},
    {jp:"バッグ",furigana:"バッグ",rom:"baggu",id:"tas",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>孫</rb><rt>まご</rt></ruby>",furigana:"まご",rom:"mago",id:"cucu (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>孫</rb><rt>まご</rt></ruby>さん",furigana:"おまごさん",rom:"omagosan",id:"cucu (orang lain)",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>会社の先輩</rb><rt>かいしゃのせんぱい</rt></ruby>",furigana:"かいしゃのせんぱい",rom:"kaisha no senpai",id:"rekan kerja senior",cat:"Kata Benda",lv:"extra"},
    {jp:"※ホストファミリー",furigana:"ホストファミリー",rom:"hosuto famirī",id:"host family; keluarga angkat",cat:"Kata Benda",lv:"extra"},
    {jp:"※クラスメイト",furigana:"クラスメイト",rom:"kurasu meito",id:"teman sekelas",cat:"Kata Benda",lv:"extra"},
    {jp:"※お<ruby><rb>礼の手紙</rb><rt>れいのてがみ</rt></ruby>",furigana:"おれいのてがみ",rom:"orei no tegami",id:"surat ucapan terima kasih",cat:"Kata Benda",lv:"extra"},
    {jp:"※お<ruby><rb>礼のメール</rb><rt>れいのメール</rt></ruby>",furigana:"おれいのメール",rom:"orei no mēru",id:"e-mail ucapan terima kasih",cat:"Kata Benda",lv:"extra"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 66 — KK て いただきます / くださいます (tindakan dari orang lain)
// ─────────────────────────────────────────────────
{
  num: 66,
  title: "KK て いただきます／くださいます",
  sub: "Menerima/diberikan tindakan dari orang berstatus lebih tinggi",
  color: "bab-66",
  tips: [
    {icon:"💡", title:"KK て いただきます — menerima tindakan dari atasan", points:[
      "Pola: <b>KK て + いただきます</b> = pembicara menerima manfaat dari tindakan orang berstatus lebih tinggi.",
      "Contoh: きのう ぶちょうに ばんごはんを ごちそうし<b>て いただきました</b> → Kemarin saya ditraktir makan malam oleh kepala bagian.",
      "Lebih sopan dari KK て もらいました.",
      "⚠️ Bedakan: <b>いただきます</b> (tindakan) vs <b>いただきます</b> (menerima benda di Bab 65)."
    ]},
    {icon:"🙏", title:"〜て くださいませんか — permintaan sangat sopan", points:[
      "Pola: <b>KK て + くださいませんか</b> = meminta dengan sangat sopan.",
      "Lebih sopan dari 〜て ください.",
      "Contoh: よく きこえないので、おおきい こえで はなし<b>て くださいませんか</b> → Karena tidak terdengar, bisakah berbicara dengan suara keras?",
      "Urutan kesopanan: 〜てください < 〜ていただけませんか ≈ 〜てくださいませんか"
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK bentuk て いただきます／（わたしに）KK bentuk て くださいます",
      pattern: "KK [て-form] + いただきます / KK [て-form] + くださいます",
      desc: "いただきます dan くださいます juga digunakan untuk menunjukkan bahwa seseorang dengan status yang lebih tinggi melakukan sesuatu untuk pembicara.",
      reibun: [
        {jp:"きのう <ruby><rb>部長</rb><rt>ぶちょう</rt></ruby>に <ruby><rb>晩ごはん</rb><rt>ばんごはん</rt></ruby>を ごちそうし<ruby><rb>て</rb><rt></rt></ruby> <ruby><rb>いただきました</rb><rt>いただきました</rt></ruby>。", rom:"Kinō buchō ni bangohan o gochisō shite itadakimashita.", id:"Kemarin saya ditraktir makan malam oleh kepala bagian."},
        {jp:"<ruby><rb>部長</rb><rt>ぶちょう</rt></ruby>の <ruby><rb>奥さん</rb><rt>おくさん</rt></ruby>が （わたしに）<ruby><rb>茶道</rb><rt>さどう</rt></ruby>を <ruby><rb>教</rb><rt>おし</rt></ruby>えて <ruby><rb>くださいました</rb><rt>くださいました</rt></ruby>。", rom:"Buchō no okusan ga (watashi ni) sadō o oshiete kudasaimashita.", id:"Istri kepala bagian mengajari saya upacara minum teh."},
        {jp:"よく <ruby><rb>聞</rb><rt>き</rt></ruby>こえないので、<ruby><rb>大</rb><rt>おお</rt></ruby>きい <ruby><rb>声</rb><rt>こえ</rt></ruby>で <ruby><rb>話</rb><rt>はな</rt></ruby>して くださいませんか。", rom:"Yoku kikoenai node, ōkii koe de hanashite kudasaimasen ka.", id:"Karena tidak terdengar jelas, bisakah Anda berbicara dengan suara lebih keras?"}
      ],
      note: {type:"blue", text:"<b>※〜て くださいませんか</b>: Cara meminta permintaan yang lebih sopan daripada 〜て ください"}
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>下げます</rb><rt>さげます</rt></ruby>",furigana:"さげます",rom:"sagemasu",id:"lebih rendah; menurunkan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（コーヒーを）<ruby><rb>入れます</rb><rt>いれます</rt></ruby>",furigana:"（コーヒーを）いれます",rom:"(kōhī o) iremasu",id:"membuat (kopi)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>呼びます</rb><rt>よびます</rt></ruby>",furigana:"よびます",rom:"yobimasu",id:"memanggil (nama seseorang); mengundang",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>取り換えます</rb><rt>とりかえます</rt></ruby>",furigana:"とりかえます",rom:"torikaemasu",id:"menukarkan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>親切にします</rb><rt>しんせつにします</rt></ruby>",furigana:"しんせつにします",rom:"shinsetsu ni shimasu",id:"memperlakukan dengan baik hati",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"※ごちそうします",furigana:"ごちそうします",rom:"gochisō shimasu",id:"mentraktir",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"※<ruby><rb>濡れます</rb><rt>ぬれます</rt></ruby>",furigana:"ぬれます",rom:"nuremasu",id:"menjadi basah",cat:"Kata Kerja",lv:"extra",grp:"II"},
    {jp:"※<ruby><rb>理解します</rb><rt>りかいします</rt></ruby>",furigana:"りかいします",rom:"rikai shimasu",id:"memahami",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"かわいい",furigana:"かわいい",rom:"kawaii",id:"imut",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"※<ruby><rb>文化</rb><rt>ぶんか</rt></ruby>",furigana:"ぶんか",rom:"bunka",id:"budaya",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>近所</rb><rt>きんじょ</rt></ruby>",furigana:"きんじょ",rom:"kinjo",id:"lingkungan tetangga",cat:"Kata Benda",lv:"extra"},
    {jp:"お<ruby><rb>祝い</rb><rt>いわい</rt></ruby>",furigana:"おいわい",rom:"oiwai",id:"perayaan",cat:"Kata Benda",lv:"core"},
    {jp:"（お）<ruby><rb>見舞い</rb><rt>みまい</rt></ruby>",furigana:"（お）みまい",rom:"(o)mimai",id:"menjenguk orang sakit",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>興味</rb><rt>きょうみ</rt></ruby>",furigana:"きょうみ",rom:"kyōmi",id:"minat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>情報</rb><rt>じょうほう</rt></ruby>",furigana:"じょうほう",rom:"jōhō",id:"informasi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>文法</rb><rt>ぶんぽう</rt></ruby>",furigana:"ぶんぽう",rom:"bunpō",id:"tata bahasa",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>発音</rb><rt>はつおん</rt></ruby>",furigana:"はつおん",rom:"hatsuon",id:"pengucapan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>温度</rb><rt>おんど</rt></ruby>",furigana:"おんど",rom:"ondo",id:"suhu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>祖父</rb><rt>そふ</rt></ruby>",furigana:"そふ",rom:"sofu",id:"kakek (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>祖母</rb><rt>そぼ</rt></ruby>",furigana:"そぼ",rom:"sobo",id:"nenek (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>伯父</rb><rt>おじ</rt></ruby>",furigana:"おじ",rom:"oji",id:"paman (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>伯母</rb><rt>おば</rt></ruby>",furigana:"おば",rom:"oba",id:"bibi (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>伯父</rb><rt>おじ</rt></ruby>さん",furigana:"おじさん",rom:"ojisan",id:"paman (orang lain)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>伯母</rb><rt>おば</rt></ruby>さん",furigana:"おばさん",rom:"obasan",id:"bibi (orang lain)",cat:"Kata Benda",lv:"core"},
    {jp:"☆ガス",furigana:"ガス",rom:"gasu",id:"gas",cat:"Kata Benda",lv:"extra"},
    {jp:"☆ガス<ruby><rb>会社</rb><rt>がいしゃ</rt></ruby>",furigana:"ガスがいしゃ",rom:"gasu gaisha",id:"perusahaan gas",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>茶道</rb><rt>さどう</rt></ruby>",furigana:"さどう",rom:"sadō",id:"upacara minum teh",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>東京ドーム</rb><rt>とうきょうドーム</rt></ruby>",furigana:"とうきょうドーム",rom:"tōkyō dōmu",id:"Tokyo Dome",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>管理人</rb><rt>かんりにん</rt></ruby>",furigana:"かんりにん",rom:"kanrinin",id:"administator",cat:"Kata Benda",lv:"extra"},
    {jp:"※〜に<ruby><rb>感謝します</rb><rt>かんしゃします</rt></ruby>",furigana:"〜にかんしゃします",rom:"~ni kansha shimasu",id:"bersyukur untuk 〜",cat:"Ekspresi",lv:"extra"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 67 — KK [kamus] ために、〜 / KB の ために、〜
// ─────────────────────────────────────────────────
{
  num: 67,
  title: "〜ために (untuk/demi)",
  sub: "KK-kamus／KB の ために、〜 : untuk ~",
  color: "bab-67",
  tips: [
    {icon:"💡", title:"ために — menunjukkan tujuan", points:[
      "Pola: <b>KK bentuk kamus + ために</b> = untuk melakukan ~. Menyatakan tujuan.",
      "Contoh: <ruby><rb>日本</rb><rt>にほん</rt></ruby>の<ruby><rb>社会</rb><rt>しゃかい</rt></ruby>についての <ruby><rb>論文</rb><rt>ろんぶん</rt></ruby>を かく<b>ために</b>、<ruby><rb>図書館</rb><rt>としょかん</rt></ruby>で <ruby><rb>本</rb><rt>ほん</rt></ruby>を かりました → Untuk menulis tesis tentang masyarakat Jepang, saya meminjam buku di perpustakaan.",
      "<b>KB の ために</b> = untuk kepentingan ~. Contoh: <ruby><rb>健康</rb><rt>けんこう</rt></ruby>の<b>ために</b> <ruby><rb>毎日</rb><rt>まいにち</rt></ruby> <ruby><rb>運動</rb><rt>うんどう</rt></ruby>して います → Demi kesehatan, saya berolahraga setiap hari.",
      "⚠️ Bedakan: <b>ために</b> (tujuan sadar) vs <b>ように</b> (tujuan/upaya agar ~ terjadi/tidak terjadi)."
    ]},
    {icon:"⚠️", title:"ために vs ように — perbedaan kunci", points:[
      "<b>ために</b>: diikuti tindakan sadar/kehendak. Subjek klausa ために = subjek kalimat utama.",
      "<b>ように</b>: diikuti keadaan/perubahan, atau tindakan agar sesuatu terjadi. Sering untuk tujuan negatif (〜ないように).",
      "ために: やせる<b>ために</b>、<ruby><rb>毎日</rb><rt>まいにち</rt></ruby><ruby><rb>運動</rb><rt>うんどう</rt></ruby>します → Untuk menurunkan berat badan, olahraga tiap hari.",
      "ように: やせる<b>ように</b>、<ruby><rb>甘</rb><rt>あま</rt></ruby>いものを<ruby><rb>食</rb><rt>た</rt></ruby>べないようにして います → Agar bisa langsing, berusaha tidak makan yang manis."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK bentuk kamus／KB の ために、〜 : untuk KK/KB",
      pattern: "KK [bentuk kamus] / KB の + ために、〜",
      desc: "ために menunjukkan tujuan. KB の ために juga dapat digunakan dalam arti 'untuk kepentingan KB'.",
      reibun: [
        {jp:"<ruby><rb>日本</rb><rt>にほん</rt></ruby>の <ruby><rb>社会</rb><rt>しゃかい</rt></ruby>に ついての <ruby><rb>論文</rb><rt>ろんぶん</rt></ruby>を <ruby><rb>書</rb><rt>か</rt></ruby>く ために <ruby><rb>図書館</rb><rt>としょかん</rt></ruby>で <ruby><rb>本</rb><rt>ほん</rt></ruby>を <ruby><rb>借</rb><rt>か</rt></ruby>りました。", rom:"Nihon no shakai ni tsuite no ronbun o kaku tame ni, toshokan de hon o karimashita.", id:"Untuk menulis tesis tentang masyarakat Jepang, saya meminjam buku di perpustakaan."},
        {jp:"やせる ために できるだけ <ruby><rb>甘</rb><rt>あま</rt></ruby>いものを <ruby><rb>食</rb><rt>た</rt></ruby>べないように して います。", rom:"Yaseru tame ni, dekirudake amai mono o tabenai yō ni shite imasu.", id:"Untuk menurunkan berat badan, saya berusaha tidak makan yang manis sebisa mungkin."},
        {jp:"<ruby><rb>健康</rb><rt>けんこう</rt></ruby>の ために <ruby><rb>毎日</rb><rt>まいにち</rt></ruby> <ruby><rb>運動</rb><rt>うんどう</rt></ruby>して います。", rom:"Kenkō no tame ni, mainichi undō shite imasu.", id:"Demi kesehatan, saya berolahraga setiap hari."}
      ]
    }
  ],
  kotoba: [
    {jp:"※お<ruby><rb>祝いします</rb><rt>いわいします</rt></ruby>",furigana:"おいわいします",rom:"oiwai shimasu",id:"merayakan",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"※ストレスを<ruby><rb>解消します</rb><rt>かいしょうします</rt></ruby>",furigana:"ストレスをかいしょうします",rom:"sutoresu o kaishō shimasu",id:"menghilangkan stres",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"<ruby><rb>喜びます</rb><rt>よろこびます</rt></ruby>",furigana:"よろこびます",rom:"yorokobimasu",id:"bahagia; senang",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>安全</rb><rt>あんぜん</rt></ruby>",furigana:"あんぜん",rom:"anzen",id:"keamanan; keselamatan",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>介護施設</rb><rt>かいごしせつ</rt></ruby>",furigana:"かいごしせつ",rom:"kaigo shisetsu",id:"panti jompo",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>弁護士</rb><rt>べんごし</rt></ruby>",furigana:"べんごし",rom:"bengoshi",id:"pengacara",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>子供たち</rb><rt>こどもたち</rt></ruby>",furigana:"こどもたち",rom:"kodomotachi",id:"anak-anak",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>二人</rb><rt>ふたり</rt></ruby>",furigana:"ふたり",rom:"futari",id:"dua orang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>教育</rb><rt>きょういく</rt></ruby>",furigana:"きょういく",rom:"kyōiku",id:"pendidikan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>歴史</rb><rt>れきし</rt></ruby>",furigana:"れきし",rom:"rekishi",id:"sejarah",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>文化</rb><rt>ぶんか</rt></ruby>",furigana:"ぶんか",rom:"bunka",id:"budaya",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>社会</rb><rt>しゃかい</rt></ruby>",furigana:"しゃかい",rom:"shakai",id:"masyarakat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>法律</rb><rt>ほうりつ</rt></ruby>",furigana:"ほうりつ",rom:"hōritsu",id:"hukum",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>戦争</rb><rt>せんそう</rt></ruby>",furigana:"せんそう",rom:"sensō",id:"perang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>平和</rb><rt>へいわ</rt></ruby>",furigana:"へいわ",rom:"heiwa",id:"perdamaian",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>目的</rb><rt>もくてき</rt></ruby>",furigana:"もくてき",rom:"mokuteki",id:"tujuan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>論文</rb><rt>ろんぶん</rt></ruby>",furigana:"ろんぶん",rom:"ronbun",id:"skripsi; tesis",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>関係</rb><rt>かんけい</rt></ruby>",furigana:"かんけい",rom:"kankei",id:"hubungan; koneksi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>一生懸命</rb><rt>いっしょうけんめい</rt></ruby>",furigana:"いっしょうけんめい",rom:"isshōkenmei",id:"bekerja keras",cat:"Kata Keterangan",lv:"core"},
    {jp:"※<ruby><rb>国際関係</rb><rt>こくさいかんけい</rt></ruby>",furigana:"こくさいかんけい",rom:"kokusai kankei",id:"hubungan internasional",cat:"Kata Benda",lv:"extra"},
    {jp:"※NGO",furigana:"エヌ・ジー・オー",rom:"NGO",id:"Non-Governmental Organization (Lembaga Swadaya Masyarakat)",cat:"Kata Benda",lv:"extra"},
    {jp:"※〜とか",furigana:"〜とか",rom:"~toka",id:"〜 dan 〜",cat:"Konjungsi",lv:"extra"},
    {jp:"なぜ",furigana:"なぜ",rom:"naze",id:"mengapa",cat:"Kata Tanya",lv:"core"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 68 — KK/KB の に (fungsi/tujuan) & KS そうです (kelihatannya)
// ─────────────────────────────────────────────────
{
  num: 68,
  title: "〜のに (untuk) & 〜そうです (kelihatannya)",
  sub: "KK/KB の に + fungsi / KS そうです",
  color: "bab-68",
  tips: [
    {icon:"💡", title:"〜のに — menunjukkan fungsi/tujuan penggunaan", points:[
      "Pola: <b>KK kamus/KB + のに</b> = digunakan bersama frasa seperti つかいます, いいです, べんりです, やくにたちます untuk menunjukkan fungsi atau tujuan.",
      "Contoh: この <ruby><rb>道具</rb><rt>どうぐ</rt></ruby>は たまごを きる<b>のに</b> つかいます → Alat ini digunakan untuk memotong telur.",
      "Contoh: このかばんは おおきくて、<ruby><rb>旅行</rb><rt>りょこう</rt></ruby><b>に</b> いいです → Tas ini besar, bagus untuk bepergian (KB langsung + に).",
      "⚠️ のに di sini BUKAN 'meskipun/padahal' — itu fungsi berbeda (Bab kontras)."
    ]},
    {icon:"🔍", title:"〜そうです — kelihatannya / tampaknya", points:[
      "Pola: <b>KS い (buang い) + そうです</b> / <b>KS な (buang な) + そうです</b>.",
      "Digunakan saat mengungkapkan kesan berdasarkan penglihatan, meski tidak yakin 100%.",
      "KS い: おいしい → おいし<b>そうです</b>。KS な: しずか → しずか<b>そうです</b>。",
      "⚠️ Pengecualian: <b>いい</b> → <b>よさそう</b> (bukan いそう). <b>ない</b> → <b>なさそう</b>.",
      "Negatif: むずかしくなさそう / おいしくなさそう. Sebelum KB: そうな + KB."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK bentuk kamus の / KB に",
      pattern: "KK [bentuk kamus] + の / KB + に (+ つかいます/いいです/べんりです dll.)",
      desc: "Pola kalimat ini digunakan bersama dengan frasa seperti つかいます, いいです, べんりです, dan やくに たちます untuk menunjukkan fungsi atau tujuannya.",
      reibun: [
        {jp:"この <ruby><rb>道具</rb><rt>どうぐ</rt></ruby>は たまごを <ruby><rb>切</rb><rt>き</rt></ruby>る のに <ruby><rb>使</rb><rt>つか</rt></ruby>います。", rom:"Kono dōgu wa tamago o kiru no ni tsukaimasu.", id:"Alat ini digunakan untuk memotong telur."},
        {jp:"この かばんは <ruby><rb>大</rb><rt>おお</rt></ruby>きくて、<ruby><rb>旅行</rb><rt>りょこう</rt></ruby>に いいです。", rom:"Kono kaban wa ōkikute, ryokō ni ii desu.", id:"Tas ini besar dan bagus untuk bepergian."},
        {jp:"LINEは <ruby><rb>友</rb><rt>とも</rt></ruby>だちに <ruby><rb>連絡</rb><rt>れんらく</rt></ruby>する のに <ruby><rb>便利</rb><rt>べんり</rt></ruby>です。", rom:"LINE wa tomodachi ni renraku suru no ni benri desu.", id:"LINE sangat berguna untuk menghubungi teman."}
      ]
    },
    {
      tag: "B", label: "KS い（〜い）/ KS な（〜な） そうです : kelihatannya 〜",
      pattern: "KS い [buang い] + そうです / KS な [buang な] + そうです",
      desc: "Digunakan ketika mengungkapkan kesan seseorang terhadap sesuatu, meskipun tidak pasti apakah sepenuhnya benar. Bentuk positif dari いい (baik) adalah よさそう, sedangkan bentuk negatifnya adalah 〜なさそう.",
      note: {type:"amber", text:"<b>⚠️ Pengecualian:</b><br>• <b>いい</b> → <b>よさそう</b> (bukan いそう!)<br>• <b>ない</b> → <b>なさそう</b><br>• Negatif: おいしくなさそう / しずかじゃなさそう<br>• Sebelum KB: そうな + KB (そうな ひと = orang yang kelihatannya ~)"},
      reibun: [
        {jp:"その ラーメン、おいし<ruby><rb>そうです</rb><rt>そうです</rt></ruby>ね。", rom:"Sono rāmen, oishisō desu ne.", id:"Ramen itu kelihatannya enak ya."},
        {jp:"<ruby><rb>中村</rb><rt>なかむら</rt></ruby>さんは いつも つまらなそうな <ruby><rb>本</rb><rt>ほん</rt></ruby>を <ruby><rb>読</rb><rt>よ</rt></ruby>んで います。", rom:"Nakamura-san wa itsumo tsumaranasō na hon o yonde imasu.", id:"Nakamura selalu membaca buku yang kelihatannya membosankan."},
        {jp:"<ruby><rb>先生</rb><rt>せんせい</rt></ruby>の <ruby><rb>仕事</rb><rt>しごと</rt></ruby>は <ruby><rb>大変</rb><rt>たいへん</rt></ruby><ruby><rb>そうです</rb><rt>そうです</rt></ruby>。", rom:"Sensei no shigoto wa taihen sō desu.", id:"Pekerjaan guru kelihatannya berat."}
      ]
    }
  ],
  kotoba: [
    {jp:"※<ruby><rb>乾かします</rb><rt>かわかします</rt></ruby>",furigana:"かわかします",rom:"kawakashimasu",id:"mengeringkan",cat:"Kata Kerja",lv:"extra",grp:"I"},
    {jp:"<ruby><rb>包みます</rb><rt>つつみます</rt></ruby>",furigana:"つつみます",rom:"tsutsumimasu",id:"membungkus",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>沸かします</rb><rt>わかします</rt></ruby>",furigana:"わかします",rom:"wakashimasu",id:"mendidihkan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>混ぜます</rb><rt>まぜます</rt></ruby>",furigana:"まぜます",rom:"mazemasu",id:"mencampur",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>厚い</rb><rt>あつい</rt></ruby>",furigana:"あつい",rom:"atsui",id:"tebal",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>薄い</rb><rt>うすい</rt></ruby>",furigana:"うすい",rom:"usui",id:"tipis",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>丈夫</rb><rt>じょうぶ</rt></ruby>（な）",furigana:"じょうぶ（な）",rom:"jōbu (na)",id:"kuat; sehat; tahan lama",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>変</rb><rt>へん</rt></ruby>（な）",furigana:"へん（な）",rom:"hen (na)",id:"aneh; tidak biasa",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>幸せ</rb><rt>しあわせ</rt></ruby>（な）",furigana:"しあわせ（な）",rom:"shiawase (na)",id:"senang",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>旨い</rb><rt>うまい</rt></ruby>・<ruby><rb>上手い</rb><rt>うまい</rt></ruby>",furigana:"うまい・うまい",rom:"umai",id:"lezat; mahir dalam",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>不味い</rb><rt>まずい</rt></ruby>",furigana:"まずい",rom:"mazui",id:"tidak enak (rasa)",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"つまらない",furigana:"つまらない",rom:"tsumaranai",id:"membosankan",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"※<ruby><rb>乾燥機</rb><rt>かんそうき</rt></ruby>",furigana:"かんそうき",rom:"kansōki",id:"pengering",cat:"Kata Benda",lv:"extra"},
    {jp:"センス",furigana:"センス",rom:"sensu",id:"kepekaan",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>体温計</rb><rt>たいおんけい</rt></ruby>",furigana:"たいおんけい",rom:"taionkei",id:"termometer medis",cat:"Kata Benda",lv:"extra"},
    {jp:"☆<ruby><rb>血圧計</rb><rt>けつあつけい</rt></ruby>",furigana:"けつあつけい",rom:"ketsuatsukei",id:"alat pengukur tekanan darah",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>風呂敷</rb><rt>ふろしき</rt></ruby>",furigana:"ふろしき",rom:"furoshiki",id:"kain pembungkus ala Jepang",cat:"Kata Benda",lv:"extra"},
    {jp:"※ファイル",furigana:"ファイル",rom:"fairu",id:"file; berkas",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>意外と</rb><rt>いがいと</rt></ruby>",furigana:"いがいと",rom:"igai to",id:"tak terduga",cat:"Kata Keterangan",lv:"extra"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 69 — 〜すぎます / KK-ます やすい・にくい / KB に します
// ─────────────────────────────────────────────────
{
  num: 69,
  title: "〜すぎます / 〜やすい・にくい / KB に します",
  sub: "Terlalu ~ / Mudah・Sulit dilakukan / Memutuskan ~",
  color: "bab-69",
  tips: [
    {icon:"💡", title:"〜すぎます — terlalu berlebihan", points:[
      "Pola: <b>KK stem-ます + すぎます</b> / <b>KS い (buang い) + すぎます</b> / <b>KS な (buang な) + すぎます</b>.",
      "Menyatakan tindakan atau keadaan yang berlebihan — biasanya tidak diinginkan.",
      "KK: たべ<b>すぎます</b> (makan terlalu banyak). KS い: たか<b>すぎます</b> (terlalu mahal). KS な: しずか<b>すぎます</b> (terlalu sepi).",
      "⚠️ すぎます terkonjugasi layaknya kata kerja: すぎ<b>て</b>、すぎ<b>ない</b>、すぎ<b>た</b>、など."
    ]},
    {icon:"🔑", title:"〜やすい vs 〜にくい — mudah vs sulit", points:[
      "Pola: <b>KK stem-ます + やすいです</b> = mudah/gampang dilakukan.",
      "Pola: <b>KK stem-ます + にくいです</b> = sulit/tidak mudah dilakukan.",
      "Contoh: この ペンは かき<b>やすいです</b> → Pena ini mudah ditulis.",
      "Contoh: この にく は かたくて たべ<b>にくいです</b> → Daging ini keras dan sulit dimakan.",
      "⚠️ やすい/にくい adalah kata sifat い → berkonjugasi seperti KS い."
    ]},
    {icon:"🎯", title:"KB に します — memilih/memutuskan", points:[
      "Pola: <b>KB + に + します</b> = memilih atau memutuskan ~.",
      "Digunakan saat memilih dari beberapa pilihan atau memutuskan sesuatu.",
      "Contoh: A: <ruby><rb>昼ごはん</rb><rt>ひるごはん</rt></ruby>は なに に しますか → Mau pilih apa untuk makan siang? B: てんぷら<ruby><rb>定食</rb><rt>ていしょく</rt></ruby>に します → Saya pilih set tempura.",
      "Berbeda dari 〜に なります (berubah/menjadi ~ sendirinya) — します = kehendak sendiri."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK bentuk ます／KS い（〜い）／KS な（〜な） すぎます : terlalu banyak 〜",
      pattern: "KK [stem-ます] / KS い [buang い] / KS な [buang な] + すぎます",
      desc: "〜すぎます menunjukkan tindakan atau keadaan yang berlebihan, sehingga biasa digunakan terhadap tindakan atau keadaan yang tidak diinginkan.",
      reibun: [
        {jp:"おいしかったので、<ruby><rb>食</rb><rt>た</rt></ruby>べ<ruby><rb>すぎて</rb><rt>すぎて</rt></ruby> しまいました。", rom:"Oishikatta node, tabesugite shimaimashita.", id:"Karena enak, saya makan terlalu banyak."},
        {jp:"この ゲームは <ruby><rb>簡単</rb><rt>かんたん</rt></ruby>すぎて、おもしろくないです。", rom:"Kono gēmu wa kantansugite, omoshirokunai desu.", id:"Game ini terlalu mudah dan tidak menarik."},
        {jp:"<ruby><rb>笑</rb><rt>わら</rt></ruby>いすぎて、<ruby><rb>涙</rb><rt>なみだ</rt></ruby>が <ruby><rb>出</rb><rt>で</rt></ruby>ました。", rom:"Waraisugite, namida ga demashita.", id:"Saya tertawa terlalu banyak sampai keluar air mata."}
      ]
    },
    {
      tag: "B", label: "KK bentuk ます やすいです／にくいです",
      pattern: "KK [stem-ます] + やすいです / にくいです",
      desc: "KK bentuk ます やすいです digunakan untuk menerangkan sesuatu yang mudah dilakukan atau sesuatu yang mudah terjadi. Di samping itu, KK bentuk ます にくいです menunjukkan bahwa sesuatu sulit dilakukan atau sesuatu yang tidak mungkin terjadi.",
      reibun: [
        {jp:"この くつは <ruby><rb>軽</rb><rt>かる</rt></ruby>くて <ruby><rb>歩</rb><rt>ある</rt></ruby>き<ruby><rb>やすいです</rb><rt>やすいです</rt></ruby>。", rom:"Kono kutsu wa karukute arukiyasui desu.", id:"Sepatu ini ringan dan nyaman untuk berjalan."},
        {jp:"<ruby><rb>雪</rb><rt>ゆき</rt></ruby>で <ruby><rb>道</rb><rt>みち</rt></ruby>が <ruby><rb>滑</rb><rt>すべ</rt></ruby>りやすく なって いますから、<ruby><rb>気</rb><rt>き</rt></ruby>を つけて ください。", rom:"Yuki de michi ga suberiyasuku natte imasu kara, ki o tsukete kudasai.", id:"Karena salju, jalan menjadi licin, harap berhati-hati."},
        {jp:"この <ruby><rb>肉</rb><rt>にく</rt></ruby>は かたくて <ruby><rb>食</rb><rt>た</rt></ruby>べ<ruby><rb>にくいです</rb><rt>にくいです</rt></ruby>。", rom:"Kono niku wa katakute tabenikui desu.", id:"Daging ini keras dan sulit dimakan."}
      ]
    },
    {
      tag: "C", label: "Kata Benda に + します",
      pattern: "KB に + します",
      desc: "Pola kalimat ini digunakan pada saat memilih atau memutuskan sesuatu.",
      reibun: [
        {jp:"A: <ruby><rb>昼ごはん</rb><rt>ひるごはん</rt></ruby>は <ruby><rb>何</rb><rt>なに</rt></ruby>に しますか。B: てんぷら<ruby><rb>定食</rb><rt>ていしょく</rt></ruby>に します。", rom:"A: Hirugohan wa nani ni shimasu ka. B: Tenpura teishoku ni shimasu.", id:"A: Mau pesan apa untuk makan siang? B: Saya pilih set tempura."},
        {jp:"<ruby><rb>東京</rb><rt>とうきょう</rt></ruby>から <ruby><rb>広島</rb><rt>ひろしま</rt></ruby>へ <ruby><rb>行</rb><rt>い</rt></ruby>くとき、<ruby><rb>飛行機</rb><rt>ひこうき</rt></ruby>と <ruby><rb>新幹線</rb><rt>しんかんせん</rt></ruby>と どちらに しますか。", rom:"Tōkyō kara Hiroshima e iku toki, hikōki to shinkansen to dochira ni shimasu ka.", id:"Saat pergi dari Tokyo ke Hiroshima, pilih pesawat atau Shinkansen?"}
      ]
    }
  ],
  kotoba: [
    {jp:"（えんぴつを）<ruby><rb>削ります</rb><rt>けずります</rt></ruby>",furigana:"（えんぴつを）けずります",rom:"(enpitsu o) kezurimasu",id:"meraut (pensil)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>泣きます</rb><rt>なきます</rt></ruby>",furigana:"なきます",rom:"nakimasu",id:"menangis",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>笑います</rb><rt>わらいます</rt></ruby>",furigana:"わらいます",rom:"waraimasu",id:"tertawa; senyum",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>眠ります</rb><rt>ねむります</rt></ruby>",furigana:"ねむります",rom:"nemurimasu",id:"tidur",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>乾きます</rb><rt>かわきます</rt></ruby>",furigana:"かわきます",rom:"kawakimasu",id:"kering",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>滑ります</rb><rt>すべります</rt></ruby>",furigana:"すべります",rom:"suberimasu",id:"tergelincir; menggeser",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>事故が</rb><rt>じこが</rt></ruby>）<ruby><rb>起きます</rb><rt>おきます</rt></ruby>",furigana:"（じこが）おきます",rom:"(jiko ga) okimasu",id:"(kecelakaan) terjadi",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>調節します</rb><rt>ちょうせつします</rt></ruby>",furigana:"ちょうせつします",rom:"chōsetsu shimasu",id:"menyesuaikan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"わがまま（な）",furigana:"わがまま（な）",rom:"wagamama (na)",id:"egois",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>頑固</rb><rt>がんこ</rt></ruby>（な）",furigana:"がんこ（な）",rom:"ganko (na)",id:"keras kepala",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>安全</rb><rt>あんぜん</rt></ruby>（な）",furigana:"あんぜん（な）",rom:"anzen (na)",id:"aman",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>丁寧</rb><rt>ていねい</rt></ruby>（な）",furigana:"ていねい（な）",rom:"teinei (na)",id:"sopan",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>細かい</rb><rt>こまかい</rt></ruby>",furigana:"こまかい",rom:"komakai",id:"kecil; terperinci",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>濃い</rb><rt>こい</rt></ruby>",furigana:"こい",rom:"koi",id:"tebal; kuat (rasa); (warna) gelap",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>薄い</rb><rt>うすい</rt></ruby>",furigana:"うすい",rom:"usui",id:"tipis; lemah (rasa); (warna) muda",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>涙</rb><rt>なみだ</rt></ruby>",furigana:"なみだ",rom:"namida",id:"air mata",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>和食</rb><rt>わしょく</rt></ruby>",furigana:"わしょく",rom:"washoku",id:"hidangan Jepang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>洋食</rb><rt>ようしょく</rt></ruby>",furigana:"ようしょく",rom:"yōshoku",id:"hidangan barat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>洗濯物</rb><rt>せんたくもの</rt></ruby>",furigana:"せんたくもの",rom:"sentakumono",id:"cucian",cat:"Kata Benda",lv:"core"},
    {jp:"※デザート",furigana:"デザート",rom:"dezāto",id:"hidangan penutup",cat:"Kata Benda",lv:"extra"},
    {jp:"※〜<ruby><rb>定食</rb><rt>ていしょく</rt></ruby>",furigana:"〜ていしょく",rom:"~teishoku",id:"satu set makanan 〜",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>喉</rb><rt>のど</rt></ruby>",furigana:"のど",rom:"nodo",id:"tenggorokan",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>画面</rb><rt>がめん</rt></ruby>",furigana:"がめん",rom:"gamen",id:"layar",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>食べ放題</rb><rt>たべほうだい</rt></ruby>",furigana:"たべほうだい",rom:"tabehōdai",id:"all-you-can-eat",cat:"Kata Benda",lv:"extra"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 70 — KK そうです (sepertinya akan ~) & KB を KS く/に します
// ─────────────────────────────────────────────────
{
  num: 70,
  title: "KK そうです & KB を 〜く/に します",
  sub: "KK-ます そうです (sepertinya) / KB を KS く・に します (mengubah)",
  color: "bab-70",
  tips: [
    {icon:"💡", title:"KK-ます そうです — sepertinya akan terjadi", points:[
      "Pola: <b>KK stem-ます + そうです</b> = menyampaikan keyakinan bahwa pergerakan/perubahan kemungkinan akan terjadi.",
      "Contoh: たなから にもつが いまにも おち<b>そうです</b> → Barang bawaan dari rak sepertinya akan jatuh kapan saja.",
      "⚠️ Bedakan: <b>KK そうです</b> (sepertinya akan KK — prediksi) vs <b>KS そうです</b> (kelihatannya KS — kesan visual, Bab 68).",
      "Pengecualian: <b>いい</b> → <b>よさそう</b>. <b>ない</b> → <b>なさそう</b>."
    ]},
    {icon:"🔄", title:"KB を KS く/に します — mengubah dengan sengaja", points:[
      "Pola: <b>KB を KS い (〜く) + します</b> atau <b>KB を KS な (〜に) + します</b>.",
      "Menunjukkan mengubah objek (KB) yang disengaja.",
      "KS い: かみを みじか<b>く</b> します → Memotong rambut (menjadikannya pendek).",
      "KS な: はを みがいて きれい<b>に</b> しましょう → Mari gosok gigi agar bersih.",
      "Bandingkan: 〜に なります (berubah sendiri/alami) vs 〜に します (diubah sengaja)."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK bentuk ます そうです : sepertinya 〜",
      pattern: "KK [stem-ます] + そうです",
      desc: "Pola kalimat ini menyampaikan keyakinan pembicara bahwa pergerakan atau perubahan yang ditunjukkan oleh kata kerja kemungkinan akan terjadi.",
      reibun: [
        {jp:"<ruby><rb>棚</rb><rt>たな</rt></ruby>から <ruby><rb>荷物</rb><rt>にもつ</rt></ruby>が <ruby><rb>今</rb><rt>いま</rt></ruby>にも <ruby><rb>落</rb><rt>お</rt></ruby>ち<ruby><rb>そうです</rb><rt>そうです</rt></ruby>。", rom:"Tana kara nimotsu ga ima ni mo ochisō desu.", id:"Barang bawaan di rak sepertinya akan jatuh kapan saja."},
        {jp:"<ruby><rb>車</rb><rt>くるま</rt></ruby>の ガソリンが なくなり<ruby><rb>そうです</rb><rt>そうです</rt></ruby>。", rom:"Kuruma no gasorin ga nakunarisō desu.", id:"Bensin mobil sepertinya akan habis."},
        {jp:"これから <ruby><rb>日本</rb><rt>にほん</rt></ruby>で <ruby><rb>働</rb><rt>はたら</rt></ruby>く <ruby><rb>外国人</rb><rt>がいこくじん</rt></ruby>が <ruby><rb>増</rb><rt>ふ</rt></ruby>え<ruby><rb>そうです</rb><rt>そうです</rt></ruby>。", rom:"Korekara Nihon de hataraku gaikokujin ga fuesō desu.", id:"Sepertinya jumlah orang asing yang bekerja di Jepang akan meningkat ke depannya."}
      ]
    },
    {
      tag: "B", label: "KB1 を KS い（〜く）／KS な（〜に）／KB2 に します",
      pattern: "KB1 を KS い [〜く] / KS な [〜に] / KB2 に + します",
      desc: "〜く／〜に します menunjukkan mengubah objek (KB1) yang disengaja.",
      reibun: [
        {jp:"<ruby><rb>髪</rb><rt>かみ</rt></ruby>を <ruby><rb>短</rb><rt>みじか</rt></ruby>く します。", rom:"Kami o mijikaku shimasu.", id:"Saya potong rambut menjadi pendek."},
        {jp:"<ruby><rb>歯</rb><rt>は</rt></ruby>を <ruby><rb>磨</rb><rt>みが</rt></ruby>いて きれいに しましょう。", rom:"Ha o migaite kirei ni shimashō.", id:"Mari gosok gigi agar bersih."},
        {jp:"<ruby><rb>全部</rb><rt>ぜんぶ</rt></ruby> <ruby><rb>食</rb><rt>た</rt></ruby>べられませんから、ごはんの <ruby><rb>量</rb><rt>りょう</rt></ruby>を <ruby><rb>半分</rb><rt>はんぶん</rt></ruby>に して ください。", rom:"Zenbu taberaremasen kara, gohan no ryō o hanbun ni shite kudasai.", id:"Karena tidak bisa makan semua, tolong setengahkan porsi nasinya."}
      ]
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>輸出が</rb><rt>ゆしゅつが</rt></ruby>）<ruby><rb>増えます</rb><rt>ふえます</rt></ruby>",furigana:"（ゆしゅつが）ふえます",rom:"(yushutsu ga) fuemasu",id:"(ekspor) meningkat",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>輸出が</rb><rt>ゆしゅつが</rt></ruby>）<ruby><rb>減ります</rb><rt>へります</rt></ruby>",furigana:"（ゆしゅつが）へります",rom:"(yushutsu ga) herimasu",id:"(ekspor) menurun",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>値段が</rb><rt>ねだんが</rt></ruby>）<ruby><rb>上がります</rb><rt>あがります</rt></ruby>",furigana:"（ねだんが）あがります",rom:"(nedan ga) agarimasu",id:"(harga) naik",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>値段が</rb><rt>ねだんが</rt></ruby>）<ruby><rb>下がります</rb><rt>さがります</rt></ruby>",furigana:"（ねだんが）さがります",rom:"(nedan ga) sagarimasu",id:"(harga) turun",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>紐が</rb><rt>ひもが</rt></ruby>）<ruby><rb>切れます</rb><rt>きれます</rt></ruby>",furigana:"（ひもが）きれます",rom:"(himo ga) kiremasu",id:"(tali) putus",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（ボタンが）<ruby><rb>取れます</rb><rt>とれます</rt></ruby>",furigana:"（ボタンが）とれます",rom:"(botan ga) toremasu",id:"(kancing) lepas",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>荷物が</rb><rt>にもつが</rt></ruby>）<ruby><rb>落ちます</rb><rt>おちます</rt></ruby>",furigana:"（にもつが）おちます",rom:"(nimotsu ga) ochimasu",id:"(barang) jatuh",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（ガソリンが）<ruby><rb>なくなります</rb><rt>なくなります</rt></ruby>",furigana:"（ガソリンが）なくなります",rom:"(gasorin ga) nakunarimasu",id:"(bensin) habis",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"※<ruby><rb>嫌</rb><rt>いや</rt></ruby>（な）",furigana:"いや（な）",rom:"iya (na)",id:"tidak menyenangkan",cat:"Kata Sifat",lv:"extra",grp:"na"},
    {jp:"ガソリン",furigana:"ガソリン",rom:"gasorin",id:"bensin",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>火</rb><rt>ひ</rt></ruby>",furigana:"ひ",rom:"hi",id:"api",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>暖房</rb><rt>だんぼう</rt></ruby>",furigana:"だんぼう",rom:"danbō",id:"pemanas ruangan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>冷房</rb><rt>れいぼう</rt></ruby>",furigana:"れいぼう",rom:"reibō",id:"AC",cat:"Kata Benda",lv:"core"},
    {jp:"おかず",furigana:"おかず",rom:"okazu",id:"makanan pendamping; lauk",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>量</rb><rt>りょう</rt></ruby>",furigana:"りょう",rom:"ryō",id:"kuantitas",cat:"Kata Benda",lv:"core"},
    {jp:"〜<ruby><rb>倍</rb><rt>ばい</rt></ruby>",furigana:"〜ばい",rom:"~bai",id:"〜 kali lipat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>半分</rb><rt>はんぶん</rt></ruby>",furigana:"はんぶん",rom:"hanbun",id:"setengah",cat:"Kata Benda",lv:"core"},
    {jp:"たんす",furigana:"たんす",rom:"tansu",id:"lemari laci",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>天気予報</rb><rt>てんきよほう</rt></ruby>",furigana:"てんきよほう",rom:"tenki yohō",id:"prakiraan cuaca",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>税金</rb><rt>ぜいきん</rt></ruby>",furigana:"ぜいきん",rom:"zeikin",id:"pajak",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>温度</rb><rt>おんど</rt></ruby>",furigana:"おんど",rom:"ondo",id:"suhu",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>今にも</rb><rt>いまにも</rt></ruby>",furigana:"いまにも",rom:"ima ni mo",id:"kapan saja",cat:"Kata Keterangan",lv:"extra"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 71 — 〜のに (padahal)
// ─────────────────────────────────────────────────
{
  num: 71,
  title: "〜のに (padahal 〜)",
  sub: "[bentuk biasa] のに、〜 : padahal 〜 (kontras/kecewa)",
  color: "bab-71",
  tips: [
    {icon:"💡", title:"のに (padahal) — kontras & ketidakpuasan", points:[
      "Pola: <b>[bentuk biasa] のに、〜</b> = digunakan ketika klausa kedua bertentangan dengan yang diharapkan dari klausa pertama.",
      "Menyampaikan perasaan terkejut, kecewa, atau tidak puas.",
      "Contoh: 30ぷんも まった<b>のに</b>、タクシーが きませんでした → Padahal sudah menunggu 30 menit, taksinya tidak datang.",
      "⚠️ BEDAKAN: <b>のに (padahal)</b> = kontras/kekecewaan vs <b>のに (untuk)</b> Bab 68 = fungsi/tujuan."
    ]},
    {icon:"⚠️", title:"Konjugasi sebelum のに (padahal)", points:[
      "<b>KK</b>: bentuk biasa (たべる、たべた). <b>KS い</b>: bentuk biasa (たかい).",
      "<b>KS な</b>: bentuk biasa + <b>な</b> sebelum のに (ひつような のに).",
      "<b>KB</b>: bentuk biasa + <b>な</b> sebelum のに (がくせいな のに).",
      "Contoh: この レストランは たかい<b>のに</b>、おいしくないです → Padahal restoran ini mahal, tapi tidak enak."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "〜のに : padahal 〜",
      pattern: "KK/KS い [bentuk biasa] / KS な・KB [bentuk biasa + な] + のに、〜",
      desc: "のに digunakan ketika pernyataan dalam klausa kedua bertentangan dengan apa yang diharapkan dari klausa pertama. Dalam kebanyakan kasus, pola kalimat ini menyampaikan perasaan terkejut atau tidak puas.",
      reibun: [
        {jp:"30<ruby><rb>分</rb><rt>ぷん</rt></ruby>も <ruby><rb>待</rb><rt>ま</rt></ruby>った のに タクシーが <ruby><rb>来</rb><rt>き</rt></ruby>ませんでした。", rom:"Sanjuppun mo matta noni, takushī ga kimasen deshita.", id:"Padahal sudah menunggu 30 menit, taksinya tidak datang."},
        {jp:"この レストランは <ruby><rb>高</rb><rt>たか</rt></ruby>い のに おいしくないです。", rom:"Kono resutoran wa takai noni, oishikunai desu.", id:"Padahal restoran ini mahal, tapi tidak enak."},
        {jp:"パスポートが <ruby><rb>必要</rb><rt>ひつよう</rt></ruby>な のに、<ruby><rb>持</rb><rt>も</rt></ruby>って くるのを <ruby><rb>忘</rb><rt>わす</rt></ruby>れて しまいました。", rom:"Pasupōto ga hitsuyō na noni, motte kuru no o wasurete shimaimashita.", id:"Padahal paspor diperlukan, saya lupa membawanya."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>謝ります</rb><rt>あやまります</rt></ruby>",furigana:"あやまります",rom:"ayamarimasu",id:"meminta maaf",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>事故に</rb><rt>じこに</rt></ruby>）あいます",furigana:"（じこに）あいます",rom:"(jiko ni) aimasu",id:"mengalami (kecelakaan)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>信じます</rb><rt>しんじます</rt></ruby>",furigana:"しんじます",rom:"shinjimasu",id:"meyakini",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>用意します</rb><rt>よういします</rt></ruby>",furigana:"よういします",rom:"yōi shimasu",id:"mempersiapkan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"キャンセルします",furigana:"キャンセルします",rom:"kyanseru shimasu",id:"membatalkan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"うまくいきます",furigana:"うまくいきます",rom:"umaku ikimasu",id:"berjalan dengan baik",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"※<ruby><rb>別れます</rb><rt>わかれます</rt></ruby>",furigana:"わかれます",rom:"wakaremasu",id:"putus; membagi; berpisah",cat:"Kata Kerja",lv:"extra",grp:"II"},
    {jp:"<ruby><rb>酷い</rb><rt>ひどい</rt></ruby>",furigana:"ひどい",rom:"hidoi",id:"mengerikan",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>中止</rb><rt>ちゅうし</rt></ruby>",furigana:"ちゅうし",rom:"chūshi",id:"membatalkan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>点</rb><rt>てん</rt></ruby>",furigana:"てん",rom:"ten",id:"titik; skor",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>下痢</rb><rt>げり</rt></ruby>",furigana:"げり",rom:"geri",id:"diare",cat:"Kata Benda",lv:"extra"},
    {jp:"ちゃんと",furigana:"ちゃんと",rom:"chanto",id:"dengan baik",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>急に</rb><rt>きゅうに</rt></ruby>",furigana:"きゅうに",rom:"kyū ni",id:"tiba-tiba",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>無理に</rb><rt>むりに</rt></ruby>",furigana:"むりに",rom:"muri ni",id:"secara paksa",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>楽しみにしています</rb><rt>たのしみにしています</rt></ruby>",furigana:"たのしみにしています",rom:"tanoshimi ni shite imasu",id:"menantikan",cat:"Ekspresi",lv:"core"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 72 — KK ところです (baru akan / sedang / baru saja)
// ─────────────────────────────────────────────────
{
  num: 72,
  title: "〜ところです (baru akan/sedang/baru saja)",
  sub: "KK-kamus/て いる/た ところです",
  color: "bab-72",
  tips: [
    {icon:"💡", title:"3 bentuk ところです — waktu tindakan", points:[
      "<b>KK kamus + ところです</b>: tindakan baru saja akan dimulai. Contoh: これから ひるごはんを たべる<b>ところです</b> → Saya akan makan siang sekarang.",
      "<b>KK て いる + ところです</b>: tindakan sedang berlangsung. Contoh: いま こしょうの げんいんを しらべて いる<b>ところです</b> → Sekarang sedang menyelidiki penyebab kerusakan.",
      "<b>KK た + ところです</b>: tindakan baru saja selesai. Contoh: たったいま シャワーを あびた<b>ところです</b> → Baru saja selesai mandi.",
      "⚠️ ところです menekankan SAAT/MOMEN tindakan, bukan hasilnya."
    ]},
    {icon:"🕐", title:"Kata keterangan yang sering dipakai", points:[
      "<b>KK kamus ところです</b>: sering dengan これから、（ちょうど）いまから.",
      "<b>KK て いる ところです</b>: sering dengan いま.",
      "<b>KK た ところです</b>: sering dengan たったいま、ちょうど.",
      "Bandingkan: KK た<b>ところです</b> (baru saja selesai) vs KK て います (sudah dalam kondisi selesai)."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK bentuk kamus ところです",
      pattern: "KK [bentuk kamus] + ところです",
      desc: "Menunjukkan bahwa suatu tindakan yang baru saja akan dimulai dan sering digunakan dengan kata keterangan seperti これから, (ちょうど)いまから, dll.",
      reibun: [
        {jp:"これから <ruby><rb>昼ごはん</rb><rt>ひるごはん</rt></ruby>を <ruby><rb>食べる</rb><rt>たべる</rt></ruby> ところです。", rom:"Korekara hirugohan o taberu tokoro desu.", id:"Saya akan makan siang sekarang."},
        {jp:"<ruby><rb>今</rb><rt>いま</rt></ruby>から <ruby><rb>映画</rb><rt>えいが</rt></ruby>が <ruby><rb>始まる</rb><rt>はじまる</rt></ruby> ところです。", rom:"Ima kara eiga ga hajimaru tokoro desu.", id:"Film akan segera mulai sekarang."}
      ]
    },
    {
      tag: "B", label: "KK bentuk て いる ところです",
      pattern: "KK [て-form] + いる + ところです",
      desc: "Menunjukkan bahwa suatu tindakan sedang berlangsung dan sering digunakan bersama dengan kata いま.",
      reibun: [
        {jp:"<ruby><rb>今</rb><rt>いま</rt></ruby> <ruby><rb>故障</rb><rt>こしょう</rt></ruby>の <ruby><rb>原因</rb><rt>げんいん</rt></ruby>を <ruby><rb>調べて</rb><rt>しらべて</rt></ruby> いる ところです。", rom:"Ima koshō no gen'in o shirabete iru tokoro desu.", id:"Sekarang sedang menyelidiki penyebab kerusakan."},
        {jp:"トースターで パンを <ruby><rb>焼いて</rb><rt>やいて</rt></ruby> いる ところです。", rom:"Tōsutā de pan o yaite iru tokoro desu.", id:"Sedang memanggang roti dengan toaster."}
      ]
    },
    {
      tag: "C", label: "KK bentuk た ところです",
      pattern: "KK [bentuk た] + ところです",
      desc: "Menunjukkan bahwa suatu tindakan baru saja selesai dilakukan dan sering digunakan dengan kata keterangan seperti たったいま.",
      reibun: [
        {jp:"たった<ruby><rb>今</rb><rt>いま</rt></ruby> シャワーを <ruby><rb>浴びた</rb><rt>あびた</rt></ruby> ところです。", rom:"Tatta ima shawā o abita tokoro desu.", id:"Baru saja selesai mandi."},
        {jp:"ちょうど <ruby><rb>荷物</rb><rt>にもつ</rt></ruby>が <ruby><rb>着いた</rb><rt>ついた</rt></ruby> ところです。", rom:"Chōdo nimotsu ga tsuita tokoro desu.", id:"Barangnya baru saja tiba tepat sekarang."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>焼きます</rb><rt>やきます</rt></ruby>",furigana:"やきます",rom:"yakimasu",id:"memanggang",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>渡します</rb><rt>わたします</rt></ruby>",furigana:"わたします",rom:"watashimasu",id:"menyerahkan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>帰って来ます</rb><rt>かえってきます</rt></ruby>",furigana:"かえってきます",rom:"kaette kimasu",id:"kembali",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>出ます</rb><rt>でます</rt></ruby>",furigana:"でます",rom:"demasu",id:"pergi; keluar; berangkat",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"※メールに<ruby><rb>添付します</rb><rt>てんぷします</rt></ruby>",furigana:"メールにてんぷします",rom:"mēru ni tenpu shimasu",id:"melampirkan ke email",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"<ruby><rb>宅配便</rb><rt>たくはいびん</rt></ruby>",furigana:"たくはいびん",rom:"takuhaibin",id:"jasa pengiriman",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>食欲</rb><rt>しょくよく</rt></ruby>",furigana:"しょくよく",rom:"shokuyoku",id:"nafsu makan",cat:"Kata Benda",lv:"core"},
    {jp:"※トースター",furigana:"トースター",rom:"tōsutā",id:"pemanggang roti",cat:"Kata Benda",lv:"extra"},
    {jp:"ちょうど",furigana:"ちょうど",rom:"chōdo",id:"tepat",cat:"Kata Keterangan",lv:"core"},
    {jp:"たった<ruby><rb>今</rb><rt>いま</rt></ruby>",furigana:"たったいま",rom:"tatta ima",id:"baru saja",cat:"Kata Keterangan",lv:"core"},
    {jp:"さっき",furigana:"さっき",rom:"sakki",id:"beberapa saat yang lalu",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>今いいでしょうか</rb><rt>いまいいでしょうか</rt></ruby>",furigana:"いまいいでしょうか",rom:"ima ii deshō ka",id:"Bolehkah saya mengganggu Anda sekarang?",cat:"Ekspresi",lv:"core"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 73 — bentuk biasa そうです (saya dengar) & 〜ようです (tampaknya)
// ─────────────────────────────────────────────────
{
  num: 73,
  title: "〜そうです (saya dengar) & 〜ようです (tampaknya)",
  sub: "[bentuk biasa] そうです / ようです",
  color: "bab-73",
  tips: [
    {icon:"📢", title:"bentuk biasa そうです — informasi dari sumber lain", points:[
      "Pola: <b>[bentuk biasa] + そうです</b> = menyampaikan informasi dari sumber lain tanpa menyebutkan sumbernya.",
      "Contoh: あした にほんごの テストが ある<b>そうです</b> → Katanya besok ada ujian bahasa Jepang.",
      "Sumber bisa disebut di awal: <b>〜によると</b>、〜そうです.",
      "⚠️ BEDAKAN dari KS そうです (Bab 68, kesan visual) dan KK そうです (Bab 70, prediksi)!"
    ]},
    {icon:"🔍", title:"〜ようです — tampaknya / kesimpulan dari pengamatan", points:[
      "Pola: <b>[bentuk biasa] + ようです</b> = menyampaikan kesimpulan pembicara dari mengamati suatu situasi.",
      "KS な/KB: bentuk biasa + <b>な</b> sebelum ようです (しずかな ようです、がくせいの ようです).",
      "Sering digunakan dengan <b>どうも</b> saat menekankan ketidakpastian.",
      "Contoh: せきも でるし、どうも かぜを ひいた<b>ようです</b> → Ada batuk juga, sepertinya terkena flu."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "Bentuk biasa そうです : Saya dengar 〜",
      pattern: "[KK/KS い bentuk biasa / KS な・KB bentuk biasa] + そうです",
      desc: "Ungkapan untuk menyampaikan informasi dari sumber lain tanpa menyebutkan sumbernya. Namun, ketika sumber informasi tersebut disebutkan, maka di awal kalimat ditandai dengan 〜によると.",
      reibun: [
        {jp:"<ruby><rb>先生</rb><rt>せんせい</rt></ruby>に <ruby><rb>聞</rb><rt>き</rt></ruby>いたんですが、あした <ruby><rb>日本語</rb><rt>にほんご</rt></ruby>の テストが ある<ruby><rb>そうです</rb><rt>そうです</rt></ruby>。", rom:"Sensei ni kiita n desu ga, ashita nihongo no tesuto ga aru sō desu.", id:"Saya dengar dari guru, katanya besok ada ujian bahasa Jepang."},
        {jp:"<ruby><rb>天気予報</rb><rt>てんきよほう</rt></ruby>に よると、あしたの <ruby><rb>朝</rb><rt>あさ</rt></ruby>は <ruby><rb>寒</rb><rt>さむ</rt></ruby>く なる<ruby><rb>そうです</rb><rt>そうです</rt></ruby>。", rom:"Tenki yohō ni yoru to, ashita no asa wa samuku naru sō desu.", id:"Menurut prakiraan cuaca, katanya besok pagi akan menjadi dingin."},
        {jp:"<ruby><rb>大切</rb><rt>たいせつ</rt></ruby>な <ruby><rb>会議</rb><rt>かいぎ</rt></ruby>が あるので、ジョンさんは <ruby><rb>今週</rb><rt>こんしゅう</rt></ruby> <ruby><rb>仕事</rb><rt>しごと</rt></ruby>が <ruby><rb>忙</rb><rt>いそが</rt></ruby>しい<ruby><rb>そうです</rb><rt>そうです</rt></ruby>。", rom:"Taisetsu na kaigi ga aru node, Jon-san wa konshū shigoto ga isogashii sō desu.", id:"Karena ada rapat penting, katanya Jon minggu ini sibuk bekerja."}
      ]
    },
    {
      tag: "B", label: "〜ようです : tampaknya 〜",
      pattern: "KK/KS い [bentuk biasa] / KS な [bentuk biasa + な] / KB [bentuk biasa + の] + ようです",
      desc: "〜ようです digunakan untuk menyampaikan kesimpulan pembicara dari mengamati suatu situasi. Terkadang digunakan dengan kata keterangan どうも ketika pembicara menekankan ketidakpastian terhadap kesimpulannya.",
      reibun: [
        {jp:"<ruby><rb>隣</rb><rt>となり</rt></ruby>の <ruby><rb>部屋</rb><rt>へや</rt></ruby>から <ruby><rb>声</rb><rt>こえ</rt></ruby>が <ruby><rb>聞</rb><rt>き</rt></ruby>こえますね。だれか いる<ruby><rb>ようです</rb><rt>ようです</rt></ruby>。", rom:"Tonari no heya kara koe ga kikoemasu ne. Dareka iru yō desu.", id:"Ada suara terdengar dari kamar sebelah. Sepertinya ada seseorang."},
        {jp:"せきも <ruby><rb>出</rb><rt>で</rt></ruby>るし、<ruby><rb>頭</rb><rt>あたま</rt></ruby>も <ruby><rb>痛</rb><rt>いた</rt></ruby>いです。どうも <ruby><rb>風邪</rb><rt>かぜ</rt></ruby>を <ruby><rb>引</rb><rt>ひ</rt></ruby>いた<ruby><rb>ようです</rb><rt>ようです</rt></ruby>。", rom:"Seki mo deru shi, atama mo itai desu. Dōmo kaze o hiita yō desu.", id:"Ada batuk juga dan kepala sakit. Sepertinya terkena flu."},
        {jp:"<ruby><rb>部屋</rb><rt>へや</rt></ruby>の <ruby><rb>電気</rb><rt>でんき</rt></ruby>が <ruby><rb>消えて</rb><rt>きえて</rt></ruby> いるので、<ruby><rb>木村</rb><rt>きむら</rt></ruby>さんは <ruby><rb>留守</rb><rt>るす</rt></ruby>の<ruby><rb>ようです</rb><rt>ようです</rt></ruby>。", rom:"Heya no denki ga kiete iru node, Kimura-san wa rusu no yō desu.", id:"Karena lampu kamar sudah mati, sepertinya Kimura-san tidak ada di rumah."}
      ]
    }
  ],
  kotoba: [
    {jp:"（ゴミが）<ruby><rb>燃えます</rb><rt>もえます</rt></ruby>",furigana:"（ゴミが）もえます",rom:"(gomi ga) moemasu",id:"membakar (sampah)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>人が</rb><rt>ひとが</rt></ruby>）<ruby><rb>集まります</rb><rt>あつまります</rt></ruby>",furigana:"（ひとが）あつまります",rom:"(hito ga) atsumarimasu",id:"(orang) berkumpul",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>長生きします</rb><rt>ながいきします</rt></ruby>",furigana:"ながいきします",rom:"nagaiki shimasu",id:"panjang umur",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（<ruby><rb>声・音・味</rb><rt>こえ・おと・あじ</rt></ruby>）が<ruby><rb>します</rb><rt>します</rt></ruby>",furigana:"（こえ・おと・あじ）がします",rom:"(koe/oto/aji) ga shimasu",id:"(bunyi/suara) terdengar; memiliki (rasa)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（<ruby><rb>傘を</rb><rt>かさを</rt></ruby>）さします",furigana:"（かさを）さします",rom:"(kasa o) sashimasu",id:"memakai (payung)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>厳しい</rb><rt>きびしい</rt></ruby>",furigana:"きびしい",rom:"kibishii",id:"disiplin; ketat",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>怖い</rb><rt>こわい</rt></ruby>",furigana:"こわい",rom:"kowai",id:"menakutkan",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>救急車</rb><rt>きゅうきゅうしゃ</rt></ruby>",furigana:"きゅうきゅうしゃ",rom:"kyūkyūsha",id:"ambulans",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>天気予報</rb><rt>てんきよほう</rt></ruby>",furigana:"てんきよほう",rom:"tenki yohō",id:"prakiraan cuaca",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>発表</rb><rt>はっぴょう</rt></ruby>",furigana:"はっぴょう",rom:"happyō",id:"pengumuman; presentasi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>人口</rb><rt>じんこう</rt></ruby>",furigana:"じんこう",rom:"jinkō",id:"populasi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>科学</rb><rt>かがく</rt></ruby>",furigana:"かがく",rom:"kagaku",id:"sains",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>医学</rb><rt>いがく</rt></ruby>",furigana:"いがく",rom:"igaku",id:"ilmu kedokteran",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>賛成</rb><rt>さんせい</rt></ruby>",furigana:"さんせい",rom:"sansei",id:"setuju",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>反対</rb><rt>はんたい</rt></ruby>",furigana:"はんたい",rom:"hantai",id:"tidak setuju; berlawanan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>男性</rb><rt>だんせい</rt></ruby>",furigana:"だんせい",rom:"dansei",id:"laki-laki",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>女性</rb><rt>じょせい</rt></ruby>",furigana:"じょせい",rom:"josei",id:"wanita",cat:"Kata Benda",lv:"core"},
    {jp:"におい",furigana:"におい",rom:"nioi",id:"bau; aroma",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>留守</rb><rt>るす</rt></ruby>",furigana:"るす",rom:"rusu",id:"ketidakhadiran",cat:"Kata Benda",lv:"core"},
    {jp:"パトカー",furigana:"パトカー",rom:"patokā",id:"mobil patroli",cat:"Kata Benda",lv:"core"},
    {jp:"※パンダ",furigana:"パンダ",rom:"panda",id:"panda",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>韓国語</rb><rt>かんこくご</rt></ruby>",furigana:"かんこくご",rom:"kankokugo",id:"bahasa Korea",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>歯医者</rb><rt>はいしゃ</rt></ruby>",furigana:"はいしゃ",rom:"haisha",id:"dokter gigi",cat:"Kata Benda",lv:"extra"},
    {jp:"〜によると",furigana:"〜によると",rom:"~ni yoru to",id:"menurut 〜",cat:"Ekspresi",lv:"core"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 74 — KK た ばかりです & 〜はずです
// ─────────────────────────────────────────────────
{
  num: 74,
  title: "〜ばかりです & 〜はずです",
  sub: "KK た ばかりです (baru saja) / 〜はずです (seharusnya)",
  color: "bab-74",
  tips: [
    {icon:"⏱️", title:"KK た ばかりです — baru saja selesai", points:[
      "Pola: <b>KK bentuk た + ばかりです</b> = mengungkapkan bahwa jarak waktu sejak suatu tindakan dilakukan tidak begitu lama menurut pembicara.",
      "Contoh: さっき ひるごはんを たべた<b>ばかりです</b> → Baru saja makan siang tadi.",
      "⚠️ BEDAKAN: <b>た ばかり</b> (perasaan 'baru saja' subjektif) vs <b>た ところ</b> (Bab 72, baru saja secara objektif/faktual).",
      "ばかり bisa diikuti だ/です, そうです, なのに, dll. Contoh: かった<b>ばかりなのに</b>、もう こわれて しまいました."
    ]},
    {icon:"✅", title:"〜はずです — seharusnya / seyogianya", points:[
      "Pola: <b>[bentuk biasa] + はずです</b> = pembicara dengan tegas menyatakan suatu kesimpulan berdasarkan alasan tertentu.",
      "KS な/KB: + の sebelum はずです (きゅうじつの はずです、げんきな はずです).",
      "Contoh: きょうは にちようびですから、ぎんこうは やすみの<b>はずです</b> → Karena hari ini Minggu, bank seharusnya libur.",
      "Negatif: 〜ない はずです = seharusnya tidak ~."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KK bentuk た ばかりです : baru saja selesai",
      pattern: "KK [bentuk た] + ばかりです",
      desc: "Mengungkapkan bahwa jarak waktu sejak suatu tindakan telah dilakukan atau suatu peristiwa telah terjadi tidak begitu lama menurut pembicara.",
      reibun: [
        {jp:"さっき <ruby><rb>昼ごはん</rb><rt>ひるごはん</rt></ruby>を <ruby><rb>食べた</rb><rt>たべた</rt></ruby> ばかりです。", rom:"Sakki hirugohan o tabeta bakari desu.", id:"Baru saja makan siang tadi."},
        {jp:"<ruby><rb>彼女</rb><rt>かのじょ</rt></ruby>は <ruby><rb>先月</rb><rt>せんげつ</rt></ruby> <ruby><rb>高校</rb><rt>こうこう</rt></ruby>を <ruby><rb>卒業した</rb><rt>そつぎょうした</rt></ruby> ばかりだそうです。", rom:"Kanojo wa sengetsu kōkō o sotsugyō shita bakari da sō desu.", id:"Katanya dia baru saja lulus SMA bulan lalu."},
        {jp:"この パソコンは この<ruby><rb>間</rb><rt>あいだ</rt></ruby> <ruby><rb>買った</rb><rt>かった</rt></ruby> ばかりなのに、もう <ruby><rb>故障</rb><rt>こしょう</rt></ruby>して しまいました。", rom:"Kono pasokon wa konoaida katta bakari na noni, mō koshō shite shimaimashita.", id:"Padahal laptop ini baru saja dibeli kemarin, tapi sudah rusak."}
      ]
    },
    {
      tag: "B", label: "〜はずです : seharusnya 〜",
      pattern: "KK [kamus/ない] / KS い / KS な [な] / KB [の] + はずです",
      desc: "Digunakan ketika pembicara dengan tegas menyatakan suatu kesimpulan yang dibuat berdasarkan alasan tertentu.",
      reibun: [
        {jp:"さっき インターネットで <ruby><rb>注文</rb><rt>ちゅうもん</rt></ruby>しましたから、<ruby><rb>明日</rb><rt>あした</rt></ruby> <ruby><rb>荷物</rb><rt>にもつ</rt></ruby>が <ruby><rb>届く</rb><rt>とどく</rt></ruby> はずです。", rom:"Sakki intānetto de chūmon shimashita kara, ashita nimotsu ga todoku hazu desu.", id:"Tadi sudah pesan lewat internet, seharusnya barangnya tiba besok."},
        {jp:"<ruby><rb>連絡</rb><rt>れんらく</rt></ruby>が ありましたから、タントさんは <ruby><rb>今日</rb><rt>きょう</rt></ruby> <ruby><rb>学校</rb><rt>がっこう</rt></ruby>に <ruby><rb>来ない</rb><rt>こない</rt></ruby> はずです。", rom:"Renraku ga arimashita kara, Tanto-san wa kyō gakkō ni konai hazu desu.", id:"Ada kabar, jadi Tanto seharusnya tidak datang ke sekolah hari ini."},
        {jp:"<ruby><rb>今日</rb><rt>きょう</rt></ruby>は <ruby><rb>日曜日</rb><rt>にちようび</rt></ruby>ですから、<ruby><rb>銀行</rb><rt>ぎんこう</rt></ruby>は <ruby><rb>休み</rb><rt>やすみ</rt></ruby>の はずです。", rom:"Kyō wa nichiyōbi desu kara, ginkō wa yasumi no hazu desu.", id:"Karena hari ini Minggu, bank seharusnya libur."}
      ]
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>荷物が</rb><rt>にもつが</rt></ruby>）<ruby><rb>届きます</rb><rt>とどきます</rt></ruby>",furigana:"（にもつが）とどきます",rom:"(nimotsu ga) todokimasu",id:"(barang) tiba; akan dikirimkan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"※<ruby><rb>自立を助けます</rb><rt>じりつをたすけます</rt></ruby>",furigana:"じりつをたすけます",rom:"jiritsu o tasukemasu",id:"mendukung kemandirian",cat:"Kata Kerja",lv:"extra",grp:"II"},
    {jp:"※<ruby><rb>実現します</rb><rt>じつげんします</rt></ruby>",furigana:"じつげんします",rom:"jitsugen shimasu",id:"mewujudkan; merealisasikan",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"※<ruby><rb>新鮮</rb><rt>しんせん</rt></ruby>（な）",furigana:"しんせん（な）",rom:"shinsen (na)",id:"segar",cat:"Kata Sifat",lv:"extra",grp:"na"},
    {jp:"<ruby><rb>席</rb><rt>せき</rt></ruby>",furigana:"せき",rom:"seki",id:"kursi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>半年</rb><rt>はんとし</rt></ruby>",furigana:"はんとし",rom:"hantoshi",id:"setengah tahun",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>具合</rb><rt>ぐあい</rt></ruby>",furigana:"ぐあい",rom:"guai",id:"kondisi badan",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>初めは</rb><rt>はじめは</rt></ruby>",furigana:"はじめは",rom:"hajime wa",id:"pertama",cat:"Kata Keterangan",lv:"extra"},
    {jp:"※〜と<ruby><rb>言う</rb><rt>いう</rt></ruby>",furigana:"〜という",rom:"~to iu",id:"bernama 〜; disebut 〜",cat:"Ekspresi",lv:"extra"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 75 — 命令形・禁止形 & X は Y という意味です
// ─────────────────────────────────────────────────
{
  num: 75,
  title: "命令形・禁止形 & X は Y という意味です",
  sub: "Bentuk perintah & larangan / X berarti Y",
  color: "bab-75",
  tips: [
    {icon:"⚡", title:"<ruby><rb>命令形</rb><rt>めいれいけい</rt></ruby> (Bentuk Perintah) — cara membentuknya", points:[
      "<b>Grup I</b>: ubah ます → baris e (のみます→のめ、まちます→まて、かきます→かけ、はしります→はしれ).",
      "<b>Grup II</b>: ubah ます → ろ (やめます→やめろ、みます→みろ、ねます→ねろ).",
      "<b>Grup III</b>: きます→こい、します→しろ.",
      "Digunakan dalam situasi darurat, tanda, olahraga/semangat, atau situasi tidak formal."
    ]},
    {icon:"🚫", title:"<ruby><rb>禁止形</rb><rt>きんしけい</rt></ruby> (Bentuk Larangan) — cara membentuknya", points:[
      "<b>Semua grup</b>: KK bentuk kamus + <b>な</b>.",
      "Contoh: のむな (jangan minum)、みるな (jangan lihat)、するな (jangan lakukan).",
      "Digunakan untuk melarang keras — lebih kasar dari 〜ないでください.",
      "Sering pada tanda/rambu: <ruby><rb>立入禁止</rb><rt>たちいりきんし</rt></ruby> (dilarang masuk) dll."
    ]},
    {icon:"📖", title:"X は Y という<ruby><rb>意味</rb><rt>いみ</rt></ruby>です — mendefinisikan", points:[
      "Pola: <b>X は Y という <ruby><rb>意味</rb><rt>いみ</rt></ruby>です</b> = X berarti Y (mendefinisikan sebuah kata/simbol).",
      "Contoh: この マークは ここに くるまを とめるな<b>という <ruby><rb>意味</rb><rt>いみ</rt></ruby>です</b> → Tanda ini berarti dilarang parkir di sini.",
      "Bentuk tanya: <b>どういう <ruby><rb>意味</rb><rt>いみ</rt></ruby>ですか</b> = artinya apa? / maksudnya apa?",
      "という = kutipan/definisi yang menggambarkan isi/makna dari sesuatu."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "命令形 (Bentuk Perintah) と 禁止形 (Bentuk Larangan)",
      pattern: "Grup I: ～e / Grup II: ～ろ / Grup III: こい・しろ || Larangan: KK-kamus + な",
      desc: "Bentuk perintah digunakan untuk menuntut/memerintahkan seseorang untuk melakukan suatu tindakan tertentu, dan bentuk larangan digunakan untuk menuntut/memerintahkan seseorang untuk tidak melakukan/melarang suatu tindakan tertentu.",
      reibun: [
        {jp:"<ruby><rb>早</rb><rt>はや</rt></ruby>く <ruby><rb>寝</rb><rt>ね</rt></ruby>ろ。", rom:"Hayaku nero.", id:"Cepat tidur!"},
        {jp:"ここで <ruby><rb>止</rb><rt>と</rt></ruby>まれ。", rom:"Koko de tomare.", id:"Berhenti di sini!"},
        {jp:"エレベーターを <ruby><rb>使</rb><rt>つか</rt></ruby>うな。", rom:"erebētā o tsukau na.", id:"Jangan pakai lift!"},
        {jp:"<ruby><rb>危</rb><rt>あぶ</rt></ruby>ないから、そこに <ruby><rb>入</rb><rt>はい</rt></ruby>るな。", rom:"Abunai kara, soko ni hairu na.", id:"Karena berbahaya, jangan masuk ke sana!"}
      ],
      note: {type:"blue", text:"<b>Tabel konjugasi:</b><br>Grup I: のむ→のめ/のむな, まつ→まて/まつな, かく→かけ/かくな, はしる→はしれ/はしるな<br>Grup II: やめる→やめろ/やめるな, でる→でろ/でるな, みる→みろ/みるな<br>Grup III: くる→こい/くるな, する→しろ/するな"}
    },
    {
      tag: "B", label: "X は Y という 意味です",
      pattern: "X は Y + という + 意味です / どういう 意味ですか",
      desc: "Bentuk という <ruby><rb>意味</rb><rt>いみ</rt></ruby>です digunakan ketika mendefinisikan X. Sedangkan bentuk interogatif どういう <ruby><rb>意味</rb><rt>いみ</rt></ruby>ですか digunakan untuk menanyakan arti dari sesuatu.",
      reibun: [
        {jp:"この マークは ここに <ruby><rb>車</rb><rt>くるま</rt></ruby>を <ruby><rb>止める</rb><rt>とめる</rt></ruby>な という <ruby><rb>意味</rb><rt>いみ</rt></ruby>です。", rom:"Kono māku wa koko ni kuruma o tomeru na to iu imi desu.", id:"Tanda ini berarti 'dilarang parkir di sini'."},
        {jp:"A: その マークは どういう <ruby><rb>意味</rb><rt>いみ</rt></ruby>ですか。B: <ruby><rb>洗濯機</rb><rt>せんたくき</rt></ruby>で <ruby><rb>洗える</rb><rt>あらえる</rt></ruby> という <ruby><rb>意味</rb><rt>いみ</rt></ruby>ですよ。", rom:"A: Sono māku wa dō iu imi desu ka. B: Sentakki de araeru to iu imi desu yo.", id:"A: Tanda itu artinya apa? B: Artinya bisa dicuci dengan mesin cuci."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>逃げます</rb><rt>にげます</rt></ruby>",furigana:"にげます",rom:"nigemasu",id:"melarikan diri",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>騒ぎます</rb><rt>さわぎます</rt></ruby>",furigana:"さわぎます",rom:"sawagimasu",id:"membuat kebisingan; membuat keributan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>諦めます</rb><rt>あきらめます</rt></ruby>",furigana:"あきらめます",rom:"akiramemasu",id:"menyerah",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>投げます</rb><rt>なげます</rt></ruby>",furigana:"なげます",rom:"nagemasu",id:"melemparkan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>守ります</rb><rt>まもります</rt></ruby>",furigana:"まもります",rom:"mamorimasu",id:"menjaga; mematuhi",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>伝えます</rb><rt>つたえます</rt></ruby>",furigana:"つたえます",rom:"tsutaemasu",id:"menyampaikan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>席を</rb><rt>せきを</rt></ruby>）<ruby><rb>外します</rb><rt>はずします</rt></ruby>",furigana:"（せきを）はずします",rom:"(seki o) hazushimasu",id:"meninggalkan (dari meja seseorang)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"リサイクルします",furigana:"リサイクルします",rom:"risaikuru shimasu",id:"daur ulang",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>駄目な</rb><rt>だめな</rt></ruby>",furigana:"だめな",rom:"dame na",id:"tidak baik; tidak diperbolehkan",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"マーク",furigana:"マーク",rom:"māku",id:"tanda/simbol",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>締め切り</rb><rt>しめきり</rt></ruby>",furigana:"しめきり",rom:"shimekiri",id:"tenggat waktu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>規則</rb><rt>きそく</rt></ruby>",furigana:"きそく",rom:"kisoku",id:"peraturan; aturan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>使用禁止</rb><rt>しようきんし</rt></ruby>",furigana:"しようきんし",rom:"shiyō kinshi",id:"dilarang pakai",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>立入禁止</rb><rt>たちいりきんし</rt></ruby>",furigana:"たちいりきんし",rom:"tachiiri kinshi",id:"dilarang masuk",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>入口</rb><rt>いりぐち</rt></ruby>",furigana:"いりぐち",rom:"iriguchi",id:"pintu masuk",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>出口</rb><rt>でぐち</rt></ruby>",furigana:"でぐち",rom:"deguchi",id:"pintu keluar",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>非常口</rb><rt>ひじょうぐち</rt></ruby>",furigana:"ひじょうぐち",rom:"hijōguchi",id:"pintu darurat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>無料</rb><rt>むりょう</rt></ruby>",furigana:"むりょう",rom:"muryō",id:"gratis",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>割引</rb><rt>わりびき</rt></ruby>",furigana:"わりびき",rom:"waribiki",id:"diskon",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>罰金</rb><rt>ばっきん</rt></ruby>",furigana:"ばっきん",rom:"bakkin",id:"denda",cat:"Kata Benda",lv:"core"},
    {jp:"※<ruby><rb>激安</rb><rt>げきやす</rt></ruby>",furigana:"げきやす",rom:"gekiyasu",id:"harga murah",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>徐行</rb><rt>じょこう</rt></ruby>",furigana:"じょこう",rom:"jokō",id:"pelan-pelan; kurangi kecepatan",cat:"Kata Benda",lv:"extra"},
    {jp:"※<ruby><rb>土足厳禁</rb><rt>どそくげんきん</rt></ruby>",furigana:"どそくげんきん",rom:"dosoku genkin",id:"dilarang keras memakai sepatu",cat:"Kata Benda",lv:"extra"},
    {jp:"もともと",furigana:"もともと",rom:"motomoto",id:"semula; awalnya",cat:"Kata Keterangan",lv:"core"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 76 — 使役動詞 (Kata Kerja Kausatif)
// ─────────────────────────────────────────────────
{
  num: 76,
  title: "使役動詞 (Kata Kerja Kausatif)",
  sub: "Menyuruh / mengizinkan seseorang melakukan sesuatu",
  color: "bab-76",
  tips: [
    {icon:"💡", title:"Cara membentuk <ruby><rb>使役動詞</rb><rt>しえきどうし</rt></ruby> (Kausatif)", points:[
      "<b>Grup I</b>: ubah ～います → ～あせます. Contoh: かきます→かかせます、よみます→よませます、もちます→もたせます、はなします→はなさせます.",
      "<b>Grup II</b>: tambah させます. Contoh: やめます→やめさせます、でます→ださせます、ねます→ねさせます.",
      "<b>Grup III</b>: きます→こさせます、します→させます.",
      "Kata kerja kausatif terkonjugasi sebagai kata kerja <b>grup II</b>."
    ]},
    {icon:"🎯", title:"Kalimat Kausatif — keharusan & izin", points:[
      "Kausatif bermakna <b>keharusan</b> (menyuruh) atau <b>izin</b> (membiarkan/mengizinkan).",
      "Biasanya digunakan oleh orang yang berstatus lebih tinggi kepada yang lebih rendah.",
      "Contoh (keharusan): あに は おとうとを なかせました → Kakak membuat adiknya menangis.",
      "Contoh (izin): たなかさんは じぶんの こどもに すきな ことを させて います → Tanaka membiarkan anaknya melakukan hal yang disukai."
    ]},
    {icon:"🙏", title:"KK させて いただけませんか — meminta izin sopan", points:[
      "Pola: <b>KK kausatif + て いただけませんか</b> = meminta izin dengan sangat sopan.",
      "Contoh: あした、やすませて いただけませんか → Bolehkah saya izin tidak masuk besok?",
      "Contoh: しばらく ここに くるまを とめさせて いただけませんか → Bolehkah saya parkir sebentar di sini?",
      "Ini adalah cara meminta izin yang paling sopan dalam bahasa Jepang sehari-hari."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "使役動詞 (Kata Kerja Kausatif)",
      pattern: "Grup I: ～あせます / Grup II: ～させます / Grup III: こさせます・させます",
      desc: "Kata kerja kausatif terkonjugasi sebagai kata kerja grup II.",
      note: {type:"blue", text:"<b>Tabel konjugasi:</b><br>Grup I: かきます→かかせます, よみます→よませます, もちます→もたせます, はなします→はなさせます, かえります→かえらせます<br>Grup II: やめます→やめさせます, でます→ださせます, ねます→ねさせます<br>Grup III: きます→こさせます, します→させます, そうじします→そうじさせます"},
      reibun: [
        {jp:"<ruby><rb>兄</rb><rt>あに</rt></ruby>は <ruby><rb>弟</rb><rt>おとうと</rt></ruby>を <ruby><rb>泣</rb><rt>な</rt></ruby>かせました。", rom:"Ani wa otōto o nakasemashita.", id:"Kakak membuat adiknya menangis."},
        {jp:"<ruby><rb>先生</rb><rt>せんせい</rt></ruby>は <ruby><rb>学生</rb><rt>がくせい</rt></ruby>に <ruby><rb>本</rb><rt>ほん</rt></ruby>を <ruby><rb>読</rb><rt>よ</rt></ruby>ませました。", rom:"Sensei wa gakusei ni hon o yomasemashita.", id:"Guru menyuruh murid membaca buku."},
        {jp:"<ruby><rb>田中</rb><rt>たなか</rt></ruby>さんは <ruby><rb>自分</rb><rt>じぶん</rt></ruby>の <ruby><rb>子ども</rb><rt>こども</rt></ruby>に <ruby><rb>好き</rb><rt>す</rt></ruby>きな ことを させて います。", rom:"Tanaka-san wa jibun no kodomo ni suki na koto o sasete imasu.", id:"Tanaka membiarkan anaknya melakukan hal yang disukai."}
      ]
    },
    {
      tag: "B", label: "Kalimat Kausatif",
      pattern: "KB (orang) は KB (orang) を/に KK [kausatif]",
      desc: "Kata kerja kausatif bermakna keharusan atau izin. Biasanya digunakan oleh seseorang yang berstatus lebih tinggi kepada seseorang yang berstatus lebih rendah, misalnya orang tua kepada anak, kakak kepada adik, atau manajer kepada anggota timnya untuk mengharuskan atau mengizinkan melakukan sesuatu.",
      reibun: [
        {jp:"わたしは <ruby><rb>子ども</rb><rt>こども</rt></ruby>を <ruby><rb>買い物</rb><rt>かいもの</rt></ruby>に <ruby><rb>行かせます</rb><rt>いかせます</rt></ruby>。", rom:"Watashi wa kodomo o kaimono ni ikasemasu.", id:"Saya menyuruh anak pergi belanja."},
        {jp:"<ruby><rb>先生</rb><rt>せんせい</rt></ruby>は <ruby><rb>学生</rb><rt>がくせい</rt></ruby>に コンテストに <ruby><rb>参加させます</rb><rt>さんかさせます</rt></ruby>。", rom:"Sensei wa gakusei ni kontesuto ni sankasasemasu.", id:"Guru menyuruh murid ikut kontes."}
      ]
    },
    {
      tag: "C", label: "KK kausatif bentuk て いただけませんか : Mohon izinkan saya untuk 〜",
      pattern: "KK [kausatif + て] + いただけませんか",
      desc: "Digunakan pada saat meminta dengan sopan supaya diizinkan melakukan sesuatu.",
      reibun: [
        {jp:"<ruby><rb>明日</rb><rt>あした</rt></ruby>、<ruby><rb>休</rb><rt>やす</rt></ruby>ませて いただけませんか。", rom:"Ashita, yasumasete itadakemasen ka.", id:"Bolehkah saya izin tidak masuk besok?"},
        {jp:"しばらく ここに <ruby><rb>車</rb><rt>くるま</rt></ruby>を <ruby><rb>止め</rb><rt>と</rt></ruby>させて いただけませんか。", rom:"Shibaraku koko ni kuruma o tomesasete itadakemasen ka.", id:"Bolehkah saya parkir sebentar di sini?"},
        {jp:"すみませんが、この <ruby><rb>資料</rb><rt>しりょう</rt></ruby>を コピーさせて いただけませんか。", rom:"Sumimasen ga, kono shiryō o kopī sasete itadakemasen ka.", id:"Maaf, bolehkah saya menyalin materi ini?"}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>降ろします</rb><rt>おろします</rt></ruby>",furigana:"おろします",rom:"oroshimasu",id:"meletakkan; menurunkan; membongkar",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>届けます</rb><rt>とどけます</rt></ruby>",furigana:"とどけます",rom:"todokemasu",id:"mengantarkan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>録音します</rb><rt>ろくおんします</rt></ruby>",furigana:"ろくおんします",rom:"rokuon shimasu",id:"merekam suara",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>楽しみます</rb><rt>たのしみます</rt></ruby>",furigana:"たのしみます",rom:"tanoshimimasu",id:"menikmati",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>向かいます</rb><rt>むかいます</rt></ruby>",furigana:"むかいます",rom:"mukaimasu",id:"menuju",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>婚約します</rb><rt>こんやくします</rt></ruby>",furigana:"こんやくします",rom:"kon'yaku shimasu",id:"bertunangan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>知り合います</rb><rt>しりあいます</rt></ruby>",furigana:"しりあいます",rom:"shiriai masu",id:"berkenalan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>自信を</rb><rt>じしんを</rt></ruby>）もちます",furigana:"（じしんを）もちます",rom:"(jishin o) mochimasu",id:"memiliki (kepercayaan diri)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>責任を</rb><rt>せきにんを</rt></ruby>）もちます",furigana:"（せきにんを）もちます",rom:"(sekinin o) mochimasu",id:"memiliki (tanggung jawab)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>我慢します</rb><rt>がまんします</rt></ruby>",furigana:"がまんします",rom:"gaman shimasu",id:"sabar",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>緊張します</rb><rt>きんちょうします</rt></ruby>",furigana:"きんちょうします",rom:"kinchō shimasu",id:"gugup",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>応援します</rb><rt>おうえんします</rt></ruby>",furigana:"おうえんします",rom:"ōen shimasu",id:"mendukung",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"うらやましい",furigana:"うらやましい",rom:"urayamashii",id:"iri",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>懐かしい</rb><rt>なつかしい</rt></ruby>",furigana:"なつかしい",rom:"natsukashii",id:"rindu",cat:"Kata Sifat",lv:"core",grp:"i"},
    {jp:"<ruby><rb>嫌</rb><rt>いや</rt></ruby>（な）",furigana:"いや（な）",rom:"iya (na)",id:"tidak mau; enggan",cat:"Kata Sifat",lv:"core",grp:"na"},
    {jp:"<ruby><rb>恋人</rb><rt>こいびと</rt></ruby>",furigana:"こいびと",rom:"koibito",id:"kekasih; pacar",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>関係</rb><rt>かんけい</rt></ruby>",furigana:"かんけい",rom:"kankei",id:"hubungan",cat:"Kata Benda",lv:"core"},
    {jp:"ファイル",furigana:"ファイル",rom:"fairu",id:"file; berkas",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>塾</rb><rt>じゅく</rt></ruby>",furigana:"じゅく",rom:"juku",id:"bimbingan belajar",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>化粧</rb><rt>けしょう</rt></ruby>",furigana:"けしょう",rom:"keshō",id:"dandan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>自然</rb><rt>しぜん</rt></ruby>",furigana:"しぜん",rom:"shizen",id:"alam",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>自信</rb><rt>じしん</rt></ruby>",furigana:"じしん",rom:"jishin",id:"kepercayaan diri",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>責任</rb><rt>せきにん</rt></ruby>",furigana:"せきにん",rom:"sekinin",id:"tanggung jawab",cat:"Kata Benda",lv:"core"},
    {jp:"それまでに",furigana:"それまでに",rom:"sore made ni",id:"sampai saat itu",cat:"Kata Keterangan",lv:"core"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 77 — 尊敬語 (Kata Kerja Bahasa Hormat)
// ─────────────────────────────────────────────────
{
  num: 77,
  title: "尊敬語 (Kata Kerja Bahasa Hormat)",
  sub: "Menghormati orang yang melakukan tindakan",
  color: "bab-77",
  tips: [
    {icon:"👑", title:"<ruby><rb>尊敬語</rb><rt>そんけいご</rt></ruby> — menghormati pelaku tindakan", points:[
      "Kata kerja ini menunjukkan rasa hormat terhadap orang yang melakukan tindakan atau dalam keadaan yang disebutkan.",
      "<b>Cara umum</b>: bentuk sama seperti kata kerja pasif → terkonjugasi sebagai <b>grup II</b>.",
      "Grup I: ～られます (ききます→きかれます、よみます→よまれます). Grup II: ～られます (かけます→かけられます). Grup III: きます→こられます、します→されます.",
      "Digunakan saat berbicara tentang tindakan orang yang statusnya lebih tinggi dalam hierarki sosial."
    ]},
    {icon:"🎩", title:"お/ご〜に なります & お/ご〜ください", points:[
      "<b>お (KK stem-ます) に なります</b>: lebih sopan dari <ruby><rb>尊敬語</rb><rt>そんけいご</rt></ruby> biasa. Contoh: せんせいが <b>おかえりに なります</b>.",
      "<b>お (KK stem-ます) ください</b>: setara dengan 〜てください tapi lebih sopan. Contoh: どうぞ <b>おはいり ください</b>.",
      "Grup III dan KK satu suku kata (みます、ねます、います) tidak bisa diubah ke bentuk お〜に なります.",
      "<b>Ungkapan khusus</b>: いきます/きます/います→いらっしゃいます, たべます/のみます→めしあがります, いいます→おっしゃいます, しっています→ごぞんじです, みます→ごらんになります."
    ]},
    {icon:"🌸", title:"お/ご — awalan hormat pada KB & KS", points:[
      "<b>お</b>: awalan untuk kosakata asli Jepang. Contoh: おくに、おなまえ、おしごと、おへや、おたく.",
      "<b>ご</b>: awalan untuk kosakata asal Cina. Contoh: ごかぞく、ごじゅうしょ、ごりょうしん、ごちゅうい.",
      "Juga pada kata sifat: おいそがしい、おわかい、おひま、おすき / ごねっしん、ごしんせつ、ごていねい、ごじゆう.",
      "⚠️ Beberapa kata sudah punya awalan tetap: おちゃ、おかね — bukan bentuk hormat."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "尊敬語 (Kata Kerja Bahasa Hormat)",
      pattern: "Grup I/II: ～られます / Grup III: こられます・されます",
      desc: "Kata kerja ini menunjukkan rasa hormat terhadap orang yang melakukan tindakan atau dalam keadaan yang disebutkan. Bentuk perubahannya sama seperti kata kerja bentuk pasif dan terkonjugasi sebagai kata kerja grup II.",
      note: {type:"blue", text:"<b>Tabel:</b> Grup I: ききます→きかれます、いきます→いかれます、よみます→よまれます、かえります→かえられます、あいます→あわれます、はなします→はなされます. Grup II: かけます→かけられます、でます→でられます、やめます→やめられます. Grup III: きます→こられます、します→されます"},
      reibun: [
        {jp:"<ruby><rb>社長</rb><rt>しゃちょう</rt></ruby>は 9<ruby><rb>時</rb><rt>じ</rt></ruby><ruby><rb>半</rb><rt>はん</rt></ruby>に <ruby><rb>来られます</rb><rt>こられます</rt></ruby>。", rom:"Shachō wa ku-ji han ni koraremasu.", id:"Direktur akan datang jam setengah sepuluh."},
        {jp:"<ruby><rb>部長</rb><rt>ぶちょう</rt></ruby>は <ruby><rb>来週</rb><rt>らいしゅう</rt></ruby> インドに <ruby><rb>出張</rb><rt>しゅっちょう</rt></ruby><ruby><rb>されます</rb><rt>されます</rt></ruby>。どちらに <ruby><rb>行かれます</rb><rt>いかれます</rt></ruby>か。", rom:"Buchō wa raishū Indo ni shutchō saremasu. Dochira ni ikaremasu ka.", id:"Kepala bagian akan dinas ke India minggu depan. Ke mana tepatnya?"}
      ]
    },
    {
      tag: "B", label: "お(KK bentuk ます) に なります",
      pattern: "お + KK [stem-ます] + に なります",
      desc: "Bentuk ini umumnya dianggap lebih sopan daripada kata kerja bahasa hormat (<ruby><rb>尊敬語</rb><rt>そんけいご</rt></ruby>). Kata kerja grup III dan kata kerja bentuk ます yang terdiri dari satu suku kata, seperti みます, ねます, dan います, tidak dapat dirubah ke bentuk ini.",
      reibun: [
        {jp:"<ruby><rb>先生</rb><rt>せんせい</rt></ruby>が お<ruby><rb>帰り</rb><rt>かえり</rt></ruby>に なります。", rom:"Sensei ga okaeri ni narimasu.", id:"Guru akan pulang."},
        {jp:"これは <ruby><rb>部長</rb><rt>ぶちょう</rt></ruby>の <ruby><rb>奥様</rb><rt>おくさま</rt></ruby>が お<ruby><rb>作り</rb><rt>つくり</rt></ruby>に なった <ruby><rb>料理</rb><rt>りょうり</rt></ruby>です。", rom:"Kore wa buchō no okusan ga otsukuri ni natta ryōri desu.", id:"Ini adalah masakan yang dibuat oleh istri kepala bagian."},
        {jp:"<ruby><rb>銀行</rb><rt>ぎんこう</rt></ruby>の <ruby><rb>場所</rb><rt>ばしょ</rt></ruby>が お<ruby><rb>わかり</rb><rt>わかり</rt></ruby>に なりますか。", rom:"Ginkō no basho ga owakari ni narimasu ka.", id:"Apakah Anda tahu di mana lokasi banknya?"}
      ]
    },
    {
      tag: "C", label: "お/ご(KK bentuk ます) ください",
      pattern: "お + KK [stem-ます] / ご + KB + ください",
      desc: "Pola kalimat ini setara dengan KK bentuk てください. Kata kerja grup I dan II menjadi お(KK bentuk ます ください). Sedangkan kata kerja grup III menjadi ご(KB) ください.",
      reibun: [
        {jp:"どうぞ お<ruby><rb>入り</rb><rt>はいり</rt></ruby> ください。", rom:"Dōzo ohairi kudasai.", id:"Silakan masuk."},
        {jp:"しばらく お<ruby><rb>待ち</rb><rt>まち</rt></ruby> ください。", rom:"Shibaraku omachi kudasai.", id:"Mohon tunggu sebentar."},
        {jp:"<ruby><rb>忘れ物</rb><rt>わすれもの</rt></ruby>に ご<ruby><rb>注意</rb><rt>ちゅうい</rt></ruby> ください。", rom:"Wasuremono ni gochūi kudasai.", id:"Mohon perhatikan barang bawaan Anda."}
      ]
    },
    {
      tag: "D", label: "Ungkapan Khusus Bentuk Hormat",
      pattern: "Kata kerja khusus yang menunjukkan rasa hormat",
      desc: "Beberapa kata kerja memiliki bentuk khusus yang menunjukkan tingkat rasa hormat.",
      note: {type:"blue", text:"いきます・きます・います → <b>いらっしゃいます</b><br>たべます・のみます → <b>めしあがります</b><br>いいます → <b>おっしゃいます</b><br>しっています → <b>ごぞんじです</b><br>みます → <b>ごらんになります</b><br>します → <b>なさいます</b><br>くれます → <b>くださいます</b>"},
      reibun: [
        {jp:"<ruby><rb>社長</rb><rt>しゃちょう</rt></ruby>は <ruby><rb>会議室</rb><rt>かいぎしつ</rt></ruby>に いらっしゃいます。", rom:"Shachō wa kaigishitsu ni irasshaimasu.", id:"Direktur sedang berada di ruang rapat."},
        {jp:"<ruby><rb>部長</rb><rt>ぶちょう</rt></ruby>は <ruby><rb>来週</rb><rt>らいしゅう</rt></ruby> インドに <ruby><rb>出張</rb><rt>しゅっちょう</rt></ruby>されます。どちらに <ruby><rb>行かれます</rb><rt>いかれます</rt></ruby>か。", rom:"Buchō wa raishū Indo ni shutchō saremasu. Dochira ni ikaremasu ka.", id:"Kepala bagian dinas ke India minggu depan. Ke kota mana?"}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>遠慮します</rb><rt>えんりょします</rt></ruby>",furigana:"えんりょします",rom:"enryo shimasu",id:"segan; sungkan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>写真撮影</rb><rt>しゃしんさつえい</rt></ruby>",furigana:"しゃしんさつえい",rom:"shashin satsuei",id:"fotografi; mengambil foto",cat:"Kata Benda",lv:"core"},
    {jp:"※K-pop",furigana:"ケー・ポップ",rom:"K-pop",id:"musik pop Korea",cat:"Kata Benda",lv:"extra"},
    {jp:"いかがですか",furigana:"いかがですか",rom:"ikaga desu ka",id:"Apakah Anda suka?",cat:"Ekspresi",lv:"core"},
    {jp:"いらっしゃいます",furigana:"いらっしゃいます",rom:"irasshaimasu",id:"ada; pergi; datang (bentuk hormat dari います/いきます/きます)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"めしあがります",furigana:"めしあがります",rom:"meshiagarimasu",id:"makan; minum (bentuk hormat dari たべます/のみます)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"おっしゃいます",furigana:"おっしゃいます",rom:"osshaimasu",id:"berkata (bentuk hormat dari いいます)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"ごぞんじです",furigana:"ごぞんじです",rom:"gozonji desu",id:"mengetahui (bentuk hormat dari しっています)",cat:"Ekspresi",lv:"core"},
    {jp:"ごらんになります",furigana:"ごらんになります",rom:"goran ni narimasu",id:"melihat (bentuk hormat dari みます)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"なさいます",furigana:"なさいます",rom:"nasaimasu",id:"melakukan (bentuk hormat dari します)",cat:"Kata Kerja",lv:"core",grp:"I"}
  ]
},
// ─────────────────────────────────────────────────
// BAB 78 — 謙譲語 (Ungkapan Merendahkan Diri)
// ─────────────────────────────────────────────────
{
  num: 78,
  title: "謙譲語 (Ungkapan Merendahkan Diri)",
  sub: "Merendahkan tindakan diri sendiri untuk menghormati lawan bicara",
  color: "bab-78",
  tips: [
    {icon:"🙇", title:"<ruby><rb>謙譲語</rb><rt>けんじょうご</rt></ruby> — cara merendahkan diri", points:[
      "Digunakan saat berbicara dengan seseorang yang dihormati tentang tindakan yang dilakukan oleh pembicara sendiri.",
      "<b>Cara umum</b>: KK grup I & II → お〜します. Contoh: おくります→おおくりします、もちます→おもちします.",
      "<b>Grup III khusus</b>: あんないします→ごあんないします、しょうかいします→ごしょうかいします、れんらくします→ごれんらくします.",
      "Contoh: <ruby><rb>今月</rb><rt>こんげつ</rt></ruby>の スケジュールを <b>おおくりします</b> → Saya akan mengirimkan jadwal bulan ini."
    ]},
    {icon:"📋", title:"Ungkapan Khusus <ruby><rb>謙譲語</rb><rt>けんじょうご</rt></ruby>", points:[
      "いきます・きます → <b>まいります</b>",
      "います → <b>おります</b>",
      "たべます・のみます・もらいます → <b>いただきます</b>",
      "いいます → <b>もうします</b>",
      "しっています → <b>ぞんじております</b> / しりません → <b>ぞんじません</b>",
      "みます → <b>はいけんします</b>",
      "します → <b>いたします</b>",
      "きます/(うちへ)いきます → <b>うかがいます</b>",
      "あいます → <b>おめにかかります</b>"
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "謙譲語 (Ungkapan Merendahkan Diri)",
      pattern: "お + KK [stem-ます] + します (Grup I/II) / ご + KB + します (Grup III)",
      desc: "Bentuk ini digunakan pada saat berbicara dengan seseorang yang dihormati tentang tindakan yang dilakukan oleh pembicara. Tindakan tersebut dinyatakan dengan kata kerja bentuk ます grup I dan II yang perubahannnya menjadi お〜します. Sedangkan grup III seperti あんないします、しょうかいします、しょうたいします yang perubahannya menjadi ご〜します.",
      reibun: [
        {jp:"<ruby><rb>今月</rb><rt>こんげつ</rt></ruby>の スケジュールを お<ruby><rb>送り</rb><rt>おく</rt></ruby>りします。", rom:"Kongetsu no sukejūru o ooksuri shimasu.", id:"Saya akan mengirimkan jadwal bulan ini."},
        {jp:"<ruby><rb>重</rb><rt>おも</rt></ruby>そうですね。お<ruby><rb>持ち</rb><rt>も</rt></ruby>ちしましょうか。", rom:"Omosō desu ne. Omochi shimashō ka.", id:"Kelihatannya berat ya. Bolehkah saya membawakan?"},
        {jp:"<ruby><rb>日本</rb><rt>にほん</rt></ruby>へ いらっしゃったら、<ruby><rb>東京</rb><rt>とうきょう</rt></ruby>を ご<ruby><rb>案内</rb><rt>あんない</rt></ruby>します。", rom:"Nihon e irasshattara, Tōkyō o goannai shimasu.", id:"Jika Anda datang ke Jepang, saya akan memandu Anda keliling Tokyo."}
      ]
    },
    {
      tag: "B", label: "Ungkapan Khusus Merendahkan Diri",
      pattern: "Kata kerja khusus yang merendahkan tindakan pembicara",
      desc: "Beberapa kata kerja memiliki bentuk khusus.",
      note: {type:"blue", text:"いきます・きます → <b>まいります</b><br>います → <b>おります</b><br>たべます・のみます・もらいます → <b>いただきます</b><br>いいます → <b>もうします</b><br>しっています → <b>ぞんじております</b><br>しりません → <b>ぞんじません</b><br>みます → <b>はいけんします</b><br>します → <b>いたします</b><br>きます/(うちへ)いきます → <b>うかがいます</b><br>あいます → <b>おめにかかります</b>"},
      reibun: [
        {jp:"わたしは <ruby><rb>鈴木</rb><rt>すずき</rt></ruby>と <ruby><rb>申します</rb><rt>もうします</rt></ruby>。", rom:"Watashi wa Suzuki to mōshimasu.", id:"Nama saya Suzuki (cara merendahkan diri)."},
        {jp:"<ruby><rb>社長</rb><rt>しゃちょう</rt></ruby>は <ruby><rb>会議室</rb><rt>かいぎしつ</rt></ruby>に いらっしゃいます。", rom:"Shachō wa kaigishitsu ni irasshaimasu.", id:"Direktur sedang di ruang rapat (hormat)."},
        {jp:"<ruby><rb>明日</rb><rt>あした</rt></ruby> 3<ruby><rb>時</rb><rt>じ</rt></ruby>に お<ruby><rb>宅</rb><rt>たく</rt></ruby>に <ruby><rb>伺います</rb><rt>うかがいます</rt></ruby>。", rom:"Ashita sanji ni otaku ni ukagaimasu.", id:"Besok jam 3 saya akan berkunjung ke rumah Anda."}
      ]
    }
  ],
  kotoba: [
    {jp:"※こぼします",furigana:"こぼします",rom:"koboshimasu",id:"menumpahkan",cat:"Kata Kerja",lv:"extra",grp:"I"},
    {jp:"※<ruby><rb>拭きます</rb><rt>ふきます</rt></ruby>",furigana:"ふきます",rom:"fukimasu",id:"mengelap; mengepel",cat:"Kata Kerja",lv:"extra",grp:"I"},
    {jp:"※<ruby><rb>助かります</rb><rt>たすかります</rt></ruby>",furigana:"たすかります",rom:"tasukarimasu",id:"terbantu",cat:"Kata Kerja",lv:"extra",grp:"I"},
    {jp:"まいります",furigana:"まいります",rom:"mairimasu",id:"pergi; datang (bentuk rendah dari いきます/きます)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"おります",furigana:"おります",rom:"orimasu",id:"ada (bentuk rendah dari います)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"もうします",furigana:"もうします",rom:"mōshimasu",id:"berkata; bernama (bentuk rendah dari いいます)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"ぞんじております",furigana:"ぞんじております",rom:"zonjite orimasu",id:"mengetahui (bentuk rendah dari しっています)",cat:"Ekspresi",lv:"core"},
    {jp:"ぞんじません",furigana:"ぞんじません",rom:"zonjimasen",id:"tidak mengetahui (bentuk rendah dari しりません)",cat:"Ekspresi",lv:"core"},
    {jp:"はいけんします",furigana:"はいけんします",rom:"haiken shimasu",id:"melihat (bentuk rendah dari みます)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"いたします",furigana:"いたします",rom:"itashimasu",id:"melakukan (bentuk rendah dari します)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"うかがいます",furigana:"うかがいます",rom:"ukagaimasu",id:"berkunjung; menuju (bentuk rendah dari きます/いきます)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"おめにかかります",furigana:"おめにかかります",rom:"ome ni kakarimasu",id:"bertemu (bentuk rendah dari あいます)",cat:"Kata Kerja",lv:"core",grp:"I"}
  ]
}
];

