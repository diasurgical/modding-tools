var trans;

var dunMapFormat = {
	name: "Diablo map format",
	extension: "dun",

	read: function(fileName) {
		var file = new BinaryFile(fileName, BinaryFile.ReadOnly);
		const buffer = file.readAll();
		const view = new DataView(buffer);
		var i = 0; // uint16 offset

		var map = new TileMap();
		map.tileWidth = 128;
		map.tileHeight = 64;
		map.orientation = TileMap.Isometric;
		map.width = view.getInt16(2 * i++, true);
		map.height = view.getInt16(2 * i++, true);

		var mainTileset;
		var monsterTileset;
		var objectTileset;
		for (var t = 0; t < tiled.openAssets.length; t++) {
			if (!tiled.openAssets[t].isTileset) {
				continue;
			}
			if (tiled.openAssets[t].name == "objects") {
				objectTileset = tiled.openAssets[t];
			} else if (tiled.openAssets[t].name == "monsters") {
				monsterTileset = tiled.openAssets[t];
			} else {
				mainTileset = tiled.openAssets[t];
			}
			map.addTileset(tiled.openAssets[t]);
		}
		if (!mainTileset) {
			tiled.alert("You must have the dungion tilset open or no tiles will be loaded");
		}
		if (!monsterTileset) {
			tiled.alert("You must have the monster tilset open or no monsters will be loaded");
		}
		if (!objectTileset) {
			tiled.alert("You must have the monster tilset open or no objects will be loaded");
		}

		layer = new TileLayer("Tile Layer 1");
		layer.width = map.width;
		layer.height = map.height;
		layer.size = Qt.size(map.width, map.height);
		tiles = layer.edit();

		// Apply all the tiles
		for (var y = 0; y < layer.height; y++) {
			for (var x = 0; x < layer.width; x++) {
				tileID = view.getInt16(2 * i++, true);
				if (tileID == 0 || !mainTileset) {
					continue;
				}

				tiles.setTile(x, y, mainTileset.tile(tileID - 1));
			}
		}
		tiles.apply();

		map.addLayer(layer);

		// Convert to dPiece coords
		var dunWidth = map.width * 2;
		var dunHeight = map.height * 2;

		// Skip unused layer
		i += dunWidth * dunHeight;

		if (buffer.byteLength <= i * 2) {
			return map;
		}

		// Monsters
		var monsters = new ObjectGroup("Monsters");
		for (var y = 0; y < dunHeight; y++) {
			for (var x = 0; x < dunWidth; x++) {
				var monsterId = view.getInt16(2 * i++, true);
				if (!monsterId || !monsterTileset) {
					continue;
				}
				var monster = new MapObject();
				monster.x = (x + 1) * 32;
				monster.y = (y + 1) * 32;
				var mi = monsterIdToTileId[monsterId - 1];
				if (mi == -1) {
					tiled.alert("Unknown monster id: " + monsterId);
					continue;
				}
				monster.tile = monsterTileset.tile(mi);
				monster.width = monster.tile.width;
				monster.height = monster.tile.height;
				monsters.addObject(monster);
			}
		}
		map.addLayer(monsters);

		if (buffer.byteLength <= i * 2) {
			return map;
		}

		// Objects
		var objects = new ObjectGroup("Objects");
		for (var y = 0; y < dunHeight; y++) {
			for (var x = 0; x < dunWidth; x++) {
				var objectId = view.getInt16(2 * i++, true);
				if (!objectId || !objectTileset) {
					continue;
				}
				var object = new MapObject();
				object.x = (x + 1) * 32;
				object.y = (y + 1) * 32;
				var oi = objectIdToTileId[objectId];
				if (oi == -1) {
					tiled.alert("Unknown object id: " + objectId);
					continue;
				}
				object.tile = objectTileset.tile(oi);
				object.width = object.tile.width;
				object.height = object.tile.height;
				objects.addObject(object);
			}
		}
		map.addLayer(objects);

		if (buffer.byteLength <= i * 2) {
			return map;
		}

		// Tracking what has been converted in to larger rectangles
		trans = Array(dunWidth).fill().map(()=>Array(dunHeight).fill(0));

		// Transparancy
		var transparancy = new ObjectGroup("transparancy");
		for (var y = 0; y < dunHeight; y++) {
			for (var x = 0; x < dunWidth; x++) {
				var objectId = view.getInt16(2 * i++, true);
				if (!objectId || trans[x][y]) {
					continue;
				}
				var rect = findTrangsRectangle(view, x, y, dunWidth, dunHeight, i - 1, objectId);
				transparancy.addObject(rect);
			}
		}
		map.addLayer(transparancy);

		return map;
	},

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
					if (obj.tile && obj.tile.tileset.name == "monsters") {
						var mi = monsterIdToTileId.indexOf(obj.tile.id);
						if (mi == -1) {
							tiled.alert("Unmapped monster tile: " + obj.tile.id);
							continue;
						}
						monstIds[x][y] = mi + 1;
					} else if (obj.tile && obj.tile.tileset.name == "objects") {
						var oi = objectIdToTileId.indexOf(obj.tile.id);
						if (oi == -1 || oi == 0) { // object ids are saved as +1
							tiled.alert("Unmapped object tile: " + obj.tile.id);
							continue;
						}
						objIds[x][y] = oi;
					} else if (!obj.tile && layer.name == "transparancy") {
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

/** Map monster tileset to dun ids (MonstConvTbl) */
var monsterIdToTileId = [
	  0,   1,   2,   3, // Zombie
	  4,   5,   6,   7, // Fall spear
	  8,   9,  10,  11, // Skeleton axe
	 12,  13,  14,  15, // Fallen sword
	 16,  17,  18,  19, // Scavenger
	 20,  21,  22,  23, // Skeleton bow
	 24,  25,  26,  27, // Skeleton sword
	 29,  30,  31,  32, // Hidden
	 34,  35,  36,  37, // Goatman mace
	 38,  40,  39,  41, // Bat
	 42,  43,  44,  45, // Goatman bow
	 46,  47,  48,  49, // Acid beast
	 50,                // Skeleton king
	 52,  53,  54,  55, // Overlord
	 -1,  -1,  -1,  -1, // Wyrm
	 56,  57,  58,  59, // Magma demon
	 60,  61,  62,  63, // Horned demon
	 64,  65,  66,  67, // Bone demon
	 -1,  -1,  -1,  -1, // unused
	 68,  69,  70,  71, // Fireman
	 -1,  -1,  -1,  -1, // unused
	 72,  73,  74,  75, // Storm demon
	 77,  78,  79,  80, // Gargoyle
	 81,  82,  83,  84, // Balrog
	 85,  86,  88,  87, // Viper
	 89,  90,  91,  92, // Knight
	 93,  94,  95,  96, // Unraveler
	 97,  98,  99, 100, // Succubus
	101, 102, 103, 104, // Counselor
	 -1,
	106, // Diablo
	 -1,
	105, // Golem
	 -1, -1,
	 -1, // Monster from blood1.dun and blood2.dun
	 -1, -1, -1,
	 -1, // Snotspill from banner2.dun
	 -1, -1,
	 76, // Brute
	107, // Malignus
];

/** Map object tileset to dun ids (ObjTypeConv) */
var objectIdToTileId = [
	43, // OBJ_L1LIGHT, unusable as 0 is also means no-object
	50, // OBJ_LEVER,
	36, // OBJ_CRUX1,
	37, // OBJ_CRUX2,
	38, // OBJ_CRUX3,
	 1, // OBJ_ANGEL,
	 6, // OBJ_BANNERL,
	 5, // OBJ_BANNERM,
	 7, // OBJ_BANNERR,
	-1, -1, -1, -1, -1, // Unused
	19, // OBJ_BOOK2L,
	21, // OBJ_BOOK2R,
	23, // OBJ_BCROSS,
	-1, // Unused
	-1, // OBJ_CANDLE1, but no graphics
	27, // OBJ_CANDLE2
	-1, // OBJ_CANDLEO, but no graphics
	28, // OBJ_CAULDRON
	-1, -1, -1, -1, -1, -1, -1, -1, // Unused
	41, // OBJ_FLAMEHOLE
	-1, -1, -1, -1, -1, // Unused
	54, // OBJ_MCIRCLE1,
	55, // OBJ_MCIRCLE2,
	65, // OBJ_SKFIRE,
	66, // OBJ_SKPILE,
	-1, -1, -1, -1, -1, // Found in sector2s.dun, referenced as SKSTICK1-5, but no graphics
	-1, -1, -1, -1, -1, -1, // Unused
	67, // OBJ_SWITCHSKL
	-1, // Probably OBJ_SWITCHSKR, found in diab3b.dun where upper OBJ_SWITCHSKL is in diab3a.dun
	76, // OBJ_TRAPL,
	77, // OBJ_TRAPR,
	78, // OBJ_TORTURE1,
	79, // OBJ_TORTURE2,
	80, // OBJ_TORTURE3,
	81, // OBJ_TORTURE4,
	82, // OBJ_TORTURE5,
	-1, -1, -1, -1, // Unused
	-1, // Found in sector2s.dun
	59, // OBJ_NUDEW2R
	-1, -1, -1, -1, // Unused
	69, // OBJ_TNUDEM1
	70, // OBJ_TNUDEM2
	71, // OBJ_TNUDEM3
	72, // OBJ_TNUDEM4
	73, // OBJ_TNUDEW1
	74, // OBJ_TNUDEW2
	75, // OBJ_TNUDEW3
	29, // OBJ_CHEST1,
	29, // OBJ_CHEST1,
	29, // OBJ_CHEST1,
	31, // OBJ_CHEST2,
	31, // OBJ_CHEST2,
	31, // OBJ_CHEST2,
	33, // OBJ_CHEST3,
	33, // OBJ_CHEST3,
	33, // OBJ_CHEST3,
	-1, -1, -1, -1, -1, // Unused
	60, // OBJ_PEDISTAL
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // Unused
	 0, // OBJ_ALTBOY
	-1, // Generic torch found in blood1.dun and blood3.dun instead of OBJ_TORCHL/R from blood2.dun, but not in code
	-1, // Found in vile3.dun
	 3, // OBJ_WARARMOR,
	84, // OBJ_WARWEAP,
	88, // OBJ_TORCHR2,
	87, // OBJ_TORCHL2,
	58, // OBJ_MUSHPATCH,
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
		tiled.alert("Rectangles and polygons are supported for transparancy");
		return;
	}

	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			if (isInside(x, y, polygon)) {
				if (parseInt(obj.name) > 1) {
					trans[x][y] = parseInt(obj.name);
				} else {
					trans[x][y] = 1;
				}
			}
		}
	}
}

