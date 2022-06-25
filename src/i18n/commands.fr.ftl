-project-name = 'Watch Web Resources' Bot

start = 
  Bienvenu, {$name}, sur le {-project-name}! Ce Bot envoi une notification Telegram quand une Ressource Web monitorée a été modifiée depuis le dernier monitoring. Envoi /help pour une liste des commandes disponibles. 

help = 
  Voici les commandes disponibles :
  /start : initialise le Bot et affiche un message de bienvenue & une description du Bot
  /help : affiche ce message d'aide
  /list : liste toutes les ressources Web monitorées
  /add <Web Resource> : ajoute une ressource Web a monitorer
  /del <Web Resource Number> : supprime le monitoring d'une ressource Web au travers de son numéro
  /test <Web Resource> :  teste une ressource Web pour obtenir son type de contenu et checksum

add =
  Envoyez l'URL à ajouter
  
list =
  <N'est pas utilisée ? A supprimer>

del =
  Cliquez sur le n° corrspondant à l'URL à supprimer

test =
  Envoyez l'URL à tester