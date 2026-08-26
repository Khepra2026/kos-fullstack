const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const publicDir = path.join(__dirname,'public');
console.log("Public dir exists?", fs.existsSync(publicDir), "files:", fs.existsSync(publicDir)?fs.readdirSync(publicDir):[]);

app.use(express.json());
app.get('/health',(req,res)=>res.json({status:"ONLINE",system:"KOS RegTech Enterprise Hub",version:"3.0.0",timestamp:new Date().toISOString(),uptime:process.uptime()}));
app.use(express.static(publicDir, { index: 'index.html', fallthrough: true }));

app.get('*',(req,res)=>{
  if(req.path.startsWith('/api') || req.path.startsWith('/health')) return res.status(404).json({error:"Not found API"});
  const indexPath = path.join(publicDir,'index.html');
  console.log("Serving",req.url,"->",indexPath, "exists?", fs.existsSync(indexPath));
  if(fs.existsSync(indexPath)) return res.sendFile(indexPath);
  res.status(404).send("Not Found - public/index.html missing in image: "+fs.readdirSync(publicDir).join(','));
});

const PORT = parseInt(process.env.PORT||4000,10);
app.listen(PORT,'0.0.0.0',()=>console.log(`KOS running on 0.0.0.0:${PORT}`));