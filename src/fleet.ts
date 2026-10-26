export type Category = 'car'|'yacht'|'helicopter';
export interface Product {id:string;category:Category;displayName:string;modelPath:string;description:string;specs:string[];orientation:number;licenseInfo:string;thumbnail?:string}
export const fleet:Product[]=[
{id:'suv',category:'car',displayName:'Luxury SUV',modelPath:'/models/suv-luxury.glb',description:'Şehrin ritminden uzaklaş. Kendi rotanı çiz.',specs:['SUV','Özel transfer','Kenney koleksiyonu'],orientation:Math.PI/2,licenseInfo:'Kenney · CC0'},
{id:'sport',category:'car',displayName:'Sport Sedan',modelPath:'/models/sedan-sports.glb',description:'Her virajda yeni bir hikâye.',specs:['Sport sedan','Özel transfer','Kenney koleksiyonu'],orientation:Math.PI/2,licenseInfo:'Kenney · CC0'},
{id:'speed-a',category:'yacht',displayName:'Coastal Cruiser A',modelPath:'/models/boat-speed-a.glb',description:'Ufka doğru, yalnızca sana ait bir an.',specs:['Sürat teknesi','Kıyı deneyimi','Yat yerine tekne demosu'],orientation:Math.PI/2,licenseInfo:'Kenney · CC0'},
{id:'speed-b',category:'yacht',displayName:'Coastal Cruiser B',modelPath:'/models/boat-speed-b.glb',description:'Mavinin en güzel tonuna yolculuk.',specs:['Sürat teknesi','Kıyı deneyimi','Yat yerine tekne demosu'],orientation:Math.PI/2,licenseInfo:'Kenney · CC0'},
{id:'mh6',category:'helicopter',displayName:'MH-6 Little Bird',modelPath:'/models/mh6.glb',description:'Şehre başka bir perspektiften bak.',specs:['MH-6','Görsel vitrin modeli','Sivil kiralama teklifi değildir'],orientation:-Math.PI/2,licenseInfo:'AnirudhRao · CC BY 4.0'}
];
export const categories={car:'Araç Kiralama',yacht:'Yat & Tekne',helicopter:'Helikopter'};
