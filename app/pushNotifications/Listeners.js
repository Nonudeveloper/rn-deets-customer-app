import { Platform, AsyncStorage, AppState, Alert } from 'react-native';

import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption } from 'react-native-fcm';

AsyncStorage.getItem('lastNotification').then(data => {
  if (data) {
    // if notification arrives when app is killed, it should still be logged here
    console.log('last notification', JSON.parse(data));
    AsyncStorage.removeItem('lastNotification');
  }
});

AsyncStorage.getItem('lastMessage').then(data => {
  if (data) {
    // if notification arrives when app is killed, it should still be logged here
    console.log('last message', JSON.parse(data));
    AsyncStorage.removeItem('lastMessage');
  }
});

export function registerKilledListener() {
  // these callback will be triggered even when app is killed
  FCM.on(FCMEvent.Notification, notif => {
    AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
    if (notif.opened_from_tray) {
      setTimeout(() => {
        if (notif._actionIdentifier === 'reply') {
          if (AppState.currentState !== 'background') {
            console.log('User replied ' + JSON.stringify(notif._userText));
            alert('User replied ' + JSON.stringify(notif._userText));
          } else {
            AsyncStorage.setItem('lastMessage', JSON.stringify(notif._userText));
          }
        }
        if (notif._actionIdentifier === 'view'){
          alert('User clicked View in App');
        }
        if (notif._actionIdentifier === 'dismiss'){
          alert('User clicked Dismiss');
        }
      }, 1000);
    }
  });
}

const handleNotification = notif => {
  const parsedBody = JSON.parse(notif.fcm.body)
  
  Alert.alert(
    'Notification',
    parsedBody.message,
    [
      { text: 'Ok', onPress: () => console.log('ok pressed'), style: 'cancel' },
      { text: 'View', onPress: () => {
        switch (parsedBody.type) {
          case 1:
            console.log('take me to the appointment');
            break;
          case 2:
            console.log('appointmment has been started');
            break;
          case 3:
            console.log('appointment has been completed');
            break;
          case 4:
            console.log('more services has been suggested');
            break;
          case 5:
            console.log('cancelled with no show flag');
            break;
          case 6:
            console.log('technician has cancelled the sevice');
            break;
          default:
            break;
        }
      } },
    ],
    { cancelable: false }
  );
};

// these callback will be triggered only when app is foreground or background
export function registerAppListener(navigation) {
  FCM.on(FCMEvent.Notification, notif => {
    console.log('Notification', notif);
    handleNotification(notif);
    if (Platform.OS === 'ios' && notif._notificationType === NotificationType.WillPresent && !notif.local_notification) {
      // this notification is only to decide if you want to show the notification when user if in foreground.
      // usually you can ignore it. just decide to show or not.
      notif.finish(WillPresentNotificationResult.All);
      return;
    }

    if (notif.opened_from_tray) {
      if (notif.targetScreen === 'detail') {
        setTimeout(() => {
          navigation.navigate('Detail');
        }, 500);
      }
      setTimeout(() => {
        alert(`User tapped notification\n${JSON.stringify(notif)}`);
      }, 500);
    }
  });

  FCM.on(FCMEvent.RefreshToken, token => {
    console.log('TOKEN (refreshUnsubscribe)', token);
  });

  FCM.enableDirectChannel();
  FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
    console.log('direct channel connected' + data);
  });
  setTimeout(() => {
    FCM.isDirectChannelEstablished().then(d => console.log(d));
  }, 1000);
}

FCM.setNotificationCategories([
  {
    id: 'com.myidentifi.fcm.text',
    actions: [
      {
        type: NotificationActionType.TextInput,
        id: 'reply',
        title: 'Quick Reply',
        textInputButtonTitle: 'Send',
        textInputPlaceholder: 'Say something',
        intentIdentifiers: [],
        options: NotificationActionOption.AuthenticationRequired
      },
      {
        type: NotificationActionType.Default,
        id: 'view',
        title: 'View in App',
        intentIdentifiers: [],
        options: NotificationActionOption.Foreground
      },
      {
        type: NotificationActionType.Default,
        id: 'dismiss',
        title: 'Dismiss',
        intentIdentifiers: [],
        options: NotificationActionOption.Destructive
      }
    ],
    options: [NotificationCategoryOption.CustomDismissAction, NotificationCategoryOption.PreviewsShowTitle]
  }
]);
