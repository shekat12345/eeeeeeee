@rem Helper batch file for executing Gradle builds on Windows systems
@echo off
set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%
"%APP_HOME%\gradlew.bat" %*
