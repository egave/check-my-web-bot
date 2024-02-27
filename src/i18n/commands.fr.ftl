-project-name = 'Check-My-Web' Bot

start = 
  Bienvenu, {$name}, sur le {-project-name}! 
  
  Ce Bot vous permet de configurer les vérifications à effectuer sur des ressources Web et envoi une notification Telegram quand une Ressource Web monitorée échoue la vérification à effectuer. 
  
  Envoi /help pour une liste des commandes disponibles. 

help = 
  Voici les commandes disponibles :
  /start : initialise le Bot et affiche un message de bienvenue & une description du Bot
  /help : affiche ce message d'aide
  /list : liste toutes les ressources Web monitorées
  /add <Web Resource> : ajoute une ressource Web à monitorer
    Les vérifications suivantes sont possibles :
     - CHECK-STATUS : échoue si http status != 200
     - CHECK-MD5 : échoue si le MD5 est différent 
     - CHECK-WORD-HIT : échoue si le 'mot' est absent du corps http
     - CHECK-WORD-MISS : échoue si le 'mot' est présent dans le corps http
  /del <Web Resource Number> : supprime le monitoring d'une ressource Web au travers de son numéro
  /test <Web Resource> :  teste une ressource Web pour obtenir son type de contenu et checksum
  /donate : permet de payer un café au créateur de l'application pour son dur labeur 🙏

add =
  Envoyez l'URL à ajouter
  
list =
  <N'est pas utilisée ? A supprimer>

del =
  Cliquez sur le n° corrspondant à l'URL à supprimer

donate =
  J'espère que vous appréciez cette application !
  
  Pour tous vos commentaires, suggestions d'améliorations ou pour signaler un bug, contactez @{$dev_username}.
  
  Et si vous souhaitez me remercier pour mes longues heures de travail, vous pouvez me faire un don via <b><a href='{$link}'>{$text}</a></b> 🙏

test =
  Envoyez l'URL à tester