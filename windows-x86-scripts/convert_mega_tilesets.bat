REM Prior to running this script, run:
REM til_dump -a
REM til_dump -special -a
@echo off
title Mega Tile creator
echo Welcome! This batch script will create mega tiles for use with AJenbo's TilEd Diablo extension.
echo Original script by mewmew; converted to Windows x86 by Sergi4UA
echo Mega tiles will be placed in the WORLD directory
echo The script will be looking for tiles in _dump_ directory. Make sure it exists and have all the required data.
echo Press any key to continue...
pause > nul
echo Creating WORLD...
mkdir WORLD > nul
echo Creating TRISTRAM...
util\montage _dump_\_tiles_\town\town.pal\*.png -gravity south -geometry 120x+0+0 -tile 32x -background none WORLD\tristram.png
echo Creating CATHEDRAL...
util\montage _dump_\_tiles_\l1\l1_1.pal\*.png -gravity south -geometry 120x+0+0 -tile 16x -background none WORLD\cathedral.png
echo Creating CATACOMBS...
util\montage _dump_\_tiles_\l2\l2_1.pal\*.png -gravity south -geometry 120x+0+0 -tile 16x -background none WORLD\catacombs.png
echo Creating CAVES
util\montage _dump_\_tiles_\l3\l3_1.pal\*.png -gravity south -geometry 120x+0+0 -tile 16x -background none WORLD\caves.png
echo Creating HELL
util\montage _dump_\_tiles_\l4\l4_1.pal\*.png -gravity south -geometry 120x+0+0 -tile 16x -background none WORLD\hell.png
echo Creating special tiles for: Tristram
util\montage ^
	_dump_\_tiles_special_\town\town.pal\*.png ^
	-gravity south -geometry 128x+0+0 ^
	-tile 32x ^
	-background none ^
	_assets_\_mega_tilesets_\tristram_mega_special.png
echo Creating special tiles for: Cathedral
util\montage ^
	_dump_\_tiles_special_\l1\l1_1.pal\*.png ^
	-gravity south -geometry 128x+0+0 ^
	-tile 16x ^
	-background none ^
	_assets_\_mega_tilesets_\cathedral_mega_special.png
echo Creating special tiles for: Catacombs
util\montage ^
	_dump_\_tiles_special_\l2\l2_1.pal\*.png ^
	-gravity south -geometry 128x+0+0 ^
	-tile 16x ^
	-background none ^
	_assets_\_mega_tilesets_\catacombs_mega_special.png
echo Done! :)
pause