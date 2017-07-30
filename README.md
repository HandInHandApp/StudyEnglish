## Welcome to handinhand-studyenglish app

cd ./StudyEnglish/handinhand-ionic2

### Install
  npm install 


### Start web:
dev:  ionic serve
prod http: screen -d -m -L ionic serve -lcsdb  --nolivereload --nobrowser
vist: http://106.14.195.26:8100/

prod https:      cd ssl &&  screen -d -m -L node proxy.js 
vist:https://106.14.195.26:8080/

### Start ios app:
  ionic cordova platform add ios
  ionic cordova build ios
  ionic emulate ios --list
  ionic cordova  emulate ios --list
  ionic cordova  emulate ios 
  ionic cordova  emulate ios  --target="iPad-Air"


### save all dependens:
  npm shrinkwrap

