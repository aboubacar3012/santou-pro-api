import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as marked from 'marked';

@Injectable()
export class AppService {
  getDoc(): string {
    try {
      // Read the README.md file
      const readmePath = join(process.cwd(), 'README.md');
      const readmeContent = readFileSync(readmePath, 'utf8');

      // Convert markdown to HTML
      const htmlContent = marked.parse(readmeContent);

      // Return HTML with basic styling
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>SantuPro API Documentation</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                max-width: 900px;
                margin: 0 auto;
                padding: 20px;
              }
              pre {
                background-color: #f4f4f4;
                padding: 10px;
                border-radius: 5px;
                overflow-x: auto;
              }
              code {
                font-family: monospace;
                background-color: #f4f4f4;
                padding: 2px 4px;
                border-radius: 3px;
              }
              h1, h2 {
                border-bottom: 1px solid #eaecef;
                padding-bottom: 0.3em;
              }
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `;
    } catch (error) {
      console.error('Error reading or parsing README:', error);
      return 'Error loading documentation. Please check the server logs.';
    }
  }
}
