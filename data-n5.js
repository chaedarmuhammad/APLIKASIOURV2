// ========== DATA ==========
const BABS = [
{
  num: 1,
  title: "Perkenalan Diri",
  sub: "KB は KB です / じゃ ありません / ですか / の",
  color: "bab-1",
  tips: [
    {icon:"💡", title:"Tips: Partikel は vs が", text:"Partikel <b>は</b> (wa) menandai TOPIK kalimat, sedangkan <b>が</b> (ga) menandai SUBJEK. Dalam perkenalan diri, gunakan は: わたし<b>は</b>〜です. Ingat: は dibaca 'wa' bukan 'ha' ketika digunakan sebagai partikel!"},
    {icon:"⚠️", title:"Hati-hati: じゃ vs では", text:"<b>じゃ ありません</b> = percakapan sehari-hari (informal). <b>では ありません</b> = tulisan formal / pidato. Keduanya berarti 'bukan ~', pilih sesuai situasi!"},
    {icon:"🔢", title:"Angka 1-99: Pola Mudah", text:"Angka 1-10: いち, に, さん, よん/し, ご, ろく, なな/しち, はち, きゅう/く, じゅう. Puluhan: に<b>じゅう</b>(20), さん<b>じゅう</b>(30), よん<b>じゅう</b>(40), ご<b>じゅう</b>(50), ろく<b>じゅう</b>(60), なな<b>じゅう</b>(70), はち<b>じゅう</b>(80), きゅう<b>じゅう</b>(90). Kombinasi: にじゅういち = 21, さんじゅうご = 35."}
  ],
  bunpou: [
    {
      tag: "A", label: "KB₁ は KB₂ です",
      pattern: "KB₁ は KB₂ です",
      desc: "Partikel は menunjukkan bahwa kata benda (KB₁) sebelum は adalah topik kalimat. Kata benda yang digunakan dengan です berfungsi sebagai predikat. Selain menunjukkan penilaian atau penegasan, です juga menunjukkan kesopanan terhadap lawan bicara.",
      reibun: [
        {jp:"わたしは <ruby><rb>銀行員</rb><rt>ぎんこういん</rt></ruby>です。", rom:"Watashi wa ginkōin desu.", id:"Saya adalah pegawai bank."},
        {jp:"わたしは <ruby><rb>韓国人</rb><rt>かんこくじん</rt></ruby>です。", rom:"Watashi wa kankokujin desu.", id:"Saya adalah orang Korea Selatan."},
        {jp:"<ruby><rb>田中</rb><rt>たなか</rt></ruby>さんは <ruby><rb>先生</rb><rt>せんせい</rt></ruby>です。<ruby><rb>鈴木</rb><rt>すずき</rt></ruby>さんも <ruby><rb>先生</rb><rt>せんせい</rt></ruby>です。", rom:"Tanaka san wa sensei desu. Suzuki san mo sensei desu.", id:"Tanaka adalah guru. Suzuki juga guru. (※〜も: juga)"}
      ]
    },
    {
      tag: "B", label: "KB₁ は KB₂ じゃ（では） ありません",
      pattern: "KB₁ は KB₂ じゃ ありません",
      desc: "じゃ ありません adalah bentuk negatif dari です. じゃ ありません sering digunakan dalam percakapan sehari-hari, sedangkan では ありません digunakan dalam pidato dan tulisan formal.",
      reibun: [
        {jp:"わたしは <ruby><rb>医者</rb><rt>いしゃ</rt></ruby>じゃ ありません。", rom:"Watashi wa isha ja arimasen.", id:"Saya bukan dokter."},
        {jp:"わたしは <ruby><rb>日本人</rb><rt>にほんじん</rt></ruby>じゃ ありません。", rom:"Watashi wa nihonjin ja arimasen.", id:"Saya bukan orang Jepang."},
        {jp:"<ruby><rb>田中</rb><rt>たなか</rt></ruby>さんは <ruby><rb>学生</rb><rt>がくせい</rt></ruby>では ありません。", rom:"Tanaka san wa gakusei de wa arimasen.", id:"Tanaka bukan siswa."}
      ]
    },
    {
      tag: "C", label: "KB₁ は KB₂ ですか",
      pattern: "KB₁ は KB₂ ですか",
      desc: "Partikel か digunakan untuk menyatakan ketidakpastian, keraguan, dll. di pihak pembicara. Sebuah pertanyaan dapat dibentuk dengan menambahkan か di akhir kalimat. Sebuah pertanyaan biasanya diakhiri dengan intonasi yang meninggi.",
      reibun: [
        {jp:"リーさんは <ruby><rb>学生</rb><rt>がくせい</rt></ruby>ですか。", rom:"Rī san wa gakusei desu ka.", id:"Apakah Lee adalah siswa?"},
        {jp:"ジョンさんは <ruby><rb>イギリス人</rb><rt>イギリスじん</rt></ruby>ですか。", rom:"Jon san wa Igirisujin desu ka.", id:"Apakah John orang Inggris?"},
        {jp:"<ruby><rb>事務室</rb><rt>じむしつ</rt></ruby>は ２<ruby><rb>階</rb><rt>かい</rt></ruby>ですか。", rom:"Jimu shitsu wa ni kai desu ka.", id:"Apakah kantor ada di lantai 2?"}
      ]
    },
    {
      tag: "D", label: "KB₁ の KB₂",
      pattern: "KB₁ の KB₂",
      desc: "Ketika kata benda (KB₁) memodifikasi kata benda (KB₂) setelahnya, の digunakan untuk menghubungkan dua kata benda.",
      reibun: [
        {jp:"あの <ruby><rb>人</rb><rt>ひと</rt></ruby>は PWカンパニーの <ruby><rb>社員</rb><rt>しゃいん</rt></ruby>です。", rom:"Ano hito wa PW kanpanī no shain desu.", id:"Orang itu adalah karyawan perusahaan PW."},
        {jp:"<ruby><rb>田中</rb><rt>たなか</rt></ruby>さんは <ruby><rb>日本語</rb><rt>にほんご</rt></ruby>の <ruby><rb>先生</rb><rt>せんせい</rt></ruby>です。", rom:"Tanaka san wa nihongo no sensei desu.", id:"Tanaka adalah guru bahasa Jepang."},
        {jp:"<ruby><rb>山田</rb><rt>やまだ</rt></ruby>さんは <ruby><rb>富士病院</rb><rt>ふじびょういん</rt></ruby>の <ruby><rb>医者</rb><rt>いしゃ</rt></ruby>です。", rom:"Yamada san wa Fuji Byōin no isha desu.", id:"Yamada adalah dokter di Rumah Sakit Fuji."}
      ]
    }
  ],
  kotoba: [
    {jp:"わたし",furigana:"",rom:"watashi",id:"saya",cat:"Kata Benda",lv:"core"},
    {jp:"あなた",furigana:"",rom:"anata",id:"Anda",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>皆</rb><rt>みな</rt></ruby>さん",furigana:"みなさん",rom:"minasan",id:"Anda sekalian",cat:"Kata Benda",lv:"core"},
    {jp:"あの<ruby><rb>人</rb><rt>ひと</rt></ruby>",furigana:"あのひと",rom:"ano hito",id:"orang itu; dia",cat:"Kata Benda",lv:"core"},
    {jp:"〜さん",furigana:"",rom:"~san",id:"~ san (akhiran untuk mengekspresikan kesopanan)",cat:"Ekspresi",lv:"core"},
    {jp:"〜<ruby><rb>人</rb><rt>じん</rt></ruby>",furigana:"〜じん",rom:"~jin",id:"orang ~ (akhiran yang berarti warga negara)",cat:"Ekspresi",lv:"core"},
    {jp:"〜<ruby><rb>歳</rb><rt>さい</rt></ruby>",furigana:"〜さい",rom:"~sai",id:"~ tahun (umur)",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>名前</rb><rt>なまえ</rt></ruby>",furigana:"なまえ",rom:"namae",id:"nama",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>医者</rb><rt>いしゃ</rt></ruby>",furigana:"いしゃ",rom:"isha",id:"dokter",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>会社員</rb><rt>かいしゃいん</rt></ruby>",furigana:"かいしゃいん",rom:"kaishain",id:"karyawan perusahaan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>学生</rb><rt>がくせい</rt></ruby>",furigana:"がくせい",rom:"gakusei",id:"siswa",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>銀行員</rb><rt>ぎんこういん</rt></ruby>",furigana:"ぎんこういん",rom:"ginkōin",id:"pegawai bank",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>研究者</rb><rt>けんきゅうしゃ</rt></ruby>",furigana:"けんきゅうしゃ",rom:"kenkyūsha",id:"peneliti",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>社員</rb><rt>しゃいん</rt></ruby>",furigana:"しゃいん",rom:"shain",id:"pegawai perusahaan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>先生</rb><rt>せんせい</rt></ruby>",furigana:"せんせい",rom:"sensei",id:"guru",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>大学</rb><rt>だいがく</rt></ruby>",furigana:"だいがく",rom:"daigaku",id:"universitas",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>病院</rb><rt>びょういん</rt></ruby>",furigana:"びょういん",rom:"byōin",id:"rumah sakit",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>事務室</rb><rt>じむしつ</rt></ruby>",furigana:"じむしつ",rom:"jimu shitsu",id:"kantor",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>午前</rb><rt>ごぜん</rt></ruby>",furigana:"ごぜん",rom:"gozen",id:"a.m. (waktu sebelum jam 12 siang)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>午後</rb><rt>ごご</rt></ruby>",furigana:"ごご",rom:"gogo",id:"p.m. (waktu setelah jam 12 siang)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>日本語</rb><rt>にほんご</rt></ruby>",furigana:"にほんご",rom:"nihongo",id:"bahasa Jepang",cat:"Kata Benda",lv:"core"},
    {jp:"はじめまして",furigana:"",rom:"hajimemashite",id:"Perkenalkan (ucapan salam pertama kali berkenalan)",cat:"Ekspresi",lv:"core"},
    {jp:"どうぞ、よろしくおねがいします",furigana:"",rom:"dōzo, yoroshiku onegai shimasu",id:"Salam kenal (ucapan salam saat mengakhiri perkenalan diri)",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>失礼</rb><rt>しつれい</rt></ruby>ですが",furigana:"しつれいですが",rom:"shitsurei desu ga",id:"permisi; tapi ~",cat:"Ekspresi",lv:"core"},
    {jp:"はい",furigana:"",rom:"hai",id:"iya",cat:"Ekspresi",lv:"core"},
    {jp:"いいえ",furigana:"",rom:"iie",id:"tidak",cat:"Ekspresi",lv:"core"},
    {jp:"だれ",furigana:"",rom:"dare",id:"siapa",cat:"Kata Tanya",lv:"core"},
    {jp:"<ruby><rb>何歳</rb><rt>なんさい</rt></ruby>",furigana:"なんさい",rom:"nan sai",id:"umur berapa",cat:"Kata Tanya",lv:"core"},
    {jp:"おいくつ",furigana:"",rom:"oikutsu",id:"umur berapa (bentuk sopan)",cat:"Kata Tanya",lv:"core"},
    {jp:"お<ruby><rb>名前</rb><rt>なまえ</rt></ruby>は？",furigana:"おなまえは？",rom:"onamae wa?",id:"Siapa nama Anda?",cat:"Ekspresi",lv:"core"},
    {jp:"〜<ruby><rb>階</rb><rt>かい</rt></ruby>",furigana:"〜かい",rom:"~kai",id:"lantai ~",cat:"Ekspresi",lv:"core"},
    {jp:"カンパニー",furigana:"",rom:"kanpanī",id:"perusahaan",cat:"Kata Benda",lv:"extra"},
    {jp:"クラス",furigana:"",rom:"kurasu",id:"kelas",cat:"Kata Benda",lv:"extra"},
    {jp:"アメリカ",furigana:"",rom:"Amerika",id:"Amerika",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>韓国</rb><rt>かんこく</rt></ruby>",furigana:"かんこく",rom:"Kankoku",id:"Korea Selatan",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>中国</rb><rt>ちゅうごく</rt></ruby>",furigana:"ちゅうごく",rom:"Chūgoku",id:"Cina",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>日本</rb><rt>にほん</rt></ruby>",furigana:"にほん",rom:"Nihon",id:"Jepang",cat:"Kata Benda",lv:"extra"},
    {jp:"イギリス",furigana:"",rom:"Igirisu",id:"Inggris",cat:"Kata Benda",lv:"extra"},
    {jp:"フィリピン",furigana:"",rom:"Firipin",id:"Filipina",cat:"Kata Benda",lv:"extra"},
    {jp:"ベトナム",furigana:"",rom:"Betonamu",id:"Vietnam",cat:"Kata Benda",lv:"extra"},
    {jp:"ミャンマー",furigana:"",rom:"Myānmā",id:"Myanmar",cat:"Kata Benda",lv:"extra"},
    {jp:"〜から<ruby><rb>来</rb><rt>き</rt></ruby>ました",furigana:"〜からきました",rom:"~kara kimashita",id:"(saya) datang dari ~",cat:"Ekspresi",lv:"core"}
  ]
},
{
  num: 2,
  title: "Kata Tunjuk Benda",
  sub: "これ / それ / あれ / この / その / あの",
  color: "bab-2",
  bunpou: [
    {
      tag: "A", label: "これ／それ／あれ",
      pattern: "これ / それ / あれ は KB です",
      desc: "これ, それ, dan あれ adalah kata tunjuk dan bekerja sebagai kata benda. これ mengacu pada sesuatu yang dekat dengan pembicara. それ mengacu pada sesuatu yang dekat dengan lawan bicara. あれ mengacu pada sesuatu yang jauh dari pembicara dan lawan bicara.",
      reibun: [
        {jp:"これは <ruby><rb>本</rb><rt>ほん</rt></ruby>です。", rom:"Kore wa hon desu.", id:"Ini adalah buku."},
        {jp:"それは <ruby><rb>何</rb><rt>なん</rt></ruby>ですか。", rom:"Sore wa nan desu ka.", id:"Itu apa?"},
        {jp:"あれは だれの かばんですか。", rom:"Are wa dare no kaban desu ka.", id:"Itu tas milik siapa?"}
      ]
    },
    {
      tag: "B", label: "KB₁ の KB₂",
      pattern: "KB₁ の KB₂",
      desc: "Ketika KB₁ menjelaskan KB₂, の digunakan. KB₁ bisa menjelaskan tentang apa itu KB₂, atau menjelaskan siapa yang memiliki KB₂. の dapat digunakan sebagai pengganti kata benda yang telah disebutkan.",
      reibun: [
        {jp:"これは パソコンの <ruby><rb>本</rb><rt>ほん</rt></ruby>です。", rom:"Kore wa pasokon no hon desu.", id:"Ini adalah buku tentang komputer."},
        {jp:"それは わたしの かばんです。", rom:"Sore wa watashi no kaban desu.", id:"Itu adalah tas saya."},
        {jp:"それは わたしの です。", rom:"Sore wa watashi no desu.", id:"Itu milik saya. (KB₂ dapat dihilangkan jika sudah jelas)"}
      ],
      note: {type:"amber", text:"<b>⚠️ の sebagai Pengganti Kata Benda (Pronominalisasi)</b><br>の bisa menggantikan kata benda yang sudah disebut agar tidak terulang. Contoh: <i>これは わたしの かばんです → これは わたしの です</i> (かばん dihilangkan karena sudah jelas dari konteks). Pola ini sangat umum dalam percakapan sehari-hari!"}
    },
    {
      tag: "C", label: "この／その／あの",
      pattern: "この / その / あの + KB",
      desc: "この, その dan あの memodifikasi kata benda. この mengacu pada benda dekat pembicara, その dekat lawan bicara, あの jauh dari keduanya.",
      reibun: [
        {jp:"この <ruby><rb>辞書</rb><rt>じしょ</rt></ruby>は わたしの です。", rom:"Kono jisho wa watashi no desu.", id:"Kamus ini milik saya."},
        {jp:"その ノートは リーさんの です。", rom:"Sono nōto wa Rī san no desu.", id:"Buku catatan itu milik Lee."},
        {jp:"あの かさは だれの ですか。", rom:"Ano kasa wa dare no desu ka.", id:"Payung itu milik siapa?"}
      ]
    }
  ],
  kotoba: [
    {jp:"これ",furigana:"",rom:"kore",id:"ini (dekat pembicara)",cat:"Kata Tunjuk",lv:"core"},
    {jp:"それ",furigana:"",rom:"sore",id:"itu (dekat lawan bicara)",cat:"Kata Tunjuk",lv:"core"},
    {jp:"あれ",furigana:"",rom:"are",id:"itu (jauh dari pembicara dan lawan bicara)",cat:"Kata Tunjuk",lv:"core"},
    {jp:"この",furigana:"",rom:"kono",id:"~ ini (dekat pembicara)",cat:"Kata Tunjuk",lv:"core"},
    {jp:"その",furigana:"",rom:"sono",id:"~ itu (dekat lawan bicara)",cat:"Kata Tunjuk",lv:"core"},
    {jp:"あの",furigana:"",rom:"ano",id:"~ itu (jauh dari pembicara dan lawan bicara)",cat:"Kata Tunjuk",lv:"core"},
    {jp:"<ruby><rb>本</rb><rt>ほん</rt></ruby>",furigana:"ほん",rom:"hon",id:"buku",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>辞書</rb><rt>じしょ</rt></ruby>",furigana:"じしょ",rom:"jisho",id:"kamus",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>新聞</rb><rt>しんぶん</rt></ruby>",furigana:"しんぶん",rom:"shinbun",id:"koran",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>名刺</rb><rt>めいし</rt></ruby>",furigana:"めいし",rom:"meishi",id:"kartu nama",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>雑誌</rb><rt>ざっし</rt></ruby>",furigana:"ざっし",rom:"zasshi",id:"majalah",cat:"Kata Benda",lv:"core"},
    {jp:"ノート",furigana:"",rom:"nōto",id:"buku catatan",cat:"Kata Benda",lv:"core"},
    {jp:"カード",furigana:"",rom:"kādo",id:"kartu",cat:"Kata Benda",lv:"core"},
    {jp:"えんぴつ",furigana:"",rom:"enpitsu",id:"pensil",cat:"Kata Benda",lv:"core"},
    {jp:"ボールペン",furigana:"",rom:"bōrupen",id:"pulpen",cat:"Kata Benda",lv:"core"},
    {jp:"シャープペンシル",furigana:"",rom:"shāpu penshiru",id:"pensil mekanik",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>鍵</rb><rt>かぎ</rt></ruby>",furigana:"かぎ",rom:"kagi",id:"kunci",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>傘</rb><rt>かさ</rt></ruby>",furigana:"かさ",rom:"kasa",id:"payung",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>時計</rb><rt>とけい</rt></ruby>",furigana:"とけい",rom:"tokei",id:"jam",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>鞄</rb><rt>かばん</rt></ruby>",furigana:"かばん",rom:"kaban",id:"tas",cat:"Kata Benda",lv:"core"},
    {jp:"テレビ",furigana:"",rom:"terebi",id:"TV",cat:"Kata Benda",lv:"core"},
    {jp:"カメラ",furigana:"",rom:"kamera",id:"kamera",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>携帯電話</rb><rt>けいたいでんわ</rt></ruby>",furigana:"けいたいでんわ",rom:"keitai denwa",id:"ponsel",cat:"Kata Benda",lv:"core"},
    {jp:"パソコン",furigana:"",rom:"pasokon",id:"laptop",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>自動車</rb><rt>じどうしゃ</rt></ruby>",furigana:"じどうしゃ",rom:"jidōsha",id:"mobil",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>机</rb><rt>つくえ</rt></ruby>",furigana:"つくえ",rom:"tsukue",id:"meja",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>椅子</rb><rt>いす</rt></ruby>",furigana:"いす",rom:"isu",id:"kursi",cat:"Kata Benda",lv:"core"},
    {jp:"コーヒー",furigana:"",rom:"kōhī",id:"kopi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>英語</rb><rt>えいご</rt></ruby>",furigana:"えいご",rom:"eigo",id:"bahasa Inggris",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>何</rb><rt>なん</rt></ruby>",furigana:"なん",rom:"nan",id:"apa",cat:"Kata Tanya",lv:"core"},
    {jp:"チョコレート",furigana:"",rom:"chokoreeto",id:"cokelat",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>家</rb><rt>うち</rt></ruby>",furigana:"うち",rom:"uchi",id:"rumah",cat:"Kata Benda",lv:"core"},
    {jp:"〜<ruby><rb>語</rb><rt>ご</rt></ruby>",furigana:"〜ご",rom:"~go",id:"bahasa ~",cat:"Ekspresi",lv:"core"},
    {jp:"タイ<ruby><rb>語</rb><rt>ご</rt></ruby>",furigana:"タイご",rom:"Taigo",id:"bahasa Thailand",cat:"Kata Benda",lv:"extra"},
    {jp:"ブラジル",furigana:"",rom:"Burajiru",id:"Brazil",cat:"Kata Benda",lv:"extra"}
  ]
},
{
  num: 3,
  title: "Kata Tunjuk Tempat",
  sub: "ここ / そこ / あそこ / どこ",
  color: "bab-3",
  bunpou: [
    {
      tag: "A", label: "ここ／そこ／あそこ／どこ",
      pattern: "ここ / そこ / あそこ は KB です",
      desc: "Kata tunjuk ここ, そこ dan あそこ mengacu pada tempat. ここ menunjukkan tempat di mana pembicara berada. そこ menunjukkan tempat di mana lawan bicara berada. あそこ menunjukkan tempat yang jauh dari pembicara dan lawan bicara.",
      reibun: [
        {jp:"ここは <ruby><rb>教室</rb><rt>きょうしつ</rt></ruby>です。", rom:"Koko wa kyōshitsu desu.", id:"Di sini adalah ruang kelas."},
        {jp:"<ruby><rb>受付</rb><rt>うけつけ</rt></ruby>は あそこです。", rom:"Uketsuke wa asoko desu.", id:"Meja informasi ada di sana."},
        {jp:"<ruby><rb>事務室</rb><rt>じむしつ</rt></ruby>は どこですか。", rom:"Jimu shitsu wa doko desu ka.", id:"Di mana kantornya?"}
      ],
      note: {type:"blue", text:"<b>💡 KB は どこですか ― Menanyakan Lokasi</b><br>Pola ini digunakan untuk menanyakan di mana sesuatu berada. Jawaban bisa berupa kata tunjuk (ここ/そこ/あそこ) + です. Contoh: A: トイレは どこですか。B: あそこです。"}
    },
    {
      tag: "B", label: "こちら／そちら／あちら ― Bentuk Hormat",
      pattern: "こちら / そちら / あちら",
      desc: "こちら, そちら, あちら adalah bentuk hormat dari ここ, そこ, あそこ. Digunakan dalam situasi formal, misalnya di toko, kantor, atau saat berbicara dengan orang yang lebih tua.",
      reibun: [
        {jp:"エレベーターは あちらです。", rom:"Erebētā wa achira desu.", id:"Lift ada di sebelah sana."},
        {jp:"こちらへ どうぞ。", rom:"Kochira e dōzo.", id:"Silakan ke sini."}
      ],
      note: {type:"teal", text:"<b>⚠️ ここ vs こちら</b><br>ここ = di sini (lokasi tepat). こちら = sebelah sini (arah umum, lebih sopan). Gunakan こちら/そちら/あちら saat menunjuk arah secara hormat, terutama di tempat kerja atau dengan pelanggan."}
    }
  ],
  kotoba: [
    {jp:"ここ",furigana:"",rom:"koko",id:"di sini (dekat pembicara)",cat:"Kata Tunjuk",lv:"core"},
    {jp:"そこ",furigana:"",rom:"soko",id:"di situ (dekat lawan bicara)",cat:"Kata Tunjuk",lv:"core"},
    {jp:"あそこ",furigana:"",rom:"asoko",id:"di sana (jauh dari pembicara dan lawan bicara)",cat:"Kata Tunjuk",lv:"core"},
    {jp:"こちら",furigana:"",rom:"kochira",id:"sebelah sini (bentuk hormat dari ここ)",cat:"Kata Tunjuk",lv:"core"},
    {jp:"そちら",furigana:"",rom:"sochira",id:"sebelah situ (bentuk hormat dari そこ)",cat:"Kata Tunjuk",lv:"core"},
    {jp:"あちら",furigana:"",rom:"achira",id:"sebelah sana (bentuk hormat dari あそこ)",cat:"Kata Tunjuk",lv:"core"},
    {jp:"どこ",furigana:"",rom:"doko",id:"di mana",cat:"Kata Tanya",lv:"core"},
    {jp:"どちら",furigana:"",rom:"dochira",id:"di mana (bentuk hormat dari どこ)",cat:"Kata Tanya",lv:"core"},
    {jp:"<ruby><rb>教室</rb><rt>きょうしつ</rt></ruby>",furigana:"きょうしつ",rom:"kyōshitsu",id:"ruang kelas",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>食堂</rb><rt>しょくどう</rt></ruby>",furigana:"しょくどう",rom:"shokudō",id:"ruang makan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>学校</rb><rt>がっこう</rt></ruby>",furigana:"がっこう",rom:"gakkō",id:"sekolah",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>受付</rb><rt>うけつけ</rt></ruby>",furigana:"うけつけ",rom:"uketsuke",id:"meja informasi",cat:"Kata Benda",lv:"core"},
    {jp:"ロビー",furigana:"",rom:"robī",id:"ruang tunggu; lobi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>部屋</rb><rt>へや</rt></ruby>",furigana:"へや",rom:"heya",id:"kamar",cat:"Kata Benda",lv:"core"},
    {jp:"トイレ",furigana:"",rom:"toire",id:"toilet; kamar kecil",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>階段</rb><rt>かいだん</rt></ruby>",furigana:"かいだん",rom:"kaidan",id:"tangga",cat:"Kata Benda",lv:"core"},
    {jp:"エレベーター",furigana:"",rom:"erebētā",id:"lift",cat:"Kata Benda",lv:"core"},
    {jp:"エスカレーター",furigana:"",rom:"esukarētā",id:"eskalator; tangga berjalan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>会社</rb><rt>かいしゃ</rt></ruby>",furigana:"かいしゃ",rom:"kaisha",id:"perusahaan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>売り場</rb><rt>うりば</rt></ruby>",furigana:"うりば",rom:"uriba",id:"tempat penjualan",cat:"Kata Benda",lv:"core"},
    {jp:"デパート",furigana:"",rom:"depāto",id:"toserba",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>銀行</rb><rt>ぎんこう</rt></ruby>",furigana:"ぎんこう",rom:"ginkō",id:"bank",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>郵便局</rb><rt>ゆうびんきょく</rt></ruby>",furigana:"ゆうびんきょく",rom:"yūbinkyoku",id:"kantor pos",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>図書館</rb><rt>としょかん</rt></ruby>",furigana:"としょかん",rom:"toshokan",id:"perpustakaan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>美術館</rb><rt>びじゅつかん</rt></ruby>",furigana:"びじゅつかん",rom:"bijutsukan",id:"gedung kesenian",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>電話</rb><rt>でんわ</rt></ruby>",furigana:"でんわ",rom:"denwa",id:"telepon",cat:"Kata Benda",lv:"core"},
    {jp:"ちがいます",furigana:"",rom:"chigaimasu",id:"bukan; tidak; salah",cat:"Ekspresi",lv:"core"},
    {jp:"そうです",furigana:"",rom:"sō desu",id:"tepat sekali",cat:"Ekspresi",lv:"core"},
    {jp:"そうですか",furigana:"",rom:"sō desu ka",id:"oh, begitu",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>何階</rb><rt>なんがい</rt></ruby>",furigana:"なんがい",rom:"nan gai",id:"lantai berapa",cat:"Kata Tanya",lv:"core"},
    {jp:"<ruby><rb>美容院</rb><rt>びよういん</rt></ruby>",furigana:"びよういん",rom:"biyōin",id:"salon kecantikan",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>寮</rb><rt>りょう</rt></ruby>",furigana:"りょう",rom:"ryō",id:"asrama",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>事務所</rb><rt>じむしょ</rt></ruby>",furigana:"じむしょ",rom:"jimusho",id:"kantor",cat:"Kata Benda",lv:"extra"},
    {jp:"（お）<ruby><rb>国</rb><rt>くに</rt></ruby>",furigana:"（お）くに",rom:"(o)kuni",id:"negara; negeri",cat:"Kata Benda",lv:"core"},
    {jp:"インドネシア",furigana:"",rom:"Indoneshia",id:"Indonesia",cat:"Kata Benda",lv:"extra"},
    {jp:"ジャカルタ",furigana:"",rom:"Jakarta",id:"Jakarta",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>男</rb><rt>おとこ</rt></ruby>の<ruby><rb>人</rb><rt>ひと</rt></ruby>",furigana:"おとこのひと",rom:"otoko no hito",id:"pria",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>女</rb><rt>おんな</rt></ruby>の<ruby><rb>人</rb><rt>ひと</rt></ruby>",furigana:"おんなのひと",rom:"onna no hito",id:"wanita",cat:"Kata Benda",lv:"core"},
    {jp:"（どうも）ありがとうございます",furigana:"",rom:"(dōmo) arigatō gozaimasu",id:"terima kasih banyak",cat:"Ekspresi",lv:"core"},
    {jp:"あのう",furigana:"",rom:"anō",id:"permisi",cat:"Ekspresi",lv:"core"},
    {jp:"どうぞ",furigana:"",rom:"dōzo",id:"silakan",cat:"Ekspresi",lv:"core"},
    {jp:"コピー<ruby><rb>機</rb><rt>き</rt></ruby>",furigana:"コピーき",rom:"kopī ki",id:"mesin fotokopi",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>自動販売機</rb><rt>じどうはんばいき</rt></ruby>",furigana:"じどうはんばいき",rom:"jidōhanbaiki",id:"mesin jual otomatis",cat:"Kata Benda",lv:"extra"}
  ]
},
{
  num: 4,
  title: "Harga dan Bilangan Besar",
  sub: "〜は いくらですか / 100〜90000",
  color: "bab-4",
  tips: [
    {icon:"🔢", title:"Angka Besar: Pola Mudah", text:"<b>100</b>=ひゃく | <b>200</b>=に<b>ひゃく</b> | <b>300</b>=さん<b>びゃく</b>⚠️ | <b>600</b>=ろっ<b>ぴゃく</b>⚠️ | <b>800</b>=はっ<b>ぴゃく</b>⚠️ (ada perubahan bunyi!)<br><b>1000</b>=せん | <b>2000</b>=に<b>せん</b> | <b>3000</b>=さん<b>ぜん</b>⚠️ | <b>8000</b>=はっ<b>せん</b>⚠️<br><b>10000</b>=いちまん | <b>20000</b>=にまん | <b>30000</b>=さんまん"},
    {icon:"💡", title:"Tips Hafal Angka Istimewa", text:"Ingat: 3 angka istimewa di <ruby><rb>百</rb><rt>ひゃく</rt></ruby> (ratus): さん<b>びゃく</b> (300), ろっ<b>ぴゃく</b> (600), はっ<b>ぴゃく</b> (800) — ketiganya berubah bunyi dari び→び→ぴ. Dan <ruby><rb>千</rb><rt>せん</rt></ruby> (ribu): さん<b>ぜん</b>(3000) dan はっ<b>せん</b>(8000) berubah bunyi."}
  ],
  bunpou: [
    {
      tag: "A", label: "〜は いくらですか : Berapa harga 〜?",
      pattern: "KB は いくらですか",
      desc: "Frasa ini digunakan untuk menanyakan harga dari kata benda sebelum partikel は.",
      reibun: [
        {jp:"A：この <ruby><rb>辞書</rb><rt>じしょ</rt></ruby>は いくらですか。 B：3000<ruby><rb>円</rb><rt>えん</rt></ruby>です。", rom:"A: Kono jisho wa ikura desu ka. B: Sanzen en desu.", id:"A: Berapa harga kamus ini? B: 3000 yen."},
        {jp:"A：その カメラは いくらですか。 B：28,000<ruby><rb>円</rb><rt>えん</rt></ruby>です。", rom:"A: Sono kamera wa ikura desu ka. B: Niman hassennzen en desu.", id:"A: Berapa harga kamera itu? B: 28.000 yen."}
      ],
      note: {type:"blue", text:"<b>💡 Tabel Bilangan Besar (100–10.000):</b><br><table style='width:100%;font-size:0.78rem;border-collapse:collapse;margin-top:6px'><tr style='background:rgba(255,255,255,0.06)'><th style='padding:5px 8px;border:1px solid #2e2e40'>Angka</th><th style='padding:5px 8px;border:1px solid #2e2e40'>Bacaan</th><th style='padding:5px 8px;border:1px solid #2e2e40'>Angka</th><th style='padding:5px 8px;border:1px solid #2e2e40'>Bacaan</th></tr><tr><td style='padding:5px 8px;border:1px solid #2e2e40'>100</td><td style='padding:5px 8px;border:1px solid #2e2e40'>ひゃく</td><td style='padding:5px 8px;border:1px solid #2e2e40'>1.000</td><td style='padding:5px 8px;border:1px solid #2e2e40'>せん</td></tr><tr style='background:rgba(255,255,255,0.03)'><td style='padding:5px 8px;border:1px solid #2e2e40'>200</td><td style='padding:5px 8px;border:1px solid #2e2e40'>にひゃく</td><td style='padding:5px 8px;border:1px solid #2e2e40'>2.000</td><td style='padding:5px 8px;border:1px solid #2e2e40'>にせん</td></tr><tr><td style='padding:5px 8px;border:1px solid #2e2e40'>300 ⚠️</td><td style='padding:5px 8px;border:1px solid #2e2e40'><b>さんびゃく</b></td><td style='padding:5px 8px;border:1px solid #2e2e40'>3.000 ⚠️</td><td style='padding:5px 8px;border:1px solid #2e2e40'><b>さんぜん</b></td></tr><tr style='background:rgba(255,255,255,0.03)'><td style='padding:5px 8px;border:1px solid #2e2e40'>400</td><td style='padding:5px 8px;border:1px solid #2e2e40'>よんひゃく</td><td style='padding:5px 8px;border:1px solid #2e2e40'>4.000</td><td style='padding:5px 8px;border:1px solid #2e2e40'>よんせん</td></tr><tr><td style='padding:5px 8px;border:1px solid #2e2e40'>500</td><td style='padding:5px 8px;border:1px solid #2e2e40'>ごひゃく</td><td style='padding:5px 8px;border:1px solid #2e2e40'>5.000</td><td style='padding:5px 8px;border:1px solid #2e2e40'>ごせん</td></tr><tr style='background:rgba(255,255,255,0.03)'><td style='padding:5px 8px;border:1px solid #2e2e40'>600 ⚠️</td><td style='padding:5px 8px;border:1px solid #2e2e40'><b>ろっぴゃく</b></td><td style='padding:5px 8px;border:1px solid #2e2e40'>6.000</td><td style='padding:5px 8px;border:1px solid #2e2e40'>ろくせん</td></tr><tr><td style='padding:5px 8px;border:1px solid #2e2e40'>700</td><td style='padding:5px 8px;border:1px solid #2e2e40'>ななひゃく</td><td style='padding:5px 8px;border:1px solid #2e2e40'>7.000</td><td style='padding:5px 8px;border:1px solid #2e2e40'>ななせん</td></tr><tr style='background:rgba(255,255,255,0.03)'><td style='padding:5px 8px;border:1px solid #2e2e40'>800 ⚠️</td><td style='padding:5px 8px;border:1px solid #2e2e40'><b>はっぴゃく</b></td><td style='padding:5px 8px;border:1px solid #2e2e40'>8.000 ⚠️</td><td style='padding:5px 8px;border:1px solid #2e2e40'><b>はっせん</b></td></tr><tr><td style='padding:5px 8px;border:1px solid #2e2e40'>900</td><td style='padding:5px 8px;border:1px solid #2e2e40'>きゅうひゃく</td><td style='padding:5px 8px;border:1px solid #2e2e40'>9.000</td><td style='padding:5px 8px;border:1px solid #2e2e40'>きゅうせん</td></tr><tr style='background:rgba(96,165,250,0.08)'><td style='padding:5px 8px;border:1px solid #2e2e40' colspan='2'><b>10.000 = いちまん</b></td><td style='padding:5px 8px;border:1px solid #2e2e40' colspan='2'><b>100.000 = じゅうまん</b></td></tr></table><span style='font-size:0.73rem;color:var(--red)'>⚠️ = bunyi berubah, wajib dihapal!</span>"}
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>靴</rb><rt>くつ</rt></ruby>",furigana:"くつ",rom:"kutsu",id:"sepatu",cat:"Kata Benda",lv:"core"},
    {jp:"ネクタイ",furigana:"",rom:"nekutai",id:"dasi",cat:"Kata Benda",lv:"core"},
    {jp:"ワイン",furigana:"",rom:"wain",id:"wine (minuman anggur)",cat:"Kata Benda",lv:"core"},
    {jp:"たばこ",furigana:"",rom:"tabako",id:"rokok",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>弁当</rb><rt>べんとう</rt></ruby>",furigana:"べんとう",rom:"bentō",id:"bekal makan siang",cat:"Kata Benda",lv:"core"},
    {jp:"ハンバーガー",furigana:"",rom:"hanbāgā",id:"hamburger",cat:"Kata Benda",lv:"core"},
    {jp:"クッキー",furigana:"",rom:"kukkī",id:"cookie (kue kering)",cat:"Kata Benda",lv:"core"},
    {jp:"〜<ruby><rb>円</rb><rt>えん</rt></ruby>",furigana:"〜えん",rom:"~en",id:"~ yen",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>百</rb><rt>ひゃく</rt></ruby>",furigana:"ひゃく",rom:"hyaku",id:"seratus",cat:"Angka",lv:"core"},
    {jp:"<ruby><rb>千</rb><rt>せん</rt></ruby>",furigana:"せん",rom:"sen",id:"seribu",cat:"Angka",lv:"core"},
    {jp:"<ruby><rb>万</rb><rt>まん</rt></ruby>",furigana:"まん",rom:"man",id:"sepuluh ribu",cat:"Angka",lv:"core"},
    {jp:"いくら",furigana:"",rom:"ikura",id:"berapa (harga)",cat:"Kata Tanya",lv:"core"},
    {jp:"〜を<ruby><rb>見</rb><rt>み</rt></ruby>せてください",furigana:"〜をみせてください",rom:"~o misete kudasai",id:"tolong tunjukkan ~; tolong perlihatkan ~",cat:"Ekspresi",lv:"core"},
    {jp:"フリーマーケット",furigana:"",rom:"furī mākketo",id:"flea market; pasar loak",cat:"Kata Benda",lv:"extra"},
  ]
},
{
  num: 5,
  title: "Waktu dan Hari",
  sub: "〜<ruby><rb>時</rb><rt>じ</rt></ruby> / 〜<ruby><rb>分</rb><rt>ふん</rt></ruby> / から〜まで / と",
  color: "bab-5",
  tips: [
    {icon:"⏰", title:"Cara Baca JAM (〜<ruby><rb>時</rb><rt>じ</rt></ruby>)", text:"<b>1<ruby><rb>時</rb><rt>じ</rt></ruby></b>=いちじ | <b>2<ruby><rb>時</rb><rt>じ</rt></ruby></b>=にじ | <b>3<ruby><rb>時</rb><rt>じ</rt></ruby></b>=さんじ | <b>4<ruby><rb>時</rb><rt>じ</rt></ruby></b>=よじ⚠️ (bukan しじ!) | <b>5<ruby><rb>時</rb><rt>じ</rt></ruby></b>=ごじ | <b>6<ruby><rb>時</rb><rt>じ</rt></ruby></b>=ろくじ | <b>7<ruby><rb>時</rb><rt>じ</rt></ruby></b>=しちじ | <b>8<ruby><rb>時</rb><rt>じ</rt></ruby></b>=はちじ | <b>9<ruby><rb>時</rb><rt>じ</rt></ruby></b>=くじ⚠️ (bukan きゅうじ!) | <b>10<ruby><rb>時</rb><rt>じ</rt></ruby></b>=じゅうじ | <b>11<ruby><rb>時</rb><rt>じ</rt></ruby></b>=じゅういちじ | <b>12<ruby><rb>時</rb><rt>じ</rt></ruby></b>=じゅうにじ"},
    {icon:"⏱️", title:"Cara Baca MENIT (〜<ruby><rb>分</rb><rt>ふん</rt></ruby>) — ADA YANG ISTIMEWA!", text:"<b>1<ruby><rb>分</rb><rt>ふん</rt></ruby></b>=いっぷん⚠️ | <b>2<ruby><rb>分</rb><rt>ふん</rt></ruby></b>=にふん | <b>3<ruby><rb>分</rb><rt>ふん</rt></ruby></b>=さんぷん⚠️ | <b>4<ruby><rb>分</rb><rt>ふん</rt></ruby></b>=よんぷん | <b>5<ruby><rb>分</rb><rt>ふん</rt></ruby></b>=ごふん | <b>6<ruby><rb>分</rb><rt>ふん</rt></ruby></b>=ろっぷん⚠️ | <b>7<ruby><rb>分</rb><rt>ふん</rt></ruby></b>=ななふん | <b>8<ruby><rb>分</rb><rt>ふん</rt></ruby></b>=はっぷん⚠️ | <b>9<ruby><rb>分</rb><rt>ふん</rt></ruby></b>=きゅうふん | <b>10<ruby><rb>分</rb><rt>ふん</rt></ruby></b>=じっぷん/じゅっぷん⚠️<br>⚠️ <b>Istimewa</b>: 1, 3, 6, 8, 10 menit — semua berubah dari ふん→<b>ぷん</b>!"},
    {icon:"💡", title:"Tips Hafal Menit Istimewa", text:"Ingat angka yang berubah ふん→ぷん: <b>1, 3, 6, 8, 10</b>. Cara mudah: 'Satu Tiga Enam Delapan Sepuluh' atau ingat polanya — angka yang diakhiri konsonan ganda (いっ, ろっ, はっ) + ぷん, dan さん + ぷん."}
  ],
  bunpou: [
    {
      tag: "A", label: "KB₁ から KB₂ まで",
      pattern: "KB₁ から KB₂ まで",
      desc: "から menunjukkan dimulainya waktu atau tempat dan まで menunjukkan selesainya waktu atau tempat.",
      reibun: [
        {jp:"<ruby><rb>銀行</rb><rt>ぎんこう</rt></ruby>は ９<ruby><rb>時</rb><rt>じ</rt></ruby>から ３<ruby><rb>時</rb><rt>じ</rt></ruby>までです。", rom:"Ginkō wa kuji kara sanji made desu.", id:"Bank buka dari jam 9 sampai jam 3."},
        {jp:"A：<ruby><rb>図書館</rb><rt>としょかん</rt></ruby>は <ruby><rb>何時</rb><rt>なんじ</rt></ruby>から <ruby><rb>何時</rb><rt>なんじ</rt></ruby>までですか。 B：９<ruby><rb>時半</rb><rt>じはん</rt></ruby>から ６<ruby><rb>時</rb><rt>じ</rt></ruby>までです。", rom:"A: Toshokan wa nanji kara nanji made desu ka. B: Kuji han kara rokuji made desu.", id:"A: Perpustakaan buka jam berapa sampai jam berapa? B: Dari jam 9:30 sampai jam 6."}
      ]
    },
    {
      tag: "B", label: "KB と KB",
      pattern: "KB と KB",
      desc: "Partikel と menghubungkan dua kata benda dalam satu kalimat.",
      reibun: [
        {jp:"A：トイレは <ruby><rb>何階</rb><rt>なんがい</rt></ruby>ですか。 B：２<ruby><rb>階</rb><rt>かい</rt></ruby>と ４<ruby><rb>階</rb><rt>かい</rt></ruby>です。", rom:"A: Toire wa nan gai desu ka. B: Ni kai to yon kai desu.", id:"A: Toilet ada di lantai berapa? B: Di lantai 2 dan lantai 4."},
        {jp:"A：<ruby><rb>休</rb><rt>やす</rt></ruby>みは <ruby><rb>何曜日</rb><rt>なんようび</rt></ruby>ですか。 B：<ruby><rb>土曜日</rb><rt>どようび</rt></ruby>と <ruby><rb>日曜日</rb><rt>にちようび</rt></ruby>です。", rom:"A: Yasumi wa nan yōbi desu ka. B: Doyōbi to nichiyōbi desu.", id:"A: Hari libur hari apa? B: Sabtu dan Minggu."}
      ]
    }
  ],
  kotoba: [
    {jp:"〜<ruby><rb>時</rb><rt>じ</rt></ruby>",furigana:"〜じ",rom:"~ji",id:"pukul ~; jam ~",cat:"Ekspresi",lv:"core"},
    {jp:"〜<ruby><rb>分</rb><rt>ふん</rt></ruby>",furigana:"〜ふん",rom:"~fun",id:"~ menit",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>半</rb><rt>はん</rt></ruby>",furigana:"はん",rom:"han",id:"setengah",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>朝</rb><rt>あさ</rt></ruby>",furigana:"あさ",rom:"asa",id:"pagi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>昼</rb><rt>ひる</rt></ruby>",furigana:"ひる",rom:"hiru",id:"siang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>夜</rb><rt>よる</rt></ruby>",furigana:"よる",rom:"yoru",id:"sore; malam",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>月曜日</rb><rt>げつようび</rt></ruby>",furigana:"げつようび",rom:"getsuyōbi",id:"Senin",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>火曜日</rb><rt>かようび</rt></ruby>",furigana:"かようび",rom:"kayōbi",id:"Selasa",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>水曜日</rb><rt>すいようび</rt></ruby>",furigana:"すいようび",rom:"suiyōbi",id:"Rabu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>木曜日</rb><rt>もくようび</rt></ruby>",furigana:"もくようび",rom:"mokuyōbi",id:"Kamis",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>金曜日</rb><rt>きんようび</rt></ruby>",furigana:"きんようび",rom:"kinyōbi",id:"Jumat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>土曜日</rb><rt>どようび</rt></ruby>",furigana:"どようび",rom:"doyōbi",id:"Sabtu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>日曜日</rb><rt>にちようび</rt></ruby>",furigana:"にちようび",rom:"nichiyōbi",id:"Minggu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>何曜日</rb><rt>なんようび</rt></ruby>",furigana:"なんようび",rom:"nan yōbi",id:"hari apa",cat:"Kata Tanya",lv:"core"},
    {jp:"<ruby><rb>何時</rb><rt>なんじ</rt></ruby>",furigana:"なんじ",rom:"nanji",id:"jam berapa",cat:"Kata Tanya",lv:"core"},
    {jp:"<ruby><rb>何分</rb><rt>なんぷん</rt></ruby>",furigana:"なんぷん",rom:"nanpun",id:"berapa menit",cat:"Kata Tanya",lv:"core"},
    {jp:"〜から",furigana:"",rom:"~kara",id:"dari ~",cat:"Partikel",lv:"core"},
    {jp:"〜まで",furigana:"",rom:"~made",id:"sampai ~; hingga ~",cat:"Partikel",lv:"core"},
    {jp:"もしもし",furigana:"",rom:"moshi moshi",id:"halo (kata pembuka pada saat menelepon)",cat:"Ekspresi",lv:"core"},
    {jp:"お<ruby><rb>願</rb><rt>ねが</rt></ruby>いします",furigana:"おねがいします",rom:"onegai shimasu",id:"tolong (meminta bantuan)",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>休</rb><rt>やす</rt></ruby>み",furigana:"やすみ",rom:"yasumi",id:"istirahat; libur",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>昼休</rb><rt>ひるやす</rt></ruby>み",furigana:"ひるやすみ",rom:"hiruyasumi",id:"istirahat siang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>試験</rb><rt>しけん</rt></ruby>",furigana:"しけん",rom:"shiken",id:"ujian",cat:"Kata Benda",lv:"core"},
    {jp:"テスト",furigana:"",rom:"tesuto",id:"tes",cat:"Kata Benda",lv:"core"},
    {jp:"〜<ruby><rb>時間目</rb><rt>じかんめ</rt></ruby>",furigana:"〜じかんめ",rom:"~jikanme",id:"jam ke ~",cat:"Ekspresi",lv:"extra"},
    {jp:"スーパー",furigana:"",rom:"sūpā",id:"supermarket; pasar swalayan",cat:"Kata Benda",lv:"extra"},
    {jp:"（どうも）ありがとうございました",furigana:"",rom:"(dōmo) arigatō gozaimashita",id:"terima kasih banyak",cat:"Ekspresi",lv:"core"},
    {jp:"おめでとうございます",furigana:"",rom:"omedetō gozaimasu",id:"selamat",cat:"Ekspresi",lv:"core"},
    {jp:"〜と〜",furigana:"",rom:"~to~",id:"~ dan ~",cat:"Konjungsi",lv:"core"},
    {jp:"そちら",furigana:"",rom:"sochira",id:"tempat Anda",cat:"Ekspresi",lv:"extra"},
    {jp:"パーティー",furigana:"",rom:"pātī",id:"pesta",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>番号案内</rb><rt>ばんごうあんない</rt></ruby>",furigana:"ばんごうあんない",rom:"bangō annai",id:"bantuan direktori",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>電話番号</rb><rt>でんわばんごう</rt></ruby>",furigana:"でんわばんごう",rom:"denwa bangō",id:"nomor telepon",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>今</rb><rt>いま</rt></ruby>",furigana:"いま",rom:"ima",id:"sekarang",cat:"Kata Benda",lv:"core"}
  ]
},
{
  num: 6,
  title: "Kata Kerja Bentuk ます",
  sub: "おきます / ねます / はたらきます / やすみます",
  color: "bab-6",
  tips: [
    {icon:"📋", title:"4 Bentuk Kata Kerja ます", text:"<table style='width:100%;font-size:0.82rem;border-collapse:collapse'><tr style='background:rgba(255,255,255,0.05)'><td style='padding:6px;border:1px solid #2e2e40'><b>Positif non-lampau</b></td><td style='padding:6px;border:1px solid #2e2e40'>おきます → Bangun</td></tr><tr><td style='padding:6px;border:1px solid #2e2e40'><b>Negatif non-lampau</b></td><td style='padding:6px;border:1px solid #2e2e40'>おきません → Tidak bangun</td></tr><tr style='background:rgba(255,255,255,0.05)'><td style='padding:6px;border:1px solid #2e2e40'><b>Positif lampau</b></td><td style='padding:6px;border:1px solid #2e2e40'>おきました → Sudah bangun</td></tr><tr><td style='padding:6px;border:1px solid #2e2e40'><b>Negatif lampau</b></td><td style='padding:6px;border:1px solid #2e2e40'>おきませんでした → Tidak bangun</td></tr></table>"},
    {icon:"💡", title:"Tips: に setelah waktu spesifik", text:"Gunakan に setelah waktu SPESIFIK (jam, hari): 7<ruby><rb>時</rb><rt>じ</rt></ruby><b>に</b>おきます. TAPI TIDAK digunakan dengan: きのう, きょう, あした, まいにち, まいあさ — karena sudah relatif. ❌ きのう<b>に</b> → ✅ きのう おきました."}
  ],
  bunpou: [
    {
      tag: "A", label: "KK bentuk ます",
      pattern: "KK bentuk ます (positif/negatif, lampau/non-lampau)",
      desc: "Bentuk kata kerja yang berakhiran ます berfungsi sebagai predikat. Penggunaan ます menunjukkan kesopanan terhadap lawan bicara.",
      table: [
        ["Bentuk positif (non-lampau)","おきます"],
        ["Bentuk negatif (non-lampau)","おきません"],
        ["Bentuk positif (lampau)","おきました"],
        ["Bentuk negatif (lampau)","おきませんでした"]
      ],
      note: {type:"blue", text:"<b>💡 います vs あります — kapan pakai mana?</b><br><b>います</b>: untuk makhluk hidup yang bisa bergerak sendiri (orang, hewan). <ruby><rb>先生</rb><rt>せんせい</rt></ruby>が <b>います</b>。<br><b>あります</b>: untuk benda mati/tak bergerak (meja, buku, dll). <ruby><rb>本</rb><rt>ほん</rt></ruby>が <b>あります</b>。<br>Pengecualian: <b>Tanaman</b> pakai あります meski hidup, karena tidak bergerak sendiri."},
      reibun: [
        {jp:"<ruby><rb>毎朝</rb><rt>まいあさ</rt></ruby> ７<ruby><rb>時</rb><rt>じ</rt></ruby>に <ruby><rb>起</rb><rt>お</rt></ruby>きます。", rom:"Maiasa shichiji ni okimasu.", id:"Setiap pagi saya bangun jam 7."},
        {jp:"<ruby><rb>毎晩</rb><rt>まいばん</rt></ruby> <ruby><rb>何時</rb><rt>なんじ</rt></ruby>に <ruby><rb>寝</rb><rt>ね</rt></ruby>ますか。", rom:"Maiban nanji ni nemasu ka.", id:"Setiap malam Anda tidur jam berapa?"},
        {jp:"きのう <ruby><rb>午前</rb><rt>ごぜん</rt></ruby>９<ruby><rb>時</rb><rt>じ</rt></ruby>から <ruby><rb>午後</rb><rt>ごご</rt></ruby>６<ruby><rb>時</rb><rt>じ</rt></ruby>まで <ruby><rb>働</rb><rt>はたら</rt></ruby>きました。", rom:"Kinō gozen kuji kara gogo rokuji made hatarakimashita.", id:"Kemarin saya bekerja dari jam 9 pagi sampai jam 6 sore."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>起</rb><rt>お</rt></ruby>きます",furigana:"おきます",rom:"okimasu",id:"bangun",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>寝</rb><rt>ね</rt></ruby>ます",furigana:"ねます",rom:"nemasu",id:"tidur",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>働</rb><rt>はたら</rt></ruby>きます",furigana:"はたらきます",rom:"hatarakimasu",id:"bekerja",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>休</rb><rt>やす</rt></ruby>みます",furigana:"やすみます",rom:"yasumimasu",id:"beristirahat",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>します",furigana:"べんきょうします",rom:"benkyō shimasu",id:"belajar",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>終</rb><rt>お</rt></ruby>わります",furigana:"おわります",rom:"owarimasu",id:"selesai",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>一昨日</rb><rt>おととい</rt></ruby>",furigana:"おととい",rom:"ototoi",id:"kemarin lusa; dua hari lalu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>昨日</rb><rt>きのう</rt></ruby>",furigana:"きのう",rom:"kinō",id:"kemarin",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>今日</rb><rt>きょう</rt></ruby>",furigana:"きょう",rom:"kyō",id:"hari ini",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>明日</rb><rt>あした</rt></ruby>",furigana:"あした",rom:"ashita",id:"besok",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>明後日</rb><rt>あさって</rt></ruby>",furigana:"あさって",rom:"asatte",id:"lusa",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>今朝</rb><rt>けさ</rt></ruby>",furigana:"けさ",rom:"kesa",id:"pagi ini",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>今晩</rb><rt>こんばん</rt></ruby>",furigana:"こんばん",rom:"konban",id:"malam ini; nanti malam",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>毎朝</rb><rt>まいあさ</rt></ruby>",furigana:"まいあさ",rom:"maiasa",id:"setiap pagi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>毎晩</rb><rt>まいばん</rt></ruby>",furigana:"まいばん",rom:"maiban",id:"setiap malam",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>毎日</rb><rt>まいにち</rt></ruby>",furigana:"まいにち",rom:"mainichi",id:"setiap hari",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>大変</rb><rt>たいへん</rt></ruby>ですね",furigana:"たいへんですね",rom:"taihen desu ne",id:"sangat repot ya; sangat menyusahkan ya",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>大変</rb><rt>たいへん</rt></ruby>（な）",furigana:"たいへん（な）",rom:"taihen (na)",id:"berat; sulit; susah",cat:"Kata Sifat",lv:"core",grp:"な"},
  ]
},
{
  num: 7,
  title: "Transportasi dan Tanggal",
  sub: "〜へ KK / 〜で KK / 〜と KK",
  color: "bab-7",
  tips: [
    {icon:"📅", title:"Nama Bulan — Mudah!", text:"Bulan di Jepang hanya angka + がつ: <b>1<ruby><rb>月</rb><rt>がつ</rt></ruby></b>=いちがつ(Jan), <b>2<ruby><rb>月</rb><rt>がつ</rt></ruby></b>=にがつ(Feb), <b>3<ruby><rb>月</rb><rt>がつ</rt></ruby></b>=さんがつ(Mar), <b>4<ruby><rb>月</rb><rt>がつ</rt></ruby></b>=しがつ(Apr), <b>5<ruby><rb>月</rb><rt>がつ</rt></ruby></b>=ごがつ(Mei), <b>6<ruby><rb>月</rb><rt>がつ</rt></ruby></b>=ろくがつ(Jun), <b>7<ruby><rb>月</rb><rt>がつ</rt></ruby></b>=しちがつ(Jul), <b>8<ruby><rb>月</rb><rt>がつ</rt></ruby></b>=はちがつ(Agu), <b>9<ruby><rb>月</rb><rt>がつ</rt></ruby></b>=くがつ(Sep), <b>10<ruby><rb>月</rb><rt>がつ</rt></ruby></b>=じゅうがつ(Okt), <b>11<ruby><rb>月</rb><rt>がつ</rt></ruby></b>=じゅういちがつ(Nov), <b>12<ruby><rb>月</rb><rt>がつ</rt></ruby></b>=じゅうにがつ(Des)"},
    {icon:"📆", title:"Tanggal Istimewa yang Harus Dihafal", text:"Tanggal 1-10 punya bacaan khusus! <b>1<ruby><rb>日</rb><rt>にち</rt></ruby></b>=つい<b>たち</b> | <b>2<ruby><rb>日</rb><rt>にち</rt></ruby></b>=ふつか | <b>3<ruby><rb>日</rb><rt>にち</rt></ruby></b>=みっか | <b>4<ruby><rb>日</rb><rt>にち</rt></ruby></b>=よっか | <b>5<ruby><rb>日</rb><rt>にち</rt></ruby></b>=いつか | <b>6<ruby><rb>日</rb><rt>にち</rt></ruby></b>=むいか | <b>7<ruby><rb>日</rb><rt>にち</rt></ruby></b>=なのか | <b>8<ruby><rb>日</rb><rt>にち</rt></ruby></b>=ようか | <b>9<ruby><rb>日</rb><rt>にち</rt></ruby></b>=ここのか | <b>10<ruby><rb>日</rb><rt>にち</rt></ruby></b>=とおか. Selanjutnya biasa + にち, kecuali: <b>14<ruby><rb>日</rb><rt>にち</rt></ruby></b>=じゅうよっか, <b>20<ruby><rb>日</rb><rt>にち</rt></ruby></b>=はつか, <b>24<ruby><rb>日</rb><rt>にち</rt></ruby></b>=にじゅうよっか"},
    {icon:"💡", title:"Partikel で, へ, と — Bedakan!", text:"<b>へ</b> = arah tujuan (ke): <ruby><rb>東京</rb><rt>とうきょう</rt></ruby><b>へ</b>いきます. <b>で</b> = alat/cara/tempat kejadian: バス<b>で</b>いきます (naik bus). <b>と</b> = bersama (dengan siapa): <ruby><rb>友達</rb><rt>ともだち</rt></ruby><b>と</b>いきます."}
  ],
  bunpou: [
    {
      tag: "A", label: "KB（tempat）へ KK bentuk ます",
      pattern: "KB（tempat）へ + KK",
      desc: "Ketika kata kerja menunjukkan pergerakan ke tempat tertentu, partikel へ diletakkan setelah kata benda untuk menunjukkan arah pergerakan.",
      reibun: [
        {jp:"<ruby><rb>新宿</rb><rt>しんじゅく</rt></ruby>へ <ruby><rb>行</rb><rt>い</rt></ruby>きます。", rom:"Shinjuku e ikimasu.", id:"Pergi ke Shinjuku."},
        {jp:"A：<ruby><rb>先週</rb><rt>せんしゅう</rt></ruby>の <ruby><rb>土曜日</rb><rt>どようび</rt></ruby>、どこへ <ruby><rb>行</rb><rt>い</rt></ruby>きましたか。 B：どこ（へ）も <ruby><rb>行</rb><rt>い</rt></ruby>きませんでした。", rom:"A: Senshū no doyōbi, doko e ikimashita ka. B: Doko e mo ikimasendeshita.", id:"A: Sabtu minggu lalu, pergi ke mana? B: Tidak pergi ke mana-mana."}
      ]
    },
    {
      tag: "B", label: "KB（kendaraan）で KK bentuk ます",
      pattern: "KB（kendaraan）で + KK",
      desc: "Partikel で menunjukkan cara atau metode. Pembicara melekatkan partikel で setelah kata benda yang mewakili kendaraannya dan menggunakannya bersamaan dengan kata kerja untuk menunjukkan alat transportasinya.",
      reibun: [
        {jp:"<ruby><rb>電車</rb><rt>でんしゃ</rt></ruby>で うちへ <ruby><rb>帰</rb><rt>かえ</rt></ruby>ります。", rom:"Densha de uchi e kaerimasu.", id:"Pulang ke rumah dengan kereta api."},
        {jp:"A：<ruby><rb>何</rb><rt>なん</rt></ruby>で <ruby><rb>日本</rb><rt>にほん</rt></ruby>へ <ruby><rb>来</rb><rt>き</rt></ruby>ましたか。 B：<ruby><rb>飛行機</rb><rt>ひこうき</rt></ruby>で <ruby><rb>日本</rb><rt>にほん</rt></ruby>へ <ruby><rb>来</rb><rt>き</rt></ruby>ました。", rom:"A: Nan de nihon e kimashita ka. B: Hikōki de nihon e kimashita.", id:"A: Datang ke Jepang dengan apa? B: Datang ke Jepang dengan pesawat."}
      ]
    },
    {
      tag: "C", label: "KB（orang）と KK bentuk ます",
      pattern: "KB（orang）と + KK",
      desc: "Ketika berbicara tentang melakukan sesuatu dengan seseorang atau hewan, seseorang atau hewan tersebut ditandai dengan partikel と.",
      reibun: [
        {jp:"<ruby><rb>木村</rb><rt>きむら</rt></ruby>さんと <ruby><rb>上野</rb><rt>うえの</rt></ruby>へ <ruby><rb>行</rb><rt>い</rt></ruby>きました。", rom:"Kimura san to Ueno e ikimashita.", id:"Pergi ke Ueno bersama Kimura."},
        {jp:"A：だれと デパートへ <ruby><rb>行</rb><rt>い</rt></ruby>きましたか。 B：<ruby><rb>友達</rb><rt>ともだち</rt></ruby>と デパートへ <ruby><rb>行</rb><rt>い</rt></ruby>きました。", rom:"A: Dare to depāto e ikimashita ka. B: Tomodachi to depāto e ikimashita.", id:"A: Pergi ke toserba dengan siapa? B: Pergi ke toserba dengan teman."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>行</rb><rt>い</rt></ruby>きます",furigana:"いきます",rom:"ikimasu",id:"pergi",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>来</rb><rt>き</rt></ruby>ます",furigana:"きます",rom:"kimasu",id:"datang",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>帰</rb><rt>かえ</rt></ruby>ります",furigana:"かえります",rom:"kaerimasu",id:"pulang",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>駅</rb><rt>えき</rt></ruby>",furigana:"えき",rom:"eki",id:"stasiun",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>飛行機</rb><rt>ひこうき</rt></ruby>",furigana:"ひこうき",rom:"hikōki",id:"pesawat terbang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>船</rb><rt>ふね</rt></ruby>",furigana:"ふね",rom:"fune",id:"kapal laut",cat:"Kata Benda",lv:"core"},
    {jp:"バス",furigana:"",rom:"basu",id:"bus",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>地下鉄</rb><rt>ちかてつ</rt></ruby>",furigana:"ちかてつ",rom:"chikatetsu",id:"kereta api bawah tanah",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>電車</rb><rt>でんしゃ</rt></ruby>",furigana:"でんしゃ",rom:"densha",id:"kereta api",cat:"Kata Benda",lv:"core"},
    {jp:"タクシー",furigana:"",rom:"takushī",id:"taksi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>自転車</rb><rt>じてんしゃ</rt></ruby>",furigana:"じてんしゃ",rom:"jitensha",id:"sepeda",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>友達</rb><rt>ともだち</rt></ruby>",furigana:"ともだち",rom:"tomodachi",id:"teman",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>家族</rb><rt>かぞく</rt></ruby>",furigana:"かぞく",rom:"kazoku",id:"keluarga",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>一人で</rb><rt>ひとりで</rt></ruby>",furigana:"ひとりで",rom:"hitori de",id:"sendirian; sendiri",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>先週</rb><rt>せんしゅう</rt></ruby>",furigana:"せんしゅう",rom:"senshū",id:"minggu lalu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>今週</rb><rt>こんしゅう</rt></ruby>",furigana:"こんしゅう",rom:"konshū",id:"minggu ini",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>来週</rb><rt>らいしゅう</rt></ruby>",furigana:"らいしゅう",rom:"raishū",id:"minggu depan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>先月</rb><rt>せんげつ</rt></ruby>",furigana:"せんげつ",rom:"sengetsu",id:"bulan lalu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>今月</rb><rt>こんげつ</rt></ruby>",furigana:"こんげつ",rom:"kongetsu",id:"bulan ini",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>来月</rb><rt>らいげつ</rt></ruby>",furigana:"らいげつ",rom:"raigetsu",id:"bulan depan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>去年</rb><rt>きょねん</rt></ruby>",furigana:"きょねん",rom:"kyonen",id:"tahun lalu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>今年</rb><rt>ことし</rt></ruby>",furigana:"ことし",rom:"kotoshi",id:"tahun ini",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>来年</rb><rt>らいねん</rt></ruby>",furigana:"らいねん",rom:"rainen",id:"tahun depan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>誕生日</rb><rt>たんじょうび</rt></ruby>",furigana:"たんじょうび",rom:"tanjōbi",id:"hari ulang tahun",cat:"Kata Benda",lv:"core"},
    {jp:"いつ",furigana:"",rom:"itsu",id:"kapan",cat:"Kata Tanya",lv:"core"},
    {jp:"<ruby><rb>彼</rb><rt>かれ</rt></ruby>",furigana:"かれ",rom:"kare",id:"dia (laki-laki)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>彼女</rb><rt>かのじょ</rt></ruby>",furigana:"かのじょ",rom:"kanojo",id:"dia (perempuan)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>何月</rb><rt>なんがつ</rt></ruby>",furigana:"なんがつ",rom:"nangatu",id:"bulan apa",cat:"Kata Tanya",lv:"core"},
    {jp:"<ruby><rb>何日</rb><rt>なにち</rt></ruby>",furigana:"なにち",rom:"nanichi",id:"tanggal berapa; berapa hari",cat:"Kata Tanya",lv:"core"},
    {jp:"１<ruby><rb>月</rb><rt>がつ</rt></ruby>",furigana:"いちがつ",rom:"ichigatsu",id:"Januari",cat:"Angka",lv:"core"},
    {jp:"２<ruby><rb>月</rb><rt>がつ</rt></ruby>",furigana:"にがつ",rom:"nigatsu",id:"Februari",cat:"Angka",lv:"core"},
    {jp:"３<ruby><rb>月</rb><rt>がつ</rt></ruby>",furigana:"さんがつ",rom:"sangatsu",id:"Maret",cat:"Angka",lv:"core"},
    {jp:"４<ruby><rb>月</rb><rt>がつ</rt></ruby>",furigana:"しがつ",rom:"shigatsu",id:"April",cat:"Angka",lv:"core"},
    {jp:"５<ruby><rb>月</rb><rt>がつ</rt></ruby>",furigana:"ごがつ",rom:"gogatsu",id:"Mei",cat:"Angka",lv:"core"},
    {jp:"６<ruby><rb>月</rb><rt>がつ</rt></ruby>",furigana:"ろくがつ",rom:"rokugatsu",id:"Juni",cat:"Angka",lv:"core"},
    {jp:"７<ruby><rb>月</rb><rt>がつ</rt></ruby>",furigana:"しちがつ",rom:"shichigatsu",id:"Juli",cat:"Angka",lv:"core"},
    {jp:"８<ruby><rb>月</rb><rt>がつ</rt></ruby>",furigana:"はちがつ",rom:"hachigatsu",id:"Agustus",cat:"Angka",lv:"core"},
    {jp:"９<ruby><rb>月</rb><rt>がつ</rt></ruby>",furigana:"くがつ",rom:"kugatsu",id:"September",cat:"Angka",lv:"core"},
    {jp:"１０<ruby><rb>月</rb><rt>がつ</rt></ruby>",furigana:"じゅうがつ",rom:"juugatsu",id:"Oktober",cat:"Angka",lv:"core"},
    {jp:"１１<ruby><rb>月</rb><rt>がつ</rt></ruby>",furigana:"じゅういちがつ",rom:"juuichigatsu",id:"November",cat:"Angka",lv:"core"},
    {jp:"１２<ruby><rb>月</rb><rt>がつ</rt></ruby>",furigana:"じゅうにがつ",rom:"juunigatsu",id:"Desember",cat:"Angka",lv:"core"},
    {jp:"ついたち",furigana:"",rom:"tsuitachi",id:"tanggal 1",cat:"Angka",lv:"core"},
    {jp:"ふつか",furigana:"",rom:"futsuka",id:"tanggal 2",cat:"Angka",lv:"core"},
    {jp:"みっか",furigana:"",rom:"mikka",id:"tanggal 3",cat:"Angka",lv:"core"},
    {jp:"よっか",furigana:"",rom:"yokka",id:"tanggal 4",cat:"Angka",lv:"core"},
    {jp:"いつか",furigana:"",rom:"itsuka",id:"tanggal 5",cat:"Angka",lv:"core"},
    {jp:"むいか",furigana:"",rom:"muika",id:"tanggal 6",cat:"Angka",lv:"core"},
    {jp:"なのか",furigana:"",rom:"nanoka",id:"tanggal 7",cat:"Angka",lv:"core"},
    {jp:"ようか",furigana:"",rom:"youka",id:"tanggal 8",cat:"Angka",lv:"core"},
    {jp:"ここのか",furigana:"",rom:"kokonoka",id:"tanggal 9",cat:"Angka",lv:"core"},
    {jp:"とおか",furigana:"",rom:"tooka",id:"tanggal 10",cat:"Angka",lv:"core"},
    {jp:"じゅうよっか",furigana:"",rom:"juuyokka",id:"tanggal 14",cat:"Angka",lv:"core"},
    {jp:"はつか",furigana:"",rom:"hatsuka",id:"tanggal 20",cat:"Angka",lv:"core"},
    {jp:"にじゅうよっか",furigana:"",rom:"nijuuyokka",id:"tanggal 24",cat:"Angka",lv:"core"},
    {jp:"コンビニ",furigana:"",rom:"konbini",id:"minimarket",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>次</rb><rt>つぎ</rt></ruby>の",furigana:"つぎの",rom:"tsugi no",id:"selanjutnya",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>歩</rb><rt>ある</rt></ruby>いて",furigana:"あるいて",rom:"aruite",id:"berjalan kaki",cat:"Ekspresi",lv:"core"}
  ]
},
{
  num: 8,
  title: "Kata Kerja Transitif",
  sub: "KB を KK / KB（tempat）で KK",
  color: "bab-8",
  bunpou: [
    {
      tag: "A", label: "KB を KK",
      pattern: "KB を + KK",
      desc: "Partikel を digunakan untuk menunjukkan objek langsung dari kata kerja.",
      reibun: [
        {jp:"ビールを <ruby><rb>飲</rb><rt>の</rt></ruby>みます。", rom:"Bīru o nomimasu.", id:"Minum bir."},
        {jp:"７<ruby><rb>時</rb><rt>じ</rt></ruby>に <ruby><rb>朝</rb><rt>あさ</rt></ruby>ごはんを <ruby><rb>食</rb><rt>た</rt></ruby>べます。", rom:"Shichiji ni asagohan o tabemasu.", id:"Makan sarapan jam 7."},
        {jp:"いつ この <ruby><rb>写真</rb><rt>しゃしん</rt></ruby>を <ruby><rb>撮</rb><rt>と</rt></ruby>りましたか。", rom:"Itsu kono shashin o torimashita ka.", id:"Kapan Anda mengambil foto ini?"}
      ]
    },
    {
      tag: "B", label: "KB（tempat）で KK",
      pattern: "KB（tempat）で + KK",
      desc: "Ketika ditambahkan partikel で setelah kata benda yang menunjukkan tempat, partikel で tersebut menunjukkan terjadinya suatu tindakan di tempat itu.",
      reibun: [
        {jp:"<ruby><rb>駅</rb><rt>えき</rt></ruby>で <ruby><rb>新聞</rb><rt>しんぶん</rt></ruby>を <ruby><rb>買</rb><rt>か</rt></ruby>います。", rom:"Eki de shinbun o kaimasu.", id:"Membeli koran di stasiun."},
        {jp:"<ruby><rb>公園</rb><rt>こうえん</rt></ruby>で サッカーを します。", rom:"Kōen de sakkā o shimasu.", id:"Bermain sepak bola di taman."},
        {jp:"きのう どこで お<ruby><rb>花見</rb><rt>はなみ</rt></ruby>を しましたか。", rom:"Kinō doko de ohanami o shimashita ka.", id:"Kemarin melihat bunga sakura di mana?"}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>食</rb><rt>た</rt></ruby>べます",furigana:"たべます",rom:"tabemasu",id:"makan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>飲</rb><rt>の</rt></ruby>みます",furigana:"のみます",rom:"nomimasu",id:"minum",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>見</rb><rt>み</rt></ruby>ます",furigana:"みます",rom:"mimasu",id:"melihat; menonton",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>聞</rb><rt>き</rt></ruby>きます",furigana:"ききます",rom:"kikimasu",id:"mendengar",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>読</rb><rt>よ</rt></ruby>みます",furigana:"よみます",rom:"yomimasu",id:"membaca",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>書</rb><rt>か</rt></ruby>きます",furigana:"かきます",rom:"kakimasu",id:"menulis",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>買</rb><rt>か</rt></ruby>います",furigana:"かいます",rom:"kaimasu",id:"membeli",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"します",furigana:"",rom:"shimasu",id:"melakukan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>写真</rb><rt>しゃしん</rt></ruby>を <ruby><rb>撮</rb><rt>と</rt></ruby>ります",furigana:"しゃしんをとります",rom:"shashin o torimasu",id:"mengambil (foto)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"ご<ruby><rb>飯</rb><rt>はん</rt></ruby>",furigana:"ごはん",rom:"gohan",id:"nasi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>朝</rb><rt>あさ</rt></ruby>ご<ruby><rb>飯</rb><rt>はん</rt></ruby>",furigana:"あさごはん",rom:"asagohan",id:"sarapan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>昼</rb><rt>ひる</rt></ruby>ご<ruby><rb>飯</rb><rt>はん</rt></ruby>",furigana:"ひるごはん",rom:"hirugohan",id:"makan siang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>晩</rb><rt>ばん</rt></ruby>ご<ruby><rb>飯</rb><rt>はん</rt></ruby>",furigana:"ばんごはん",rom:"bangohan",id:"makan malam",cat:"Kata Benda",lv:"core"},
    {jp:"パン",furigana:"",rom:"pan",id:"roti",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>肉</rb><rt>にく</rt></ruby>",furigana:"にく",rom:"niku",id:"daging",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>魚</rb><rt>さかな</rt></ruby>",furigana:"さかな",rom:"sakana",id:"ikan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>野菜</rb><rt>やさい</rt></ruby>",furigana:"やさい",rom:"yasai",id:"sayur",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>果物</rb><rt>くだもの</rt></ruby>",furigana:"くだもの",rom:"kudamono",id:"buah-buahan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>水</rb><rt>みず</rt></ruby>",furigana:"みず",rom:"mizu",id:"air",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>茶</rb><rt>ちゃ</rt></ruby>",furigana:"おちゃ",rom:"ocha",id:"teh; teh hijau",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>紅茶</rb><rt>こうちゃ</rt></ruby>",furigana:"こうちゃ",rom:"kōcha",id:"teh hitam",cat:"Kata Benda",lv:"core"},
    {jp:"ジュース",furigana:"",rom:"jūsu",id:"jus",cat:"Kata Benda",lv:"core"},
    {jp:"ビール",furigana:"",rom:"bīru",id:"bir",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>映画</rb><rt>えいが</rt></ruby>",furigana:"えいが",rom:"eiga",id:"film",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>音楽</rb><rt>おんがく</rt></ruby>",furigana:"おんがく",rom:"ongaku",id:"musik",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>手紙</rb><rt>てがみ</rt></ruby>",furigana:"てがみ",rom:"tegami",id:"surat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>写真</rb><rt>しゃしん</rt></ruby>",furigana:"しゃしん",rom:"shashin",id:"foto",cat:"Kata Benda",lv:"core"},
    {jp:"サッカー",furigana:"",rom:"sakkā",id:"sepak bola",cat:"Kata Benda",lv:"core"},
    {jp:"いつも",furigana:"",rom:"itsumo",id:"selalu",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>時々</rb><rt>ときどき</rt></ruby>",furigana:"ときどき",rom:"tokidoki",id:"kadang-kadang",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>吸</rb><rt>す</rt></ruby>います",furigana:"すいます",rom:"suimasu",id:"mengisap (rokok); merokok",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>友達</rb><rt>ともだち</rt></ruby>に）<ruby><rb>会</rb><rt>あ</rt></ruby>います",furigana:"（ともだちに）あいます",rom:"(tomodachi ni) aimasu",id:"bertemu (teman)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（お）<ruby><rb>酒</rb><rt>さけ</rt></ruby>",furigana:"（お）さけ",rom:"(o)sake",id:"sake; minuman keras",cat:"Kata Benda",lv:"core"},
    {jp:"DVD",furigana:"ディービーディー",rom:"dī bī dī",id:"DVD",cat:"Kata Benda",lv:"extra"},
    {jp:"CD",furigana:"シーディー",rom:"shī dī",id:"CD",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>宿題</rb><rt>しゅくだい</rt></ruby>",furigana:"しゅくだい",rom:"shukudai",id:"pekerjaan rumah; PR",cat:"Kata Benda",lv:"core"},
    {jp:"テニス",furigana:"",rom:"tenisu",id:"tenis",cat:"Kata Benda",lv:"core"},
    {jp:"（お）<ruby><rb>花見</rb><rt>はなみ</rt></ruby>",furigana:"（お）はなみ",rom:"(o)hanami",id:"melihat bunga sakura",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>居酒屋</rb><rt>いざかや</rt></ruby>",furigana:"いざかや",rom:"izakaya",id:"Izakaya; bar Jepang",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>何</rb><rt>なに</rt></ruby>も〜ない",furigana:"なにも〜ない",rom:"nani mo~nai",id:"tidak ada apa-apa",cat:"Ekspresi",lv:"core"},
    {jp:"それから",furigana:"",rom:"sorekara",id:"setelah itu; kemudian",cat:"Konjungsi",lv:"core"},
    {jp:"<ruby><rb>何</rb><rt>なに</rt></ruby>か",furigana:"なにか",rom:"nanika",id:"sesuatu",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>何</rb><rt>なに</rt></ruby>",furigana:"なに",rom:"nani",id:"apa",cat:"Kata Tanya",lv:"core"},
    {jp:"レストラン",furigana:"",rom:"resutoran",id:"restoran",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>牛乳</rb><rt>ぎゅうにゅう</rt></ruby>",furigana:"ぎゅうにゅう",rom:"gyūnyū",id:"susu sapi",cat:"Kata Benda",lv:"core"},
    {jp:"ミルク",furigana:"",rom:"miruku",id:"susu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>卵</rb><rt>たまご</rt></ruby>",furigana:"たまご",rom:"tamago",id:"telur",cat:"Kata Benda",lv:"core"}
  ]
},
{
  num: 9,
  title: "Memberi dan Menerima",
  sub: "あげます / もらいます / かします / かります",
  color: "bab-9",
  bunpou: [
    {
      tag: "A", label: "KB₁（orang）に KB₂ を あげます, dll.",
      pattern: "KB₁（orang）に + KB₂ を + あげます",
      desc: "Kata kerja seperti あげます, かします dan おしえます digunakan untuk memberikan sesuatu atau informasi, sehingga kata kerja tersebut digunakan dengan kata benda yang menyatakan kepada siapa sesuatu atau informasi tersebut diberikan. Partikel に digunakan untuk menunjukkan si penerima.",
      reibun: [
        {jp:"<ruby><rb>友達</rb><rt>ともだち</rt></ruby>に シャツを あげます。", rom:"Tomodachi ni shatsu o agemasu.", id:"Memberikan kemeja kepada teman."},
        {jp:"<ruby><rb>国</rb><rt>くに</rt></ruby>に <ruby><rb>電話</rb><rt>でんわ</rt></ruby>を かけます。", rom:"Kuni ni denwa o kakemasu.", id:"Menelepon ke kampung halaman."},
        {jp:"<ruby><rb>友達</rb><rt>ともだち</rt></ruby>に <ruby><rb>日本語</rb><rt>にほんご</rt></ruby>の <ruby><rb>本</rb><rt>ほん</rt></ruby>を <ruby><rb>貸</rb><rt>か</rt></ruby>しました。", rom:"Tomodachi ni nihongo no hon o kashimashita.", id:"Meminjamkan buku bahasa Jepang kepada teman."}
      ]
    },
    {
      tag: "B", label: "KB₁（orang）に KB₂ を もらいます, dll.",
      pattern: "KB₁（orang）に + KB₂ を + もらいます",
      desc: "Kata kerja seperti もらいます, かります dan ならいます digunakan saat menerima sesuatu atau informasi. Partikel に digunakan untuk menunjukkan si pemberi.",
      reibun: [
        {jp:"<ruby><rb>父</rb><rt>ちち</rt></ruby>に <ruby><rb>旅行</rb><rt>りょこう</rt></ruby>の お<ruby><rb>土産</rb><rt>みやげ</rt></ruby>を もらいました。", rom:"Chichi ni ryokō no omiyage o moraimashita.", id:"Mendapatkan oleh-oleh perjalanan dari ayah."},
        {jp:"<ruby><rb>太郎</rb><rt>たろう</rt></ruby>さんに <ruby><rb>自転車</rb><rt>じてんしゃ</rt></ruby>を <ruby><rb>借</rb><rt>か</rt></ruby>ります。", rom:"Tarō san ni jitensha o karimasu.", id:"Meminjam sepeda dari Taro."},
        {jp:"<ruby><rb>学生</rb><rt>がくせい</rt></ruby>は <ruby><rb>先生</rb><rt>せんせい</rt></ruby>に <ruby><rb>日本語</rb><rt>にほんご</rt></ruby>を <ruby><rb>習</rb><rt>なら</rt></ruby>います。", rom:"Gakusei wa sensei ni nihongo o naraimasu.", id:"Siswa belajar bahasa Jepang dari guru."}
      ]
    }
  ],
  kotoba: [
    {jp:"あげます",furigana:"",rom:"agemasu",id:"memberikan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"もらいます",furigana:"",rom:"moraimasu",id:"menerima; mendapatkan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>貸</rb><rt>か</rt></ruby>します",furigana:"かします",rom:"kashimasu",id:"meminjamkan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>借</rb><rt>か</rt></ruby>ります",furigana:"かります",rom:"karimasu",id:"meminjam",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>教</rb><rt>おし</rt></ruby>えます",furigana:"おしえます",rom:"oshiemasu",id:"mengajar",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>習</rb><rt>なら</rt></ruby>います",furigana:"ならいます",rom:"naraimasu",id:"belajar",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>送</rb><rt>おく</rt></ruby>ります",furigana:"おくります",rom:"okurimasu",id:"mengirim",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>電話</rb><rt>でんわ</rt></ruby>を）かけます",furigana:"（でんわを）かけます",rom:"(denwa o) kakemasu",id:"menelepon",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>花</rb><rt>はな</rt></ruby>",furigana:"はな",rom:"hana",id:"bunga",cat:"Kata Benda",lv:"core"},
    {jp:"シャツ",furigana:"",rom:"shatsu",id:"kemeja",cat:"Kata Benda",lv:"core"},
    {jp:"プレゼント",furigana:"",rom:"purezento",id:"kado; hadiah",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>金</rb><rt>かね</rt></ruby>",furigana:"おかね",rom:"okane",id:"uang",cat:"Kata Benda",lv:"core"},
    {jp:"クリスマス",furigana:"",rom:"kurisumasu",id:"Natal",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>父</rb><rt>ちち</rt></ruby>",furigana:"ちち",rom:"chichi",id:"ayah (saya); bapak (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>母</rb><rt>はは</rt></ruby>",furigana:"はは",rom:"haha",id:"ibu (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>父</rb><rt>とう</rt></ruby>さん",furigana:"おとうさん",rom:"otōsan",id:"ayah (orang lain)",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>母</rb><rt>かあ</rt></ruby>さん",furigana:"おかあさん",rom:"okāsan",id:"ibu (orang lain)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>旅行</rb><rt>りょこう</rt></ruby>",furigana:"りょこう",rom:"ryokō",id:"tamasya; wisata",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>土産</rb><rt>みやげ</rt></ruby>",furigana:"おみやげ",rom:"omiyage",id:"oleh-oleh",cat:"Kata Benda",lv:"core"},
    {jp:"メール",furigana:"",rom:"mēru",id:"e-mail",cat:"Kata Benda",lv:"core"},
    {jp:"ケーキ",furigana:"",rom:"kēki",id:"kue",cat:"Kata Benda",lv:"extra"},
    {jp:"すてきですね",furigana:"",rom:"suteki desu ne",id:"bagus ya; indah ya",cat:"Ekspresi",lv:"extra"}
  ]
},
{
  num: 10,
  title: "Sudah / Belum / Ajakan",
  sub: "KB で KK / もう KK ました / KK ませんか / KK ましょう",
  color: "bab-10",
  bunpou: [
    {
      tag: "A", label: "KB（alat/sarana）で KK",
      pattern: "KB（alat/sarana）で + KK",
      desc: "Partikel で menunjukkan metode atau sarana yang digunakan untuk suatu tindakan.",
      reibun: [
        {jp:"<ruby><rb>箸</rb><rt>はし</rt></ruby>で ごはんを <ruby><rb>食</rb><rt>た</rt></ruby>べます。", rom:"Hashi de gohan o tabemasu.", id:"Makan nasi dengan sumpit."},
        {jp:"はさみで <ruby><rb>紙</rb><rt>かみ</rt></ruby>を <ruby><rb>切</rb><rt>き</rt></ruby>ります。", rom:"Hasami de kami o kirimasu.", id:"Memotong kertas dengan gunting."},
        {jp:"<ruby><rb>日本語</rb><rt>にほんご</rt></ruby>で レポートを <ruby><rb>書</rb><rt>か</rt></ruby>きます。", rom:"Nihongo de repōto o kakimasu.", id:"Menulis laporan dalam bahasa Jepang."}
      ]
    },
    {
      tag: "B", label: "もう KK ました",
      pattern: "もう KK ました",
      desc: "もう artinya 'sudah' dan digunakan dengan KK ました. Jawaban atas pertanyaan もう KK ましたか adalah はい、もう KK ました jika tindakan tersebut telah selesai dan いいえ、まだです jika tindakan tersebut belum selesai dilakukan.",
      reibun: [
        {jp:"A：もう あの <ruby><rb>映画</rb><rt>えいが</rt></ruby>を <ruby><rb>見</rb><rt>み</rt></ruby>ましたか。 B：はい、もう <ruby><rb>見</rb><rt>み</rt></ruby>ました。", rom:"A: Mō ano eiga o mimashita ka. B: Hai, mō mimashita.", id:"A: Sudah nonton film itu? B: Ya, sudah nonton."},
        {jp:"A：もう <ruby><rb>宿題</rb><rt>しゅくだい</rt></ruby>を しましたか。 B：いいえ、まだです。", rom:"A: Mō shukudai o shimashita ka. B: Iie, mada desu.", id:"A: Sudah mengerjakan PR? B: Belum."}
      ]
    },
    {
      tag: "C", label: "KK ませんか / KK ましょう",
      pattern: "KK ませんか / KK ましょう",
      desc: "Anda dapat menggunakan KK ませんか untuk menyampaikan ajakan. KK ましょう digunakan saat menanggapi ajakan secara positif.",
      reibun: [
        {jp:"A：いっしょに お<ruby><rb>酒</rb><rt>さけ</rt></ruby>を <ruby><rb>飲</rb><rt>の</rt></ruby>みませんか。 B：ええ、<ruby><rb>飲</rb><rt>の</rt></ruby>みましょう。", rom:"A: Issho ni osake o nomimasen ka. B: Ee, nomimashō.", id:"A: Mau minum sake bersama? B: Ya, mari minum bersama."},
        {jp:"A：<ruby><rb>明日</rb><rt>あした</rt></ruby> いっしょに テニスを しませんか。 B：すみません、あしたは ちょっと…。", rom:"A: Ashita issho ni tenisu o shimasen ka. B: Sumimasen, ashita wa chotto...", id:"A: Mau bermain tenis bersama besok? B: Maaf, besok agak..."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>切</rb><rt>き</rt></ruby>ります",furigana:"きります",rom:"kirimasu",id:"memotong; menggunting",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>手</rb><rt>て</rt></ruby>",furigana:"て",rom:"te",id:"tangan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>箸</rb><rt>はし</rt></ruby>",furigana:"はし",rom:"hashi",id:"sumpit",cat:"Kata Benda",lv:"core"},
    {jp:"スプーン",furigana:"",rom:"supūn",id:"sendok",cat:"Kata Benda",lv:"core"},
    {jp:"フォーク",furigana:"",rom:"fōku",id:"garpu",cat:"Kata Benda",lv:"core"},
    {jp:"ナイフ",furigana:"",rom:"naifu",id:"pisau",cat:"Kata Benda",lv:"core"},
    {jp:"はさみ",furigana:"",rom:"hasami",id:"gunting",cat:"Kata Benda",lv:"core"},
    {jp:"ホッチキス",furigana:"",rom:"hotchikisu",id:"stapler",cat:"Kata Benda",lv:"core"},
    {jp:"セロテープ",furigana:"",rom:"serotēpu",id:"selotip",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>消しゴム</rb><rt>けしごむ</rt></ruby>",furigana:"けしごむ",rom:"keshigomu",id:"karet penghapus",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>紙</rb><rt>かみ</rt></ruby>",furigana:"かみ",rom:"kami",id:"kertas",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>切符</rb><rt>きっぷ</rt></ruby>",furigana:"きっぷ",rom:"kippu",id:"karcis",cat:"Kata Benda",lv:"core"},
    {jp:"レポート",furigana:"",rom:"repōto",id:"laporan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>一緒</rb><rt>いっしょ</rt></ruby>に",furigana:"いっしょに",rom:"issho ni",id:"bersama",cat:"Ekspresi",lv:"core"},
    {jp:"もう",furigana:"",rom:"mō",id:"sudah",cat:"Kata Keterangan",lv:"core"},
    {jp:"まだ",furigana:"",rom:"mada",id:"belum",cat:"Kata Keterangan",lv:"core"},
    {jp:"げんきです",furigana:"",rom:"genki desu",id:"kabar baik; energik",cat:"Ekspresi",lv:"core"},
    {jp:"これから",furigana:"",rom:"kore kara",id:"dari sekarang",cat:"Ekspresi",lv:"core"},
    {jp:"いいですね",furigana:"",rom:"ii desu ne",id:"bagus ya; baik ya",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>荷物</rb><rt>にもつ</rt></ruby>",furigana:"にもつ",rom:"nimotsu",id:"barang bawaan",cat:"Kata Benda",lv:"core"}
  ]
},
{
  num: 11,
  title: "Kata Sifat",
  sub: "KS い / KS な / bentuk negatif",
  color: "bab-11",
  bunpou: [
    {
      tag: "A", label: "<ruby><rb>形容詞</rb><rt>けいようし</rt></ruby>（Kata Sifat）",
      pattern: "KB は KS です",
      desc: "Kata sifat digunakan sebagai predikat dan dalam kalimat seperti KB は KS です, kata sifat menunjukkan keadaan kata benda atau digunakan untuk menggambarkan kata benda. Kata sifat dibagi kedalam dua kelompok, yaitu kata sifat akhiran い dan kata sifat akhiran な.",
      reibun: [
        {jp:"<ruby><rb>富士山</rb><rt>ふじさん</rt></ruby>は <ruby><rb>高</rb><rt>たか</rt></ruby>いです。", rom:"Fuji san wa takai desu.", id:"Gunung Fuji tinggi."},
        {jp:"わたしの <ruby><rb>部屋</rb><rt>へや</rt></ruby>は きれいです。", rom:"Watashi no heya wa kirei desu.", id:"Kamar saya bersih."},
        {jp:"A：<ruby><rb>日本</rb><rt>にほん</rt></ruby>の <ruby><rb>生活</rb><rt>せいかつ</rt></ruby>は どうですか。 B：とても <ruby><rb>楽</rb><rt>たの</rt></ruby>しいです。", rom:"A: Nihon no seikatsu wa dō desu ka. B: Totemo tanoshii desu.", id:"A: Bagaimana kehidupan di Jepang? B: Sangat menyenangkan."}
      ]
    },
    {
      tag: "B", label: "KS い（〜い）くないです／KS な（〜な）じゃ ありません",
      pattern: "KS い → くないです / KS な → じゃ ありません",
      desc: "Bentuk negatif non-lampau kata sifat い dibentuk dengan mengubah akhiran い dan melekatkan くないです pada kata sifat tersebut. Bentuk negatif non-lampau kata sifat な dibentuk dengan mengubah akhiran な dan melekatkan じゃ ありません pada kata sifat tersebut.",
      reibun: [
        {jp:"<ruby><rb>今日</rb><rt>きょう</rt></ruby>は <ruby><rb>寒</rb><rt>さむ</rt></ruby>くないです。", rom:"Kyō wa samuku nai desu.", id:"Hari ini tidak dingin."},
        {jp:"<ruby><rb>田中</rb><rt>たなか</rt></ruby>さんは <ruby><rb>元気</rb><rt>げんき</rt></ruby>じゃ ありません。", rom:"Tanaka san wa genki ja arimasen.", id:"Tanaka tidak bersemangat."},
        {jp:"あの レストランの オーナーは あまり <ruby><rb>親切</rb><rt>しんせつ</rt></ruby>じゃ ありません。", rom:"Ano resutoran no ōnā wa amari shinsetsu ja arimasen.", id:"Pemilik restoran itu kurang baik hati."}
      ]
    }
  ],
  kotoba: [
    {jp:"ハンサム（な）",furigana:"",rom:"hansamu (na)",id:"tampan; gagah",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"きれい（な）",furigana:"",rom:"kirei (na)",id:"cantik; bersih",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>親切</rb><rt>しんせつ</rt></ruby>（な）",furigana:"しんせつ（な）",rom:"shinsetsu (na)",id:"baik hati",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>元気</rb><rt>げんき</rt></ruby>（な）",furigana:"げんき（な）",rom:"genki (na)",id:"energik; sehat",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>暇</rb><rt>ひま</rt></ruby>（な）",furigana:"ひま（な）",rom:"hima (na)",id:"senggang; memiliki banyak waktu luang",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"すてき（な）",furigana:"",rom:"suteki (na)",id:"bagus; indah",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"いい（よい）",furigana:"",rom:"ii (yoi)",id:"bagus",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>悪</rb><rt>わる</rt></ruby>い",furigana:"わるい",rom:"warui",id:"buruk; jelek",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>暑</rb><rt>あつ</rt></ruby>い・<ruby><rb>熱</rb><rt>あつ</rt></ruby>い",furigana:"あつい・あつい",rom:"atsui/atsui",id:"panas",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>寒</rb><rt>さむ</rt></ruby>い",furigana:"さむい",rom:"samui",id:"dingin (cuaca)",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>冷</rb><rt>つめ</rt></ruby>たい",furigana:"つめたい",rom:"tsumetai",id:"dingin (benda, orang)",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>難</rb><rt>むずか</rt></ruby>しい",furigana:"むずかしい",rom:"muzukashii",id:"sulit; susah",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>易</rb><rt>やさ</rt></ruby>しい",furigana:"やさしい",rom:"yasashii",id:"mudah; gampang",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>高</rb><rt>たか</rt></ruby>い",furigana:"たかい",rom:"takai",id:"mahal; tinggi",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>安</rb><rt>やす</rt></ruby>い",furigana:"やすい",rom:"yasui",id:"murah",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>低</rb><rt>ひく</rt></ruby>い",furigana:"ひくい",rom:"hikui",id:"rendah",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"おもしろい",furigana:"",rom:"omoshiroi",id:"menarik",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"おいしい",furigana:"",rom:"oishii",id:"enak; lezat",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>忙</rb><rt>いそが</rt></ruby>しい",furigana:"いそがしい",rom:"isogashii",id:"sibuk",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>楽</rb><rt>たの</rt></ruby>しい",furigana:"たのしい",rom:"tanoshii",id:"menyenangkan",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>食</rb><rt>た</rt></ruby>べ<ruby><rb>物</rb><rt>もの</rt></ruby>",furigana:"たべもの",rom:"tabemono",id:"makanan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>生活</rb><rt>せいかつ</rt></ruby>",furigana:"せいかつ",rom:"seikatsu",id:"kehidupan",cat:"Kata Benda",lv:"core"},
    {jp:"とても",furigana:"",rom:"totemo",id:"sangat; ~ sekali",cat:"Kata Keterangan",lv:"core"},
    {jp:"あまり",furigana:"",rom:"amari",id:"kurang begitu~; tidak terlalu ~",cat:"Kata Keterangan",lv:"core"},
    {jp:"〜が、〜",furigana:"",rom:"~ga, ~",id:"~ tetapi, ~",cat:"Konjungsi",lv:"core"},
    {jp:"どう",furigana:"",rom:"dō",id:"bagaimana",cat:"Kata Tanya",lv:"core"},
    {jp:"そして",furigana:"",rom:"soshite",id:"kemudian; dan",cat:"Konjungsi",lv:"core"},
    {jp:"そうですね",furigana:"",rom:"sō desu ne",id:"begitu ya?; bagaimana ya?",cat:"Ekspresi",lv:"core"},
    {jp:"よかったですね",furigana:"",rom:"yokatta desu ne",id:"syukurlah",cat:"Ekspresi",lv:"extra"},
    {jp:"（お）<ruby><rb>仕事</rb><rt>しごと</rt></ruby>",furigana:"（お）しごと",rom:"(o)shigoto",id:"pekerjaan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>家賃</rb><rt>やちん</rt></ruby>",furigana:"やちん",rom:"yachin",id:"sewa rumah",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>",furigana:"べんきょう",rom:"benkyō",id:"belajar",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>富士山</rb><rt>ふじさん</rt></ruby>",furigana:"ふじさん",rom:"Fuji san",id:"Gunung Fuji",cat:"Kata Benda",lv:"extra"}
  ]
},
{
  num: 12,
  title: "Kata Sifat sebagai Penerang KB",
  sub: "KS い KB / KS な KB / どんな KB",
  color: "bab-12",
  bunpou: [
    {
      tag: "A", label: "KS い（〜い）／KS な（〜な）KB",
      pattern: "KS い/な + KB",
      desc: "Ketika kata sifat digunakan untuk menerangkan kata benda, kata sifat tersebut diletakkan di depan kata benda. Untuk kata sifat な tidak perlu menghilangkan akhiran な pada kata sifat tersebut.",
      reibun: [
        {jp:"<ruby><rb>富士山</rb><rt>ふじさん</rt></ruby>は <ruby><rb>高</rb><rt>たか</rt></ruby>い <ruby><rb>山</rb><rt>やま</rt></ruby>です。", rom:"Fuji san wa takai yama desu.", id:"Gunung Fuji adalah gunung yang tinggi."},
        {jp:"<ruby><rb>大阪</rb><rt>おおさか</rt></ruby>は にぎやかな <ruby><rb>町</rb><rt>まち</rt></ruby>です。", rom:"Ōsaka wa nigiyaka na machi desu.", id:"Osaka adalah kota yang ramai."},
        {jp:"<ruby><rb>京都</rb><rt>きょうと</rt></ruby>は きれいな ところです。", rom:"Kyōto wa kirei na tokoro desu.", id:"Kyoto adalah tempat yang indah."}
      ]
    },
    {
      tag: "B", label: "KB₁ は どんな KB₂ ですか",
      pattern: "KB₁ は どんな KB₂ ですか",
      desc: "どんな menerangkan kata benda dan sebagai kalimat tanya untuk menanyakan tentang keadaan atau sifat seseorang, benda dan lain-lain.",
      reibun: [
        {jp:"A：<ruby><rb>東京</rb><rt>とうきょう</rt></ruby>は どんな <ruby><rb>町</rb><rt>まち</rt></ruby>ですか。 B：<ruby><rb>大</rb><rt>おお</rt></ruby>きい <ruby><rb>町</rb><rt>まち</rt></ruby>です。", rom:"A: Tōkyō wa donna machi desu ka. B: Ōkii machi desu.", id:"A: Seperti apa kota Tokyo itu? B: Kota yang besar."},
        {jp:"A：<ruby><rb>中村</rb><rt>なかむら</rt></ruby>さんは どんな <ruby><rb>人</rb><rt>ひと</rt></ruby>ですか。 B：ハンサムな <ruby><rb>人</rb><rt>ひと</rt></ruby>です。", rom:"A: Nakamura san wa donna hito desu ka. B: Hansamu na hito desu.", id:"A: Nakamura itu seperti apa orangnya? B: Orang yang tampan."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>静</rb><rt>しず</rt></ruby>か（な）",furigana:"しずか（な）",rom:"shizuka (na)",id:"sunyi; tenang",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"にぎやか（な）",furigana:"",rom:"nigiyaka (na)",id:"ramai",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>有名</rb><rt>ゆうめい</rt></ruby>（な）",furigana:"ゆうめい（な）",rom:"yūmei (na)",id:"terkenal",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>便利</rb><rt>べんり</rt></ruby>（な）",furigana:"べんり（な）",rom:"benri (na)",id:"praktis",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>大</rb><rt>おお</rt></ruby>きい",furigana:"おおきい",rom:"ōkii",id:"besar",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>小</rb><rt>ちい</rt></ruby>さい",furigana:"ちいさい",rom:"chiisai",id:"kecil",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>新</rb><rt>あたら</rt></ruby>しい",furigana:"あたらしい",rom:"atarashii",id:"baru",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>古</rb><rt>ふる</rt></ruby>い",furigana:"ふるい",rom:"furui",id:"lama; tua",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>白</rb><rt>しろ</rt></ruby>い",furigana:"しろい",rom:"shiroi",id:"putih",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>黒</rb><rt>くろ</rt></ruby>い",furigana:"くろい",rom:"kuroi",id:"hitam",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>赤</rb><rt>あか</rt></ruby>い",furigana:"あかい",rom:"akai",id:"merah",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>青</rb><rt>あお</rt></ruby>い",furigana:"あおい",rom:"aoi",id:"biru",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>町</rb><rt>まち</rt></ruby>",furigana:"まち",rom:"machi",id:"kota",cat:"Kata Benda",lv:"core"},
    {jp:"ところ",furigana:"",rom:"tokoro",id:"tempat",cat:"Kata Benda",lv:"core"},
    {jp:"どんな〜",furigana:"",rom:"donna ~",id:"yang bagaimana ~",cat:"Kata Tanya",lv:"core"},
    {jp:"（ご）<ruby><rb>出身</rb><rt>しゅっしん</rt></ruby>",furigana:"（ご）しゅっしん",rom:"(go)shusshin",id:"tempat kelahiran; asal",cat:"Kata Benda",lv:"core"},
    {jp:"どちらの ご<ruby><rb>出身</rb><rt>しゅっしん</rt></ruby>ですか",furigana:"",rom:"dochira no goshusshin desu ka",id:"dari mana asal Anda?",cat:"Ekspresi",lv:"extra"},
    {jp:"<ruby><rb>最近</rb><rt>さいきん</rt></ruby>",furigana:"さいきん",rom:"saikin",id:"akhir-akhir ini",cat:"Kata Keterangan",lv:"extra"},
    {jp:"<ruby><rb>服</rb><rt>ふく</rt></ruby>",furigana:"ふく",rom:"fuku",id:"pakaian",cat:"Kata Benda",lv:"extra"},
    {jp:"お<ruby><rb>寺</rb><rt>てら</rt></ruby>",furigana:"おてら",rom:"otera",id:"kuil",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>台湾</rb><rt>たいわん</rt></ruby>",furigana:"たいわん",rom:"Taiwan",id:"Taiwan",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>福岡</rb><rt>ふくおか</rt></ruby>",furigana:"ふくおか",rom:"Fukuoka",id:"Fukuoka",cat:"Kata Benda",lv:"extra"}
  ]
},
{
  num: 13,
  title: "Suka, Pandai, dan Alasan",
  sub: "KB が すきです / じょうずです / 〜から、〜",
  color: "bab-13",
  bunpou: [
    {
      tag: "A", label: "KB が <ruby><rb>好</rb><rt>す</rt></ruby>きです／<ruby><rb>上手</rb><rt>じょうず</rt></ruby>です／わかります／あります",
      pattern: "KB が + すきです / じょうずです / わかります / あります",
      desc: "Objek dari beberapa kata kerja dan kata sifat ditandai dengan partikel が.",
      reibun: [
        {jp:"わたしは スポーツが <ruby><rb>好</rb><rt>す</rt></ruby>きです。", rom:"Watashi wa supōtsu ga suki desu.", id:"Saya suka olahraga."},
        {jp:"ユナさんは ダンスが <ruby><rb>上手</rb><rt>じょうず</rt></ruby>です。", rom:"Yuna san wa dansu ga jōzu desu.", id:"Yuna pandai berdansa."},
        {jp:"ジョシュアさんは <ruby><rb>漢字</rb><rt>かんじ</rt></ruby>が <ruby><rb>少</rb><rt>すこ</rt></ruby>し わかります。", rom:"Joshua san wa kanji ga sukoshi wakarimasu.", id:"Joshua sedikit mengerti kanji."},
        {jp:"わたしは <ruby><rb>車</rb><rt>くるま</rt></ruby>が あります。", rom:"Watashi wa kuruma ga arimasu.", id:"Saya punya mobil."}
      ]
    },
    {
      tag: "B", label: "〜から、〜",
      pattern: "〜から、〜",
      desc: "Pernyataan sebelum から memberikan alasan atas pernyataan sebelumnya. Digunakan juga untuk menyatakan sesuatu dan menambahkan alasannya dengan menambahkan 〜から.",
      reibun: [
        {jp:"<ruby><rb>忙</rb><rt>いそが</rt></ruby>しいですから、テレビを <ruby><rb>見</rb><rt>み</rt></ruby>ません。", rom:"Isogashii desu kara, terebi o mimasen.", id:"Karena sibuk, saya tidak menonton TV."},
        {jp:"お<ruby><rb>金</rb><rt>かね</rt></ruby>が ありませんから、<ruby><rb>買</rb><rt>か</rt></ruby>い<ruby><rb>物</rb><rt>もの</rt></ruby>を しません。", rom:"Okane ga arimasen kara, kaimono o shimasen.", id:"Karena tidak punya uang, saya tidak berbelanja."},
        {jp:"A：あした どうして コンサートへ <ruby><rb>行</rb><rt>い</rt></ruby>きませんか。 B：アルバイトが ありますから。", rom:"A: Ashita dōshite konsāto e ikimasen ka. B: Arubaito ga arimasu kara.", id:"A: Kenapa besok tidak pergi ke konser? B: Karena ada kerja paruh waktu."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>分</rb><rt>わか</rt></ruby>かります",furigana:"わかります",rom:"wakarimasu",id:"mengerti",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"あります",furigana:"",rom:"arimasu",id:"ada; mempunyai",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>好</rb><rt>す</rt></ruby>き（な）",furigana:"すき（な）",rom:"suki (na)",id:"suka; gemar",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>嫌</rb><rt>きら</rt></ruby>い（な）",furigana:"きらい（な）",rom:"kirai (na)",id:"tidak suka",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>上手</rb><rt>じょうず</rt></ruby>（な）",furigana:"じょうず（な）",rom:"jōzu (na)",id:"pandai; mahir",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>下手</rb><rt>へた</rt></ruby>（な）",furigana:"へた（な）",rom:"heta (na)",id:"tidak pandai; tidak mahir",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"いろいろ（な）",furigana:"",rom:"iroiro (na)",id:"berbagai macam",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>料理</rb><rt>りょうり</rt></ruby>",furigana:"りょうり",rom:"ryōri",id:"masakan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>飲</rb><rt>の</rt></ruby>み<ruby><rb>物</rb><rt>もの</rt></ruby>",furigana:"のみもの",rom:"nomimono",id:"minuman",cat:"Kata Benda",lv:"core"},
    {jp:"スポーツ",furigana:"",rom:"supōtsu",id:"olahraga",cat:"Kata Benda",lv:"core"},
    {jp:"ダンス",furigana:"",rom:"dansu",id:"dansa",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>漢字</rb><rt>かんじ</rt></ruby>",furigana:"かんじ",rom:"kanji",id:"Kanji",cat:"Kata Benda",lv:"core"},
    {jp:"ひらがな",furigana:"",rom:"hiragana",id:"Hiragana",cat:"Kata Benda",lv:"core"},
    {jp:"カタカナ",furigana:"",rom:"katakana",id:"Katakana",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>外国語</rb><rt>がいこくご</rt></ruby>",furigana:"がいこくご",rom:"gaikokugo",id:"bahasa asing",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>夫</rb><rt>おっと</rt></ruby>",furigana:"おっと",rom:"otto",id:"suami (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>妻</rb><rt>つま</rt></ruby>",furigana:"つま",rom:"tsuma",id:"istri (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"よく",furigana:"",rom:"yoku",id:"dengan baik; sering",cat:"Kata Keterangan",lv:"core"},
    {jp:"だいたい",furigana:"",rom:"daitai",id:"kira-kira",cat:"Kata Keterangan",lv:"core"},
    {jp:"たくさん",furigana:"",rom:"takusan",id:"banyak",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>少</rb><rt>すこ</rt></ruby>し",furigana:"すこし",rom:"sukoshi",id:"sedikit",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>全然</rb><rt>ぜんぜん</rt></ruby>",furigana:"ぜんぜん",rom:"zenzen",id:"sama sekali (diikuti bentuk negatif)",cat:"Kata Keterangan",lv:"core"},
    {jp:"どうして",furigana:"",rom:"dōshite",id:"kenapa",cat:"Kata Tanya",lv:"core"},
    {jp:"〜から",furigana:"",rom:"~kara",id:"karena ~; sebab ~",cat:"Konjungsi",lv:"core"},
    {jp:"ご<ruby><rb>主人</rb><rt>しゅじん</rt></ruby>",furigana:"ごしゅじん",rom:"goshujin",id:"suami (Anda/orang lain)",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>奥</rb><rt>おく</rt></ruby>さん",furigana:"おくさん",rom:"okusan",id:"istri (Anda/orang lain)",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>子</rb><rt>こ</rt></ruby>ども",furigana:"こども",rom:"kodomo",id:"anak (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>子</rb><rt>こ</rt></ruby>さん",furigana:"おこさん",rom:"okosan",id:"anak (Anda/orang lain)",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>歴史</rb><rt>れきし</rt></ruby>",furigana:"れきし",rom:"rekishi",id:"sejarah",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>時間</rb><rt>じかん</rt></ruby>",furigana:"じかん",rom:"jikan",id:"jam; waktu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>約束</rb><rt>やくそく</rt></ruby>",furigana:"やくそく",rom:"yakusoku",id:"janji; janji temu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>用事</rb><rt>ようじ</rt></ruby>",furigana:"ようじ",rom:"yōji",id:"urusan",cat:"Kata Benda",lv:"core"},
    {jp:"チケット",furigana:"",rom:"chiketto",id:"tiket",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>細</rb><rt>こま</rt></ruby>かいお<ruby><rb>金</rb><rt>かね</rt></ruby>",furigana:"こまかいおかね",rom:"komakai okane",id:"uang kecil; receh",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>残念</rb><rt>ざんねん</rt></ruby>です",furigana:"ざんねんです",rom:"zannen desu",id:"sayang sekali",cat:"Ekspresi",lv:"core"},
    {jp:"はやく",furigana:"",rom:"hayaku",id:"dengan cepat",cat:"Kata Keterangan",lv:"core"},
    {jp:"〜<ruby><rb>買</rb><rt>か</rt></ruby>い<ruby><rb>物</rb><rt>もの</rt></ruby>",furigana:"かいもの",rom:"kaimono",id:"belanja",cat:"Kata Benda",lv:"extra"},
    {jp:"コンサート",furigana:"",rom:"konsāto",id:"konser",cat:"Kata Benda",lv:"core"},
    {jp:"カラオケ",furigana:"",rom:"karaoke",id:"karaoke",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>絵</rb><rt>え</rt></ruby>",furigana:"え",rom:"e",id:"gambar; lukisan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>字</rb><rt>じ</rt></ruby>",furigana:"じ",rom:"ji",id:"huruf; karakter",cat:"Kata Benda",lv:"core"},
    {jp:"バスケットボール",furigana:"",rom:"basukettobōru",id:"bola basket",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>野球</rb><rt>やきゅう</rt></ruby>",furigana:"やきゅう",rom:"yakyū",id:"bisbol; bola kasti",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>歌</rb><rt>うた</rt></ruby>",furigana:"うた",rom:"uta",id:"lagu",cat:"Kata Benda",lv:"core"}
  ]
},
{
  num: 14,
  title: "Keberadaan",
  sub: "あります / います / posisi",
  color: "bab-14",
  bunpou: [
    {
      tag: "A", label: "あります／います",
      pattern: "あります / います",
      desc: "あります dan います menyatakan keberadaan benda atau orang. あります digunakan untuk menyatakan keberadaan benda mati, seperti tumbuhan dan benda lainnya yang tidak dapat bergerak dengan sendirinya. います digunakan untuk makhluk hidup yang dapat bergerak sendiri, seperti manusia dan binatang.",
      reibun: []
    },
    {
      tag: "B", label: "Tempat に KB が あります／います",
      pattern: "Tempat に + KB が + あります/います",
      desc: "Bentuk kalimat ini digunakan untuk menyatakan keberadaan benda atau orang di suatu tempat tertentu. Partikel に mengindikasikan tempat keberadaan.",
      reibun: [
        {jp:"あそこに <ruby><rb>公園</rb><rt>こうえん</rt></ruby>が あります。", rom:"Asoko ni kōen ga arimasu.", id:"Di sana ada taman."},
        {jp:"A：<ruby><rb>教室</rb><rt>きょうしつ</rt></ruby>に だれが いますか。 B：かおりさんが います。", rom:"A: Kyōshitsu ni dare ga imasu ka. B: Kaori san ga imasu.", id:"A: Siapa yang ada di ruang kelas? B: Kaori ada di sana."}
      ]
    },
    {
      tag: "C", label: "KB は Tempat に あります／います",
      pattern: "KB は + Tempat に + あります/います",
      desc: "Bentuk kalimat ini menjadikan kata benda (benda atau orang) sebagai subjek atau topik pembicaraan.",
      reibun: [
        {jp:"ジョシュアさんは <ruby><rb>図書館</rb><rt>としょかん</rt></ruby>に います。", rom:"Joshua san wa toshokan ni imasu.", id:"Joshua ada di perpustakaan."},
        {jp:"A：<ruby><rb>東京</rb><rt>とうきょう</rt></ruby>ディズニーランドは どこに ありますか。 B：<ruby><rb>千葉県</rb><rt>ちばけん</rt></ruby>に あります。", rom:"A: Tōkyō Dizunīrando wa doko ni arimasu ka. B: Chiba ken ni arimasu.", id:"A: Tokyo Disneyland ada di mana? B: Ada di Prefektur Chiba."}
      ]
    },
    {
      tag: "D", label: "KB₁（benda/orang/tempat）の KB₂（posisi）",
      pattern: "KB₁ の KB₂（posisi）",
      desc: "Ketika KB₂ menunjukkan arah atau posisi, contoh: うえ, した, まえ, うしろ, みぎ, ひだり, なか, そと, となり, ちかく atau あいだ, berarti menunjukkan hubungan posisi antara KB₁ dan KB₂.",
      reibun: [
        {jp:"<ruby><rb>机</rb><rt>つくえ</rt></ruby>の <ruby><rb>上</rb><rt>うえ</rt></ruby>に <ruby><rb>写真</rb><rt>しゃしん</rt></ruby>が あります。", rom:"Tsukue no ue ni shashin ga arimasu.", id:"Ada foto di atas meja."},
        {jp:"<ruby><rb>太郎</rb><rt>たろう</rt></ruby>さんの <ruby><rb>家</rb><rt>いえ</rt></ruby>は <ruby><rb>駅</rb><rt>えき</rt></ruby>の <ruby><rb>近</rb><rt>ちか</rt></ruby>くに あります。", rom:"Tarō san no ie wa eki no chikaku ni arimasu.", id:"Rumah Taro dekat dengan stasiun."},
        {jp:"コンビニは <ruby><rb>本屋</rb><rt>ほんや</rt></ruby>と <ruby><rb>花屋</rb><rt>はなや</rt></ruby>の <ruby><rb>間</rb><rt>あいだ</rt></ruby>に あります。", rom:"Konbini wa hon'ya to hanaya no aida ni arimasu.", id:"Minimarket ada di antara toko buku dan toko bunga."}
      ]
    }
  ],
  kotoba: [
    {jp:"います",furigana:"",rom:"imasu",id:"ada (untuk benda yang dapat bergerak)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"あります",furigana:"",rom:"arimasu",id:"ada (untuk benda yang tidak dapat bergerak)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>男</rb><rt>おとこ</rt></ruby>の<ruby><rb>子</rb><rt>こ</rt></ruby>",furigana:"おとこのこ",rom:"otoko no ko",id:"anak laki-laki",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>女</rb><rt>おんな</rt></ruby>の<ruby><rb>子</rb><rt>こ</rt></ruby>",furigana:"おんなのこ",rom:"onna no ko",id:"anak perempuan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>犬</rb><rt>いぬ</rt></ruby>",furigana:"いぬ",rom:"inu",id:"anjing",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>猫</rb><rt>ねこ</rt></ruby>",furigana:"ねこ",rom:"neko",id:"kucing",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>木</rb><rt>き</rt></ruby>",furigana:"き",rom:"ki",id:"pohon",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>本屋</rb><rt>ほんや</rt></ruby>",furigana:"ほんや",rom:"hon'ya",id:"toko buku",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>花屋</rb><rt>はなや</rt></ruby>",furigana:"はなや",rom:"hanaya",id:"toko bunga",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>公園</rb><rt>こうえん</rt></ruby>",furigana:"こうえん",rom:"kōen",id:"taman",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>下</rb><rt>した</rt></ruby>",furigana:"した",rom:"shita",id:"bawah",cat:"Posisi",lv:"core"},
    {jp:"<ruby><rb>上</rb><rt>うえ</rt></ruby>",furigana:"うえ",rom:"ue",id:"atas",cat:"Posisi",lv:"core"},
    {jp:"<ruby><rb>前</rb><rt>まえ</rt></ruby>",furigana:"まえ",rom:"mae",id:"depan",cat:"Posisi",lv:"core"},
    {jp:"<ruby><rb>後</rb><rt>うし</rt></ruby>ろ",furigana:"うしろ",rom:"ushiro",id:"belakang",cat:"Posisi",lv:"core"},
    {jp:"<ruby><rb>右</rb><rt>みぎ</rt></ruby>",furigana:"みぎ",rom:"migi",id:"kanan",cat:"Posisi",lv:"core"},
    {jp:"<ruby><rb>左</rb><rt>ひだり</rt></ruby>",furigana:"ひだり",rom:"hidari",id:"kiri",cat:"Posisi",lv:"core"},
    {jp:"<ruby><rb>中</rb><rt>なか</rt></ruby>",furigana:"なか",rom:"naka",id:"dalam",cat:"Posisi",lv:"core"},
    {jp:"<ruby><rb>外</rb><rt>そと</rt></ruby>",furigana:"そと",rom:"soto",id:"luar",cat:"Posisi",lv:"core"},
    {jp:"<ruby><rb>隣</rb><rt>となり</rt></ruby>",furigana:"となり",rom:"tonari",id:"sebelah",cat:"Posisi",lv:"core"},
    {jp:"<ruby><rb>近</rb><rt>ちか</rt></ruby>く",furigana:"ちかく",rom:"chikaku",id:"dekat",cat:"Posisi",lv:"core"},
    {jp:"<ruby><rb>間</rb><rt>あいだ</rt></ruby>",furigana:"あいだ",rom:"aida",id:"antara",cat:"Posisi",lv:"core"},
    {jp:"でも",furigana:"",rom:"demo",id:"tapi",cat:"Konjungsi",lv:"core"},
    {jp:"〜や〜",furigana:"",rom:"~ya~",id:"~ dan ~ (dan lain-lain)",cat:"Konjungsi",lv:"core"},
    {jp:"<ruby><rb>電池</rb><rt>でんち</rt></ruby>",furigana:"でんち",rom:"denchi",id:"baterai",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>箱</rb><rt>はこ</rt></ruby>",furigana:"はこ",rom:"hako",id:"kotak",cat:"Kata Benda",lv:"core"},
    {jp:"ドア",furigana:"",rom:"doa",id:"pintu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>窓</rb><rt>まど</rt></ruby>",furigana:"まど",rom:"mado",id:"jendela",cat:"Kata Benda",lv:"core"},
    {jp:"スイッチ",furigana:"",rom:"suicchi",id:"sakelar",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>冷蔵庫</rb><rt>れいぞうこ</rt></ruby>",furigana:"れいぞうこ",rom:"reizōko",id:"kulkas; lemari es",cat:"Kata Benda",lv:"core"},
    {jp:"テーブル",furigana:"",rom:"tēburu",id:"meja makan",cat:"Kata Benda",lv:"core"},
    {jp:"ベッド",furigana:"",rom:"beddo",id:"tempat tidur",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>棚</rb><rt>たな</rt></ruby>",furigana:"たな",rom:"tana",id:"rak",cat:"Kata Benda",lv:"core"},
    {jp:"ポスト",furigana:"",rom:"posuto",id:"pos",cat:"Kata Benda",lv:"extra"},
    {jp:"ビル",furigana:"",rom:"biru",id:"bangunan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>乗</rb><rt>の</rt></ruby>り<ruby><rb>場</rb><rt>ば</rt></ruby>",furigana:"のりば",rom:"noriba",id:"tempat untuk naik kendaraan (taksi, bus, kereta api, dll.)",cat:"Kata Benda",lv:"extra"},
    {jp:"ATM",furigana:"エーティーエム",rom:"ē tī emu",id:"ATM (Anjungan Tunai Mandiri)",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>物</rb><rt>もの</rt></ruby>",furigana:"もの",rom:"mono",id:"barang; benda",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>県</rb><rt>けん</rt></ruby>",furigana:"けん",rom:"ken",id:"prefektur",cat:"Kata Benda",lv:"extra"}
  ]
},
{
  num: 15,
  title: "Kata Bantu Bilangan",
  sub: "<ruby><rb>助数詞</rb><rt>じょすうし</rt></ruby> / 〜つ / 〜<ruby><rb>人</rb><rt>にん</rt></ruby> / 〜<ruby><rb>台</rb><rt>だい</rt></ruby> / 〜<ruby><rb>枚</rb><rt>まい</rt></ruby>",
  color: "bab-15",
  tips: [
    {icon:"📦", title:"Panduan Memilih Kata Bantu Bilangan", text:"<table style='width:100%;font-size:0.8rem;border-collapse:collapse'><tr style='background:rgba(255,255,255,0.06)'><th style='padding:6px 8px;border:1px solid #2e2e40;text-align:left'>Counter</th><th style='padding:6px 8px;border:1px solid #2e2e40;text-align:left'>Dipakai untuk</th><th style='padding:6px 8px;border:1px solid #2e2e40;text-align:left'>Contoh</th></tr><tr><td style='padding:6px 8px;border:1px solid #2e2e40'><b>〜つ</b></td><td style='padding:6px 8px;border:1px solid #2e2e40'>Benda umum (tak beraturan)</td><td style='padding:6px 8px;border:1px solid #2e2e40'>りんご みっつ</td></tr><tr style='background:rgba(255,255,255,0.03)'><td style='padding:6px 8px;border:1px solid #2e2e40'><b>〜<ruby><rb>人</rb><rt>ひと</rt></ruby> (にん)</b></td><td style='padding:6px 8px;border:1px solid #2e2e40'>Orang (kecuali 1 &amp; 2)</td><td style='padding:6px 8px;border:1px solid #2e2e40'>さんにん</td></tr><tr><td style='padding:6px 8px;border:1px solid #2e2e40'><b>〜<ruby><rb>枚</rb><rt>まい</rt></ruby> (まい)</b></td><td style='padding:6px 8px;border:1px solid #2e2e40'>Benda tipis/datar (kertas, prangko, kaos)</td><td style='padding:6px 8px;border:1px solid #2e2e40'>きって いちまい</td></tr><tr style='background:rgba(255,255,255,0.03)'><td style='padding:6px 8px;border:1px solid #2e2e40'><b>〜<ruby><rb>台</rb><rt>だい</rt></ruby> (だい)</b></td><td style='padding:6px 8px;border:1px solid #2e2e40'>Mesin, kendaraan, elektronik</td><td style='padding:6px 8px;border:1px solid #2e2e40'>くるま にだい</td></tr><tr><td style='padding:6px 8px;border:1px solid #2e2e40'><b>〜<ruby><rb>本</rb><rt>ほん</rt></ruby> (ほん)</b></td><td style='padding:6px 8px;border:1px solid #2e2e40'>Benda panjang/silinder (botol, pensil, payung)</td><td style='padding:6px 8px;border:1px solid #2e2e40'>えんぴつ さんぼん</td></tr><tr style='background:rgba(255,255,255,0.03)'><td style='padding:6px 8px;border:1px solid #2e2e40'><b>〜<ruby><rb>冊</rb><rt>さつ</rt></ruby> (さつ)</b></td><td style='padding:6px 8px;border:1px solid #2e2e40'>Buku, majalah, buku catatan</td><td style='padding:6px 8px;border:1px solid #2e2e40'>ほん にさつ</td></tr><tr><td style='padding:6px 8px;border:1px solid #2e2e40'><b>〜<ruby><rb>匹</rb><rt>ひき</rt></ruby>/<ruby><rb>頭</rb><rt>あたま</rt></ruby> (ひき/とう)</b></td><td style='padding:6px 8px;border:1px solid #2e2e40'>Hewan kecil (ひき) / besar (とう)</td><td style='padding:6px 8px;border:1px solid #2e2e40'>いぬ いっぴき</td></tr></table>"},
    {icon:"⚠️", title:"Perubahan Bunyi yang Wajib Dihapal", text:"Counter <b>〜<ruby><rb>本</rb><rt>ほん</rt></ruby></b> berubah bunyi: いっ<b>ぽん</b>・に<b>ほん</b>・さん<b>ぼん</b>・よん<b>ほん</b>・ご<b>ほん</b>・ろっ<b>ぽん</b>・なな<b>ほん</b>・はっ<b>ぽん</b>・きゅう<b>ほん</b>・じゅっ<b>ぽん</b><br>Counter <b>〜<ruby><rb>匹</rb><rt>ひき</rt></ruby></b>: いっ<b>ぴき</b>・に<b>ひき</b>・さん<b>びき</b>・ろっ<b>ぴき</b>・はっ<b>ぴき</b><br>Cara tanya: 〜<b><ruby><rb>何</rb><rt>なん</rt></ruby>つ/<ruby><rb>何</rb><rt>なん</rt></ruby><ruby><rb>人</rb><rt>ひと</rt></ruby>/<ruby><rb>何</rb><rt>なん</rt></ruby><ruby><rb>枚</rb><rt>まい</rt></ruby>/<ruby><rb>何</rb><rt>なん</rt></ruby><ruby><rb>台</rb><rt>だい</rt></ruby>/<ruby><rb>何</rb><rt>なん</rt></ruby><ruby><rb>本</rb><rt>ほん</rt></ruby>/<ruby><rb>何</rb><rt>なん</rt></ruby><ruby><rb>冊</rb><rt>さつ</rt></ruby>/<ruby><rb>何</rb><rt>なん</rt></ruby><ruby><rb>匹</rb><rt>ひき</rt></ruby></b>？"}
  ],
  bunpou: [
    {
      tag: "A", label: "<ruby><rb>助数詞</rb><rt>じょすうし</rt></ruby>（Kata Bantu Bilangan）",
      pattern: "KB + [angka + kata bantu bilangan]",
      desc: "Saat menghitung orang dan benda, digunakan berbagai kata bantu bilangan sesuai dengan benda yang dihitung. Kata keterangan bilangan pada dasarnya diletakkan langsung setelah kata benda, ditambah dengan partikel.",
      note: {type:"amber", text:"<b>⚠️ ひとり・ふたり — pengecualian!</b><br>1 orang = <b>ひとり</b>、2 orang = <b>ふたり</b> (bukan いちにん/ににん). Mulai 3 orang baru pakai 〜にん: さんにん、よにん、ごにん..."},
      reibun: [
        {jp:"りんごを <ruby><rb>四</rb><rt>よ</rt></ruby>っつ <ruby><rb>買</rb><rt>か</rt></ruby>いました。", rom:"Ringo o yottsu kaimashita.", id:"Membeli 4 buah apel."},
        {jp:"<ruby><rb>子</rb><rt>こ</rt></ruby>どもが ふたり います。", rom:"Kodomo ga futari imasu.", id:"Ada dua orang anak."},
        {jp:"パソコンが なんだい ありますか。", rom:"Pasokon ga nandai arimasu ka.", id:"Ada berapa unit komputer?"}
      ]
    }
  ],
  kotoba: [
    {jp:"１つ",furigana:"ひとつ",rom:"hitotsu",id:"satu buah",cat:"Angka",lv:"core"},
    {jp:"２つ",furigana:"ふたつ",rom:"futatsu",id:"dua buah",cat:"Angka",lv:"core"},
    {jp:"３つ",furigana:"みっつ",rom:"mittsu",id:"tiga buah",cat:"Angka",lv:"core"},
    {jp:"４つ",furigana:"よっつ",rom:"yottsu",id:"empat buah",cat:"Angka",lv:"core"},
    {jp:"１<ruby><rb>人</rb><rt>り</rt></ruby>",furigana:"ひとり",rom:"hitori",id:"satu orang",cat:"Angka",lv:"core"},
    {jp:"２<ruby><rb>人</rb><rt>り</rt></ruby>",furigana:"ふたり",rom:"futari",id:"dua orang",cat:"Angka",lv:"core"},
    {jp:"〜<ruby><rb>人</rb><rt>にん</rt></ruby>",furigana:"〜にん",rom:"~nin",id:"~ orang",cat:"Angka",lv:"core"},
    {jp:"〜<ruby><rb>台</rb><rt>だい</rt></ruby>",furigana:"〜だい",rom:"~dai",id:"~ unit (kata bantu bilangan untuk mesin, mobil, dll.)",cat:"Angka",lv:"core"},
    {jp:"〜<ruby><rb>枚</rb><rt>まい</rt></ruby>",furigana:"〜まい",rom:"~mai",id:"~ lembar (kata bantu bilangan untuk kertas, prangko, dll.)",cat:"Angka",lv:"core"},
    {jp:"りんご",furigana:"",rom:"ringo",id:"apel",cat:"Kata Benda",lv:"core"},
    {jp:"みかん",furigana:"",rom:"mikan",id:"jeruk",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>兄弟</rb><rt>きょうだい</rt></ruby>",furigana:"きょうだい",rom:"kyōdai",id:"saudara",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>兄</rb><rt>あに</rt></ruby>",furigana:"あに",rom:"ani",id:"kakak laki-laki (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>兄</rb><rt>にい</rt></ruby>さん",furigana:"おにいさん",rom:"onīsan",id:"kakak laki-laki (orang lain)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>姉</rb><rt>あね</rt></ruby>",furigana:"あね",rom:"ane",id:"kakak perempuan (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>姉</rb><rt>ねえ</rt></ruby>さん",furigana:"おねえさん",rom:"onēsan",id:"kakak perempuan (orang lain)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>弟</rb><rt>おとうと</rt></ruby>",furigana:"おとうと",rom:"otōto",id:"adik laki-laki (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>妹</rb><rt>いもうと</rt></ruby>",furigana:"いもうと",rom:"imōto",id:"adik perempuan (saya)",cat:"Kata Benda",lv:"core"},
    {jp:"いくつ",furigana:"",rom:"ikutsu",id:"berapa banyak",cat:"Kata Tanya",lv:"core"},
    {jp:"かしこまりました",furigana:"",rom:"kashikomarimashita",id:"baik; mengerti (bentuk hormat dari わかりました)",cat:"Ekspresi",lv:"extra"},
    {jp:"５つ",furigana:"いつつ",rom:"itsutsu",id:"lima buah",cat:"Angka",lv:"core"},
    {jp:"６つ",furigana:"むっつ",rom:"muttsu",id:"enam buah",cat:"Angka",lv:"core"},
    {jp:"７つ",furigana:"ななつ",rom:"nanatsu",id:"tujuh buah",cat:"Angka",lv:"core"},
    {jp:"８つ",furigana:"やっつ",rom:"yattsu",id:"delapan buah",cat:"Angka",lv:"core"},
    {jp:"９つ",furigana:"ここのつ",rom:"kokonotsu",id:"sembilan buah",cat:"Angka",lv:"core"},
    {jp:"１０",furigana:"とお",rom:"tō",id:"sepuluh buah",cat:"Angka",lv:"core"},
    {jp:"<ruby><rb>両親</rb><rt>りょうしん</rt></ruby>",furigana:"りょうしん",rom:"ryōshin",id:"orang tua",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>弟</rb><rt>おとうと</rt></ruby>さん",furigana:"おとうとさん",rom:"otōto san",id:"adik laki-laki (orang lain)",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>妹</rb><rt>いもうと</rt></ruby>さん",furigana:"いもうとさん",rom:"imōto san",id:"adik perempuan (orang lain)",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>牛丼</rb><rt>ぎゅうどん</rt></ruby>",furigana:"ぎゅうどん",rom:"gyūdon",id:"gyudon (rice bowl daging sapi)",cat:"Kata Benda",lv:"extra"},
    {jp:"アイスクリーム",furigana:"",rom:"aisukurīmu",id:"es krim",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>切手</rb><rt>きって</rt></ruby>",furigana:"きって",rom:"kitte",id:"prangko",cat:"Kata Benda",lv:"core"},
    {jp:"はがき",furigana:"",rom:"hagaki",id:"kartu pos",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>封筒</rb><rt>ふうとう</rt></ruby>",furigana:"ふうとう",rom:"fūtō",id:"amplop",cat:"Kata Benda",lv:"core"},
    {jp:"（ご）<ruby><rb>注文</rb><rt>ちゅうもん</rt></ruby>",furigana:"（ご）ちゅうもん",rom:"(go)chūmon",id:"pesanan",cat:"Kata Benda",lv:"extra"},
    {jp:"お<ruby><rb>会計</rb><rt>かいけい</rt></ruby>",furigana:"おかいけい",rom:"okaikei",id:"tagihan",cat:"Ekspresi",lv:"extra"},
    {jp:"<ruby><rb>別々</rb><rt>べつべつ</rt></ruby>に",furigana:"べつべつに",rom:"betsubetsu ni",id:"masing-masing",cat:"Ekspresi",lv:"extra"},
    {jp:"お<ruby><rb>持</rb><rt>も</rt></ruby>ち<ruby><rb>帰</rb><rt>かえ</rt></ruby>り",furigana:"おもちかえり",rom:"omochi kaeri",id:"bawa pulang",cat:"Ekspresi",lv:"extra"},
    {jp:"<ruby><rb>日本語学校</rb><rt>にほんごがっこう</rt></ruby>",furigana:"にほんごがっこう",rom:"nihongo gakkō",id:"sekolah bahasa Jepang",cat:"Kata Benda",lv:"extra"}
  ]
},
{
  num: 16,
  title: "Durasi dan Frekuensi",
  sub: "〜<ruby><rb>時間</rb><rt>じかん</rt></ruby> / 〜<ruby><rb>週間</rb><rt>しゅうかん</rt></ruby> / 〜か<ruby><rb>月</rb><rt>げつ</rt></ruby> / 〜<ruby><rb>回</rb><rt>かい</rt></ruby> / かかります",
  color: "bab-16",
  bunpou: [
    {
      tag: "A", label: "Kata Bantu Bilangan（jangka waktu）に 〜<ruby><rb>回</rb><rt>かい</rt></ruby> KK",
      pattern: "[jangka waktu] に 〜<ruby><rb>回</rb><rt>かい</rt></ruby> + KK",
      desc: "Ekspresi untuk menunjukkan frekuensi.",
      reibun: [
        {jp:"１ヶ<ruby><rb>月</rb><rt>げつ</rt></ruby>に ２<ruby><rb>回</rb><rt>かい</rt></ruby> テニスを します。", rom:"Ikkagetsu ni nikai tenisu o shimasu.", id:"Saya bermain tenis 2 kali dalam sebulan."},
        {jp:"１<ruby><rb>週間</rb><rt>しゅうかん</rt></ruby>に １<ruby><rb>回</rb><rt>かい</rt></ruby> お<ruby><rb>酒</rb><rt>さけ</rt></ruby>を <ruby><rb>飲</rb><rt>の</rt></ruby>みます。", rom:"Isshūkan ni ikkai osake o nomimasu.", id:"Saya minum sake 1 kali dalam seminggu."},
        {jp:"１<ruby><rb>年</rb><rt>ねん</rt></ruby>に <ruby><rb>何回</rb><rt>なんかい</rt></ruby>ぐらい <ruby><rb>旅行</rb><rt>りょこう</rt></ruby>を しますか。", rom:"Ichinnen ni nankai gurai ryokō o shimasu ka.", id:"Kira-kira berapa kali dalam setahun Anda pergi tamasya?"}
      ]
    },
    {
      tag: "B", label: "Tempat₁ から Tempat₂ まで KB（kendaraan）で 〜<ruby><rb>分</rb><rt>ふん</rt></ruby>/<ruby><rb>時間</rb><rt>じかん</rt></ruby>/<ruby><rb>日</rb><rt>にち</rt></ruby> かかります",
      pattern: "Tempat₁ から Tempat₂ まで KB で 〜 かかります",
      desc: "Pola kalimat ini digunakan untuk menyatakan waktu yang ditempuh untuk melakukan perjalanan dari satu lokasi ke lokasi lain.",
      reibun: [
        {jp:"うちから <ruby><rb>学校</rb><rt>がっこう</rt></ruby>まで バスで ３０<ruby><rb>分</rb><rt>ぷん</rt></ruby> かかります。", rom:"Uchi kara gakkō made basu de sanjuppun kakarimasu.", id:"Dari rumah ke sekolah naik bus memakan waktu 30 menit."},
        {jp:"A：<ruby><rb>東京</rb><rt>とうきょう</rt></ruby>から <ruby><rb>京都</rb><rt>きょうと</rt></ruby>まで <ruby><rb>新幹線</rb><rt>しんかんせん</rt></ruby>で どのぐらい かかりますか。 B：２<ruby><rb>時間半</rb><rt>じかんはん</rt></ruby>ぐらい かかります。", rom:"A: Tōkyō kara Kyōto made shinkansen de dono gurai kakarimasu ka. B: Nijikanhangurai kakarimasu.", id:"A: Berapa lama dari Tokyo ke Kyoto dengan shinkansen? B: Kira-kira 2,5 jam."}
      ]
    }
  ],
  kotoba: [
    {jp:"かかります",furigana:"",rom:"kakarimasu",id:"memakan; membutuhkan (mengacu pada waktu dan uang)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"〜<ruby><rb>時間</rb><rt>じかん</rt></ruby>",furigana:"〜じかん",rom:"~jikan",id:"~ jam",cat:"Ekspresi",lv:"core"},
    {jp:"〜<ruby><rb>週間</rb><rt>しゅうかん</rt></ruby>",furigana:"〜しゅうかん",rom:"~shūkan",id:"~ minggu",cat:"Ekspresi",lv:"core"},
    {jp:"〜か<ruby><rb>月</rb><rt>げつ</rt></ruby>",furigana:"〜かげつ",rom:"~kagetsu",id:"~ bulan",cat:"Ekspresi",lv:"core"},
    {jp:"〜<ruby><rb>年</rb><rt>ねん</rt></ruby>",furigana:"〜ねん",rom:"~nen",id:"~ tahun",cat:"Ekspresi",lv:"core"},
    {jp:"〜<ruby><rb>回</rb><rt>かい</rt></ruby>",furigana:"〜かい",rom:"~kai",id:"~ kali",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>新幹線</rb><rt>しんかんせん</rt></ruby>",furigana:"しんかんせん",rom:"shinkansen",id:"kereta cepat",cat:"Kata Benda",lv:"core"},
    {jp:"〜ぐらい",furigana:"",rom:"~gurai",id:"sekitar ~; kira-kira ~",cat:"Ekspresi",lv:"core"},
    {jp:"〜だけ",furigana:"",rom:"~dake",id:"hanya",cat:"Ekspresi",lv:"core"},
    {jp:"どのぐらい",furigana:"",rom:"dono gurai",id:"berapa lama (merujuk pada waktu)",cat:"Kata Tanya",lv:"core"},
    {jp:"<ruby><rb>外国</rb><rt>がいこく</rt></ruby>",furigana:"がいこく",rom:"gaikoku",id:"luar negeri",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>大阪</rb><rt>おおさか</rt></ruby>",furigana:"おおさか",rom:"Ōsaka",id:"Osaka",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>広島</rb><rt>ひろしま</rt></ruby>",furigana:"ひろしま",rom:"Hiroshima",id:"Hiroshima",cat:"Kata Benda",lv:"extra"},
    {jp:"ニューヨーク",furigana:"",rom:"Nyū Yōku",id:"New York",cat:"Kata Benda",lv:"extra"},
    {jp:"（<ruby><rb>会社</rb><rt>かいしゃ</rt></ruby>を）<ruby><rb>休</rb><rt>やす</rt></ruby>みます",furigana:"（かいしゃを）やすみます",rom:"(kaisha o) yasumimasu",id:"libur (kerja)",cat:"Kata Kerja",lv:"extra",grp:"I"},
    {jp:"<ruby><rb>風邪</rb><rt>かぜ</rt></ruby>をひきます",furigana:"かぜをひきます",rom:"kaze o hikimasu",id:"masuk angin",cat:"Ekspresi",lv:"extra"},
    {jp:"ホテル",furigana:"",rom:"hoteru",id:"hotel",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>空港</rb><rt>くうこう</rt></ruby>",furigana:"くうこう",rom:"kūkō",id:"bandara",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>山</rb><rt>やま</rt></ruby>",furigana:"やま",rom:"yama",id:"gunung",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>海</rb><rt>うみ</rt></ruby>",furigana:"うみ",rom:"umi",id:"laut",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>重</rb><rt>おも</rt></ruby>い",furigana:"おもい",rom:"omoi",id:"berat",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>軽</rb><rt>かる</rt></ruby>い",furigana:"かるい",rom:"karui",id:"ringan",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>早</rb><rt>はや</rt></ruby>い/<ruby><rb>速</rb><rt>はや</rt></ruby>い",furigana:"はやい",rom:"hayai",id:"cepat",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>遅</rb><rt>おそ</rt></ruby>い",furigana:"おそい",rom:"osoi",id:"lambat",cat:"Kata Sifat",lv:"core",grp:"い"}
  ]
},
{
  num: 17,
  title: "Perbandingan",
  sub: "KB₁ は KB₂ より KS / どちらが / いちばん",
  color: "bab-17",
  bunpou: [
    {
      tag: "A", label: "KB₁ は KB₂ より KS です",
      pattern: "KB₁ は KB₂ より KS です",
      desc: "Pola kalimat ini menyatakan sifat atau kondisi KB₁ jika dibandingkan dengan KB₂.",
      reibun: [
        {jp:"この <ruby><rb>服</rb><rt>ふく</rt></ruby>は あの <ruby><rb>服</rb><rt>ふく</rt></ruby>より <ruby><rb>安</rb><rt>やす</rt></ruby>いです。", rom:"Kono fuku wa ano fuku yori yasui desu.", id:"Baju ini lebih murah dari baju itu."},
        {jp:"<ruby><rb>来週</rb><rt>らいしゅう</rt></ruby>は <ruby><rb>今週</rb><rt>こんしゅう</rt></ruby>より <ruby><rb>忙</rb><rt>いそが</rt></ruby>しいです。", rom:"Raishū wa konshū yori isogashii desu.", id:"Minggu depan lebih sibuk dari minggu ini."},
        {jp:"バオさんは リーさんより ダンスが <ruby><rb>上手</rb><rt>じょうず</rt></ruby>です。", rom:"Bao san wa Rī san yori dansu ga jōzu desu.", id:"Bao lebih pandai berdansa dari Lee."}
      ]
    },
    {
      tag: "B", label: "KB₁ と KB₂ と どちらが KS ですか",
      pattern: "KB₁ と KB₂ と どちらが KS ですか",
      desc: "Kata tanya どちら digunakan untuk membandingkan dua benda.",
      reibun: [
        {jp:"A：<ruby><rb>夏</rb><rt>なつ</rt></ruby>と <ruby><rb>冬</rb><rt>ふゆ</rt></ruby>と どちらが <ruby><rb>好</rb><rt>す</rt></ruby>きですか。 B：<ruby><rb>冬</rb><rt>ふゆ</rt></ruby>の ほうが <ruby><rb>好</rb><rt>す</rt></ruby>きです。", rom:"A: Natsu to fuyu to dochira ga suki desu ka. B: Fuyu no hō ga suki desu.", id:"A: Lebih suka musim panas atau musim dingin? B: Lebih suka musim dingin."},
        {jp:"A：ひらがなと カタカナと どちらが <ruby><rb>難</rb><rt>むずか</rt></ruby>しいですか。 B：どちらも <ruby><rb>難</rb><rt>むずか</rt></ruby>しいです。", rom:"A: Hiragana to katakana to dochira ga muzukashii desu ka. B: Dochira mo muzukashii desu.", id:"A: Hiragana atau Katakana yang lebih sulit? B: Keduanya sulit."}
      ],
      note: {type:"amber", text:"<b>⚠️ どちら vs どれ — Jebakan Umum JLPT!</b><br><b>どちら</b> = yang mana (dari <u>DUA</u> pilihan). <b>どれ</b> = yang mana (dari <u>TIGA atau lebih</u> pilihan).<br>Contoh: 「AとBと どちらが <ruby><rb>好き</rb><rt>す</rt></ruby>ですか」(2 pilihan) ✅ vs 「A・B・C の<ruby><rb>中</rb><rt>なか</rt></ruby>で どれが <ruby><rb>好き</rb><rt>す</rt></ruby>ですか」(3+ pilihan) ✅<br>Jangan tukar keduanya — salah ini sering muncul di soal ujian!"}
    },
    {
      tag: "C", label: "KB（の<ruby><rb>中</rb><rt>なか</rt></ruby>）で <ruby><rb>何</rb><rt>なに</rt></ruby>／どこ／だれ／いつが いちばん KS ですか",
      pattern: "KB の<ruby><rb>中</rb><rt>なか</rt></ruby>で + <ruby><rb>何</rb><rt>なに</rt></ruby>/どこ/だれ/いつが + いちばん + KS ですか",
      desc: "Pola kalimat tanya ini digunakan untuk meminta lawan bicara memilih yang tingkatnya paling tinggi (maksimal) dari suatu kelompok tertentu.",
      reibun: [
        {jp:"A：<ruby><rb>季節</rb><rt>きせつ</rt></ruby>で いつが いちばん <ruby><rb>好</rb><rt>す</rt></ruby>きですか。 B：<ruby><rb>春</rb><rt>はる</rt></ruby>が いちばん <ruby><rb>好</rb><rt>す</rt></ruby>きです。", rom:"A: Kisetsu de itsu ga ichiban suki desu ka. B: Haru ga ichiban suki desu.", id:"A: Di antara musim, kapan yang paling kamu sukai? B: Paling suka musim semi."},
        {jp:"A：<ruby><rb>日本料理</rb><rt>にほんりょうり</rt></ruby>の <ruby><rb>中</rb><rt>なか</rt></ruby>で <ruby><rb>何</rb><rt>なに</rt></ruby>が いちばん おいしいですか。 B：すしが いちばん おいしいです。", rom:"A: Nihon ryōri no naka de nani ga ichiban oishii desu ka. B: Sushi ga ichiban oishii desu.", id:"A: Di antara masakan Jepang, yang mana paling enak? B: Sushi paling enak."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>簡単</rb><rt>かんたん</rt></ruby>（な）",furigana:"かんたん（な）",rom:"kantan (na)",id:"mudah; sederhana",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>近</rb><rt>ちか</rt></ruby>い",furigana:"ちかい",rom:"chikai",id:"dekat",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>遠</rb><rt>とお</rt></ruby>い",furigana:"とおい",rom:"tōi",id:"jauh",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>多</rb><rt>おお</rt></ruby>い",furigana:"おおい",rom:"ōi",id:"banyak",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>少</rb><rt>すく</rt></ruby>ない",furigana:"すくない",rom:"sukunai",id:"sedikit",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>暖</rb><rt>あたた</rt></ruby>かい",furigana:"あたたかい",rom:"atatakai",id:"hangat",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>涼</rb><rt>すず</rt></ruby>しい",furigana:"すずしい",rom:"suzushii",id:"sejuk",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>甘</rb><rt>あま</rt></ruby>い",furigana:"あまい",rom:"amai",id:"manis",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>辛</rb><rt>から</rt></ruby>い",furigana:"からい",rom:"karai",id:"pedas",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>季節</rb><rt>きせつ</rt></ruby>",furigana:"きせつ",rom:"kisetsu",id:"musim",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>春</rb><rt>はる</rt></ruby>",furigana:"はる",rom:"haru",id:"musim semi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>夏</rb><rt>なつ</rt></ruby>",furigana:"なつ",rom:"natsu",id:"musim panas",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>秋</rb><rt>あき</rt></ruby>",furigana:"あき",rom:"aki",id:"musim gugur",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>冬</rb><rt>ふゆ</rt></ruby>",furigana:"ふゆ",rom:"fuyu",id:"musim dingin",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>人口</rb><rt>じんこう</rt></ruby>",furigana:"じんこう",rom:"jinkō",id:"populasi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>世界</rb><rt>せかい</rt></ruby>",furigana:"せかい",rom:"sekai",id:"dunia",cat:"Kata Benda",lv:"core"},
    {jp:"いちばん〜",furigana:"",rom:"ichiban ~",id:"paling ~",cat:"Kata Keterangan",lv:"core"},
    {jp:"より",furigana:"",rom:"yori",id:"dari pada",cat:"Partikel",lv:"core"},
    {jp:"どちら",furigana:"",rom:"dochira",id:"yang mana (bentuk hormat dari どれ)",cat:"Kata Tanya",lv:"core"},
    {jp:"どちらも",furigana:"",rom:"dochira mo",id:"dua-duanya; yang mana juga",cat:"Ekspresi",lv:"core"},
    {jp:"ずっと",furigana:"",rom:"zutto",id:"jauh lebih",cat:"Kata Keterangan",lv:"core"},
    {jp:"〜のほうが",furigana:"",rom:"~no hō ga",id:"~ lebih",cat:"Ekspresi",lv:"core"},
    {jp:"〜はいかがですか",furigana:"",rom:"~wa ikaga desu ka",id:"Apakah Anda mau ~",cat:"Ekspresi",lv:"extra"},
    {jp:"<ruby><rb>年上</rb><rt>としうえ</rt></ruby>",furigana:"としうえ",rom:"toshi ue",id:"lebih tua",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>年下</rb><rt>としした</rt></ruby>",furigana:"としした",rom:"toshi shita",id:"lebih muda",cat:"Kata Benda",lv:"extra"},
    {jp:"〜センチ",furigana:"",rom:"~senchi",id:"~ sentimeter",cat:"Ekspresi",lv:"extra"},
    {jp:"<ruby><rb>日本料理</rb><rt>にほんりょうり</rt></ruby>",furigana:"にほんりょうり",rom:"nihon ryōri",id:"masakan Jepang",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>仏教</rb><rt>ぶっきょう</rt></ruby>のお<ruby><rb>寺</rb><rt>てら</rt></ruby>",furigana:"ぶっきょうのおてら",rom:"bukkyō no otera",id:"Kuil Buddha",cat:"Kata Benda",lv:"extra"},
    {jp:"バイク",furigana:"",rom:"baiku",id:"motor",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>地震</rb><rt>じしん</rt></ruby>",furigana:"じしん",rom:"jishin",id:"gempa bumi",cat:"Kata Benda",lv:"extra"}
  ]
},
{
  num: 18,
  title: "Kata Sifat dan Kata Benda Bentuk Lampau",
  sub: "KS かったです / KS じゃ ありませんでした",
  color: "bab-18",
  bunpou: [
    {
      tag: "A", label: "<ruby><rb>形容詞</rb><rt>けいようし</rt></ruby>／<ruby><rb>名詞</rb><rt>めいし</rt></ruby> <ruby><rb>過去形</rb><rt>かこけい</rt></ruby>（Kata Sifat/Kata Benda Bentuk Lampau）",
      pattern: "KS い → かったです / KS な → でした",
      desc: "Kata benda dan kata sifat dalam bahasa Jepang berkonjugasi sesuai dengan waktu (masa kini atau masa lampau), dan afirmasi (positif atau negatif), seperti halnya kata kerja.",
      table: [
        ["positif non lampau","あつい","さびしい","べんり","ひま","やすみ","あめ"],
        ["negatif non lampau","あつくない","さびしくない","べんりじゃない","ひまじゃない","やすみじゃない","あめじゃない"],
        ["positif lampau","あつかった","さびしかった","べんりだった","ひまだった","やすみだった","あめだった"],
        ["negatif lampau","あつくなかった","さびしくなかった","べんりじゃなかった","ひまじゃなかった","やすみじゃなかった","あめじゃなかった"]
      ],
      reibun: [
        {jp:"きのうは <ruby><rb>涼</rb><rt>すず</rt></ruby>しかったです。", rom:"Kinō wa suzushikatta desu.", id:"Kemarin sejuk."},
        {jp:"<ruby><rb>先週</rb><rt>せんしゅう</rt></ruby>の <ruby><rb>試験</rb><rt>しけん</rt></ruby>は <ruby><rb>簡単</rb><rt>かんたん</rt></ruby>じゃ ありませんでした。", rom:"Senshū no shiken wa kantan ja arimasendeshita.", id:"Ujian minggu lalu tidak mudah."},
        {jp:"パーティーの <ruby><rb>料理</rb><rt>りょうり</rt></ruby>は あまり おいしくなかったです。", rom:"Pātī no ryōri wa amari oishiku nakatta desu.", id:"Masakan di pesta tidak terlalu enak."}
      ],
      note: {type:"amber", text:"<b>⚠️ Dua Cara Negatif Lampau — Jangan Tertukar!</b><br><b>KS い</b>: <ruby><rb>語幹</rb><rt>ごかん</rt></ruby> + <b>くなかった(です)</b> → あつい → あつく<b>なかったです</b><br><b>KS な / KB</b>: 〜 + <b>じゃなかった(です) / じゃありませんでした</b> → べんり → べんり<b>じゃなかったです</b><br>❌ Salah umum: あつい → ×あついじゃなかったです / べんり → ×べんりくなかったです"}
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>疲</rb><rt>つか</rt></ruby>れました",furigana:"つかれました",rom:"tsukaremashita",id:"lelah (bentuk lampau)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>寂</rb><rt>さび</rt></ruby>しい",furigana:"さびしい",rom:"sabishii",id:"kesepian",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>広</rb><rt>ひろ</rt></ruby>い",furigana:"ひろい",rom:"hiroi",id:"lebar; luas",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>狭</rb><rt>せま</rt></ruby>い",furigana:"せまい",rom:"semai",id:"sempit; kecil (ruangan, dll.)",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>晴</rb><rt>は</rt></ruby>れ",furigana:"はれ",rom:"hare",id:"cerah",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>雨</rb><rt>あめ</rt></ruby>",furigana:"あめ",rom:"ame",id:"hujan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>曇</rb><rt>くも</rt></ruby>り",furigana:"くもり",rom:"kumori",id:"berawan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>初</rb><rt>はじ</rt></ruby>めて",furigana:"はじめて",rom:"hajimete",id:"untuk pertama kali",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>雪</rb><rt>ゆき</rt></ruby>",furigana:"ゆき",rom:"yuki",id:"salju",cat:"Kata Benda",lv:"extra"},
    {jp:"アルバイト",furigana:"",rom:"arubaito",id:"kerja paruh waktu",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>歌舞伎</rb><rt>かぶき</rt></ruby>",furigana:"かぶき",rom:"kabuki",id:"Kabuki",cat:"Kata Benda",lv:"extra"},
    {jp:"お<ruby><rb>祭</rb><rt>まつ</rt></ruby>り",furigana:"おまつり",rom:"omatsuri",id:"festival",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>特</rb><rt>とく</rt></ruby>に",furigana:"とくに",rom:"toku ni",id:"terutama; khususnya",cat:"Kata Keterangan",lv:"extra"}
  ]
},
{
  num: 19,
  title: "Ingin",
  sub: "KB が <ruby><rb>欲</rb><rt>ほ</rt></ruby>しいです / KK たいです",
  color: "bab-19",
  bunpou: [
    {
      tag: "A", label: "KB が <ruby><rb>欲</rb><rt>ほ</rt></ruby>しいです : ingin 〜",
      pattern: "KB が <ruby><rb>欲</rb><rt>ほ</rt></ruby>しいです",
      desc: "ほしい adalah kata sifat bentuk い dan objeknya diikuti oleh partikel が.",
      reibun: [
        {jp:"わたしは <ruby><rb>友達</rb><rt>ともだち</rt></ruby>が <ruby><rb>欲</rb><rt>ほ</rt></ruby>しいです。", rom:"Watashi wa tomodachi ga hoshii desu.", id:"Saya ingin punya teman."},
        {jp:"A：<ruby><rb>今</rb><rt>いま</rt></ruby> <ruby><rb>何</rb><rt>なに</rt></ruby>が いちばん <ruby><rb>欲</rb><rt>ほ</rt></ruby>しいですか。 B：<ruby><rb>新</rb><rt>あたら</rt></ruby>しい バイクが <ruby><rb>欲</rb><rt>ほ</rt></ruby>しいです。", rom:"A: Ima nani ga ichiban hoshii desu ka. B: Atarashii baiku ga hoshii desu.", id:"A: Sekarang yang paling kamu inginkan apa? B: Ingin motor baru."}
      ],
      note: {type:"red", text:"<b>🚨 ほしい HANYA untuk pembicara (わたし)!</b><br>ほしい menyatakan keinginan orang <u>pertama (わたし)</u> atau dipakai dalam pertanyaan langsung ke lawan bicara (あなた). <b>Tidak digunakan untuk orang ketiga</b> karena kita tidak bisa tahu pasti perasaan orang lain.<br>❌ × たなかさんは くるまが ほしいです。(salah untuk pernyataan orang ketiga)<br>✅ ○ たなかさんは くるまを ほしがっています。(orang ketiga pakai 〜ほしがっています)"}
    },
    {
      tag: "B", label: "KK bentuk ます たいです : ingin (melakukan) 〜",
      pattern: "KK bentuk ます + たいです",
      desc: "Pola KK bentuk ます たいです digunakan untuk menyatakan keinginan pembicara untuk melakukan sesuatu. Objek dari 〜たい dapat diikuti oleh partikel を atau partikel が.",
      reibun: [
        {jp:"<ruby><rb>日本</rb><rt>にほん</rt></ruby>の <ruby><rb>大学</rb><rt>だいがく</rt></ruby>で <ruby><rb>経済</rb><rt>けいざい</rt></ruby>を（または が） <ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>したいです。", rom:"Nihon no daigaku de keizai o (mata wa ga) benkyō shitai desu.", id:"Ingin belajar ekonomi di universitas Jepang."},
        {jp:"デパートで <ruby><rb>靴</rb><rt>くつ</rt></ruby>を（または が） <ruby><rb>買</rb><rt>か</rt></ruby>いたいです。", rom:"Depāto de kutsu o (mata wa ga) kaitai desu.", id:"Ingin membeli sepatu di toserba."},
        {jp:"おなかが <ruby><rb>痛</rb><rt>いた</rt></ruby>いですから、<ruby><rb>何</rb><rt>なに</rt></ruby>も <ruby><rb>食</rb><rt>た</rt></ruby>べたくないです。", rom:"Onaka ga itai desu kara, nani mo tabetaku nai desu.", id:"Karena sakit perut, tidak ingin makan apapun."}
      ],
      note: {type:"blue", text:"<b>💡 たい + を atau が?</b><br>Objek 〜たい bisa menggunakan <b>を</b> (lebih umum) atau <b>が</b>. Keduanya benar. Negatif 〜たい: ます<ruby><rb>語幹</rb><rt>ごかん</rt></ruby> + <b>たくないです</b>. Contoh: たべ<b>たくない</b> = tidak ingin makan. Sama seperti ほしい, たいです juga hanya untuk orang pertama — orang ketiga pakai 〜<b>たがっています</b>."}
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>欲</rb><rt>ほ</rt></ruby>しい",furigana:"ほしい",rom:"hoshii",id:"ingin",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>経済</rb><rt>けいざい</rt></ruby>",furigana:"けいざい",rom:"keizai",id:"ekonomi",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>腹</rb><rt>なか</rt></ruby>がすきました",furigana:"おなかがすきました",rom:"onaka ga sukimashita",id:"(saya) lapar",cat:"Ekspresi",lv:"core"},
    {jp:"お<ruby><rb>腹</rb><rt>なか</rt></ruby>がいっぱいです",furigana:"おなかがいっぱいです",rom:"onaka ga ippai desu",id:"(saya) kenyang",cat:"Ekspresi",lv:"core"},
    {jp:"どこか",furigana:"",rom:"doko ka",id:"suatu tempat",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>結婚</rb><rt>けっこん</rt></ruby>します",furigana:"けっこんします",rom:"kekkon shimasu",id:"menikah",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>電子</rb><rt>でんし</rt></ruby>レンジ",furigana:"でんしれんじ",rom:"denshi renji",id:"microwave",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>生け花</rb><rt>いけばな</rt></ruby>",furigana:"いけばな",rom:"ikebana",id:"Ikebana (seni merangkai bunga)",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>天気</rb><rt>てんき</rt></ruby>",furigana:"てんき",rom:"tenki",id:"cuaca",cat:"Kata Benda",lv:"core"},
    {jp:"〜のとき",furigana:"",rom:"~no toki",id:"ketika ~",cat:"Ekspresi",lv:"core"},
  ]
},
{
  num: 20,
  title: "Tujuan Pergi",
  sub: "KB（tempat）へ [KK bentuk ます/KB] に <ruby><rb>行</rb><rt>い</rt></ruby>きます",
  color: "bab-20",
  bunpou: [
    {
      tag: "A", label: "KB（tempat）へ [KK bentuk ます / KB] に <ruby><rb>行</rb><rt>い</rt></ruby>きます／<ruby><rb>来</rb><rt>き</rt></ruby>ます／<ruby><rb>帰</rb><rt>かえ</rt></ruby>ります",
      pattern: "KB（tempat）へ + [KK/KB] に + <ruby><rb>行</rb><rt>い</rt></ruby>きます/<ruby><rb>来</rb><rt>き</rt></ruby>ます/<ruby><rb>帰</rb><rt>かえ</rt></ruby>ります",
      desc: "Tujuan dari tindakan いきます, きます dan かえります ditandai dengan partikel に.",
      reibun: [
        {jp:"<ruby><rb>週末</rb><rt>しゅうまつ</rt></ruby> <ruby><rb>京都</rb><rt>きょうと</rt></ruby>へ <ruby><rb>遊</rb><rt>あそ</rt></ruby>びに <ruby><rb>行</rb><rt>い</rt></ruby>きます。", rom:"Shūmatsu Kyōto e asobi ni ikimasu.", id:"Akhir pekan pergi ke Kyoto untuk bermain."},
        {jp:"<ruby><rb>駅</rb><rt>えき</rt></ruby>へ <ruby><rb>友達</rb><rt>ともだち</rt></ruby>を <ruby><rb>迎</rb><rt>むか</rt></ruby>えに <ruby><rb>行</rb><rt>い</rt></ruby>きました。", rom:"Eki e tomodachi o mukae ni ikimashita.", id:"Pergi ke stasiun untuk menjemput teman."},
        {jp:"<ruby><rb>日本</rb><rt>にほん</rt></ruby>へ <ruby><rb>美術</rb><rt>びじゅつ</rt></ruby>の <ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>に <ruby><rb>来</rb><rt>き</rt></ruby>ました。", rom:"Nihon e bijutsu no benkyō ni kimashita.", id:"Datang ke Jepang untuk belajar seni."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>遊</rb><rt>あそ</rt></ruby>びます",furigana:"あそびます",rom:"asobimasu",id:"bermain",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>泳</rb><rt>およ</rt></ruby>ぎます",furigana:"およぎます",rom:"oyogimasu",id:"berenang",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>買</rb><rt>か</rt></ruby>い<ruby><rb>物</rb><rt>もの</rt></ruby>します",furigana:"かいものします",rom:"kaimono shimasu",id:"berbelanja",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>食事</rb><rt>しょくじ</rt></ruby>します",furigana:"しょくじします",rom:"shokuji shimasu",id:"makan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>散歩</rb><rt>さんぽ</rt></ruby>します",furigana:"さんぽします",rom:"sanpo shimasu",id:"berjalan santai",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>迎</rb><rt>むか</rt></ruby>えます",furigana:"むかえます",rom:"mukaemasu",id:"menjemput",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>市役所</rb><rt>しやくしょ</rt></ruby>",furigana:"しやくしょ",rom:"shiyakusho",id:"kantor dinas kependudukan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>大使館</rb><rt>たいしかん</rt></ruby>",furigana:"たいしかん",rom:"taishikan",id:"kedutaan besar",cat:"Kata Benda",lv:"core"},
    {jp:"スキー",furigana:"",rom:"sukī",id:"ski",cat:"Kata Benda",lv:"core"},
    {jp:"プール",furigana:"",rom:"pūru",id:"kolam renang",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>会議</rb><rt>かいぎ</rt></ruby>",furigana:"かいぎ",rom:"kaigi",id:"rapat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>週末</rb><rt>しゅうまつ</rt></ruby>",furigana:"しゅうまつ",rom:"shūmatsu",id:"akhir pekan",cat:"Kata Benda",lv:"core"},
    {jp:"〜ごろ",furigana:"",rom:"~goro",id:"sekitar ~ (waktu)",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>大丈夫</rb><rt>だいじょうぶ</rt></ruby>",furigana:"だいじょうぶ",rom:"daijōbu",id:"tidak apa-apa",cat:"Ekspresi",lv:"extra"},
    {jp:"フランス",furigana:"",rom:"Furansu",id:"Prancis",cat:"Kata Benda",lv:"extra"},
    {jp:"クラシック",furigana:"",rom:"kurashikku",id:"musik klasik",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>住民票</rb><rt>じゅうみんひょう</rt></ruby>",furigana:"じゅうみんひょう",rom:"jūminhyō",id:"sertifikat kependudukan",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>今度</rb><rt>こんど</rt></ruby>",furigana:"こんど",rom:"kondo",id:"lain waktu",cat:"Ekspresi",lv:"extra"},
    {jp:"<ruby><rb>新宿</rb><rt>しんじゅく</rt></ruby>",furigana:"しんじゅく",rom:"Shinjuku",id:"Shinjuku",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>池袋</rb><rt>いけぶくろ</rt></ruby>",furigana:"いけぶくろ",rom:"Ikebukuro",id:"Ikebukuro",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>京都</rb><rt>きょうと</rt></ruby>",furigana:"きょうと",rom:"Kyōto",id:"Kyoto",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>北海道</rb><rt>ほっかいどう</rt></ruby>",furigana:"ほっかいどう",rom:"Hokkaidō",id:"Hokkaido",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>ビザ</rb><rt>びざ</rt></ruby>を<ruby><rb>取</rb><rt>と</rt></ruby>ります",furigana:"びざをとります",rom:"biza o torimasu",id:"mengambil (visa)",cat:"Kata Kerja",lv:"extra",grp:"I"}
  ]
},
{
  num: 21,
  title: "Kata Kerja Bentuk て",
  sub: "Tolong ~; Bagaimana kalau ~?",
  color: "bab-21",
  bunpou: [
    {
      tag: "A", label: "<ruby><rb>動詞</rb><rt>どうし</rt></ruby> て<ruby><rb>形</rb><rt>けい</rt></ruby> (Kata Kerja Bentuk て)",
      pattern: "Kata kerja dengan akhiran て atau で",
      desc: "Kata kerja dengan akhiran て atau で disebut kata kerja bentuk て. Pola konjugasi bergantung pada kelompok kata kerja.",
      note: {type:"blue", text:"Grup I: い/ち/り→って, み/び/に→んで, き→いて, ぎ→いで, し→して | Grup II: ます→て | Grup III: きます→きて, します→して"},
      table: [
        ["かいます","かって"],["まちます","まって"],["かえります","かえって"],
        ["よみます","よんで"],["あそびます","あそんで"],["しにます","しんで"],
        ["かきます","かいて"],["およぎます","およいで"],["はなします","はなして"],
        ["たべます","たべて"],["ねます","ねて"],["おきます","おきて"],
        ["きます","きて"],["します","して"]
      ],
      reibun: []
    },
    {
      tag: "B", label: "KK bentuk て ください : Tolong ~",
      pattern: "KK bentuk て + ください",
      desc: "Digunakan untuk membuat permintaan sederhana, memerintah atau mendorong seseorang untuk melakukan sesuatu.",
      reibun: [
        {jp:"パスポートを <ruby><rb>見</rb><rt>み</rt></ruby>せてください。", rom:"Pasupōto o misete kudasai.", id:"Tolong tunjukkan paspornya."},
        {jp:"ボールペンで <ruby><rb>名前</rb><rt>なまえ</rt></ruby>を <ruby><rb>書</rb><rt>か</rt></ruby>いてください。", rom:"Bōrupen de namae o kaite kudasai.", id:"Tolong tulis nama dengan bolpoin."},
        {jp:"すみませんが、あそこを <ruby><rb>右</rb><rt>みぎ</rt></ruby>に <ruby><rb>曲</rb><rt>ま</rt></ruby>がってください。", rom:"Sumimasen ga, asoko o migi ni magatte kudasai.", id:"Permisi, tolong belok ke kanan di sana."}
      ]
    },
    {
      tag: "C", label: "KK bentuk ます + ましょうか : Bagaimana kalau ~?",
      pattern: "KK bentuk ます + ましょうか",
      desc: "Ungkapan ini digunakan ketika pembicara menawarkan untuk melakukan sesuatu kepada lawan bicara, atau mengajak melakukan sesuatu bersama-sama.",
      reibun: [
        {jp:"A: タクシーを <ruby><rb>呼</rb><rt>よ</rt></ruby>びましょうか。B: はい、お<ruby><rb>願</rb><rt>ねが</rt></ruby>いします。", rom:"A: Takushī o yobimashō ka. B: Hai, onegaishimasu.", id:"A: Bagaimana kalau saya panggilkan taksi? B: Ya, tolong."},
        {jp:"A: <ruby><rb>今日</rb><rt>きょう</rt></ruby>、<ruby><rb>一緒</rb><rt>いっしょ</rt></ruby>に <ruby><rb>昼</rb><rt>ひる</rt></ruby>ごはんを <ruby><rb>食</rb><rt>た</rt></ruby>べましょうか。B: いいですね。<ruby><rb>食</rb><rt>た</rt></ruby>べましょう。", rom:"A: Kyō, issho ni hirugohan o tabemashō ka. B: Ii desu ne. Tabemashō.", id:"A: Bagaimana kalau kita makan siang bersama hari ini? B: Bagus. Ayo makan."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>急</rb><rt>いそ</rt></ruby>ぎます",furigana:"いそぎます",rom:"isogimasu",id:"bergegas; terburu-buru",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>待</rb><rt>ま</rt></ruby>ちます",furigana:"まちます",rom:"machimasu",id:"menunggu",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>車</rb><rt>くるま</rt></ruby>を）<ruby><rb>止</rb><rt>と</rt></ruby>めます",furigana:"（くるまを）とめます",rom:"(kuruma o) tomemasu",id:"menghentikan; memarkir (mobil)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>右</rb><rt>みぎ</rt></ruby>へ）<ruby><rb>曲</rb><rt>ま</rt></ruby>がります",furigana:"（みぎへ）まがります",rom:"(migi e) magarimasu",id:"belok (ke kanan)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>持</rb><rt>も</rt></ruby>ちます",furigana:"もちます",rom:"mochimasu",id:"membawa",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>取</rb><rt>と</rt></ruby>ります",furigana:"とります",rom:"torimasu",id:"mengambil",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>手伝</rb><rt>てつだ</rt></ruby>います",furigana:"てつだいます",rom:"tetsudaimasu",id:"menolong; membantu",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>呼</rb><rt>よ</rt></ruby>びます",furigana:"よびます",rom:"yobimasu",id:"memanggil",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>話</rb><rt>はな</rt></ruby>します",furigana:"はなします",rom:"hanashimasu",id:"berbicara",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>見</rb><rt>み</rt></ruby>せます",furigana:"みせます",rom:"misemasu",id:"menunjukkan; memperlihatkan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>住所</rb><rt>じゅうしょ</rt></ruby>を）<ruby><rb>教</rb><rt>おし</rt></ruby>えます",furigana:"（じゅうしょを）おしえます",rom:"(jūsho o) oshiemasu",id:"memberitahukan (alamat)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>始</rb><rt>はじ</rt></ruby>めます",furigana:"はじめます",rom:"hajimemasu",id:"memulai",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"パスポート",furigana:"",rom:"pasupōto",id:"paspor",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>地図</rb><rt>ちず</rt></ruby>",furigana:"ちず",rom:"chizu",id:"peta",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>住所</rb><rt>じゅうしょ</rt></ruby>",furigana:"じゅうしょ",rom:"jūsho",id:"alamat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>道</rb><rt>みち</rt></ruby>",furigana:"みち",rom:"michi",id:"jalan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>信号</rb><rt>しんごう</rt></ruby>",furigana:"しんごう",rom:"shingō",id:"lampu lalu lintas",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>塩</rb><rt>しお</rt></ruby>",furigana:"しお",rom:"shio",id:"garam",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>砂糖</rb><rt>さとう</rt></ruby>",furigana:"さとう",rom:"satō",id:"gula",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>読</rb><rt>よ</rt></ruby>み<ruby><rb>方</rb><rt>かた</rt></ruby>",furigana:"よみかた",rom:"yomikata",id:"cara baca",cat:"Kata Benda",lv:"extra"},
    {jp:"〜<ruby><rb>方</rb><rt>かた</rt></ruby>",furigana:"〜かた",rom:"~kata",id:"cara ~",cat:"Ekspresi",lv:"core"},
    {jp:"ゆっくり",furigana:"",rom:"yukkuri",id:"pelan-pelan",cat:"Kata Keterangan",lv:"core"},
    {jp:"すぐ",furigana:"",rom:"sugu",id:"segera; langsung",cat:"Kata Keterangan",lv:"core"},
    {jp:"また",furigana:"",rom:"mata",id:"lagi",cat:"Kata Keterangan",lv:"core"},
    {jp:"あとで",furigana:"",rom:"ato de",id:"nanti",cat:"Kata Keterangan",lv:"core"},
    {jp:"まず",furigana:"",rom:"mazu",id:"pertama-tama",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>次</rb><rt>つぎ</rt></ruby>に",furigana:"つぎに",rom:"tsugi ni",id:"selanjutnya",cat:"Kata Keterangan",lv:"core"},
    {jp:"もう<ruby><rb>少</rb><rt>すこ</rt></ruby>し",furigana:"もうすこし",rom:"mō sukoshi",id:"sedikit lagi",cat:"Kata Keterangan",lv:"core"},
    {jp:"もう〜",furigana:"",rom:"mō~",id:"~ lagi",cat:"Ekspresi",lv:"extra"},
    {jp:"まっすぐ",furigana:"",rom:"massugu",id:"lurus",cat:"Kata Keterangan",lv:"core"},
  ]
},
{
  num: 22,
  title: "Izin & Larangan",
  sub: "Bolehkah ~? / Tidak boleh ~",
  color: "bab-22",
  bunpou: [
    {
      tag: "A", label: "KK bentuk て + も いいですか : Bolehkah ~?",
      pattern: "KK bentuk て + も いいですか",
      desc: "Digunakan ketika meminta izin untuk melakukan tindakan tertentu, atau ketika bertanya apakah sesuatu diperbolehkan dalam keadaan tertentu.",
      reibun: [
        {jp:"この ペンを <ruby><rb>使</rb><rt>つか</rt></ruby>っても いいですか。", rom:"Kono pen o tsukatte mo ii desu ka.", id:"Bolehkah saya memakai pena ini?"},
        {jp:"ここで たばこを <ruby><rb>吸</rb><rt>す</rt></ruby>っても いいですか。", rom:"Koko de tabako o sutte mo ii desu ka.", id:"Bolehkah merokok di sini?"},
        {jp:"<ruby><rb>寒</rb><rt>さむ</rt></ruby>いですから、<ruby><rb>窓</rb><rt>まど</rt></ruby>を <ruby><rb>閉</rb><rt>し</rt></ruby>めても いいですか。", rom:"Samui desu kara, mado o shimete mo ii desu ka.", id:"Karena dingin, bolehkah saya menutup jendela?"}
      ]
    },
    {
      tag: "B", label: "KK bentuk て + は いけません : Tidak boleh ~",
      pattern: "KK bentuk て + は いけません",
      desc: "Digunakan untuk menyatakan larangan.",
      reibun: [
        {jp:"<ruby><rb>図書館</rb><rt>としょかん</rt></ruby>で <ruby><rb>話</rb><rt>はな</rt></ruby>しては いけません。", rom:"Toshokan de hanashite wa ikemasen.", id:"Tidak boleh berbicara di perpustakaan."},
        {jp:"ここに <ruby><rb>座</rb><rt>すわ</rt></ruby>っては いけません。", rom:"Koko ni suwatte wa ikemasen.", id:"Tidak boleh duduk di sini."},
        {jp:"この <ruby><rb>公園</rb><rt>こうえん</rt></ruby>で <ruby><rb>野球</rb><rt>やきゅう</rt></ruby>を しては いけません。", rom:"Kono kōen de yakyū o shite wa ikemasen.", id:"Tidak boleh bermain bisbol di taman ini."}
      ]
    }
  ],
  kotoba: [
    {jp:"つけます",furigana:"",rom:"tsukemasu",id:"menyalakan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>消</rb><rt>け</rt></ruby>します",furigana:"けします",rom:"keshimasu",id:"mematikan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>開</rb><rt>あ</rt></ruby>けます",furigana:"あけます",rom:"akemasu",id:"membuka",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>閉</rb><rt>し</rt></ruby>めます",furigana:"しめます",rom:"shimemasu",id:"menutup",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>立</rb><rt>た</rt></ruby>ちます",furigana:"たちます",rom:"tachimasu",id:"berdiri",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>座</rb><rt>すわ</rt></ruby>ります",furigana:"すわります",rom:"suwarimasu",id:"duduk",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>喫茶店</rb><rt>きっさてん</rt></ruby>に）<ruby><rb>入</rb><rt>はい</rt></ruby>ります",furigana:"（きっさてんに）はいります",rom:"(kissaten ni) hairimasu",id:"masuk (kafe)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>喫茶店</rb><rt>きっさてん</rt></ruby>を）<ruby><rb>出</rb><rt>で</rt></ruby>ます",furigana:"（きっさてんを）でます",rom:"(kissaten o) demasu",id:"keluar (kafe)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"コピーします",furigana:"",rom:"kopī shimasu",id:"memfotokopi",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>使</rb><rt>つか</rt></ruby>います",furigana:"つかいます",rom:"tsukaimasu",id:"menggunakan; memakai",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>置</rb><rt>お</rt></ruby>きます",furigana:"おきます",rom:"okimasu",id:"meletakkan; menaruh",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"エアコン",furigana:"",rom:"eakon",id:"AC; pendingin ruangan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>作文</rb><rt>さくぶん</rt></ruby>",furigana:"さくぶん",rom:"sakubun",id:"esai; karangan",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>資料</rb><rt>しりょう</rt></ruby>",furigana:"しりょう",rom:"shiryō",id:"bahan",cat:"Kata Benda",lv:"core"},
    {jp:"ペン",furigana:"",rom:"pen",id:"pena",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>専門</rb><rt>せんもん</rt></ruby>",furigana:"せんもん",rom:"senmon",id:"bidang studi",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>先生</rb><rt>せんせい</rt></ruby>",furigana:"せんせい",rom:"sensei",id:"dokter",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>風邪</rb><rt>かぜ</rt></ruby>",furigana:"かぜ",rom:"kaze",id:"flu",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>熱</rb><rt>ねつ</rt></ruby>",furigana:"ねつ",rom:"netsu",id:"demam",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>患者</rb><rt>かんじゃ</rt></ruby>",furigana:"かんじゃ",rom:"kanja",id:"pasien",cat:"Kata Benda",lv:"extra"},
    {jp:"〜が<ruby><rb>痛</rb><rt>いた</rt></ruby>いです",furigana:"〜がいたいです",rom:"~ga itai desu",id:"sakit ~",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>熱</rb><rt>ねつ</rt></ruby>があります",furigana:"ねつがあります",rom:"netsu ga arimasu",id:"(saya) demam",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>咳</rb><rt>せき</rt></ruby>がでます",furigana:"せきがでます",rom:"seki ga demasu",id:"(saya) batuk",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>食欲</rb><rt>しょくよく</rt></ruby>がありません",furigana:"しょくよくがありません",rom:"shokuyoku ga arimasen",id:"tidak punya nafsu makan",cat:"Ekspresi",lv:"extra"},
    {jp:"どうしましたか",furigana:"",rom:"dō shimashita ka",id:"ada apa?",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>気持</rb><rt>きも</rt></ruby>ちが<ruby><rb>悪</rb><rt>わる</rt></ruby>いです",furigana:"きもちがわるいです",rom:"kimochi ga warui desu",id:"(saya) merasa sakit",cat:"Ekspresi",lv:"extra"},
    {jp:"<ruby><rb>頭</rb><rt>あたま</rt></ruby>が<ruby><rb>痛</rb><rt>いた</rt></ruby>いです",furigana:"あたまがいたいです",rom:"atama ga itai desu",id:"(saya) sakit kepala",cat:"Ekspresi",lv:"extra"},
    {jp:"お<ruby><rb>腹</rb><rt>なか</rt></ruby>が<ruby><rb>痛</rb><rt>いた</rt></ruby>いです",furigana:"おなかがいたいです",rom:"onaka ga itai desu",id:"(saya) sakit perut",cat:"Ekspresi",lv:"extra"},
    {jp:"<ruby><rb>喫茶店</rb><rt>きっさてん</rt></ruby>",furigana:"きっさてん",rom:"kissaten",id:"kafe",cat:"Kata Benda",lv:"extra"},
  ]
},
{
  num: 23,
  title: "て います",
  sub: "sedang... / keadaan berkelanjutan",
  color: "bab-23",
  bunpou: [
    {
      tag: "A", label: "KK bentuk て + います① : sedang ...",
      pattern: "KK bentuk て + います",
      desc: "Pola kalimat ini menunjukkan bahwa suatu aktivitas sedang berlangsung.",
      reibun: [
        {jp:"<ruby><rb>今</rb><rt>いま</rt></ruby> テレビを <ruby><rb>見</rb><rt>み</rt></ruby>ています。", rom:"Ima terebi o mite imasu.", id:"Sekarang sedang menonton TV."},
        {jp:"<ruby><rb>今</rb><rt>いま</rt></ruby> <ruby><rb>雨</rb><rt>あめ</rt></ruby>が <ruby><rb>降</rb><rt>ふ</rt></ruby>っています。", rom:"Ima ame ga futte imasu.", id:"Sekarang sedang hujan."},
        {jp:"キャシーさんは <ruby><rb>今</rb><rt>いま</rt></ruby> <ruby><rb>音楽</rb><rt>おんがく</rt></ruby>を <ruby><rb>聞</rb><rt>き</rt></ruby>いています。", rom:"Kyashī san wa ima ongaku o kiite imasu.", id:"Kathy sedang mendengarkan musik sekarang."}
      ]
    },
    {
      tag: "B", label: "KK bentuk て + います② : keadaan berkelanjutan",
      pattern: "KK bentuk て + います (keadaan)",
      desc: "Pola kalimat ini juga digunakan untuk menunjukkan keadaan yang berkelanjutan sebagai hasil dari suatu tindakan.",
      reibun: [
        {jp:"わたしは <ruby><rb>結婚</rb><rt>けっこん</rt></ruby>しています。", rom:"Watashi wa kekkon shite imasu.", id:"Saya sudah menikah."},
        {jp:"リーさんの お<ruby><rb>兄</rb><rt>にい</rt></ruby>さんは <ruby><rb>北京</rb><rt>ペキン</rt></ruby>に <ruby><rb>住</rb><rt>す</rt></ruby>んでいます。", rom:"Rī san no onīsan wa Pekin ni sunde imasu.", id:"Kakak laki-laki Lee tinggal di Beijing."},
        {jp:"ジョシュアさんは <ruby><rb>自転車</rb><rt>じてんしゃ</rt></ruby>を <ruby><rb>持</rb><rt>も</rt></ruby>っていません。", rom:"Joshua san wa jitensha o motte imasen.", id:"Joshua tidak memiliki sepeda."}
      ]
    },
    {
      tag: "C", label: "KK bentuk て + います③ : kebiasaan / pekerjaan",
      pattern: "KK bentuk て + います (kebiasaan)",
      desc: "Digunakan untuk menunjukkan kebiasaan berulang atau pekerjaan/status seseorang.",
      reibun: [
        {jp:"<ruby><rb>亜紀</rb><rt>あき</rt></ruby>さんは PW<ruby><rb>大学</rb><rt>だいがく</rt></ruby>で <ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>しています。", rom:"Aki san wa PW daigaku de benkyō shite imasu.", id:"Aki belajar di Universitas PW."},
        {jp:"<ruby><rb>秋葉原</rb><rt>あきはばら</rt></ruby>で <ruby><rb>安</rb><rt>やす</rt></ruby>い <ruby><rb>電気製品</rb><rt>でんきせいひん</rt></ruby>を <ruby><rb>売</rb><rt>う</rt></ruby>っています。", rom:"Akihabara de yasui denkiseihin o utte imasu.", id:"Di Akihabara mereka menjual barang elektronik murah."}
      ],
      note: {type:"amber", text:"Bentuk negatif dari しっています adalah しりません. Hati-hati jangan sampai mengatakan しっていません."}
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>歩</rb><rt>ある</rt></ruby>きます",furigana:"あるきます",rom:"arukimasu",id:"berjalan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>雨</rb><rt>あめ</rt></ruby>が）<ruby><rb>降</rb><rt>ふ</rt></ruby>ります",furigana:"（あめが）ふります",rom:"(ame ga) furimasu",id:"turun (hujan)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>知</rb><rt>し</rt></ruby>ります",furigana:"しります",rom:"shirimasu",id:"mengenal; mengetahui",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>知</rb><rt>し</rt></ruby>っています",furigana:"しっています",rom:"shitte imasu",id:"mengetahui (sekarang)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>住</rb><rt>す</rt></ruby>みます",furigana:"すみます",rom:"sumimasu",id:"tinggal",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>住</rb><rt>す</rt></ruby>んでいます",furigana:"すんでいます",rom:"sunde imasu",id:"tinggal (sekarang)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>作</rb><rt>つく</rt></ruby>ります",furigana:"つくります",rom:"tsukurimasu",id:"membuat",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>売</rb><rt>う</rt></ruby>ります",furigana:"うります",rom:"urimasu",id:"menjual",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>研究</rb><rt>けんきゅう</rt></ruby>します",furigana:"けんきゅうします",rom:"kenkyū shimasu",id:"meneliti",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"いらっしゃいます",furigana:"",rom:"irasshaimasu",id:"ada (bentuk hormat dari います)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>辞</rb><rt>や</rt></ruby>めます",furigana:"やめます",rom:"yamemasu",id:"berhenti",cat:"Kata Kerja",lv:"extra",grp:"II"},
    {jp:"メールアドレス",furigana:"",rom:"mēru adoresu",id:"alamat e-mail",cat:"Kata Benda",lv:"extra"},
    {jp:"IT",furigana:"アイティー",rom:"Ai-Tī",id:"teknologi informasi",cat:"Kata Benda",lv:"extra"},
    {jp:"ご<ruby><rb>家族</rb><rt>かぞく</rt></ruby>",furigana:"ごかぞく",rom:"gokazoku",id:"keluarga (bentuk hormat dari かぞく)",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>小学校</rb><rt>しょうがっこう</rt></ruby>",furigana:"しょうがっこう",rom:"shōgakkō",id:"Sekolah Dasar (SD)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>中学校</rb><rt>ちゅうがっこう</rt></ruby>",furigana:"ちゅうがっこう",rom:"chūgakkō",id:"Sekolah Menengah Pertama (SMP)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>高校</rb><rt>こうこう</rt></ruby>",furigana:"こうこう",rom:"kōkō",id:"Sekolah Menengah Atas (SMA)",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>電気製品</rb><rt>でんきせいひん</rt></ruby>",furigana:"でんきせいひん",rom:"denkiseihin",id:"alat elektronik",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>爪切</rb><rt>つめき</rt></ruby>り",furigana:"つめきり",rom:"tsumekiri",id:"guntung kuku",cat:"Kata Benda",lv:"extra"},
    {jp:"ガーデニング",furigana:"",rom:"gādeningu",id:"berkebun",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>長野県</rb><rt>ながのけん</rt></ruby>",furigana:"ながのけん",rom:"Nagano ken",id:"Prefektur Nagano",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>秋葉原</rb><rt>あきはばら</rt></ruby>",furigana:"あきはばら",rom:"Akihabara",id:"Akihabara",cat:"Kata Benda",lv:"extra"},
  ]
},
{
  num: 24,
  title: "Rangkaian Aksi",
  sub: "KK て、KK / てから KK",
  color: "bab-24",
  bunpou: [
    {
      tag: "A", label: "KK bentuk て、(KK bentuk て)、KK",
      pattern: "KK て + KK て + KK",
      desc: "KK bentuk て dapat digunakan untuk menyatakan lebih dari dua aksi berturut-turut. Waktu terjadinya aktivitas ditentukan oleh kata kerja di akhir kalimat.",
      reibun: [
        {jp:"サンドイッチを <ruby><rb>買</rb><rt>か</rt></ruby>って、<ruby><rb>公園</rb><rt>こうえん</rt></ruby>で <ruby><rb>食</rb><rt>た</rt></ruby>べました。", rom:"Sandoitchi o katte, kōen de tabemashita.", id:"Membeli sandwich, lalu makan di taman."},
        {jp:"<ruby><rb>朝</rb><rt>あさ</rt></ruby> ジョギングを して、シャワーを <ruby><rb>浴</rb><rt>あ</rt></ruby>びて、<ruby><rb>学校</rb><rt>がっこう</rt></ruby>へ <ruby><rb>行</rb><rt>い</rt></ruby>きます。", rom:"Asa jogingu o shite, shawā o abite, gakkō e ikimasu.", id:"Pagi jogging, mandi shower, lalu pergi ke sekolah."},
        {jp:"きのうの <ruby><rb>晩</rb><rt>ばん</rt></ruby> <ruby><rb>本</rb><rt>ほん</rt></ruby>を <ruby><rb>読</rb><rt>よ</rt></ruby>んで、<ruby><rb>日本語</rb><rt>にほんご</rt></ruby>を <ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>して、それから、<ruby><rb>寝</rb><rt>ね</rt></ruby>ました。", rom:"Kinō no ban hon o yonde, nihongo o benkyō shite, sorekara, nemashita.", id:"Tadi malam membaca buku, belajar bahasa Jepang, lalu tidur."}
      ]
    },
    {
      tag: "B", label: "KK bentuk て + から、KK",
      pattern: "KK てから + KK",
      desc: "Dalam pola kalimat ini, KK₂ menyatakan sesuatu yang dilakukan setelah KK₁.",
      reibun: [
        {jp:"<ruby><rb>晩</rb><rt>ばん</rt></ruby>ごはんを <ruby><rb>食</rb><rt>た</rt></ruby>べてから、<ruby><rb>宿題</rb><rt>しゅくだい</rt></ruby>を します。", rom:"Bangohan o tabete kara, shukudai o shimasu.", id:"Setelah makan malam, saya mengerjakan PR."},
        {jp:"<ruby><rb>電話</rb><rt>でんわ</rt></ruby>を かけてから、<ruby><rb>友</rb><rt>とも</rt></ruby>だちの <ruby><rb>家</rb><rt>うち</rt></ruby>へ <ruby><rb>行</rb><rt>い</rt></ruby>きます。", rom:"Denwa o kakete kara, tomodachi no uchi e ikimasu.", id:"Setelah menelepon, pergi ke rumah teman."},
        {jp:"お<ruby><rb>金</rb><rt>かね</rt></ruby>を <ruby><rb>入</rb><rt>い</rt></ruby>れてから、ボタンを <ruby><rb>押</rb><rt>お</rt></ruby>してください。", rom:"Okane o irete kara, botan o oshite kudasai.", id:"Setelah memasukkan uang, tolong tekan tombolnya."}
      ]
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>電車</rb><rt>でんしゃ</rt></ruby>に）<ruby><rb>乗</rb><rt>の</rt></ruby>ります",furigana:"（でんしゃに）のります",rom:"(densha ni) norimasu",id:"naik (kereta api)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>電車</rb><rt>でんしゃ</rt></ruby>を）<ruby><rb>降</rb><rt>お</rt></ruby>ります",furigana:"（でんしゃを）おります",rom:"(densha o) orimasu",id:"turun (dari kereta api)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（<ruby><rb>電車</rb><rt>でんしゃ</rt></ruby>に）<ruby><rb>乗</rb><rt>の</rt></ruby>り<ruby><rb>換</rb><rt>か</rt></ruby>えます",furigana:"（でんしゃに）のりかえます",rom:"(densha ni) norikaemasu",id:"ganti; pindah (dari suatu kendaraan ke kereta api)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（シャワーを）<ruby><rb>浴</rb><rt>あ</rt></ruby>びます",furigana:"（シャワーを）あびます",rom:"(shawā o) abimasu",id:"mandi (shower)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>入</rb><rt>い</rt></ruby>れます",furigana:"いれます",rom:"iremasu",id:"memasukkan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>出</rb><rt>だ</rt></ruby>します",furigana:"だします",rom:"dashimasu",id:"mengeluarkan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>大学</rb><rt>だいがく</rt></ruby>に）<ruby><rb>入</rb><rt>はい</rt></ruby>ります",furigana:"（だいがくに）はいります",rom:"(daigaku ni) hairimasu",id:"masuk (universitas)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（<ruby><rb>大学</rb><rt>だいがく</rt></ruby>を）<ruby><rb>出</rb><rt>で</rt></ruby>ます",furigana:"（だいがくを）でます",rom:"(daigaku o) demasu",id:"lulus (dari universitas)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>押</rb><rt>お</rt></ruby>します",furigana:"おします",rom:"oshimasu",id:"mendorong; menekan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"ジョギングします",furigana:"",rom:"jogingu shimasu",id:"joging",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"シャワー",furigana:"",rom:"shawā",id:"shower",cat:"Kata Benda",lv:"core"},
    {jp:"ボタン",furigana:"",rom:"botan",id:"tombol",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>京都駅</rb><rt>きょうとえき</rt></ruby>",furigana:"きょうとえき",rom:"Kyōto eki",id:"Stasiun Kyoto",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>新宿駅</rb><rt>しんじゅくえき</rt></ruby>",furigana:"しんじゅくえき",rom:"Shinjuku eki",id:"Stasiun Shinjuku",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>上野動物園</rb><rt>うえのどうぶつえん</rt></ruby>",furigana:"うえのどうぶつえん",rom:"Ueno Dōbutsuen",id:"Kebun Binatang Ueno",cat:"Kata Benda",lv:"extra"},
    {jp:"どうやって",furigana:"",rom:"dō yatte",id:"bagaimana caranya",cat:"Kata Tanya",lv:"core"},
    {jp:"<ruby><rb>新橋</rb><rt>しんばし</rt></ruby>",furigana:"しんばし",rom:"Shinbashi",id:"Shinbashi",cat:"Kata Benda",lv:"extra"},
    {jp:"JR",furigana:"ジェイアール",rom:"jei āru",id:"Japan Railway (perusahaan kereta api Jepang)",cat:"Kata Benda",lv:"extra"},
  ]
},
{
  num: 25,
  title: "Ciri & Deskripsi",
  sub: "KB は KB が KS / KS くて・で",
  color: "bab-25",
  bunpou: [
    {
      tag: "A", label: "KB₁ は KB₂ が KS です",
      pattern: "KB₁ は KB₂ が KS です",
      desc: "Pola kalimat ini menunjukkan bahwa topik (KB₁) mempunyai sifat 'KB₂ が KS'.",
      reibun: [
        {jp:"わたしの <ruby><rb>兄</rb><rt>あに</rt></ruby>は <ruby><rb>頭</rb><rt>あたま</rt></ruby>が いいです。", rom:"Watashi no ani wa atama ga ii desu.", id:"Kakak saya pintar."},
        {jp:"<ruby><rb>北海道</rb><rt>ほっかいどう</rt></ruby>は <ruby><rb>食</rb><rt>た</rt></ruby>べ<ruby><rb>物</rb><rt>もの</rt></ruby>が おいしいです。", rom:"Hokkaidō wa tabemono ga oishii desu.", id:"Hokkaido terkenal dengan makanan yang enak."},
        {jp:"<ruby><rb>象</rb><rt>ぞう</rt></ruby>は <ruby><rb>鼻</rb><rt>はな</rt></ruby>が <ruby><rb>長</rb><rt>なが</rt></ruby>いです。", rom:"Zō wa hana ga nagai desu.", id:"Gajah (memiliki) hidung yang panjang."}
      ]
    },
    {
      tag: "B", label: "KS い くて / KS な で / KB で、~",
      pattern: "~くて（で）, ~",
      desc: "~くて (で) digunakan ketika menyambungkan dua atau lebih kata sifat atau kata benda.",
      reibun: [
        {jp:"わたしの パソコンは <ruby><rb>大</rb><rt>おお</rt></ruby>きくて、<ruby><rb>重</rb><rt>おも</rt></ruby>いです。", rom:"Watashi no pasokon wa ōkikute, omoi desu.", id:"Komputer saya besar dan berat."},
        {jp:"<ruby><rb>木村</rb><rt>きむら</rt></ruby>さんは <ruby><rb>親切</rb><rt>しんせつ</rt></ruby>で、おもしろいです。", rom:"Kimura san wa shinsetsu de, omoshiroi desu.", id:"Kimura-san ramah dan menarik."},
        {jp:"この <ruby><rb>部屋</rb><rt>へや</rt></ruby>は <ruby><rb>広</rb><rt>ひろ</rt></ruby>くて、<ruby><rb>明</rb><rt>あか</rt></ruby>るいです。", rom:"Kono heya wa hirokute, akarui desu.", id:"Kamar ini luas dan terang."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>若</rb><rt>わか</rt></ruby>い",furigana:"わかい",rom:"wakai",id:"muda",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>長</rb><rt>なが</rt></ruby>い",furigana:"ながい",rom:"nagai",id:"panjang",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>短</rb><rt>みじか</rt></ruby>い",furigana:"みじかい",rom:"mijikai",id:"pendek",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>明</rb><rt>あか</rt></ruby>るい",furigana:"あかるい",rom:"akarui",id:"cerah; ceria",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>暗</rb><rt>くら</rt></ruby>い",furigana:"くらい",rom:"kurai",id:"gelap",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>太</rb><rt>ふと</rt></ruby>い",furigana:"ふとい",rom:"futoi",id:"gemuk",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>細</rb><rt>ほそ</rt></ruby>い",furigana:"ほそい",rom:"hosoi",id:"tipis",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>頭</rb><rt>あたま</rt></ruby>がいい",furigana:"あたまがいい",rom:"atama ga ii",id:"pintar",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>体</rb><rt>からだ</rt></ruby>",furigana:"からだ",rom:"karada",id:"badan; tubuh",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>頭</rb><rt>あたま</rt></ruby>",furigana:"あたま",rom:"atama",id:"kepala",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>髪</rb><rt>かみ</rt></ruby>",furigana:"かみ",rom:"kami",id:"rambut",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>顔</rb><rt>かお</rt></ruby>",furigana:"かお",rom:"kao",id:"wajah; muka",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>目</rb><rt>め</rt></ruby>",furigana:"め",rom:"me",id:"mata",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>耳</rb><rt>みみ</rt></ruby>",furigana:"みみ",rom:"mimi",id:"telinga",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>口</rb><rt>くち</rt></ruby>",furigana:"くち",rom:"kuchi",id:"mulut",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>歯</rb><rt>は</rt></ruby>",furigana:"は",rom:"ha",id:"gigi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>鼻</rb><rt>はな</rt></ruby>",furigana:"はな",rom:"hana",id:"hidung",cat:"Kata Benda",lv:"core"},
    {jp:"おなか",furigana:"",rom:"onaka",id:"perut",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>足</rb><rt>あし</rt></ruby>",furigana:"あし",rom:"ashi",id:"kaki",cat:"Kata Benda",lv:"core"},
    {jp:"どれ",furigana:"",rom:"dore",id:"yang mana (lebih dari tiga barang)",cat:"Kata Tanya",lv:"core"},
    {jp:"どの〜",furigana:"",rom:"dono~",id:"~ yang mana",cat:"Kata Tanya",lv:"core"},
    {jp:"<ruby><rb>象</rb><rt>ぞう</rt></ruby>",furigana:"ぞう",rom:"zō",id:"gajah",cat:"Kata Benda",lv:"extra"},
    {jp:"サービス",furigana:"",rom:"sābisu",id:"servis; layanan",cat:"Kata Benda",lv:"extra"},
    {jp:"お<ruby><rb>好</rb><rt>この</rt></ruby>み<ruby><rb>焼</rb><rt>や</rt></ruby>き",furigana:"おこのみやき",rom:"okonomiyaki",id:"okonomiyaki",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>背</rb><rt>せ</rt></ruby>が<ruby><rb>高</rb><rt>たか</rt></ruby>い",furigana:"せがたかい",rom:"se ga takai",id:"(badannya) tinggi",cat:"Ekspresi",lv:"extra"},
    {jp:"<ruby><rb>背</rb><rt>せ</rt></ruby>が<ruby><rb>低</rb><rt>ひく</rt></ruby>い",furigana:"せがひくい",rom:"se ga hikui",id:"(badannya) pendek",cat:"Ekspresi",lv:"extra"},
  ]
},
{
  num: 26,
  title: "Kata Kerja Bentuk ない",
  sub: "jangan / harus / tidak perlu",
  color: "bab-26",
  bunpou: [
    {
      tag: "A", label: "<ruby><rb>動詞</rb><rt>どうし</rt></ruby> ない<ruby><rb>形</rb><rt>けい</rt></ruby> (Kata Kerja Bentuk ない)",
      pattern: "Konjugasi bentuk ない",
      desc: "Bentuk kata kerja yang melekat pada ない disebut kata kerja bentuk ない. Grup I: (i)ます → (a)ない. Grup II: ます → ない. Grup III: きます→こない, します→しない.",
      note: {type:"blue", text:"Pengecualian: あいます→あわない (bukan ああない)"}
    },
    {
      tag: "B", label: "KK bentuk ない + ないで ください",
      pattern: "KK ない + ないで ください",
      desc: "Digunakan ketika meminta atau memerintah lawan bicara untuk tidak melakukan sesuatu.",
      reibun: [
        {jp:"<ruby><rb>部屋</rb><rt>へや</rt></ruby>の <ruby><rb>電気</rb><rt>でんき</rt></ruby>を <ruby><rb>消</rb><rt>け</rt></ruby>さないでください。", rom:"Heya no denki o kesanaide kudasai.", id:"Tolong jangan matikan lampu kamar."},
        {jp:"<ruby><rb>危</rb><rt>あぶ</rt></ruby>ないですから、ここに <ruby><rb>入</rb><rt>はい</rt></ruby>らないでください。", rom:"Abunai desu kara, koko ni hairanaide kudasai.", id:"Karena berbahaya, tolong jangan masuk ke sini."},
        {jp:"<ruby><rb>大丈夫</rb><rt>だいじょうぶ</rt></ruby>ですから、<ruby><rb>心配</rb><rt>しんぱい</rt></ruby>しないでください。", rom:"Daijōbu desu kara, shinpaishinaide kudasai.", id:"Tidak apa-apa, tolong jangan khawatir."}
      ]
    },
    {
      tag: "C", label: "KK bentuk ない + なければ なりません",
      pattern: "KK ない + なければ なりません",
      desc: "Digunakan ketika menyatakan keharusan atau kewajiban.",
      reibun: [
        {jp:"<ruby><rb>薬</rb><rt>くすり</rt></ruby>を <ruby><rb>飲</rb><rt>の</rt></ruby>まなければ なりません。", rom:"Kusuri o nomanakere ba narimasen.", id:"Saya harus minum obat."},
        {jp:"パスポートを <ruby><rb>見</rb><rt>み</rt></ruby>せなければ なりません。", rom:"Pasupōto o misenakere ba narimasen.", id:"Saya harus menunjukkan paspor."}
      ]
    },
    {
      tag: "D", label: "KK bentuk ない + なくても いいです",
      pattern: "KK ない + なくても いいです",
      desc: "Digunakan ketika menyatakan sesuatu yang tidak perlu dilakukan.",
      reibun: [
        {jp:"<ruby><rb>明日</rb><rt>あした</rt></ruby> <ruby><rb>来</rb><rt>こ</rt></ruby>なくても いいです。", rom:"Ashita konakute mo ii desu.", id:"Tidak perlu datang besok."},
        {jp:"<ruby><rb>子</rb><rt>こ</rt></ruby>どもは お<ruby><rb>金</rb><rt>かね</rt></ruby>を <ruby><rb>払</rb><rt>はら</rt></ruby>わなくても いいです。", rom:"Kodomo wa okane o harawanakute mo ii desu.", id:"Anak-anak tidak perlu membayar."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>覚</rb><rt>おぼ</rt></ruby>えます",furigana:"おぼえます",rom:"oboemasu",id:"menghafal",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>忘</rb><rt>わす</rt></ruby>れます",furigana:"わすれます",rom:"wasuremasu",id:"lupa",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>失</rb><rt>な</rt></ruby>くします",furigana:"なくします",rom:"nakushimasu",id:"kehilangan; hilang",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（レポートを）<ruby><rb>出</rb><rt>だ</rt></ruby>します",furigana:"（レポートを）だします",rom:"(repōto o) dashimasu",id:"menyerahkan (laporan)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>払</rb><rt>はら</rt></ruby>います",furigana:"はらいます",rom:"haraimasu",id:"membayar",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>返</rb><rt>かえ</rt></ruby>します",furigana:"かえします",rom:"kaeshimasu",id:"mengembalikan",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>出掛</rb><rt>でか</rt></ruby>けます",furigana:"でかけます",rom:"dekakemasu",id:"pergi; keluar; berangkat",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>脱</rb><rt>ぬ</rt></ruby>ぎます",furigana:"ぬぎます",rom:"nugimasu",id:"melepas (baju, sepatu, dll.)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>持</rb><rt>も</rt></ruby>って<ruby><rb>行</rb><rt>い</rt></ruby>きます",furigana:"もっていきます",rom:"motte ikimasu",id:"membawa pergi (barang)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>持</rb><rt>も</rt></ruby>って<ruby><rb>来</rb><rt>き</rt></ruby>ます",furigana:"もってきます",rom:"motte kimasu",id:"membawa datang (barang)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>心配</rb><rt>しんぱい</rt></ruby>します",furigana:"しんぱいします",rom:"shinpai shimasu",id:"mengkhawatirkan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（<ruby><rb>薬</rb><rt>くすり</rt></ruby>を）<ruby><rb>飲</rb><rt>の</rt></ruby>みます",furigana:"（くすりを）のみます",rom:"(kusuri o) nomimasu",id:"meminum (obat)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（お<ruby><rb>風呂</rb><rt>ふろ</rt></ruby>に）<ruby><rb>入</rb><rt>はい</rt></ruby>ります",furigana:"（おふろに）はいります",rom:"(ofuro ni) hairimasu",id:"mandi (berendam di ofuro)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>大切</rb><rt>たいせつ</rt></ruby>（な）",furigana:"たいせつ（な）",rom:"taisetsu (na)",id:"penting; bernilai; berharga",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>大丈夫</rb><rt>だいじょうぶ</rt></ruby>（な）",furigana:"だいじょうぶ（な）",rom:"daijōbu (na)",id:"tidak apa-apa",cat:"Kata Sifat",lv:"core",grp:"な"},
    {jp:"<ruby><rb>危</rb><rt>あぶ</rt></ruby>ない",furigana:"あぶない",rom:"abunai",id:"berbahaya",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>問題</rb><rt>もんだい</rt></ruby>",furigana:"もんだい",rom:"mondai",id:"pertanyaan; masalah",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>答</rb><rt>こた</rt></ruby>え",furigana:"こたえ",rom:"kotae",id:"jawaban",cat:"Kata Benda",lv:"core"},
    {jp:"（<ruby><rb>健康</rb><rt>けんこう</rt></ruby>）<ruby><rb>保険証</rb><rt>ほけんしょう</rt></ruby>",furigana:"（けんこう）ほけんしょう",rom:"(kenkō) hokenshō",id:"kartu asuransi (kesehatan)",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>病気</rb><rt>びょうき</rt></ruby>",furigana:"びょうき",rom:"byōki",id:"sakit",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>薬</rb><rt>くすり</rt></ruby>",furigana:"くすり",rom:"kusuri",id:"obat",cat:"Kata Benda",lv:"core"},
    {jp:"お<ruby><rb>風呂</rb><rt>ふろ</rt></ruby>",furigana:"おふろ",rom:"ofuro",id:"ofuro (bak mandi)",cat:"Kata Benda",lv:"core"},
    {jp:"〜までに",furigana:"",rom:"~made ni",id:"sampai dengan (waktu; tanggal)",cat:"Ekspresi",lv:"core"},
    {jp:"ですから",furigana:"",rom:"desu kara",id:"oleh karena itu; jadi",cat:"Ekspresi",lv:"core"},
    {jp:"おだいじに",furigana:"",rom:"odaiji ni",id:"semoga lekas sembuh",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>禁煙</rb><rt>きんえん</rt></ruby>",furigana:"きんえん",rom:"kin'en",id:"dilarang merokok",cat:"Ekspresi",lv:"extra"},
    {jp:"チップ",furigana:"",rom:"chippu",id:"tip",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>理想</rb><rt>りそう</rt></ruby>",furigana:"りそう",rom:"risō",id:"ideal",cat:"Kata Benda",lv:"extra"},
    {jp:"２、３<ruby><rb>日</rb><rt>にち</rt></ruby>",furigana:"にさんにち",rom:"ni san nichi",id:"dua atau tiga hari",cat:"Ekspresi",lv:"extra"}
  ]
},
{
  num: 27,
  title: "Bentuk Kamus & Kemampuan",
  sub: "dapat ~ / hobi saya adalah ~",
  color: "bab-27",
  bunpou: [
    {
      tag: "A", label: "<ruby><rb>動詞</rb><rt>どうし</rt></ruby> <ruby><rb><ruby>辞書形<rt>じしょけい</rt></ruby></rb><rt>じしょけい</rt></ruby> (Kata Kerja Bentuk Kamus)",
      pattern: "Konjugasi bentuk kamus (<ruby><rb><ruby>辞書形<rt>じしょけい</rt></ruby></rb><rt>じしょけい</rt></ruby>)",
      desc: "Ini adalah bentuk dasar dari kata kerja, seperti yang disajikan dalam kamus. Grup I: (i)ます → u-sound. Grup II: ます → る. Grup III: きます→くる, します→する.",
      note: {type:"teal", text:"Bentuk kamus selalu diakhiri vokal-u: く, ぐ, す, つ, ぬ, ぶ, む, う, る"}
    },
    {
      tag: "B", label: "KK bentuk kamus こと が できます : dapat ~",
      pattern: "KK bentuk kamus こと が できます",
      desc: "できます menunjukkan bahwa seseorang memiliki kemampuan untuk melakukan sesuatu. Objek untuk できます ditandai dengan partikel が.",
      reibun: [
        {jp:"わたしは <ruby><rb>日本語</rb><rt>にほんご</rt></ruby>の <ruby><rb>歌</rb><rt>うた</rt></ruby>を <ruby><rb>歌</rb><rt>うた</rt></ruby>うことが できます。", rom:"Watashi wa nihongo no uta o utau koto ga dekimasu.", id:"Saya bisa menyanyikan lagu Jepang."},
        {jp:"<ruby><rb>亜紀</rb><rt>あき</rt></ruby>さんは <ruby><rb>車</rb><rt>くるま</rt></ruby>の <ruby><rb>運転</rb><rt>うんてん</rt></ruby>が できます。", rom:"Aki san wa kuruma no unten ga dekimasu.", id:"Aki bisa mengemudi mobil."},
        {jp:"この <ruby><rb>店</rb><rt>みせ</rt></ruby>は クレジットカードを <ruby><rb>使</rb><rt>つか</rt></ruby>うことが できません。", rom:"Kono mise wa kurejittokādo o tsukau koto ga dekimasen.", id:"Di toko ini tidak bisa menggunakan kartu kredit."}
      ]
    },
    {
      tag: "C", label: "<ruby><rb>趣味</rb><rt>しゅみ</rt></ruby>は KK bentuk kamus こと です : Hobi saya adalah ~",
      pattern: "<ruby><rb>趣味</rb><rt>しゅみ</rt></ruby>は [KK bentuk kamus こと / KB] です",
      desc: "Penggunaan kata kerja bentuk kamus ことです dapat menjelaskan hobi secara lebih spesifik dibandingkan hanya menggunakan kata benda.",
      reibun: [
        {jp:"わたしの <ruby><rb>趣味</rb><rt>しゅみ</rt></ruby>は <ruby><rb>音楽</rb><rt>おんがく</rt></ruby>を <ruby><rb>聞</rb><rt>き</rt></ruby>くことです。", rom:"Watashi no shumi wa ongaku o kiku koto desu.", id:"Hobi saya adalah mendengarkan musik."},
        {jp:"A: <ruby><rb>趣味</rb><rt>しゅみ</rt></ruby>は <ruby><rb>何</rb><rt>なん</rt></ruby>ですか。B: わたしの <ruby><rb>趣味</rb><rt>しゅみ</rt></ruby>は <ruby><rb>釣</rb><rt>つ</rt></ruby>りです。", rom:"A: Shumi wa nan desu ka. B: Watashi no shumi wa tsuri desu.", id:"A: Apa hobi Anda? B: Hobi saya memancing."}
      ]
    }
  ],
  kotoba: [
    {jp:"できます",furigana:"",rom:"dekimasu",id:"dapat; bisa; mampu",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"ひきます",furigana:"",rom:"hikimasu",id:"bermain (alat musik gitar, piano, biola, dll.)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>歌</rb><rt>うた</rt></ruby>います",furigana:"うたいます",rom:"utaimasu",id:"menyanyi",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>集</rb><rt>あつ</rt></ruby>めます",furigana:"あつめます",rom:"atsumemasu",id:"mengoleksi",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>運転</rb><rt>うんてん</rt></ruby>します",furigana:"うんてんします",rom:"unten shimasu",id:"menyetir",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>予約</rb><rt>よやく</rt></ruby>します",furigana:"よやくします",rom:"yoyaku shimasu",id:"memesan (tempat); reservasi",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>趣味</rb><rt>しゅみ</rt></ruby>",furigana:"しゅみ",rom:"shumi",id:"hobi",cat:"Kata Benda",lv:"core"},
    {jp:"ピアノ",furigana:"",rom:"piano",id:"piano",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>楽器</rb><rt>がっき</rt></ruby>",furigana:"がっき",rom:"gakki",id:"alat musik",cat:"Kata Benda",lv:"extra"},
    {jp:"ギター",furigana:"",rom:"gitā",id:"gitar",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>釣</rb><rt>つ</rt></ruby>り",furigana:"つり",rom:"tsuri",id:"memancing (ikan)",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>日記</rb><rt>にっき</rt></ruby>",furigana:"にっき",rom:"nikki",id:"buku harian",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>動物</rb><rt>どうぶつ</rt></ruby>",furigana:"どうぶつ",rom:"dōbutsu",id:"hewan; binatang",cat:"Kata Benda",lv:"core"},
    {jp:"すもう",furigana:"",rom:"sumō",id:"gulat sumo",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>現金</rb><rt>げんきん</rt></ruby>",furigana:"げんきん",rom:"genkin",id:"uang tunai",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>店</rb><rt>みせ</rt></ruby>",furigana:"みせ",rom:"mise",id:"toko",cat:"Kata Benda",lv:"core"},
    {jp:"クレジットカード",furigana:"",rom:"kurejittokādo",id:"kartu kredit",cat:"Kata Benda",lv:"core"},
    {jp:"〜メートル",furigana:"",rom:"~mētoru",id:"~ meter",cat:"Ekspresi",lv:"extra"},
    {jp:"なかなか",furigana:"",rom:"nakanaka",id:"jarang, tidak mudah (diikuti bentuk negatif)",cat:"Kata Keterangan",lv:"extra"},
    {jp:"<ruby><rb>焼きそば</rb><rt>やきそば</rt></ruby>",furigana:"やきそば",rom:"yakisoba",id:"yakisoba (mie goreng Jepang)",cat:"Kata Benda",lv:"extra"}
  ]
},
{
  num: 28,
  title: "Bentuk た & Pengalaman",
  sub: "KK bentuk た / たことがあります / たり~たり",
  color: "bab-28",
  bunpou: [
    {
      tag: "A", label: "<ruby><rb>動詞</rb><rt>どうし</rt></ruby> た<ruby><rb>形</rb><rt>けい</rt></ruby> (Kata Kerja Bentuk た)",
      pattern: "Konjugasi bentuk た",
      desc: "Kata kerja bentuk た dibentuk dengan cara mengubah kata kerja bentuk て/で menjadi た/だ. Pola konjugasinya sama dengan bentuk て.",
      note: {type:"blue", text:"て→た, で→だ. Contoh: かって→かった, のんで→のんだ, たべて→たべた, きて→きた, して→した"}
    },
    {
      tag: "B", label: "KK bentuk た + ことが あります",
      pattern: "KK bentuk た + ことが あります",
      desc: "Digunakan untuk menjelaskan saat seseorang memiliki pengalaman tertentu atau tidak.",
      reibun: [
        {jp:"エベレストに <ruby><rb>登</rb><rt>のぼ</rt></ruby>ったことが あります。", rom:"Eberesuto ni nobotta koto ga arimasu.", id:"Saya pernah mendaki Gunung Everest."},
        {jp:"わたしの <ruby><rb>母</rb><rt>はは</rt></ruby>は <ruby><rb>飛行機</rb><rt>ひこうき</rt></ruby>に <ruby><rb>乗</rb><rt>の</rt></ruby>ったことが ありません。", rom:"Watashi no haha wa hikōki ni notta koto ga arimasen.", id:"Ibu saya belum pernah naik pesawat."},
        {jp:"A: <ruby><rb>外国</rb><rt>がいこく</rt></ruby>へ <ruby><rb>行</rb><rt>い</rt></ruby>ったことが ありますか。B: はい、あります。／ いいえ、<ruby><rb>一度</rb><rt>いちど</rt></ruby>も ありません。", rom:"A: Gaikoku e itta koto ga arimasu ka. B: Hai, arimasu. / Iie, ichido mo arimasen.", id:"A: Pernahkah Anda pergi ke luar negeri? B: Ya, pernah. / Tidak, belum pernah sekali pun."}
      ]
    },
    {
      tag: "C", label: "KK bentuk た り、KK bentuk た り します",
      pattern: "KK たり、KK たり します",
      desc: "Pola kalimat ini digunakan untuk menyebutkan dua contoh kegiatan dari beberapa kegiatan yang dipilih.",
      reibun: [
        {jp:"<ruby><rb>日曜日</rb><rt>にちようび</rt></ruby>は <ruby><rb>部屋</rb><rt>へや</rt></ruby>を <ruby><rb>掃除</rb><rt>そうじ</rt></ruby>したり、<ruby><rb>洗濯</rb><rt>せんたく</rt></ruby>したり します。", rom:"Nichiyōbi wa heya o sōji shitari, sentaku shitari shimasu.", id:"Pada hari Minggu, saya melakukan hal-hal seperti membersihkan kamar dan mencuci pakaian."},
        {jp:"A: <ruby><rb>休</rb><rt>やす</rt></ruby>みの <ruby><rb>日</rb><rt>ひ</rt></ruby>は よく <ruby><rb>何</rb><rt>なに</rt></ruby>を しますか。B: <ruby><rb>友</rb><rt>とも</rt></ruby>だちと バスケットボールを したり、プールで <ruby><rb>泳</rb><rt>およ</rt></ruby>いだり します。", rom:"Yasumi no hi wa yoku nani o shimasu ka. B: Tomodachi to basukettobōru o shitari, pūru de oyoidari shimasu.", id:"A: Apa yang sering Anda lakukan di hari libur? B: Bermain basket dengan teman, atau berenang di kolam renang, dan sebagainya."}
      ]
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>山</rb><rt>やま</rt></ruby>に）<ruby><rb>登</rb><rt>のぼ</rt></ruby>ります",furigana:"（やまに）のぼります",rom:"(yama ni) noborimasu",id:"mendaki (gunung)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（ホテルに）<ruby><rb>泊</rb><rt>と</rt></ruby>まります",furigana:"（ホテルに）とまります",rom:"(hoteru ni) tomarimasu",id:"menginap (di hotel)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>掃除</rb><rt>そうじ</rt></ruby>します",furigana:"そうじします",rom:"sōji shimasu",id:"membersihkan (ruangan)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>洗濯</rb><rt>せんたく</rt></ruby>します",furigana:"せんたくします",rom:"sentaku shimasu",id:"mencuci (pakaian)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>練習</rb><rt>れんしゅう</rt></ruby>します",furigana:"れんしゅうします",rom:"renshū shimasu",id:"berlatih",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>馬</rb><rt>うま</rt></ruby>",furigana:"うま",rom:"uma",id:"kuda",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>温泉</rb><rt>おんせん</rt></ruby>",furigana:"おんせん",rom:"onsen",id:"pemandian air panas",cat:"Kata Benda",lv:"extra"},
    {jp:"エベレスト",furigana:"",rom:"eberesuto",id:"Gunung Everest",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>金閣寺</rb><rt>きんかくじ</rt></ruby>",furigana:"きんかくじ",rom:"Kinkakuji",id:"Kuil Kinkakuji",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>天</rb><rt>てん</rt></ruby>ぷら",furigana:"てんぷら",rom:"tenpura",id:"tempura",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>日本酒</rb><rt>にほんしゅ</rt></ruby>",furigana:"にほんしゅ",rom:"nihonshu",id:"sake Jepang",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>経験</rb><rt>けいけん</rt></ruby>",furigana:"けいけん",rom:"keiken",id:"pengalaman",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>是非</rb><rt>ぜひ</rt></ruby>",furigana:"ぜひ",rom:"zehi",id:"sungguh-sungguh",cat:"Kata Keterangan",lv:"core"},
    {jp:"しかし",furigana:"",rom:"shikashi",id:"tetapi",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>一度</rb><rt>いちど</rt></ruby>",furigana:"いちど",rom:"ichido",id:"satu kali; sekali",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>一度</rb><rt>いちど</rt></ruby>も",furigana:"いちども",rom:"ichido mo",id:"tidak pernah sekali pun",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>緑</rb><rt>みどり</rt></ruby>",furigana:"みどり",rom:"midori",id:"tumbuhan; tanaman hijau",cat:"Kata Benda",lv:"extra"},
    {jp:"プールで<ruby><rb>泳</rb><rt>およ</rt></ruby>ぎます",furigana:"プールでおよぎます",rom:"pūru de oyogimasu",id:"berenang di kolam renang",cat:"Kata Kerja",lv:"extra",grp:"I"},
    {jp:"ピアノの<ruby><rb>練習</rb><rt>れんしゅう</rt></ruby>",furigana:"ピアノのれんしゅう",rom:"piano no renshū",id:"latihan piano",cat:"Ekspresi",lv:"extra"},
  ]
},
{
  num: 29,
  title: "まえに & あとで",
  sub: "sebelum ~ / setelah ~",
  color: "bab-29",
  bunpou: [
    {
      tag: "A", label: "KK bentuk kamus まえに、KK",
      pattern: "KK bentuk kamus + まえに、KK",
      desc: "Pola kalimat ini menunjukan bahwa KK₂ terjadi sebelum KK₁. KK₁ selalu dalam bentuk kamus walaupun kalimat utamanya bentuk lampau atau bukan lampau.",
      reibun: [
        {jp:"ごはんを <ruby><rb>食</rb><rt>た</rt></ruby>べる まえに、<ruby><rb>手</rb><rt>て</rt></ruby>を <ruby><rb>洗</rb><rt>あら</rt></ruby>いましょう。", rom:"Gohan o taberu mae ni, te o araimashō.", id:"Sebelum makan, mari kita cuci tangan."},
        {jp:"シャワーを <ruby><rb>浴</rb><rt>あ</rt></ruby>びる まえに、<ruby><rb>服</rb><rt>ふく</rt></ruby>を <ruby><rb>脱</rb><rt>ぬ</rt></ruby>ぎます。", rom:"Shawā o abiru mae ni, fuku o nugimasu.", id:"Sebelum mandi shower, saya melepas baju."},
        {jp:"テストの まえに、よく <ruby><rb>復習</rb><rt>ふくしゅう</rt></ruby>を してください。", rom:"Tesuto no mae ni, yoku fukushū o shite kudasai.", id:"Sebelum ujian, tolong belajar ulang dengan baik."}
      ]
    },
    {
      tag: "B", label: "KK bentuk た あとで、KK",
      pattern: "KK bentuk た + あとで、KK",
      desc: "Pola kalimat ini menunjukkan bahwa kegiatan yang dinyatakan pada KK₂ terjadi setelah kegiatan atau keadaan yang dinyatakan pada KK₁ atau KB.",
      reibun: [
        {jp:"ごはんを <ruby><rb>食</rb><rt>た</rt></ruby>べた あとで、<ruby><rb>歯</rb><rt>は</rt></ruby>を <ruby><rb>磨</rb><rt>みが</rt></ruby>きます。", rom:"Gohan o tabeta ato de, ha o migakimasu.", id:"Setelah makan, saya gosok gigi."},
        {jp:"<ruby><rb>映画</rb><rt>えいが</rt></ruby>を <ruby><rb>見</rb><rt>み</rt></ruby>た あとで、<ruby><rb>食事</rb><rt>しょくじ</rt></ruby>を しました。", rom:"Eiga o mita ato de, shokuji o shimashita.", id:"Setelah menonton film, kami makan."},
        {jp:"パーティーの あとで、お<ruby><rb>皿</rb><rt>さら</rt></ruby>を <ruby><rb>洗</rb><rt>あら</rt></ruby>います。", rom:"Pātī no ato de, osara o araimasu.", id:"Setelah pesta, saya mencuci piring."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>洗</rb><rt>あら</rt></ruby>います",furigana:"あらいます",rom:"araimasu",id:"mencuci (tangan, muka, piring, dll.)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>捨</rb><rt>す</rt></ruby>てます",furigana:"すてます",rom:"sutemasu",id:"membuang",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>換</rb><rt>か</rt></ruby>えます",furigana:"かえます",rom:"kaemasu",id:"menukar; mengganti",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>磨</rb><rt>みが</rt></ruby>きます",furigana:"みがきます",rom:"migakimasu",id:"menyikat",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>復習</rb><rt>ふくしゅう</rt></ruby>をします",furigana:"ふくしゅうをします",rom:"fukushū o shimasu",id:"meninjau kembali (materi pelajaran)",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"<ruby><rb>質問</rb><rt>しつもん</rt></ruby>します",furigana:"しつもんします",rom:"shitsumon shimasu",id:"bertanya",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>薬剤師</rb><rt>やくざいし</rt></ruby>",furigana:"やくざいし",rom:"yakuzaishi",id:"apoteker",cat:"Kata Benda",lv:"extra"},
    {jp:"お<ruby><rb>皿</rb><rt>さら</rt></ruby>",furigana:"おさら",rom:"osara",id:"piring",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>授業</rb><rt>じゅぎょう</rt></ruby>",furigana:"じゅぎょう",rom:"jugyō",id:"kelas",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>文法</rb><rt>ぶんぽう</rt></ruby>",furigana:"ぶんぽう",rom:"bunpō",id:"tata bahasa",cat:"Kata Benda",lv:"core"},
    {jp:"ホラー<ruby><rb>映画</rb><rt>えいが</rt></ruby>",furigana:"ホラーえいが",rom:"horā eiga",id:"film horor",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>沖縄</rb><rt>おきなわ</rt></ruby>の<ruby><rb>料理</rb><rt>りょうり</rt></ruby>",furigana:"おきなわのりょうり",rom:"Okinawa no ryōri",id:"masakan Okinawa",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>歯</rb><rt>は</rt></ruby>を<ruby><rb>磨</rb><rt>みが</rt></ruby>きます",furigana:"はをみがきます",rom:"ha o migakimasu",id:"gosok gigi",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>手</rb><rt>て</rt></ruby>を<ruby><rb>洗</rb><rt>あら</rt></ruby>います",furigana:"てをあらいます",rom:"te o araimasu",id:"cuci tangan",cat:"Ekspresi",lv:"core"}
  ]
},
{
  num: 30,
  title: "Ragam Bahasa Biasa",
  sub: "Bahasa sopan vs bahasa biasa",
  color: "bab-30",
  bunpou: [
    {
      tag: "A", label: "<ruby><rb>丁寧体</rb><rt>ていねいたい</rt></ruby>と<ruby><rb><ruby>普通体<rt>ふつうたい</rt></ruby></rb><rt>ふつうたい</rt></ruby> (Ragam Bahasa Sopan dan Ragam Bahasa Biasa)",
      pattern: "Ragam bahasa sopan ↔ biasa",
      desc: "Bahasa Jepang memiliki dua ragam bahasa: ragam bahasa sopan (dengan ます/です) dan ragam bahasa biasa. Ragam biasa digunakan dengan teman dekat, teman sekolah, dan anggota keluarga.",
      note: {type:"purple", text:"Kata kerja: かきます→かく, かきません→かかない, かきました→かいた, かきませんでした→かかなかった"}
    },
    {
      tag: "B", label: "Penggunaan yang tepat dari ragam bahasa biasa",
      pattern: "Penggunaan ragam bahasa biasa",
      desc: "Ragam bahasa biasa digunakan saat berbicara dengan teman dekat, teman sekolah dan anggota keluarga. Ragam ini juga digunakan ketika menuliskan laporan, karya tulis ilmiah, buku harian, catatan, dsb.",
      reibun: [
        {jp:"うん、そう。", rom:"Un, sō.", id:"Ya, begitu. (bentuk biasa dari はい, そうです)"},
        {jp:"うううん、ちがう。", rom:"Uun, chigau.", id:"Tidak, beda. (bentuk biasa dari いいえ, ちがいます)"}
      ]
    }
  ],
  kotoba: [
    {jp:"（ビザが）<ruby><rb>要</rb><rt>い</rt></ruby>ります",furigana:"（ビザが）いります",rom:"(biza ga) irimasu",id:"memerlukan; membutuhkan (visa)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>調</rb><rt>しら</rt></ruby>べます",furigana:"しらべます",rom:"shirabemasu",id:"mengecek; memeriksa",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>直</rb><rt>なお</rt></ruby>します",furigana:"なおします",rom:"naoshimasu",id:"memperbaiki",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>電話</rb><rt>でんわ</rt></ruby>します",furigana:"でんわします",rom:"denwa shimasu",id:"menelepon",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>僕</rb><rt>ぼく</rt></ruby>",furigana:"ぼく",rom:"boku",id:"aku (bentuk informal dari わたし, digunakan oleh laki-laki)",cat:"Ekspresi",lv:"core"},
    {jp:"〜<ruby><rb>君</rb><rt>くん</rt></ruby>",furigana:"〜くん",rom:"~kun",id:"kun (bentuk informal dari ~さん)",cat:"Ekspresi",lv:"core"},
    {jp:"ことば",furigana:"",rom:"kotoba",id:"kata; bahasa",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>着物</rb><rt>きもの</rt></ruby>",furigana:"きもの",rom:"kimono",id:"kimono (pakaian tradisional Jepang)",cat:"Kata Benda",lv:"core"},
    {jp:"ビザ",furigana:"",rom:"biza",id:"visa",cat:"Kata Benda",lv:"core"},
    {jp:"はじめ",furigana:"",rom:"hajime",id:"awal",cat:"Kata Benda",lv:"core"},
    {jp:"おわり",furigana:"",rom:"owari",id:"akhir",cat:"Kata Benda",lv:"core"},
    {jp:"うん",furigana:"",rom:"un",id:"ya (bentuk informal dari はい)",cat:"Ekspresi",lv:"core"},
    {jp:"うううん",furigana:"",rom:"uun",id:"tidak (bentuk informal dari いいえ)",cat:"Ekspresi",lv:"core"},
    {jp:"この<ruby><rb>間</rb><rt>あいだ</rt></ruby>",furigana:"このあいだ",rom:"kono aida",id:"saat itu",cat:"Ekspresi",lv:"core"},
    {jp:"みんなで",furigana:"",rom:"minna de",id:"bersama semuanya",cat:"Ekspresi",lv:"extra"},
    {jp:"〜けど",furigana:"",rom:"~kedo",id:"tapi (bentuk informal dari が)",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>気</rb><rt>き</rt></ruby>をつけます",furigana:"きをつけます",rom:"ki o tsukemasu",id:"hati-hati; berhati-hati",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>渋谷</rb><rt>しぶや</rt></ruby>",furigana:"しぶや",rom:"Shibuya",id:"Shibuya",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>僕</rb><rt>ぼく</rt></ruby>",furigana:"ぼく",rom:"boku",id:"aku (bentuk informal dari わたし, digunakan oleh laki-laki)",cat:"Kata Benda",lv:"core"},
  ]
},
{
  num: 31,
  title: "Pendapat & Kutipan",
  sub: "Saya kira ~ / Dia berkata ~",
  color: "bab-31",
  bunpou: [
    {
      tag: "A", label: "Bentuk biasa と <ruby><rb>思</rb><rt>おも</rt></ruby>います : Saya kira ~",
      pattern: "Bentuk biasa + と <ruby><rb>思</rb><rt>おも</rt></ruby>います",
      desc: "Pola kalimat ini digunakan dalam situasi di mana pembicara menduga tentang seseorang atau pendapat tentang sesuatu hal.",
      reibun: [
        {jp:"タントさんは もう うちに <ruby><rb>帰</rb><rt>かえ</rt></ruby>ったと <ruby><rb>思</rb><rt>おも</rt></ruby>います。", rom:"Tanto san wa mō uchi ni kaetta to omoimasu.", id:"Saya kira Tanto sudah pulang ke rumah."},
        {jp:"あの <ruby><rb>人</rb><rt>ひと</rt></ruby>は たぶん <ruby><rb>日本人</rb><rt>にほんじん</rt></ruby>じゃないと <ruby><rb>思</rb><rt>おも</rt></ruby>います。", rom:"Ano hito wa tabun nihonjin ja nai to omoimasu.", id:"Saya kira orang itu mungkin bukan orang Jepang."},
        {jp:"A: <ruby><rb>東京</rb><rt>とうきょう</rt></ruby>の <ruby><rb>交通</rb><rt>こうつう</rt></ruby>について どう <ruby><rb>思</rb><rt>おも</rt></ruby>いますか。B: <ruby><rb>便利</rb><rt>べんり</rt></ruby>ですが、ラッシュが <ruby><rb>大変</rb><rt>たいへん</rt></ruby>だと <ruby><rb>思</rb><rt>おも</rt></ruby>います。", rom:"A: Tōkyō no kōtsū ni tsuite dō omoimasu ka. B: Benri desu ga, rasshu ga taihen da to omoimasu.", id:"A: Bagaimana pendapat Anda tentang lalu lintas Tokyo? B: Nyaman, tapi rush hour-nya sangat padat menurut saya."}
      ]
    },
    {
      tag: "B", label: "Bentuk biasa と <ruby><rb>言</rb><rt>い</rt></ruby>います",
      pattern: "Bentuk biasa + と <ruby><rb>言</rb><rt>い</rt></ruby>います",
      desc: "Partikel と digunakan untuk melaporkan ucapan. Tata bahasa kalimat kutipan tidak dipengaruhi oleh tata bahasa kalimat utama.",
      reibun: [
        {jp:"<ruby><rb>先生</rb><rt>せんせい</rt></ruby>は <ruby><rb>明日</rb><rt>あした</rt></ruby> テストが あると <ruby><rb>言</rb><rt>い</rt></ruby>いました。", rom:"Sensei wa ashita tesuto ga aru to iimashita.", id:"Guru berkata ada ujian besok."},
        {jp:"ジョンさんは わたしに <ruby><rb>来週</rb><rt>らいしゅう</rt></ruby><ruby><rb>中国</rb><rt>ちゅうごく</rt></ruby>へ <ruby><rb>出張</rb><rt>しゅっちょう</rt></ruby>すると <ruby><rb>言</rb><rt>い</rt></ruby>いました。", rom:"Jon san wa watashi ni raishū Chūgoku e shutchō suru to iimashita.", id:"John memberitahu saya bahwa minggu depan dia akan dinas ke Cina."}
      ]
    }
  ],
  kotoba: [
    {jp:"<ruby><rb>思</rb><rt>おも</rt></ruby>います",furigana:"おもいます",rom:"omoimasu",id:"berpikir",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>言</rb><rt>い</rt></ruby>います",furigana:"いいます",rom:"iimasu",id:"berkata",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>出張</rb><rt>しゅっちょう</rt></ruby>します",furigana:"しゅっちょうします",rom:"shutchō shimasu",id:"pergi perjalanan bisnis",cat:"Kata Kerja",lv:"extra",grp:"III"},
    {jp:"<ruby><rb>役</rb><rt>やく</rt></ruby>に<ruby><rb>立</rb><rt>た</rt></ruby>ちます",furigana:"やくにたちます",rom:"yaku ni tachimasu",id:"bermanfaat",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>無駄</rb><rt>むだ</rt></ruby>な",furigana:"むだな",rom:"muda na",id:"sia-sia",cat:"Kata Sifat",lv:"extra",grp:"い"},
    {jp:"<ruby><rb>不便</rb><rt>ふべん</rt></ruby>な",furigana:"ふべんな",rom:"fuben na",id:"tidak praktis",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"すごい",furigana:"",rom:"sugoi",id:"menakjubkan; hebat",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>交通</rb><rt>こうつう</rt></ruby>",furigana:"こうつう",rom:"kōtsū",id:"transportasi; lalu lintas",cat:"Kata Benda",lv:"core"},
    {jp:"ラッシュ",furigana:"",rom:"rasshu",id:"rush (macet; sibuk)",cat:"Kata Benda",lv:"extra"},
    {jp:"ニュース",furigana:"",rom:"nyūsu",id:"berita",cat:"Kata Benda",lv:"core"},
    {jp:"スピーチ",furigana:"",rom:"supīchi",id:"pidato",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>意見</rb><rt>いけん</rt></ruby>",furigana:"いけん",rom:"iken",id:"pendapat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>同</rb><rt>おな</rt></ruby>じ",furigana:"おなじ",rom:"onaji",id:"sama",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>多分</rb><rt>たぶん</rt></ruby>",furigana:"たぶん",rom:"tabun",id:"mungkin",cat:"Kata Keterangan",lv:"core"},
    {jp:"きっと",furigana:"",rom:"kitto",id:"pasti; yakin",cat:"Kata Keterangan",lv:"core"},
    {jp:"もちろん",furigana:"",rom:"mochiron",id:"tentu saja",cat:"Kata Keterangan",lv:"core"},
    {jp:"<ruby><rb>本当</rb><rt>ほんとう</rt></ruby>に",furigana:"ほんとうに",rom:"hontō ni",id:"benar; sungguh",cat:"Kata Keterangan",lv:"core"},
    {jp:"そんなに",furigana:"",rom:"sonna ni",id:"tidak terlalu (diikuti bentuk negatif)",cat:"Kata Keterangan",lv:"extra"},
    {jp:"〜について",furigana:"",rom:"~ni tsuite",id:"mengenai ~; tentang ~",cat:"Ekspresi",lv:"core"},
    {jp:"アナウンス",furigana:"",rom:"anaunsu",id:"pengumuman",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>恋愛映画</rb><rt>れんあいえいが</rt></ruby>",furigana:"れんあいえいが",rom:"ren'ai eiga",id:"film romantis",cat:"Kata Benda",lv:"extra"},
    {jp:"ヨガ",furigana:"",rom:"yoga",id:"yoga",cat:"Kata Benda",lv:"extra"},
    {jp:"シンガポール",furigana:"",rom:"Shingapōru",id:"Singapura",cat:"Kata Benda",lv:"extra"},
    {jp:"〜<ruby><rb>年後</rb><rt>ねんご</rt></ruby>",furigana:"〜ねんご",rom:"~nengō",id:"~ beberapa tahun kemudian",cat:"Ekspresi",lv:"extra"},
    {jp:"かわいい",furigana:"",rom:"kawaii",id:"lucu",cat:"Kata Sifat",lv:"extra",grp:"い"},
    {jp:"<ruby><rb>値段</rb><rt>ねだん</rt></ruby>",furigana:"ねだん",rom:"nedan",id:"harga",cat:"Kata Benda",lv:"extra"},
  ]
},
{
  num: 32,
  title: "Pakaian & Modifikasi KB",
  sub: "memakai ~ / kata kerja memodifikasi kata benda",
  color: "bab-32",
  bunpou: [
    {
      tag: "A", label: "Modifikasi kata benda",
      pattern: "KK/KS/KB + kata benda (modifikasi)",
      desc: "Kata kerja, kata sifat, dan kata benda yang terdapat pada klausa yang menerangkan kata benda dalam bentuk biasa.",
      reibun: [
        {jp:"これは リーさんが <ruby><rb>作</rb><rt>つく</rt></ruby>った <ruby><rb>料理</rb><rt>りょうり</rt></ruby>です。", rom:"Kore wa Rī san ga tsukutta ryōri desu.", id:"Ini adalah masakan yang dibuat oleh Lee."},
        {jp:"わたしは <ruby><rb>朝</rb><rt>あさ</rt></ruby>ごはんを <ruby><rb>食</rb><rt>た</rt></ruby>べる <ruby><rb>時間</rb><rt>じかん</rt></ruby>が ありません。", rom:"Watashi wa asagohan o taberu jikan ga arimasen.", id:"Saya tidak punya waktu untuk makan sarapan."},
        {jp:"<ruby><rb>今日</rb><rt>きょう</rt></ruby>は <ruby><rb>友</rb><rt>とも</rt></ruby>だちと <ruby><rb>映画</rb><rt>えいが</rt></ruby>を <ruby><rb>見</rb><rt>み</rt></ruby>る <ruby><rb>約束</rb><rt>やくそく</rt></ruby>が あります。", rom:"Kyō wa tomodachi to eiga o miru yakusoku ga arimasu.", id:"Hari ini saya punya janji menonton film dengan teman."}
      ]
    }
  ],
  kotoba: [
    {jp:"（シャツを）<ruby><rb>着</rb><rt>き</rt></ruby>ます",furigana:"（シャツを）きます",rom:"(shatsu o) kimasu",id:"memakai (kemeja, dll.)",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（くつを）<ruby><rb>履</rb><rt>は</rt></ruby>きます",furigana:"（くつを）はきます",rom:"(kutsu o) hakimasu",id:"memakai (sepatu, dll.)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（ぼうしを）かぶります",furigana:"",rom:"(bōshi o) kaburimasu",id:"memakai (topi, dll.)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"（めがねを）かけます",furigana:"",rom:"(megane o) kakemasu",id:"memakai (kacamata)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>生</rb><rt>う</rt></ruby>まれます",furigana:"うまれます",rom:"umaremasu",id:"lahir",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"コート",furigana:"",rom:"kōto",id:"jaket",cat:"Kata Benda",lv:"core"},
    {jp:"スーツ",furigana:"",rom:"sūtsu",id:"setelan jas",cat:"Kata Benda",lv:"core"},
    {jp:"セーター",furigana:"",rom:"sētā",id:"sweter; baju hangat",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>帽子</rb><rt>ぼうし</rt></ruby>",furigana:"ぼうし",rom:"bōshi",id:"topi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>眼鏡</rb><rt>めがね</rt></ruby>",furigana:"めがね",rom:"megane",id:"kacamata",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>財布</rb><rt>さいふ</rt></ruby>",furigana:"さいふ",rom:"saifu",id:"dompet",cat:"Kata Benda",lv:"core"},
    {jp:"Tシャツ",furigana:"ティーシャツ",rom:"tī shatsu",id:"kaus",cat:"Kata Benda",lv:"core"},
    {jp:"どうしたらいいですか",furigana:"",rom:"dō shitara ii desu ka",id:"Apa yang sebaiknya saya lakukan?",cat:"Ekspresi",lv:"core"},
  ]
},
{
  num: 33,
  title: "とき (ketika)",
  sub: "Ketika ~ / ~のとき",
  color: "bab-33",
  tips: [
    {icon:"💡", title:"KK kamus vs KK た sebelum とき — Jebakan Klasik!", points:[
      "<b>KK bentuk kamus + とき</b>: Tindakan di klausa とき BELUM terjadi saat klausa utama berlangsung.",
      "<ruby><rb>日本</rb><rt>にほん</rt></ruby>へ <b><ruby><rb>行く</rb><rt>いく</rt></ruby></b> とき、ビザを もらいました。→ Saat (mau) pergi ke Jepang, saya mendapat visa. (visa didapat SEBELUM berangkat)",
      "<b>KK bentuk た + とき</b>: Tindakan di klausa とき SUDAH selesai saat klausa utama berlangsung.",
      "<ruby><rb>日本</rb><rt>にほん</rt></ruby>へ <b><ruby><rb>行</rb><rt>い</rt></ruby>った</b> とき、<ruby><rb>富士山</rb><rt>ふじさん</rt></ruby>を <ruby><rb>見</rb><rt>み</rt></ruby>ました。→ Saat (sudah) di Jepang, saya melihat Gunung Fuji. (melihat Fuji SETELAH tiba)",
      "Kunci: apakah tindakan とき sudah terjadi atau belum? Belum → kamus<ruby><rb>形</rb><rt>けい</rt></ruby>、Sudah → た<ruby><rb>形</rb><rt>けい</rt></ruby>."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "~とき、~ : Ketika ~",
      pattern: "KK/KS/KB の + とき、~",
      desc: "とき digunakan untuk menghubungkan dua kalimat saat mengungkapkan waktu atau kejadian yang dijelaskan dalam klausa utama berada atau terjadi.",
      note: {type:"teal", text:"<b>💡 KK kamus とき vs KK た とき:</b><br>• <b><ruby><rb>行く</rb><rt>いく</rt></ruby> とき</b> = ketika (mau) pergi → tindakan とき belum selesai<br>• <b><ruby><rb>行</rb><rt>い</rt></ruby>った とき</b> = ketika (sudah) pergi → tindakan とき sudah selesai<br>KS dan KB selalu pakai bentuk biasa/の + とき, tidak terpengaruh urutan ini."},
      reibun: [
        {jp:"<ruby><rb>図書館</rb><rt>としょかん</rt></ruby>で <ruby><rb>本</rb><rt>ほん</rt></ruby>を <ruby><rb>借</rb><rt>か</rt></ruby>りる とき、カードが <ruby><rb>要</rb><rt>い</rt></ruby>ります。", rom:"Toshokan de hon o kariru toki, kādo ga irimasu.", id:"Ketika meminjam buku di perpustakaan, diperlukan kartu."},
        {jp:"<ruby><rb>子</rb><rt>こ</rt></ruby>どもの とき、あまり <ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>しませんでした。", rom:"Kodomo no toki, amari benkyō shimasen deshita.", id:"Ketika masih anak-anak, saya jarang belajar."},
        {jp:"<ruby><rb>冷蔵庫</rb><rt>れいぞうこ</rt></ruby>に <ruby><rb>何</rb><rt>なに</rt></ruby>も ない とき、<ruby><rb>近</rb><rt>ちか</rt></ruby>くの レストランへ <ruby><rb>食</rb><rt>た</rt></ruby>べに <ruby><rb>行</rb><rt>い</rt></ruby>きます。", rom:"Reizōko ni nani mo nai toki, chikaku no resutoran e tabe ni ikimasu.", id:"Ketika tidak ada apapun di kulkas, saya pergi makan di restoran dekat sini."}
      ]
    }
  ],
  kotoba: [
    {jp:"（<ruby><rb>先生</rb><rt>せんせい</rt></ruby>に）<ruby><rb>聞</rb><rt>き</rt></ruby>きます",furigana:"（せんせいに）ききます",rom:"(sensei ni) kikimasu",id:"bertanya (pada guru)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>変</rb><rt>か</rt></ruby>えます",furigana:"かえます",rom:"kaemasu",id:"mengubah",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>過</rb><rt>す</rt></ruby>ごします",furigana:"すごします",rom:"sugoshimasu",id:"menghabiskan (waktu)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>眠</rb><rt>ねむ</rt></ruby>い",furigana:"ねむい",rom:"nemui",id:"mengantuk",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>嬉</rb><rt>うれ</rt></ruby>しい",furigana:"うれしい",rom:"ureshii",id:"senang",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"サイズ",furigana:"",rom:"saizu",id:"ukuran",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>音</rb><rt>おと</rt></ruby>",furigana:"おと",rom:"oto",id:"bunyi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>機械</rb><rt>きかい</rt></ruby>",furigana:"きかい",rom:"kikai",id:"mesin",cat:"Kata Benda",lv:"extra"},
    {jp:"お<ruby><rb>正月</rb><rt>しょうがつ</rt></ruby>",furigana:"おしょうがつ",rom:"oshōgatsu",id:"Hari Perayaan Tahun Baru Masehi",cat:"Kata Benda",lv:"core"},
  ]
},
{
  num: 34,
  title: "なります (menjadi)",
  sub: "KS くなります / KS になります",
  color: "bab-34",
  tips: [
    {icon:"💡", title:"Konjugasi なります — 3 pola berbeda", points:[
      "<b>KS い</b>: akhiran い → く + なります。さむい → さむ<b>く</b>なります / たかい → たか<b>く</b>なります",
      "<b>KS な</b>: hilangkan な → に + なります。しずかな → しずか<b>に</b>なります / じょうずな → じょうず<b>に</b>なります",
      "<b>KB</b>: KB + に + なります。いしゃ → いしゃ<b>に</b>なります / はる → はる<b>に</b>なります"
    ]},
    {icon:"⚠️", title:"なります vs します — Jangan Tertukar!", points:[
      "<b>なります</b>: Perubahan yang terjadi secara alami, bertahap, atau di luar kendali penuh.",
      "にほんごが じょうずに <b>なりました</b>。→ Bahasa Jepangnya menjadi mahir. (hasil proses belajar)",
      "<b>します</b>: Perubahan yang dipilih/dilakukan secara aktif/sengaja.",
      "かみを みじかく <b>します</b>。→ Saya potong rambut (menjadi) pendek. (keputusan aktif)",
      "Singkat: なります = terjadi sendiri / します = dibuat terjadi."
    ]}
  ],
  bunpou: [
    {
      tag: "A", label: "KS い → ~く / KS な → ~に / KB に + なります",
      pattern: "KS/KB + なります",
      desc: "なります menunjukkan perubahan kondisi. なります diikuti oleh kata sifat dan kata benda. KS い → ~く, KS な → ~に, KB → に",
      note: {type:"blue", text:"<b>💡 Ringkasan konjugasi:</b><br>KS い: さむ<b>い</b> → さむ<b>く</b>なります<br>KS な: しずか<b>な</b> → しずか<b>に</b>なります<br>KB: いしゃ → いしゃ<b>に</b>なります<br>Negatif KS い: さむ<b>く</b>なります → さむ<b>く なりません</b>"},
      reibun: [
        {jp:"<ruby><rb>日本語</rb><rt>にほんご</rt></ruby>の <ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>が だんだん<ruby><rb>楽</rb><rt>たの</rt></ruby>しくなりました。", rom:"Nihongo no benkyō ga dandan tanoshiku narimashita.", id:"Belajar bahasa Jepang menjadi semakin menyenangkan."},
        {jp:"バオさんは <ruby><rb>日本語</rb><rt>にほんご</rt></ruby>が <ruby><rb>上手</rb><rt>じょうず</rt></ruby>になりました。", rom:"Bao san wa nihongo ga jōzu ni narimashita.", id:"Bao menjadi pandai berbahasa Jepang."},
        {jp:"<ruby><rb>薬</rb><rt>くすり</rt></ruby>を <ruby><rb>飲</rb><rt>の</rt></ruby>みましたから、<ruby><rb>体</rb><rt>からだ</rt></ruby>の <ruby><rb>調子</rb><rt>ちょうし</rt></ruby>が よくなりました。", rom:"Kusuri o nomimashita kara, karada no chōshi ga yoku narimashita.", id:"Karena sudah minum obat, kondisi badan saya menjadi lebih baik."}
      ]
    }
  ],
  kotoba: [
    {jp:"なります",furigana:"",rom:"narimasu",id:"menjadi",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>強</rb><rt>つよ</rt></ruby>い",furigana:"つよい",rom:"tsuyoi",id:"kuat",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>弱</rb><rt>よわ</rt></ruby>い",furigana:"よわい",rom:"yowai",id:"lemah",cat:"Kata Sifat",lv:"core",grp:"い"},
    {jp:"<ruby><rb>調子</rb><rt>ちょうし</rt></ruby>がいい",furigana:"ちょうしがいい",rom:"chōshi ga ii",id:"dalam kondisi baik",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>調子</rb><rt>ちょうし</rt></ruby>が<ruby><rb>悪</rb><rt>わる</rt></ruby>い",furigana:"ちょうしがわるい",rom:"chōshi ga warui",id:"dalam kondisi buruk",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>調子</rb><rt>ちょうし</rt></ruby>",furigana:"ちょうし",rom:"chōshi",id:"kondisi",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>発音</rb><rt>はつおん</rt></ruby>",furigana:"はつおん",rom:"hatsuon",id:"pengucapan",cat:"Kata Benda",lv:"extra"},
    {jp:"だんだん",furigana:"",rom:"dandan",id:"bertahap",cat:"Kata Keterangan",lv:"core"},
    {jp:"もうすぐ",furigana:"",rom:"mō sugu",id:"segera",cat:"Kata Keterangan",lv:"core"},
    {jp:"おかげさまで",furigana:"",rom:"okage sama de",id:"Terima kasih berkat Anda",cat:"Ekspresi",lv:"extra"},
    {jp:"<ruby><rb>楽</rb><rt>たの</rt></ruby>しくなります",furigana:"たのしくなります",rom:"tanoshiku narimasu",id:"menjadi menyenangkan",cat:"Ekspresi",lv:"extra"},
    {jp:"<ruby><rb>上手</rb><rt>じょうず</rt></ruby>になります",furigana:"じょうずになります",rom:"jōzu ni narimasu",id:"menjadi mahir",cat:"Ekspresi",lv:"extra"}
  ]
},
{
  num: 35,
  title: "くれます / もらいます / あげます",
  sub: "memberi dan menerima tindakan",
  color: "bab-35",
  bunpou: [
    {
      tag: "A", label: "くれます",
      pattern: "くれます (menerima dari orang lain)",
      desc: "Kata kerja あげます (memberi) tidak dapat digunakan untuk berbicara tentang orang lain yang memberikan sesuatu kepada pembicara atau anggota keluarganya. Pada kasus ini, kata kerja くれます digunakan.",
      reibun: [
        {jp:"<ruby><rb>田中</rb><rt>たなか</rt></ruby>さんは わたしに <ruby><rb>日本語</rb><rt>にほんご</rt></ruby>の <ruby><rb>辞書</rb><rt>じしょ</rt></ruby>を くれました。", rom:"Tanaka san wa watashi ni nihongo no jisho o kuremashita.", id:"Tanaka memberi saya kamus bahasa Jepang."},
        {jp:"<ruby><rb>佐藤</rb><rt>さとう</rt></ruby>さんは わたしの <ruby><rb>妹</rb><rt>いもうと</rt></ruby>に いつも お<ruby><rb>菓子</rb><rt>かし</rt></ruby>を くれます。", rom:"Satō san wa watashi no imōto ni itsumo okashi o kuremasu.", id:"Sato selalu memberi adik perempuan saya kue."}
      ]
    },
    {
      tag: "B", label: "KK bentuk て あげます / もらいます / くれます",
      pattern: "KK て + あげます/もらいます/くれます",
      desc: "あげます, もらいます dan くれます merujuk pada memberi dan menerima sesuatu, sedangkan 〜て あげます, 〜て もらいます, dan 〜て くれます digunakan untuk menunjukkan bahwa suatu tindakan memberikan semacam keuntungan atau manfaat pada penerima.",
      reibun: [
        {jp:"わたしは おじいさんに <ruby><rb>道</rb><rt>みち</rt></ruby>を <ruby><rb>教</rb><rt>おし</rt></ruby>えて あげました。", rom:"Watashi wa ojīsan ni michi o oshiete agemashita.", id:"Saya memberitahu kakek tentang jalannya."},
        {jp:"<ruby><rb>友</rb><rt>とも</rt></ruby>だちに <ruby><rb>引</rb><rt>ひ</rt></ruby>っ<ruby><rb>越</rb><rt>こ</rt></ruby>しを <ruby><rb>手伝</rb><rt>てつだ</rt></ruby>って もらいました。", rom:"Tomodachi ni hikkoshi o tetsudatte moraimashita.", id:"Saya dibantu pindahan oleh teman."},
        {jp:"バオさんの <ruby><rb>家</rb><rt>いえ</rt></ruby>に <ruby><rb>遊</rb><rt>あそ</rt></ruby>びに <ruby><rb>行</rb><rt>い</rt></ruby>った とき、バオさんが ベトナムの コーヒーを <ruby><rb>入</rb><rt>い</rt></ruby>れて くれました。", rom:"Bao san no ie ni asobi ni itta toki, Bao san ga Betonamu no kōhī o irete kuremashita.", id:"Ketika saya berkunjung ke rumah Bao, Bao membuatkan kopi Vietnam untuk saya."}
      ]
    }
  ],
  kotoba: [
    {jp:"くれます",furigana:"",rom:"kuremasu",id:"diberikan",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"<ruby><rb>引</rb><rt>ひ</rt></ruby>っ<ruby><rb>越</rb><rt>こ</rt></ruby>しします",furigana:"ひっこしします",rom:"hikkoshi shimasu",id:"pindahan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>連</rb><rt>つ</rt></ruby>れて<ruby><rb>行</rb><rt>い</rt></ruby>きます",furigana:"つれていきます",rom:"tsurete ikimasu",id:"mengajak pergi",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>連</rb><rt>つ</rt></ruby>れて<ruby><rb>来</rb><rt>き</rt></ruby>ます",furigana:"つれてきます",rom:"tsurete kimasu",id:"mengajak datang",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（<ruby><rb>人</rb><rt>ひと</rt></ruby>を）<ruby><rb>送</rb><rt>おく</rt></ruby>ります",furigana:"（ひとを）おくります",rom:"(hito o) okurimasu",id:"mengantarkan (seseorang)",cat:"Kata Kerja",lv:"core",grp:"I"},
    {jp:"<ruby><rb>紹介</rb><rt>しょうかい</rt></ruby>します",furigana:"しょうかいします",rom:"shōkai shimasu",id:"memperkenalkan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>案内</rb><rt>あんない</rt></ruby>します",furigana:"あんないします",rom:"annai shimasu",id:"memandu",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"<ruby><rb>説明</rb><rt>せつめい</rt></ruby>します",furigana:"せつめいします",rom:"setsumei shimasu",id:"menjelaskan",cat:"Kata Kerja",lv:"core",grp:"III"},
    {jp:"（コーヒーを）<ruby><rb>入</rb><rt>い</rt></ruby>れます",furigana:"（コーヒーを）いれます",rom:"(kōhī o) iremasu",id:"membuat (kopi)",cat:"Kata Kerja",lv:"core",grp:"II"},
    {jp:"（お）<ruby><rb>菓子</rb><rt>かし</rt></ruby>",furigana:"（お）かし",rom:"(o)kashi",id:"kue; jajanan",cat:"Kata Benda",lv:"core"},
    {jp:"（お）<ruby><rb>弁当</rb><rt>べんとう</rt></ruby>",furigana:"（お）べんとう",rom:"(o)bentō",id:"bekal makan siang",cat:"Kata Benda",lv:"core"},
    {jp:"ホストファミリー",furigana:"",rom:"hosuto famirī",id:"host family; keluarga asuh",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>準備</rb><rt>じゅんび</rt></ruby>",furigana:"じゅんび",rom:"junbi",id:"persiapan",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>意味</rb><rt>いみ</rt></ruby>",furigana:"いみ",rom:"imi",id:"arti",cat:"Kata Benda",lv:"core"},
    {jp:"<ruby><rb>母</rb><rt>はは</rt></ruby>の<ruby><rb>日</rb><rt>ひ</rt></ruby>",furigana:"ははのひ",rom:"haha no hi",id:"Hari Ibu",cat:"Kata Benda",lv:"extra"},
    {jp:"スーツケース",furigana:"",rom:"sūtsukēsu",id:"koper",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>他</rb><rt>ほか</rt></ruby>に",furigana:"ほかに",rom:"hoka ni",id:"selain itu",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>全部</rb><rt>ぜんぶ</rt></ruby>",furigana:"ぜんぶ",rom:"zenbu",id:"semua; seluruhnya",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>自分</rb><rt>じぶん</rt></ruby>で",furigana:"じぶんで",rom:"jibun de",id:"sendiri",cat:"Ekspresi",lv:"core"},
    {jp:"<ruby><rb>お爺</rb><rt>おじい</rt></ruby>さん",furigana:"おじいさん",rom:"ojīsan",id:"kakek",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>お婆</rb><rt>おばあ</rt></ruby>さん",furigana:"おばあさん",rom:"obāsan",id:"nenek",cat:"Kata Benda",lv:"extra"},
    {jp:"<ruby><rb>小学校</rb><rt>しょうがっこう</rt></ruby>に<ruby><rb>入</rb><rt>はい</rt></ruby>る",furigana:"しょうがっこうにはいる",rom:"shōgakkō ni hairu",id:"masuk sekolah dasar",cat:"Ekspresi",lv:"extra"}
  ]
}
];
