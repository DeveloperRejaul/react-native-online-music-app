package com.rejaul.reactnativeonlinemusic
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.util.Log
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise



import android.widget.TextView
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
class HelloWorldModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "HelloWorldModule"

    @ReactMethod
    fun createCalendarEvent(name: String, location: String, callback: Callback ) {
        Log.d("CalendarModule", "Create event called with name: $name and location: $location")

        callback.invoke(null, location);
    }

    @ReactMethod
    fun createCalendarEvent2(name: String, location: String, promise: Promise) {
        try {
            val eventId = "$name $location"
            promise.resolve(eventId)
        } catch (e: Throwable) {
            promise.reject("Create Event Error", e)
        }
    }
}


// create component
class CustomTextViewManager : SimpleViewManager<TextView>() {

    override fun getName() = "UniqueCustomTextViewwqerqwreqwfsad"

    override fun createViewInstance(reactContext: ThemedReactContext): TextView {
        return TextView(reactContext)
    }

    @ReactProp(name = "text")
    fun setText(view: TextView, text: String) {
        view.text = text
    }

    @ReactProp(name = "textSize")
    fun setTextSize(view: TextView, textSize: Float) {
        view.textSize = textSize
    }
}