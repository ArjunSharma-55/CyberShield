const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);const HISTORY_KEY="cybershield_history";let historyData=JSON.parse(localStorage.getItem(HISTORY_KEY)||"[]");let toastTimer;
function saveHistory(tool,detail){historyData.unshift({tool,detail,time:new Date().toLocaleString()});historyData=historyData.slice(0,50);localStorage.setItem(HISTORY_KEY,JSON.stringify(historyData));updateHistoryCount();renderHistory()}
function updateHistoryCount(){const c=$("#historyCount");if(c)c.textContent=historyData.length}
function showToast(message,icon="✓"){const t=$("#toast"),m=$("#toastMessage"),i=$("#toastIcon");m.textContent=message;i.textContent=icon;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2500)}
function openTool(name){$$(".tool-section").forEach(s=>s.classList.remove("active-section"));const t=document.getElementById(name);if(t)t.classList.add("active-section");$$(".nav-item").forEach(i=>i.classList.toggle("active",i.dataset.tool===name));window.scrollTo({top:0,behavior:"smooth"});closeSidebar()}
$$(".nav-item").forEach(b=>b.addEventListener("click",()=>openTool(b.dataset.tool)));
$$(".open-tool").forEach(b=>b.addEventListener("click",()=>openTool(b.dataset.open)));
const sidebar=$("#sidebar"),mobileMenu=$("#mobileMenu"),sidebarOverlay=$("#sidebarOverlay");
mobileMenu.addEventListener("click",()=>{sidebar.classList.toggle("open");sidebarOverlay.classList.toggle("active")});
function closeSidebar(){sidebar.classList.remove("open");sidebarOverlay.classList.remove("active")}sidebarOverlay.addEventListener("click",closeSidebar);

const passwordInput=$("#passwordInput"),strengthBar=$("#strengthBar"),strengthText=$("#strengthText");
function checkPassword(password){const checks={length:password.length>=8,lower:/[a-z]/.test(password),upper:/[A-Z]/.test(password),number:/[0-9]/.test(password),special:/[^A-Za-z0-9]/.test(password)};Object.entries(checks).forEach(([rule,valid])=>{const e=document.querySelector(`[data-rule="${rule}"]`);if(!e)return;e.classList.toggle("valid",valid);e.querySelector("span").textContent=valid?"✓":"○"});const score=Object.values(checks).filter(Boolean).length;strengthBar.style.width=`${score*20}%`;if(!password){strengthText.textContent="Waiting...";strengthBar.style.width="0%";return}if(score<=2){strengthText.textContent="Weak";strengthBar.style.background="var(--red)"}else if(score<=4){strengthText.textContent="Medium";strengthBar.style.background="var(--yellow)"}else{strengthText.textContent="Strong";strengthBar.style.background="var(--green)"}}
passwordInput.addEventListener("input",()=>checkPassword(passwordInput.value));
$("#togglePassword").addEventListener("click",()=>{const p=passwordInput.type==="password";passwordInput.type=p?"text":"password";$("#togglePassword").textContent=p?"Hide":"Show"});

async function sha256(text){const data=new TextEncoder().encode(text),buffer=await crypto.subtle.digest("SHA-256",data);return Array.from(new Uint8Array(buffer)).map(b=>b.toString(16).padStart(2,"0")).join("")}
$("#generateHash").addEventListener("click",async()=>{const input=$("#hashInput").value;if(!input)return showToast("Enter text first","!");const hash=await sha256(input);$("#hashOutput").textContent=hash;saveHistory("SHA-256",`Generated hash for ${input.length} characters`);showToast("SHA-256 generated")});
$("#copyHash").addEventListener("click",async()=>{const v=$("#hashOutput").textContent;if(!v||v==="Your hash will appear here...")return showToast("Nothing to copy","!");await copyText(v);showToast("Hash copied")});

function encodeBase64(text){const bytes=new TextEncoder().encode(text);let binary="";bytes.forEach(b=>binary+=String.fromCharCode(b));return btoa(binary)}
function decodeBase64(text){const binary=atob(text),bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));return new TextDecoder().decode(bytes)}
$("#encodeBase64").addEventListener("click",()=>{const i=$("#base64Input").value;if(!i)return showToast("Enter text first","!");$("#base64Output").textContent=encodeBase64(i);saveHistory("Base64","Encoded text");showToast("Text encoded")});
$("#decodeBase64").addEventListener("click",()=>{const i=$("#base64Input").value.trim();if(!i)return showToast("Enter Base64 text","!");try{$("#base64Output").textContent=decodeBase64(i);saveHistory("Base64","Decoded text");showToast("Base64 decoded")}catch{$("#base64Output").textContent="Invalid Base64 input.";showToast("Invalid Base64","!")}})
$("#copyBase64").addEventListener("click",async()=>{const v=$("#base64Output").textContent;if(!v||v==="Result will appear here...")return showToast("Nothing to copy","!");await copyText(v);showToast("Result copied")});

