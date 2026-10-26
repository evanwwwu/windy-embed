// 從 Google Maps 連結或「緯度, 經度」文字解析出座標（純前端，不展開短網址）
(function (root) {
  function valid(lat, lon) {
    return isFinite(lat) && isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180;
  }

  function pair(a, b) {
    var lat = parseFloat(a), lon = parseFloat(b);
    return valid(lat, lon) ? { lat: lat, lon: lon } : null;
  }

  var NUM = '(-?\\d+(?:\\.\\d+)?)';
  var SEP = '\\s*(?:,|%2C)\\s*';

  // 回傳 { lat, lon, zoom? } 或 { error: 'empty' | 'short_link' | 'out_of_range' | 'not_found' }
  function parseLocation(input) {
    var s = String(input || '').trim();
    if (!s) return { error: 'empty' };

    if (/^https?:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps)\//i.test(s)) {
      return { error: 'short_link' };
    }

    try { s = decodeURIComponent(s); } catch (e) { /* 保留原字串 */ }

    // 1. 純座標「36.55, 138.5」
    var m = s.match(new RegExp('^' + NUM + SEP + NUM + '$'));
    if (m) return pair(m[1], m[2]) || { error: 'out_of_range' };

    var zoomMatch = s.match(/@-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?,(\d+(?:\.\d+)?)z/);
    var zoom = zoomMatch ? Math.round(parseFloat(zoomMatch[1])) : undefined;

    // 2. 地標實際位置 !3d<lat>!4d<lon>（比 @ 的畫面中心準）
    m = s.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
    // 3. 查詢參數 q= / query= / ll= / center= / destination=
    if (!m) m = s.match(new RegExp('[?&](?:q|query|ll|center|destination)=' + NUM + SEP + NUM));
    // 4. /place/<lat>,<lon> 或 /search/<lat>,<lon>
    if (!m) m = s.match(new RegExp('/(?:place|search)/' + NUM + SEP + NUM));
    // 5. 畫面中心 @<lat>,<lon>
    if (!m) m = s.match(new RegExp('@' + NUM + ',' + NUM));

    if (m) {
      var p = pair(m[1], m[2]);
      if (!p) return { error: 'out_of_range' };
      if (zoom) p.zoom = zoom;
      return p;
    }
    return { error: 'not_found' };
  }

  var api = { parseLocation: parseLocation };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.GMap = api;
})(this);
