#Notes from setup process

frontend:
create vite@latest .
npm install axios react-router

backend:
npm init -y (-y flag accepts all default values)
add "type": "module", to package.json
npm install express dotenv cors nodemon

purpose of vercel.json: (before. error upon reload b/c only able to serve vercel.app... not vercel.app/login but page always goes to ../login b/c of protected route)

This tells Vercel to always serve index.html regardless of the URL path, and then React Router handles the routing client-side. This fixes refreshing on /login, /signup, or any other route.
