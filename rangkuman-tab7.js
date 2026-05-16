// ========== RANGKUMAN TAB 7: Lainnya ==========
function renderRsumTab7(lvLabel, lvColor) {
  const counterSection = buildCounterSection();
  const agemoSection = buildAgemoSection();
  const waktuSection = buildWaktuSection();
  const konjungsiSection = buildKonjungsiSection();

  document.getElementById('rsum-tab-7').innerHTML = `<div style="padding:16px 14px 20px">
    <div class="rsum-section-title">📚 Lainnya — Rangkuman Tambahan</div>
    <div style="font-size:0.78rem;color:var(--text2);margin-bottom:16px;padding:8px 12px;background:var(--surface2);border-radius:8px;line-height:1.6">
      Kumpulan materi penting yang sering membingungkan: <b>Kata Bantu Bilangan</b>, <b>Verba Memberi/Menerima</b>, <b>Ekspresi Waktu</b>, dan <b>Kata Penghubung</b>.
    </div>
    ${counterSection}
    ${agemoSection}
    ${waktuSection}
    ${konjungsiSection}
  </div>`;
}


// ── Counter / Kata Bantu Bilangan ──
function buildCounterSection() {
  return `
    <div class="konj-accordion open" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(251,191,36,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,191,36,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--amber)">🔢 <ruby>助数詞<rt>じょすうし</rt></ruby> — Kata Bantu Bilangan (Counter)</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;color:var(--text2);margin-bottom:10px;line-height:1.6">
          Dalam bahasa Jepang, menghitung benda menggunakan kata bantu bilangan (counter) yang berbeda tergantung bentuk/jenis benda.
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:700px">
          <thead><tr><th>Counter</th><th>Untuk</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">〜つ</td><td style="font-size:0.7rem">Benda umum</td><td class="rsum-form">ひとつ</td><td class="rsum-form">ふたつ</td><td class="rsum-form">みっつ</td><td class="rsum-form">よっつ</td><td class="rsum-form">いつつ</td><td class="rsum-form">むっつ</td><td class="rsum-form">ななつ</td><td class="rsum-form">やっつ</td><td class="rsum-form">ここのつ</td><td class="rsum-form">とお</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>人<rt>にん</rt></ruby></td><td style="font-size:0.7rem">Orang</td><td class="rsum-form"><b>ひとり</b></td><td class="rsum-form"><b>ふたり</b></td><td class="rsum-form">さんにん</td><td class="rsum-form"><b>よにん</b></td><td class="rsum-form">ごにん</td><td class="rsum-form">ろくにん</td><td class="rsum-form"><b>しちにん</b></td><td class="rsum-form">はちにん</td><td class="rsum-form"><b>くにん</b></td><td class="rsum-form">じゅうにん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>枚<rt>まい</rt></ruby></td><td style="font-size:0.7rem">Benda tipis/datar</td><td class="rsum-form">いちまい</td><td class="rsum-form">にまい</td><td class="rsum-form">さんまい</td><td class="rsum-form">よんまい</td><td class="rsum-form">ごまい</td><td class="rsum-form">ろくまい</td><td class="rsum-form">ななまい</td><td class="rsum-form">はちまい</td><td class="rsum-form">きゅうまい</td><td class="rsum-form">じゅうまい</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>本<rt>ほん</rt></ruby></td><td style="font-size:0.7rem">Benda panjang/silinder</td><td class="rsum-form"><b>いっぽん</b></td><td class="rsum-form">にほん</td><td class="rsum-form"><b>さんぼん</b></td><td class="rsum-form">よんほん</td><td class="rsum-form">ごほん</td><td class="rsum-form"><b>ろっぽん</b></td><td class="rsum-form">ななほん</td><td class="rsum-form"><b>はっぽん</b></td><td class="rsum-form">きゅうほん</td><td class="rsum-form"><b>じゅっぽん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>台<rt>だい</rt></ruby></td><td style="font-size:0.7rem">Mesin/kendaraan</td><td class="rsum-form">いちだい</td><td class="rsum-form">にだい</td><td class="rsum-form">さんだい</td><td class="rsum-form">よんだい</td><td class="rsum-form">ごだい</td><td class="rsum-form">ろくだい</td><td class="rsum-form">ななだい</td><td class="rsum-form">はちだい</td><td class="rsum-form">きゅうだい</td><td class="rsum-form">じゅうだい</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>冊<rt>さつ</rt></ruby></td><td style="font-size:0.7rem">Buku/majalah</td><td class="rsum-form"><b>いっさつ</b></td><td class="rsum-form">にさつ</td><td class="rsum-form">さんさつ</td><td class="rsum-form">よんさつ</td><td class="rsum-form">ごさつ</td><td class="rsum-form">ろくさつ</td><td class="rsum-form">ななさつ</td><td class="rsum-form"><b>はっさつ</b></td><td class="rsum-form">きゅうさつ</td><td class="rsum-form"><b>じゅっさつ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>杯<rt>はい</rt></ruby></td><td style="font-size:0.7rem">Gelas/cangkir</td><td class="rsum-form"><b>いっぱい</b></td><td class="rsum-form">にはい</td><td class="rsum-form"><b>さんばい</b></td><td class="rsum-form">よんはい</td><td class="rsum-form">ごはい</td><td class="rsum-form"><b>ろっぱい</b></td><td class="rsum-form">ななはい</td><td class="rsum-form"><b>はっぱい</b></td><td class="rsum-form">きゅうはい</td><td class="rsum-form"><b>じゅっぱい</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>回<rt>かい</rt></ruby></td><td style="font-size:0.7rem">Kali (frekuensi)</td><td class="rsum-form"><b>いっかい</b></td><td class="rsum-form">にかい</td><td class="rsum-form">さんかい</td><td class="rsum-form">よんかい</td><td class="rsum-form">ごかい</td><td class="rsum-form"><b>ろっかい</b></td><td class="rsum-form">ななかい</td><td class="rsum-form"><b>はっかい</b></td><td class="rsum-form">きゅうかい</td><td class="rsum-form"><b>じゅっかい</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>階<rt>かい</rt></ruby></td><td style="font-size:0.7rem">Lantai</td><td class="rsum-form"><b>いっかい</b></td><td class="rsum-form">にかい</td><td class="rsum-form"><b>さんがい</b></td><td class="rsum-form">よんかい</td><td class="rsum-form">ごかい</td><td class="rsum-form"><b>ろっかい</b></td><td class="rsum-form">ななかい</td><td class="rsum-form"><b>はっかい</b></td><td class="rsum-form">きゅうかい</td><td class="rsum-form"><b>じゅっかい</b></td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:10px 14px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:var(--amber)">⚠️ Perubahan bunyi (rendaku):</b><br>
          • 〜ほん → <b>いっぽん, さんぼん, ろっぽん, はっぽん, じゅっぽん</b><br>
          • 〜はい → <b>いっぱい, さんばい, ろっぱい, はっぱい, じゅっぱい</b><br>
          • 〜かい/さつ → <b>いっかい/いっさつ, ろっかい, はっかい/はっさつ, じゅっかい/じゅっさつ</b><br>
          • Yang dicetak <b>tebal</b> = bentuk yang berubah/perlu dihafal khusus!
        </div>
      </div>
    </div>`;
}


