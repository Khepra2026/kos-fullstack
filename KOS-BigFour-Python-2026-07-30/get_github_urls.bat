@echo off 
git remote -v 
git config --get-regexp remote.*.url 
pause 
