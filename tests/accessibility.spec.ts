import {test,expect} from '@playwright/test';
test('mobile touch orbit, pinch zoom, reduced motion and accessible dialog',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'});const page=await context.newPage();await page.goto('http://127.0.0.1:5173');await page.waitForFunction(()=>(window as any).__rante?.phase==='settled');
 const client=await context.newCDPSession(page);const before=await page.evaluate(()=>(window as any).__rante.camera);
 await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:150,y:430}]});for(let x=160;x<=240;x+=20)await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:430}]});await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await page.waitForFunction(before=>JSON.stringify((window as any).__rante.camera)!==JSON.stringify(before),before);
 const distance=()=>page.evaluate(()=>{const p=(window as any).__rante.camera;return Math.hypot(p[0],p[1]-1,p[2]);});await page.waitForTimeout(500);const old=await distance();
 await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:150,y:440},{x:230,y:440}]});for(let d=10;d<50;d+=10)await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:150-d,y:440},{x:230+d,y:440}]});await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForFunction(old=>{const p=(window as any).__rante.camera;return Math.hypot(p[0],p[1]-1,p[2])<old-.1;},old);
 await page.locator('#details').tap();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await page.screenshot({path:'test-results/mobile-touch.png'});await context.close();
});
