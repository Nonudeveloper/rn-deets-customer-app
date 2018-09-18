import { Platform, AsyncStorage, AppState, Alert } from 'react-native';

import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption } from 'react-native-fcm';
import { fetchUpcomingAndPastAppointments } from '../redux/appointmentList/actions';


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
        if (notif._actionIdentifier === 'view') {
          alert('User clicked View in App');
        }
        if (notif._actionIdentifier === 'dismiss') {
          alert('User clicked Dismiss');
        }
      }, 1000);
    }
  });
}


const handleNotification = (notif, navigation, props) => {
  Alert.alert(
    'Notification',
    notif.message,
    [
      { text: 'Ok', onPress: () => console.log('ok pressed'), style: 'cancel' },
      {
        text: 'View', onPress: () => {
          switch (parseInt(notif.type)) {
            case 1:
              props.dispatch(fetchUpcomingAndPastAppointments());
              props.dispatch(navigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
              break;
            case 2:
              props.dispatch(fetchUpcomingAndPastAppointments());
              props.dispatch(navigation.NavigationActions.navigate({ routeName: 'RunningAppointments', params: { timeInterval: 0 } }));
              break;
            case 3:
              props.dispatch(navigation.NavigationActions.navigate({ routeName: 'SummaryScreen' }));
              break;
            case 4:
              props.dispatch(fetchUpcomingAndPastAppointments());
              props.dispatch(navigation.NavigationActions.navigate({ routeName: 'SuggestedServices' }));
              break;
            case 5:
              props.dispatch(fetchUpcomingAndPastAppointments());
              props.dispatch(navigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
              break;
            case 6:
              props.dispatch(fetchUpcomingAndPastAppointments());
              props.dispatch(navigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
              break;
            default:
              break;
          }
        }
      },
    ],
    { cancelable: false }
  );
};

// these callback will be triggered only when app is foreground or background
export function registerAppListener(navigation, props) {
  FCM.on(FCMEvent.Notification, notif => {
    // handleNotification(notif);
    if (Platform.OS === 'ios' && notif._notificationType === NotificationType.WillPresent && !notif.local_notification) {
      // this notification is only to decide if you want to show the notification when user if in foreground.
      // usually you can ignore it. just decide to show or not.
      notif.finish(WillPresentNotificationResult.All);
      return;
    }

    if (notif.opened_from_tray) {
      console.log(notif);
      switch (parseInt(notif.type)) {
        case 1:
          setTimeout(() => {
            props.dispatch(navigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
          }, 500);
          break;
        case 2:
          setTimeout(() => {
            props.dispatch(navigation.NavigationActions.navigate({ routeName: 'RunningAppointments', params: { timeInterval: 0 } }));
          }, 500);
          break;
        case 3:
          setTimeout(() => {
            props.dispatch(navigation.NavigationActions.navigate({ routeName: 'SummaryScreen' }));
          }, 500);
          break;
        case 4:
          setTimeout(() => {
            props.dispatch(navigation.NavigationActions.navigate({ routeName: 'SuggestedServices' }));
          }, 500);
          break;
        case 5:
          setTimeout(() => {
            props.dispatch(navigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
          }, 500);
          break;
        case 6:
          setTimeout(() => {
            props.dispatch(navigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
          }, 500);
          break;
        default:
          break;
      }
      // if (notif.targetScreen === 'detail') {
      //   setTimeout(() => {
      //     navigation.NavigationActions.navigate({ routeName: 'drawerStack' });
      //   }, 500);
      // }
      // setTimeout(() => {
      //   alert(`User tapped notification\n${JSON.stringify(notif)}`);
      // }, 500);
    } else {
      handleNotification(notif, navigation, props);
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
