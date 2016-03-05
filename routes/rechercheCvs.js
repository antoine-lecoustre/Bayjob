/**
 * Created by Achraf on 26/02/2016.
 */
var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('rechercheCvs', { title: 'Recherche d\'Cvs', messageErr:null });
});


router.post('/', function (req, res) {
    console.log(req.body);

    //Crit�re pour le niveau d'etude
    if(req.body.nivEtude){
        var niv_etude = {intitule: req.body.nivEtude};
    }else{
        var niv_etude = null;
    }

    //V�rification s'il y a au moins un crit�re selectionn�
    if( niv_etude == null){
        //Envoie d'un message d'avertissement : Veuillez selectionner au mois un crit�re
        res.render('rechercheCvs', { title: 'Recherche d\'Cvs', messageErr:"Veuillez selectionner au mois un crit�re" });
    }else {

        var criteres_cv = {};

        //Construction de la requete de recherche
        criteres_cv.include = [{model: models.Niveau_etude, where: niv_etude},];

        //Execution de la requete de type SELECT
        models.CV.findAll(criteres_cv).then(function(Cvs){
            //Liste des mois
            var mois = ["Janvier","F�vrier","Mars","Avril","Mai","Juin","Juillet","Ao�t","Septembre","Octobre","Novembre","D�cembre"];

            //Affichage de la page de resultats
            res.render('resultatRechercheCvs', {title: 'R�sultat de recherche d\'Cvs', CV: Cvs, mois: mois });
            console.log(JSON.stringify(Cvs));
        });


    }

});

module.exports = router;
