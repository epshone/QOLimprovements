# QOLimprovements
## Appian Tabs
Appian Tabs Alpha version 0.2.0c (PRE-ALPHA BUILD: 2315-SNAPSHOT) is a state of the art QOL improvement which takes an action that used to take seconds and makes it take less seconds. 

Blaze past the competition with newly exposed keyboard shortcuts which open new tabs for common Appian URLS (/design, /designer, /design/rule, /tempo, /admin, /database).

Appian Tabs will automatically detect your current environment based on the tabs you have open. Your currently active tab will take precedence. If your current tabs URL does not contain "/suite/" it will look at the active window from right to left until the URL matches "/suite/".

We hope you enjoy this incredible improvement to your quality of life.
# Instructions
1. Download the contents directory
2. Go to the URL chrome://extensions
3. Check developer mode
4. Load unpacked extension
5. Select the contents directory and import
6. Open the Appian Tabs menu by clicking on the Macedon Logo in the extensions bar
7. Click "Update Shortcuts" and update your hotkeys for each shortcut
## CHANGELOG
### VERSION 0.2.0j
**Added Shortcut**: Added shortcut for design/objects. Suggested key binding: alt + shift + 3
### VERSION 0.2.0f
**Lock Environment**: Override the Dynamic Environment Detection (TM) and always open new tabs in the default environment by selecting "Lock Environment" in the Appian Tabs menu. 
### VERSION 0.2.0c
**Update Shortcuts**: Users may now update their keyboard shortcuts in the Appian Tabs menu by clicking "Update Shortcuts"!
### VERSION 0.2.0a
**Default Environments**: If no tabs match "/suite/" it will use the default URL, which may be set in the Appian Tabs menu.

