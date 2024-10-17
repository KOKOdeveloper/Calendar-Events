import {useState, useRef, useEffect} from 'react';
import {
  EmitterSubscription,
  Keyboard,
  Platform,
  KeyboardEvent,
} from 'react-native';

const useKeyboardInset = () => {
  const [bottom, setBottoom] = useState(0);
  const subscriptions = useRef<EmitterSubscription[]>([]);

  useEffect(() => {
    subscriptions.current = [
      Keyboard.addListener('keyboardDidHide', e => setBottoom(0)),
      Keyboard.addListener('keyboardDidShow', (e: KeyboardEvent) => {
        if (Platform.OS === 'android') {
          setBottoom(e.endCoordinates.height);
        } else {
          setBottoom(
            Math.max(e.startCoordinates?.height || e.endCoordinates.height),
          );
        }
      }),
    ];
    return () => {
      subscriptions.current.forEach(subscription => {
        subscription.remove();
      });
    };
  }, [setBottoom, subscriptions]);

  return {bottom};
};

export default useKeyboardInset;
