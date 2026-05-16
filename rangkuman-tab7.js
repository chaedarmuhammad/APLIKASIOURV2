// ========== RANGKUMAN TAB 7: Angka & Bilangan ==========
function renderRsumTab7(lvLabel, lvColor) {
  const counterSection = buildCounterSection();
  const numberSection = buildNumberSection();
  const jamSection = buildJamSection();
  const menitSection = buildMenitSection();
  const tanggalSection = buildTanggalSection();
  const bulanSection = buildBulanSection();
  const tahunSection = buildTahunSection();
  const hargaSection = buildHargaSection();
  const umurSection = buildUmurSection();
  const durasiJamSection = buildDurasiJamSection();
  const durasiMingguSection = buildDurasiMingguSection();
  const durasiHariSection = buildDurasiHariSection();
  const youbiSection = buildYoubiSection();

  document.getElementById('rsum-tab-7').innerHTML = `<div style="padding:16px 14px 20px">
    <div class="rsum-section-title">🔢 <ruby>数<rt>かず</rt></ruby>・<ruby>助数詞<rt>じょすうし</rt></ruby> — Angka & Bilangan</div>
    <div style="font-size:0.78rem;color:var(--text2);margin-bottom:18px;padding:8px 12px;background:var(--surface2);border-radius:8px;line-height:1.6">
      Kumpulan lengkap cara membaca angka, waktu, tanggal, harga, umur, dan kata bantu bilangan (<ruby>助数詞<rt>じょすうし</rt></ruby>) dalam <ruby>日本語<rt>にほんご</rt></ruby>.
    </div>

    <!-- GROUP: Bilangan Dasar -->
    <div style="margin-bottom:8px;padding:6px 12px;background:linear-gradient(90deg,rgba(251,191,36,0.12),transparent);border-radius:8px;font-size:0.72rem;font-weight:700;color:var(--amber);letter-spacing:0.08em;text-transform:uppercase">
      📊 Bilangan Dasar
    </div>
    ${numberSection}

    <!-- GROUP: Waktu -->
    <div style="margin-top:20px;margin-bottom:8px;padding:6px 12px;background:linear-gradient(90deg,rgba(96,165,250,0.12),transparent);border-radius:8px;font-size:0.72rem;font-weight:700;color:#60a5fa;letter-spacing:0.08em;text-transform:uppercase">
      🕐 Waktu & Durasi
    </div>
    ${jamSection}
    ${menitSection}
    ${durasiJamSection}

    <!-- GROUP: Kalender -->
    <div style="margin-top:20px;margin-bottom:8px;padding:6px 12px;background:linear-gradient(90deg,rgba(251,146,60,0.12),transparent);border-radius:8px;font-size:0.72rem;font-weight:700;color:#fb923c;letter-spacing:0.08em;text-transform:uppercase">
      📅 Kalender & Tanggal
    </div>
    ${youbiSection}
    ${tanggalSection}
    ${durasiHariSection}
    ${durasiMingguSection}
    ${bulanSection}
    ${tahunSection}

    <!-- GROUP: Kuantitas -->
    <div style="margin-top:20px;margin-bottom:8px;padding:6px 12px;background:linear-gradient(90deg,rgba(34,197,94,0.12),transparent);border-radius:8px;font-size:0.72rem;font-weight:700;color:#22c55e;letter-spacing:0.08em;text-transform:uppercase">
      💰 Kuantitas & Satuan
    </div>
    ${umurSection}
    ${hargaSection}
    ${counterSection}
  </div>`;
}

// ========== RANGKUMAN TAB 8: Lainnya ==========
function renderRsumTab8(lvLabel, lvColor) {
  const agemoSection = buildAgemoSection();
  const waktuSection = buildWaktuSection();
  const konjungsiSection = buildKonjungsiSection();

  document.getElementById('rsum-tab-8').innerHTML = `<div style="padding:16px 14px 20px">
    <div class="rsum-section-title">📚 Lainnya — Rangkuman Tambahan</div>
    <div style="font-size:0.78rem;color:var(--text2);margin-bottom:18px;padding:8px 12px;background:var(--surface2);border-radius:8px;line-height:1.6">
      Kumpulan materi penting lainnya: <b>Verba Memberi/Menerima</b>, <b>Ekspresi Waktu</b>, dan <b><ruby>接続詞<rt>せつぞくし</rt></ruby></b>.
    </div>

    <!-- GROUP: Tata Bahasa -->
    <div style="margin-bottom:8px;padding:6px 12px;background:linear-gradient(90deg,rgba(192,132,252,0.12),transparent);border-radius:8px;font-size:0.72rem;font-weight:700;color:#c084fc;letter-spacing:0.08em;text-transform:uppercase">
      🎁 Verba & Ekspresi
    </div>
    ${agemoSection}
    ${waktuSection}

    <!-- GROUP: Konjungsi -->
    <div style="margin-top:20px;margin-bottom:8px;padding:6px 12px;background:linear-gradient(90deg,rgba(96,165,250,0.12),transparent);border-radius:8px;font-size:0.72rem;font-weight:700;color:#60a5fa;letter-spacing:0.08em;text-transform:uppercase">
      🔗 Kata Penghubung
    </div>
    ${konjungsiSection}
  </div>`;
}




