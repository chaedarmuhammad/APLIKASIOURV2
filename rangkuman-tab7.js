// ========== RANGKUMAN TAB 7: Lainnya ==========
function renderRsumTab7(lvLabel, lvColor) {
  const counterSection = buildCounterSection();
  const numberSection = buildNumberSection();
  const jamSection = buildJamSection();
  const menitSection = buildMenitSection();
  const hariSection = buildHariSection();
  const tanggalSection = buildTanggalSection();
  const bulanSection = buildBulanSection();
  const agemoSection = buildAgemoSection();
  const waktuSection = buildWaktuSection();
  const konjungsiSection = buildKonjungsiSection();

  document.getElementById('rsum-tab-7').innerHTML = `<div style="padding:16px 14px 20px">
    <div class="rsum-section-title">📚 Lainnya — Rangkuman Tambahan</div>
    <div style="font-size:0.78rem;color:var(--text2);margin-bottom:16px;padding:8px 12px;background:var(--surface2);border-radius:8px;line-height:1.6">
      Kumpulan materi penting yang sering membingungkan: <b><ruby>数<rt>かず</rt></ruby>・<ruby>時間<rt>じかん</rt></ruby>・<ruby>助数詞<rt>じょすうし</rt></ruby></b>, <b>Verba Memberi/Menerima</b>, <b>Ekspresi Waktu</b>, dan <b><ruby>接続詞<rt>せつぞくし</rt></ruby></b>.
    </div>
    ${numberSection}
    ${jamSection}
    ${menitSection}
    ${hariSection}
    ${tanggalSection}
    ${bulanSection}
    ${counterSection}
    ${agemoSection}
    ${waktuSection}
    ${konjungsiSection}
  </div>`;
}



// ── Angka / Bilangan Dasar ──
function buildNumberSection() {
  return `
    <div class="konj-accordion open" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(251,191,36,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,191,36,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--amber)">🔢 <ruby>数字<rt>すうじ</rt></ruby> — Angka / Bilangan</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;color:var(--text2);margin-bottom:10px;line-height:1.6">
          Bilangan dasar dalam <ruby>日本語<rt>にほんご</rt></ruby>. Angka 4, 7, dan 9 memiliki dua cara baca.
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:500px">
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

        <div style="margin-top:12px;font-size:0.78rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📊 <ruby>大<rt>おお</rt></ruby>きい <ruby>数<rt>かず</rt></ruby> (Bilangan Besar)</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:500px">
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

        <div style="margin-top:10px;padding:10px 14px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:var(--amber)">⚠️ <ruby>音<rt>おん</rt></ruby>の <ruby>変化<rt>へんか</rt></ruby> (Perubahan bunyi):</b><br>
          • <ruby>百<rt>ひゃく</rt></ruby>: 300=<b>さんびゃく</b>, 600=<b>ろっぴゃく</b>, 800=<b>はっぴゃく</b><br>
          • <ruby>千<rt>せん</rt></ruby>: 3000=<b>さんぜん</b>, 8000=<b>はっせん</b><br>
          • 4=<b>よん</b>(umum) / し(dalam counter tertentu)<br>
          • 7=<b>なな</b>(umum) / しち(dalam beberapa counter)<br>
          • 9=<b>きゅう</b>(umum) / く(dalam beberapa counter)
        </div>
      </div>
    </div>`;
}



