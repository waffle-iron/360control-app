npm install
npm update

bower update angular --force
bower update angular-animate --force
bower update angular-moment --force
bower update angular-sanitize --force
bower update angular-ui-router --force
bower update ionic --force
bower update moment --force
bower update ng-lodash --force
bower update ngCordova --force
bower update --force
ionic setup sass
gulp

ionic plugin remove cordova-plugin-device-orientation --force --save
ionic plugin remove cordova-plugin-device --force --save
ionic plugin remove cordova-plugin-file --force --save
ionic plugin remove cordova-plugin-network-information --force --save
ionic plugin remove cordova-plugin-splashscreen --force --save
ionic plugin remove cordova-plugin-console --force --save
ionic plugin remove cordova-plugin-whitelist --force --save
ionic plugin remove cordova-plugin-statusbar --force --save
ionic plugin remove ionic-plugin-keyboard --force --save

ionic plugin add cordova-plugin-device-orientation --save
ionic plugin add cordova-plugin-device --save
ionic plugin add cordova-plugin-file --save
ionic plugin add cordova-plugin-network-information --save
ionic plugin add cordova-plugin-splashscreen --save
ionic plugin add cordova-plugin-console --save
ionic plugin add cordova-plugin-whitelist --save
ionic plugin add cordova-plugin-statusbar --save
ionic plugin add ionic-plugin-keyboard --save

ionic platform rm android
ionic platform add android