// ── Angka / Bilangan Dasar ──
function buildNumberSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(251,191,36,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,191,36,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--amber)">🔢 <ruby>数字<rt>すうじ</rt></ruby> — Angka / Bilangan</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(251,191,36,0.15);color:var(--amber);font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.75rem;color:var(--text2);margin-bottom:10px;line-height:1.5">
          Bilangan dasar. Angka 4, 7, 9 punya dua cara baca.
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:420px">
          <thead><tr><th><ruby>数字<rt>すうじ</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>数字<rt>すうじ</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">0</td><td class="rsum-form">ゼロ / れい</td><td style="font-weight:700;color:var(--accent2)">10</td><td class="rsum-form">じゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">1</td><td class="rsum-form">いち</td><td style="font-weight:700;color:var(--accent2)">20</td><td class="rsum-form">にじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2</td><td class="rsum-form">に</td><td style="font-weight:700;color:var(--accent2)">30</td><td class="rsum-form">さんじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3</td><td class="rsum-form">さん</td><td style="font-weight:700;color:var(--accent2)">40</td><td class="rsum-form">よんじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4</td><td class="rsum-form"><b>よん</b> / し</td><td style="font-weight:700;color:var(--accent2)">50</td><td class="rsum-form">ごじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5</td><td class="rsum-form">ご</td><td style="font-weight:700;color:var(--accent2)">60</td><td class="rsum-form">ろくじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">6</td><td class="rsum-form">ろく</td><td style="font-weight:700;color:var(--accent2)">70</td><td class="rsum-form">ななじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">7</td><td class="rsum-form"><b>なな</b> / しち</td><td style="font-weight:700;color:var(--accent2)">80</td><td class="rsum-form">はちじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">8</td><td class="rsum-form">はち</td><td style="font-weight:700;color:var(--accent2)">90</td><td class="rsum-form">きゅうじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">9</td><td class="rsum-form"><b>きゅう</b> / く</td><td style="font-weight:700;color:var(--accent2)">100</td><td class="rsum-form">ひゃく</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:12px;font-size:0.76rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📊 <ruby>大<rt>おお</rt></ruby>きい <ruby>数<rt>かず</rt></ruby> (Bilangan Besar)</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:420px">
          <thead><tr><th><ruby>数字<rt>すうじ</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>数字<rt>すうじ</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">100</td><td class="rsum-form">ひゃく</td><td style="font-weight:700;color:var(--accent2)">600</td><td class="rsum-form"><b>ろっぴゃく</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">200</td><td class="rsum-form">にひゃく</td><td style="font-weight:700;color:var(--accent2)">700</td><td class="rsum-form">ななひゃく</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">300</td><td class="rsum-form"><b>さんびゃく</b></td><td style="font-weight:700;color:var(--accent2)">800</td><td class="rsum-form"><b>はっぴゃく</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">400</td><td class="rsum-form">よんひゃく</td><td style="font-weight:700;color:var(--accent2)">900</td><td class="rsum-form">きゅうひゃく</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">500</td><td class="rsum-form">ごひゃく</td><td style="font-weight:700;color:var(--accent2)">1000</td><td class="rsum-form">せん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3000</td><td class="rsum-form"><b>さんぜん</b></td><td style="font-weight:700;color:var(--accent2)">8000</td><td class="rsum-form"><b>はっせん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">10,000</td><td class="rsum-form">いちまん</td><td style="font-weight:700;color:var(--accent2)">100,000</td><td class="rsum-form">じゅうまん</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:8px 12px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:var(--amber)">⚠️ 音変化:</b> 百: 300=<b>さんびゃく</b>, 600=<b>ろっぴゃく</b>, 800=<b>はっぴゃく</b> | 千: 3000=<b>さんぜん</b>, 8000=<b>はっせん</b>
        </div>
      </div>
    </div>`;
}


// ── Jam (時) ──
function buildJamSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(96,165,250,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(96,165,250,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#60a5fa">🕐 〜<ruby>時<rt>じ</rt></ruby> — Jam</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(96,165,250,0.15);color:#60a5fa;font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th>Jam</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Jam</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">いちじ</td><td style="font-weight:700;color:var(--accent2)">7<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form"><b>しちじ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">にじ</td><td style="font-weight:700;color:var(--accent2)">8<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">はちじ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">さんじ</td><td style="font-weight:700;color:var(--accent2)">9<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form"><b>くじ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form"><b>よじ</b></td><td style="font-weight:700;color:var(--accent2)">10<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">じゅうじ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">ごじ</td><td style="font-weight:700;color:var(--accent2)">11<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">じゅういちじ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">6<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">ろくじ</td><td style="font-weight:700;color:var(--accent2)">12<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">じゅうにじ</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(96,165,250,0.08);border-left:3px solid #60a5fa;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#60a5fa">⚠️</b> 4時=<b>よじ</b> | 7時=<b>しちじ</b> | 9時=<b>くじ</b> | <ruby>午前<rt>ごぜん</rt></ruby>=AM, <ruby>午後<rt>ごご</rt></ruby>=PM | なんじ=jam berapa?
        </div>
      </div>
    </div>`;
}


// ── Menit (分) ──
function buildMenitSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(52,211,153,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(52,211,153,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--green)">⏱️ 〜<ruby>分<rt>ふん</rt></ruby> — Menit</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(52,211,153,0.15);color:var(--green);font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th><ruby>分<rt>ふん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>分<rt>ふん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>いっぷん</b></td><td style="font-weight:700;color:var(--accent2)">6<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>ろっぷん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">にふん</td><td style="font-weight:700;color:var(--accent2)">7<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">ななふん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>さんぷん</b></td><td style="font-weight:700;color:var(--accent2)">8<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>はっぷん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">よんぷん</td><td style="font-weight:700;color:var(--accent2)">9<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">きゅうふん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">ごふん</td><td style="font-weight:700;color:var(--accent2)">10<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>じゅっぷん</b></td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(52,211,153,0.08);border-left:3px solid var(--green);border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:var(--green)">💡</b> <b>ぷん</b>: 1,3,4,6,8,10 | <b>ふん</b>: 2,5,7,9 | 30分=<b>はん</b> | なんぷん=berapa menit?
        </div>
      </div>
    </div>`;
}


// ── Durasi Jam (〜時間) ──
function buildDurasiJamSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(139,92,246,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(139,92,246,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#8b5cf6">⏳ 〜<ruby>時間<rt>じかん</rt></ruby> — Durasi Jam</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(139,92,246,0.15);color:#8b5cf6;font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:8px">〜<ruby>時<rt>じ</rt></ruby> = jam berapa (waktu) vs 〜<ruby>時間<rt>じかん</rt></ruby> = berapa jam (durasi)</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">いちじかん</td><td style="font-weight:700;color:var(--accent2)">6<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">ろくじかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">にじかん</td><td style="font-weight:700;color:var(--accent2)">7<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form"><b>ななじかん</b> / しちじかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">さんじかん</td><td style="font-weight:700;color:var(--accent2)">8<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">はちじかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form"><b>よじかん</b></td><td style="font-weight:700;color:var(--accent2)">9<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form"><b>くじかん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">ごじかん</td><td style="font-weight:700;color:var(--accent2)">10<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">じゅうじかん</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(139,92,246,0.08);border-left:3px solid #8b5cf6;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#8b5cf6">⚠️</b> 4時間=<b>よじかん</b> | 9時間=<b>くじかん</b> | 〜時間半=+30分 | <ruby>何時間<rt>なんじかん</rt></ruby>=berapa jam?
        </div>
      </div>
    </div>`;
}




