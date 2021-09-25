/*
    This script gathers and prints all secondary movie titles
        in the /src/assets/csv/ directory
*/
import { readdir, writeFile } from 'fs/promises'
import { join, extname, dirname, parse, sep } from 'path'
import { fileURLToPath } from 'url';

const assetPath = join('.', 'src', 'assets', 'csv')
const titleSeparator = '-'

// https://stackoverflow.com/a/62892482
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
    const f = await readdir(assetPath)
    const withPath = s => join(assetPath, s)

    const csvFiles = f.filter(file => extname(file) === '.csv')

    const titles = new Set(
        csvFiles.map(f => f.split(titleSeparator)[1])  // only second side
            .map(f => f.replaceAll('.csv', ''))
    )

    // console.log(titles)
    // console.log(__dirname)
    const file = `${__dirname}${sep}secondary_titles.json`
    const data = JSON.stringify(Array.from(titles))
    console.log('writing into ', file, ' the data: ', data)
    await writeFile(file, data)

} catch (e) {
    console.error(e)
}
