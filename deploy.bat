npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/NesoDev/mysql-vue3-dashboard-frontend.git main:gh-pages

cd -