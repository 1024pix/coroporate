import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('school-education', { path: 'enseignement-scolaire' });
  this.route('higher-education', { path: 'enseignement-superieur' });
  this.route('employers', { path: 'employeurs' });
  this.route('faq', { path: 'aide' }, function() {
    this.route('get', { path: '/:uid' });
  });
  this.route('404');
  this.route('jobs', { path: 'recrutement' }, function() {
    this.route('get', { path: '/:uid' });
  });
  this.route('partners', { path: 'partenaires' });
  this.route('simple-page', { path: '/*path' });
  this.route('competences');

  this.route('formable-pages', { path: 'formulaire' }, function() {
    this.route('school-education-establishement-registration', { path: 'inscription-etablissement-scolaire' });
    this.route('higher-education-establishement-registration', { path: 'inscription-etablissement-superieur' });
    this.route('pix-orga-newsletter-subscription', { path: 'abonnement-actualites-pix-orga' });
    this.route('certification-center-eligibility', { path: 'eligibilite-centre-de-certification' });
    this.route('pix-orga-registration', { path: 'inscription-pix-orga' });
  });
});

export default Router;
