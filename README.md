# Semester-Micro-bit-Project
For a semester project, my mentor Richard and I set out to learn about physical applications of computing with the help of the Micro:bit. This repository is a small record of that journey, from knowing nothing, to now embarking on my own DIY projects with confidence.

Before we started, we talked about what could be a good avenue for a project for the semester. Richard found a "smart car" kit compatible with the Micro:bit and pitched some ideas. I had never done anything with robotics or engineering in any way, so I set off from square one.

I spent early hours of the project assembling the smart car, reading documentation, and following tutorials to access the different functionalities of the smart car and the Micro:bit. While doing so, a friend with 4 dogs joked about turning the car into a pooper scooper. We had a laugh and moved on. I mentioned it to Richard and he liked it. The new project heading was to create a proof of concept for a robotic pooper scooper.

Enter PooperScooperDraft.ts

This was a draft of code I worked up to to utilize the Micro:bit's compass to navigate the pooper scooper. What I found was that though my code felt solid, the car was operating with wild inconsistency. I spent a lot of time tweaking and adjusting my code to get it working and I just couldn't figure it out. This was exasperated by the finnicky nature of less expensive hardware. With some help from Richard, I set out to test the compass of the Micro:bit.

Enter CompassTester.ts

I set up a test where I would collect compass readings for 1 minute, rotate the car, then collect again for a total of 5 minutes. I would do this with the smart car and independent of it. The results were telling after just one test. With the Micro:bit in the car, there were reading variations of up to 100 degrees while facing the same direction, completely still. Independent of the car, readings had a max variance of 8 degrees. The car was scewing the compass which was nullifying my code. I presented my journey thus far on Campus a science poster session. 

Enter RandMovSim.ts

So it was decided that the compass would not work for navigating the smart car. Leaving me with the only option of random movement around a walled environment. It sees a wall, it stops, it turns.

Enter MethaneSensor.ts

Somewhere in our plans we decided that this hypothetical pooper scooper could use a sensor to help detect "targets". There wasn't much left to do with the smart car, so my attention shifted to a small methane sensor chip. A singular chip in a box with no wire, connectors, instructions, or datasheet.
Richard did some soldering and I was ready to plug it in. I was able to find a few lines of code for Arduino, and did what I could to convert it to typescript. Some initial testing showed the sensor worked but was just outputting ambient analog voltage readings. I was able to find the datasheet for the sensor, but it was completely in chinese. Once that was sorted out, I was able to "borrow" about 20 liters of methane from work to test this sensor out. The sensor operates at 5v while the Micro:bit only outputs 3.3 which lowers the accuracy of the sensor. Early tests showed activity but it was hard to tell from what as readings would spike at movement or breathing on it. Further tests and converting the analog readings to ppm eventually led to accurate readings from the sensor.

This is where the project ended. No pooper scooper to show for it, but a lot was learned and some decent code was written.
