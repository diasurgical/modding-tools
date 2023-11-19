# Diablo 1 monster modeling with Blender

After saving all animations as .cl2, update the monstdat.tsv file by adding the folder and the first part of the file name in `assetsSuffix`. Input the sprite width in the `width` column. Specify the length of each animation in the `frames[6]` column in the order of neutral, walk, attack, hit, death, special (use 0 if it doesn't exist). Set `animFrameNum` to the frame where the attack animation makes an impact, and similarly, do so for `animFrameNumSpecial` if there's a special animation.
