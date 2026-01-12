@echo off
echo ========================================
echo   DEPLOY GITHUB - Sistema Treino Albert
echo ========================================
echo.

REM Verificar se já tem remote
git remote -v

REM Se nao tiver, adicionar (substituir URL depois)
echo.
echo Aguardando URL do GitHub...
echo.
set /p GITHUB_URL="Cole aqui a URL do repositorio GitHub (ex: https://github.com/user/repo.git): "

echo.
echo Adicionando remote...
git remote add origin %GITHUB_URL%

echo.
echo Fazendo push...
git push -u origin master

echo.
echo ========================================
echo   PRONTO! Codigo enviado para GitHub!
echo ========================================
echo.
echo Agora ative GitHub Pages:
echo 1. Va no repositorio no GitHub
echo 2. Settings (Configuracoes)
echo 3. Pages (na lateral esquerda)
echo 4. Source: Deploy from a branch
echo 5. Branch: master / root
echo 6. Save
echo.
echo Seu site ficara em:
echo https://SEU-USUARIO.github.io/NOME-DO-REPO
echo.
pause
