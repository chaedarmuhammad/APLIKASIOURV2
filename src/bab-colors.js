// ========== DYNAMIC BAB COLORS ==========
// Generates per-chapter accent color CSS dynamically instead of 
// hardcoding 78+ repetitive rules in style.css.
// This reduces CSS file size and makes adding new chapters trivial.

'use strict';

(function injectBabColors() {
  // Color palette for bab 1-78 (gradient pairs: [start, end])
  var BAB_COLORS = [
    ['#7c6af7','#c084fc'], // 1
    ['#38bdf8','#22d3ee'], // 2
    ['#34d399','#4ade80'], // 3
    ['#fbbf24','#f59e0b'], // 4
    ['#f472b6','#fb7185'], // 5
    ['#60a5fa','#818cf8'], // 6
    ['#2dd4bf','#34d399'], // 7
    ['#f87171','#fb923c'], // 8
    ['#a78bfa','#c084fc'], // 9
    ['#4ade80','#34d399'], // 10
    ['#fb923c','#fbbf24'], // 11
    ['#818cf8','#a78bfa'], // 12
    ['#f9a8d4','#f472b6'], // 13
    ['#22d3ee','#38bdf8'], // 14
    ['#34d399','#2dd4bf'], // 15
    ['#f59e0b','#fbbf24'], // 16
    ['#c084fc','#a78bfa'], // 17
    ['#fb7185','#f472b6'], // 18
    ['#818cf8','#60a5fa'], // 19
    ['#4ade80','#22d3ee'], // 20
    ['#f97316','#fb923c'], // 21
    ['#22d3ee','#38bdf8'], // 22
    ['#34d399','#4ade80'], // 23
    ['#a78bfa','#c084fc'], // 24
    ['#f472b6','#fb7185'], // 25
    ['#fbbf24','#f59e0b'], // 26
    ['#60a5fa','#818cf8'], // 27
    ['#2dd4bf','#34d399'], // 28
    ['#f87171','#fb923c'], // 29
    ['#c084fc','#a78bfa'], // 30
    ['#38bdf8','#22d3ee'], // 31
    ['#4ade80','#34d399'], // 32
    ['#fb923c','#fbbf24'], // 33
    ['#818cf8','#c084fc'], // 34
    ['#f9a8d4','#f472b6'], // 35
    ['#38bdf8','#818cf8'], // 36
    ['#34d399','#2dd4bf'], // 37
    ['#f97316','#fbbf24'], // 38
    ['#c084fc','#f472b6'], // 39
    ['#4ade80','#34d399'], // 40
    ['#7c6af7','#38bdf8'], // 41
    ['#34d399','#22d3ee'], // 42
    ['#f472b6','#c084fc'], // 43
    ['#fbbf24','#f97316'], // 44
    ['#60a5fa','#34d399'], // 45
    ['#f87171','#fb923c'], // 46
    ['#a78bfa','#818cf8'], // 47
    ['#2dd4bf','#22d3ee'], // 48
    ['#4ade80','#86efac'], // 49
    ['#fbbf24','#a78bfa'], // 50
    ['#f87171','#fbbf24'], // 51
    ['#60a5fa','#34d399'], // 52
    ['#a78bfa','#f472b6'], // 53
    ['#2dd4bf','#60a5fa'], // 54
    ['#4ade80','#fbbf24'], // 55
    ['#f472b6','#a78bfa'], // 56
    ['#fbbf24','#f87171'], // 57
    ['#60a5fa','#2dd4bf'], // 58
    ['#a78bfa','#60a5fa'], // 59
    ['#34d399','#a78bfa'], // 60
    ['#f87171','#fbbf24'], // 61
    ['#60a5fa','#c084fc'], // 62
    ['#34d399','#60a5fa'], // 63
    ['#fbbf24','#f97316'], // 64
    ['#c084fc','#f472b6'], // 65
    ['#38bdf8','#818cf8'], // 66
    ['#34d399','#fbbf24'], // 67
    ['#f87171','#c084fc'], // 68
    ['#fbbf24','#34d399'], // 69
    ['#60a5fa','#f472b6'], // 70
    ['#f87171','#fbbf24'], // 71
    ['#818cf8','#34d399'], // 72
    ['#fbbf24','#60a5fa'], // 73
    ['#c084fc','#f87171'], // 74
    ['#34d399','#818cf8'], // 75
    ['#f59e0b','#ef4444'], // 76
    ['#6366f1','#06b6d4'], // 77
    ['#10b981','#a78bfa']  // 78
  ];

  var css = '';
  BAB_COLORS.forEach(function(pair, i) {
    var num = i + 1;
    css += '.bab-' + num + '::before{background:linear-gradient(90deg,' + pair[0] + ',' + pair[1] + ')}';
    css += '.bab-card:hover.bab-' + num + '{border-color:' + pair[0] + '}';
  });

  // Inject as a style element
  var style = document.createElement('style');
  style.id = 'bab-colors-dynamic';
  style.textContent = css;
  document.head.appendChild(style);
})();
