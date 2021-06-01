 jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
 cd platforms\android\app\build\outputs\apk\release\
 %ANDROID_HOME%\build-tools\28.0.1\zipalign.exe -v 4 app-release-unsigned.apk wittr-app-%1.apk
 cd ../../../../../../../
