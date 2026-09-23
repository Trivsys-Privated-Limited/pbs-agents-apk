var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        console.log('=== DEVICE READY ===');
        console.log('Initializing OneSignal Native Plugin');

        // Small delay to ensure plugin is fully loaded
        setTimeout(function() {
            console.log('Checking OneSignal availability...');

            if (window.OneSignal) {
                console.log('✓ OneSignal object found');
                try {
                    // The OneSignal app ID from Firebase/OneSignal dashboard
                    var appId = "c78e24ff-eb25-4b0a-8263-196e991e1404";
                    console.log('Initializing with App ID: ' + appId);

                    // Initialize OneSignal
                    window.OneSignal.initialize(appId);
                    console.log('✓ OneSignal.initialize() called successfully');

                    // Request notification permission immediately
                    console.log('Requesting notification permissions...');
                    window.OneSignal.Notifications.requestPermission(true).then(function() {
                        console.log('✓ Notification permission requested');
                    }).catch(function(err) {
                        console.log('✗ Permission error:', err);
                    });

                    // Listen for notifications
                    window.OneSignal.Notifications.addEventListener('click', function(event) {
                        console.log('📢 Notification clicked:', event.notification);
                    });

                    window.OneSignal.Notifications.addEventListener('foreground', function(event) {
                        console.log('📢 Notification received (foreground):', event.notification);
                    });

                    // Check user subscription status after a delay
                    setTimeout(function() {
                        console.log('=== CHECKING SUBSCRIPTION STATUS ===');

                        if (window.OneSignal.User) {
                            console.log('User object available');

                            var pushSubscription = window.OneSignal.User.pushSubscription;
                            if (pushSubscription) {
                                var id = pushSubscription.id;
                                var token = pushSubscription.token;

                                console.log('Push Subscription ID: ' + id);
                                console.log('Push Token: ' + token);

                                if (id) {
                                    console.log('✓✓✓ DEVICE IS SUBSCRIBED TO ONESIGNAL ✓✓✓');
                                } else {
                                    console.log('✗ Device is NOT subscribed - ID is null');
                                    console.log('Check notification permissions on phone');
                                }
                            } else {
                                console.log('✗ pushSubscription is null');
                            }
                        } else {
                            console.log('✗ OneSignal.User not available');
                        }
                    }, 2000);

                } catch(error) {
                    console.error('✗ OneSignal initialization error:', error.message);
                    console.error('Stack:', error.stack);
                }
            } else {
                console.error('✗✗✗ ONESIGNAL PLUGIN NOT FOUND ✗✗✗');
                console.error('The OneSignal native plugin may not be installed');
                console.error('Check config.xml and package.json');
            }
        }, 500);

        // Show app container
        var devicereadyElement = document.getElementById('deviceready');
        if (devicereadyElement) {
            devicereadyElement.style.display = 'none';
        }

        var appContainer = document.getElementById('app-container');
        if (appContainer) {
            appContainer.style.display = 'block';
        }

        console.log('App container displayed');
    }
};

app.initialize();
