import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const token = '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';
  const owner = 'dtmdkm';
  const repo = 'ai-tools-hub';
  
  const files = ['HighLevel.png', 'focal.png'];
  const results = [];

  for (const filename of files) {
    const filePath = path.join(process.cwd(), 'public', filename);
    if (!fs.existsSync(filePath)) {
      results.push(`File not found: ${filePath}`);
      continue;
    }
    
    const content = fs.readFileSync(filePath, 'base64');
    
    let sha = null;
    try {
      const getFileRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/public/${filename}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'NodeJS'
        }
      });
      if (getFileRes.ok) {
        const data = await getFileRes.json();
        sha = data.sha;
      }
    } catch(e) {}
    
    const body: any = {
      message: `Upload binary image ${filename}`,
      content: content
    };
    if (sha) body.sha = sha;

    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/public/${filename}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'NodeJS'
        },
        body: JSON.stringify(body)
      });
      
      const responseData = await res.json();
      results.push({ filename, status: res.status, data: responseData });
    } catch(err) {
      results.push({ filename, error: String(err) });
    }
  }

  return NextResponse.json({ success: true, results });
}
