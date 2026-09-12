const targets = await (await fetch('http://127.0.0.1:9222/json')).json();
const socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve));
let id = 0;
const pending = new Map();
const errors = [];
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const request = pending.get(message.id);
    pending.delete(message.id);
    message.error ? request.reject(message.error) : request.resolve(message.result);
  }
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
});
const call = (method, params = {}) => new Promise((resolve, reject) => {
  const requestId = ++id;
  pending.set(requestId, { resolve, reject });
  socket.send(JSON.stringify({ id: requestId, method, params }));
});
const evaluate = async expression => {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const wait = delay => new Promise(resolve => setTimeout(resolve, delay));
const assert = (condition, label) => {
  if (!condition) throw new Error(label);
  console.log(`PASS ${label}`);
};
await call('Runtime.enable');
await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 960, deviceScaleFactor: 1, mobile: false });
await call('Page.navigate', { url: 'http://127.0.0.1:5173/portfolio/' });
await wait(1800);
await evaluate("document.querySelector('.boot-skip')?.click()");
await wait(300);
const open = async name => {
  await evaluate(`document.querySelector('[aria-label="Show applications"]').click()`);
  await wait(30);
  await evaluate(`(() => { const input=document.querySelector('[aria-label="Search applications"]'); input.value=${JSON.stringify(name)}; input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  await wait(30);
  await evaluate("document.querySelector('.command-palette button')?.click()");
  await wait(80);
};
await open('Files');
assert(await evaluate("!!document.querySelector('.files-app')"), 'Files opens');
await evaluate("[...document.querySelectorAll('.file-entry')].find(item=>item.textContent.includes('Projects')).click()");
assert(await evaluate("document.querySelectorAll('.file-entry').length === 12"), 'Files contains all project folders plus Portfolio');
await evaluate("document.querySelector('.file-entry').click()");
assert(await evaluate("!!document.querySelector('.file-preview img') && !!document.querySelector('.file-preview a')"), 'Project folder opens a preview and repository link');
await open('Calculator');
assert(await evaluate("!!document.querySelector('.calculator-app')"), 'Calculator opens');
for (const label of ['8', '×', '7', '=']) await evaluate(`document.querySelector('[aria-label="${label === '×' ? 'Multiply' : label === '=' ? 'Equals' : label}"]').click()`);
assert(await evaluate("document.querySelector('.calculator-display output').textContent === '56'"), 'Calculator evaluates multiplication');
await open('CV');
assert(await evaluate("document.querySelector('.resume-document').textContent.includes('Technical skills')"), 'Resume contains skills and work history');
await open('Settings');
await evaluate("[...document.querySelectorAll('.settings-options button')].find(button=>button.textContent.includes('Graphite')).click()");
assert(await evaluate("document.querySelector('.developer-os').dataset.theme === 'graphite'"), 'Settings changes theme');
await evaluate("document.querySelector('.settings-toggle input').click()");
assert(await evaluate("document.querySelector('.developer-os').dataset.animations === 'false'"), 'Settings disables animation');
await open('About');
assert(await evaluate("document.querySelector('.profile-photo').complete && document.querySelector('.profile-photo').naturalWidth > 0"), 'About photo loads');
await open('Contact');
assert(await evaluate("document.querySelectorAll('.contact-form input').length === 2 && !!document.querySelector('.contact-form textarea')"), 'Contact form is present');
await open('Terminal');
await evaluate("(() => { const input=document.querySelector('.terminal-app input'); input.value='whoami'; input.dispatchEvent(new Event('input',{bubbles:true})); input.closest('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})); })()");
assert(await evaluate("document.querySelector('.terminal-output').textContent.includes('Full-Stack Developer & AI Engineering Student')"), 'Terminal whoami reports current role');
await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await wait(150);
assert(await evaluate("document.documentElement.scrollWidth <= innerWidth"), 'No horizontal overflow on mobile');
assert(errors.length === 0, 'No runtime exceptions');
socket.close();
