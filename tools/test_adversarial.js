const {STROKES}=require('../strokes.js');const {Evaluator:E,Math2D:M}=require('../engine.js');
function rnd(s){let x=s;return()=>{x=(x*16807)%2147483647;return x/2147483647-0.5}}
const out={抄捷徑卻通過:[],手抖卻失敗:[],平行偏出卻通過:[],只寫六成卻通過:[],沒寫鉤卻通過:[]};
for(const s of STROKES){const p=s.points,d=M.densify(p,1);
 const hasTurn=(s.keyPoints||[]).some(k=>k.type==='turn'||k.type==='hook');
 if(hasTurn&&s.name!=='捺'&&E.evaluate(M.densify([p[0],p[p.length-1]],1),s).ok)out.抄捷徑卻通過.push(s.id+s.name);
 const r=rnd(7+ +s.id.replace('-',''));let f=0;for(let t=0;t<5;t++){if(!E.evaluate(d.map(q=>[q[0]+r()*8,q[1]+r()*8]),s).ok)f++}
 if(f)out.手抖卻失敗.push(s.id+s.name+':'+f+'/5');
 if(E.evaluate(d.map((q,i)=>i<3?q:[q[0]+12,q[1]+12]),s).ok)out.平行偏出卻通過.push(s.id+s.name);
 if(E.evaluate(d.slice(0,Math.floor(d.length*0.6)),s).ok)out.只寫六成卻通過.push(s.id+s.name);
 if(/鉤/.test(s.name)&&E.evaluate(M.densify(p.slice(0,-1),1),s).ok)out.沒寫鉤卻通過.push(s.id+s.name);
}
console.log(JSON.stringify(out,null,1));
