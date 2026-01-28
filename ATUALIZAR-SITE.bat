@echo off
echo ========================================
echo    ATUALIZAR GITHUB PAGES
echo ========================================
echo.

cd /d "%~dp0"

REM Configurar caminho do Git
set "GIT=C:\Program Files\Git\cmd\git.exe"

echo [1/4] Indo para branch gh-pages...
"%GIT%" checkout gh-pages

echo.
echo [2/4] Fazendo merge do master...
"%GIT%" merge master -m "Merge master into gh-pages"

echo.
echo [3/4] Enviando para GitHub...
"%GIT%" push origin gh-pages

echo.
echo [4/4] Voltando para master...
"%GIT%" checkout master

echo.
echo ========================================
echo    GITHUB PAGES ATUALIZADO!
echo ========================================
echo.
echo Aguarde 1-2 minutos para o site atualizar.
echo.
pause
