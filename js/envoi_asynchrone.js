// auteur : Anicet Nougaret
// description : Envoie les données du formulaire vers un googlesheet
// dépendances : { jquery.serializeObject (.min) .js }
// note : Requiert des variables css de couleur : --0color, --2color, --3color et --4color

// élément formulaire
var $form = $('form#formulaire');

// élément bouton d'envoi
var $button = $('#submit-form');

// récupération de la webapp couplée à googlesheet
var url = 'https://script.google.com/macros/s/AKfycbw0R9Ff0kaW61_e9VI4pH-VVFPaWSdizkKZfnweipE_55jkCh0/exec';

$button.on('click', évènement => {

  var formulaire_valide = true;
  $('input, textarea, select').filter('[required]:visible').each(function() {
    if ( $(this).val() === '' )
      formulaire_valide = false;
  });

  if (!formulaire_valide) {
    // modification du style du bouton
    $button.html("<i class=\"material-icons\">pan_tool</i> incomplet");
    $button.css("box-shadow","none");
    $button.css("border-left","none");
    $button.css("pointer-events","none");

    setTimeout(() => {
      $button.html("<i class=\"material-icons\">send</i>Envoyer");
      $button.css("box-shadow", "0vw 0 1vh rgba(0,0,50,0.5)");
      $button.css("border-left","solid 1vh var(--4color)");
      $button.css("pointer-events", "auto");
    }, 5000);

  } else {
    // lorsque le bouton d'envoi est cliqué
    // et que le formulaire est complété

    évènement.preventDefault(); // annule les autres évènements "click"

    // modification du style du bouton
    $button.html("<i class=\"material-icons\">cloud_upload</i> Envoi en cours...");
    $button.css("background-color","var(--4color)");
    $button.css("color","var(--2color)");
    $button.css("box-shadow","none");
    $button.css("pointer-events","none");

    var jqxhr = $.ajax({
      // envoi insynchrone

      url: url, // url où envoyer
      method: "GET", // type de requète HTTP à employer
      dataType: "json",
      data: $form.serializeObject() // sérialization des données du formulaire

    }).done(() => {
      // lorsque l'envoi est effectué

      // modification du style du bouton
      $button.html("<i class=\"material-icons\">done</i> C'est envoyé !");
      $button.css("background-color","var(--3color)");
      $button.css("color","var(--2color)");
      $button.css("border-left","none");
      $button.css("box-shadow","none");

    }).catch(() => {
      // lorsque l'envoi échoue

      // modification du style du bouton
      $button.html("<i class=\"material-icons\">sentiment_dissatisfied</i> Échec de l'envoi.");
      $button.css("background-color","red");
      $button.css("color","var(--2color)");
      $button.css("border-left","none");
      $button.css("box-shadow","none");

    });
  }
});
