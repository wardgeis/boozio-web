Boozio = Ember.Application.create();

/* Let's hold off on Firebase until we're further along

Boozio.ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: new Firebase('https://boozio.firebaseio.com')
});

Boozio.ApplicationSerializer = DS.FirebaseSerializer.extend();
*/

// Load local storage adapter and local storage serializer
Boozio.ApplicationSerializer = DS.LSSerializer.extend();
Boozio.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'boozio'
});

Boozio.Router.map(function() {
  this.route('drinks', {path: '/'});
  this.route('drink', {path: '/drinks/:drink_id'});
  this.route('new', {path: '/drinks/new'})
});


Boozio.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('drinks');
  }
});

Boozio.DrinksRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('drink');
  }
});

Boozio.DrinkRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('drink', params.drink_id);
  }
});

Boozio.NewRoute = Ember.Route.extend({});

Boozio.Drink = DS.Model.extend({
  drinkName: DS.attr('string'),
  description: DS.attr('string')
});

Boozio.NewController = Ember.ArrayController.extend({
  actions: {
    createDrink: function() {
      //Get the drink name set by the 'New Drink' text field
      var drinkName = this.get('newDrinkName');
      if (!drinkName.trim()) {return; }

      var description = this.get('newDescription');

      // create the new drink model
      var drink = this.store.createRecord('drink', {
        drinkName: drinkName,
        description: description
      });

      // Clear the 'New Drink' field
      this.set('newDrinkName', '');

      //save the new drink model
      drink.save();
      this.transitionTo('drinks');
    }
  }
});
