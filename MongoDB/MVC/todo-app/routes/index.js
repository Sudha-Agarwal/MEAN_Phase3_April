var express = require('express');
var router = express.Router();
todoController = require('../controller/todoController')

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

router.get('/', todoController.getTodos);
router.post('/todos', todoController.createTodo);
router.get('/todos/:id/update', todoController.updateTodo);
router.get('/todos/:id/delete', todoController.deleteTodo);
module.exports = router;
