const fs = require('fs');
const path = require('path');

const traverse = (dir, result = []) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverse(fullPath, result);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            result.push(fullPath);
        }
    });
    return result;
}

const allFiles = traverse(path.join(process.cwd(), 'src'));
const visited = new Set();
const queue = [path.join(process.cwd(), 'src', 'main.jsx')];

while(queue.length > 0) {
    const current = queue.shift();
    if(visited.has(current)) continue;
    visited.add(current);
    
    if(!fs.existsSync(current)) continue;
    
    const content = fs.readFileSync(current, 'utf-8');
    const imports = [...content.matchAll(/from\s+['"]([^'"]+)['"]/g), ...content.matchAll(/import\s+['"]([^'"]+)['"]/g)];
    
    imports.forEach(match => {
        let importPath = match[1];
        if(!importPath.startsWith('.')) return; 
        
        let target = path.join(path.dirname(current), importPath);
        
        if(fs.existsSync(target + '.jsx')) target += '.jsx';
        else if(fs.existsSync(target + '.js')) target += '.js';
        else if(fs.existsSync(path.join(target, 'index.jsx'))) target = path.join(target, 'index.jsx');
        else if(fs.existsSync(path.join(target, 'index.js'))) target = path.join(target, 'index.js');
        else if(fs.existsSync(target)) target = target;
        
        if(!visited.has(target)) {
            queue.push(target);
        }
    });
}

const unused = allFiles.filter(f => !visited.has(f));
console.log('---UNUSED FILES START---');
unused.forEach(f => console.log(f));
console.log('---UNUSED FILES END---');
