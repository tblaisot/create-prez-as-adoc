#!/usr/bin/env node

import ejs from 'ejs';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import enquirer from 'enquirer';

const prompt = enquirer.prompt;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const author = process.env.npm_config_init_author_name || 'FIXME';
const license = process.env.npm_config_init_license || 'FIXME';


async function render(templatePath, targetPath, data) {
  const content = await fs.readFile(templatePath, 'utf-8');
  const rendered = ejs.render(content, data, { escape: (text) => text });
  await fs.outputFile(targetPath, rendered);
}

async function copyOrRender(sourceDir, targetDir, data) {
  const items = await fs.readdir(sourceDir);

  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const stats = await fs.stat(sourcePath);

    if (stats.isDirectory()) {
      await copyOrRender(sourcePath, path.join(targetDir, item), data);
    } else {
      if (item.endsWith('.ejs')) {
        const targetPath = path.join(targetDir, item.replace('.ejs', ''));
        await render(sourcePath, targetPath, data);
      } else {
        const targetPath = path.join(targetDir, item);
        await fs.copy(sourcePath, targetPath);
      }
    }
  }
}

async function init() {
  let projectName = process.argv[2];
  // 2. Fallback to Prompt
  if (!projectName) {
    const { inputName } = await prompt({
      type: 'input',
      name: 'inputName',
      message: 'Project name:',
      initial: path.basename(process.cwd())
    });
    projectName = inputName;
  }
  const targetDir = path.resolve(process.cwd(), projectName);

  console.log(`Initializing project in ${targetDir}...`);

  const templateDir = path.resolve(__dirname, '../templates/root');
  const data = {
    projectName: projectName,
    author: author,
    license: license,
    copyright: 'No copyright'
  };

  await copyOrRender(templateDir, targetDir, data);
  const color = (text, code) => `\x1b[${code}m${text}\x1b[0m`;
  const bold = (text) => color(text, 1);
  const cyan = (text) => color(text, 36);

  console.log('\n' + bold('Project initialized successfully!'));
  console.log('\nNext steps:');
  console.log(`  ${cyan(`cd ${projectName}`)}`);
  console.log(`  ${cyan('npm install')}`);
  console.log(`  ${cyan('npm run dev')}   # To start the development server`);
  console.log(`  ${cyan('npm run build')} # To build the slides for production`);
}

init().catch(err => {
  console.error(err);
  process.exit(1);
});