function isValidIPv4(ip){const p=ip.split(".");if(p.length!==4)return false;return p.every(x=>/^\d+$/.test(x)&&!(x.length>1&&x.startsWith("0"))&&Number(x)>=0&&Number(x)<=255)}
function isValidIPv6(ip){if(!ip.includes(":"))return false;const p=ip.split(":");if(p.length>8)return false;if((ip.match(/::/g)||[]).length>1)return false;return p.every(x=>x===""||/^[0-9a-fA-F]{1,4}$/.test(x))}
$("#validateIP").addEventListener("click",()=>{const ip=$("#ipInput").value.trim(),r=$("#ipResult");if(!ip){r.textContent="Please enter an IP address.";r.className="validation-result";return}const v4=isValidIPv4(ip),v6=isValidIPv6(ip);if(v4||v6){const type=v4?"IPv4":"IPv6";r.textContent=`✓ Valid ${type} address`;r.className="validation-result valid";saveHistory("IP Validator",`${type} address validated`);showToast("Valid IP address")}else{r.textContent="✕ Invalid IP address format.";r.className="validation-result invalid";showToast("Invalid IP address","!")}});

$("#analyzeURL").addEventListener("click",()=>{let input=$("#urlInput").value.trim();if(!input)return showToast("Enter a URL first","!");try{if(!/^[a-z][a-z0-9+.-]*:\/\//i.test(input))input="https://"+input;const u=new URL(input);$("#urlProtocol").textContent=u.protocol;$("#urlHostname").textContent=u.hostname||"—";$("#urlPort").textContent=u.port||"Default";$("#urlPath").textContent=u.pathname||"/";$("#urlQuery").textContent=u.search||"None";$("#urlHash").textContent=u.hash||"None";saveHistory("URL Analyzer",`Analyzed ${u.hostname}`);showToast("URL analyzed")}catch{showToast("Invalid URL","!")}});

function xorTransform(text,key){if(!key)throw new Error("Secret key required");let o="";for(let i=0;i<text.length;i++)o+=String.fromCharCode(text.charCodeAt(i)^key.charCodeAt(i%key.length));return o}
function bytesToBase64(text){const bytes=new TextEncoder().encode(text);let b="";bytes.forEach(x=>b+=String.fromCharCode(x));return btoa(b)}
function base64ToBytes(base64){const b=atob(base64),bytes=new Uint8Array(b.length);for(let i=0;i<b.length;i++)bytes[i]=b.charCodeAt(i);return new TextDecoder().decode(bytes)}
$("#encryptText").addEventListener("click",()=>{const t=$("#cryptoInput").value,k=$("#cryptoKey").value;if(!t||!k)return showToast("Message and key are required","!");try{$("#cryptoOutput").textContent=bytesToBase64(xorTransform(t,k));saveHistory("Encryption Demo","Message encrypted");showToast("Message encrypted")}catch{showToast("Encryption failed","!")}})
$("#decryptText").addEventListener("click",()=>{const t=$("#cryptoInput").value.trim(),k=$("#cryptoKey").value;if(!t||!k)return showToast("Encrypted text and key are required","!");try{$("#cryptoOutput").textContent=xorTransform(base64ToBytes(t),k);saveHistory("Encryption Demo","Message decrypted");showToast("Message decrypted")}catch{showToast("Invalid encrypted data","!")}})
$("#copyCrypto").addEventListener("click",async()=>{const v=$("#cryptoOutput").textContent;if(!v||v==="Result will appear here...")return showToast("Nothing to copy","!");await copyText(v);showToast("Result copied")});

async function copyText(text){try{await navigator.clipboard.writeText(text)}catch{const t=document.createElement("textarea");t.value=text;t.style.position="fixed";t.style.opacity="0";document.body.appendChild(t);t.select();document.execCommand("copy");t.remove()}}
function escapeHTML(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function renderHistory(){const c=$("#historyContainer");if(!historyData.length){c.innerHTML='<div class="empty-history"><span>📜</span><h3>No history yet</h3><p>Your completed operations will appear here.</p></div>';return}c.innerHTML=historyData.map(x=>`<div class="history-item"><div><div class="history-tool">${escapeHTML(x.tool)}</div><div class="history-detail">${escapeHTML(x.detail)}</div></div><div class="history-time">${escapeHTML(x.time)}</div></div>`).join("")}
updateHistoryCount();renderHistory();
$("#clearHistory").addEventListener("click",()=>{if(!historyData.length)return showToast("History is already empty","!");historyData=[];localStorage.removeItem(HISTORY_KEY);updateHistoryCount();renderHistory();showToast("History cleared")});
$("#toolSearch").addEventListener("input",e=>{const q=e.target.value.toLowerCase().trim();if(!q){$$(".tool-card").forEach(c=>c.style.display="");return}openTool("dashboard");$$(".tool-card").forEach(c=>c.style.display=c.textContent.toLowerCase().includes(q)?"":"none")});
document.addEventListener("keydown",e=>{if(e.ctrlKey&&e.key.toLowerCase()==="k"){e.preventDefault();$("#toolSearch").focus()}if(e.key==="Escape")closeSidebar()});
console.log("CyberShield Toolkit initialized.");
