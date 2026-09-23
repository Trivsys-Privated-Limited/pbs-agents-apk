var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        console.log('Device Ready - Initializing OneSignal');
        
        // Initialize OneSignal for Android (Cordova Native Plugin)
        if (typeof OneSignal !== 'undefined' && OneSignal) {
            try {
                // Initialize with App ID
                OneSignal.setAppId("c78e24ff-eb25-4b0a-8263-196e991e1404");
                
                console.log('OneSignal initialized with App ID');
                
                // Request notification permission (Android 13+)
                if (OneSignal.Notifications && OneSignal.Notifications.requestPermission) {
                    OneSignal.Notifications.requestPermission(true).then(function(success) {
                        console.log('OneSignal permission requested:', success);
                    }).catch(function(error) {
                        console.log('OneSignal permission error:', error);
                    });
                }
                
                // Handle notification opened
                OneSignal.Notifications.addEventListener('click', function(event) {
                    console.log('Notification clicked:', event);
                    var notification = event.notification;
                    console.log('Notification ID:', notification.id);
                    console.log('Notification title:', notification.title);
                });
                
                // Handle notification received (foreground)
                OneSignal.Notifications.addEventListener('foreground', function(event) {
                    console.log('Notification received in foreground:', event);
                    var notification = event.notification;
                    console.log('Notification title:', notification.title);
                    console.log('Notification body:', notification.body);
                });
                
                // Handle notification permission change
                if (OneSignal.User) {
                    OneSignal.User.pushSubscription.addEventListener('change', function(event) {
                        console.log('Push subscription changed:', event);
                        if (event.current.token) {
                            console.log('Device push token:', event.current.token);
                        }
                    });
                }
                
                // Get and log push subscription ID
                setTimeout(function() {
                    if (OneSignal.User && OneSignal.User.pushSubscription) {
                        var pushSubscription = OneSignal.User.pushSubscription;
                        console.log('OneSignal Push Subscription ID:', pushSubscription.id);
                        console.log('OneSignal Push Token:', pushSubscription.token);
                    }
                }, 1000);
                
            } catch(e) {
                console.error('OneSignal initialization error:', e);
            }
        } else {
            console.warn('OneSignal plugin not available');
        }
        
        // Show app container
        document.getElementById('deviceready').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
        console.log('App initialized successfully');
    }
};

app.initialize();