// ── Jam (時) ──
function buildJamSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(96,165,250,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(96,165,250,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#60a5fa">🕐 〜<ruby>時<rt>じ</rt></ruby> — Jam</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;color:var(--text2);margin-bottom:10px;line-height:1.6">
          Cara menyatakan jam dalam <ruby>日本語<rt>にほんご</rt></ruby>. Perhatikan <ruby>音<rt>おん</rt></ruby>の<ruby>変化<rt>へんか</rt></ruby> pada 4<ruby>時<rt>じ</rt></ruby>, 7<ruby>時<rt>じ</rt></ruby>, dan 9<ruby>時<rt>じ</rt></ruby>.
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:450px">
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

        <div style="margin-top:10px;padding:10px 14px;background:rgba(96,165,250,0.08);border-left:3px solid #60a5fa;border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:#60a5fa">⚠️ Yang harus dihafal:</b><br>
          • 4<ruby>時<rt>じ</rt></ruby> = <b>よじ</b> (bukan よんじ ✗)<br>
          • 7<ruby>時<rt>じ</rt></ruby> = <b>しちじ</b> (bukan ななじ ✗)<br>
          • 9<ruby>時<rt>じ</rt></ruby> = <b>くじ</b> (bukan きゅうじ ✗)<br>
          • <ruby>午前<rt>ごぜん</rt></ruby> = AM, <ruby>午後<rt>ごご</rt></ruby> = PM → <ruby>午前<rt>ごぜん</rt></ruby>8<ruby>時<rt>じ</rt></ruby> = jam 8 pagi<br>
          • なんじ = jam berapa?
        </div>
      </div>
    </div>`;
}



// ── Menit (分) ──
function buildMenitSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(52,211,153,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(52,211,153,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--green)">⏱️ 〜<ruby>分<rt>ふん</rt></ruby> — Menit</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;color:var(--text2);margin-bottom:10px;line-height:1.6">
          Perhatikan perubahan bunyi: <ruby>分<rt>ふん</rt></ruby> bisa menjadi <b>ぷん</b> pada angka tertentu.
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:500px">
          <thead><tr><th><ruby>分<rt>ふん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>分<rt>ふん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>いっぷん</b></td><td style="font-weight:700;color:var(--accent2)">6<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>ろっぷん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">にふん</td><td style="font-weight:700;color:var(--accent2)">7<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">ななふん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>さんぷん</b></td><td style="font-weight:700;color:var(--accent2)">8<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>はっぷん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">よんぷん</td><td style="font-weight:700;color:var(--accent2)">9<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">きゅうふん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">ごふん</td><td style="font-weight:700;color:var(--accent2)">10<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>じゅっぷん</b></td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:12px;font-size:0.78rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📋 Menit lainnya</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:500px">
          <thead><tr><th><ruby>分<rt>ふん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>分<rt>ふん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">15<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">じゅうごふん</td><td style="font-weight:700;color:var(--accent2)">40<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form">よんじゅっぷん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">20<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form">にじゅっぷん</td><td style="font-weight:700;color:var(--accent2)">45<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">よんじゅうごふん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">25<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">にじゅうごふん</td><td style="font-weight:700;color:var(--accent2)">50<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form">ごじゅっぷん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">30<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form">さんじゅっぷん / <b>はん</b></td><td style="font-weight:700;color:var(--accent2)">?<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form"><b>なんぷん</b></td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:10px 14px;background:rgba(52,211,153,0.08);border-left:3px solid var(--green);border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:var(--green)">💡 Aturan ぷん vs ふん:</b><br>
          • <b>ぷん</b>: 1, 3, 4, 6, 8, 10 → いっ<b>ぷん</b>、さん<b>ぷん</b>、よん<b>ぷん</b>、ろっ<b>ぷん</b>、はっ<b>ぷん</b>、じゅっ<b>ぷん</b><br>
          • <b>ふん</b>: 2, 5, 7, 9 → に<b>ふん</b>、ご<b>ふん</b>、なな<b>ふん</b>、きゅう<b>ふん</b><br>
          • 30<ruby>分<rt>ぷん</rt></ruby> = <b>はん</b> (<ruby>半<rt>はん</rt></ruby>) juga bisa dipakai → 3<ruby>時<rt>じ</rt></ruby><ruby>半<rt>はん</rt></ruby> = jam 3:30<br>
          • なんぷん = berapa menit?
        </div>
      </div>
    </div>`;
}



// ── Hari (曜日) ──
function buildHariSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(192,132,252,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(192,132,252,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#c084fc">📅 <ruby>曜日<rt>ようび</rt></ruby> — Hari</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;color:var(--text2);margin-bottom:10px;line-height:1.6">
          <ruby>一週間<rt>いっしゅうかん</rt></ruby>の<ruby>曜日<rt>ようび</rt></ruby> (Hari dalam seminggu). Setiap hari dinamai berdasarkan unsur alam.
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:500px">
          <thead><tr><th><ruby>曜日<rt>ようび</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th>Arti</th><th><ruby>由来<rt>ゆらい</rt></ruby> (Asal)</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:#f87171"><ruby>日曜日<rt>にちようび</rt></ruby></td><td class="rsum-form">にちようび</td><td style="font-size:0.74rem">Minggu</td><td style="font-size:0.72rem;color:var(--text2)"><ruby>日<rt>ひ</rt></ruby> = Matahari</td></tr>
            <tr><td style="font-weight:700;color:#fbbf24"><ruby>月曜日<rt>げつようび</rt></ruby></td><td class="rsum-form">げつようび</td><td style="font-size:0.74rem">Senin</td><td style="font-size:0.72rem;color:var(--text2)"><ruby>月<rt>つき</rt></ruby> = Bulan</td></tr>
            <tr><td style="font-weight:700;color:#f87171"><ruby>火曜日<rt>かようび</rt></ruby></td><td class="rsum-form">かようび</td><td style="font-size:0.74rem">Selasa</td><td style="font-size:0.72rem;color:var(--text2)"><ruby>火<rt>ひ</rt></ruby> = Api</td></tr>
            <tr><td style="font-weight:700;color:#34d399"><ruby>水曜日<rt>すいようび</rt></ruby></td><td class="rsum-form">すいようび</td><td style="font-size:0.74rem">Rabu</td><td style="font-size:0.72rem;color:var(--text2)"><ruby>水<rt>みず</rt></ruby> = Air</td></tr>
            <tr><td style="font-weight:700;color:#60a5fa"><ruby>木曜日<rt>もくようび</rt></ruby></td><td class="rsum-form">もくようび</td><td style="font-size:0.74rem">Kamis</td><td style="font-size:0.72rem;color:var(--text2)"><ruby>木<rt>き</rt></ruby> = Pohon</td></tr>
            <tr><td style="font-weight:700;color:#c084fc"><ruby>金曜日<rt>きんようび</rt></ruby></td><td class="rsum-form">きんようび</td><td style="font-size:0.74rem">Jumat</td><td style="font-size:0.72rem;color:var(--text2)"><ruby>金<rt>かね</rt></ruby> = Emas</td></tr>
            <tr><td style="font-weight:700;color:#60a5fa"><ruby>土曜日<rt>どようび</rt></ruby></td><td class="rsum-form">どようび</td><td style="font-size:0.74rem">Sabtu</td><td style="font-size:0.72rem;color:var(--text2)"><ruby>土<rt>つち</rt></ruby> = Tanah</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:10px 14px;background:rgba(192,132,252,0.08);border-left:3px solid #c084fc;border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:#c084fc">💡 Tips:</b><br>
          • <ruby>何曜日<rt>なんようび</rt></ruby> = hari apa?<br>
          • Partikel <b>に</b> dipakai: <ruby>月曜日<rt>げつようび</rt></ruby><b>に</b> <ruby>会<rt>あ</rt></ruby>いましょう (Ayo bertemu hari Senin)<br>
          • <ruby>毎日<rt>まいにち</rt></ruby> = setiap hari, <ruby>毎週<rt>まいしゅう</rt></ruby> = setiap minggu
        </div>
      </div>
    </div>`;
}



// ── Tanggal (日) ──
function buildTanggalSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(251,146,60,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,146,60,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#fb923c">📆 〜<ruby>日<rt>にち</rt></ruby> — Tanggal</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;color:var(--text2);margin-bottom:10px;line-height:1.6">
          Tanggal 1–10 menggunakan cara baca <ruby>和語<rt>わご</rt></ruby> (asli Jepang) yang sangat <ruby>不規則<rt>ふきそく</rt></ruby> (tidak beraturan). Tanggal 11 ke atas umumnya pakai cara baca <ruby>漢語<rt>かんご</rt></ruby>.
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:600px">
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

        <div style="margin-top:10px;padding:10px 14px;background:rgba(251,146,60,0.08);border-left:3px solid #fb923c;border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:#fb923c">⚠️ Yang harus dihafal (<ruby>特別<rt>とくべつ</rt></ruby>な<ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby>):</b><br>
          • 1<ruby>日<rt>にち</rt></ruby>〜10<ruby>日<rt>にち</rt></ruby> = cara baca <ruby>和語<rt>わご</rt></ruby> (semua <ruby>不規則<rt>ふきそく</rt></ruby>!)<br>
          • 14<ruby>日<rt>にち</rt></ruby> = <b>じゅうよっか</b>, 20<ruby>日<rt>にち</rt></ruby> = <b>はつか</b>, 24<ruby>日<rt>にち</rt></ruby> = <b>にじゅうよっか</b><br>
          • <ruby>何日<rt>なんにち</rt></ruby> = tanggal berapa? / berapa hari?
        </div>
      </div>
    </div>`;
}



// ── Bulan (月) ──
function buildBulanSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(45,212,191,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(45,212,191,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--teal)">🗓️ 〜<ruby>月<rt>がつ</rt></ruby> — Bulan</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;color:var(--text2);margin-bottom:10px;line-height:1.6">
          Nama <ruby>月<rt>つき</rt></ruby> (<ruby>月<rt>がつ</rt></ruby>) cukup <ruby>規則的<rt>きそくてき</rt></ruby> (beraturan): angka + がつ. Perhatikan <ruby>音<rt>おん</rt></ruby>の<ruby>変化<rt>へんか</rt></ruby> pada 4, 7, 9.
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:450px">
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

        <div style="margin-top:12px;font-size:0.78rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📋 〜か<ruby>月<rt>げつ</rt></ruby> (Durasi bulan)</div>
        <div style="font-size:0.76rem;color:var(--text2);margin-bottom:10px;line-height:1.6">
          <ruby>注意<rt>ちゅうい</rt></ruby>: 〜<ruby>月<rt>がつ</rt></ruby> = nama bulan, 〜か<ruby>月<rt>げつ</rt></ruby> = durasi (berapa bulan).
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:450px">
          <thead><tr><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form"><b>いっかげつ</b></td><td style="font-weight:700;color:var(--accent2)">6か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form"><b>ろっかげつ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">にかげつ</td><td style="font-weight:700;color:var(--accent2)">7か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">ななかげつ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">さんかげつ</td><td style="font-weight:700;color:var(--accent2)">8か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form"><b>はっかげつ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">よんかげつ</td><td style="font-weight:700;color:var(--accent2)">9か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">きゅうかげつ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">ごかげつ</td><td style="font-weight:700;color:var(--accent2)">10か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form"><b>じゅっかげつ</b></td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:10px 14px;background:rgba(45,212,191,0.08);border-left:3px solid var(--teal);border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:var(--teal)">⚠️ Yang harus dihafal:</b><br>
          • 4<ruby>月<rt>がつ</rt></ruby> = <b>しがつ</b> (bukan よんがつ ✗)<br>
          • 7<ruby>月<rt>がつ</rt></ruby> = <b>しちがつ</b> (bukan なながつ ✗)<br>
          • 9<ruby>月<rt>がつ</rt></ruby> = <b>くがつ</b> (bukan きゅうがつ ✗)<br>
          • <ruby>何月<rt>なんがつ</rt></ruby> = bulan apa?<br>
          • <b>〜か<ruby>月<rt>げつ</rt></ruby></b>: 1=<b>いっかげつ</b>, 6=<b>ろっかげつ</b>, 8=<b>はっかげつ</b>, 10=<b>じゅっかげつ</b><br>
          • <ruby>何<rt>なん</rt></ruby>か<ruby>月<rt>げつ</rt></ruby> = berapa bulan?
        </div>
      </div>
    </div>`;
}



// ── Counter / Kata Bantu Bilangan ──
function buildCounterSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(251,191,36,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,191,36,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--amber)">🔢 <ruby>助数詞<rt>じょすうし</rt></ruby> — Kata Bantu Bilangan (Counter)</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;color:var(--text2);margin-bottom:10px;line-height:1.6">
          Dalam <ruby>日本語<rt>にほんご</rt></ruby>、<ruby>物<rt>もの</rt></ruby>を<ruby>数<rt>かぞ</rt></ruby>えるとき、<ruby>形<rt>かたち</rt></ruby>や<ruby>種類<rt>しゅるい</rt></ruby>によって<ruby>助数詞<rt>じょすうし</rt></ruby>が<ruby>違<rt>ちが</rt></ruby>います。<br>
          (Menghitung benda menggunakan counter yang berbeda tergantung bentuk/jenis benda.)
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:700px">
          <thead><tr><th>Counter</th><th>Untuk</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">〜つ</td><td style="font-size:0.7rem">Benda umum</td><td class="rsum-form">ひとつ</td><td class="rsum-form">ふたつ</td><td class="rsum-form">みっつ</td><td class="rsum-form">よっつ</td><td class="rsum-form">いつつ</td><td class="rsum-form">むっつ</td><td class="rsum-form">ななつ</td><td class="rsum-form">やっつ</td><td class="rsum-form">ここのつ</td><td class="rsum-form">とお</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>人<rt>にん</rt></ruby></td><td style="font-size:0.7rem">Orang</td><td class="rsum-form"><b>ひとり</b></td><td class="rsum-form"><b>ふたり</b></td><td class="rsum-form">さんにん</td><td class="rsum-form"><b>よにん</b></td><td class="rsum-form">ごにん</td><td class="rsum-form">ろくにん</td><td class="rsum-form"><b>しちにん</b></td><td class="rsum-form">はちにん</td><td class="rsum-form"><b>くにん</b></td><td class="rsum-form">じゅうにん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>枚<rt>まい</rt></ruby></td><td style="font-size:0.7rem"><ruby>薄<rt>うす</rt></ruby>い<ruby>物<rt>もの</rt></ruby> (tipis/datar)</td><td class="rsum-form">いちまい</td><td class="rsum-form">にまい</td><td class="rsum-form">さんまい</td><td class="rsum-form">よんまい</td><td class="rsum-form">ごまい</td><td class="rsum-form">ろくまい</td><td class="rsum-form">ななまい</td><td class="rsum-form">はちまい</td><td class="rsum-form">きゅうまい</td><td class="rsum-form">じゅうまい</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>本<rt>ほん</rt></ruby></td><td style="font-size:0.7rem"><ruby>長<rt>なが</rt></ruby>い<ruby>物<rt>もの</rt></ruby> (panjang)</td><td class="rsum-form"><b>いっぽん</b></td><td class="rsum-form">にほん</td><td class="rsum-form"><b>さんぼん</b></td><td class="rsum-form">よんほん</td><td class="rsum-form">ごほん</td><td class="rsum-form"><b>ろっぽん</b></td><td class="rsum-form">ななほん</td><td class="rsum-form"><b>はっぽん</b></td><td class="rsum-form">きゅうほん</td><td class="rsum-form"><b>じゅっぽん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>台<rt>だい</rt></ruby></td><td style="font-size:0.7rem"><ruby>機械<rt>きかい</rt></ruby>/<ruby>車<rt>くるま</rt></ruby> (mesin)</td><td class="rsum-form">いちだい</td><td class="rsum-form">にだい</td><td class="rsum-form">さんだい</td><td class="rsum-form">よんだい</td><td class="rsum-form">ごだい</td><td class="rsum-form">ろくだい</td><td class="rsum-form">ななだい</td><td class="rsum-form">はちだい</td><td class="rsum-form">きゅうだい</td><td class="rsum-form">じゅうだい</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>冊<rt>さつ</rt></ruby></td><td style="font-size:0.7rem"><ruby>本<rt>ほん</rt></ruby>/<ruby>雑誌<rt>ざっし</rt></ruby> (buku)</td><td class="rsum-form"><b>いっさつ</b></td><td class="rsum-form">にさつ</td><td class="rsum-form">さんさつ</td><td class="rsum-form">よんさつ</td><td class="rsum-form">ごさつ</td><td class="rsum-form">ろくさつ</td><td class="rsum-form">ななさつ</td><td class="rsum-form"><b>はっさつ</b></td><td class="rsum-form">きゅうさつ</td><td class="rsum-form"><b>じゅっさつ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>杯<rt>はい</rt></ruby></td><td style="font-size:0.7rem">コップ (gelas)</td><td class="rsum-form"><b>いっぱい</b></td><td class="rsum-form">にはい</td><td class="rsum-form"><b>さんばい</b></td><td class="rsum-form">よんはい</td><td class="rsum-form">ごはい</td><td class="rsum-form"><b>ろっぱい</b></td><td class="rsum-form">ななはい</td><td class="rsum-form"><b>はっぱい</b></td><td class="rsum-form">きゅうはい</td><td class="rsum-form"><b>じゅっぱい</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>回<rt>かい</rt></ruby></td><td style="font-size:0.7rem"><ruby>回数<rt>かいすう</rt></ruby> (frekuensi)</td><td class="rsum-form"><b>いっかい</b></td><td class="rsum-form">にかい</td><td class="rsum-form">さんかい</td><td class="rsum-form">よんかい</td><td class="rsum-form">ごかい</td><td class="rsum-form"><b>ろっかい</b></td><td class="rsum-form">ななかい</td><td class="rsum-form"><b>はっかい</b></td><td class="rsum-form">きゅうかい</td><td class="rsum-form"><b>じゅっかい</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">〜<ruby>階<rt>かい</rt></ruby></td><td style="font-size:0.7rem"><ruby>階<rt>かい</rt></ruby> (lantai)</td><td class="rsum-form"><b>いっかい</b></td><td class="rsum-form">にかい</td><td class="rsum-form"><b>さんがい</b></td><td class="rsum-form">よんかい</td><td class="rsum-form">ごかい</td><td class="rsum-form"><b>ろっかい</b></td><td class="rsum-form">ななかい</td><td class="rsum-form"><b>はっかい</b></td><td class="rsum-form">きゅうかい</td><td class="rsum-form"><b>じゅっかい</b></td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:10px 14px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:var(--amber)">⚠️ <ruby>変化<rt>へんか</rt></ruby> (Perubahan bunyi / rendaku):</b><br>
          • 〜ほん → <b>いっぽん, さんぼん, ろっぽん, はっぽん, じゅっぽん</b><br>
          • 〜はい → <b>いっぱい, さんばい, ろっぱい, はっぱい, じゅっぱい</b><br>
          • 〜かい/さつ → <b>いっかい/いっさつ, ろっかい, はっかい/はっさつ, じゅっかい/じゅっさつ</b><br>
          • Yang dicetak <b>tebal</b> = <ruby>形<rt>かたち</rt></ruby>が<ruby>変<rt>か</rt></ruby>わる (bentuk yang berubah)!
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
          <ruby>日本語<rt>にほんご</rt></ruby>には「あげる・もらう・くれる」の3つの<ruby>動詞<rt>どうし</rt></ruby>があります。<b><ruby>誰<rt>だれ</rt></ruby>が<ruby>誰<rt>だれ</rt></ruby>に</b>あげるかによって<ruby>使<rt>つか</rt></ruby>い<ruby>分<rt>わ</rt></ruby>けます。
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:550px">
          <thead><tr><th><ruby>動詞<rt>どうし</rt></ruby></th><th><ruby>方向<rt>ほうこう</rt></ruby></th><th>Arti</th><th><ruby>助詞<rt>じょし</rt></ruby></th><th><ruby>例文<rt>れいぶん</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:#34d399">あげます</td><td style="font-size:0.72rem"><ruby>私<rt>わたし</rt></ruby>/<ruby>他<rt>ほか</rt></ruby>の<ruby>人<rt>ひと</rt></ruby> → <ruby>他<rt>ほか</rt></ruby>の<ruby>人<rt>ひと</rt></ruby><br>(dari dekat ke jauh)</td><td style="font-size:0.74rem">Memberi (ke orang lain)</td><td class="rsum-form">〜に あげます</td><td class="rsum-form" style="font-size:0.76rem"><ruby>友<rt>とも</rt></ruby>だち<b>に</b> <ruby>花<rt>はな</rt></ruby>を <b>あげます</b></td></tr>
            <tr><td style="font-weight:700;color:#60a5fa">もらいます</td><td style="font-size:0.72rem"><ruby>他<rt>ほか</rt></ruby>の<ruby>人<rt>ひと</rt></ruby> → <ruby>私<rt>わたし</rt></ruby>/<ruby>近<rt>ちか</rt></ruby>い<ruby>人<rt>ひと</rt></ruby><br>(menerima dari)</td><td style="font-size:0.74rem">Menerima (dari orang lain)</td><td class="rsum-form">〜に/から もらいます</td><td class="rsum-form" style="font-size:0.76rem"><ruby>先生<rt>せんせい</rt></ruby><b>に</b> <ruby>本<rt>ほん</rt></ruby>を <b>もらいました</b></td></tr>
            <tr><td style="font-weight:700;color:#f87171">くれます</td><td style="font-size:0.72rem"><ruby>他<rt>ほか</rt></ruby>の<ruby>人<rt>ひと</rt></ruby> → <ruby>私<rt>わたし</rt></ruby><br>(orang lain memberi KE saya)</td><td style="font-size:0.74rem">Memberi (ke saya)</td><td class="rsum-form">〜が くれます</td><td class="rsum-form" style="font-size:0.76rem"><ruby>友<rt>とも</rt></ruby>だち<b>が</b> ケーキを <b>くれました</b></td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:14px;font-size:0.78rem;font-weight:700;color:var(--accent2);margin-bottom:8px">🔧 <ruby>形<rt>かたち</rt></ruby>: 〜て + あげます/もらいます/くれます</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:520px">
          <thead><tr><th>パターン</th><th>Arti</th><th><ruby>例文<rt>れいぶん</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600;color:#34d399">KKて + あげます</td><td style="font-size:0.74rem">Melakukan sesuatu UNTUK orang lain</td><td class="rsum-form" style="font-size:0.76rem"><ruby>友<rt>とも</rt></ruby>だちに <ruby>日本語<rt>にほんご</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えて<b>あげます</b></td></tr>
            <tr><td style="font-weight:600;color:#60a5fa">KKて + もらいます</td><td style="font-size:0.74rem">Meminta/menerima bantuan dari orang lain</td><td class="rsum-form" style="font-size:0.76rem"><ruby>友<rt>とも</rt></ruby>だちに <ruby>手伝<rt>てつだ</rt></ruby>って<b>もらいます</b></td></tr>
            <tr><td style="font-weight:600;color:#f87171">KKて + くれます</td><td style="font-size:0.74rem">Orang lain melakukan sesuatu UNTUK saya</td><td class="rsum-form" style="font-size:0.76rem"><ruby>母<rt>はは</rt></ruby>が おべんとうを <ruby>作<rt>つく</rt></ruby>って<b>くれました</b></td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:10px 14px;background:rgba(192,132,252,0.08);border-left:3px solid #c084fc;border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:#c084fc">💡 <ruby>覚<rt>おぼ</rt></ruby>え<ruby>方<rt>かた</rt></ruby> (Cara Mengingat):</b><br>
          • <b>あげます</b> = "<ruby>上<rt>あ</rt></ruby>げる" → barang NAIK/pergi DARI saya ke orang lain<br>
          • <b>もらいます</b> = saya MENERIMA → fokus pada penerima (<ruby>私<rt>わたし</rt></ruby>/<ruby>近<rt>ちか</rt></ruby>い<ruby>人<rt>ひと</rt></ruby>)<br>
          • <b>くれます</b> = orang lain MEMBERI ke saya → fokus pada si pemberi (<ruby>感謝<rt>かんしゃ</rt></ruby>の<ruby>気持<rt>きも</rt></ruby>ち)<br>
          • ❌ <ruby>目上<rt>めうえ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>にあげます → さしあげます (lebih sopan)
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
        <span style="font-size:0.82rem;font-weight:700;color:var(--teal)">⏰ <ruby>時間<rt>じかん</rt></ruby>の<ruby>表現<rt>ひょうげん</rt></ruby> — Ekspresi Waktu</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:560px">
          <thead><tr><th>パターン</th><th><ruby>使<rt>つか</rt></ruby>い<ruby>方<rt>かた</rt></ruby></th><th><ruby>例文<rt>れいぶん</rt></ruby></th><th>Arti</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:#fbbf24">〜<ruby>前<rt>まえ</rt></ruby>に</td><td style="font-size:0.72rem">KK<ruby>辞書形<rt>じしょけい</rt></ruby> + まえに<br>KB + の + まえに</td><td class="rsum-form" style="font-size:0.76rem"><b><ruby>寝<rt>ね</rt></ruby>る</b> まえに、<ruby>歯<rt>は</rt></ruby>を みがきます</td><td style="font-size:0.72rem;color:var(--text2)">Sebelum tidur, sikat gigi</td></tr>
            <tr><td style="font-weight:700;color:#fb923c">〜た <ruby>後<rt>あと</rt></ruby>で</td><td style="font-size:0.72rem">KKた<ruby>形<rt>けい</rt></ruby> + あとで<br>KB + の + あとで</td><td class="rsum-form" style="font-size:0.76rem"><b><ruby>食<rt>た</rt></ruby>べた</b> あとで、コーヒーを <ruby>飲<rt>の</rt></ruby>みます</td><td style="font-size:0.72rem;color:var(--text2)">Setelah makan, minum kopi</td></tr>
            <tr><td style="font-weight:700;color:#34d399">〜てから</td><td style="font-size:0.72rem">KKて<ruby>形<rt>けい</rt></ruby> + から</td><td class="rsum-form" style="font-size:0.76rem">シャワーを <b><ruby>浴<rt>あ</rt></ruby>びてから</b>、<ruby>寝<rt>ね</rt></ruby>ます</td><td style="font-size:0.72rem;color:var(--text2)">Setelah mandi, tidur (urutan ketat)</td></tr>
            <tr><td style="font-weight:700;color:#60a5fa">〜<ruby>間<rt>あいだ</rt></ruby>に</td><td style="font-size:0.72rem">KK<ruby>辞書形<rt>じしょけい</rt></ruby>/ている + あいだに<br>KB + の + あいだに</td><td class="rsum-form" style="font-size:0.76rem"><b><ruby>留守<rt>るす</rt></ruby>の あいだに</b>、<ruby>友<rt>とも</rt></ruby>だちが <ruby>来<rt>き</rt></ruby>ました</td><td style="font-size:0.72rem;color:var(--text2)">Selama tidak di rumah, teman datang</td></tr>
            <tr><td style="font-weight:700;color:#a78bfa">〜ながら</td><td style="font-size:0.72rem">KKます<ruby>形<rt>けい</rt></ruby>(<ruby>除<rt>のぞ</rt></ruby>く ます) + ながら</td><td class="rsum-form" style="font-size:0.76rem"><ruby>音楽<rt>おんがく</rt></ruby>を <b><ruby>聞<rt>き</rt></ruby>きながら</b>、<ruby>勉強<rt>べんきょう</rt></ruby>します</td><td style="font-size:0.72rem;color:var(--text2)">Belajar sambil dengar musik</td></tr>
            <tr><td style="font-weight:700;color:#f472b6">〜<ruby>時<rt>とき</rt></ruby></td><td style="font-size:0.72rem">KK<ruby>辞書形<rt>じしょけい</rt></ruby>/た<ruby>形<rt>けい</rt></ruby> + とき<br>KSい + とき<br>KSな + な + とき<br>KB + の + とき</td><td class="rsum-form" style="font-size:0.76rem"><b><ruby>若<rt>わか</rt></ruby>い</b> とき、よく <ruby>運動<rt>うんどう</rt></ruby>しました</td><td style="font-size:0.72rem;color:var(--text2)">Waktu muda, sering olahraga</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:12px;padding:10px 14px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:var(--amber)">⚠️ あとで vs てから の<ruby>違<rt>ちが</rt></ruby>い:</b><br>
          • <b>あとで</b> = setelah ~ (bisa ada jeda <ruby>時間<rt>じかん</rt></ruby>, urutan longgar)<br>
          • <b>てから</b> = setelah ~ baru ... (urutan ketat, langsung setelahnya)<br>
          • <ruby>例<rt>れい</rt></ruby>: <span style="font-family:'Noto Sans JP',sans-serif">ごはんを <ruby>食<rt>た</rt></ruby>べた あとで、<ruby>散歩<rt>さんぽ</rt></ruby>します</span> (makan, lalu kapan-kapan jalan-jalan)<br>
          • <span style="font-family:'Noto Sans JP',sans-serif">ごはんを <ruby>食<rt>た</rt></ruby>べてから、すぐ <ruby>散歩<rt>さんぽ</rt></ruby>します</span> (makan, langsung jalan-jalan)
        </div>

        <div style="margin-top:10px;padding:10px 14px;background:rgba(45,212,191,0.08);border-left:3px solid var(--teal);border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:var(--teal)">💡 <ruby>助詞<rt>じょし</rt></ruby>「に」と<ruby>時間<rt>じかん</rt></ruby> — kapan pakai に?</b><br>
          • <b>Pakai に</b>: <ruby>時間<rt>じかん</rt></ruby>が<ruby>具体的<rt>ぐたいてき</rt></ruby> → 7<ruby>時<rt>じ</rt></ruby><b>に</b>、<ruby>月曜日<rt>げつようび</rt></ruby><b>に</b>、3<ruby>月<rt>がつ</rt></ruby><b>に</b>、2024<ruby>年<rt>ねん</rt></ruby><b>に</b><br>
          • <b>Tidak pakai に</b>: <ruby>相対的<rt>そうたいてき</rt></ruby>な<ruby>時間<rt>じかん</rt></ruby> → きょう、あした、きのう、まいにち、いつも、せんしゅう、らいねん
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
        <span style="font-size:0.82rem;font-weight:700;color:#60a5fa">🔗 <ruby>接続詞<rt>せつぞくし</rt></ruby> — Kata Penghubung (Konjungsi)</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;color:var(--text2);margin-bottom:10px;line-height:1.6">
          <ruby>接続詞<rt>せつぞくし</rt></ruby>は<ruby>文<rt>ぶん</rt></ruby>と<ruby>文<rt>ぶん</rt></ruby>をつなぐ<ruby>言葉<rt>ことば</rt></ruby>です。N5〜N4でよく<ruby>出<rt>で</rt></ruby>るものをまとめました。
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:550px">
          <thead><tr><th><ruby>言葉<rt>ことば</rt></ruby></th><th>Romaji</th><th>Arti</th><th><ruby>例文<rt>れいぶん</rt></ruby></th><th><ruby>課<rt>か</rt></ruby></th></tr></thead>
          <tbody>
            <tr style="background:rgba(52,211,153,0.04)"><td colspan="5" style="font-weight:700;font-size:0.7rem;color:var(--green);letter-spacing:0.06em;padding:6px 10px"><ruby>追加<rt>ついか</rt></ruby>・<ruby>順番<rt>じゅんばん</rt></ruby> (TAMBAHAN / URUTAN)</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">そして</td><td style="font-size:0.7rem">soshite</td><td style="font-size:0.74rem">Dan kemudian; lalu</td><td class="rsum-form" style="font-size:0.74rem"><ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>を しました。<b>そして</b> <ruby>映画<rt>えいが</rt></ruby>を <ruby>見<rt>み</rt></ruby>ました。</td><td style="font-size:0.68rem;color:var(--text2)">N5</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">それから</td><td style="font-size:0.7rem">sorekara</td><td style="font-size:0.74rem">Setelah itu; kemudian</td><td class="rsum-form" style="font-size:0.74rem">ごはんを <ruby>食<rt>た</rt></ruby>べます。<b>それから</b> コーヒーを <ruby>飲<rt>の</rt></ruby>みます。</td><td style="font-size:0.68rem;color:var(--text2)">N5</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">それに</td><td style="font-size:0.7rem">soreni</td><td style="font-size:0.74rem">Selain itu; lagipula</td><td class="rsum-form" style="font-size:0.74rem"><ruby>安<rt>やす</rt></ruby>いです。<b>それに</b> おいしいです。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>

            <tr style="background:rgba(248,113,113,0.04)"><td colspan="5" style="font-weight:700;font-size:0.7rem;color:var(--red);letter-spacing:0.06em;padding:6px 10px"><ruby>対比<rt>たいひ</rt></ruby>・<ruby>逆接<rt>ぎゃくせつ</rt></ruby> (PERTENTANGAN / KONTRAS)</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">でも</td><td style="font-size:0.7rem">demo</td><td style="font-size:0.74rem">Tapi; namun (santai)</td><td class="rsum-form" style="font-size:0.74rem"><ruby>行<rt>い</rt></ruby>きたいです。<b>でも</b> <ruby>時間<rt>じかん</rt></ruby>が ありません。</td><td style="font-size:0.68rem;color:var(--text2)">N5</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">しかし</td><td style="font-size:0.7rem">shikashi</td><td style="font-size:0.74rem">Akan tetapi (formal)</td><td class="rsum-form" style="font-size:0.74rem"><ruby>便利<rt>べんり</rt></ruby>です。<b>しかし</b> <ruby>高<rt>たか</rt></ruby>いです。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">けれども</td><td style="font-size:0.7rem">keredomo</td><td style="font-size:0.74rem">Meskipun (agak formal)</td><td class="rsum-form" style="font-size:0.74rem"><ruby>高<rt>たか</rt></ruby>いです。<b>けれども</b> <ruby>買<rt>か</rt></ruby>います。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>

            <tr style="background:rgba(251,191,36,0.04)"><td colspan="5" style="font-weight:700;font-size:0.7rem;color:var(--amber);letter-spacing:0.06em;padding:6px 10px"><ruby>理由<rt>りゆう</rt></ruby>・<ruby>原因<rt>げんいん</rt></ruby> (ALASAN / SEBAB)</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">だから</td><td style="font-size:0.7rem">dakara</td><td style="font-size:0.74rem">Oleh karena itu; makanya</td><td class="rsum-form" style="font-size:0.74rem"><ruby>雨<rt>あめ</rt></ruby>が <ruby>降<rt>ふ</rt></ruby>っています。<b>だから</b> <ruby>傘<rt>かさ</rt></ruby>を <ruby>持<rt>も</rt></ruby>っていきます。</td><td style="font-size:0.68rem;color:var(--text2)">N5</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">ですから</td><td style="font-size:0.7rem">desukara</td><td style="font-size:0.74rem">Oleh karena itu (sopan)</td><td class="rsum-form" style="font-size:0.74rem"><ruby>病気<rt>びょうき</rt></ruby>です。<b>ですから</b> <ruby>休<rt>やす</rt></ruby>みます。</td><td style="font-size:0.68rem;color:var(--text2)">N5</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">それで</td><td style="font-size:0.7rem">sorede</td><td style="font-size:0.74rem">Lalu (karena itu); jadi</td><td class="rsum-form" style="font-size:0.74rem"><ruby>電車<rt>でんしゃ</rt></ruby>が <ruby>止<rt>と</rt></ruby>まりました。<b>それで</b> <ruby>遅<rt>おく</rt></ruby>れました。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>

            <tr style="background:rgba(124,106,247,0.04)"><td colspan="5" style="font-weight:700;font-size:0.7rem;color:var(--accent);letter-spacing:0.06em;padding:6px 10px"><ruby>話題転換<rt>わだいてんかん</rt></ruby>・その<ruby>他<rt>た</rt></ruby> (GANTI TOPIK / LAINNYA)</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">ところで</td><td style="font-size:0.7rem">tokorode</td><td style="font-size:0.74rem">Ngomong-ngomong</td><td class="rsum-form" style="font-size:0.74rem"><b>ところで</b>、<ruby>明日<rt>あした</rt></ruby>の パーティー、<ruby>行<rt>い</rt></ruby>きますか。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">では/じゃ</td><td style="font-size:0.7rem">dewa/ja</td><td style="font-size:0.74rem">Kalau begitu; nah</td><td class="rsum-form" style="font-size:0.74rem"><b>じゃ</b>、また <ruby>明日<rt>あした</rt></ruby>。</td><td style="font-size:0.68rem;color:var(--text2)">N5</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">つまり</td><td style="font-size:0.7rem">tsumari</td><td style="font-size:0.74rem">Dengan kata lain; jadi intinya</td><td class="rsum-form" style="font-size:0.74rem"><b>つまり</b>、やめたい ということですか。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>
            <tr><td style="font-weight:600;font-family:'Noto Sans JP',sans-serif">たとえば</td><td style="font-size:0.7rem">tatoeba</td><td style="font-size:0.74rem">Misalnya; contohnya</td><td class="rsum-form" style="font-size:0.74rem"><b>たとえば</b>、すしや ラーメンが <ruby>好<rt>す</rt></ruby>きです。</td><td style="font-size:0.68rem;color:var(--text2)">N4</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:10px 14px;background:rgba(96,165,250,0.08);border-left:3px solid #60a5fa;border-radius:0 8px 8px 0;font-size:0.74rem;line-height:1.7">
          <b style="color:#60a5fa">💡 <ruby>使<rt>つか</rt></ruby>い<ruby>方<rt>かた</rt></ruby>のコツ (Tips Penggunaan):</b><br>
          • <b>でも vs しかし</b>: でも=<ruby>会話<rt>かいわ</rt></ruby>(santai), しかし=<ruby>文章<rt>ぶんしょう</rt></ruby>(formal)<br>
          • <b>だから vs ですから</b>: だから=santai, ですから=<ruby>丁寧<rt>ていねい</rt></ruby>(sopan)<br>
          • <b>そして vs それから</b>: そして=dan (paralel), それから=lalu (<ruby>時間<rt>じかん</rt></ruby>の<ruby>順番<rt>じゅんばん</rt></ruby>)<br>
          • <ruby>接続詞<rt>せつぞくし</rt></ruby>は<b>2つ<ruby>目<rt>め</rt></ruby>の<ruby>文<rt>ぶん</rt></ruby>の<ruby>最初<rt>さいしょ</rt></ruby></b>に<ruby>置<rt>お</rt></ruby>きます!
        </div>
      </div>
    </div>`;
}
