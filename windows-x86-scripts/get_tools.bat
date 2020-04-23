@echo off
title Downloading tools...
echo Downloading tools...
go get github.com/sanctuary/mpq
go get github.com/mewrnd/blizzconv/cmd/mpqfix
go get github.com/sanctuary/formats/cmd/cel_dump
go get github.com/sanctuary/formats/cmd/min_dump
go get github.com/sanctuary/formats/cmd/til_dump
go get github.com/sanctuary/formats/cmd/dun_dump
go get github.com/sanctuary/formats/cmd/dun_merge
go get github.com/sanctuary/opensource-ami/cmd/miniset_dump