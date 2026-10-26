import * as THREE from 'three';

// Original procedural concrete: pores, formwork joints and stains, with matching relief.
function concrete(repeatX:number,repeatY:number){
 const canvas=document.createElement('canvas');canvas.width=canvas.height=512;
 const ctx=canvas.getContext('2d')!;const image=ctx.createImageData(512,512);
 let seed=437;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 for(let y=0;y<512;y++)for(let x=0;x<512;x++){
  const seam=x%256<2||y%128<2;const pores=random()>.995?-.16:0;
  const value=160+(random()-.5)*27+Math.sin(x*.03)*4+Math.sin(y*.016)*8+(seam?-20:0)+pores*255;
  const i=(y*512+x)*4;image.data[i]=value;image.data[i+1]=value-8;image.data[i+2]=value-17;image.data[i+3]=255;
 }
 ctx.putImageData(image,0,0);ctx.fillStyle='#50453944';
 for(let y=64;y<512;y+=128)for(let x=64;x<512;x+=128){ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fill();}
 const color=new THREE.CanvasTexture(canvas);color.colorSpace=THREE.SRGBColorSpace;color.wrapS=color.wrapT=THREE.RepeatWrapping;color.repeat.set(repeatX,repeatY);color.anisotropy=4;
 const bump=color.clone();bump.colorSpace=THREE.NoColorSpace;
 return new THREE.MeshStandardMaterial({color:'#c7b99f',map:color,bumpMap:bump,bumpScale:.055,roughness:.91,metalness:0});
}
export function createShowroom(){
 const group=new THREE.Group();group.name='Architectural concrete courtyard';
 const floorMaterial=concrete(12,12);const wallMaterial=concrete(4,2);
 function block(w:number,h:number,d:number,x:number,y:number,z:number,material=wallMaterial){
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;group.add(m);return m;
 }
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(130,130),floorMaterial);floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;group.add(floor);
 // Continuous concrete podium, stepped edges, diagonal load-bearing elements and sky slots.
 block(80,.35,15,0,.12,-12);block(80,.22,3,0,.1,-4.8);
 block(80,2.4,2,0,1.2,-20);block(80,2.2,7,0,12,-18);
 for(let x=-35;x<=35;x+=14){const pier=block(3.8,16,5,x,6,-16);pier.rotation.z=-.53;block(10,.9,7,x+4,7,-18);}
 block(6,12,54,-28,6,-5);block(6,12,54,30,6,-5);
 for(const x of [-28,30])for(let z=-29;z<=19;z+=8)block(.08,12,.05,x+(x<0?3.01:-3.01),6,z,new THREE.MeshStandardMaterial({color:'#695e4f',roughness:1}));
 // Floor expansion joints are world geometry, not screen-space decoration.
 const jointMat=new THREE.MeshStandardMaterial({color:'#776e5e',roughness:1});
 for(let z=-30;z<40;z+=9)block(90,.003,.016,0,.003,z,jointMat);
 // Soft, local ambient contact patch supplements directional PCF shadows.
 const c=document.createElement('canvas');c.width=c.height=128;const cx=c.getContext('2d')!;const grad=cx.createRadialGradient(64,64,12,64,64,64);grad.addColorStop(0,'rgba(20,15,10,0.5)');grad.addColorStop(1,'rgba(20,15,10,0)');cx.fillStyle=grad;cx.fillRect(0,0,128,128);
 const aoTexture=new THREE.CanvasTexture(c);const contact=new THREE.Mesh(new THREE.PlaneGeometry(7.5,4.5),new THREE.MeshBasicMaterial({map:aoTexture,transparent:true,depthWrite:false,opacity:.65}));contact.name='contact-shadow';contact.rotation.x=-Math.PI/2;contact.position.y=.012;group.add(contact);
 const sky=new THREE.Mesh(new THREE.SphereGeometry(115,32,16),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{},vertexShader:'varying vec3 pos;void main(){pos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 pos;void main(){float h=clamp(normalize(pos).y,0.,1.);gl_FragColor=vec4(mix(vec3(.76,.69,.56),vec3(.22,.34,.43),pow(h,.5)),1.);}'}));group.add(sky);
 return group;
}
