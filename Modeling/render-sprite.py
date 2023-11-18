import bpy
from math import radians
import time

# This Blender script will render the animation from 8 angles for use as a Monster i Diablo
#
# How to use:
# 1: Configure the render Output path.
# 2: Select the character rig
# 3: Press play in the script editor
#
# Next create a new sprite in D1GT and drag and drop the images from each output
# folder in to the view area, regroup the sprite frames and save your sprite as .cl2

renderpath = bpy.context.scene.render.filepath

#angles = ['sw', 's', 'se', 'e', 'ne', 'n', 'nw', 'w']
angles = ['a2', 'a1', 'a8', 'a7', 'a6', 'a5', 'a4', 'a3']

for angle in angles:
    bpy.context.scene.render.filepath = renderpath + '/' + angle + '/'
    bpy.ops.render.render(animation = True)

    for obj in bpy.context.selected_objects:
        obj.rotation_euler.z += radians( 45 )

bpy.context.scene.render.filepath = renderpath
