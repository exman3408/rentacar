"""Convert Warbird's CC BY 4.0 AnirudhRao mesh data to glTF 2 binary. Input path argument."""
import json,struct,sys
s=open(sys.argv[1]).read();d=json.loads(s.split('export default ')[1].rstrip(';\n'))
bin=bytearray();views=[];acc=[];meshes=[]
nodes=[{'name':'body','children':[]},{'name':'rotor','translation':d['pivots']['rotor'],'children':[]},{'name':'tail','translation':d['pivots']['tail'],'children':[]}]
colors={'ink':[.025,.03,.035,1],'body':[.12,.17,.18,1],'accent':[.7,.52,.27,1],'glass':[.11,.28,.36,1]}
materials=[{'name':k,'pbrMetallicRoughness':{'baseColorFactor':v,'metallicFactor':.55,'roughnessFactor':.3},'doubleSided':True} for k,v in colors.items()]
def accessor(values,fmt,typ,component):
 while len(bin)%4:bin.append(0)
 start=len(bin);bin.extend(struct.pack('<'+fmt*len(values),*values));views.append({'buffer':0,'byteOffset':start,'byteLength':len(bin)-start})
 a={'bufferView':len(views)-1,'componentType':component,'count':len(values)//(3 if typ=='VEC3' else 1),'type':typ}
 if typ=='VEC3':a.update(min=[min(values[i::3]) for i in range(3)],max=[max(values[i::3]) for i in range(3)])
 acc.append(a);return len(acc)-1
for part in d['meshes']:
 p=accessor(part['positions'],'f','VEC3',5126);i=accessor(part['indices'],'I','SCALAR',5125)
 meshes.append({'primitives':[{'attributes':{'POSITION':p},'indices':i,'material':list(colors).index(part['color'])}]})
 nodes.append({'name':part['parent']+' '+part['color'],'mesh':len(meshes)-1});nodes[['body','rotor','tail'].index(part['parent'])]['children'].append(len(nodes)-1)
g={'asset':{'version':'2.0','copyright':'AnirudhRao CC BY 4.0; Warbird adaptation; RANTE CAR glTF conversion'},'scene':0,'scenes':[{'nodes':[0,1,2]}],'nodes':nodes,'meshes':meshes,'materials':materials,'accessors':acc,'bufferViews':views,'buffers':[{'byteLength':len(bin)}]}
j=json.dumps(g).encode();j+=b' '*((-len(j))%4);bin+=b'\0'*((-len(bin))%4)
open(sys.argv[2],'wb').write(struct.pack('<III',0x46546c67,2,12+8+len(j)+8+len(bin))+struct.pack('<II',len(j),0x4e4f534a)+j+struct.pack('<II',len(bin),0x004e4942)+bin)
