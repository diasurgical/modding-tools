var dunMapFormat = {
    name: "Diablo map format",
	extension: "dun",

	write: function(map, fileName) {
		var m = {
			width: map.width,
			height: map.height,
			layers: []
		};

		for (var i = 0; i < map.layerCount; i++) {
			var layer = map.layerAt(i);
			if (layer.isTileLayer) {
				var rows = [];
				for (var y = 0; y < layer.height; y++) {
					var row = [];
					for (var x = 0; x < layer.width; x++)
						row.push(layer.cellAt(x, y).tileId);
					rows.push(row);
				}
				m.layers.push(rows);
			}
		}

		var dpeiceIDs = m.layers[0]; // use layer 0 as dungeon piece ID layer.
		var tileIDs = [];
		for (var y = 0; y < m.height; y++) {
			var row = [];
			for (var x = 0; x < m.width; x++) {
				var tileID = dpeiceIDs[x][y] + 1;
				console.log(`tileID ${tileID}`);
				row.push(tileID);
			}
			tileIDs.push(row);
		}

		var dunWidth = m.width;
		var dunHeight = m.height;

		// DUN format:
		//    width:   uint16
		//    height:  uint16
		//    tileIDs: [width][height]uint16
		const buffer = new ArrayBuffer(2 * (1 + 1 + dunWidth * dunHeight));

		const view = new DataView(buffer);
		view.setInt16(0, dunWidth, true); // littleEndian=true
		view.setInt16(2, dunHeight, true);
		var i = 0;
		for (var y = 0; y < dunHeight; y++) {
			for (var x = 0; x < dunWidth; x++) {
				var tileID = tileIDs[x][y];
				// 1 for width, 1 for height, and i for tile IDs. each is 2 bytes in size.
				var offset = 2*(1 + 1 + i);
				view.setInt16(offset, tileID, true);
				i++;
			}
		}

		var file = new BinaryFile(fileName, BinaryFile.WriteOnly);
		file.write(buffer);
		file.commit();
	},
}

tiled.registerMapFormat("dun", dunMapFormat)

// Generated using `gen_tile_id_mapping`; DO NOT EDIT.
//townTileIDFromTile["{top=1257, right=259, left=1258, bottom=261}"] = 342;
//l1TileIDFromTile["{top=450, right=451, left=452, bottom=453}"] = 206;
//l2TileIDFromTile["{top=558, right=22, left=559, bottom=268}"] = 160;
//l3TileIDFromTile["{top=559, right=182, left=560, bottom=31}"] = 156;
//l4TileIDFromTile["{top=453, right=454, left=455, bottom=456}"] = 137;
