var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        console.log('Device Ready - Initializing OneSignal Native Plugin');
        
        // Initialize OneSignal for Android (Native Cordova Plugin)
        if (typeof OneSignal !== 'undefined') {
            console.log('OneSignal plugin detected');
            try {
                // Initialize OneSignal with App ID (Native Plugin)
                // App ID: c78e24ff-eb25-4b0a-8263-196e991e1404
                OneSignal.initialize("c78e24ff-eb25-4b0a-8263-196e991e1404");
                console.log('OneSignal.initialize() called');
                
                // Add event listeners BEFORE requesting permission
                OneSignal.Notifications.addEventListener('click', function(event) {
                    console.log('Notification clicked:', event.notification);
                });
                
                OneSignal.Notifications.addEventListener('foreground', function(event) {
                    console.log('Notification received (foreground):', event.notification);
                });
                
                // Request notification permission for Android 13+
                OneSignal.Notifications.requestPermission(true);
                console.log('Notification permission requested');
                
                // Check subscription status
                setTimeout(function() {
                    if (OneSignal.User && OneSignal.User.pushSubscription) {
                        var subId = OneSignal.User.pushSubscription.id;
                        var token = OneSignal.User.pushSubscription.token;
                        console.log('OneSignal Subscription ID:', subId);
                        console.log('OneSignal Push Token:', token);
                        
                        if (subId) {
                            console.log('Device is SUBSCRIBED to OneSignal');
                        } else {
                            console.log('Device is NOT subscribed - check permissions');
                        }
                    } else {
                        console.log('OneSignal.User object not ready yet');
                    }
                }, 2000);
                
            } catch(e) {
                console.error('OneSignal initialization error:', e.message);
            }
        } else {
            console.error('OneSignal plugin NOT available - plugin may not be installed');
        }
        
        // Show app container
        document.getElementById('deviceready').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
        console.log('App initialized successfully');
    }
};

app.initialize();
