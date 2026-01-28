@echo off
echo ========================================
echo    PUSH PARA GITHUB
echo ========================================
echo.

cd /d "%~dp0"

REM Configurar caminho do Git
set "GIT=C:\Program Files\Git\cmd\git.exe"

echo Enviando para GitHub...
"%GIT%" push origin master

echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCESSO] Enviado para GitHub!
) else (
    echo [ERRO] Falha no push. Verifique sua conexao.
)

echo.
pause
