import { NativeModules } from 'react-native';
const { HelloWorldModule } = NativeModules;

interface IHelloWorldModule { 
  createCalendarEvent: (eventName: string, location: string, cb: (error: string, res: string) => void) => void;
  createCalendarEvent2: (eventName: string, location: string) => Promise<string>; 
}

export const HelloWorld: IHelloWorldModule = HelloWorldModule;