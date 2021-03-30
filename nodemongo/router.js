var userlib = require('./library/userlib');
var sess = '';
module.exports = function(app){
    app.use(function(req, res, next){
        if(sess.userDetail == undefined){
            res.locals.session = ''; 
        }else{
            res.locals.session = sess.userDetail; 
        }
        next();
    });    
    app.get('/', function(req, res){

        //ses = req.session;
        //ses.email = 'ravi@gmail.com';
        res.render('index', {data:{}});
    });
    app.get('/login', function(req, res){
        if(sess != ''){
           res.redirect('/'); 
        }
        res.render('login');
    });
    app.get('/register', function(req, res){
        if(sess != ''){
           res.redirect('/'); 
        }
        res.render('register');
    }); 
    app.post('/saveUser', function(req, res){
        if(sess != ''){
           res.redirect('/'); 
        }
        userlib.saveUserData(req.body, function(result){
            console.log(result);
        });
        //res.send({'data':ses.email});
        //console.log('sss');
        res.render('register');
    });  
    app.post('/loginUser', function(req, res){
        if(sess != ''){
           res.redirect('/'); 
        }
        userlib.getUserDetail(req.body, function(result){
            sess = req.session;
            sess.userDetail = result;
        });
        //res.send({'data':ses.email});
        //console.log('sss');
        if(sess != ''){
           res.redirect('/'); 
        }        
        res.render('login');
    });    
    app.get('/productList/:categoryId', function(req, res){
        console.log(req.params.categoryId);
        if(sess != ''){
           //res.redirect('/'); 
        }
        res.render('/register');
    });     
}