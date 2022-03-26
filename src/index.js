import Model from './core/Model';
import View from './core/View';
import Controller from './core/Controller';

const root = document.getElementById('todo-app');

const view = new View(root);
const model = new Model();

new Controller(view, model);
