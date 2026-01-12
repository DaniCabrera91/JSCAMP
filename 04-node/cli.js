import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

/* 
console.log(process.argv);

Los argumentos que pasemos nosotros seran a partir del indice 2
por que los dos primeros son la ruta de node y la ruta del archivo

const args = process.argv.slice(2);
console.log('Arguments:', args); 

*/

// 1. Recuperar la carpeta a listar:
const dir = process.argv[2] ?? '.'

// 2. Formateo simple de los tamaños:
const formatBytes = (size) => {
    if (size < 1024) return `${size} B`
    return `${(size / 1024).toFixed(2)} KB`
}

// 3. Leer los nombres, sin info:
const files = await readdir(dir)

// 4. Recuperar la info de cada file:
const entries = await Promise.all(
    files.map(async (name) => {
        const fullPath = join(dir, name)
        const info = await stat(fullPath)
        return {
            name,
            isDir: info.isDirectory(),
            size: formatBytes(info.size)
        }
    })
)


// Opcional: ordenar los directorios primero
// que aparezcan las carpetas antes que los ficheros
// que estén en orden alfabético 
// filter para tener en cuenta flags como --files-only o --dirs-only



// 5. Mostrar la info: Iconos + si es un dir - y si es file el tamaño
for (const entry of entries) {
    const icon = entry.isDir ? '📁' : '📄'
    const size = entry.isDir ? '-' : `${entry.size}`
    console.log(`${icon} ${entry.name.padEnd(25)} ${size}`); 
}