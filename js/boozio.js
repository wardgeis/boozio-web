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
  this.route('drinks', {path: '/drinks'});
  this.route('drink', {path: '/drinks/:drink_id'});
  this.route('newdrink', {path: '/drinks/newdrink'});
  this.route('ingredients', {path: '/ingredients'});
  this.route('ingredient', {path: '/ingredients/:ingredient_id'});
  this.route('newingredient', {path: '/ingredients/new'});
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

Boozio.IngredientsRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('ingredient');
  }
});

Boozio.IngredientRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('ingredient', params.drink_id);
  }
});

Boozio.NewdrinkRoute = Ember.Route.extend({});

Boozio.NewingredientRoute = Ember.Route.extend({});

Boozio.Drink = DS.Model.extend({
  drinkName: DS.attr('string'),
  description: DS.attr('string')
});

Boozio.Ingredient = DS.Model.extend({
  ingredientName: DS.attr('string'),
});

Boozio.NewdrinkController = Ember.ArrayController.extend({
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
      this.transitionToRoute('drinks');
    }
  }
});

Boozio.NewingredientController = Ember.ArrayController.extend({
  actions: {
    createIngredient: function() {
      //Get the ingredient name set by the 'New Ingredient' text field
      var ingredientName = this.get('newIngredientName');
      if (!ingredientName.trim()) {return; }

      // create the new ingredient model
      var ingredient = this.store.createRecord('ingredient', {
        ingredientName: ingredientName,
      });

      // Clear the 'New Ingredient' field
      this.set('newingredientName', '');

      //save the new ingredient model
      ingredient.save();
      this.transitionToRoute('ingredients');
    }
  }
});

Boozio.DrinkController = Ember.ObjectController.extend({
  doDeleteDrink: function(drink) {
     this.store.deleteRecord(drink);
     drink.save();
     this.transitionToRoute('drinks');
  }
});

Boozio.IngredientController = Ember.ObjectController.extend({
  doDeleteIngredient: function(ingredient) {
     this.store.deleteRecord(ingredient);
     ingredient.save();
     this.transitionToRoute('ingredients');
  }
});
