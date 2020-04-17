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
						monstIds[x][y] = monsterIdMap[obj.tile.id];
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

var monsterIdMap = [
	1,2,3,4, // Zombies
	5,6,7,8, // Fallen spear
	9,10,11,12, // Skeleton axe
	13,14,15,16, // Fallen
	17,18,19,20, // Scavangers
	21,22,23,24, // Skelleton bow
	25,26,27,28, // Skelleton sword
	0, // Invisible Lord
	29,30,31,32, // Hidden
	0, // Lord Sayter
	33,34,35,36, // Goat men
	37,39,38,40, // Bats
	41,42,43,44, // Goat bow
	45,46,47,48, // Acid
	49, // Skeleton king
	0, // Butcher
	50,51,52,53, // Overloards
	// 54,55,56,57 // Worms
	58,59,60,61, // Magma
	62,63,64,65, // Rhino
	66,67,68,69, // Bondemons
	74,75,76,77, // Firemen
	83,82,84,85, // Thunder
	127, // Big fallen
	86,87,88,89, // Garboyl
	90,91,92,93, // Balrog
	94,95,96,97, // Vipers
	98,99,100,101, // Black knight
	102,103,104,105, // Unraveler
	106,107,108,109, // Succubi
	110,111,112,113, // Counselor
	117, // Golem
	115, // Diablo
	128, // Malignus
];

/** Map object tileset to dun ids (ObjTypeConv) */
var objectIdMap = [
	105,5,
	123, // DevilutionX
	108,
	124, // DevilutionX
	7,6,8,
	118,119,120,121,122,138,129, // DevilutionX
	0, // object ID 52
	145,146, // DevilutionX
	0, // object ID 88
	14,
	0, // object ID 64
	15,
	0, // object ID 61
	16,
	0, // object ID 91
	0, // object ID 65
	0, // object ID 87
	19,21,77,
	0, // object ID 68
	80,
	137, // DevilutionX
	83,
	0, // object ID 70
	0, // object ID 97
	2,3,4,
	136,127, // DevilutionX
	30,
	133, // DevilutionX
	9,
	139,140,141,142,143,144, // DevilutionX
	1,
	116,131,147, // DevilutionX
	36,37,
	134,128, // DevilutionX
	112,65,91,
	130,113,132,117, // DevilutionX
	38,39,51,135,70,71,72,73,74,75,76,
	53,54,55,56,57,58,59,
	0, // object ID 56
	109,
	125,126, // DevilutionX
	111,110,
	115,114, // DevilutionX
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
