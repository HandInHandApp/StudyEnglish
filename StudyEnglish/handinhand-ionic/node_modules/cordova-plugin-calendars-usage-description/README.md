# cordova-plugin-calendars-usage-description

# PhoneGap Calendar Usage Description plugin

for iOS, by [Phuong To](https://github.com/phuongwd)

1. [Description](https://github.com/phuongwd/cordova-plugin-calendars-usage-description#1-description)
2. [Installation](https://github.com/phuongwd/cordova-plugin-calendars-usage-description#2-installation)
    2. [Automatically](https://github.com/phuongwd/cordova-plugin-calendars-usage-description#automatically)
    2. [Manually](https://github.com/phuongwd/cordova-plugin-calendars-usage-description#manually)
3. [Notes](https://github.com/phuongwd/cordova-plugin-calendars-usage-description#3-notes)
4. [License](https://github.com/phuongwd/cordova-plugin-calendars-usage-description#4-license)

## 1. Description

On iOS 10+ you need to provide a reason to the user for Calendar access.
This plugin now adds an empty NSCalendarsUsageDescription key to the /platforms/ios/*-Info.plist file which you can override with your custom string per [Apple's guideline.](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW15 "NSCalendarsUsageDescription")

## 2. Installation

### Automatically
Latest release on npm:
```
$ cordova plugin add cordova-plugin-calendars-usage-description
```

Bleeding edge, from github:
```
$ cordova plugin add https://github.com/phuongwd/cordova-plugin-calendars-usage-description.git
```
Remove:
```
$ cordova plugin rm cordova-plugin-calendars-usage-description
or
$ cordova plugin rm https://github.com/phuongwd/cordova-plugin-calendars-usage-description.git
```

### Manually

#### iOS

1\. Add the following xml to your `*-Info.plist`:
```xml
<!-- for iOS -->
<key>NSCalendarsUsageDescription</key>
<string>Some ad content may access calendar</string>
```


## 3. Note
If you using the plugin PhoneGap Calendar plugin - version 4.5.1.
You do not need to install [this plugin](https://github.com/phuongwd/cordova-plugin-calendars-usage-description "Calendar Usage Description plugin").

## 4. License

[The MIT License (MIT)](http://www.opensource.org/licenses/mit-license.html)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.