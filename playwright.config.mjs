import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "off",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: 'node -e "const http=require(\'http\'),fs=require(\'fs\'),path=require(\'path\'),mt={\'.html\':\'text/html\',\'.css\':\'text/css\',\'.js\':\'text/javascript\',\'.svg\':\'image/svg+xml\',\'.png\':\'image/png\'};http.createServer((q,s)=>{let p=decodeURIComponent(q.url.split(\'?\')[0]);if(p===\'/\')p=\'/index.html\';const fp=path.join(process.cwd(),p);fs.readFile(fp,(e,d)=>{if(e){s.statusCode=404;s.end(\'404\');return}s.setHeader(\'Content-Type\',mt[path.extname(fp)]||\'application/octet-stream\');s.end(d)})}).listen(5173,\'127.0.0.1\',()=>console.log(\'serving on 5173\'))"',
    url: "http://127.0.0.1:5173",
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
