import fs from 'fs';
import path from 'path';

// Files to fix
const files = [
  'api/src/routes/decks.ts',
  'api/src/routes/quiz.ts', 
  'api/src/routes/leaderboard.ts'
];

files.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix error responses to include success: false
    content = content.replace(
      /res\.status\(\d+\)\.json\(\{\s*message:/g,
      'return res.status($1).json({\n        success: false,\n        message:'
    );
    
    // Fix missing return statements
    content = content.replace(
      /res\.status\(\d+\)\.json\(\{/g,
      'return res.status($1).json({'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${filePath}`);
  }
});

console.log('Done fixing API errors');
