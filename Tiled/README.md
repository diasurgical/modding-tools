# Diablo 1 level editing with Tiled

We provide an extension that allows [Tiled](https://www.mapeditor.org/) to open and save to the DUN-file format used by Diablo. You will also find a series of prefabricated stamps, as well as an extensive set of rules for automating parts of the process of creating an interesting and detailed level.

![Diablo map in Tiled](docs/images/tiled.png)

## Setting up Tiled

### Installation

First step is to download and install [Tiled](https://www.mapeditor.org/), we recommend version 1.4 or higher as it makes setting up the tool a lot simpler, but 1.3 should also work.

Then download [this repository](https://github.com/diasurgical/modding-tools/archive/master.zip).

Next you will need a PNG version of the tile sheets, this can be done using [Open source-ami](https://github.com/sanctuary/opensource-ami). Follow the main usage instructions, then run the `convert_mega_tilesets`, `gen_monsters_tilset` and `gen_objects_tileset` scripts.

**Note**: for Windows users we provide a helper script in the [windows-x86-scripts folder](https://github.com/diasurgical/modding-tools/tree/master/windows-x86-scripts), this need to be used together with Open source-ami.

This should should give you the 7 needed PNG-files, placed them in the `Tiled/tilesets` folder of this repository's files.

    Tiled/tilesets/catacombs_mega_special.png
    Tiled/tilesets/cathedral_mega_special.png
    Tiled/tilesets/caves_mega.png
    Tiled/tilesets/hell_mega.png
    Tiled/tilesets/monsters.png
    Tiled/tilesets/objects.png
    Tiled/tilesets/tristram_mega_special.png

### Setting up tiled

From the menu select `Project->Project Properties`, here you need to point Tiled to the `extensions` folder and the `rules.txt` file:

![Project Properties](docs/images/project-properrties.png)

**Note**: Tiled 1.3 does not support projects so you would need to copy the files instead.

Next go to `Edit->Preferences->Interface` and change `Fine grid divisions` to `2`.

![Project Properties](docs/images/fine-grid-divisions.png)

Then from the `View` menu set `Snapping` to `Snap to Fine Grid`