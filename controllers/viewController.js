const RESOURCE_PATH = '/fruits';

const viewController = {
    index(req, res, next){
        res.render('Index', res.locals.data);
    },

    show(req, res, next){
        res.render('Show', res.locals.data);
    },

    edit(req, res, next){
        res.render('Edit', res.locals.data);
    },

    redirectHome(req, res, next){
        res.redirect(RESOURCE_PATH);
    },

    redirectShow(req, res, next){
        res.redirect(RESOURCE_PATH + `/${req.params.id}`);
    }
};

module.exports = viewController;