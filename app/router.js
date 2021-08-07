import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('book', { path: "/books" }, function() {
    this.route('detail', { path: "/:id" });
    this.route('create');
    this.route('edit', { path: "/:id/edit" });
    this.route('search-by-tag', { path: "/search-by-tag/:" });
  });
  this.route('404', { path: "*path" });
  this.route('speaker', { path: "/speakers" }, function() {
    this.route('detail', { path: "/:id" });
    this.route('create');
    this.route('edit', { path: "/:id/edit" });
  });
});

export default Router;
