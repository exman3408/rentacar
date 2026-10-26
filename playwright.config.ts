import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',timeout:180000,workers:1,use:{baseURL:'http://127.0.0.1:5173',viewport:{width:1440,height:900},launchOptions:{executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']}}});
