/* Author: Amy Lee
 * GWC SIP 2018 - Kate Spade-NYU Tandon
 * U2L1: Intro to Robotics
 * LED Blink Activity - Solution Code
 */

// This program displays a blinking LED

int pin = 10; // Make sure your circuit is using digital pin 10!

void setup(){
  // Set pin to OUTPUT (i.e. sending power to the LED)
  pinMode(pin, OUTPUT);
}

void loop(){
  // Blink
  digitalWrite(pin, HIGH);
  delay(unit);
  digitalWrite(pin, LOW);
  delay(unit);
}
