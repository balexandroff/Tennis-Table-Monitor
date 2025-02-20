#include <WiFi.h>
#include <FirebaseESP32.h>

// Provide your Wi-Fi credentials
const char* WIFI_SSID = "Blankfactor Staff";
const char* WIFI_PASSWORD = "bl@nkf@ct0r";

// Firebase configuration
const char* FIREBASE_HOST = "https://tabletennis-detector-default-rtdb.firebaseio.com/";
const char* FIREBASE_AUTH = "eoOqKSYqwO5PhYXbVaZ73HNclbQwRDaBC9cBiMlO";

//const int pirPin = 0; // Use P0 for the PIR sensor
const int vibrationPin = 2; // Use P2 for the vibration sensor

// Firebase Objects
FirebaseData firebaseData;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
    Serial.begin(115200);

    // Set the PIR pin as input
    //pinMode(pirPin, INPUT);
    pinMode(vibrationPin, INPUT);

    // Connect to WiFi
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi!");

    // Configure Firebase
    config.host = FIREBASE_HOST;   // Set database URL
    config.signer.tokens.legacy_token = FIREBASE_AUTH;  // Use Database Secret

    // Initialize Firebase
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);

    Serial.println("Firebase initialized.");
}

void loop() {
  
    unsigned long timestamp = millis();
    String eventPath = "/ball_events/event_" + String(timestamp);

    int vibrationDetected = digitalRead(vibrationPin);
    //int pirDetected = digitalRead(pirPin);

    // Check if vibration is detected
    if (vibrationDetected == HIGH) {
      if (Firebase.setInt(firebaseData, eventPath + "/timestamp", timestamp)) {
        Serial.println("Vibration detected! Data sent to Firebase.");
      } else {
          Serial.println("Firebase write failed: " + firebaseData.errorReason());
      }
    }
    /*
    // Check if PIR detected
    if (pirDetected == HIGH) {
      if (Firebase.setInt(firebaseData, eventPath + "/timestamp", timestamp)) {
        Serial.println("PIR detected! Data sent to Firebase.");
      } else {
          Serial.println("Firebase write failed: " + firebaseData.errorReason());
      }
    }
    */
    delay(50);  // Small debounce delay
}