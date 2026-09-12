<template>
  <div class="calculator-app" tabindex="0" aria-label="Calculator, keyboard supported" @keydown="onKeydown">
    <div class="calculator-panel"><p class="eyebrow">STANDARD CALCULATOR</p><div class="calculator-display"><span>{{ expression || 'Ready' }}</span><output aria-live="polite">{{ display }}</output></div>
      <div class="calculator-keys"><button v-for="key in keys" :key="key.label" :class="{ operator: key.type === 'operator', equals: key.label === '=' }" :aria-label="key.aria || key.label" @click="press(key.label)">{{ key.label }}</button></div>
      <p class="calculator-hint">Use your keyboard. Enter = calculate · Esc = clear</p>
    </div>
    <aside class="calculator-history"><h3>History</h3><p v-if="!history.length">Your calculations will appear here.</p><ol v-else><li v-for="(entry,index) in history" :key="index">{{ entry }}</li></ol><button v-if="history.length" class="ubuntu-secondary" @click="history = []">Clear history</button></aside>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const display = ref('0'); const expression = ref(''); const history = ref([]);
let accumulator = null; let operator = null; let replace = true; let lastOperator = null; let lastOperand = null;
const keys = [
  {label:'AC',aria:'Clear all'}, {label:'⌫',aria:'Backspace'}, {label:'%',aria:'Percent'}, {label:'÷',type:'operator',aria:'Divide'},
  ...['7','8','9'].map(label=>({label})), {label:'×',type:'operator',aria:'Multiply'},
  ...['4','5','6'].map(label=>({label})), {label:'−',type:'operator',aria:'Subtract'},
  ...['1','2','3'].map(label=>({label})), {label:'+',type:'operator',aria:'Add'},
  {label:'±',aria:'Change sign'}, {label:'0'}, {label:'.',aria:'Decimal point'}, {label:'=',aria:'Equals'},
];
function clear() { display.value='0'; expression.value=''; accumulator=null; operator=null; lastOperator=null; lastOperand=null; replace=true; }
function calculate(left,right,op) { if(op==='÷' && right===0) return null; const result=op==='+'?left+right:op==='−'?left-right:op==='×'?left*right:left/right; return Number.isFinite(result) ? Number(result.toPrecision(12)) : null; }
function setResult(result) { display.value=result===null?'Error':String(result); if(result===null){accumulator=null;operator=null;lastOperator=null;lastOperand=null;} replace=true; }
function press(key) {
  if(key==='AC'){clear();return;}
  if(display.value==='Error') clear();
  if(/^\d$/.test(key) || key==='.') {
    if(replace){display.value=key==='.'?'0.':key;replace=false;} else if(key==='.' && !display.value.includes('.'))display.value+='.'; else if(key!=='.' && display.value.replace('-','').length<15)display.value=display.value==='0'?key:display.value+key;
    return;
  }
  if(key==='⌫'){display.value=display.value.length>1?display.value.slice(0,-1):'0';if(display.value==='-')display.value='0';replace=false;return;}
  if(key==='±'){if(Number(display.value)!==0)display.value=String(-Number(display.value));return;}
  if(key==='%'){display.value=String(Number((Number(display.value)/100).toPrecision(12)));return;}
  if(['+','−','×','÷'].includes(key)){
    if(operator && !replace){const result=calculate(accumulator,Number(display.value),operator);setResult(result);if(result===null)return;}
    accumulator=Number(display.value);operator=key;expression.value=`${display.value} ${key}`;replace=true;lastOperator=null;return;
  }
  if(key==='='){
    const op=operator || lastOperator; if(!op)return;
    const left=operator?accumulator:Number(display.value);const right=operator?Number(display.value):lastOperand;
    const result=calculate(left,right,op);expression.value=`${left} ${op} ${right} =`;setResult(result);
    if(result!==null){history.value.unshift(`${expression.value} ${result}`);history.value=history.value.slice(0,10);lastOperator=op;lastOperand=right;}
    operator=null;accumulator=null;
  }
}
function onKeydown(event){if(event.ctrlKey || event.metaKey || event.altKey)return; const map={'*':'×','/':'÷','-':'−',Enter:'=',Escape:'AC',Backspace:'⌫',Delete:'AC'};const key=map[event.key] || event.key;if(/^\d$/.test(key)||['.','+','−','×','÷','=','AC','⌫','%'].includes(key)){event.preventDefault();press(key);}}
</script>
