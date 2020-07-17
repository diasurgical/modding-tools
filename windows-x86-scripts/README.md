# Windows script for generating tile sheets using Open Source AMI

[Open source AMI](https://github.com/sanctuary/opensource-ami) only provides Shell scripts for Unix systems, the scripts here are ports of thoes Shell scripts to Windows Batch script.

## How to use this

First download and install [Go](https://golang.org/).

Run `get_tools.bat` to fetch and build the tools from Open Source AMI.

Run the [make](http://gnuwin32.sourceforge.net/packages/make.htm) script from Open Source AMI to extract the content of the diabdat.mpq and convert the tiles to PNG files.

Next download the following file and extract it to the 'util' folder. It contains the "montage" and "convert" utilities that are required
for the scripts: https://sergi4ua.github.io/cellar/montage.zip

Then run `convert_mega_tilesets.bat` to generate the PNG tile seets needed for mapping with [Tiled](https://www.mapeditor.org/)

**Note:** Make sure you running this scripts in the folder where all the converted MPQ content has been placed in a `_dump_` folder.

All converted images will be saved in the 'WORLD' directory.