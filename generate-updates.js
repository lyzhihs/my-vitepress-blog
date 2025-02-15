const fs = require('fs');
const path = require('path');

// 根路径
const rootDir = __dirname;  // my-vitepress-blog 根路径
const updatesFilePath = path.join(rootDir, 'updates.md');

// 递归扫描文件夹，获取所有 .md 文件（排除 index.md 和 README.md 和 node_modules 文件夹）
const getArticlesUpdates = (dir) => {
  let articles = [];

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    // 排除 node_modules 文件夹
    if (file === 'node_modules') continue;

    if (stats.isDirectory()) {
      // 如果是文件夹，则递归扫描该文件夹
      articles = articles.concat(getArticlesUpdates(filePath));
    } else if (file.endsWith('.md') && file !== 'index.md' && file !== 'readme.md' && file !== 'updates.md' && file !== 'README.md') {
      // 如果是 .md 文件且不是 index.md 和 README.md，则处理
      const updateDate = stats.mtime.toLocaleDateString();
      articles.push({
        title: file.replace('.md', ''),
        path: path.relative(rootDir, filePath),  // 计算相对于根路径的相对路径
        updateDate,
        timestamp: stats.mtime.getTime()  // 使用文件的时间戳用于排序
      });
    }
  }

  // 按照时间戳排序（降序，最新的文件排在前面）
  return articles.sort((a, b) => b.timestamp - a.timestamp);
};

// 生成更新页面内容
const generateUpdatesPage = () => {
  const articles = getArticlesUpdates(rootDir);
  let content = '# 文章更新\n\n';

  articles.forEach(article => {
    content += `- **[${article.title}](${article.path})** - 更新日期: ${article.updateDate}\n`;
  });

  fs.writeFileSync(updatesFilePath, content, 'utf-8');
};

// 执行生成操作
generateUpdatesPage();
console.log('文章更新页面已生成');
