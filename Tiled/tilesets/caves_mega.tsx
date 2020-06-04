<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.2" tiledversion="1.3.4" name="caves" tilewidth="128" tileheight="192" tilecount="160" columns="16">
 <grid orientation="isometric" width="128" height="192"/>
 <image source="caves_mega.png" width="2048" height="1920"/>
 <terraintypes>
  <terrain name="floor" tile="6"/>
  <terrain name="lava" tile="32"/>
  <terrain name="dirt" tile="7"/>
 </terraintypes>
 <tile id="0" terrain="2,0,2,2"/>
 <tile id="1" terrain="0,0,2,2"/>
 <tile id="2" terrain="2,2,0,2"/>
 <tile id="3" terrain="0,2,0,2"/>
 <tile id="4" terrain="0,0,0,2"/>
 <tile id="5" terrain="0,2,2,2"/>
 <tile id="6" terrain="0,0,0,0"/>
 <tile id="7" terrain="2,2,2,2"/>
 <tile id="8" terrain="2,0,2,0"/>
 <tile id="9" terrain="2,2,0,0"/>
 <tile id="10" terrain="2,2,2,0"/>
 <tile id="11" terrain="2,0,0,0"/>
 <tile id="12" terrain="0,2,0,0"/>
 <tile id="13" terrain="0,0,2,0"/>
 <tile id="24" terrain="0,1,0,1"/>
 <tile id="25" terrain="0,0,1,1"/>
 <tile id="26" terrain="1,1,0,0"/>
 <tile id="27" terrain="1,0,1,0"/>
 <tile id="28" terrain="0,0,0,1"/>
 <tile id="29" terrain="0,0,1,0"/>
 <tile id="30" terrain="0,1,0,0"/>
 <tile id="31" terrain="1,0,0,0"/>
 <tile id="32" terrain="1,1,1,1"/>
 <tile id="33" terrain="0,1,1,1"/>
 <tile id="34" terrain="1,0,1,1"/>
 <tile id="35" terrain="1,1,0,1"/>
 <tile id="36" terrain="1,1,1,0"/>
 <tile id="67" terrain="2,0,2,0"/>
 <tile id="68" terrain="2,2,0,0"/>
 <tile id="84" terrain="2,0,2,0"/>
 <tile id="86" terrain="2,2,2,0"/>
 <tile id="87" terrain="2,2,0,0"/>
 <tile id="90" terrain="2,0,2,0"/>
 <tile id="92" terrain="2,2,2,0"/>
 <tile id="100" terrain="2,0,2,2"/>
 <tile id="101" terrain="0,0,2,2"/>
 <tile id="102" terrain="2,2,0,2"/>
 <tile id="103" terrain="0,2,0,2"/>
 <tile id="104" terrain="0,2,2,2"/>
 <tile id="105" terrain="0,0,0,0"/>
 <tile id="106" terrain="0,0,0,0"/>
 <tile id="107" terrain="0,0,0,0"/>
 <tile id="108" terrain="2,0,2,0"/>
 <tile id="109" terrain="2,2,0,0"/>
 <wangsets>
  <wangset name="caves" tile="-1">
   <wangedgecolor name="" color="#c17d11" tile="-1" probability="1"/>
   <wangedgecolor name="" color="#00ff00" tile="-1" probability="1"/>
   <wangcornercolor name="ground" color="#8f5902" tile="-1" probability="1"/>
   <wangcornercolor name="dirt" color="#2e3436" tile="-1" probability="1"/>
   <wangtile tileid="0" wangid="0x20202111"/>
   <wangtile tileid="1" wangid="0x11202110"/>
   <wangtile tileid="2" wangid="0x21112020"/>
   <wangtile tileid="3" wangid="0x10112021"/>
   <wangtile tileid="4" wangid="0x10112110"/>
   <wangtile tileid="5" wangid="0x11202120"/>
   <wangtile tileid="6" wangid="0x10101010"/>
   <wangtile tileid="7" wangid="0x20202020"/>
   <wangtile tileid="8" wangid="0x20211011"/>
   <wangtile tileid="9" wangid="0x21101120"/>
   <wangtile tileid="10" wangid="0x20211120"/>
   <wangtile tileid="11" wangid="0x21101011"/>
   <wangtile tileid="12" wangid="0x10101121"/>
   <wangtile tileid="13" wangid="0x11211010"/>
   <wangtile tileid="67" wangid="0x20211011"/>
   <wangtile tileid="68" wangid="0x21101120"/>
   <wangtile tileid="105" wangid="0x10101010"/>
   <wangtile tileid="106" wangid="0x10101010"/>
   <wangtile tileid="107" wangid="0x10101010"/>
   <wangtile tileid="108" wangid="0x20211011"/>
   <wangtile tileid="109" wangid="0x21101120"/>
  </wangset>
  <wangset name="caves lava" tile="-1">
   <wangcornercolor name="lava" color="#f57900" tile="-1" probability="0.25"/>
   <wangcornercolor name="ground" color="#8f5902" tile="-1" probability="1"/>
   <wangcornercolor name="dirt" color="#2e3436" tile="-1" probability="1"/>
   <wangtile tileid="0" wangid="0x30303020"/>
   <wangtile tileid="1" wangid="0x20303020"/>
   <wangtile tileid="2" wangid="0x30203030"/>
   <wangtile tileid="3" wangid="0x20203030"/>
   <wangtile tileid="4" wangid="0x20203020"/>
   <wangtile tileid="5" wangid="0x20303030"/>
   <wangtile tileid="6" wangid="0x20202020"/>
   <wangtile tileid="7" wangid="0x30303030"/>
   <wangtile tileid="8" wangid="0x30302020"/>
   <wangtile tileid="9" wangid="0x30202030"/>
   <wangtile tileid="10" wangid="0x30302030"/>
   <wangtile tileid="11" wangid="0x30202020"/>
   <wangtile tileid="12" wangid="0x20202030"/>
   <wangtile tileid="13" wangid="0x20302020"/>
   <wangtile tileid="24" wangid="0x20201010"/>
   <wangtile tileid="25" wangid="0x20101020"/>
   <wangtile tileid="26" wangid="0x10202010"/>
   <wangtile tileid="27" wangid="0x10102020"/>
   <wangtile tileid="28" wangid="0x20201020"/>
   <wangtile tileid="29" wangid="0x20102020"/>
   <wangtile tileid="30" wangid="0x20202010"/>
   <wangtile tileid="31" wangid="0x10202020"/>
   <wangtile tileid="32" wangid="0x10101010"/>
   <wangtile tileid="33" wangid="0x20101010"/>
   <wangtile tileid="34" wangid="0x10101020"/>
   <wangtile tileid="35" wangid="0x10201010"/>
   <wangtile tileid="36" wangid="0x10102010"/>
   <wangtile tileid="67" wangid="0x30302020"/>
   <wangtile tileid="68" wangid="0x30202030"/>
   <wangtile tileid="105" wangid="0x20202020"/>
   <wangtile tileid="106" wangid="0x20202020"/>
   <wangtile tileid="107" wangid="0x20202020"/>
   <wangtile tileid="108" wangid="0x30302020"/>
   <wangtile tileid="109" wangid="0x30202030"/>
  </wangset>
  <wangset name="tunnels" tile="-1">
   <wangedgecolor name="" color="#c17d11" tile="-1" probability="1"/>
   <wangedgecolor name="" color="#555753" tile="-1" probability="1"/>
   <wangcornercolor name="" color="#8f5902" tile="-1" probability="1"/>
   <wangcornercolor name="" color="#2e3436" tile="-1" probability="1"/>
   <wangtile tileid="0" wangid="0x20202111"/>
   <wangtile tileid="1" wangid="0x11202110"/>
   <wangtile tileid="2" wangid="0x21112020"/>
   <wangtile tileid="3" wangid="0x10112021"/>
   <wangtile tileid="4" wangid="0x10112110"/>
   <wangtile tileid="5" wangid="0x11202021"/>
   <wangtile tileid="6" wangid="0x10101010"/>
   <wangtile tileid="7" wangid="0x20202020"/>
   <wangtile tileid="8" wangid="0x20211011"/>
   <wangtile tileid="9" wangid="0x21101120"/>
   <wangtile tileid="10" wangid="0x20211120"/>
   <wangtile tileid="11" wangid="0x21101011"/>
   <wangtile tileid="12" wangid="0x10101121"/>
   <wangtile tileid="13" wangid="0x11211010"/>
   <wangtile tileid="67" wangid="0x20211011"/>
   <wangtile tileid="68" wangid="0x21101120"/>
   <wangtile tileid="105" wangid="0x10101010"/>
   <wangtile tileid="106" wangid="0x10101010"/>
   <wangtile tileid="107" wangid="0x10101010"/>
   <wangtile tileid="108" wangid="0x20211011"/>
   <wangtile tileid="109" wangid="0x21101120"/>
   <wangtile tileid="120" wangid="0x20221012"/>
   <wangtile tileid="121" wangid="0x20211012"/>
   <wangtile tileid="122" wangid="0x20221011"/>
   <wangtile tileid="123" wangid="0x20221012"/>
   <wangtile tileid="124" wangid="0x20221220"/>
   <wangtile tileid="125" wangid="0x22101220"/>
   <wangtile tileid="126" wangid="0x21101220"/>
   <wangtile tileid="127" wangid="0x22101120"/>
   <wangtile tileid="128" wangid="0x22101220"/>
  </wangset>
 </wangsets>
</tileset>
