@echo off
REM Prior to running this script, run:
REM til_dump -a
REM til_dump -special -a
title Mega Tile creator
echo Welcome! This batch script will create mega tiles for use with AJenbo's TilEd Diablo extension.
echo Original script by mewmew; converted to Windows x86 by Sergi4UA
echo Mega tiles will be placed in the WORLD directory
echo The script will be looking for tiles in _dump_ directory. Make sure it exists and have all the required data.
echo Press any key to continue...
pause > nul
echo Creating WORLD and subdirectories (may fail, don't worry) ...
mkdir WORLD > nul
mkdir WORLD\_assets_
mkdir WORLD\_assets_\_mega_tilesets_
echo 'Creating "WORLD\_assets_\_mega_tilesets_\tristram_mega.png"'
util\montage ^
	_dump_\_tiles_\town\town.pal\*.png ^
	-gravity south -geometry 128x+0+0 ^
	-tile 32x ^
	-background none ^
	WORLD\_assets_\_mega_tilesets_\tristram_mega.png

REM Render special tileset (e.g. trees) on top of mega tileset.

echo 'Creating "WORLD\_assets_\_mega_tilesets_\tristram_mega_special.png"'
util\montage ^
	_dump_\_tiles_special_\town\town.pal\*.png ^
	-gravity south -geometry 128x+0+0 ^
	-tile 32x ^
	-background none ^
	WORLD\_assets_\_mega_tilesets_\tristram_mega_special.png

REM --- [ Cathedral ] ------------------------------------------------------------

echo 'Creating "WORLD\_assets_\_mega_tilesets_\cathedral_mega.png"'
util\montage ^
	_dump_\_tiles_\l1\l1_1.pal\*.png ^
	-gravity south -geometry 128x+0+0 ^
	-tile 16x ^
	-background none ^
	WORLD\_assets_\_mega_tilesets_\cathedral_mega.png

REM Render special tileset (e.g. arches) on top of mega tileset.

echo 'Creating "WORLD\_assets_\_mega_tilesets_\cathedral_mega_special.png"'
util\montage ^
	_dump_\_tiles_special_\l1\l1_1.pal\*.png ^
	-gravity south -geometry 128x+0+0 ^
	-tile 16x ^
	-background none ^
	WORLD\_assets_\_mega_tilesets_\cathedral_mega_special.png

REM --- [ Catacombs ] ------------------------------------------------------------

echo 'Creating "WORLD\_assets_\_mega_tilesets_\catacombs_mega.png"'
util\montage ^
	_dump_\_tiles_\l2\l2_1.pal\*.png ^
	-gravity south -geometry 128x+0+0 ^
	-tile 16x ^
	-background none ^
	WORLD\_assets_\_mega_tilesets_\catacombs_mega.png

REM Render special tileset (e.g. arches) on top of mega tileset.

echo 'Creating "WORLD\_assets_\_mega_tilesets_\catacombs_mega_special.png"'
util\montage ^
	_dump_\_tiles_special_\l2\l2_1.pal\*.png ^
	-gravity south -geometry 128x+0+0 ^
	-tile 16x ^
	-background none ^
	WORLD\_assets_\_mega_tilesets_\catacombs_mega_special.png

REM --- [ Caves ] ----------------------------------------------------------------

echo 'Creating "WORLD\_assets_\_mega_tilesets_\caves_mega.png"'
util\montage ^
	_dump_\_tiles_\l3\l3_1.pal\*.png ^
	-gravity south -geometry 128x+0+0 ^
	-tile 16x ^
	-background none ^
	WORLD\_assets_\_mega_tilesets_\caves_mega.png

REM Note: Caves has no special tileset.

REM --- [ Hell ] -----------------------------------------------------------------

echo 'Creating "WORLD\_assets_\_mega_tilesets_\hell_mega.png"'
util\montage ^
	_dump_\_tiles_\l4\l4_1.pal\*.png ^
	-gravity south -geometry 128x+0+0 ^
	-tile 16x ^
	-background none ^
	WORLD\_assets_\_mega_tilesets_\hell_mega.png