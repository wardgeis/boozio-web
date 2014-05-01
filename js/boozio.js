Boozio = Ember.Application.create();

Boozio.ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: new Firebase('https://boozio.firebaseio.com')
});

Boozio.ApplicationSerializer = DS.FirebaseSerializer.extend();

Boozio.Router.map(function() {
  this.route('drinks', {path: '/'});
  this.route('drink', {path: '/:drinkName'});
  this.route('new', {path: '/new'});
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

Boozio.Drink = DS.Model.extend({
  drinkName: DS.attr('string'),
});

Boozio.DrinksController = Ember.ArrayController.extend({
  actions: {
    createDrink: function() {
      //Get the drink name set by the 'New Drink' text field
      var drinkName = this.get('newDrinkName');
      if (!drinkName.trim()) {return; }

      // create the new drink model
      var drink = this.store.createRecord('drink', {
        drinkName: drinkName,
      });

      // Clear the 'New Drink' field
      this.set('newDrinkName', '');

      //save the new drink model
      drink.save();
    }
  }
});
