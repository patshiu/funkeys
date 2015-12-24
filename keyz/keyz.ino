int k1 = 2;
int k2 = 3;
int k3 = 4;
int k4 = 5;
int k5 = 6;
int k6 = 7;
int k7 = 8;
int k8 = 9;
int k9 = 10;
int val1 = 0;
int val2 = 0;
int val3 = 0;
int val4 = 0;
int val5 = 0;
int val6 = 0;
int val7 = 0;
int val8 = 0;
int val9 = 0;
String keyVals = "";
String prevKV = "";

void setup() {
  Serial.begin(9600);
  pinMode(k1, INPUT);
  pinMode(k2, INPUT);
  pinMode(k3, INPUT);
  pinMode(k4, INPUT);
  pinMode(k5, INPUT);
  pinMode(k6, INPUT);
  pinMode(k7 , INPUT);
  pinMode(k8, INPUT);
  pinMode(k9, INPUT);
}


//This is constantly sending
//use EVENT MANAGEMENT
//send only on meaningful information
void loop() {
  val1 = digitalRead(k1);
  val2 = digitalRead(k2);
  val3 = digitalRead(k3);
  val4 = digitalRead(k4);
  val5 = digitalRead(k5);
  val6 = digitalRead(k6);
  val7 = digitalRead(k7);
  val8 = digitalRead(k8);
  val9 = digitalRead(k9);
  prevKV = keyVals; 
  keyVals = "" + k1 + k2 + k3 + k4 + k5 + k6 + k7 + k8 + k9;
  if (keyVals.equals(prevKV)){
    // same as last data not sending
    Serial.println("Same, not sending");
  } else {
    Serial.println(keyVals);
  }
  // Serial.print(val1);
  // Serial.print(val2);
  // Serial.print(val3);
  // Serial.print(val4);
  // Serial.print(val5);
  // Serial.print(val6);
  // Serial.print(val7);
  // Serial.print(val8);
  // Serial.println(val9);
  delay(500);
}
