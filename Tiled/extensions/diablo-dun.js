var trans;

var dunMapFormat = {
    name: "Diablo map format",
	extension: "dun",

	write: function(map, fileName) {
		// Convert to dPiece coords
		var dunWidth = map.width * 2;
		var dunHeight = map.height * 2;

		// Init .dun layer arrays
		var tileIDs = Array(map.width).fill().map(()=>Array(map.height).fill(0));
		var monstIds = Array(dunWidth).fill().map(()=>Array(dunHeight).fill(0));
		var objIds = Array(dunWidth).fill().map(()=>Array(dunHeight).fill(0));
		trans = Array(dunWidth).fill().map(()=>Array(dunHeight).fill(0));

		// Combine layers
		for (var i = 0; i < map.layerCount; i++) {
			var layer = map.layerAt(i);
			if (layer.isTileLayer) {
				for (var y = 0; y < layer.height; y++) {
					for (var x = 0; x < layer.width; x++) {
						tileIDs[x][y] = layer.cellAt(x, y).tileId + 1;
					}
				}
			} else if (layer.isObjectLayer) {
				for (var j = 0; j < layer.objectCount; j++) {
					var obj = layer.objects[j];
					if (!obj)
						continue; // Skip recently deleted objects
					var x = obj.x / 32 - 1;
					var y = obj.y / 32 - 1;
					console.log(obj.tile ? obj.tile.type : null);
					if (obj.tile && obj.tile.tileset.name == "monsters") {
						monstIds[x][y] = obj.tile.id + 1;
					} else if (obj.tile && obj.tile.tileset.name == "objects") {
						objIds[x][y] = objectIdMap[obj.tile.id];
					} else if (obj.type == "transparancy") {
						applyTransparancy(dunWidth, dunHeight, obj);
					}
				}
			}
		}

		// Reserve buffer in size of file
		const buffer = new ArrayBuffer(2 * ( // uint16
			1 + 1 // width  and height
			+ map.width * map.height // tiles
			+ dunWidth * dunHeight // unused
			+ dunWidth * dunHeight // monsters
			+ dunWidth * dunHeight // objects
			+ dunWidth * dunHeight // transparancy
		));

		const view = new DataView(buffer);
		var i = 0; // uint offset

		 // width
		view.setInt16(2 * i++, map.width, true); // littleEndian=true
		 // height
		view.setInt16(2 * i++, map.height, true);

		// Tiles
		for (var y = 0; y < map.height; y++) {
			for (var x = 0; x < map.width; x++) {
				view.setInt16(2 * i++, tileIDs[x][y], true);
			}
		}

		// Skip unused layer
		i += dunWidth * dunHeight;

		// Monsters
		for (var y = 0; y < dunHeight; y++) {
			for (var x = 0; x < dunWidth; x++) {
				view.setInt16(2 * i++, monstIds[x][y], true);
			}
		}
		// Objects
		for (var y = 0; y < dunHeight; y++) {
			for (var x = 0; x < dunWidth; x++) {
				view.setInt16(2 * i++, objIds[x][y], true);
			}
		}
		// Transparancy
		for (var y = 0; y < dunHeight; y++) {
			for (var x = 0; x < dunWidth; x++) {
				view.setInt16(2 * i++, trans[x][y], true);
			}
		}

		// Write to file
		var file = new BinaryFile(fileName, BinaryFile.WriteOnly);
		file.write(buffer);
		file.commit();
	},
}

/** Map object tileset to dun ids (ObjTypeConv) */
var objectIdMap = [
	105, 5, 0, 108, 0, 7, 6, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
	15, 0, 16, 0, 0, 0, 19, 21, 77, 0, 80, 0, 83, 0, 0, 2, 3, 4, 0, 0,
	30, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 36, 37, 0, 0, 112, 65, 91,
	0, 0, 0, 0, 38, 39, 51, 0, 70, 71, 72, 73, 74, 75, 76, 53, 54, 55,
	56, 57, 58, 59, 0, 109, 0, 0, 111, 110, 0, 0,
];

/**
 * Mark dPieces with in transparent areas with the transparancy id
 */
function applyTransparancy(width, height, obj) {
	if (obj.shape == MapObject.Rectangle) {
		var polygon = [
			{x: obj.x, y: obj.y },
			{x: obj.x + obj.width, y: obj.y },
			{x: obj.x + obj.width, y: obj.y + obj.height },
			{x: obj.x, y: obj.y + obj.height },
			{x: obj.x, y: obj.y },
		];
	} else if (obj.shape == MapObject.Polygon) {
		polygon = obj.polygon;
		for (var i = 0; i < polygon.length; i++) {
			polygon[i].x += obj.x;
			polygon[i].y += obj.y;
		}
	} else {
		console.log("unsupported transparancy shape on object");
		return;
	}

	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			if (inside(x, y, polygon)) {
				trans[x][y] = obj.id;
			}
		}
	}
}

/**
 * Check if a cordinate is inside a polygon
 * @see http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
 */
function inside(x, y, polygon) {
    var inside = false;
    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        var xi = polygon[i].x / 32, yi = polygon[i].y / 32 + 1;
        var xj = polygon[j].x / 32, yj = polygon[j].y / 32 + 1;

        var intersect = ((yi > y) != (yj > y))
            && (x <= (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

tiled.registerMapFormat("dun", dunMapFormat)
