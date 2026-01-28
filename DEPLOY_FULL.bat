@echo off
echo ========================================
echo    DEPLOY COMPLETO (COMMIT + PUSH)
echo ========================================
echo.

cd /d "%~dp0"
set "GIT=C:\Program Files\Git\cmd\git.exe"

echo [1/5] Adicionando arquivos...
"%GIT%" add .

echo.
echo [2/5] Commitando alteracoes...
"%GIT%" commit -m "feat: Update Progress Tab with Milestones and Strength Goals"

echo.
echo [3/5] Enviando Master...
"%GIT%" push origin master

echo.
echo [4/5] Atualizando GH-PAGES...
"%GIT%" checkout gh-pages
"%GIT%" merge master -m "Merge master into gh-pages"
"%GIT%" push origin gh-pages

echo.
echo [5/5] Finalizando...
"%GIT%" checkout master

echo.
echo [SUCESSO] Site atualizado!
