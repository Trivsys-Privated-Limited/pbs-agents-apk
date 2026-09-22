var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        console.log('Device Ready - Initializing OneSignal');
        
        // Initialize OneSignal for Android
        if (typeof OneSignal !== 'undefined' && OneSignal && OneSignal.Notifications) {
            try {
                // Request notification permission (Android 13+)
                OneSignal.Notifications.requestPermission(true).then(function(success) {
                    console.log('OneSignal permission requested:', success);
                });
                
                // Handle notification opened
                OneSignal.Notifications.addEventListener('click', function(event) {
                    console.log('Notification clicked:', event);
                });
                
                // Handle notification received
                OneSignal.Notifications.addEventListener('foreground', function(event) {
                    console.log('Notification received in foreground:', event);
                });
            } catch(e) {
                console.log('OneSignal initialization error:', e);
            }
        }
        
        // Show app container
        document.getElementById('deviceready').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
        console.log('App initialized successfully');
    }
};

app.initialize();
