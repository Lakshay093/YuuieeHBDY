@echo off
setlocal

cd /d "%~dp0"

echo.
echo Starting Her Birthday Universe...
echo.

set "CODEX_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if exist "%CODEX_NODE%" (
  set "NODE_EXE=%CODEX_NODE%"
) else (
  where node >nul 2>nul
  if errorlevel 1 (
    echo Node.js was not found.
    echo Please install Node.js 22 LTS from https://nodejs.org/ and run this file again.
    echo.
    pause
    exit /b 1
  )
  set "NODE_EXE=node"
)

for /f "delims=" %%V in ('"%NODE_EXE%" -p "process.version"') do set "NODE_VERSION=%%V"
"%NODE_EXE%" -e "const [major, minor] = process.versions.node.split('.').map(Number); process.exit((major === 20 && minor >= 19) || (major === 22 && minor >= 12) || major >= 23 ? 0 : 1)"
if errorlevel 1 (
  echo This project needs Node.js 20.19+ or 22.12+.
  echo Found %NODE_VERSION%.
  echo Please install Node.js 22 LTS from https://nodejs.org/ and run this file again.
  echo.
  pause
  exit /b 1
)

set "NPM_CLI=%ProgramFiles%\nodejs\node_modules\npm\bin\npm-cli.js"
if not exist "%NPM_CLI%" if defined ProgramFiles(x86) set "NPM_CLI=%ProgramFiles(x86)%\nodejs\node_modules\npm\bin\npm-cli.js"

if not exist "node_modules" (
  echo Installing project dependencies...
  if not exist "%NPM_CLI%" (
    echo npm was not found.
    echo Please install Node.js 22 LTS from https://nodejs.org/ and run this file again.
    echo.
    pause
    exit /b 1
  )
  call "%NODE_EXE%" "%NPM_CLI%" install --include=optional
  if errorlevel 1 (
    echo.
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

if exist "node_modules\rolldown" if not exist "node_modules\@rolldown\binding-win32-x64-msvc" (
  if not exist "%NPM_CLI%" (
    echo npm was not found, and the Rolldown native dependency is missing.
    echo Please install Node.js 22 LTS from https://nodejs.org/ and run this file again.
    echo.
    pause
    exit /b 1
  )
  for /f "delims=" %%P in ('"%NODE_EXE%" -e "const pkg = require('./node_modules/rolldown/package.json'); console.log('@rolldown/binding-win32-x64-msvc@' + pkg.optionalDependencies['@rolldown/binding-win32-x64-msvc'])"') do set "ROLLDOWN_BINDING=%%P"
  echo Repairing missing Rolldown native dependency...
  call "%NODE_EXE%" "%NPM_CLI%" install "%ROLLDOWN_BINDING%" --no-save --include=optional
  if errorlevel 1 (
    echo.
    echo Rolldown native dependency repair failed.
    pause
    exit /b 1
  )
)

echo.
echo Opening the site at http://127.0.0.1:5173/
echo Press Ctrl+C in this window to stop the server.
echo.

start "" "http://127.0.0.1:5173/"
call "%NODE_EXE%" ".\node_modules\vite\bin\vite.js" --host 127.0.0.1

pause
