// Simple language toggle (VI <-> EN) placeholder
(function(){
  const LS_KEY = 'tcgd_lang';
  function setLang(lang){
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem(LS_KEY, lang); } catch(e) {}
    updateToggleText(lang);
    banner(lang);
  }
  function getLang(){
    try { return localStorage.getItem(LS_KEY) || 'vi'; } catch(e) { return 'vi'; }
  }
  function updateToggleText(lang){
    const btns = document.querySelectorAll('.lang-toggle');
    btns.forEach(b => b.textContent = lang === 'vi' ? '🌐 EN' : '🌐 VI');
  }
  function banner(lang){
    let el = document.getElementById('lang-banner');
    if(!el){
      el = document.createElement('div');
      el.id = 'lang-banner';
      el.style.position='fixed'; el.style.bottom='16px'; el.style.right='16px';
      el.style.background='#1f2937'; el.style.color='#fff'; el.style.padding='10px 14px';
      el.style.borderRadius='8px'; el.style.boxShadow='0 4px 12px rgba(0,0,0,.15)';
      el.style.fontSize='14px'; el.style.zIndex='2000';
      document.body.appendChild(el);
      setTimeout(()=>{ if(el) el.style.opacity='0'; }, 3500);
      setTimeout(()=>{ if(el && el.parentNode) el.parentNode.removeChild(el); }, 4500);
    }
    el.textContent = lang === 'en' ? 'English UI enabled (content translation coming soon)' : 'Đang hiển thị tiếng Việt';
  }
  window.toggleLanguage = function(){
    const current = getLang();
    const next = current === 'vi' ? 'en' : 'vi';
    setLang(next);
  };
  document.addEventListener('DOMContentLoaded', function(){
    setLang(getLang());
  });
})();
