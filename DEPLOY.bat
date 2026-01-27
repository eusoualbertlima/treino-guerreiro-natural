@echo off
echo ========================================
echo    DEPLOY SISTEMA TREINO ALBERT
echo ========================================
echo.

cd /d "%~dp0"

REM Configurar caminho do Git
set "GIT_PATH=C:\Program Files\Git\cmd\git.exe"

REM Verificar se o Git existe nesse caminho
if not exist "%GIT_PATH%" (
    echo [ERRO] Git nao encontrado em "%GIT_PATH%"
    echo Tentando encontrar git no PATH padrao...
    set "GIT_PATH=git"
)

echo [1/4] Verificando status do Git...
"%GIT_PATH%" status

echo.
echo [2/4] Adicionando arquivos...
"%GIT_PATH%" add -A

echo.
echo [3/4] Fazendo commit...
"%GIT_PATH%" commit -m "feat: sistema de treino consciente + hacks naturais"

echo.
echo [4/4] Enviando para GitHub...
"%GIT_PATH%" push

echo.
echo ========================================
echo    DEPLOY CONCLUIDO!
echo ========================================
echo.
echo Aguarde 1-2 minutos para o site atualizar.
echo.
pause
