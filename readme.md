# Angular-Gant test application

## Angular-Gant GitHub project
https://github.com/angular-gantt/angular-gantt

## Prerequisites
1. Install NodeJs and Yarn
2. Install VSCode and extensions

## Solution projects

### Test-Angular-Gantt (Web project)
1. Restore client packages using **yarn install** command.
2. Start live server in VSCode (click on **Go Live** button in status bar). It will start a local web server listening on 5500 HTTP port.
3. Launch application with VSCode debugger with **Launch Chrome** configuration. Change will be reflected when source code is saved.
4. Application use **data.json** file to create appointments in control. This file can be generated with Data-Generator application.

### Data-Generator (Console application)
1. Launch application using **.NET Core Launch (Console)** configuration in VSCode debugger (compile and launch application).
2. The number of Projects / Work Orders / Tasks generated can be changed at the beginning of **Program.cs** file (const values).

## VSCode extension to used

**Debugger for Chrome**

Debug your JavaScript code in the Chrome browser, or any other target that supports the Chrome Debugger protocol.
<br/>
***Version*** : 4.12.6
<br/>
https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome

**Live Server**

Launch a development local Server with live reload feature for static & dynamic pages
<br/>
***Version*** : 5.6.1
<br/>
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

**C#**

C# for Visual Studio Code (powered by OmniSharp).
<br/>
***Version*** : 1.21.18
<br/>
https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp