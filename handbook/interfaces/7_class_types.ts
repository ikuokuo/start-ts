{
  interface ClockInterface {
    currentTime: Date;
  }

  class Clock implements ClockInterface {
    currentTime: Date = new Date();
    constructor(h: number, m: number) { }
  }
}

{
  interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
  }

  class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
      this.currentTime = d;
    }
    constructor(h: number, m: number) { }
  }
}

{
  // A class implements an interface, only the instance side of the class is checked.
  // Since the constructor sits in the static side, it is not included in this check.

  interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
  }
  interface ClockInterface {
    tick(): void;
  }

  function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
  }

  class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
      console.log("beep beep");
    }
  }
  class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
      console.log("tick tock");
    }
  }

  let digital = createClock(DigitalClock, 12, 17);
  let analog = createClock(AnalogClock, 7, 32);

  // checks that AnalogClock has the correct constructor signature
}
// Another simple way is to use class expressions:
{
  interface ClockConstructor {
    new (hour: number, minute: number);
  }

  interface ClockInterface {
    tick();
  }

  const Clock: ClockConstructor = class Clock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
      console.log("beep beep");
    }
  }
}
