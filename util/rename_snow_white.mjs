/*
    This script renames all files in ./src/assets/csv starting with
        the incorrect 'Snow_White_and_the_Seven_Dwarves'
        to the correct 'Snow_White_and_the_Seven_Dwarfs'
*/
import { readdir, rename } from 'fs/promises'
import { join } from 'path'

const assetPath = join('.', 'src', 'assets', 'csv')
const wrongSnowWhite = 'Snow_White_and_the_Seven_Dwarves'
const rightSnowWhite = 'Snow_White_and_the_Seven_Dwarfs'

try {
    const f = await readdir(assetPath)
    const wrongPrefix = f.filter(file => file.startsWith(wrongSnowWhite))

    await Promise.all[
        wrongPrefix.map(file => {
            const withPath = s => join(assetPath, s)
            const newFilename = file.slice().replace(wrongSnowWhite, rightSnowWhite)
            // console.log(`renaming ${file} to ${newFilename}`)
            return rename(withPath(file), withPath(newFilename))
        })
    ]
} catch (e) {
    console.error(e)
}
