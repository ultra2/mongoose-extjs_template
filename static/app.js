var viewport = null;

Ext.Loader.setConfig({
    enabled: true
});

Ext.create('app.extjsModelRequires').Download();

Ext.application({
    name: 'app',
    launch: function() {
        viewport = Ext.create('app.view.Viewport');
        viewport.show();
    }
});
