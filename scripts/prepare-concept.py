"""Bake graphite variant of CC BY 4.0 CarConcept and remove visible trademark artwork.
Usage: python scripts/prepare-concept.py source.glb destination.glb
Source: KhronosGroup/glTF-Sample-Assets/Models/CarConcept/glTF-Binary/CarConcept.glb
"""
import json,struct,sys
b=open(sys.argv[1],'rb').read();l=struct.unpack_from('<I',b,12)[0];d=json.loads(b[20:20+l]);binary=b[20+l:]
for mesh in d['meshes']:
 for p in mesh['primitives']:
  for m in p.get('extensions',{}).get('KHR_materials_variants',{}).get('mappings',[]):
   if 2 in m['variants']:p['material']=m['material']
# License plate becomes blank; steering emblem is not shown. No endorsement is implied.
d['materials'][9]['pbrMetallicRoughness'].pop('baseColorTexture',None)
d['materials'][9]['pbrMetallicRoughness']['baseColorFactor']=[.025,.025,.025,1]
for n in d['nodes']:
 if n.get('name')=='InteriorSteeringEmblem':n.pop('mesh',None)
d['asset']['copyright']='Darmstadt Graphics Group GmbH / Eric Chadwick, CC BY 4.0. Original source Unity Fan CC0. RANTE CAR: graphite variant baked, license plate texture and steering emblem removed.'
j=json.dumps(d,separators=(',',':')).encode();j+=b' '*((-len(j))%4)
open(sys.argv[2],'wb').write(struct.pack('<III',0x46546c67,2,20+len(j)+len(binary))+struct.pack('<II',len(j),0x4e4f534a)+j+binary)
