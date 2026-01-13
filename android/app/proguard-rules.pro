# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.react.**

# Firebase
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# Vector Icons
-keep class com.oblador.vectoricons.** { *; }

# HTML to PDF / PDFBox
-keep class com.tom_roush.pdfbox.** { *; }
-dontwarn com.tom_roush.pdfbox.**
-dontwarn com.gemalto.jp2.**

# Kotlin
-keep class kotlin.Metadata { *; }

# Gson
-keepattributes Signature
-keepattributes *Annotation*
