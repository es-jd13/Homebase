/* Homebase — plain ES5 so it runs on iPad mini 3 (iOS 12 Safari). */
(function () {
  'use strict';
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('hb_' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('hb_' + k, JSON.stringify(v)); } catch (e) {} }
  };
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var DAYS_L = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ---------- icons ---------- */
  var S = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    music: '<svg viewBox="0 0 24 24" ' + S + '><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3" fill="currentColor"/><circle cx="18" cy="16" r="3" fill="currentColor"/></svg>',
    house: '<svg viewBox="0 0 24 24" ' + S + '><path d="M3 11l9-8 9 8"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/></svg>',
    flower: '<svg viewBox="0 0 24 24"><g fill-opacity=".8"><circle cx="12" cy="6.5" r="4.4" fill="#ff9f0a"/><circle cx="17.5" cy="12" r="4.4" fill="#30d158"/><circle cx="12" cy="17.5" r="4.4" fill="#0a84ff"/><circle cx="6.5" cy="12" r="4.4" fill="#ff375f"/></g></svg>',
    bowl: '<svg viewBox="0 0 24 24" ' + S + '><path d="M3 12h18a9 9 0 0 1-18 0z"/><path d="M8 8c0-1.5 1.5-1.5 1.5-3M12 8c0-1.5 1.5-1.5 1.5-3M16 8c0-1.5 1.5-1.5 1.5-3"/></svg>',
    list: '<svg viewBox="0 0 24 24" ' + S + '><circle cx="4.5" cy="6" r="1.5"/><circle cx="4.5" cy="12" r="1.5"/><circle cx="4.5" cy="18" r="1.5"/><path d="M10 6h11M10 12h11M10 18h11"/></svg>',
    sliders: '<svg viewBox="0 0 24 24" ' + S + '><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2.6" fill="currentColor"/><circle cx="15" cy="17" r="2.6" fill="currentColor"/></svg>',
    x: '<svg viewBox="0 0 24 24" ' + S + ' stroke-width="2.6"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M8 5.5v13l11-6.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="#fff"><rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M11 7v10L3.5 12zM20 7v10l-7.5-5z"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M13 7v10l7.5-5zM4 7v10l7.5-5z"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" ' + S + '><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
    fan: '<svg viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="12" r="1.8"/><path d="M12 10.2C10 6 10.5 3 12.5 3S15 6 12 10.2zM13.8 12c4.2-2 7.2-1.5 7.2.5S18 15 13.8 12zM12 13.8C14 18 13.5 21 11.5 21S9 18 12 13.8zM10.2 12C6 14 3 13.5 3 11.5S6 9 10.2 12z"/></svg>',
    lock: '<svg viewBox="0 0 24 24" ' + S + '><rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    unlock: '<svg viewBox="0 0 24 24" ' + S + '><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.6-1.7"/></svg>',
    intercom: '<svg viewBox="0 0 24 24" ' + S + '><path d="M3 10v4M7 7v10M11 4v16M15 7v10M19 9v6M22 11v2"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" ' + S + '><path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 9.5a4.2 4.2 0 0 1 .5 8.5z" fill="currentColor" fill-opacity=".35"/></svg>',
    sun: '<svg viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>'
  };
  function icon(n) { return ICONS[n] || ''; }
  function fillIcons(root) { $$('[data-i]', root).forEach(function (el) { el.innerHTML = icon(el.getAttribute('data-i')); }); }

  /* ---------- settings ---------- */
  var cfg = { color: store.get('color', 'starlight'), bright: store.get('bright', 100), h24: store.get('h24', false), lock: store.get('lock', true) };
  function applyColor() {
    $('#frame').setAttribute('data-color', cfg.color);
    document.body.setAttribute('data-color', cfg.color);
  }
  function applyBright() { $('#dim').style.opacity = String((100 - cfg.bright) / 100 * 0.8); }

  /* ---------- navigation ---------- */
  var current = 'home';
  function go(name) {
    $$('.view').forEach(function (v) { v.classList.remove('active'); });
    $('#v-' + name).classList.add('active');
    current = name;
    closeSheets();
    if (name === 'photos') startShow(); else stopShow();
    if (name === 'cal') drawCal();
    if (name === 'weather') loadWeather();
    if (name === 'music') pollNow();
  }
  function closeSheets() { $$('.sheet').forEach(function (s) { s.classList.remove('open'); }); }
  var toastT;
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }
  $$('[data-go]').forEach(function (b) { b.addEventListener('click', function () { go(b.getAttribute('data-go')); }); });
  $('#pill').addEventListener('click', function () { go('home'); });

  /* ---------- time ---------- */
  function fmtTime(d) {
    var h = d.getHours(), ap = '';
    if (!cfg.h24) { ap = h >= 12 ? 'PM' : 'AM'; h = h % 12; if (h === 0) h = 12; } else h = pad(h);
    return { t: h + ':' + pad(d.getMinutes()), ap: ap };
  }
  function clockSVG() {
    var s = '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#fff"/>', i, a, x, y;
    for (i = 1; i <= 12; i++) { a = i * Math.PI / 6; x = 50 + 38 * Math.sin(a); y = 50 - 38 * Math.cos(a) + 3.4; s += '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" font-size="10" text-anchor="middle" fill="#6b5fd6" font-family="-apple-system,Helvetica,Arial">' + i + '</text>'; }
    s += '<line class="hh" x1="50" y1="50" x2="50" y2="28" stroke="#111" stroke-width="3.4" stroke-linecap="round"/><line class="mh" x1="50" y1="50" x2="50" y2="17" stroke="#111" stroke-width="2.6" stroke-linecap="round"/><line class="sh" x1="50" y1="58" x2="50" y2="14" stroke="#6b5fd6" stroke-width="1" stroke-linecap="round"/><circle cx="50" cy="50" r="2.4" fill="#6b5fd6"/></svg>';
    return s;
  }
  function tickClock(d) {
    var s = d.getSeconds(), m = d.getMinutes() + s / 60, h = d.getHours() % 12 + m / 60;
    $$('.aclock').forEach(function (c) {
      var hh = $('.hh', c), mh = $('.mh', c), sh = $('.sh', c);
      if (!hh) return;
      hh.setAttribute('transform', 'rotate(' + h * 30 + ' 50 50)');
      mh.setAttribute('transform', 'rotate(' + m * 6 + ' 50 50)');
      sh.setAttribute('transform', 'rotate(' + s * 6 + ' 50 50)');
    });
  }
  function tick() {
    var d = new Date(), f = fmtTime(d), ds = DAYS[d.getDay()] + ', ' + MON[d.getMonth()].slice(0, 3) + ' ' + d.getDate();
    $('#h-date').textContent = DAYS_L[d.getDay()].toUpperCase() + ' • ' + MON[d.getMonth()].slice(0, 3).toUpperCase() + ' ' + d.getDate();
    $('#h-time').textContent = f.t + (f.ap ? ' ' + f.ap : '');
    $('#c-time').textContent = f.t; $('#c-ap').textContent = f.ap;
    $('#c-date').textContent = DAYS_L[d.getDay()] + ', ' + MON[d.getMonth()] + ' ' + d.getDate();
    $('#lk-time').textContent = f.t.replace(/^0/, ''); $('#lk-date').textContent = DAYS_L[d.getDay()] + ', ' + MON[d.getMonth()] + ' ' + d.getDate();
    tickClock(d);
    musicTick(); timerTick();
    if (cfg.lock && !locked && Date.now() - lastTouch > 120000) lockNow();
  }

  /* ---------- lock screen ---------- */
  var locked = true, lastTouch = Date.now();
  function lockNow() { locked = true; closeAll(); go('home'); $('#lock').classList.remove('open'); drawLockNP(); }
  function unlock() { locked = false; lastTouch = Date.now(); $('#lock').classList.add('open'); }
  function closeAll() { $('#siri').classList.remove('open'); closeSheets(); $('#g-sheet').classList.remove('open'); setEditing(false); }
  function drawLockNP() {
    var el = $('#lk-np');
    if (np && np.playing) { el.className = 'lk-np glass show'; el.innerHTML = '<div class="th" style="background-image:' + (np.art ? 'url(\'' + np.art + '\')' : 'none') + '"></div><div><b>' + esc(np.title) + '</b><span>' + esc(np.artist) + '</span></div>'; }
    else el.className = 'lk-np glass';
  }
  (function () {
    var y0 = null, lk = $('#lock');
    lk.addEventListener('touchstart', function (e) { y0 = e.touches[0].clientY; lk.classList.add('drag'); }, false);
    lk.addEventListener('touchmove', function (e) { if (y0 === null) return; var dy = Math.min(0, e.touches[0].clientY - y0); lk.style.webkitTransform = lk.style.transform = 'translateY(' + dy + 'px)'; }, false);
    lk.addEventListener('touchend', function (e) {
      var dy = e.changedTouches[0].clientY - y0; lk.classList.remove('drag'); lk.style.webkitTransform = lk.style.transform = ''; y0 = null;
      if (dy < -70 || Math.abs(dy) < 8) unlock();
    }, false);
    lk.addEventListener('click', function () { if (!('ontouchstart' in window)) unlock(); });
  })();
  ['touchstart', 'mousedown', 'keydown'].forEach(function (ev) { document.addEventListener(ev, function () { lastTouch = Date.now(); }, true); });
  $('#lockBtn').addEventListener('click', lockNow);

  /* ---------- Now Playing ----------
     A web page cannot read iOS's system Now Playing, so Homebase reads it from the music service itself:
     Spotify (Web API, PKCE login, no server) or Last.fm (works with Apple Music/Spotify/etc. scrobbling). */
  var editing = false, playing = false, np = null, polling = false, SP_SCOPE = 'user-read-currently-playing user-read-playback-state user-modify-playback-state';
  function qs(o) { return Object.keys(o).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(o[k]); }).join('&'); }
  function redirectUri() { return location.origin + location.pathname; }
  function b64url(buf) { var s = '', b = new Uint8Array(buf), i; for (i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function rnd(n) { var a = new Uint8Array(n), cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~', o = '', i; crypto.getRandomValues(a); for (i = 0; i < n; i++) o += cs.charAt(a[i] % cs.length); return o; }
  function source() { return store.get('src', ''); }

  function spConnect() {
    var id = $('#sp-id').value.trim();
    if (!id) { toast('Enter your Spotify Client ID'); return; }
    if (!(window.crypto && crypto.subtle && window.TextEncoder)) { toast('This browser can’t do secure login'); return; }
    var v = rnd(64); store.set('sp_id', id); store.set('sp_v', v);
    crypto.subtle.digest('SHA-256', new TextEncoder().encode(v)).then(function (h) {
      location.href = 'https://accounts.spotify.com/authorize?' + qs({ client_id: id, response_type: 'code', redirect_uri: redirectUri(), code_challenge_method: 'S256', code_challenge: b64url(h), scope: SP_SCOPE });
    });
  }
  function tokenReq(p) {
    return fetch('https://accounts.spotify.com/api/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: qs(p) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j.access_token) throw j; var old = store.get('sp_tok', {}); store.set('sp_tok', { at: j.access_token, rt: j.refresh_token || old.rt, exp: Date.now() + j.expires_in * 1000 }); });
  }
  function spToken() {
    var t = store.get('sp_tok', null);
    if (!t) return Promise.reject(new Error('no token'));
    if (Date.now() < t.exp - 30000) return Promise.resolve(t.at);
    return tokenReq({ grant_type: 'refresh_token', refresh_token: t.rt, client_id: store.get('sp_id', '') }).then(function () { return store.get('sp_tok').at; });
  }
  function handleSpotifyReturn() {
    var m = /[?&]code=([^&]+)/.exec(location.search);
    if (!m) return;
    var code = decodeURIComponent(m[1]);
    try { history.replaceState(null, '', redirectUri()); } catch (e) {}
    tokenReq({ grant_type: 'authorization_code', code: code, redirect_uri: redirectUri(), client_id: store.get('sp_id', ''), code_verifier: store.get('sp_v', '') })
      .then(function () { store.set('src', 'spotify'); toast('Spotify connected'); go('music'); })
      .catch(function () { toast('Spotify login failed'); });
  }
  function spApi(method, path) {
    return spToken().then(function (at) { return fetch('https://api.spotify.com/v1/me/player/' + path, { method: method, headers: { Authorization: 'Bearer ' + at } }); });
  }
  function pollSpotify() {
    return spApi('GET', 'currently-playing?additional_types=episode').then(function (r) {
      if (r.status === 204) return null;
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    }).then(function (j) {
      if (!j || !j.item) return null;
      var it = j.item, imgs = (it.album && it.album.images) || it.images || [];
      return { title: it.name, artist: it.artists ? it.artists.map(function (x) { return x.name; }).join(', ') : (it.show ? it.show.name : ''), art: imgs.length ? imgs[0].url : '', dur: it.duration_ms / 1000, pos: j.progress_ms / 1000, playing: j.is_playing, at: Date.now(), ctl: true, src: 'Spotify' };
    });
  }
  function pollLastfm() {
    var u = store.get('lf_u', ''), k = store.get('lf_k', '');
    return fetch('https://ws.audioscrobbler.com/2.0/?' + qs({ method: 'user.getrecenttracks', user: u, api_key: k, format: 'json', limit: 1 }))
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var t = j.recenttracks && j.recenttracks.track; if (t && t.length === undefined) t = [t]; t = t && t[0];
        if (!t || !t['@attr'] || t['@attr'].nowplaying !== 'true') return null;
        var img = (t.image || []).filter(function (i) { return i['#text'] && i['#text'].indexOf('2a96cbd8b46e442fc41c2b86b821562f') < 0; }).pop();
        return { title: t.name, artist: t.artist['#text'] || t.artist.name, art: img ? img['#text'] : '', dur: 0, pos: 0, playing: true, at: Date.now(), ctl: false, src: 'Last.fm' };
      });
  }
  function pollNow() {
    var src = source(); if (!src) { setNP(null); return; }
    if (polling) return; polling = true;
    (src === 'spotify' ? pollSpotify() : pollLastfm()).then(function (r) { polling = false; setNP(r); })
      .catch(function () { polling = false; toast('Couldn’t reach ' + (src === 'spotify' ? 'Spotify' : 'Last.fm')); });
  }
  function setNP(r) { np = r; playing = !!(r && r.playing); drawMusic(); }
  function fmt(s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + pad(s % 60); }
  function drawMusic() {
    var src = source(), art = $('#m-art');
    $('#m-src-name').textContent = src === 'spotify' ? 'Spotify' : src === 'lastfm' ? 'Last.fm' : 'Set up';
    if (np) {
      $('#m-title').textContent = np.title; $('#m-artist').textContent = np.artist;
      art.style.backgroundImage = np.art ? 'url("' + np.art + '")' : 'none'; art.className = 'art' + (np.art ? '' : ' empty');
      $('#m-bg').style.backgroundImage = np.art ? 'url("' + np.art + '")' : 'none';
      $('#m-prog').className = 'prog' + (np.dur ? '' : ' hide'); $('#m-ctrls').className = 'ctrls' + (np.ctl ? '' : ' hide');
      $('#m-play').innerHTML = icon(np.playing ? 'pause' : 'play');
    } else {
      $('#m-title').textContent = src ? 'Nothing playing' : 'No music source';
      $('#m-artist').textContent = src ? 'Play something in ' + (src === 'spotify' ? 'Spotify' : 'your music app') : 'Tap “Set up” to connect Spotify or Last.fm';
      art.style.backgroundImage = 'none'; art.className = 'art empty'; $('#m-bg').style.backgroundImage = 'none';
      $('#m-prog').className = 'prog hide'; $('#m-ctrls').className = 'ctrls hide';
    }
    document.body.className = (playing ? 'playing' : '') + (editing ? ' editing' : '');
    drawLockNP();
    musicTick();
  }
  function musicTick() {
    if (!np || !np.dur) return;
    var p = np.pos + (np.playing ? (Date.now() - np.at) / 1000 : 0); if (p > np.dur) p = np.dur;
    $('#m-fill').style.width = (p / np.dur * 100) + '%'; $('#m-pos').textContent = fmt(p); $('#m-rem').textContent = '-' + fmt(np.dur - p);
  }
  function ctl(m, path, after) { spApi(m, path).then(function (r) { if (r.status === 403) toast('Playback control needs Spotify Premium'); setTimeout(pollNow, after || 600); }).catch(function () { toast('Control failed'); }); }
  $('#m-play').addEventListener('click', function () { if (np) { np.playing = !np.playing; np.pos += 0; playing = np.playing; drawMusic(); ctl('PUT', np.playing ? 'play' : 'pause'); } });
  $('#m-prev').addEventListener('click', function () { ctl('POST', 'previous', 900); });
  $('#m-next').addEventListener('click', function () { ctl('POST', 'next', 900); });

  function openSourceSheet() {
    var sh = $('#m-sheet'), src = source();
    sh.innerHTML = '<button class="close">Done</button><div class="h">Now Playing source</div>' +
      '<p>iOS doesn’t let web pages read the system Now Playing, so Homebase reads it from your music service.</p>' +
      '<h4>Spotify' + (src === 'spotify' ? ' • connected' : '') + '</h4>' +
      '<p>Create a free app at developer.spotify.com/dashboard, add this Redirect URI, then paste its Client ID:</p><p><code>' + redirectUri() + '</code></p>' +
      '<input id="sp-id" placeholder="Spotify Client ID" autocapitalize="off" autocorrect="off" value="' + esc(store.get('sp_id', '')) + '"><button class="btn go" id="sp-go">Connect Spotify</button>' +
      '<h4>Last.fm' + (src === 'lastfm' ? ' • connected' : '') + '</h4><p>Works with Apple Music and most apps that scrobble. Display only (no controls).</p>' +
      '<input id="lf-u" placeholder="Last.fm username" autocapitalize="off" autocorrect="off" value="' + esc(store.get('lf_u', '')) + '"><input id="lf-k" placeholder="Last.fm API key" autocapitalize="off" autocorrect="off" value="' + esc(store.get('lf_k', '')) + '"><button class="btn go" id="lf-go">Use Last.fm</button>' +
      (src ? '<br><button class="btn warn" id="src-off">Disconnect</button>' : '');
    sh.classList.add('open');
    $('.close', sh).addEventListener('click', function () { sh.classList.remove('open'); });
    $('#sp-go').addEventListener('click', spConnect);
    $('#lf-go').addEventListener('click', function () {
      var u = $('#lf-u').value.trim(), k = $('#lf-k').value.trim(); if (!u || !k) { toast('Enter username and API key'); return; }
      store.set('lf_u', u); store.set('lf_k', k); store.set('src', 'lastfm'); sh.classList.remove('open'); pollNow(); drawMusic();
    });
    if ($('#src-off')) $('#src-off').addEventListener('click', function () { store.set('src', ''); store.set('sp_tok', null); np = null; playing = false; sh.classList.remove('open'); drawMusic(); });
  }
  $('#m-src-btn').addEventListener('click', openSourceSheet);
  $('#set-src').addEventListener('click', function () { go('music'); setTimeout(openSourceSheet, 350); });
  setInterval(function () { if (source()) pollNow(); }, 5000);

  /* ---------- Timer ---------- */
  var tMin = 5, tLeft = 300, tRun = false, tEnd = 0;
  function drawTimer() { $('#t-disp').textContent = fmt(tLeft); $('#t-go').textContent = tRun ? 'Stop' : 'Start'; $('#t-go').className = 'tgo' + (tRun ? ' run' : ''); }
  function timerTick() { if (!tRun) return; tLeft = Math.max(0, Math.ceil((tEnd - Date.now()) / 1000)); $('#t-disp').textContent = fmt(tLeft); if (tLeft <= 0) { tRun = false; chime(); toast('Timer done'); drawTimer(); } }
  var ac = null;
  function ensureAudio() { var C = window.AudioContext || window.webkitAudioContext; if (!C) return false; if (!ac) ac = new C(); if (ac.state === 'suspended' && ac.resume) ac.resume(); return true; }
  function chime() { if (!ensureAudio()) return; [880, 1108, 1319, 1760].forEach(function (f, i) { var o = ac.createOscillator(), g = ac.createGain(), w = ac.currentTime + i * 0.18; o.frequency.value = f; g.gain.setValueAtTime(0.0001, w); g.gain.linearRampToValueAtTime(0.25, w + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, w + 0.9); o.connect(g); g.connect(ac.destination); o.start(w); o.stop(w + 1); }); }
  $$('.tpre button').forEach(function (b) { b.addEventListener('click', function () { if (tRun) return; $$('.tpre button').forEach(function (x) { x.classList.remove('sel'); }); b.classList.add('sel'); tMin = +b.getAttribute('data-min'); tLeft = tMin * 60; drawTimer(); }); });
  $('#t-go').addEventListener('click', function () { ensureAudio(); if (tRun) { tRun = false; tLeft = tMin * 60; } else { tRun = true; tEnd = Date.now() + tLeft * 1000; } drawTimer(); });

  /* ---------- Photos ---------- */
  var scenes = [
    { g: 'linear-gradient(160deg,#ff9a76,#6a5acd)', c: 'Golden hour' }, { g: 'linear-gradient(160deg,#134e5e,#71b280)', c: 'Forest morning' },
    { g: 'linear-gradient(160deg,#0f2027,#2c5364 50%,#f6d365)', c: 'Harbor dusk' }, { g: 'linear-gradient(160deg,#ee9ca7,#ffdde1)', c: 'Soft blush' }
  ];
  var userPhotos = [], phIdx = 0, phTimer = null, phFlip = false;
  function showPhoto() {
    var total = userPhotos.length || scenes.length, el = $(phFlip ? '#ph-a' : '#ph-b'), old = $(phFlip ? '#ph-b' : '#ph-a'), cap = '';
    if (userPhotos.length) { el.style.background = 'url("' + userPhotos[phIdx % total] + '") center/cover'; cap = ''; }
    else { var s = scenes[phIdx % total]; el.style.background = s.g; cap = s.c; }
    el.classList.add('show'); old.classList.remove('show'); phFlip = !phFlip; $('#ph-cap').textContent = cap; phIdx++;
  }
  function startShow() { stopShow(); showPhoto(); phTimer = setInterval(showPhoto, 6000); }
  function stopShow() { clearInterval(phTimer); }
  $('#v-photos').addEventListener('click', function (e) { if (e.target.id === 'ph-a' || e.target.id === 'ph-b') showPhoto(); });
  $('#ph-file').addEventListener('change', function (e) {
    var fs = e.target.files, i; for (i = 0; i < fs.length; i++) { userPhotos.push((window.URL || window.webkitURL).createObjectURL(fs[i])); }
    if (fs.length) { phIdx = userPhotos.length - fs.length; showPhoto(); toast(fs.length + ' photo' + (fs.length > 1 ? 's' : '') + ' added'); }
  });

  /* ---------- Weather (Open-Meteo, no key) ---------- */
  var WX = { 0: 'Clear', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Fog', 48: 'Fog', 51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle', 61: 'Rain', 63: 'Rain', 65: 'Heavy rain', 71: 'Snow', 73: 'Snow', 75: 'Heavy snow', 80: 'Showers', 81: 'Showers', 82: 'Heavy showers', 95: 'Thunderstorms', 96: 'Thunderstorms', 99: 'Thunderstorms' };
  var wxAt = 0;
  function showWx(lat, lon) {
    var f = /^en-US/i.test(navigator.language || '') ;
    fetch('https://api.open-meteo.com/v1/forecast?' + qs({ latitude: lat, longitude: lon, current: 'temperature_2m,weather_code', daily: 'temperature_2m_max,temperature_2m_min', temperature_unit: f ? 'fahrenheit' : 'celsius', timezone: 'auto', forecast_days: 1 }))
      .then(function (r) { return r.json(); }).then(function (j) {
        $('#wx-temp').textContent = Math.round(j.current.temperature_2m) + '°'; $('#wx-cond').textContent = WX[j.current.weather_code] || 'Weather';
        $('#wx-hl').textContent = 'H:' + Math.round(j.daily.temperature_2m_max[0]) + '°  L:' + Math.round(j.daily.temperature_2m_min[0]) + '°'; $('#wx-place').textContent = 'Current location'; wxAt = Date.now();
      }).catch(function () { $('#wx-cond').textContent = 'Weather unavailable'; });
  }
  function loadWeather() {
    if (Date.now() - wxAt < 600000) return;
    $('#wx-cond').textContent = 'Locating…';
    if (!navigator.geolocation) { $('#wx-cond').textContent = 'Location not supported'; return; }
    navigator.geolocation.getCurrentPosition(function (p) { showWx(p.coords.latitude, p.coords.longitude); }, function () { $('#wx-cond').textContent = 'Allow location to see weather'; }, { timeout: 10000, maximumAge: 600000 });
  }

  /* ---------- Reminders ---------- */
  var rems = store.get('rems', [{ t: 'Pick up groceries', d: false }, { t: 'Water the plants', d: false }, { t: 'Charge the iPad', d: true }]);
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function drawRems() {
    $('#rem-list').innerHTML = rems.map(function (r, i) { return '<div class="rem' + (r.d ? ' done' : '') + '" data-r="' + i + '"><i></i><span>' + esc(r.t) + '</span></div>'; }).join('') || '<div class="rem"><span style="opacity:.5">Nothing to do</span></div>';
    $$('.rem[data-r]').forEach(function (el) { el.addEventListener('click', function () { var i = +el.getAttribute('data-r'); rems[i].d = !rems[i].d; store.set('rems', rems); drawRems(); }); });
  }
  $('#rem-form').addEventListener('submit', function (e) { e.preventDefault(); var v = $('#rem-in').value.trim(); if (!v) return; rems.unshift({ t: v, d: false }); $('#rem-in').value = ''; store.set('rems', rems); drawRems(); });

  /* ---------- Calendar ---------- */
  function drawCal() {
    var d = new Date(), y = d.getFullYear(), m = d.getMonth(), first = new Date(y, m, 1).getDay(), n = new Date(y, m + 1, 0).getDate(), h = '', i;
    $('#cal-title').textContent = MON[m] + ' ' + y;
    for (i = 0; i < 7; i++) h += '<div class="dw">' + DAYS[i].charAt(0) + '</div>';
    for (i = 0; i < first; i++) h += '<div></div>';
    for (i = 1; i <= n; i++) h += '<div' + (i === d.getDate() ? ' class="today"' : '') + '><span>' + i + '</span></div>';
    $('#cal-grid').innerHTML = h;
  }

  /* ---------- launcher: your own apps ---------- */
  var COLORS2 = [['#ff8aa0', '#d6155c'], ['#ffe08a', '#ff8a00'], ['#ffffff', '#cfd3ff'], ['#6c6f7d', '#23252e'], ['#8ec5ff', '#1450d8'], ['#9fe0ff', '#2f6df0'], ['#c7c9d4', '#5f6270'], ['#6af0a0', '#0e9f4f'], ['#ff8a80', '#d11a14'], ['#c9a0ff', '#6a2fd6'], ['#7ff0e0', '#0f8f9f']];
  // t:'view' opens a built-in Homebase screen; t:'url' opens an installed app (URL scheme) or website
  var CATALOG = [
    { n: 'Now Playing', t: 'view', v: 'music', c: 0, g: 'music' }, { n: 'Photos', t: 'view', v: 'photos', c: 2, g: 'flower' },
    { n: 'Clock', t: 'view', v: 'clock', c: 3, g: 'clock' }, { n: 'Calendar', t: 'view', v: 'cal', c: 2, g: 'cal' },
    { n: 'Reminders', t: 'view', v: 'rem', c: 4, g: 'list' }, { n: 'Weather', t: 'view', v: 'weather', c: 5, g: 'cloud' }, { n: 'Settings', t: 'view', v: 'set', c: 6, g: 'sliders' },
    { n: 'Spotify', t: 'url', v: 'spotify://', c: 7 }, { n: 'Apple Music', t: 'url', v: 'music://', c: 0 }, { n: 'Podcasts', t: 'url', v: 'podcasts://', c: 9 },
    { n: 'YouTube', t: 'url', v: 'youtube://', c: 8 }, { n: 'Netflix', t: 'url', v: 'nflx://', c: 8 }, { n: 'Disney+', t: 'url', v: 'disneyplus://', c: 4 },
    { n: 'Hulu', t: 'url', v: 'hulu://', c: 7 }, { n: 'Prime Video', t: 'url', v: 'aiv://', c: 5 }, { n: 'Twitch', t: 'url', v: 'twitch://', c: 9 },
    { n: 'Maps', t: 'url', v: 'maps://', c: 7 }, { n: 'Messages', t: 'url', v: 'sms://', c: 7 }, { n: 'FaceTime', t: 'url', v: 'facetime://', c: 7 },
    { n: 'Mail', t: 'url', v: 'message://', c: 4 }, { n: 'Notes', t: 'url', v: 'mobilenotes://', c: 1 }, { n: 'Home', t: 'url', v: 'x-hm://', c: 1 },
    { n: 'Instagram', t: 'url', v: 'instagram://', c: 9 }, { n: 'WhatsApp', t: 'url', v: 'whatsapp://', c: 7 }, { n: 'X', t: 'url', v: 'twitter://', c: 3 },
    { n: 'Safari', t: 'url', v: 'https://www.google.com', c: 5 }
  ];
  var DEFAULT_APPS = ['Now Playing', 'Spotify', 'Apple Music', 'Photos', 'Clock', 'Weather', 'Calendar', 'Settings'];
  function catalog(n) { var i; for (i = 0; i < CATALOG.length; i++) if (CATALOG[i].n === n) return CATALOG[i]; return null; }
  var apps = store.get('apps', null) || DEFAULT_APPS.map(function (n) { return JSON.parse(JSON.stringify(catalog(n))); });
  var curPage = 0;
  function saveApps() { store.set('apps', apps); }
  function iconHTML(a) {
    var col = COLORS2[a.c] || COLORS2[3], inner = '';
    if (a.img) inner = '<img src="' + a.img + '" alt="">';
    else if (a.g === 'cal') inner = '<em>' + DAYS[new Date().getDay()] + '</em><strong>' + new Date().getDate() + '</strong>';
    else if (a.g) inner = icon(a.g);
    else inner = '<span class="mono">' + esc((a.n || '?').charAt(0).toUpperCase()) + '</span>';
    return '<span class="ico' + (a.c === 2 || a.c === 1 && a.g === 'cal' ? ' lt' : '') + (a.g === 'cal' ? ' c-cal' : '') + '" style="background:linear-gradient(160deg,' + col[0] + ',' + col[1] + ')">' + inner + '</span>';
  }
  function drawHome() {
    var items = apps.map(function (a, i) { return { i: i, a: a }; });
    if (editing) items.push({ add: true });
    var pages = [], first = items.slice(0, 8), rest = items.slice(8), k;
    pages.push(first); for (k = 0; k < rest.length; k += 12) pages.push(rest.slice(k, k + 12));
    if (curPage >= pages.length) curPage = pages.length - 1;
    var n = pages.length;
    $('#pages').style.width = (n * 100) + '%';
    $('#pages').innerHTML = pages.map(function (pg, pi) {
      return '<div class="page" style="width:' + (100 / n) + '%">' + (pi === 0 ? '<div class="widget"><div class="aclock" id="aclock-w">' + clockSVG() + '</div></div>' : '') +
        pg.map(function (it) {
          if (it.add) return '<button class="app add" data-add="1"><span class="ico"><span class="plus">+</span></span><b>Add App</b></button>';
          return '<button class="app" data-app="' + it.i + '">' + iconHTML(it.a) + '<b>' + esc(it.a.n) + '</b></button>';
        }).join('') + '</div>';
    }).join('');
    $('#pages').style.webkitTransform = $('#pages').style.transform = 'translateX(-' + (curPage * 100 / n) + '%)';
    $('#dots').innerHTML = n > 1 ? pages.map(function (x, i) { return '<i class="' + (i === curPage ? 'on' : '') + '"></i>'; }).join('') : '';
    $$('.app[data-app]').forEach(function (el) {
      var i = +el.getAttribute('data-app'), t = null, long = false;
      el.addEventListener('touchstart', function () { long = false; t = setTimeout(function () { long = true; setEditing(true); }, 650); }, false);
      ['touchend', 'touchmove', 'touchcancel'].forEach(function (ev) { el.addEventListener(ev, function () { clearTimeout(t); }, false); });
      el.addEventListener('click', function () { if (long) { long = false; return; } if (editing) editApp(i); else launch(apps[i]); });
    });
    var ad = $('.app.add'); if (ad) ad.addEventListener('click', addApp);
    tickClock(new Date());
  }
  function setEditing(v) { editing = v; document.body.className = (playing ? 'playing' : '') + (editing ? ' editing' : ''); $('#editBtn').textContent = editing ? 'Done' : 'Edit'; if (!v) $('#g-sheet').classList.remove('open'); drawHome(); }
  $('#editBtn').addEventListener('click', function () { setEditing(!editing); });
  $('#set-edit').addEventListener('click', function () { go('home'); setEditing(true); });
  function launch(a) {
    if (a.t === 'view') { go(a.v); return; }
    var u = a.v, t0 = Date.now();
    if (/^https?:/i.test(u)) { window.open(u, '_blank'); return; }
    location.href = u;
    setTimeout(function () { if (!document.hidden && Date.now() - t0 < 4000) toast('If nothing opened, ' + a.n + ' may not be installed'); }, 1600);
  }
  // swipe between pages
  (function () {
    var x0 = null, w = $('#pages-wrap');
    w.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, false);
    w.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      var n = $$('.page').length; if (dx < -60 && curPage < n - 1) curPage++; else if (dx > 60 && curPage > 0) curPage--; else return; drawHome();
    }, false);
  })();

  function openG(html) { var sh = $('#g-sheet'); sh.innerHTML = '<button class="close">Done</button>' + html; sh.classList.add('open'); $('.close', sh).addEventListener('click', function () { sh.classList.remove('open'); }); return sh; }
  function colorSwatches(sel) { return '<div class="cs">' + COLORS2.map(function (c, i) { return '<span data-c="' + i + '" class="' + (i === sel ? 'sel' : '') + '" style="background:linear-gradient(160deg,' + c[0] + ',' + c[1] + ')"></span>'; }).join('') + '</div>'; }
  function addApp() {
    var have = {}; apps.forEach(function (a) { have[a.n] = 1; });
    var h = '<div class="h">Add App</div><p>Apps open the real app on this iPad using its link scheme. If one doesn’t open, it may not be installed or uses a different scheme — use Custom.</p><div class="opts">' +
      CATALOG.filter(function (c) { return !have[c.n]; }).map(function (c) { return '<button class="btn" data-cat="' + c.n + '">' + esc(c.n) + '</button>'; }).join('') + '</div>' +
      '<h4>Custom</h4><input id="ca-n" placeholder="Name" autocapitalize="words"><input id="ca-u" placeholder="App link, e.g. myapp:// or https://…" autocapitalize="off" autocorrect="off"><div id="ca-c">' + colorSwatches(4) + '</div><button class="btn go" id="ca-go">Add</button>';
    var sh = openG(h), col = 4;
    $$('[data-cat]', sh).forEach(function (b) { b.addEventListener('click', function () { apps.push(JSON.parse(JSON.stringify(catalog(b.getAttribute('data-cat'))))); saveApps(); sh.classList.remove('open'); drawHome(); }); });
    $$('#ca-c span', sh).forEach(function (sp) { sp.addEventListener('click', function () { col = +sp.getAttribute('data-c'); $$('#ca-c span', sh).forEach(function (x) { x.classList.remove('sel'); }); sp.classList.add('sel'); }); });
    $('#ca-go').addEventListener('click', function () {
      var n = $('#ca-n').value.trim(), u = $('#ca-u').value.trim(); if (!n || !u) { toast('Enter a name and a link'); return; }
      apps.push({ n: n, t: 'url', v: u, c: col }); saveApps(); sh.classList.remove('open'); drawHome();
    });
  }
  function editApp(i) {
    var a = apps[i];
    var h = '<div class="h">Edit ' + esc(a.n) + '</div><input id="ea-n" value="' + esc(a.n) + '" placeholder="Name">' +
      (a.t === 'url' ? '<input id="ea-u" value="' + esc(a.v) + '" placeholder="App link" autocapitalize="off" autocorrect="off">' : '') +
      '<h4>Color</h4><div id="ea-c">' + colorSwatches(a.c) + '</div>' +
      '<h4>Icon image</h4><p>Use your own picture as the icon (Apple’s and other brands’ artwork isn’t bundled).</p><button class="btn filebtn">Choose image<input type="file" accept="image/*" id="ea-f"></button>' + (a.img ? '<button class="btn" id="ea-nf">Remove image</button>' : '') +
      '<h4>Order</h4><button class="btn" id="ea-l">◀ Move earlier</button><button class="btn" id="ea-r">Move later ▶</button><br><button class="btn go" id="ea-s">Save</button><button class="btn warn" id="ea-d">Remove app</button>';
    var sh = openG(h);
    $$('#ea-c span', sh).forEach(function (sp) { sp.addEventListener('click', function () { a.c = +sp.getAttribute('data-c'); $$('#ea-c span', sh).forEach(function (x) { x.classList.remove('sel'); }); sp.classList.add('sel'); }); });
    $('#ea-f').addEventListener('change', function (e) { shrink(e.target.files[0], 160, function (d) { a.img = d; saveApps(); sh.classList.remove('open'); drawHome(); }); });
    if ($('#ea-nf')) $('#ea-nf').addEventListener('click', function () { delete a.img; saveApps(); sh.classList.remove('open'); drawHome(); });
    $('#ea-l').addEventListener('click', function () { if (i > 0) { apps.splice(i - 1, 0, apps.splice(i, 1)[0]); saveApps(); sh.classList.remove('open'); drawHome(); } });
    $('#ea-r').addEventListener('click', function () { if (i < apps.length - 1) { apps.splice(i + 1, 0, apps.splice(i, 1)[0]); saveApps(); sh.classList.remove('open'); drawHome(); } });
    $('#ea-s').addEventListener('click', function () { var n = $('#ea-n').value.trim(); if (n) a.n = n; if ($('#ea-u')) a.v = $('#ea-u').value.trim() || a.v; saveApps(); sh.classList.remove('open'); drawHome(); });
    $('#ea-d').addEventListener('click', function () { apps.splice(i, 1); saveApps(); sh.classList.remove('open'); drawHome(); });
  }
  // shrink a chosen photo so it fits in localStorage
  function shrink(file, max, cb) {
    if (!file) return; var fr = new FileReader();
    fr.onload = function () {
      var im = new Image();
      im.onload = function () {
        var r = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width * r); c.height = Math.round(im.height * r);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); cb(c.toDataURL('image/jpeg', 0.85));
      };
      im.src = fr.result;
    };
    fr.readAsDataURL(file);
  }

  /* ---------- wallpapers ---------- */
  var WALLS = [
    null,
    'linear-gradient(160deg,#ff9a76,#d4509a 55%,#4b2a9a)', 'linear-gradient(160deg,#0f2027,#2c5364 55%,#5fb3a0)',
    'linear-gradient(160deg,#fbd786,#f7797d 60%,#8e3fa8)', 'radial-gradient(circle at 30% 20%,#7ee8fa,#2f4bd8 60%,#1a0f4a)', 'linear-gradient(160deg,#232526,#414345)'
  ];
  var DEFAULT_WALL = 'radial-gradient(circle at 18% 12%,#53b0ff 0,rgba(83,176,255,0) 48%),radial-gradient(circle at 88% 28%,#b45cff 0,rgba(180,92,255,0) 46%),radial-gradient(circle at 55% 98%,#ff6b9d 0,rgba(255,107,157,0) 52%),#1b2a9a';
  var wp = { home: store.get('wp_home', { g: 0 }), lock: store.get('wp_lock', { same: true }) };
  function wallCSS(w) { if (w.d) return 'url("' + w.d + '") center/cover'; return WALLS[w.g] || DEFAULT_WALL; }
  function applyWalls() {
    $('#screen').style.background = wallCSS(wp.home);
    $('#lk-bg').style.background = wp.lock.same ? wallCSS(wp.home) : wallCSS(wp.lock);
  }
  function pickWall(which) {
    var cur = wp[which], thumbs = WALLS.map(function (w, i) { return '<span data-g="' + i + '" class="' + (!cur.d && !cur.same && cur.g === i ? 'sel' : '') + '" style="background:' + (w || DEFAULT_WALL) + '"></span>'; }).join('');
    var sh = openG('<div class="h">' + (which === 'home' ? 'Wallpaper' : 'Lock screen wallpaper') + '</div><div class="wps">' + thumbs + '<label>+ Photo<input type="file" accept="image/*" id="wp-f"></label></div>' +
      (which === 'lock' ? '<button class="btn" id="wp-same">Same as Home Screen</button>' : '') + '<p>Photos are resized and stored on this iPad only.</p>');
    function save() { store.set('wp_' + which, wp[which]); applyWalls(); sh.classList.remove('open'); }
    $$('.wps span', sh).forEach(function (sp) { sp.addEventListener('click', function () { wp[which] = { g: +sp.getAttribute('data-g') }; save(); }); });
    $('#wp-f').addEventListener('change', function (e) { shrink(e.target.files[0], 1280, function (d) { wp[which] = { d: d }; try { localStorage.setItem('hb_wp_' + which, JSON.stringify(wp[which])); } catch (err) { toast('Too big to remember after reload'); } applyWalls(); sh.classList.remove('open'); }); });
    if ($('#wp-same')) $('#wp-same').addEventListener('click', function () { wp.lock = { same: true }; save(); });
  }
  $('#wp-home').addEventListener('click', function () { pickWall('home'); });
  $('#wp-lock').addEventListener('click', function () { pickWall('lock'); });

  /* ---------- Settings ---------- */
  var COLORS = { starlight: '#e9e2d6', silver: '#d9dbde', blush: '#e9cfd0', midnight: '#2a2d33' };
  function drawSettings() {
    $('#swatches').innerHTML = Object.keys(COLORS).map(function (k) { return '<span data-c="' + k + '" class="' + (k === cfg.color ? 'sel' : '') + '" style="background:' + COLORS[k] + '"></span>'; }).join('');
    $$('#swatches span').forEach(function (s) { s.addEventListener('click', function () { cfg.color = s.getAttribute('data-c'); store.set('color', cfg.color); applyColor(); drawSettings(); }); });
    $('#sw-24').className = 'sw' + (cfg.h24 ? ' on' : ''); $('#sw-sb').className = 'sw' + (cfg.lock ? ' on' : '');
    $('#bright').value = cfg.bright;
  }
  $('#sw-24').addEventListener('click', function () { cfg.h24 = !cfg.h24; store.set('h24', cfg.h24); drawSettings(); tick(); });
  $('#sw-sb').addEventListener('click', function () { cfg.lock = !cfg.lock; store.set('lock', cfg.lock); drawSettings(); });
  $('#bright').addEventListener('input', function () { cfg.bright = +this.value; store.set('bright', cfg.bright); applyBright(); });

  /* ---------- Siri-style assistant (tap-to-run commands; iOS 12 Safari has no speech API) ---------- */
  var cmds = [
    ['Now Playing', function () { go('music'); return 'Here’s what’s playing'; }],
    ['Weather', function () { go('weather'); return 'Checking the weather'; }],
    ['Set a 5 minute timer', function () { tMin = 5; tLeft = 300; tRun = true; tEnd = Date.now() + 300000; ensureAudio(); drawTimer(); go('clock'); return 'Timer set for 5 minutes'; }],
    ['Show my photos', function () { go('photos'); return 'Starting a slideshow'; }]
  ];
  $('#siriBtn').addEventListener('click', function () {
    $('#siri-say').textContent = 'What can I help with?';
    $('#siri-chips').innerHTML = cmds.map(function (c, i) { return '<button data-c="' + i + '">' + c[0] + '</button>'; }).join('');
    $$('#siri-chips button').forEach(function (b) { b.addEventListener('click', function () { var r = cmds[+b.getAttribute('data-c')][1](); $('#siri-say').textContent = r; $('#siri-chips').innerHTML = ''; setTimeout(function () { $('#siri').classList.remove('open'); }, 1100); }); });
    $('#siri').classList.add('open');
  });
  $('#siri').addEventListener('click', function (e) { if (e.target === this || e.target.className === 'orb') this.classList.remove('open'); });

  /* ---------- keep iOS from scrolling/bouncing ---------- */
  document.addEventListener('touchmove', function (e) {
    var n = e.target; while (n && n !== document.body) { if (n.classList && (n.classList.contains('scroll') || n.classList.contains('sheet'))) return; n = n.parentNode; }
    e.preventDefault();
  }, { passive: false });
  document.addEventListener('gesturestart', function (e) { e.preventDefault(); });

  /* ---------- add-to-home-screen hint ---------- */
  var standalone = window.navigator.standalone || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  if (!standalone && !store.get('a2hs', false) && /iPad|iPhone|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document) {
    $('#a2hs').classList.add('show');
    $('#a2hs-x').addEventListener('click', function () { $('#a2hs').classList.remove('show'); store.set('a2hs', true); });
  }

  /* ---------- init ---------- */
  fillIcons(document);
  applyColor(); applyBright(); applyWalls(); drawHome(); drawLockNP(); drawSettings(); drawRems(); drawMusic(); drawTimer(); handleSpotifyReturn(); if (source()) pollNow();
  tick(); setInterval(tick, 1000);
  if ('serviceWorker' in navigator && location.protocol === 'https:') { try { navigator.serviceWorker.register('sw.js'); } catch (e) {} }
})();