// ── Verba Memberi/Menerima (あげもらいくれ) ──
function buildAgemoSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(192,132,252,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(192,132,252,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#c084fc">🎁 Verba Memberi & Menerima — あげます・もらいます・くれます</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;color:var(--text2);margin-bottom:10px;line-height:1.6">
          Bahasa Jepang punya 3 kata kerja "memberi/menerima" yang berbeda tergantung <b>siapa memberi ke siapa</b> dan dari <b>sudut pandang siapa</b>.
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:550px">
          <thead><tr><th>Kata Kerja</th><th>Arah</th><th>Arti</th><th>Partikel</th><th>Contoh</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:#34d399">あげます</td><td style="font-size:0.72rem">Saya/orang lain → orang lain<br>(dari dekat ke jauh)</td><td style="font-size:0.74rem">Memberi (ke orang lain)</td><td class="rsum-form">〜に あげます</td><td class="rsum-form" style="font-size:0.76rem">ともだち<b>に</b> <ruby>花<rt>はな</rt></ruby>を <b>あげます</b></td></tr>
            <tr><td style="font-weight:700;color:#60a5fa">もらいます</td><td style="font-size:0.72rem">Orang lain → Saya/orang dekat<br>(menerima dari)</td><td style="font-size:0.74rem">Menerima (dari orang lain)</td><td class="rsum-form">〜に/から もらいます</td><td class="rsum-form" style="font-size:0.76rem"><ruby>先生<rt>せんせい</rt></ruby><b>に</b> <ruby>本<rt>ほん</rt></ruby>を <b>もらいました</b></td></tr>
            <tr><td style="font-weight:700;color:#f87171">くれます</td><td style="font-size:0.72rem">Orang lain → Saya (pembicara)<br>(orang lain memberi KE saya)</td><td style="font-size:0.74rem">Memberi (ke saya)</td><td class="rsum-form">〜が くれます</td><td class="rsum-form" style="font-size:0.76rem">ともだち<b>が</b> ケーキを <b>くれました</b></td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:14px;font-size:0.78rem;font-weight:700;color:var(--accent2);margin-bottom:8px">🔧 Bentuk 〜て + あげます/もらいます/くれます</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:520px">
          <thead><tr><th>Pola</th><th>Arti</th><th>Contoh</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600;color:#34d399">KKて + あげます</td><td style="font-size:0.74rem">Melakukan sesuatu UNTUK orang lain</td><td class="rsum-form" style="font-size:0.76rem">ともだちに <ruby>日本語<rt>にほんご</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えて<b>あげます</b></td></tr>
            <tr><td style="font-weight:600;color:#60a5fa">KKて + もらいます</td><td style="font-size:0.74rem">Meminta/menerima bantuan dari orang lain</td><td class="rsum-form" style="font-size:0.76rem"><ruby>友<rt>とも</rt></ruby>だちに <ruby>手伝<rt>てつだ</rt></ruby>って<b>もらいます</b></td></tr>
            <tr><td style="font-weight:600;color:#f87171">KKて + くれます</td><td style="font-size:0.74rem">Orang lain melakukan sesuatu UNTUK saya</td><td class="rsum-form" style="font-size:0.76rem"><ruby>母<rt>はは</rt></ruby>が おべんとうを <ruby>作<rt>つく</rt></ruby>って<b>くれました</b></td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:10px 14px;background:rgba(192,132,252,0.08);border-left:3px solid #c084fc;border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:#c084fc">💡 Cara Mengingat:</b><br>
          • <b>あげます</b> = "naik" → barang NAIK/pergi DARI saya ke orang lain<br>
          • <b>もらいます</b> = saya MENERIMA → fokus pada penerima (saya/orang dekat)<br>
          • <b>くれます</b> = orang lain MEMBERI ke saya → fokus pada si pemberi (rasa terima kasih)<br>
          • ❌ Jangan pakai あげます untuk memberi ke diri sendiri atau orang yang lebih tinggi kedudukannya → gunakan さしあげます (lebih sopan)
        </div>
      </div>
    </div>`;
}


// ── Ekspresi Waktu ──
function buildWaktuSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(45,212,191,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(45,212,191,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--teal)">⏰ Ekspresi Waktu — Sebelum, Sesudah, Selama, Sambil</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:560px">
          <thead><tr><th>Pola</th><th>Cara Pakai</th><th>Contoh</th><th>Arti</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:#fbbf24">〜<ruby>前<rt>まえ</rt></ruby>に</td><td style="font-size:0.72rem">KK辞書形 + まえに<br>KB + の + まえに</td><td class="rsum-form" style="font-size:0.76rem"><b>ねる</b> まえに、はを みがきます</td><td style="font-size:0.72rem;color:var(--text2)">Sebelum tidur, sikat gigi</td></tr>
            <tr><td style="font-weight:700;color:#fb923c">〜た <ruby>後<rt>あと</rt></ruby>で</td><td style="font-size:0.72rem">KKた形 + あとで<br>KB + の + あとで</td><td class="rsum-form" style="font-size:0.76rem"><b>たべた</b> あとで、コーヒーを のみます</td><td style="font-size:0.72rem;color:var(--text2)">Setelah makan, minum kopi</td></tr>
            <tr><td style="font-weight:700;color:#34d399">〜てから</td><td style="font-size:0.72rem">KKて形 + から</td><td class="rsum-form" style="font-size:0.76rem">シャワーを <b>あびてから</b>、ねます</td><td style="font-size:0.72rem;color:var(--text2)">Setelah mandi, tidur (urutan ketat)</td></tr>
            <tr><td style="font-weight:700;color:#60a5fa">〜<ruby>間<rt>あいだ</rt></ruby>に</td><td style="font-size:0.72rem">KK辞書形/ている + あいだに<br>KB + の + あいだに</td><td class="rsum-form" style="font-size:0.76rem"><b>るすの あいだに</b>、ともだちが きました</td><td style="font-size:0.72rem;color:var(--text2)">Selama tidak di rumah, teman datang</td></tr>
            <tr><td style="font-weight:700;color:#a78bfa">〜ながら</td><td style="font-size:0.72rem">KKます形(hapus ます) + ながら</td><td class="rsum-form" style="font-size:0.76rem"><ruby>音楽<rt>おんがく</rt></ruby>を <b>ききながら</b>、べんきょうします</td><td style="font-size:0.72rem;color:var(--text2)">Belajar sambil dengar musik</td></tr>
            <tr><td style="font-weight:700;color:#f472b6">〜<ruby>時<rt>とき</rt></ruby></td><td style="font-size:0.72rem">KK辞書形/た形 + とき<br>KSい + とき<br>KSな + な + とき<br>KB + の + とき</td><td class="rsum-form" style="font-size:0.76rem"><b>わかい</b> とき、よく うんどうしました</td><td style="font-size:0.72rem;color:var(--text2)">Waktu muda, sering olahraga</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:12px;padding:10px 14px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:var(--amber)">⚠️ Perbedaan あとで vs てから:</b><br>
          • <b>あとで</b> = setelah ~ (bisa ada jeda waktu, urutan longgar)<br>
          • <b>てから</b> = setelah ~ baru ... (urutan ketat, langsung setelahnya)<br>
          • Contoh: <span style="font-family:'Noto Sans JP',sans-serif">ごはんを たべた あとで、さんぽします</span> (makan, lalu kapan-kapan jalan-jalan)<br>
          • <span style="font-family:'Noto Sans JP',sans-serif">ごはんを たべてから、すぐ さんぽします</span> (makan, langsung jalan-jalan)
        </div>

        <div style="margin-top:10px;padding:10px 14px;background:rgba(45,212,191,0.08);border-left:3px solid var(--teal);border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:var(--teal)">💡 Partikel に untuk waktu — kapan pakai, kapan tidak?</b><br>
          • <b>Pakai に</b>: waktu spesifik → ７じ<b>に</b>、<ruby>月曜日<rt>げつようび</rt></ruby><b>に</b>、３<ruby>月<rt>がつ</rt></ruby><b>に</b>、2024<ruby>年<rt>ねん</rt></ruby><b>に</b><br>
          • <b>Tidak pakai に</b>: waktu relatif → きょう、あした、きのう、まいにち、いつも、せんしゅう、らいねん
        </div>
      </div>
    </div>`;
}


// ── Kata Penghubung / Konjungsi ──
function buildKonjungsiSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(96,165,250,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(96,165,250,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#60a5fa">🔗 Kata Penghubung (<ruby>接続詞<rt>せつぞくし</rt></ruby>) — Konjungsi</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;color:var(--text2);margin-bottom:10px;line-height:1.6">
          Kata penghubung menghubungkan kalimat/klausa. Berikut yang paling sering muncul di N5–N4:
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:550px">
          <thead><tr><th>Kata</th><th>Romaji</th><th>Arti</th><th>Contoh</th><th>Bab</th></tr></thead>
          <tbody>
            <tr style="background:rgba(52,211,153,0.04)"><td colspan="5" style="font-weight:700;font-size:0.7rem;color:var(--green);letter-spacing:0.06em;padding:6px 10px">TAMBAHAN / URUTAN</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">そして</td><td style="font-size:0.7rem">soshite</td><td style="font-size:0.74rem">Dan kemudian; lalu</td><td class="rsum-form" style="font-size:0.74rem">かいものを しました。<b>そして</b> えいがを みました。</td><td style="font-size:0.68rem;color:var(--text2)">N5</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">それから</td><td style="font-size:0.7rem">sorekara</td><td style="font-size:0.74rem">Setelah itu; kemudian</td><td class="rsum-form" style="font-size:0.74rem">ごはんを たべます。<b>それから</b> コーヒーを のみます。</td><td style="font-size:0.68rem;color:var(--text2)">N5</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">それに</td><td style="font-size:0.7rem">soreni</td><td style="font-size:0.74rem">Selain itu; lagipula</td><td class="rsum-form" style="font-size:0.74rem">やすいです。<b>それに</b> おいしいです。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>

            <tr style="background:rgba(248,113,113,0.04)"><td colspan="5" style="font-weight:700;font-size:0.7rem;color:var(--red);letter-spacing:0.06em;padding:6px 10px">PERTENTANGAN / KONTRAS</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">でも</td><td style="font-size:0.7rem">demo</td><td style="font-size:0.74rem">Tapi; namun (santai)</td><td class="rsum-form" style="font-size:0.74rem">いきたいです。<b>でも</b> じかんが ありません。</td><td style="font-size:0.68rem;color:var(--text2)">N5</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">しかし</td><td style="font-size:0.7rem">shikashi</td><td style="font-size:0.74rem">Akan tetapi (formal)</td><td class="rsum-form" style="font-size:0.74rem">べんりです。<b>しかし</b> たかいです。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">けれども</td><td style="font-size:0.7rem">keredomo</td><td style="font-size:0.74rem">Meskipun (agak formal)</td><td class="rsum-form" style="font-size:0.74rem"><ruby>高<rt>たか</rt></ruby>いです。<b>けれども</b> かいます。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>

            <tr style="background:rgba(251,191,36,0.04)"><td colspan="5" style="font-weight:700;font-size:0.7rem;color:var(--amber);letter-spacing:0.06em;padding:6px 10px">ALASAN / SEBAB</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">だから</td><td style="font-size:0.7rem">dakara</td><td style="font-size:0.74rem">Oleh karena itu; makanya</td><td class="rsum-form" style="font-size:0.74rem">あめが ふっています。<b>だから</b> かさを もっていきます。</td><td style="font-size:0.68rem;color:var(--text2)">N5</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">ですから</td><td style="font-size:0.7rem">desukara</td><td style="font-size:0.74rem">Oleh karena itu (sopan)</td><td class="rsum-form" style="font-size:0.74rem">びょうきです。<b>ですから</b> やすみます。</td><td style="font-size:0.68rem;color:var(--text2)">N5</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">それで</td><td style="font-size:0.7rem">sorede</td><td style="font-size:0.74rem">Lalu (karena itu); jadi</td><td class="rsum-form" style="font-size:0.74rem">でんしゃが とまりました。<b>それで</b> おくれました。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>

            <tr style="background:rgba(124,106,247,0.04)"><td colspan="5" style="font-weight:700;font-size:0.7rem;color:var(--accent);letter-spacing:0.06em;padding:6px 10px">GANTI TOPIK / LAINNYA</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">ところで</td><td style="font-size:0.7rem">tokorode</td><td style="font-size:0.74rem">Ngomong-ngomong; omong-omong</td><td class="rsum-form" style="font-size:0.74rem"><b>ところで</b>、あしたの パーティー、いきますか。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">では/じゃ</td><td style="font-size:0.7rem">dewa/ja</td><td style="font-size:0.74rem">Kalau begitu; nah</td><td class="rsum-form" style="font-size:0.74rem"><b>じゃ</b>、また あした。</td><td style="font-size:0.68rem;color:var(--text2)">N5</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">つまり</td><td style="font-size:0.7rem">tsumari</td><td style="font-size:0.74rem">Dengan kata lain; jadi intinya</td><td class="rsum-form" style="font-size:0.74rem"><b>つまり</b>、やめたい ということですか。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">たとえば</td><td style="font-size:0.7rem">tatoeba</td><td style="font-size:0.74rem">Misalnya; contohnya</td><td class="rsum-form" style="font-size:0.74rem"><b>たとえば</b>、すしや ラーメンが すきです。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:10px 14px;background:rgba(96,165,250,0.08);border-left:3px solid #60a5fa;border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:#60a5fa">💡 Tips Penggunaan:</b><br>
          • <b>でも vs しかし</b>: でも=percakapan santai, しかし=tulisan/formal<br>
          • <b>だから vs ですから</b>: だから=santai, ですから=sopan<br>
          • <b>そして vs それから</b>: そして=dan (paralel), それから=lalu/kemudian (urutan waktu)<br>
          • Kata penghubung diletakkan di <b>awal kalimat kedua</b>, bukan di tengah kalimat!
        </div>
      </div>
    </div>`;
}
