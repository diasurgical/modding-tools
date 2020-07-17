@echo off
echo Making folders (may fail, dont worry)
mkdir WORLD
mkdir WORLD\_assets_
mkdir WORLD\_assets_\_tilesets_

echo Generating objects tileset

util\montage ^
	_dump_\objects\angel\angel_0001.png ^
	_dump_\objects\angel\angel_0002.png ^
	-gravity south -geometry x128+0+0 ^
	-tile 2x ^
	-background none ^
	_dump_\objects\angel\angel_pre_crop.png

REM Crop angel to 128x128.
util\convert _dump_\objects\angel\angel_pre_crop.png -crop 128x128+0+0 +repage _dump_\objects\angel.png
del _dump_\objects\angel\angel_pre_crop.png

echo 'Creating "_assets_\_tilesets_\objects.png'
util\montage ^
	_dump_\objects\altboy\altboy.png ^
	_dump_\objects\angel.png ^
	_dump_\objects\armstand\armstand_0001.png ^
	_dump_\objects\armstand\armstand_0001.png ^
	_dump_\objects\armstand\armstand_0002.png ^
	_dump_\objects\banner\banner_0001.png ^
	_dump_\objects\banner\banner_0002.png ^
	_dump_\objects\banner\banner_0003.png ^
	_dump_\objects\barrel\barrel_0001.png ^
	_dump_\objects\barrelex\barrelex_0001.png ^
	_dump_\objects\bcase\bcase_0001.png ^
	_dump_\objects\bcase\bcase_0003.png ^
	_dump_\objects\bcase\bcase_0004.png ^
	_dump_\objects\bkslbrnt\bkslbrnt_0001.png ^
	_dump_\objects\bloodfnt\bloodfnt_0001.png ^
	_dump_\objects\book1\book1_0001.png ^
	_dump_\objects\book1\book1_0001.png ^
	_dump_\objects\book1\book1_0004.png ^
	_dump_\objects\book1\book1_0004.png ^
	_dump_\objects\book2\book2_0001.png ^
	_dump_\objects\book2\book2_0001.png ^
	_dump_\objects\book2\book2_0004.png ^
	_dump_\objects\book2\book2_0004.png ^
	_dump_\objects\burncros\burncros_0001.png ^
	_dump_\objects\burncros\burncros_0001.png ^
	_dump_\objects\candle2\candle2_0001.png ^
	_dump_\objects\candle2\candle2_0001.png ^
	_dump_\objects\candle2\candle2_0001.png ^
	_dump_\objects\cauldren\cauldren_0001.png ^
	_dump_\objects\chest1\chest1_0001.png ^
	_dump_\objects\chest1\chest1_0001.png ^
	_dump_\objects\chest2\chest2_0001.png ^
	_dump_\objects\chest2\chest2_0001.png ^
	_dump_\objects\chest3\chest3_0001.png ^
	_dump_\objects\chest3\chest3_0001.png ^
	_dump_\objects\chest3\chest3_0001.png ^
	_dump_\objects\cruxsk1\cruxsk1_0001.png ^
	_dump_\objects\cruxsk2\cruxsk2_0001.png ^
	_dump_\objects\cruxsk3\cruxsk3_0001.png ^
	_dump_\objects\decap\decap_0001.png ^
	_dump_\objects\decap\decap_0002.png ^
	_dump_\objects\flame1\flame1_0001.png ^
	_dump_\objects\goatshrn\goatshrn_0001.png ^
	_dump_\objects\l1braz\l1braz_0001.png ^
	_dump_\objects\l1doors\l1_1.pal\l1doors_0001.png ^
	_dump_\objects\l1doors\l1_1.pal\l1doors_0002.png ^
	_dump_\objects\l2doors\l2_1.pal\l2doors_0001.png ^
	_dump_\objects\l2doors\l2_1.pal\l2doors_0002.png ^
	_dump_\objects\l3doors\l3_1.pal\l3doors_0001.png ^
	_dump_\objects\l3doors\l3_1.pal\l3doors_0002.png ^
	_dump_\objects\lever\lever_0001.png ^
	_dump_\objects\lever\lever_0001.png ^
	_dump_\objects\lshrineg\lshrineg_0001.png ^
	_dump_\objects\lzstand\lzstand_0001.png ^
	_dump_\objects\mcirl\mcirl_0001.png ^
	_dump_\objects\mcirl\mcirl_0003.png ^
	_dump_\objects\mfountn\mfountn_0001.png ^
	_dump_\objects\miniwatr\miniwatr_0001.png ^
	_dump_\objects\mushptch\mushptch_0001.png ^
	_dump_\objects\nude2\nude2_0001.png ^
	_dump_\objects\pedistl\pedistl_0001.png ^
	_dump_\objects\pfountn\pfountn_0001.png ^
	_dump_\objects\rockstan\rockstan.png ^
	_dump_\objects\rshrineg\rshrineg_0001.png ^
	_dump_\objects\sarc\sarc_0001.png ^
	_dump_\objects\skulfire\skulfire_0001.png ^
	_dump_\objects\skulpile\skulpile.png ^
	_dump_\objects\switch4\switch4_0001.png ^
	_dump_\objects\tfountn\tfountn_0001.png ^
	_dump_\objects\tnudem\tnudem_0001.png ^
	_dump_\objects\tnudem\tnudem_0002.png ^
	_dump_\objects\tnudem\tnudem_0003.png ^
	_dump_\objects\tnudem\tnudem_0004.png ^
	_dump_\objects\tnudew\tnudew_0001.png ^
	_dump_\objects\tnudew\tnudew_0002.png ^
	_dump_\objects\tnudew\tnudew_0003.png ^
	_dump_\objects\traphole\traphole_0001.png ^
	_dump_\objects\traphole\traphole_0002.png ^
	_dump_\objects\tsoul\tsoul_0001.png ^
	_dump_\objects\tsoul\tsoul_0002.png ^
	_dump_\objects\tsoul\tsoul_0003.png ^
	_dump_\objects\tsoul\tsoul_0004.png ^
	_dump_\objects\tsoul\tsoul_0005.png ^
	_dump_\objects\weapstnd\weapstnd_0001.png ^
	_dump_\objects\weapstnd\weapstnd_0001.png ^
	_dump_\objects\weapstnd\weapstnd_0001.png ^
	_dump_\objects\weapstnd\weapstnd_0002.png ^
	_dump_\objects\wtorch1\wtorch1_0001.png ^
	_dump_\objects\wtorch2\wtorch2_0001.png ^
	_dump_\objects\wtorch3\wtorch3_0001.png ^
	_dump_\objects\wtorch4\wtorch4_0001.png ^
	-gravity south -geometry 128x128+0+0 ^
	-tile 13x ^
	-background none ^
	WORLD\_assets_\_tilesets_\objects.png
pause