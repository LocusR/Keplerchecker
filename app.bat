@echo off
echo Starting Client and Server applications...

cd client
start cmd /k npm run dev

cd ../server
start cmd /k npm run dev

echo Both applications are now running.
echo Close this window to stop both applications.
pause