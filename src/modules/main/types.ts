export type CalendarEvent = {
  id: string;
  description: string;
  start: number;
  end: number;
};

export type TimeSlot = {
  id: [index: number, description: string];
  startSlot: Date;
  endSlot: Date;
  events: Array<CalendarEvent>;
};

export const generateID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
};

export const generateEventTemplate = (): CalendarEvent => {
  const currentDate = new Date();

  const eventStart = new Date(currentDate);
  eventStart.setHours(eventStart.getHours() + 1);
  const eventEnd = new Date(currentDate);
  eventEnd.setHours(eventStart.getHours() + 2);

  const event: CalendarEvent = {
    id: generateID(),
    description: 'Ex: Basketball training',
    start: eventStart.getTime(),
    end: eventEnd.getTime(),
  };
  return event;
};

export type EventAction = 'edit' | 'create';