// ── Hari dalam Seminggu (曜日) ──
function buildYoubiSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(168,85,247,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(168,85,247,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#a855f7">📅 <ruby>曜日<rt>ようび</rt></ruby> — Hari dalam Seminggu</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:420px">
          <thead><tr><th><ruby>曜日<rt>ようび</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th>Arti</th><th><ruby>漢字<rt>かんじ</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>月曜日<rt>げつようび</rt></ruby></td><td class="rsum-form">げつようび</td><td style="font-size:0.72rem">Senin</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>月<rt>つき</rt></ruby>=Moon</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>火曜日<rt>かようび</rt></ruby></td><td class="rsum-form">かようび</td><td style="font-size:0.72rem">Selasa</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>火<rt>ひ</rt></ruby>=Fire</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>水曜日<rt>すいようび</rt></ruby></td><td class="rsum-form">すいようび</td><td style="font-size:0.72rem">Rabu</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>水<rt>みず</rt></ruby>=Water</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>木曜日<rt>もくようび</rt></ruby></td><td class="rsum-form">もくようび</td><td style="font-size:0.72rem">Kamis</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>木<rt>き</rt></ruby>=Wood</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>金曜日<rt>きんようび</rt></ruby></td><td class="rsum-form">きんようび</td><td style="font-size:0.72rem">Jumat</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>金<rt>かね</rt></ruby>=Gold</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>土曜日<rt>どようび</rt></ruby></td><td class="rsum-form">どようび</td><td style="font-size:0.72rem">Sabtu</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>土<rt>つち</rt></ruby>=Earth</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>日曜日<rt>にちようび</rt></ruby></td><td class="rsum-form">にちようび</td><td style="font-size:0.72rem">Minggu</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>日<rt>ひ</rt></ruby>=Sun</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(168,85,247,0.08);border-left:3px solid #a855f7;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#a855f7">💡</b> <ruby>何曜日<rt>なんようび</rt></ruby>=hari apa? | <ruby>週末<rt>しゅうまつ</rt></ruby>=weekend | <ruby>平日<rt>へいじつ</rt></ruby>=weekday
        </div>
      </div>
    </div>`;
}


// ── Tanggal (日) ──
function buildTanggalSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(251,146,60,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,146,60,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#fb923c">📆 〜<ruby>日<rt>にち</rt></ruby> — Tanggal</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(251,146,60,0.15);color:#fb923c;font-weight:700">⚠️ 不規則</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:8px">Tanggal 1-10 = cara baca <ruby>和語<rt>わご</rt></ruby> (tidak beraturan). 11+ = <ruby>漢語<rt>かんご</rt></ruby>.</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:520px">
          <thead><tr><th><ruby>日<rt>にち</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>日<rt>にち</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>日<rt>にち</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>ついたち</b></td><td style="font-weight:700;color:var(--accent2)">11<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅういちにち</td><td style="font-weight:700;color:var(--accent2)">21<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅういちにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>ふつか</b></td><td style="font-weight:700;color:var(--accent2)">12<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうににち</td><td style="font-weight:700;color:var(--accent2)">22<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうににち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>みっか</b></td><td style="font-weight:700;color:var(--accent2)">13<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうさんにち</td><td style="font-weight:700;color:var(--accent2)">23<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうさんにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>よっか</b></td><td style="font-weight:700;color:var(--accent2)">14<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>じゅうよっか</b></td><td style="font-weight:700;color:var(--accent2)">24<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>にじゅうよっか</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>いつか</b></td><td style="font-weight:700;color:var(--accent2)">15<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうごにち</td><td style="font-weight:700;color:var(--accent2)">25<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうごにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">6<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>むいか</b></td><td style="font-weight:700;color:var(--accent2)">16<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうろくにち</td><td style="font-weight:700;color:var(--accent2)">26<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうろくにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">7<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>なのか</b></td><td style="font-weight:700;color:var(--accent2)">17<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうしちにち</td><td style="font-weight:700;color:var(--accent2)">27<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうしちにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">8<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>ようか</b></td><td style="font-weight:700;color:var(--accent2)">18<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうはちにち</td><td style="font-weight:700;color:var(--accent2)">28<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうはちにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">9<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>ここのか</b></td><td style="font-weight:700;color:var(--accent2)">19<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうくにち</td><td style="font-weight:700;color:var(--accent2)">29<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうくにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">10<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>とおか</b></td><td style="font-weight:700;color:var(--accent2)">20<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>はつか</b></td><td style="font-weight:700;color:var(--accent2)">30<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">さんじゅうにち</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(251,146,60,0.08);border-left:3px solid #fb923c;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#fb923c">⚠️</b> 14日=<b>じゅうよっか</b> | 20日=<b>はつか</b> | 24日=<b>にじゅうよっか</b> | <ruby>何日<rt>なんにち</rt></ruby>=tanggal berapa?
        </div>
      </div>
    </div>`;
}


// ── Durasi Hari (〜日間) ──
function buildDurasiHariSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(251,146,60,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,146,60,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#f97316">📆 〜<ruby>日間<rt>にちかん</rt></ruby> — Durasi Hari</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:8px">〜<ruby>日<rt>にち</rt></ruby> = tanggal vs 〜<ruby>日間<rt>にちかん</rt></ruby> = durasi (berapa hari)</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>いちにち</b></td><td style="font-weight:700;color:var(--accent2)">6<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form">むいかかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form"><b>ふつかかん</b></td><td style="font-weight:700;color:var(--accent2)">7<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form">なのかかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form"><b>みっかかん</b></td><td style="font-weight:700;color:var(--accent2)">8<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form">ようかかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form"><b>よっかかん</b></td><td style="font-weight:700;color:var(--accent2)">9<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form">ここのかかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form"><b>いつかかん</b></td><td style="font-weight:700;color:var(--accent2)">10<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form">とおかかん</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(251,146,60,0.08);border-left:3px solid #f97316;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#f97316">⚠️</b> 1日=<b>いちにち</b> (bukan ついたち!) | 2-10日間=baca tanggal+かん | 11+: じゅういちにちかん dst.
        </div>
      </div>
    </div>`;
}


// ── Durasi Minggu (〜週間) ──
function buildDurasiMingguSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(236,72,153,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(236,72,153,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#ec4899">📅 〜<ruby>週間<rt>しゅうかん</rt></ruby> — Durasi Minggu</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(236,72,153,0.15);color:#ec4899;font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form"><b>いっしゅうかん</b></td><td style="font-weight:700;color:var(--accent2)">6<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">ろくしゅうかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">にしゅうかん</td><td style="font-weight:700;color:var(--accent2)">7<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">ななしゅうかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">さんしゅうかん</td><td style="font-weight:700;color:var(--accent2)">8<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form"><b>はっしゅうかん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">よんしゅうかん</td><td style="font-weight:700;color:var(--accent2)">9<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">きゅうしゅうかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">ごしゅうかん</td><td style="font-weight:700;color:var(--accent2)">10<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form"><b>じゅっしゅうかん</b></td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(236,72,153,0.08);border-left:3px solid #ec4899;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#ec4899">⚠️</b> 1週間=<b>いっしゅうかん</b>(っ!) | 8週間=<b>はっしゅうかん</b> | 10週間=<b>じゅっしゅうかん</b>
        </div>
      </div>
    </div>`;
}




// ── Bulan (月) ──
function buildBulanSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(45,212,191,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(45,212,191,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--teal)">🗓️ 〜<ruby>月<rt>がつ</rt></ruby> — Bulan & Durasi Bulan</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(45,212,191,0.15);color:var(--teal);font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:8px">Angka + がつ. Perhatikan 4月, 7月, 9月.</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th><ruby>月<rt>がつ</rt></ruby></th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th><ruby>月<rt>がつ</rt></ruby></th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">いちがつ</td><td style="font-weight:700;color:var(--accent2)">7<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form"><b>しちがつ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">にがつ</td><td style="font-weight:700;color:var(--accent2)">8<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">はちがつ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">さんがつ</td><td style="font-weight:700;color:var(--accent2)">9<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form"><b>くがつ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form"><b>しがつ</b></td><td style="font-weight:700;color:var(--accent2)">10<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">じゅうがつ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">ごがつ</td><td style="font-weight:700;color:var(--accent2)">11<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">じゅういちがつ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">6<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">ろくがつ</td><td style="font-weight:700;color:var(--accent2)">12<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">じゅうにがつ</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:12px;font-size:0.76rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📋 〜か<ruby>月<rt>げつ</rt></ruby> (Durasi bulan)</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form"><b>いっかげつ</b></td><td style="font-weight:700;color:var(--accent2)">6か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form"><b>ろっかげつ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">にかげつ</td><td style="font-weight:700;color:var(--accent2)">7か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">ななかげつ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">さんかげつ</td><td style="font-weight:700;color:var(--accent2)">8か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form"><b>はっかげつ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">よんかげつ</td><td style="font-weight:700;color:var(--accent2)">9か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">きゅうかげつ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">ごかげつ</td><td style="font-weight:700;color:var(--accent2)">10か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form"><b>じゅっかげつ</b></td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:8px 12px;background:rgba(45,212,191,0.08);border-left:3px solid var(--teal);border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:var(--teal)">⚠️</b> 4月=<b>しがつ</b> | 7月=<b>しちがつ</b> | 9月=<b>くがつ</b> | Durasi: 1=<b>いっかげつ</b>, 6=<b>ろっかげつ</b>, 8=<b>はっかげつ</b>, 10=<b>じゅっかげつ</b>
        </div>
      </div>
    </div>`;
}


// ── Tahun (〜年) ──
function buildTahunSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(234,179,8,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(234,179,8,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#eab308">📅 〜<ruby>年<rt>ねん</rt></ruby> — Tahun & Durasi</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(234,179,8,0.15);color:#eab308;font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📆 Cara baca tahun</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th><ruby>年<rt>ねん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>年<rt>ねん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">2000<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">にせんねん</td><td style="font-weight:700;color:var(--accent2)">2020<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">にせんにじゅうねん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2010<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">にせんじゅうねん</td><td style="font-weight:700;color:var(--accent2)">2024<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">にせんにじゅう<b>よ</b>ねん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">1999<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">せんきゅうひゃくきゅうじゅうきゅうねん</td><td style="font-weight:700;color:var(--accent2)">2025<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">にせんにじゅうごねん</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:12px;font-size:0.76rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📋 〜<ruby>年間<rt>ねんかん</rt></ruby> (Durasi tahun)</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">いちねん</td><td style="font-weight:700;color:var(--accent2)">6<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">ろくねん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">にねん</td><td style="font-weight:700;color:var(--accent2)">7<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form"><b>しちねん</b> / ななねん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">さんねん</td><td style="font-weight:700;color:var(--accent2)">8<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">はちねん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form"><b>よねん</b></td><td style="font-weight:700;color:var(--accent2)">9<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form"><b>くねん</b> / きゅうねん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">ごねん</td><td style="font-weight:700;color:var(--accent2)">10<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">じゅうねん</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:8px 12px;background:rgba(234,179,8,0.08);border-left:3px solid #eab308;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#eab308">⚠️</b> 4年=<b>よねん</b> | 7年=<b>しちねん</b> | 9年=<b>くねん</b> | <ruby>去年<rt>きょねん</rt></ruby>=lalu, <ruby>今年<rt>ことし</rt></ruby>=ini, <ruby>来年<rt>らいねん</rt></ruby>=depan
        </div>
      </div>
    </div>`;
}


// ── Umur (〜歳) ──
function buildUmurSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(244,63,94,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(244,63,94,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#f43f5e">🎂 〜<ruby>歳<rt>さい</rt></ruby> — Umur</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(244,63,94,0.15);color:#f43f5e;font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th><ruby>歳<rt>さい</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>歳<rt>さい</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form"><b>いっさい</b></td><td style="font-weight:700;color:var(--accent2)">7<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">ななさい</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">にさい</td><td style="font-weight:700;color:var(--accent2)">8<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form"><b>はっさい</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">さんさい</td><td style="font-weight:700;color:var(--accent2)">9<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">きゅうさい</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">よんさい</td><td style="font-weight:700;color:var(--accent2)">10<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form"><b>じゅっさい</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">ごさい</td><td style="font-weight:700;color:var(--accent2)">20<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form"><b>はたち</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">6<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">ろくさい</td><td style="font-weight:700;color:var(--accent2)">?<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form"><b>なんさい / おいくつ</b></td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(244,63,94,0.08);border-left:3px solid #f43f5e;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#f43f5e">⚠️</b> 1歳=<b>いっさい</b> | 8歳=<b>はっさい</b> | 10歳=<b>じゅっさい</b> | 20歳=<b>はたち</b>(khusus!) | おいくつ=sopan
        </div>
      </div>
    </div>`;
}


// ── Harga / Uang (〜円) ──
function buildHargaSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(34,197,94,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(34,197,94,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#22c55e">💴 〜<ruby>円<rt>えん</rt></ruby> — Harga / Uang</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(34,197,94,0.15);color:#22c55e;font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:420px">
          <thead><tr><th><ruby>値段<rt>ねだん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>値段<rt>ねだん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">100<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form">ひゃくえん</td><td style="font-weight:700;color:var(--accent2)">1,000<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form">せんえん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">300<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>さんびゃくえん</b></td><td style="font-weight:700;color:var(--accent2)">3,000<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>さんぜんえん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">600<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>ろっぴゃくえん</b></td><td style="font-weight:700;color:var(--accent2)">8,000<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>はっせんえん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">800<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>はっぴゃくえん</b></td><td style="font-weight:700;color:var(--accent2)">10,000<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form">いちまんえん</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:12px;font-size:0.76rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📋 Contoh harga sehari-hari</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th><ruby>物<rt>もの</rt></ruby></th><th><ruby>値段<rt>ねだん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-size:0.74rem">コーヒー</td><td style="font-weight:700;color:var(--accent2)">350<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>さんびゃく</b>ごじゅうえん</td></tr>
            <tr><td style="font-size:0.74rem">おべんとう</td><td style="font-weight:700;color:var(--accent2)">680<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>ろっぴゃく</b>はちじゅうえん</td></tr>
            <tr><td style="font-size:0.74rem"><ruby>電車<rt>でんしゃ</rt></ruby>の<ruby>切符<rt>きっぷ</rt></ruby></td><td style="font-weight:700;color:var(--accent2)">1,800<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form">せん<b>はっぴゃく</b>えん</td></tr>
            <tr><td style="font-size:0.74rem">スマホ</td><td style="font-weight:700;color:var(--accent2)">83,000<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form">はちまん<b>さんぜん</b>えん</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:8px 12px;background:rgba(34,197,94,0.08);border-left:3px solid #22c55e;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#22c55e">💡</b> <b>いくら</b>=berapa? | 300=<b>さんびゃく</b>, 600=<b>ろっぴゃく</b>, 800=<b>はっぴゃく</b> | 3000=<b>さんぜん</b>, 8000=<b>はっせん</b>
        </div>
      </div>
    </div>`;
}




// ── Counter / Kata Bantu Bilangan ── [REDESIGNED: per-counter cards]
function buildCounterSection() {
  const counters = [
    { name:'〜つ', use:'Benda umum', color:'#a78bfa', vals:['ひとつ','ふたつ','みっつ','よっつ','いつつ','むっつ','ななつ','やっつ','ここのつ','とお'], bold:[0,1,2,3,4,5,6,7,8,9] },
    { name:'〜人', ruby:'にん', use:'Orang', color:'#60a5fa', vals:['<b>ひとり</b>','<b>ふたり</b>','さんにん','<b>よにん</b>','ごにん','ろくにん','<b>しちにん</b>','はちにん','<b>くにん</b>','じゅうにん'], bold:[0,1,3,6,8] },
    { name:'〜枚', ruby:'まい', use:'Benda tipis/datar', color:'#34d399', vals:['いちまい','にまい','さんまい','よんまい','ごまい','ろくまい','ななまい','はちまい','きゅうまい','じゅうまい'], bold:[] },
    { name:'〜本', ruby:'ほん', use:'Benda panjang', color:'#fbbf24', vals:['<b>いっぽん</b>','にほん','<b>さんぼん</b>','よんほん','ごほん','<b>ろっぽん</b>','ななほん','<b>はっぽん</b>','きゅうほん','<b>じゅっぽん</b>'], bold:[0,2,5,7,9], rendaku:true },
    { name:'〜匹', ruby:'ひき', use:'Hewan kecil', color:'#fb923c', vals:['<b>いっぴき</b>','にひき','<b>さんびき</b>','よんひき','ごひき','<b>ろっぴき</b>','ななひき','<b>はっぴき</b>','きゅうひき','<b>じゅっぴき</b>'], bold:[0,2,5,7,9], rendaku:true },
    { name:'〜台', ruby:'だい', use:'Mesin/kendaraan', color:'#8b5cf6', vals:['いちだい','にだい','さんだい','よんだい','ごだい','ろくだい','ななだい','はちだい','きゅうだい','じゅうだい'], bold:[] },
    { name:'〜冊', ruby:'さつ', use:'Buku/majalah', color:'#ec4899', vals:['<b>いっさつ</b>','にさつ','さんさつ','よんさつ','ごさつ','ろくさつ','ななさつ','<b>はっさつ</b>','きゅうさつ','<b>じゅっさつ</b>'], bold:[0,7,9], rendaku:true },
    { name:'〜杯', ruby:'はい', use:'Gelas/cangkir', color:'#14b8a6', vals:['<b>いっぱい</b>','にはい','<b>さんばい</b>','よんはい','ごはい','<b>ろっぱい</b>','ななはい','<b>はっぱい</b>','きゅうはい','<b>じゅっぱい</b>'], bold:[0,2,5,7,9], rendaku:true },
    { name:'〜回', ruby:'かい', use:'Frekuensi', color:'#f43f5e', vals:['<b>いっかい</b>','にかい','さんかい','よんかい','ごかい','<b>ろっかい</b>','ななかい','<b>はっかい</b>','きゅうかい','<b>じゅっかい</b>'], bold:[0,5,7,9], rendaku:true },
    { name:'〜階', ruby:'かい', use:'Lantai', color:'#6366f1', vals:['<b>いっかい</b>','にかい','<b>さんがい</b>','よんかい','ごかい','<b>ろっかい</b>','ななかい','<b>はっかい</b>','きゅうかい','<b>じゅっかい</b>'], bold:[0,2,5,7,9], rendaku:true },
  ];

  let cards = '';
  counters.forEach(c => {
    const hasRendaku = c.rendaku ? `<span style="margin-left:6px;font-size:0.58rem;padding:1px 6px;border-radius:8px;background:rgba(251,191,36,0.15);color:var(--amber);font-weight:700">音変化</span>` : '';
    const rubyPart = c.ruby ? `<ruby>${c.name.replace('〜','')}<rt>${c.ruby}</rt></ruby>` : c.name.replace('〜','');
    cards += `
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 12px;margin-bottom:8px;border-left:3px solid ${c.color}">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
          <span style="font-weight:700;color:${c.color};font-size:0.8rem">〜${rubyPart}</span>
          <span style="font-size:0.68rem;color:var(--text2)">${c.use}</span>
          ${hasRendaku}
        </div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;font-size:0.7rem;font-family:'Noto Sans JP',sans-serif">
          ${c.vals.map((v,i) => `<div style="text-align:center;padding:4px 2px;background:var(--surface2);border-radius:6px;line-height:1.4"><span style="font-size:0.58rem;color:var(--text2);display:block">${i+1}</span>${v}</div>`).join('')}
        </div>
      </div>`;
  });

  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(251,191,36,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,191,36,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--amber)">🔢 <ruby>助数詞<rt>じょすうし</rt></ruby> — Kata Bantu Bilangan (Counter)</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(251,191,36,0.15);color:var(--amber);font-weight:700">10 jenis</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:10px;line-height:1.5">
          Counter berbeda tergantung bentuk/jenis benda. Yang <b>tebal</b> = bentuk yang berubah (rendaku).
        </div>
        ${cards}
        <div style="margin-top:10px;padding:8px 12px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:var(--amber)">⚠️ Pola rendaku:</b> 〜ほん→<b>ぽん/ぼん</b> | 〜ひき→<b>ぴき/びき</b> | 〜はい→<b>ぱい/ばい</b> (pada angka 1,3,6,8,10)
        </div>
      </div>
    </div>`;
}




// ── Verba Memberi/Menerima (あげもらいくれ) ──
function buildAgemoSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(192,132,252,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(192,132,252,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#c084fc">🎁 あげます・もらいます・くれます</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:10px;line-height:1.5">
          3 verba memberi/menerima. Dibedakan berdasarkan <b>siapa memberi ke siapa</b>.
        </div>

        <!-- 3 cards for each verb -->
        <div style="display:grid;gap:8px;margin-bottom:12px">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 12px;border-left:3px solid #34d399">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-weight:700;color:#34d399;font-size:0.82rem">あげます</span>
              <span style="font-size:0.68rem;color:var(--text2)">Memberi (ke orang lain)</span>
            </div>
            <div style="font-size:0.72rem;color:var(--text2);line-height:1.5">
              <ruby>私<rt>わたし</rt></ruby>/<ruby>他<rt>ほか</rt></ruby>の<ruby>人<rt>ひと</rt></ruby> → <ruby>他<rt>ほか</rt></ruby>の<ruby>人<rt>ひと</rt></ruby> | 〜<b>に</b> あげます<br>
              <span style="font-family:'Noto Sans JP',sans-serif;color:var(--text)"><ruby>友<rt>とも</rt></ruby>だち<b>に</b> <ruby>花<rt>はな</rt></ruby>を <b>あげます</b></span>
            </div>
          </div>
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 12px;border-left:3px solid #60a5fa">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-weight:700;color:#60a5fa;font-size:0.82rem">もらいます</span>
              <span style="font-size:0.68rem;color:var(--text2)">Menerima (dari orang lain)</span>
            </div>
            <div style="font-size:0.72rem;color:var(--text2);line-height:1.5">
              <ruby>他<rt>ほか</rt></ruby>の<ruby>人<rt>ひと</rt></ruby> → <ruby>私<rt>わたし</rt></ruby> | 〜<b>に/から</b> もらいます<br>
              <span style="font-family:'Noto Sans JP',sans-serif;color:var(--text)"><ruby>先生<rt>せんせい</rt></ruby><b>に</b> <ruby>本<rt>ほん</rt></ruby>を <b>もらいました</b></span>
            </div>
          </div>
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 12px;border-left:3px solid #f87171">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-weight:700;color:#f87171;font-size:0.82rem">くれます</span>
              <span style="font-size:0.68rem;color:var(--text2)">Memberi (ke saya)</span>
            </div>
            <div style="font-size:0.72rem;color:var(--text2);line-height:1.5">
              <ruby>他<rt>ほか</rt></ruby>の<ruby>人<rt>ひと</rt></ruby> → <ruby>私<rt>わたし</rt></ruby> | 〜<b>が</b> くれます<br>
              <span style="font-family:'Noto Sans JP',sans-serif;color:var(--text)"><ruby>友<rt>とも</rt></ruby>だち<b>が</b> ケーキを <b>くれました</b></span>
            </div>
          </div>
        </div>

        <div style="font-size:0.76rem;font-weight:700;color:var(--accent2);margin-bottom:8px">🔧 〜て + あげます/もらいます/くれます</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:420px">
          <thead><tr><th>パターン</th><th>Arti</th><th><ruby>例文<rt>れいぶん</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600;color:#34d399">KKて+あげます</td><td style="font-size:0.72rem">Melakukan utk orang lain</td><td class="rsum-form" style="font-size:0.74rem"><ruby>教<rt>おし</rt></ruby>えて<b>あげます</b></td></tr>
            <tr><td style="font-weight:600;color:#60a5fa">KKて+もらいます</td><td style="font-size:0.72rem">Minta/terima bantuan</td><td class="rsum-form" style="font-size:0.74rem"><ruby>手伝<rt>てつだ</rt></ruby>って<b>もらいます</b></td></tr>
            <tr><td style="font-weight:600;color:#f87171">KKて+くれます</td><td style="font-size:0.72rem">Orang lain melakukan utk saya</td><td class="rsum-form" style="font-size:0.74rem"><ruby>作<rt>つく</rt></ruby>って<b>くれました</b></td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:8px 12px;background:rgba(192,132,252,0.08);border-left:3px solid #c084fc;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#c084fc">💡</b> あげる=barang pergi DARI saya | もらう=saya MENERIMA | くれる=orang lain MEMBERI ke saya (<ruby>感謝<rt>かんしゃ</rt></ruby>)
        </div>
      </div>
    </div>`;
}


// ── Ekspresi Waktu ──
function buildWaktuSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(45,212,191,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(45,212,191,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--teal)">⏰ <ruby>時間<rt>じかん</rt></ruby>の<ruby>表現<rt>ひょうげん</rt></ruby> — Ekspresi Waktu</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(45,212,191,0.15);color:var(--teal);font-weight:700">6 pola</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:480px">
          <thead><tr><th>パターン</th><th><ruby>使<rt>つか</rt></ruby>い<ruby>方<rt>かた</rt></ruby></th><th><ruby>例文<rt>れいぶん</rt></ruby></th><th>Arti</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:#fbbf24">〜<ruby>前<rt>まえ</rt></ruby>に</td><td style="font-size:0.7rem">KK辞書形+まえに</td><td class="rsum-form" style="font-size:0.72rem"><b><ruby>寝<rt>ね</rt></ruby>る</b>まえに、<ruby>歯<rt>は</rt></ruby>を<ruby>磨<rt>みが</rt></ruby>きます</td><td style="font-size:0.7rem;color:var(--text2)">Sebelum~</td></tr>
            <tr><td style="font-weight:700;color:#fb923c">〜た<ruby>後<rt>あと</rt></ruby>で</td><td style="font-size:0.7rem">KKた形+あとで</td><td class="rsum-form" style="font-size:0.72rem"><b><ruby>食<rt>た</rt></ruby>べた</b>あとで、コーヒーを<ruby>飲<rt>の</rt></ruby>みます</td><td style="font-size:0.7rem;color:var(--text2)">Setelah~ (longgar)</td></tr>
            <tr><td style="font-weight:700;color:#34d399">〜てから</td><td style="font-size:0.7rem">KKて形+から</td><td class="rsum-form" style="font-size:0.72rem"><b><ruby>浴<rt>あ</rt></ruby>びてから</b>、<ruby>寝<rt>ね</rt></ruby>ます</td><td style="font-size:0.7rem;color:var(--text2)">Setelah~ (ketat)</td></tr>
            <tr><td style="font-weight:700;color:#60a5fa">〜<ruby>間<rt>あいだ</rt></ruby>に</td><td style="font-size:0.7rem">KK辞書形+あいだに</td><td class="rsum-form" style="font-size:0.72rem"><b><ruby>留守<rt>るす</rt></ruby>のあいだに</b>、<ruby>友<rt>とも</rt></ruby>だちが<ruby>来<rt>き</rt></ruby>ました</td><td style="font-size:0.7rem;color:var(--text2)">Selama~</td></tr>
            <tr><td style="font-weight:700;color:#a78bfa">〜ながら</td><td style="font-size:0.7rem">KKます形+ながら</td><td class="rsum-form" style="font-size:0.72rem"><ruby>音楽<rt>おんがく</rt></ruby>を<b><ruby>聞<rt>き</rt></ruby>きながら</b>、<ruby>勉強<rt>べんきょう</rt></ruby>します</td><td style="font-size:0.7rem;color:var(--text2)">Sambil~</td></tr>
            <tr><td style="font-weight:700;color:#f472b6">〜<ruby>時<rt>とき</rt></ruby></td><td style="font-size:0.7rem">KK/KS/KB+とき</td><td class="rsum-form" style="font-size:0.72rem"><b><ruby>若<rt>わか</rt></ruby>い</b>とき、よく<ruby>運動<rt>うんどう</rt></ruby>しました</td><td style="font-size:0.7rem;color:var(--text2)">Waktu~</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:8px 12px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:var(--amber)">⚠️ あとで vs てから:</b> あとで=jeda boleh lama | てから=langsung setelahnya
        </div>
        <div style="margin-top:6px;padding:8px 12px;background:rgba(45,212,191,0.08);border-left:3px solid var(--teal);border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:var(--teal)">💡 Kapan pakai に?</b> Waktu spesifik (7時<b>に</b>, 月曜日<b>に</b>) = pakai. Relatif (きょう, あした, まいにち) = tidak pakai.
        </div>
      </div>
    </div>`;
}


// ── Kata Penghubung / Konjungsi ──
function buildKonjungsiSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(96,165,250,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(96,165,250,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#60a5fa">🔗 <ruby>接続詞<rt>せつぞくし</rt></ruby> — Kata Penghubung</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(96,165,250,0.15);color:#60a5fa;font-weight:700">14 kata</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:10px;line-height:1.5">
          <ruby>接続詞<rt>せつぞくし</rt></ruby> = kata penghubung antar kalimat. N5〜N4.
        </div>

        <!-- Kategori: Tambahan/Urutan -->
        <div style="font-size:0.68rem;font-weight:700;color:var(--green);letter-spacing:0.06em;padding:4px 8px;background:rgba(52,211,153,0.06);border-radius:6px;margin-bottom:6px">
          <ruby>追加<rt>ついか</rt></ruby>・<ruby>順番<rt>じゅんばん</rt></ruby> (TAMBAHAN / URUTAN)
        </div>
        <div style="display:grid;gap:4px;margin-bottom:12px">
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">そして</span>
            <span style="color:var(--text2);font-size:0.7rem">Dan kemudian; lalu</span>
            <span style="font-size:0.62rem;color:var(--text2)">N5</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">それから</span>
            <span style="color:var(--text2);font-size:0.7rem">Setelah itu; kemudian</span>
            <span style="font-size:0.62rem;color:var(--text2)">N5</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">それに</span>
            <span style="color:var(--text2);font-size:0.7rem">Selain itu; lagipula</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
        </div>

        <!-- Kategori: Pertentangan -->
        <div style="font-size:0.68rem;font-weight:700;color:var(--red);letter-spacing:0.06em;padding:4px 8px;background:rgba(248,113,113,0.06);border-radius:6px;margin-bottom:6px">
          <ruby>対比<rt>たいひ</rt></ruby>・<ruby>逆接<rt>ぎゃくせつ</rt></ruby> (PERTENTANGAN)
        </div>
        <div style="display:grid;gap:4px;margin-bottom:12px">
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">でも</span>
            <span style="color:var(--text2);font-size:0.7rem">Tapi; namun (santai)</span>
            <span style="font-size:0.62rem;color:var(--text2)">N5</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">しかし</span>
            <span style="color:var(--text2);font-size:0.7rem">Akan tetapi (formal)</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">けれども</span>
            <span style="color:var(--text2);font-size:0.7rem">Meskipun (agak formal)</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
        </div>

        <!-- Kategori: Alasan -->
        <div style="font-size:0.68rem;font-weight:700;color:var(--amber);letter-spacing:0.06em;padding:4px 8px;background:rgba(251,191,36,0.06);border-radius:6px;margin-bottom:6px">
          <ruby>理由<rt>りゆう</rt></ruby>・<ruby>原因<rt>げんいん</rt></ruby> (ALASAN / SEBAB)
        </div>
        <div style="display:grid;gap:4px;margin-bottom:12px">
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">だから</span>
            <span style="color:var(--text2);font-size:0.7rem">Oleh karena itu; makanya</span>
            <span style="font-size:0.62rem;color:var(--text2)">N5</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">ですから</span>
            <span style="color:var(--text2);font-size:0.7rem">Oleh karena itu (sopan)</span>
            <span style="font-size:0.62rem;color:var(--text2)">N5</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">それで</span>
            <span style="color:var(--text2);font-size:0.7rem">Lalu (karena itu); jadi</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">すると</span>
            <span style="color:var(--text2);font-size:0.7rem">Lalu (tiba-tiba); maka</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">そうすると</span>
            <span style="color:var(--text2);font-size:0.7rem">Kalau begitu; maka</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
        </div>

        <!-- Kategori: Ganti Topik -->
        <div style="font-size:0.68rem;font-weight:700;color:var(--accent);letter-spacing:0.06em;padding:4px 8px;background:rgba(124,106,247,0.06);border-radius:6px;margin-bottom:6px">
          <ruby>話題転換<rt>わだいてんかん</rt></ruby>・その<ruby>他<rt>た</rt></ruby> (GANTI TOPIK / LAINNYA)
        </div>
        <div style="display:grid;gap:4px;margin-bottom:12px">
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">ところで</span>
            <span style="color:var(--text2);font-size:0.7rem">Ngomong-ngomong</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">では/じゃ</span>
            <span style="color:var(--text2);font-size:0.7rem">Kalau begitu; nah</span>
            <span style="font-size:0.62rem;color:var(--text2)">N5</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">つまり</span>
            <span style="color:var(--text2);font-size:0.7rem">Dengan kata lain; intinya</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">たとえば</span>
            <span style="color:var(--text2);font-size:0.7rem">Misalnya; contohnya</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
        </div>

        <div style="padding:8px 12px;background:rgba(96,165,250,0.08);border-left:3px solid #60a5fa;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#60a5fa">💡 Tips:</b> でも=santai vs しかし=formal | だから=santai vs ですから=sopan | すると=tak terduga vs そうすると=logis
        </div>
      </div>
    </div>`;
}
