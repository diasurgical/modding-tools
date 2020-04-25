# Helper script for generating tileset files using Open Source AMI

Open AMI only provides Shell scripts for Unix systems, the scripts here are ports of thoes Shell scripts to Windows Batch script.

## How to use this

First install Go and build [Open source-ami](https://github.com/sanctuary/opensource-ami).

Run get_tools.bat to extract the MPQ to a _dump_ folder and convert the content to open formats.

Please download the following file and extract it to the 'util' folder. It contains the "montage" utility that is required
for the scripts to stitch togeather the individual images: https://sergi4ua.github.io/cellar/montage.zip

Then run convert_mega_tilesets.bat to generate the PNG tilesets needed for mapping with [Tiled](https://www.mapeditor.org/)
**Note:** Make sure you running this scripts in a folder where _dump_ exists and contains all the required data.
