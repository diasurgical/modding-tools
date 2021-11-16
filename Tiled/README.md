# Diablo 1 level editing with Tiled

We provide an extension that allows [Tiled](https://www.mapeditor.org/) to open and save to the DUN-file format used by Diablo. You will also find a series of prefabricated stamps, as well as an extensive set of rules for automating parts of the process of creating an interesting and detailed level.

![Diablo map in Tiled](docs/images/tiled.png)

## Setting up Tiled

### Installation

First step is to download and install [Tiled](https://www.mapeditor.org/), we recommend version 1.4 or higher as it makes setting up the tool a lot simpler, but 1.3 should also work.

Then download [this repository](https://github.com/diasurgical/modding-tools/archive/master.zip).

Next, you will need an MPQ Editor to extract the necessary files, downloads are available at the top of the page: [Ladik's MPQ Editor](http://www.zezula.net/en/mpq/download.html).

Open diabdat.mpq, and later hellfire.mpq.
![openmpq](https://user-images.githubusercontent.com/60329165/142060379-a58d7856-1ea4-4253-b446-a803e1cc44ef.png)

It will ask for a listfile, scroll to the bottom of the page: [Listfile](http://www.zezula.net/en/mpq/download.html#ListFiles).

Click the three dots ... on the top right, highlighted in blue to provide the MPQ editor with the listfile.
![Listfile](https://user-images.githubusercontent.com/60329165/142060849-2c75231c-3133-4722-ac8f-c7e5d6ab003a.png)

Once the mpqs are opened with the listfile, you must extract the 'levels' folder from diabdat.mpq and the 'Nlevels' folder from hellfire.mpq

Next you will need a .png version of the tile sheets, this can be done using [Diablo 1 Graphics Tool](https://github.com/savagesteel/d1-graphics-tool).

Once in D1GraphicsTool, open each level .cel file:

![cel](https://user-images.githubusercontent.com/60329165/142061417-9965d037-59c0-4823-84e2-44d376d2ff84.png)

Export each .cel, one at a time, into a .png spritesheet with the following settings:

![image](https://user-images.githubusercontent.com/204594/141985706-009e97d7-2abc-413b-ab14-0860a3a86198.png)

If you wish to get the spritesheet for Hellfire's town, instead of Vanilla, you must use the town.cel file in the 'Nlevels' folder extracted from hellfire.mpq.

This should should give you the 7 needed PNG-files for the tiles. Place them in the `Tiled/tilesets` folder of this repository's files.

    Tiled/tilesets/l1_til.png
    Tiled/tilesets/l2_til.png
    Tiled/tilesets/l3_til.png
    Tiled/tilesets/l4_til.png
    Tiled/tilesets/l5_til.png
    Tiled/tilesets/l6_til.png
    Tiled/tilesets/town_til.png
    
*Note that D1Graphicstool cannot export spritesheets for monsters and objects.

### Setting up tiled

From the menu select `Project->Project Properties`, here you need to point Tiled to the `extensions` folder and the `rules.txt` file:

![Project Properties](docs/images/project-properrties.png)

**Note**: Tiled 1.3 does not support projects so you would need to copy the files instead.

Next go to `Edit->Preferences->Interface` and change `Fine grid divisions` to `2`.

![Project Properties](docs/images/fine-grid-divisions.png)

Then from the `View` menu set `Snapping` to `Snap to Fine Grid`
