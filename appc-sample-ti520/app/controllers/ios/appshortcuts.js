var log = require('log');

function createShortcut(e) {

  if (Ti.Contacts.hasContactsPermissions()) {
    return _createShortcut();
  }

  if (Ti.Contacts.contactsAuthorization === Ti.Contacts.AUTHORIZATION_RESTRICTED) {
    return alert('Access to contacts has been restricted');
  }

  Ti.Contacts.requestContactsPermissions(function (e2) {

    if (!e2.success) {
      return alert(e2.error || 'Error #' + e2.code);
    }

    _createShortcut();
  });
}

function _createShortcut() {

  Ti.Contacts.showContacts({

    // Called when the user has selected a contact person
    selectedPerson: function (e) {
      var appShortcuts = Ti.UI.iOS.createApplicationShortcuts();

      // remove previous shortcut of this type, if any
      appShortcuts.removeDynamicShortcut('contact');

      // add the new shortcut
      appShortcuts.addDynamicShortcut({
        itemtype: 'contact',
        title: e.person.fullName,
        userInfo: {
          person: {
            fullName: e.person.fullName
          }
        },

        // use the contact person as the icon
        icon: e.person
      });

      alert('Now move your app to the background and force touch the app icon to see the contact icon');
    }
  });
}