function findTransRow(view, xStart, y, dunWidth, offset, matchId) {
	var width = 0;
	for (var x = xStart; x < dunWidth; x++) {
		var transId = view.getInt16(2 * offset++, true);
		if (transId != matchId || trans[x][y]) {
			break;
		}
		width++;
	}

	return width;
}

function findTrangsRectangle(view, xStart, yStart, dunWidth, dunHeight, offset, matchId) {
	var width = findTransRow(view, xStart, yStart, dunWidth, offset, matchId);

	var height = 0;
	for (var y = yStart; y < dunHeight; y++) {
		if (width != findTransRow(view, xStart, y, dunWidth, offset, matchId)) {
			break;
		}
		for (var x = xStart; x < width + xStart; x++) {
			trans[x][y] = matchId; // Mark row as mapped
		}
		height++;
		offset += dunWidth;
	}

	var object = new MapObject();
	if (matchId != 1) {
		object.name = matchId.toString();
	}
	object.shape = MapObject.Rectangle;

	object.x = xStart * 32;
	object.y = yStart * 32;
	object.width = width * 32;
	object.height = height * 32;

	return object;
}

/**
 * Check if a cordinate is inside a polygon
 * @see http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
 */
function isInside(x, y, polygon) {
	/// Shift cordinate to center of tile
	x += 0.5;
	y += 0.5;

	var inside = false;
	for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		var xi = polygon[i].x / 32, yi = polygon[i].y / 32;
		var xj = polygon[j].x / 32, yj = polygon[j].y / 32;

		var intersect = ((yi > y) != (yj > y))
			&& (x <= (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect) inside = !inside;
	}

	return inside;
};

tiled.registerMapFormat("dun", dunMapFormat)
