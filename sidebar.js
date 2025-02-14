import path from 'node:path';
import fs from 'node:fs';

const DIR_PATH = path.resolve()
const WHITE_LIST = ['index.md', '.vitepress', 'node_modules', '.idea', 'assets']


const isDirectory = (path) => fs.lstatSync(path).isDirectory()

const intersections = (arr1, arr2) => Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))))

function getList(params, path1, pathname) {
    const res = []
    for (let file in params) {
        const dir = path.join(path1, params[file])
        const isDir = isDirectory(dir)
        if (isDir) {
            const files = fs.readdirSync(dir)
            res.push({
                text: params[file],
                collapsible: true,
                items: getList(files, dir, `${pathname}/${params[file]}`),
            })
        } else {
            const name = path.basename(params[file])
            const suffix = path.extname(params[file])
            if (suffix !== '.md') {
                continue
            }
            const nameWithoutExtension = path.basename(params[file], '.md');
            res.push({
                text: nameWithoutExtension,
                link: `${pathname}/${name}`,
            })
        }
    }
    return res
}

export const set_sidebar = (pathname) => {
    const dirPath = path.join(DIR_PATH, pathname)
    const files = fs.readdirSync(dirPath)
    const items = intersections(files, WHITE_LIST)
    return getList(items, dirPath, pathname)
}